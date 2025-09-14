import { Button, Group } from '@mantine/core';
import { useCallback } from 'react';
import { ImageSelectionContext } from '~/routes/_auth/upload';

type SelectButtonProps = {
  showButtons?: boolean;
  buttonRef?: React.RefObject<HTMLDivElement | null>;
  onSelect?: () => void;
  onCancel?: () => void;
};

export function SelectButtons({ showButtons = true, buttonRef, onSelect, onCancel }: SelectButtonProps) {
  const imageSelectionActor = ImageSelectionContext.useActorRef();

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
    imageSelectionActor.send({ type: 'image.update' });
  }, [imageSelectionActor]);

  // If showButtons is false, we don't render the buttons
  if (!showButtons) return null;

  return (
    <Group py="sm" ref={buttonRef} id="select-buttons">
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
