import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useCallback } from 'react';

interface ConfirmModalProps {
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const useConfirmClose = () => {
  const closeImageModal = useCallback(({ onConfirm, onCancel }: ConfirmModalProps) => {
    // Open a confirm modal with Mantine's modals
    modals.openConfirmModal({
      title: (
        <Text size="lg" fw={700} c="teal.6">
          Stänger filväljare
        </Text>
      ),
      children: (
        <>
          <Text size="md">Är du säker på att du vill stänga filväljaren?</Text>
          <Text size="md">Alla ändringar kommer att gå förlorade.</Text>
        </>
      ),
      labels: { confirm: 'Stäng', cancel: 'Avbryt' },
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

  return { closeImageModal };
};
