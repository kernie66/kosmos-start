import { useCallback } from 'react';
import {
  selectCenterHeight,
  selectDropzoneSubText,
  selectFullscreen,
  selectImageSelected,
  selectImageShown,
  selectImageState,
  selectModalInnerHeight,
  selectNewSize,
  selectSelectedFile,
} from '~/fsm/contexts/imageSelectionContext';
import { ImageSelectionContext } from '~/routes/_auth/upload';
import type { ImageSelectionEvents } from '~/fsm/imageSelectionMachine';

export const useImageSelection = () => {
  const imageSelectionActor = ImageSelectionContext.useActorRef();
  const selectedFile = ImageSelectionContext.useSelector(selectSelectedFile);
  const fullscreen = ImageSelectionContext.useSelector(selectFullscreen);
  const imageSelected = ImageSelectionContext.useSelector(selectImageSelected);
  const dropzoneSubText = ImageSelectionContext.useSelector(selectDropzoneSubText);
  const centerHeight = ImageSelectionContext.useSelector(selectCenterHeight);
  const modalInnerHeight = ImageSelectionContext.useSelector(selectModalInnerHeight);
  const newSize = ImageSelectionContext.useSelector(selectNewSize);
  const imageShown = ImageSelectionContext.useSelector(selectImageShown);
  const imageState = ImageSelectionContext.useSelector(selectImageState);

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
    centerHeight,
    modalInnerHeight,
    newSize,
    imageShown,
    imageState,
  };
};
