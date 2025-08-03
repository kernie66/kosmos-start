import { Button, Group } from '@mantine/core';
import { useCallback } from 'react';

type SelectButtonProps = {
  showButtons?: boolean;
  buttonRef?: React.RefObject<HTMLDivElement | null>;
  onSelect?: () => void;
  onCancel?: () => void;
};

export function SelectButtons({ showButtons = true, buttonRef, onSelect, onCancel }: SelectButtonProps) {
  const handleSelect = useCallback(() => {
    if (onSelect) {
      onSelect();
    }
  }, [onSelect]);

  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel();
    }
  }, [onCancel]);

  // If showButtons is false, we don't render the buttons
  if (!showButtons) return null;

  return (
    <Group justify="flex-end" mt="md" ref={buttonRef}>
      <Button variant="outline" onClick={handleCancel}>
        Avbryt
      </Button>
      <Button onClick={handleSelect}>Välj bild</Button>
    </Group>
  );
}
