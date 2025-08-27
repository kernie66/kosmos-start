import { Button, Group } from '@mantine/core';
import { useCallback } from 'react';
import { imageSelectionActor } from '~/fsm/selectImageMachine';

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

  const handleChangeImage = useCallback(() => {
    imageSelectionActor.send({ type: 'change image' });
  }, []);

  // If showButtons is false, we don't render the buttons
  if (!showButtons) return null;

  return (
    <Group mt="md" ref={buttonRef}>
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
