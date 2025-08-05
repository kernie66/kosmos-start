import { Center } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useCallback, useMemo, useState } from 'react';
import { useCenterSize } from '~/hooks/useCenterSize';
import { useCloseModal } from '~/hooks/useCloseModal';
import { getImageFileInfo } from '~/lib/utils/getImageFileInfo';
import FileModal from './FileModal';
import PreviewImage from './PreviewImage';
import { SelectButtons } from './SelectButtons';
import SelectFile from './SelectFile';
import type { ModalParamProps } from './FileModal';
import type { ImageProps } from './PreviewImage';
import type { FileStateProps } from './SelectFile';

export function Upload() {
  const [fullScreen, { toggle: toggleFullScreen }] = useDisclosure(false);
  const [image, setImage] = useState<ImageProps>({ imageUrl: '', fileName: '', imageName: '', width: 0, height: 0 });
  const { modalOpened: fileModalOpened, closeModal } = useCloseModal();

  const { clearCenterSize, centerRef, topRef, bottomRef, centerHeight } = useCenterSize();

  const imageSelected = useMemo(() => image.imageUrl !== '', [image.imageUrl]);

  // Function to handle file selection
  const handleSelectedFile = useCallback(
    async (file: FileStateProps) => {
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
      <SelectButtons showButtons={imageSelected} buttonRef={bottomRef} onCancel={handleButtonClose} />
    </FileModal>
  );
}
