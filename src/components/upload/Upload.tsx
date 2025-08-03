import { Center } from '@mantine/core';
import { useDisclosure, useSetState } from '@mantine/hooks';
import { useNavigate } from '@tanstack/react-router';
import { useCallback, useMemo } from 'react';
import { getImageSize } from 'react-image-size';
import { closeImageModalMessage, useConfirmModal } from '~/hooks/useConfirmModal';
import { useImageResize } from '~/hooks/useImageResize';
import FileModal from './FileModal';
import PreviewImage from './PreviewImage';
import SelectFile from './SelectFile';
import type { ModalParamProps } from './FileModal';
import type { ImageProps } from './PreviewImage';
import type { FileStateProps } from './SelectFile';

export function Upload() {
  const [fullScreen, { toggle: toggleFullScreen }] = useDisclosure(false);
  const [image, setImage] = useSetState<ImageProps>({ imageUrl: '', fileName: '', width: 0, height: 0 });
  const [fileModalOpened, { close }] = useDisclosure(true);
  const { confirmModal: closeImageModal } = useConfirmModal();
  const navigate = useNavigate();

  const { clearImageResize, centerRef, selectRef, imageHeight } = useImageResize();

  const imageSelected = useMemo(() => image.imageUrl !== '', [image.imageUrl]);

  // Function to handle file selection
  const handleSelectedFile = useCallback(
    async (file: FileStateProps) => {
      const imageUrl = file ? URL.createObjectURL(file) : '';
      const fileName = file ? file.name.split('.').slice(0, -1).join('.') : '';
      try {
        if (imageUrl !== '') {
          const { width, height } = await getImageSize(imageUrl);
          setImage({ imageUrl, fileName, width, height });
        } else {
          setImage({ width: 0, height: 0 });
        }
      } catch (error) {
        console.error('Error getting image size:', error);
      }
    },
    [setImage],
  );

  // Function to handle image click
  const handleImageClicked = useCallback(() => {
    console.log('Image clicked, toggling full screen');
    toggleFullScreen();
  }, [toggleFullScreen]);

  // Function to handle modal resize
  const handleModalResize = useCallback(
    (modalParams: ModalParamProps) => {
      console.log('Modal parameters (Upload)', modalParams);
      clearImageResize({ innerHeight: modalParams.modalInnerHeight });
    },
    [clearImageResize],
  );

  // Function for closing the modal and return to the main page
  const leaveFileModal = useCallback(() => {
    close();
    navigate({ to: '/' });
  }, [close, navigate]);

  // Function to handle modal close actions
  const handleClose = useCallback(() => {
    if (imageSelected) {
      closeImageModal({ message: closeImageModalMessage, onConfirm: leaveFileModal });
    } else {
      leaveFileModal();
    }
  }, [closeImageModal, leaveFileModal, imageSelected]);

  return (
    <FileModal
      modalOpened={fileModalOpened}
      fullScreen={fullScreen}
      onModalResize={handleModalResize}
      onModalClose={handleClose}
    >
      {!fullScreen && <SelectFile onSelectFile={handleSelectedFile} selectRef={selectRef} />}
      <Center ref={centerRef}>
        <PreviewImage image={image} onImageClicked={handleImageClicked} maxHeight={imageHeight} />
      </Center>
    </FileModal>
  );
}
