import { Button } from '@mantine/core';
import { useCallback } from 'react';
import { imageSelectionActor } from '~/fsm/selectImageMachine';

export default function PasteClipboardButton() {
  const handleClipboardImage = useCallback(() => {
    imageSelectionActor.send({ type: 'get image.clipboard' });
  }, []);

  return (
    <Button onClick={handleClipboardImage} variant="light" color="teal" my="md" fullWidth>
      Klistra in bild från urklipp
    </Button>
  );
}
