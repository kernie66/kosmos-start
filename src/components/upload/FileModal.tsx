import { Modal } from '@mantine/core';
import { useCallback } from 'react';
import { useModalSize } from '~/hooks/useModalSize';

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
  const { modalRef, modalBodyRef } = useModalSize();
  /*
  const { sendEvent, imageState } = useImageSelection();

  let modalInnerHeight = 1000;

  if (modalRef.current && modalBodyRef.current) {
    console.log('FileModal rendered with imageState:', imageState);
    const modalContent = document.getElementById('file-modal-content');
    const modalHeader = document.getElementById('file-modal-header');
    const selectButtons = document.getElementById('select-buttons');
    if (modalContent && modalHeader && selectButtons) {
      console.log('modalContent:', modalContent);
      console.log('modalHeader:', modalHeader);
      console.log('selectButtons:', selectButtons);
      const modalHeight = modalContent.getBoundingClientRect().height;
      const headerHeight = modalHeader.getBoundingClientRect().height;
      const buttonsHeight = selectButtons.getBoundingClientRect().height;
      console.log('modalHeight:', modalHeight, 'headerHeight:', headerHeight);
      console.log('buttonsHeight:', buttonsHeight);
      const modalBottomPadding = Number.parseInt(getComputedStyle(modalBodyRef.current).paddingBottom, 10);
      modalInnerHeight = Math.trunc(modalHeight - headerHeight - buttonsHeight - modalBottomPadding);
      console.log('- modalRenderedHeight:', modalHeight, '- modalInnerHeight:', modalInnerHeight);
    }
  }

  useLayoutEffect(() => {
    if (imageState === 'pre-render') {
      console.log(
        'useLayoutEffect triggered (FileModal), sending image.fitted with modalInnerHeight:',
        modalInnerHeight,
      );
      // sendEvent({ type: 'image.fitted', newSize: modalInnerHeight });
    }
  }, [modalInnerHeight]);
  */

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
        <Modal.Content ref={modalRef} id="file-modal-content">
          <Modal.Header p={0} m={0} h={FileModalHeaderHeight} id="file-modal-header">
            <Modal.Title fw={700} fz="xl" p={8} c="teal.6">
              {!fullScreen ? 'Välj eller klistra in en fil att ladda upp' : 'Klicka på bilden för att gå tillbaka'}
            </Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body ref={modalBodyRef}>{children}</Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
