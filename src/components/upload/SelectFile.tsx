import { Group, Stack, Text } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useState } from 'react';
import { TbPhoto, TbUpload, TbX } from 'react-icons/tb';
import type { FileRejection, FileWithPath } from '@mantine/dropzone';

export type FileStateProps = FileWithPath | null;

type SelectFileProps = {
  onSelectFile: (file: FileStateProps) => void;
};

export default function SelectFile({ onSelectFile }: SelectFileProps) {
  const [subText, setSubText] = useState('Välj en bildfil att ladda upp');

  const checkFileError = (errorObject: FileRejection) => {
    const error = errorObject.errors[0];
    console.log('error', error);
    if (error.code === 'file-invalid-type') {
      setSubText('Ogiltig filtyp. Vänligen ladda upp en bildfil (jpg, png, gif).');
    } else if (error.code === 'file-too-large') {
      setSubText('Filen är för stor. Vänligen ladda upp en mindre bild.');
    } else if (error.code === 'too-many-files') {
      setSubText('För många filer. Vänligen ladda upp endast en bild.');
    } else {
      setSubText('Ett okänt fel inträffade, försök igen med en giltig fil.');
    }
  };

  const handleDrop = (acceptedFiles: Array<FileWithPath>) => {
    console.log('acceptedFiles', acceptedFiles);
    setSubText('Välj en ny bildfil för att byta ut den nuvarande');
    onSelectFile(acceptedFiles[0]);
  };

  const handleReject = (rejectedFiles: Array<FileRejection>) => {
    console.log('rejectedFiles', rejectedFiles);
    checkFileError(rejectedFiles[0]);
  };

  const restoreSubText = () => {
    setSubText('Välj en bildfil att ladda upp');
  };

  return (
    <>
      <Dropzone
        accept={IMAGE_MIME_TYPE}
        onDrop={handleDrop}
        onReject={handleReject}
        onDragEnter={restoreSubText}
        onFileDialogOpen={restoreSubText}
        maxFiles={1}
        bg="teal.1"
        radius="md"
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
