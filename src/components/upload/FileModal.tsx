import { Center, Modal } from '@mantine/core';
import {
  useDisclosure,
  useElementSize,
  usePrevious,
  useSetState,
  useThrottledCallback,
  useWindowEvent,
} from '@mantine/hooks';
import { useNavigate } from '@tanstack/react-router';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { getImageSize } from 'react-image-size';
import { closeImageModalMessage, useConfirmModal } from '~/hooks/useConfirmModal';
import PreviewImage from './PreviewImage';
import SelectFile from './SelectFile';
import type { ImageProps, ImageStateProps } from './PreviewImage';
import type { FileStateProps } from './SelectFile';

type OnModalResizeProps = {
  modalHeight: number;
};
type FileModalProps = {
  children?: React.ReactNode;
  // setModalParams?: (params: { opened: boolean }) => void;
  onModalResize?: ({ modalHeight }: OnModalResizeProps) => void;
};

export default function FileModal({ children, onModalResize }: FileModalProps) {
  const [fileModalOpened, { close }] = useDisclosure(true);
  const { confirmModal: closeImageModal } = useConfirmModal();
  const navigate = useNavigate();
  const [fullScreen, { toggle: toggleFullScreen }] = useDisclosure(false);
  const [image, setImage] = useSetState<ImageProps>({ imageUrl: '', fileName: '', width: 0, height: 0 });
  const [imageShown, setImageShown] = useState(false);
  const [imageHeight, setImageHeight] = useState<ImageStateProps>('100%');

  const { ref: modalRef, height: modalHeight } = useElementSize();
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  const previousModalHeight = usePrevious(modalHeight);
  const marginTop = useMemo(() => (fullScreen ? 0 : 'md'), [fullScreen]); // Remove image margin when in full screen

  const imageSelected = useMemo(() => image.imageUrl !== '', [image.imageUrl]);

  useEffect(() => {
    if (onModalResize && modalHeight !== previousModalHeight) {
      onModalResize({ modalHeight });
    }
  }, [modalHeight, previousModalHeight, onModalResize]);

  console.log('Image height:', imageHeight);

  useLayoutEffect(() => {
    console.log('useLayoutEffect triggered');
    console.log('Image shown:', imageShown);

    if (centerRef.current && modalRef.current && modalBodyRef.current) {
      const modalPosition = modalRef.current.getBoundingClientRect();
      console.log('Modal position:', modalPosition);
      const centerPosition = centerRef.current.getBoundingClientRect();
      console.log('Center position:', centerPosition);
      const centerTopOffset = centerPosition.top - modalPosition.top;
      const modalBottomPadding = Number.parseInt(getComputedStyle(modalBodyRef.current).paddingBottom, 10);
      const centerHeightInt = Math.trunc(centerPosition.height);
      const maxImageHeight = Math.trunc(modalPosition.height - centerTopOffset - modalBottomPadding);
      console.log('Center top offset', centerTopOffset);
      console.log('Calculated max image height', maxImageHeight);
      console.log('Center height difference:', centerHeightInt - maxImageHeight);
      if (maxImageHeight && centerHeightInt) {
        setImageShown(true);
      }
      if (imageShown) {
        console.log('Setting final image height to:', Math.min(centerHeightInt, maxImageHeight));
        setImageHeight(Math.min(centerHeightInt, maxImageHeight));
      }
    }
  }, [modalRef, modalBodyRef, imageShown, centerRef]);

  const throttledResizeImage = useThrottledCallback(() => {
    console.log('Throttled resize image triggered');
    if (!imageSelected) return;
    setImageShown(false);
    setImageHeight('100%');
  }, 500);

  useWindowEvent('resize', throttledResizeImage);

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
    setImageShown(false);
    setImageHeight('100%');
  }, [toggleFullScreen]);

  return (
    <>
      <Modal.Root opened={fileModalOpened} onClose={handleClose} fullScreen={fullScreen} size="lg">
        <Modal.Overlay />
        <Modal.Content ref={modalRef}>
          <Modal.Header p={0} m={0} h={60}>
            <Modal.Title fw={700} fz="xl" p={8} c="teal.6">
              {!fullScreen ? 'Välj en fil att ladda upp' : 'Klicka på bilden för att gå tillbaka'}
            </Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body ref={modalBodyRef}>
            {!fullScreen && <SelectFile onSelectFile={handleSelectedFile} />}
            <Center mt={marginTop} ref={centerRef}>
              <PreviewImage image={image} onImageClicked={handleImageClicked} maxHeight={imageHeight} />
            </Center>
            {children}
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
