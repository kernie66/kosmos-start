import { Image, UnstyledButton } from '@mantine/core';
import { useLogger } from '@mantine/hooks';
import { memo, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useImageSelection } from '~/hooks/useImageSelection';
import { getImageFileInfo } from '~/lib/utils/getImageFileInfo';
import type { FileStateProps } from './SelectFile';

export type ImageSizeSelections = '100%' | '95vh' | '100vh' | '100vw' | 'auto';
export type ImageSizeProps = ImageSizeSelections | number;

type PreviewImageProps = {
  file: FileStateProps;
};

const imageWidth = '100%';
const maxImageWidth = '100vw';

function PreviewImage({ file }: PreviewImageProps) {
  const { sendEvent, modalInnerHeight, imageState } = useImageSelection();
  // Set image height to large value to get the DOM size before actual image is loaded
  const [imageHeight, setImageHeight] = useState<ImageSizeProps>('95vh');
  const [maxImageHeight, setMaxImageHeight] = useState<ImageSizeProps>('100%');
  const imageRef = useRef<HTMLButtonElement>(null);

  const image = getImageFileInfo(file);

  let modalHeight = 0;
  let headerHeight = 0;
  let bodyHeight = 0;
  let newModalInnerHeight = 0;

  if (imageState) {
    console.log('PreviewImage rendered with imageState:', imageState);
    const modalContent = document.getElementById('file-modal-content');
    const modalHeader = document.getElementById('file-modal-header');
    const selectFileStack = document.getElementById('select-file-stack');
    const selectButtons = document.getElementById('select-buttons');
    const modalBody = selectButtons?.closest('.file-modal-body'); // 'section > div'); // document.getElementsByClassName('file-modal-body');
    if (modalContent && modalHeader && selectButtons) {
      console.log('modalContent:', modalContent);
      console.log('modalHeader:', modalHeader);
      console.log('modalBody:', modalBody);
      console.log('selectButtons:', selectButtons);
      modalHeight = modalContent.getBoundingClientRect().height;
      headerHeight = modalHeader.getBoundingClientRect().height;
      bodyHeight = modalBody ? modalBody.getBoundingClientRect().height : 0;
      const bodyBottomPadding = Number.parseInt(getComputedStyle(modalBody).paddingBottom, 10);
      console.log('bodyPadding:', bodyBottomPadding);
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
      newModalInnerHeight = Math.trunc(
        modalHeight - headerHeight - selectStackHeight - buttonsHeight - bodyBottomPadding,
      );
      console.log(
        'selectZoneHeight:',
        selectStackHeight,
        'buttonsHeight:',
        buttonsHeight,
        'buttonsTopMargin:',
        buttonsTopMargin,
      );
    }
  }

  const previewImage = document.getElementById('preview-image');
  if (previewImage) {
    console.log('previewImage found:', previewImage);
  }
  useLogger('PreviewImage', [{ file, modalHeight, headerHeight, modalInnerHeight, newModalInnerHeight }]);

  useLayoutEffect(() => {
    const imageHeight = imageRef.current.getBoundingClientRect().height;
    console.log('useLayoutEffect activated, imageHeight:', imageHeight);
    setImageHeight('100%');
    sendEvent({ type: 'image.pre-render' });
  }, []);

  useLayoutEffect(() => {
    console.log('PreviewImage useLayoutEffect triggered, imageState:', imageState);
    if (newModalInnerHeight > 52 && newModalInnerHeight !== modalInnerHeight) {
      sendEvent({ type: 'image.pre-rendered', newSize: newModalInnerHeight });
      console.log('PreviewImage modalInnerHeight set to:', newModalInnerHeight);
    }
    const previewImageHeight = previewImage?.getBoundingClientRect().height;
    console.log('previewImageHeight in useLayoutEffect', previewImageHeight, imageState);
    console.log('modalHeight:', modalHeight, 'headerHeight:', headerHeight);
    console.log('- modalRenderedHeight:', modalHeight, '- modalInnerHeight:', modalInnerHeight);
    setMaxImageHeight(modalInnerHeight || '100%');
  }, [imageState]);

  // Function to handle image click
  const handleImageClicked = useCallback(() => {
    sendEvent({ type: 'fullscreen.toggle' });
  }, [sendEvent]);

  return (
    <UnstyledButton onClick={handleImageClicked} ref={imageRef}>
      <Image
        id="preview-image"
        key={image.fileName}
        src={image.imageUrl}
        onLoad={() => URL.revokeObjectURL(image.imageUrl)}
        fit="contain"
        alt={image.imageName || image.fileName}
        radius="md"
        h={imageHeight}
        mah={maxImageHeight}
        w={imageWidth}
        maw={maxImageWidth}
      />
    </UnstyledButton>
  );
}

export default memo(PreviewImage);
