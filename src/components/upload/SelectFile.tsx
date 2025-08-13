import { Group, Stack, Text } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useCallback, useState } from 'react';
import { TbPhoto, TbUpload, TbX } from 'react-icons/tb';
import { checkFileError } from '~/lib/utils/checkFileError';
import type { FileRejection, FileWithPath } from '@mantine/dropzone';
import { useWindowEvent } from '@mantine/hooks';

export type FileStateProps = FileWithPath | null;

type SelectFileProps = {
  onSelectFile: (file: FileStateProps) => void;
  selectRef?: React.RefObject<HTMLDivElement | null>;
};

export default function SelectFile({ onSelectFile, selectRef }: SelectFileProps) {
  const [subText, setSubText] = useState('Välj en bildfil att ladda upp');

  const handleDrop = useCallback(
    (acceptedFiles: Array<FileWithPath>) => {
      console.log('acceptedFiles', acceptedFiles);
      setSubText('Välj en ny bildfil för att byta ut den nuvarande');
      onSelectFile(acceptedFiles[0]);
    },
    [onSelectFile],
  );

  const handleReject = useCallback((rejectedFiles: Array<FileRejection>) => {
    console.log('rejectedFiles', rejectedFiles);
    setSubText(checkFileError(rejectedFiles[0]));
  }, []);

  const handlePaste = (event: ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (!items) {
      console.log('No items in clipboard');
      return;
    }
    console.log('Pasted items:', items);
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.kind === 'file') {
        const blob = item.getAsFile();
        console.log('Pasted file:', blob);
        // Do something with the file, like upload or process it
        onSelectFile(blob);
        setSubText('Välj en ny bildfil för att byta ut den nuvarande');
      }
    }
  };

  useWindowEvent('paste', handlePaste);

  const restoreSubText = () => {
    setSubText('Välj en bildfil att ladda upp');
  };

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
    </>
  );
}
