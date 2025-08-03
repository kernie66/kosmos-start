import { useThrottledCallback, useWindowEvent } from '@mantine/hooks';
import { useAtom } from 'jotai';
import { useLayoutEffect, useRef, useState } from 'react';
import { imageShownAtom } from '~/atoms/imageAtoms';
import type { ImageStateProps } from '~/components/upload/PreviewImage';

/**
 * Hook for calculating the height of the center part of a box.
 *
 * @export centerRef - Reference to the center element.
 * @export topRef - Reference to the top element.
 * @export bottomRef - Reference to the bottom element.
 * @export centerHeight - The calculated height of the center element.
 * @export clearCenterSize - Function to clear the center size and reset the height.
 * @returns {Object} An object containing the centerRef, topRef, bottomRef,
 * centerHeight, and clearCenterSize function.
 * @typedef {ResizeParamProps}
 */

export type ResizeParamProps = {
  innerHeight: number;
};

export const useCenterSize = () => {
  const [centerHeight, setCenterHeight] = useState<ImageStateProps>('100%');
  const [imageShown, setImageShown] = useAtom(imageShownAtom);
  const [resizeParams, setResizeParams] = useState<ResizeParamProps>({
    innerHeight: 0,
  });
  const centerRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Function to handle resize events
  useLayoutEffect(() => {
    console.log('useLayoutEffect triggered (useCenterSize)', resizeParams, imageShown);

    if (centerRef.current && resizeParams.innerHeight) {
      const centerParams = centerRef.current.getBoundingClientRect();
      let dropzoneHeight = 0;
      let bottomHeight = 0;
      if (topRef.current?.parentElement) {
        const dropzoneElement = topRef.current.parentElement.closest('div');
        if (dropzoneElement) {
          dropzoneHeight = dropzoneElement.getBoundingClientRect().height || 0;
          const dropzoneBottomMargin = Number.parseInt(getComputedStyle(dropzoneElement).marginBottom, 10);
          dropzoneHeight += dropzoneBottomMargin;
        }
      }
      if (bottomRef.current) {
        bottomHeight = bottomRef.current.getBoundingClientRect().height || 0;
        const bottomTopMargin = Number.parseInt(getComputedStyle(bottomRef.current).marginTop, 10);
        bottomHeight += bottomTopMargin;
      }
      const centerHeightInt = Math.trunc(centerParams.height);
      const maxCenterHeight = Math.trunc(resizeParams.innerHeight - dropzoneHeight - bottomHeight);
      console.log('Calculated max center height', maxCenterHeight);
      console.log('Center height difference:', centerHeightInt - maxCenterHeight);
      if (maxCenterHeight && centerHeightInt) {
        setImageShown(true);
      }
      if (imageShown) {
        console.log('Setting final center height to:', Math.min(centerHeightInt, maxCenterHeight));
        setCenterHeight(Math.min(centerHeightInt, maxCenterHeight));
      }
    }
  }, [imageShown, setImageShown, centerRef, resizeParams]);

  const throttledResizeCenter = useThrottledCallback(() => {
    console.log('Throttled resize image triggered');
    if (!imageShown) return;
    setImageShown(false);
    setCenterHeight('100%');
  }, 500);

  useWindowEvent('resize', throttledResizeCenter);

  const clearCenterSize = (resizeParams: ResizeParamProps) => {
    setResizeParams(resizeParams);
    setImageShown(false);
    setCenterHeight('100%');
  };

  return {
    centerRef,
    topRef,
    bottomRef,
    centerHeight,
    clearCenterSize,
  } as const;
};
