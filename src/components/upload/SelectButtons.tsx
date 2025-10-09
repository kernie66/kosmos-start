import { Button, Group } from '@mantine/core';
import { useCallback } from 'react';
import { useImageSelection } from '~/hooks/useImageSelection';

type SelectButtonProps = {
  showButtons?: boolean;
  buttonRef?: React.RefObject<HTMLDivElement | null>;
  onSelect?: () => void;
  onCancel?: () => void;
};

export function SelectButtons({ showButtons = true, onSelect, onCancel }: SelectButtonProps) {
  const { sendToImageSelection } = useImageSelection();
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

  const handleChangeImage = useCallback(() => {
    sendToImageSelection({ type: 'select.update' });
  }, [sendToImageSelection]);

  // If showButtons is false, we don't render the buttons
  if (!showButtons) return null;

  return (
    <Group pt="sm" className="select-buttons">
      <Button variant="light" me="auto" onClick={handleChangeImage}>
        Byt ut bild
      </Button>
      <Button variant="outline" onClick={handleCancel}>
        Avbryt
      </Button>
      <Button onClick={handleSelect}>Välj bild</Button>
    </Group>
  );
}
