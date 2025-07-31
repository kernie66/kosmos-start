import { useThrottledCallback, useWindowEvent } from '@mantine/hooks';
import { useLayoutEffect, useRef, useState } from 'react';
import type { ImageStateProps } from '~/components/upload/PreviewImage';

export const useImageResize = () => {
  const [imageHeight, setImageHeight] = useState<ImageStateProps>('100%');
  const [imageShown, setImageShown] = useState(false);
  const [modalResized, setModalResized] = useState(false);
  // const { ref: modalRef, height: modalHeight } = useElementSize();
  // const modalBodyRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  // const previousModalHeight = usePrevious(modalHeight);
  // const modalResized = useMemo(() => modalHeight !== previousModalHeight, [modalHeight, previousModalHeight]);
  console.log('Image height (hook):', imageHeight);

  useLayoutEffect(() => {
    console.log('useLayoutEffect triggered (hook)');
    console.log('Image shown:', imageShown);

    if (centerRef.current) {
      // const modalPosition = modalRef.current.getBoundingClientRect();
      // console.log('Modal position:', modalPosition);
      const centerPosition = centerRef.current.getBoundingClientRect();
      console.log('Center position:', centerPosition);
      // const centerTopOffset = centerPosition.top - modalPosition.top;
      // const modalBottomPadding = Number.parseInt(getComputedStyle(modalBodyRef.current).paddingBottom, 10);
      const centerHeightInt = Math.trunc(centerPosition.height);
      // const maxImageHeight = Math.trunc(modalPosition.height - centerTopOffset - modalBottomPadding);
      // console.log('Center top offset', centerTopOffset);
      // console.log('Calculated max image height', maxImageHeight);
      // console.log('Center height difference:', centerHeightInt - maxImageHeight);
      // if (maxImageHeight && centerHeightInt) {
      setImageShown(true);
      // }
      if (imageShown) {
        console.log('Setting final image height to:', Math.min(centerHeightInt)); // , maxImageHeight));
        // setImageHeight(Math.min(centerHeightInt, maxImageHeight));
      }
    }
  }, [modalResized, imageShown, imageHeight, centerRef]);

  const throttledResizeImage = useThrottledCallback(() => {
    console.log('Throttled resize image triggered');
    if (!imageShown) return;
    clearImageResize();
  }, 500);

  useWindowEvent('resize', throttledResizeImage);

  const clearImageResize = () => {
    setImageShown(false);
    setImageHeight('100%');
  };

  return {
    centerRef,
    imageHeight,
    imageShown,
    setImageShown,
    setImageHeight,
    setModalResized,
    clearImageResize,
  };
};
