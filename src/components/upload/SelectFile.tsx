import { Button, Group, Stack, Text } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useCallback, useState } from 'react';
import { TbPhoto, TbUpload, TbX } from 'react-icons/tb';
import { checkFileError } from '~/lib/utils/checkFileError';
import type { FileRejection, FileWithPath } from '@mantine/dropzone';
import { useWindowEvent } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

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
    event.preventDefault();
    const items = event.clipboardData?.items;
    if (!items) {
      notifications.show({
        title: 'Ingen bild uppladdad från urklipp',
        message: 'Det fanns inget kopierat att klistra in, välj en bild och försök igen.',
        color: 'red',
      });
      console.log('No items in clipboard');
      return;
    }
    console.log('Pasted items:', items);
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.kind === 'file') {
        const blob = item.getAsFile();
        console.log('Pasted file:', blob);
        onSelectFile(blob);
        setSubText('Välj en ny bildfil för att byta ut den nuvarande');
      } else {
        console.log('Pasted item is not a file:', item);
        notifications.show({
          title: 'Ingen bild uppladdad från urklipp',
          message: 'Urklipp innehåller ingen bild, välj en bild och försök igen.',
          color: 'red',
        });
      }
    }
  };

  // Listen for paste events
  useWindowEvent('paste', handlePaste);

  async function pasteImage() {
    try {
      const clipboardContents = await navigator.clipboard.read();
      for (const item of clipboardContents) {
        console.log('item', item);
        if (!item.types.includes('image/png')) {
          throw new Error('Clipboard does not contain PNG image data.');
        }
        const blob = await item.getType('image/png');
        const file = new File([blob], 'pasted-image.png', { type: 'image/png' });
        onSelectFile(file);
        setSubText('Välj en ny bildfil för att byta ut den nuvarande');
        // Optionally, you can also log or display the pasted blob
        console.log('Pasted blob:', file);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
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
      <Button onClick={pasteImage} variant="light" color="teal" fullWidth>
        Klistra in bild från urklipp
      </Button>
    </>
  );
}
