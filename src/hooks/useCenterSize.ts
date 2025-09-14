import { useThrottledCallback, useWindowEvent } from '@mantine/hooks';
import { useRef } from 'react';
import { useImageSelection } from './useImageSelection';

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
  centerHeight: number;
};

export const useCenterSize = () => {
  const { sendEvent, centerHeight, imageShown, imageState } = useImageSelection();
  // const [centerHeight, setCenterHeight] = useState<ImageSizeProps>('100%');
  // const [imageShown, setImageShown] = useAtom(imageShownAtom);
  // const [resizeParams, setResizeParams] = useState<ResizeParamProps>({
  // centerHeight: 0,
  // });
  const centerRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  let modalInnerHeight = 1000;

  if (imageState === 'not shown') {
    console.log('useCenterSize rendered with imageState:', imageState);
    const modalContent = document.getElementById('file-modal-content');
    const modalHeader = document.getElementById('file-modal-header');
    const selectFileStack = document.getElementById('select-file-stack');
    const selectButtons = document.getElementById('select-buttons');
    if (modalContent && modalHeader && selectButtons) {
      console.log('modalContent:', modalContent);
      console.log('modalHeader:', modalHeader);
      console.log('selectButtons:', selectButtons);
      const modalHeight = modalContent.getBoundingClientRect().height;
      const headerHeight = modalHeader.getBoundingClientRect().height;
      let selectStackHeight = 0;
      if (selectFileStack) {
        selectStackHeight = selectFileStack.getBoundingClientRect().height;
        const selectStackTopMargin = Number.parseInt(getComputedStyle(selectFileStack).marginBottom, 10);
        selectStackHeight += selectStackTopMargin;
      }
      let buttonsHeight = selectButtons.getBoundingClientRect().height;
      const buttonsTopMargin = Number.parseInt(getComputedStyle(selectButtons).marginTop, 10);
      buttonsHeight += buttonsTopMargin;
      const modalBottomPadding = Number.parseInt(getComputedStyle(modalContent).paddingBottom, 10);
      console.log('modalHeight:', modalHeight, 'headerHeight:', headerHeight);
      console.log(
        'selectZoneHeight:',
        selectStackHeight,
        'buttonsHeight:',
        buttonsHeight,
        'buttonsTopMargin:',
        buttonsTopMargin,
      );
      modalInnerHeight = Math.trunc(
        modalHeight - headerHeight - selectStackHeight - buttonsHeight - modalBottomPadding,
      );
      console.log('- modalRenderedHeight:', modalHeight, '- modalInnerHeight:', modalInnerHeight);
    }
  }

  /*
  useLayoutEffect(() => {
    console.log('useLayoutEffect triggered (useCenterSize), sending image.pre-rendered');
    sendEvent({ type: 'image.pre-rendered', newSize: modalInnerHeight });
  }, [imageState]);

  // Function to handle resize events
  useLayoutEffect(() => {
    console.log('useLayoutEffect triggered (useCenterSize)', centerHeight, imageState);

    if (centerRef.current && centerHeight && imageState !== 'shown') {
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
      const maxCenterHeight = Math.trunc(modalInnerHeight - dropzoneHeight - bottomHeight);
      console.log('centerHeightInt', centerHeightInt);
      console.log('Calculated max center height', maxCenterHeight);
      console.log('Center height difference:', centerHeightInt - maxCenterHeight);
      if (imageState === 'resizing') {
        if (maxCenterHeight && centerHeightInt) {
          // setImageShown(true);
          // sendEvent({ type: 'image.fitted' });
        } else {
          sendEvent({ type: 'image.finalize', newSize: '100%' });
        }
      }
      if (imageState === 'fitted') {
        console.log('Setting final center height to:', Math.min(centerHeightInt, maxCenterHeight));
        // setCenterHeight(Math.min(centerHeightInt, maxCenterHeight));
        sendEvent({ type: 'image.finalize', newSize: Math.min(centerHeightInt, maxCenterHeight) });
      }
    } else {
      // sendEvent({ type: 'image.fitted' });
    }
  }, [sendEvent, centerRef, imageState, centerHeight]);
  */

  const throttledResizeCenter = useThrottledCallback(() => {
    console.log('Throttled resize image triggered');
    if (!imageShown) return;
    // setImageShown(false);
    // setCenterHeight('100%');
    sendEvent({ type: 'image.resize', newSize: '100%' });
  }, 500);

  useWindowEvent('resize', throttledResizeCenter);

  /*
  const clearCenterSize = useCallback(
    (resizeParams?: ResizeParamProps) => {
      if (resizeParams) {
        setResizeParams(resizeParams);
      }
      setImageShown(false);
      setCenterHeight('100%');
    },
    [setImageShown],
  );
  */

  return {
    centerRef,
    topRef,
    bottomRef,
    centerHeight,
    // clearCenterSize,
  } as const;
};
