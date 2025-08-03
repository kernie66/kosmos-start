import { Button, Group } from '@mantine/core';

type SelectButtonProps = {
  showButtons?: boolean;
  buttonRef?: React.RefObject<HTMLDivElement | null>;
};

export function SelectButtons({ showButtons = true, buttonRef }: SelectButtonProps) {
  // If showButtons is false, we don't render the buttons
  if (!showButtons) return null;

  return (
    <Group justify="flex-end" mt="md" ref={buttonRef}>
      <Button variant="outline">Avbryt</Button>
      <Button>Välj bild</Button>
    </Group>
  );
}
