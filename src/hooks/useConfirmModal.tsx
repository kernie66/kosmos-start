import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { nprogress } from '@mantine/nprogress';
import { useCallback } from 'react';

interface ConfirmModalProps {
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const useConfirmLogout = () => {
  const logoutModal = useCallback(({ onConfirm, onCancel }: ConfirmModalProps) => {
    nprogress.set(25); // Set progress to 25% to indicate the modal is opening
    nprogress.stop(); // Stop the progress bar to avoid confusion

    // Open a confirm modal with Mantine's modals
    modals.openConfirmModal({
      title: 'Loggar ut',
      children: <Text size="sm">Är du säker på att du vill logga ut?</Text>,
      labels: { confirm: 'Logga ut', cancel: 'Avbryt' },
      onCancel: () => {
        nprogress.reset(); // Reset progress bar on cancel
        if (onCancel) {
          onCancel();
        }
      },
      onConfirm: () => {
        nprogress.start(); // Start progress bar on confirm
        if (onConfirm) {
          onConfirm();
        }
      },
    });
  }, []);

  return { logoutModal };
};
