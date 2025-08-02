import { Modal } from '@mantine/core';
import { useElementSize, useShallowEffect } from '@mantine/hooks';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';

export type ModalParamProps = {
  modalInnerHeight: number;
};

type FileModalProps = {
  children?: React.ReactNode;
  modalOpened?: boolean;
  fullScreen?: boolean;
  imageShown?: boolean;
  // setModalParams?: (params: { opened: boolean }) => void;
  onModalResize?: (modalParams: ModalParamProps) => void;
  onModalClose?: () => void;
};

const modalHeaderHeight = 60; // Default header height for the modal

export default function FileModal({
  children,
  modalOpened = true,
  fullScreen = false,
  imageShown = false,
  onModalResize,
  onModalClose,
}: FileModalProps) {
  const { ref: modalRef, height: modalHeight } = useElementSize();
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const [modalParams, setModalParams] = useState<ModalParamProps>({
    modalInnerHeight: 0,
  });

  useShallowEffect(() => {
    console.log('useShallowEffect triggered (FileModal)');
    if (onModalResize) {
      onModalResize(modalParams);
    }
  }, [onModalResize, modalParams]);

  useLayoutEffect(() => {
    console.log('useLayoutEffect triggered (FileModal)');

    if (modalRef.current && modalBodyRef.current) {
      const modalPosition = modalRef.current.getBoundingClientRect();
      console.log('Modal position:', modalPosition);
      const modalPositionHeight = modalPosition.height; // Get the actual DOM height of the modal
      const modalBottomPadding = Number.parseInt(getComputedStyle(modalBodyRef.current).paddingBottom, 10);
      console.log('modalHeight', modalPositionHeight);
      console.log('modalBottomPadding', modalBottomPadding);
      setModalParams({
        modalInnerHeight: modalPositionHeight - modalHeaderHeight - modalBottomPadding,
      });
    }
  }, [modalRef, modalHeight, modalBodyRef, setModalParams, imageShown]);

  // Function to handle modal close actions
  const handleClose = useCallback(() => {
    if (onModalClose) {
      onModalClose();
    }
  }, [onModalClose]);

  return (
    <>
      <Modal.Root opened={modalOpened} onClose={handleClose} fullScreen={fullScreen} size="lg">
        <Modal.Overlay />
        <Modal.Content ref={modalRef}>
          <Modal.Header p={0} m={0} h={modalHeaderHeight}>
            <Modal.Title fw={700} fz="xl" p={8} c="teal.6">
              {!fullScreen ? 'Välj en fil att ladda upp' : 'Klicka på bilden för att gå tillbaka'}
            </Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body ref={modalBodyRef}>{children}</Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
