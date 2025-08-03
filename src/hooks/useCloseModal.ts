import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from '@tanstack/react-router';
import { useCallback } from 'react';
import { closeImageModalMessage, useConfirmModal } from './useConfirmModal';

export const useCloseModal = () => {
  const [modalOpened, { close: closeModal }] = useDisclosure(true);
  const navigate = useNavigate();
  const { confirmModal: confirmCloseModal } = useConfirmModal();

  // Function for closing the modal and return to the main page
  const leaveFileModal = useCallback(() => {
    closeModal();
    navigate({ to: '/' });
  }, [closeModal, navigate]);

  // Function to handle modal close actions
  const handleClose = useCallback(
    ({ confirm = true }) => {
      if (confirm) {
        confirmCloseModal({ message: closeImageModalMessage, onConfirm: leaveFileModal });
      } else {
        leaveFileModal();
      }
    },
    [confirmCloseModal, leaveFileModal],
  );

  return {
    modalOpened,
    closeModal: handleClose,
  } as const;
};
