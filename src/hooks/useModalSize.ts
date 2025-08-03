import { useElementSize, useShallowEffect } from '@mantine/hooks';
import { useAtomValue } from 'jotai';
import { useLayoutEffect, useRef, useState } from 'react';
import { imageShownAtom } from '~/atoms/imageAtoms';
import { FileModalHeaderHeight } from '~/components/upload/FileModal';
import type { ModalParamProps } from '~/components/upload/FileModal';

export const useModalSize = (onModalResize?: (params: ModalParamProps) => void) => {
  const { ref: modalRef, height: modalHeight } = useElementSize();
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const [modalSize, setModalSize] = useState<ModalParamProps>({
    modalInnerHeight: 0,
  });
  const imageShown = useAtomValue(imageShownAtom);

  useShallowEffect(() => {
    if (onModalResize && modalSize.modalInnerHeight) {
      console.log('useShallowEffect triggered (FileModal), modalParams updated:', modalSize);
      onModalResize(modalSize);
    }
  }, [onModalResize, modalSize]);

  useLayoutEffect(() => {
    if (modalRef.current && modalBodyRef.current) {
      console.log('useLayoutEffect triggered (FileModal), imageShown modalHeight:', imageShown, modalHeight);
      const modalParameters = modalRef.current.getBoundingClientRect();
      const modalRenderedHeight = modalParameters.height; // Get the actual DOM height of the modal
      const modalBottomPadding = Number.parseInt(getComputedStyle(modalBodyRef.current).paddingBottom, 10);
      setModalSize({
        modalInnerHeight: Math.trunc(modalRenderedHeight - FileModalHeaderHeight - modalBottomPadding),
      });
    }
  }, [modalRef, modalHeight, setModalSize, imageShown]);

  return {
    modalRef,
    modalBodyRef,
  } as const;
};
