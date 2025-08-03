import { useElementSize, useShallowEffect } from '@mantine/hooks';
import { useAtomValue } from 'jotai';
import { useLayoutEffect, useRef, useState } from 'react';
import { imageShownAtom } from '~/atoms/imageAtoms';
import { FileModalHeaderHeight } from '~/components/upload/FileModal';
import type { ModalParamProps } from '~/components/upload/FileModal';

export const useModalResize = (onModalResize?: (params: ModalParamProps) => void) => {
  const { ref: modalRef, height: modalHeight } = useElementSize();
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const [modalParams, setModalParams] = useState<ModalParamProps>({
    modalInnerHeight: 0,
  });
  const imageShown = useAtomValue(imageShownAtom);

  useShallowEffect(() => {
    if (onModalResize && modalParams.modalInnerHeight) {
      console.log('useShallowEffect triggered (FileModal), modalParams updated:', modalParams);
      onModalResize(modalParams);
    }
  }, [onModalResize, modalParams]);

  useLayoutEffect(() => {
    if (modalRef.current && modalBodyRef.current) {
      console.log('useLayoutEffect triggered (FileModal), imageShown modalHeight:', imageShown, modalHeight);
      const modalParameters = modalRef.current.getBoundingClientRect();
      const modalRenderedHeight = modalParameters.height; // Get the actual DOM height of the modal
      const modalBottomPadding = Number.parseInt(getComputedStyle(modalBodyRef.current).paddingBottom, 10);
      setModalParams({
        modalInnerHeight: Math.trunc(modalRenderedHeight - FileModalHeaderHeight - modalBottomPadding),
      });
    }
  }, [modalRef, modalHeight, setModalParams, imageShown]);

  return {
    modalRef,
    modalBodyRef,
  } as const;
};
