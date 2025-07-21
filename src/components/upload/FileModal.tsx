import { Box, Button, Center, Modal, Text } from '@mantine/core';
import { useDisclosure, useElementSize, useViewportSize } from '@mantine/hooks';
import { useLayoutEffect, useRef, useState } from 'react';
import PreviewImage from './PreviewImage';
import SelectFile from './SelectFile';
import type { ImageProps, ImageStateProps } from './PreviewImage';
import type { FileStateProps } from './SelectFile';

export default function FileModal() {
  const [fileModalOpened, { open, close }] = useDisclosure(false);
  const [fullScreen, { close: restoreFullScreen, toggle: toggleFullScreen }] = useDisclosure(false);
  const [image, setImage] = useState<ImageProps>({ imageUrl: '', fileName: '' });
  const [imageShown, setImageShown] = useState(false);
  const { width: viewportWidth, height: viewportHeight } = useViewportSize();
  const [imageHeight, setImageHeight] = useState<ImageStateProps>('100%');

  const modalRef = useRef<HTMLDivElement>(null);
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const { ref: centerRef, height: centerHeight } = useElementSize();

  const marginTop = fullScreen ? 0 : 'md'; // Remove image margin when in full screen

  const imageSelected = image.imageUrl !== '';

  console.log('Viewport size:', viewportWidth, viewportHeight);

  useLayoutEffect(() => {
    console.log('useLayoutEffect triggered');
    console.log('Center height', centerHeight);

    if (centerRef.current && modalRef.current && modalBodyRef.current) {
      const modalPosition = modalRef.current.getBoundingClientRect();
      console.log('Modal position:', modalPosition);
      const centerPosition = centerRef.current.getBoundingClientRect();
      const centerTopOffset = centerPosition.top - modalPosition.top;
      const modalBottomPadding = Number.parseInt(getComputedStyle(modalBodyRef.current).paddingBottom, 10);
      const maxImageHeight = Math.trunc(modalPosition.height - centerTopOffset - modalBottomPadding);
      console.log('Center top offset', centerTopOffset);
      console.log('Calculated center bottom margin', modalPosition.bottom - centerPosition.bottom);
      console.log('Calculated max image height', maxImageHeight);
      if (maxImageHeight) {
        setImageShown(true);
      }
      console.log('Image shown:', imageShown);
      if (imageShown) {
        console.log('Setting final image height');
        setImageHeight(maxImageHeight);
      }
    }
  }, [modalRef, modalBodyRef, centerHeight, imageShown, centerRef]);

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
    setImageShown(false);
    setImageHeight('100%');
  }

  // Function to handle image click
  function handleImageClicked() {
    toggleFullScreen();
    setImageHeight('100%');
  }

  // Function to handle modal close
  function handleClose() {
    restoreFullScreen();
    setImage({ imageUrl: '', fileName: '' });
    setImageShown(false);
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
