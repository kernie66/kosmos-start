import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { nprogress } from '@mantine/nprogress';
import { useCallback } from 'react';
import type React from 'react';

interface ConfirmModalProps {
  message: {
    title: React.ReactNode;
    text: React.ReactNode;
    labels: { confirm: string; cancel: string };
  };
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const logoutMessage = {
  title: (
    <Text size="lg" fw={700} c="teal.6">
      Loggar ut
    </Text>
  ),
  text: <Text size="md">Är du säker på att du vill logga ut?</Text>,
  labels: { confirm: 'Logga ut', cancel: 'Avbryt' },
};

export const closeImageModalMessage = {
  title: (
    <Text size="lg" fw={700} c="teal.6">
      Stänger filväljare
    </Text>
  ),
  text: (
    <>
      <Text size="md">Är du säker på att du vill stänga filväljaren?</Text>
      <Text size="md">Alla ändringar kommer att gå förlorade.</Text>
    </>
  ),
  labels: { confirm: 'Stäng', cancel: 'Avbryt' },
};

export const useConfirmModal = () => {
  const confirmModal = useCallback(({ message, onConfirm, onCancel }: ConfirmModalProps) => {
    nprogress.set(25); // Set progress to 25% to indicate the modal is opening
    nprogress.stop(); // Stop the progress bar to avoid confusion

    // Open a confirm modal with Mantine's modals
    modals.openConfirmModal({
      title: message.title,
      children: message.text,
      labels: message.labels,
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

  return { confirmModal };
};
