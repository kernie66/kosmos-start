import { Center, LoadingOverlay } from '@mantine/core';
import { useSelector } from '@xstate/react';
import { useCallback, useEffect, useState } from 'react';
import { selectFullscreen, selectImageSelected, selectSelectedFile } from '~/fsm/contexts/imageSelectionContext';
import { imageSelectionActor } from '~/fsm/selectImageMachine';
import { useCenterSize } from '~/hooks/useCenterSize';
import { useCloseModal } from '~/hooks/useCloseModal';
import { submitFile } from '~/lib/utils/submitFile';
import FileModal from './FileModal';
import NoImageSelected from './NoImageSelected';
import PasteClipboardButton from './PasteClipboardButton';
import PreviewImage from './PreviewImage';
import { SelectButtons } from './SelectButtons';
import SelectFile from './SelectFile';
import type { ModalParamProps } from './FileModal';
import type { FileStateProps } from './SelectFile';

export function Upload() {
  // const [selectedFile, setSelectedFile] = useState<FileStateProps>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { modalOpened: fileModalOpened, closeModal } = useCloseModal();
  const selectedFile = useSelector(imageSelectionActor, selectSelectedFile);
  const imageSelected = useSelector(imageSelectionActor, selectImageSelected);
  const fullscreen = useSelector(imageSelectionActor, selectFullscreen);
  const { clearCenterSize, centerRef, topRef, bottomRef, centerHeight } = useCenterSize();

  useEffect(() => {
    console.log('Image selection actor started');
    return () => {
      imageSelectionActor.send({ type: 'restart' });
      console.log('Image selection actor restarted');
    };
  }, []);

  // Function to handle file selection
  const handleSelectedFile = useCallback(
    (file: FileStateProps) => {
      console.log('file', file);
      // setSelectedFile(file);
      clearCenterSize();
    },
    [clearCenterSize],
  );
  console.log('selectedFile', selectedFile);

  // Function to handle modal resize
  const handleModalResize = useCallback(
    (modalSize: ModalParamProps) => {
      clearCenterSize({ centerHeight: modalSize.modalInnerHeight });
    },
    [clearCenterSize],
  );

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
    <FileModal
      modalOpened={fileModalOpened}
      fullScreen={fullscreen}
      onModalResize={handleModalResize}
      onModalClose={handleModalClose}
    >
      <LoadingOverlay visible={isSubmitting} overlayProps={{ blur: 2 }} />
      {!imageSelected && (
        <>
          <SelectFile selectRef={topRef} />
          <PasteClipboardButton />
        </>
      )}
      <Center ref={centerRef}>
        {selectedFile ? <PreviewImage file={selectedFile} maxHeight={centerHeight} /> : <NoImageSelected />}
      </Center>
      <SelectButtons
        showButtons={selectedFile !== null}
        buttonRef={bottomRef}
        onCancel={handleButtonClose}
        onSelect={handleSubmitFile}
      />
    </FileModal>
  );
}
