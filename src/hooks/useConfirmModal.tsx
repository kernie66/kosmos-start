import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useCallback } from 'react';

interface ConfirmModalProps {
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const useConfirmLogout = () => {
  const logoutModal = useCallback(({ onConfirm, onCancel }: ConfirmModalProps) => {
    // Open a confirm modal with Mantine's modals
    modals.openConfirmModal({
      title: 'Loggar ut',
      children: <Text size="sm">Är du säker på att du vill logga ut?</Text>,
      labels: { confirm: 'Logga ut', cancel: 'Avbryt' },
      onCancel: () => {
        if (onCancel) {
          onCancel();
        }
      },
      onConfirm: () => {
        if (onConfirm) {
          onConfirm();
        }
      },
    });
  }, []);

  return { logoutModal };
};
