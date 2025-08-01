import { useThrottledCallback, useWindowEvent } from '@mantine/hooks';
import { useLayoutEffect, useRef, useState } from 'react';
import type { ImageStateProps } from '~/components/upload/PreviewImage';

export type ResizeParamProps = {
  innerHeight: number;
  topPosition: number;
};

export const useImageResize = () => {
  const [imageHeight, setImageHeight] = useState<ImageStateProps>('100%');
  const [imageShown, setImageShown] = useState(false);
  const [modalResized, setModalResized] = useState(false);
  const [resizeParams, setResizeParams] = useState<ResizeParamProps>({
    innerHeight: 0,
    topPosition: 0,
  });
  // const { ref: modalRef, height: modalHeight } = useElementSize();
  // const modalBodyRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  // const previousModalHeight = usePrevious(modalHeight);
  // const modalResized = useMemo(() => modalHeight !== previousModalHeight, [modalHeight, previousModalHeight]);
  console.log('Image height (hook):', imageHeight);

  useLayoutEffect(() => {
    console.log('useLayoutEffect triggered (hook)');
    console.log('Image shown:', imageShown);

    if (centerRef.current && resizeParams.innerHeight) {
      // const modalPosition = modalRef.current.getBoundingClientRect();
      // console.log('Modal position:', modalPosition);
      const centerPosition = centerRef.current.getBoundingClientRect();
      console.log('Center position:', centerPosition);
      const centerTopOffset = centerPosition.top - resizeParams.topPosition;
      const centerHeightInt = Math.trunc(centerPosition.height);
      const maxImageHeight = Math.trunc(resizeParams.innerHeight - centerTopOffset);
      console.log('Center top offset', centerTopOffset);
      console.log('Calculated max image height', maxImageHeight);
      console.log('Center height difference:', centerHeightInt - maxImageHeight);
      if (maxImageHeight && centerHeightInt) {
        setImageShown(true);
      }
      if (imageShown) {
        console.log('Setting final image height to:', Math.min(centerHeightInt, maxImageHeight));
        setImageHeight(Math.min(centerHeightInt, maxImageHeight));
      }
    }
  }, [modalResized, imageShown, imageHeight, centerRef, resizeParams]);

  const throttledResizeImage = useThrottledCallback(() => {
    console.log('Throttled resize image triggered');
    if (!imageShown) return;
    setImageShown(false);
    setImageHeight('100%');
  }, 500);

  useWindowEvent('resize', throttledResizeImage);

  const clearImageResize = (resizeParams: ResizeParamProps) => {
    setResizeParams(resizeParams);
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
