import { Center } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useCallback, useMemo, useState } from 'react';
import { useCenterSize } from '~/hooks/useCenterSize';
import { useCloseModal } from '~/hooks/useCloseModal';
import { getImageFileInfo } from '~/lib/utils/getImageFileInfo';
import { uploadImage } from '~/serverActions/uploadImage';
import FileModal from './FileModal';
import PreviewImage from './PreviewImage';
import { SelectButtons } from './SelectButtons';
import SelectFile from './SelectFile';
import type { ModalParamProps } from './FileModal';
import type { ImageProps } from './PreviewImage';
import type { FileStateProps } from './SelectFile';

export function Upload() {
  const [fullScreen, { toggle: toggleFullScreen }] = useDisclosure(false);
  const [selectedFile, setSelectedFile] = useState<FileStateProps>(null);
  const [image, setImage] = useState<ImageProps>({ imageUrl: '', fileName: '', imageName: '', width: 0, height: 0 });
  const { modalOpened: fileModalOpened, closeModal } = useCloseModal();

  const { clearCenterSize, centerRef, topRef, bottomRef, centerHeight } = useCenterSize();

  const imageSelected = useMemo(() => image.imageUrl !== '', [image.imageUrl]);

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
    toggleFullScreen();
  }, [toggleFullScreen]);

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
    if (selectedFile && selectedFile instanceof File) {
      const formData = new FormData();
      formData.set('file', selectedFile as File, 'weekly_info.png');
      const { fileName } = await uploadImage({ data: formData });
      console.log('File uploaded successfully:', fileName);
      closeModal({ confirm: false });
    }
  }, [selectedFile, closeModal]);

  return (
    <FileModal
      modalOpened={fileModalOpened}
      fullScreen={fullScreen}
      onModalResize={handleModalResize}
      onModalClose={handleModalClose}
    >
      {!fullScreen && <SelectFile onSelectFile={handleSelectedFile} selectRef={topRef} />}
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
