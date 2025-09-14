import { useElementSize, useShallowEffect } from '@mantine/hooks';
import { useCallback, useRef, useState } from 'react';
import { useImageSelection } from './useImageSelection';
import type { ModalParamProps } from '~/components/upload/FileModal';

export const useModalSize = () => {
  const { ref: modalRef, height: modalHeight } = useElementSize();
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const [modalSize, setModalSize] = useState<ModalParamProps>({
    modalInnerHeight: 0,
  });
  const { sendEvent, imageState, modalInnerHeight } = useImageSelection();

  // Function to handle modal resize
  const handleModalResize = useCallback(
    (modalSize: ModalParamProps) => {
      if (imageState === 'shown') {
        sendEvent({ type: 'image.resize', newSize: modalSize.modalInnerHeight });
      } else if (imageState === 'pre-render') {
        sendEvent({ type: 'image.fitted', newSize: modalSize.modalInnerHeight });
      }
    },
    [sendEvent, imageState],
  );

  useShallowEffect(() => {
    if (modalSize.modalInnerHeight > 52) {
      console.log('useShallowEffect triggered (FileModal), modalParams updated:', modalSize, imageState);
      handleModalResize(modalSize);
    }
  }, [modalSize]);

  /*
  useLayoutEffect(() => {
    if (modalRef.current && modalBodyRef.current) {
      console.log('useLayoutEffect triggered (FileModal), imageState modalHeight:', imageState, modalInnerHeight);
      const modalParameters = modalRef.current.getBoundingClientRect();
      const modalRenderedHeight = modalParameters.height; // Get the actual DOM height of the modal
      const modalBottomPadding = Number.parseInt(getComputedStyle(modalBodyRef.current).paddingBottom, 10);
      console.log('modalRenderedHeight', modalRenderedHeight, 'modalBottomPadding', modalBottomPadding);
      setModalSize({
        modalInnerHeight: Math.trunc(modalRenderedHeight - FileModalHeaderHeight - modalBottomPadding),
      });
    }
  }, [modalRef, setModalSize, imageState, modalInnerHeight, modalHeight]);
  */

  return {
    modalRef,
    modalBodyRef,
  } as const;
};
