import { Center, LoadingOverlay } from '@mantine/core';
import { useWindowEvent } from '@mantine/hooks';
import { useCallback, useState } from 'react';
import { selectFullscreen, selectImageSelected, selectSelectedFile } from '~/fsm/contexts/imageSelectionContext';
import { useCenterSize } from '~/hooks/useCenterSize';
import { useCloseModal } from '~/hooks/useCloseModal';
import { submitFile } from '~/lib/utils/submitFile';
import { ImageSelectionContext } from '~/routes/_auth/upload';
import FileModal from './FileModal';
import NoImageSelected from './NoImageSelected';
import PasteClipboardButton from './PasteClipboardButton';
import PreviewImage from './PreviewImage';
import { SelectButtons } from './SelectButtons';
import SelectFile from './SelectFile';
import type { ModalParamProps } from './FileModal';

export function Upload() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { modalOpened: fileModalOpened, closeModal } = useCloseModal();
  const imageSelectionActor = ImageSelectionContext.useActorRef();
  const selectedFile = ImageSelectionContext.useSelector(selectSelectedFile);
  const imageSelected = ImageSelectionContext.useSelector(selectImageSelected);
  const fullscreen = ImageSelectionContext.useSelector(selectFullscreen);
  const { clearCenterSize, centerRef, topRef, bottomRef, centerHeight } = useCenterSize();

  // Listen for paste events
  useWindowEvent('paste', (event: ClipboardEvent) => {
    const clipboardFile = event.clipboardData?.files[0];
    imageSelectionActor.send({ type: 'get image.paste', data: clipboardFile });
  });

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
