import { useThrottledCallback, useWindowEvent } from '@mantine/hooks';
import { useAtom } from 'jotai';
import { useLayoutEffect, useRef, useState } from 'react';
import { imageShownAtom } from '~/atoms/imageAtoms';
import type { ImageStateProps } from '~/components/upload/PreviewImage';

export type ResizeParamProps = {
  innerHeight: number;
};

export const useImageResize = () => {
  const [imageHeight, setImageHeight] = useState<ImageStateProps>('100%');
  const [imageShown, setImageShown] = useAtom(imageShownAtom);
  const [resizeParams, setResizeParams] = useState<ResizeParamProps>({
    innerHeight: 0,
  });
  const centerRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  // Function to handle window resize events
  useLayoutEffect(() => {
    console.log('useLayoutEffect triggered (useImageResize)', resizeParams, imageShown);

    if (centerRef.current && resizeParams.innerHeight) {
      // const modalPosition = modalRef.current.getBoundingClientRect();
      // console.log('Modal position:', modalPosition);
      const centerPosition = centerRef.current.getBoundingClientRect();
      let dropzoneHeight = 0;
      console.log('Center position:', centerPosition);
      if (selectRef.current?.parentElement) {
        const dropzoneElement = selectRef.current.parentElement.closest('div');
        if (dropzoneElement) {
          dropzoneHeight = dropzoneElement.getBoundingClientRect().height || 0;
          const dropzoneBottomMargin = Number.parseInt(getComputedStyle(dropzoneElement).marginBottom, 10);
          dropzoneHeight += dropzoneBottomMargin;
        }
      }
      console.log('dropzoneHeight', dropzoneHeight);
      const centerHeightInt = Math.trunc(centerPosition.height);
      const maxImageHeight = Math.trunc(resizeParams.innerHeight - dropzoneHeight);
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
  }, [imageShown, centerRef, resizeParams]);

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
    selectRef,
    imageHeight,
    setImageHeight,
    clearImageResize,
  };
};
