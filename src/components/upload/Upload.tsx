import { Center, LoadingOverlay, Stack } from '@mantine/core';
import { useWindowEvent } from '@mantine/hooks';
import { useCallback, useState } from 'react';
import { useCloseModal } from '~/hooks/useCloseModal';
import { useImageSelection } from '~/hooks/useImageSelection';
import { submitFile } from '~/lib/utils/submitFile';
import FileModal from './FileModal';
import NoImageSelected from './NoImageSelected';
import PasteClipboardButton from './PasteClipboardButton';
import PreviewImage from './PreviewImage';
import { SelectButtons } from './SelectButtons';
import SelectFile from './SelectFile';

export default function Upload() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { modalOpened: fileModalOpened, closeModal } = useCloseModal();
  const {
    sendToImageSelection,
    imageSelectionValues: { imageSelected, selectedFile, showSelect, fullscreen },
  } = useImageSelection();

  // Listen for paste events
  useWindowEvent('paste', (event: ClipboardEvent) => {
    const clipboardFile = event.clipboardData?.files[0];
    sendToImageSelection({ type: 'get image.paste', data: clipboardFile });
  });

  // Functions to handle modal close actions
  const handleModalClose = useCallback(() => {
    closeModal({ confirm: imageSelected });
  }, [closeModal, imageSelected]);

  const handleButtonClose = useCallback(() => {
    closeModal({ confirm: false });
  }, [closeModal]);

  const handleSubmitFile = useCallback(async () => {
    if (isSubmitting || !selectedFile || !(selectedFile instanceof File)) return;

    try {
      setIsSubmitting(true);
      const { fileName } = await submitFile(selectedFile);
      console.log('File uploaded successfully:', fileName);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsSubmitting(false);
      closeModal({ confirm: false });
    }
  }, [selectedFile, closeModal, isSubmitting]);

  return (
    <FileModal modalOpened={fileModalOpened} fullScreen={fullscreen} onModalClose={handleModalClose}>
      <LoadingOverlay visible={isSubmitting} overlayProps={{ blur: 2 }} />
      {showSelect && (
        <Stack mb="md" className="select-file-stack">
          <SelectFile />
          <PasteClipboardButton />
        </Stack>
      )}
      <Center>{imageSelected ? <PreviewImage file={selectedFile} /> : <NoImageSelected />}</Center>
      <SelectButtons showButtons={imageSelected} onCancel={handleButtonClose} onSelect={handleSubmitFile} />
    </FileModal>
  );
}
