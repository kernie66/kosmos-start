import { Box, Button, Center, Modal, Text } from '@mantine/core';
import { useDisclosure, useElementSize, useViewportSize } from '@mantine/hooks';
import { useLayoutEffect, useState } from 'react';
import PreviewImage from './PreviewImage';
import SelectFile from './SelectFile';
import type { ImageStateProps } from './PreviewImage';
import type { FileStateProps } from './SelectFile';

export default function FileModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const [fullScreen, { close: restoreFullScreen, toggle: toggleFullScreen }] = useDisclosure(false);
  const [selectedFile, setSelectedFile] = useState<FileStateProps>();
  const [imageShown, setImageShown] = useState(false);
  const { width: viewportWidth, height: viewportHeight } = useViewportSize();
  const [imageHeight, setImageHeight] = useState<ImageStateProps>('100%');

  const { ref: modalRef, width: modalWidth, height: modalHeight } = useElementSize();
  const { ref: centerRef, width: centerWidth, height: centerHeight } = useElementSize();

  const marginTop = fullScreen ? 0 : 'md'; // Remove image margin when in full screen

  console.log('Viewport size:', viewportWidth, viewportHeight);
  console.log('Center height', centerHeight, 'Center width', centerWidth);

  useLayoutEffect(() => {
    console.log('useLayoutEffect triggered');
    console.log('Closest modalRef:', modalRef.current?.closest('section'));
    console.log('Image shown:', imageShown);
    console.log('Modal height', modalHeight, 'Modal width', modalWidth);
    const scrollWidth = modalRef.current?.scrollWidth;
    const scrollHeight = modalRef.current?.scrollHeight;
    console.log('ScrollWidth:', scrollWidth);
    console.log('ScrollHeight:', scrollHeight);
    const modalPosition = modalRef.current?.getBoundingClientRect();
    console.log('Modal position:', modalPosition);
    const centerPosition = centerRef.current?.getBoundingClientRect();
    console.log('Center position (layout):', centerPosition);
    console.log('Center styles:', centerRef.current?.style);
    console.log('Center styles:', centerRef.current?.style.marginTop);
    if (centerRef.current) {
      console.log('Computed style', getComputedStyle(centerRef.current).marginTop);
    }
    const centerMarginTop = (centerRef.current && Number.parseInt(getComputedStyle(centerRef.current).marginTop)) || 0;
    console.log('Top margin', centerPosition?.top - modalPosition?.top);
    console.log('Side margin', centerPosition?.x - modalPosition?.x);
    console.log('Bottom margin', modalPosition?.bottom - centerPosition?.bottom);
    console.log('Image height', modalPosition?.bottom - centerPosition?.top);
    if (modalHeight > 300) {
      setImageShown(true);
    }
    if (imageShown) {
      setImageHeight(Math.trunc(modalPosition.bottom - centerPosition.top - centerMarginTop));
    }
  }, [modalHeight, modalWidth, modalRef, imageShown, centerRef]);

  // Function to handle button click
  function handleButtonClicked() {
    if (opened) {
      handleClose();
    } else {
      open();
    }
  }

  // Function to handle file selection
  function handleSelectedFile(file: FileStateProps) {
    console.log('Selected file:', file);
    setSelectedFile(file);
    setImageShown(false);
    setImageHeight('100%');
  }

  // Function to handle image click
  function handleImageClicked() {
    console.log('Image clicked');
    toggleFullScreen();
    setImageHeight('100%');
    const modalPosition = modalRef.current?.getBoundingClientRect();
    console.log('Modal position:', modalPosition);
  }

  // Function to handle modal close
  function handleClose() {
    restoreFullScreen();
    setSelectedFile(null);
    setImageShown(false);
    close();
  }

  return (
    <>
      <Modal.Root opened={opened} onClose={handleClose} fullScreen={fullScreen} size="lg">
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
              {selectedFile ? (
                <PreviewImage file={selectedFile} onImageClicked={handleImageClicked} maxHeight={imageHeight} />
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
        {!opened ? 'Öppna filväljare' : 'Stäng filväljare'}
      </Button>
    </>
  );
}
