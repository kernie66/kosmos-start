import { Box, Button, Center, Modal, Text } from '@mantine/core';
import { useDisclosure, useElementSize, useViewportSize } from '@mantine/hooks';
import { useLayoutEffect, useState } from 'react';
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

  const { ref: modalRef, width: modalWidth, height: modalHeight } = useElementSize();
  const { ref: centerRef, width: centerWidth, height: centerHeight } = useElementSize();

  const marginTop = fullScreen ? 0 : 'md'; // Remove image margin when in full screen

  const imageSelected = image.imageUrl !== '';

  console.log('Viewport size:', viewportWidth, viewportHeight);
  console.log('Center height', centerHeight, 'Center width', centerWidth);

  useLayoutEffect(() => {
    console.log('useLayoutEffect triggered');
    console.log('Closest modalRef:', modalRef.current?.closest('section'));
    console.log('Image shown:', imageShown);
    // console.log('Modal height', modalHeight, 'Modal width', modalWidth);
    console.log('Modal height', modalHeight);
    const scrollWidth = modalRef.current?.scrollWidth;
    const scrollHeight = modalRef.current?.scrollHeight;
    // console.log('ScrollWidth:', scrollWidth);
    // console.log('ScrollHeight:', scrollHeight);
    const modalPosition = modalRef.current?.getBoundingClientRect();
    // console.log('Modal position:', modalPosition);
    if (centerRef.current) {
      const centerPosition = centerRef.current.getBoundingClientRect();
      // console.log('Center position (layout):', centerPosition);
      // console.log('Center styles:', centerRef.current?.style);
      // console.log('Center styles margin top:', centerRef.current?.style.marginTop);
      // console.log('Computed style', getComputedStyle(centerRef.current).marginTop);
      const centerMarginTop =
        (centerRef.current && Number.parseInt(getComputedStyle(centerRef.current).marginTop)) || 0;
      const centerTopOffset = centerPosition?.top - modalPosition?.top;
      console.log('Center top offset', centerTopOffset);
      // console.log('Side margin', centerPosition?.x - modalPosition?.x);
      console.log('Calculated center bottom margin', modalPosition?.bottom - centerPosition?.bottom);
      console.log('Calculated max image height', modalHeight - centerTopOffset - 16);
      if (modalHeight > 300) {
        setImageShown(true);
      }
      if (imageShown) {
        setImageHeight(Math.trunc(modalHeight - centerTopOffset - 16));
      }
    }
  }, [modalHeight, modalWidth, modalRef, imageShown, centerRef]);

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
    const modalPosition = modalRef.current?.getBoundingClientRect();
    console.log('Modal position when image clicked:', modalPosition);
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
          <Modal.Body>
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
