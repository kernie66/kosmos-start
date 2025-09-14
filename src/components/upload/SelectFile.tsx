import { Group, Stack, Text } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useCallback } from 'react';
import { TbPhoto, TbUpload, TbX } from 'react-icons/tb';
import { selectDropzoneSubText } from '~/fsm/contexts/imageSelectionContext';
import {
  // getClipboardImage,
  // getDroppedImage,
  // getPastedImage,
  getRejectedImageCause,
} from '~/lib/handlers/selectImageHandlers';
import { ImageSelectionContext } from '~/routes/_auth/upload';
import type { FileRejection, FileWithPath } from '@mantine/dropzone';

export type FileStateProps = FileWithPath | null;

type SelectFileProps = {
  selectRef?: React.RefObject<HTMLDivElement | null>;
};

export default function SelectFile({ selectRef }: SelectFileProps) {
  const imageSelectionActor = ImageSelectionContext.useActorRef();
  const subText = ImageSelectionContext.useSelector(selectDropzoneSubText);

  const handleDrop = useCallback(
    (acceptedFiles: Array<FileWithPath>) => {
      // Only a single file is accepted by Dropzone, so we can safely use the first file
      imageSelectionActor.send({ type: 'get image.dropzone', data: acceptedFiles[0] });
    },
    [imageSelectionActor],
  );

  const handleReject = useCallback(
    (rejectedFiles: Array<FileRejection>) => {
      const rejectCause = getRejectedImageCause(rejectedFiles);
      imageSelectionActor.send({ type: 'get image.rejected', cause: rejectCause });
    },
    [imageSelectionActor],
  );

  return (
    <>
      <Dropzone
        accept={IMAGE_MIME_TYPE}
        onDrop={handleDrop}
        onReject={handleReject}
        maxFiles={1}
        bg="teal.1"
        radius="md"
        ref={selectRef}
      >
        <Group justify="center" gap="xl" mih={80} style={{ pointerEvents: 'none' }}>
          <Dropzone.Accept>
            <TbUpload size={52} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <TbX size={52} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <TbPhoto size={52} color="teal" />
          </Dropzone.Idle>

          <Stack gap={2}>
            <Text size="xl">Dra en bild hit eller klicka för att välja en fil</Text>
            <Text size="md" c="dimmed">
              {subText}
            </Text>
          </Stack>
        </Group>
      </Dropzone>
    </>
  );
}
