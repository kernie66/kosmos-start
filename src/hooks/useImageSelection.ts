import { useSelector } from '@xstate/react';
import { useCallback } from 'react';
import { imageSelector } from '~/fsm/contexts/imageSelectionValues';
import { ImageSelectionContext } from '~/routes/_auth/upload';
import type { ImageSelectionEvents } from '~/fsm/events/imageSelectionEvents';

export const useImageSelection = () => {
  const imageSelectionActor = ImageSelectionContext.useActorRef();
  const imageSelectionValues = ImageSelectionContext.useSelector(imageSelector.imageSelectionValues);

  const sendToShowImage = ImageSelectionContext.useSelector(imageSelector.sendShowImageEvent);
  const showImageActor = ImageSelectionContext.useSelector(imageSelector.showImageActor);
  const imageState = useSelector(showImageActor, (snapshot) => snapshot.context.imageState);

  const sendToImageSelection = useCallback(
    (event: ImageSelectionEvents) => {
      imageSelectionActor.send(event);
    },
    [imageSelectionActor],
  );

  return {
    sendToImageSelection,
    imageSelectionValues,
    sendToShowImage,
    showImageActor,
    imageState,
  };
};
