import { Modal } from '@mantine/core';
import { useCallback } from 'react';

export type ModalParamProps = {
  modalInnerHeight: number;
};

type FileModalProps = {
  children?: React.ReactNode;
  modalOpened?: boolean;
  fullScreen?: boolean;
  onModalClose?: () => void;
};

export const FileModalHeaderHeight = 60; // Default header height for the modal

export default function FileModal({ children, modalOpened = true, fullScreen = false, onModalClose }: FileModalProps) {
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
        <Modal.Content id="file-modal-content">
          <Modal.Header p={0} m={0} h={FileModalHeaderHeight} id="file-modal-header">
            <Modal.Title fw={700} fz="xl" p={8} c="teal.6">
              {!fullScreen ? 'Välj eller klistra in en fil att ladda upp' : 'Klicka på bilden för att gå tillbaka'}
            </Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body className="file-modal-body">{children}</Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
