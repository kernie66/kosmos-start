import { Modal } from '@mantine/core';
import { useCallback } from 'react';
import { useModalResize } from '~/hooks/useModalResize';

export type ModalParamProps = {
  modalInnerHeight: number;
};

type FileModalProps = {
  children?: React.ReactNode;
  modalOpened?: boolean;
  fullScreen?: boolean;
  // setModalParams?: (params: { opened: boolean }) => void;
  onModalResize?: (modalParams: ModalParamProps) => void;
  onModalClose?: () => void;
};

export const FileModalHeaderHeight = 60; // Default header height for the modal

export default function FileModal({
  children,
  modalOpened = true,
  fullScreen = false,
  onModalResize,
  onModalClose,
}: FileModalProps) {
  const { modalRef, modalBodyRef } = useModalResize(onModalResize);
  // const { ref: modalRef, height: modalHeight } = useElementSize();
  // const modalBodyRef = useRef<HTMLDivElement>(null);
  // const [modalParams, setModalParams] = useState<ModalParamProps>({
  // modalInnerHeight: 0,
  // });

  /*
  useShallowEffect(() => {
    if (onModalResize && modalParams.modalInnerHeight) {
      console.log('useShallowEffect triggered (FileModal), modalParams updated:', modalParams);
      onModalResize(modalParams);
    }
  }, [onModalResize, modalParams]);

  useLayoutEffect(() => {
    if (modalRef.current && modalBodyRef.current) {
      console.log('useLayoutEffect triggered (FileModal), imageShown modalHeight:', imageShown, modalHeight);
      const modalParameters = modalRef.current.getBoundingClientRect();
      const modalRenderedHeight = modalParameters.height; // Get the actual DOM height of the modal
      const modalBottomPadding = Number.parseInt(getComputedStyle(modalBodyRef.current).paddingBottom, 10);
      setModalParams({
        modalInnerHeight: Math.trunc(modalRenderedHeight - FileModalHeaderHeight - modalBottomPadding),
      });
    }
  }, [modalRef, modalHeight, setModalParams, imageShown]);
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
        <Modal.Content ref={modalRef}>
          <Modal.Header p={0} m={0} h={FileModalHeaderHeight}>
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
