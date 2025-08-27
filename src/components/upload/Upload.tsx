import { Center, LoadingOverlay } from '@mantine/core';
import { useSelector } from '@xstate/react';
import { useCallback, useEffect, useState } from 'react';
import { imageSelectionActor, selectFullscreen, selectImageSelected } from '~/fsm/selectImageMachine';
import { useCenterSize } from '~/hooks/useCenterSize';
import { useCloseModal } from '~/hooks/useCloseModal';
import { getImageFileInfo } from '~/lib/utils/getImageFileInfo';
import { submitFile } from '~/lib/utils/submitFile';
import FileModal from './FileModal';
import PreviewImage from './PreviewImage';
import { SelectButtons } from './SelectButtons';
import SelectFile from './SelectFile';
import type { ModalParamProps } from './FileModal';
import type { ImageProps } from './PreviewImage';
import type { FileStateProps } from './SelectFile';

export function Upload() {
  const [selectedFile, setSelectedFile] = useState<FileStateProps>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState<ImageProps>({ imageUrl: '', fileName: '', imageName: '', width: 0, height: 0 });
  const { modalOpened: fileModalOpened, closeModal } = useCloseModal();
  const imageSelected = useSelector(imageSelectionActor, selectImageSelected);
  const fullscreen = useSelector(imageSelectionActor, selectFullscreen);
  const { clearCenterSize, centerRef, topRef, bottomRef, centerHeight } = useCenterSize();

  // const imageSelected =
  // imageSelectionState.matches("Preview Image")
  // useMemo(() => image.imageUrl !== '', [image.imageUrl]);

  useEffect(() => {
    console.log('Image selection actor started');
    return () => {
      imageSelectionActor.send({ type: 'restart' });
      console.log('Image selection actor restarted');
    };
  }, []);

  // Function to handle file selection
  const handleSelectedFile = useCallback(
    async (file: FileStateProps) => {
      setSelectedFile(file);
      const imageFileInfo = await getImageFileInfo(file);
      setImage(imageFileInfo);
      clearCenterSize();
    },
    [setImage, clearCenterSize],
  );

  // Function to handle image click
  const handleImageClicked = useCallback(() => {
    imageSelectionActor.send({ type: 'toggle.fullscreen' });
  }, []);

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
      {!imageSelected && <SelectFile onFileSelected={handleSelectedFile} selectRef={topRef} />}
      <Center ref={centerRef}>
        <PreviewImage image={image} onImageClicked={handleImageClicked} maxHeight={centerHeight} />
      </Center>
      <SelectButtons
        showButtons={imageSelected}
        buttonRef={bottomRef}
        onCancel={handleButtonClose}
        onSelect={handleSubmitFile}
      />
    </FileModal>
  );
}
