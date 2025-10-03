import { useCallback } from 'react';
import { imageSelector } from '~/fsm/contexts/imageSelectionContext';
import { ImageSelectionContext } from '~/routes/_auth/upload';
import type { ImageSelectionEvents } from '~/fsm/events/imageSelectionEvents';

export const useImageSelection = () => {
  const imageSelectionActor = ImageSelectionContext.useActorRef();
  const imageSelectionValues = ImageSelectionContext.useSelector(imageSelector.imageSelectionValues);

  const sendEvent = useCallback(
    (event: ImageSelectionEvents) => {
      imageSelectionActor.send(event);
    },
    [imageSelectionActor],
  );

  return {
    sendEvent,
    imageSelectionValues,
  };
};
