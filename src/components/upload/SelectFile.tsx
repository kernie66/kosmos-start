import { Button, Group, Stack, Text } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useWindowEvent } from '@mantine/hooks';
import { useCallback, useState } from 'react';
import { TbPhoto, TbUpload, TbX } from 'react-icons/tb';
import { imageSelectionActor } from '~/fsm/selectImageMachine';
import {
  getClipboardImage,
  getDroppedImage,
  getPastedImage,
  getRejectedImage,
} from '~/lib/handlers/selectImageHandlers';
import type { FileRejection, FileWithPath } from '@mantine/dropzone';

export type FileStateProps = FileWithPath | null;

type SelectFileProps = {
  onFileSelected: (file: FileStateProps) => void;
  selectRef?: React.RefObject<HTMLDivElement | null>;
};

export default function SelectFile({ onFileSelected, selectRef }: SelectFileProps) {
  const [subText, setSubText] = useState('Välj en bildfil att ladda upp');

  const handleDrop = useCallback(
    (acceptedFiles: Array<FileWithPath>) => {
      imageSelectionActor.send({ type: 'get image.dropzone', data: acceptedFiles[0] });
      const imageFile = getDroppedImage(acceptedFiles);
      onFileSelected(imageFile);
      setSubText('Välj en ny bildfil för att byta ut den nuvarande');
    },
    [onFileSelected],
  );

  const handleReject = useCallback((rejectedFiles: Array<FileRejection>) => {
    imageSelectionActor.send({ type: 'get image.rejected' });
    const rejectCause = getRejectedImage(rejectedFiles);
    setSubText(rejectCause);
  }, []);

  // Listen for paste events
  useWindowEvent('paste', (event: ClipboardEvent) => {
    imageSelectionActor.send({ type: 'get image.paste', data: event.clipboardData?.files[0] });
    const blob = getPastedImage(event);
    onFileSelected(blob);
    setSubText('Välj en ny bildfil för att byta ut den nuvarande');
  });

  const handleClipboardImage = useCallback(async () => {
    imageSelectionActor.send({ type: 'get image.clipboard' });
    const image = await getClipboardImage();
    onFileSelected(image);
  }, [onFileSelected]);

  const restoreSubText = useCallback(() => {
    setSubText('Välj en bildfil att ladda upp');
  }, []);

  return (
    <>
      <Dropzone
        accept={IMAGE_MIME_TYPE}
        onDrop={handleDrop}
        onReject={handleReject}
        onFileDialogOpen={restoreSubText}
        maxFiles={1}
        bg="teal.1"
        radius="md"
        mb="md"
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
            <Text size="xl">Dra bilder hit eller klicka för att välja fil</Text>
            <Text size="md" c="dimmed">
              {subText}
            </Text>
          </Stack>
        </Group>
      </Dropzone>
      <Button onClick={handleClipboardImage} variant="light" color="teal" fullWidth>
        Klistra in bild från urklipp
      </Button>
    </>
  );
}
