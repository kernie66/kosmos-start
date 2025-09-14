import { Button } from '@mantine/core';
import { useCallback } from 'react';
import { ImageSelectionContext } from '~/routes/_auth/upload';

export default function PasteClipboardButton() {
  const imageSelectionActor = ImageSelectionContext.useActorRef();

  const handleClipboardImage = useCallback(() => {
    imageSelectionActor.send({ type: 'get image.clipboard' });
  }, [imageSelectionActor]);

  return (
    <Button onClick={handleClipboardImage} variant="light" color="teal" fullWidth>
      Klistra in bild från urklipp
    </Button>
  );
}
