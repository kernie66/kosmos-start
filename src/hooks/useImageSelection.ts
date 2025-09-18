import { useCallback } from 'react';
import {
  selectDropzoneSubText,
  selectFullscreen,
  selectImageSelected,
  selectImageShown,
  selectImageState,
  selectSelectedFile,
  selectShowSelect,
} from '~/fsm/contexts/imageSelectionContext';
import { ImageSelectionContext } from '~/routes/_auth/upload';
import type { ImageSelectionEvents } from '~/fsm/imageSelectionMachine';

export const useImageSelection = () => {
  const imageSelectionActor = ImageSelectionContext.useActorRef();
  const selectedFile = ImageSelectionContext.useSelector(selectSelectedFile);
  const fullscreen = ImageSelectionContext.useSelector(selectFullscreen);
  const imageSelected = ImageSelectionContext.useSelector(selectImageSelected);
  const dropzoneSubText = ImageSelectionContext.useSelector(selectDropzoneSubText);
  const imageShown = ImageSelectionContext.useSelector(selectImageShown);
  const imageState = ImageSelectionContext.useSelector(selectImageState);
  const showSelect = ImageSelectionContext.useSelector(selectShowSelect);

  const sendEvent = useCallback(
    (event: ImageSelectionEvents) => {
      imageSelectionActor.send(event);
    },
    [imageSelectionActor],
  );

  return {
    sendEvent,
    selectedFile,
    fullscreen,
    imageSelected,
    dropzoneSubText,
    imageShown,
    imageState,
    showSelect,
  };
};
