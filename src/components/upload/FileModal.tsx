import { Box, Button, Center, Modal, Text } from '@mantine/core';
import { useDisclosure, useElementSize, useThrottledCallback, useViewportSize, useWindowEvent } from '@mantine/hooks';
import { useLayoutEffect, useRef, useState } from 'react';
import PreviewImage from './PreviewImage';
import SelectFile from './SelectFile';
import type { ImageProps, ImageStateProps } from './PreviewImage';
import type { FileStateProps } from './SelectFile';

export default function FileModal() {
  const [fileModalOpened, { open, close }] = useDisclosure(false);
  const [fullScreen, { close: closeFullScreen, toggle: toggleFullScreen }] = useDisclosure(false);
  const [image, setImage] = useState<ImageProps>({ imageUrl: '', fileName: '' });
  const [imageShown, setImageShown] = useState(false);
  const { width: viewportWidth, height: viewportHeight } = useViewportSize();
  const [imageHeight, setImageHeight] = useState<ImageStateProps>('100%');

  const { ref: modalRef, height: modalHeight } = useElementSize();
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const { ref: centerRef, height: centerHeight } = useElementSize();

  const marginTop = fullScreen ? 0 : 'md'; // Remove image margin when in full screen

  const imageSelected = image.imageUrl !== '';

  console.log('Viewport size:', viewportWidth, viewportHeight);
  console.log('Image height:', imageHeight);

  useLayoutEffect(() => {
    console.log('useLayoutEffect triggered');
    console.log('Center height', centerHeight);
    console.log('Image shown:', imageShown);

    if (centerRef.current && modalRef.current && modalBodyRef.current) {
      const modalPosition = modalRef.current.getBoundingClientRect();
      console.log('Modal position:', modalPosition);
      const centerPosition = centerRef.current.getBoundingClientRect();
      const centerTopOffset = centerPosition.top - modalPosition.top;
      const modalBottomPadding = Number.parseInt(getComputedStyle(modalBodyRef.current).paddingBottom, 10);
      const centerHeightInt = Math.trunc(centerHeight);
      const maxImageHeight = Math.trunc(modalPosition.height - centerTopOffset - modalBottomPadding);
      console.log('Center top offset', centerTopOffset);
      console.log('Calculated center bottom margin', modalPosition.bottom - centerPosition.bottom);
      console.log('Calculated max image height', maxImageHeight);
      console.log('Center height difference:', centerHeightInt - maxImageHeight);
      if (centerHeightInt - maxImageHeight < 0) {
        setImageShown(false);
      } else if (maxImageHeight) {
        setImageShown(true);
      }
      if (imageShown) {
        console.log('Setting final image height to:', Math.min(centerHeightInt, maxImageHeight));
        setImageHeight(Math.min(centerHeightInt, maxImageHeight));
      }
    }
  }, [modalRef, modalHeight, modalBodyRef, centerHeight, imageShown, centerRef]);

  const throttledResizeImage = useThrottledCallback(() => {
    console.log('Throttled resize image triggered');
    if (!imageSelected) return;
    setImageShown(false);
    setImageHeight('100%');
  }, 500);

  useWindowEvent('resize', throttledResizeImage);

  // Function to handle button click
  function handleButtonClicked() {
    if (fileModalOpened) {
      handleClose();
    } else {
      open();
    }
  }

  // Function to handle file selection
  function handleSelectedFile(file: FileStateProps) {
    const imageUrl = file ? URL.createObjectURL(file) : '';
    const fileName = file ? file.name.split('.').slice(0, -1).join('.') : '';
    setImage({ imageUrl, fileName });
    setImageHeight('100%');
  }

  // Function to handle image click
  function handleImageClicked() {
    toggleFullScreen();
    setImageHeight('100%');
  }

  // Function to handle modal close
  function handleClose() {
    closeFullScreen();
    setImage({ imageUrl: '', fileName: '' });
    setImageShown(false);
    setImageHeight('100%');
    close();
  }

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
              {imageSelected ? (
                <PreviewImage image={image} onImageClicked={handleImageClicked} maxHeight={imageHeight} />
              ) : (
                <Box>
                  <Text c="dimmed" fz="md">
                    Ingen bild vald
                  </Text>
                </Box>
              )}
            </Center>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>

      <Button variant="default" onClick={handleButtonClicked}>
        {!fileModalOpened ? 'Öppna filväljare' : 'Stäng filväljare'}
      </Button>
    </>
  );
}
