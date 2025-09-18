import { Image, UnstyledButton } from '@mantine/core';
import { useLogger, useThrottledCallback, useWindowEvent } from '@mantine/hooks';
import { memo, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useImageSelection } from '~/hooks/useImageSelection';
import { getImageFileInfo } from '~/lib/utils/getImageFileInfo';
import { getMaxImageHeight } from '~/lib/utils/getMaxImageHeight';
import type { FileStateProps } from './SelectFile';

export type ImageSizeSelections = '100%' | '95vh' | '100vh' | '100vw' | 'auto';
export type ImageSizeProps = ImageSizeSelections | number;

type PreviewImageProps = {
  file: FileStateProps;
};

const imageWidth = '100%';
const maxImageWidth = '100vw';

function PreviewImage({ file }: PreviewImageProps) {
  const { sendEvent, imageState } = useImageSelection();
  // Set image height to large value to get the DOM size before actual image is loaded
  const [imageHeight, setImageHeight] = useState<ImageSizeProps>('95vh');
  const [maxImageHeight, setMaxImageHeight] = useState<ImageSizeProps>('100%');
  const imageRef = useRef<HTMLImageElement>(null);

  const image = getImageFileInfo(file);

  const previewImage = document.getElementById('preview-image');
  if (previewImage) {
    console.log('previewImage found:', previewImage);
  }
  useLogger('PreviewImage', [{ imageState }]);

  const throttledResize = useThrottledCallback(() => {
    sendEvent({ type: 'image.resize' });
    // Restore default image height so that image is resized when window is resized
    setImageHeight('95vh');
    setMaxImageHeight('100%');
  }, 500);

  useWindowEvent('resize', () => {
    throttledResize();
  });

  useLayoutEffect(() => {
    console.log('useLayoutEffect activated:', imageState);
    if (imageState !== 'pre-render' || !imageRef.current) return;
    const newMaxImageHeight = getMaxImageHeight(imageRef);
    setImageHeight('100%');
    setMaxImageHeight(newMaxImageHeight || '100%');
    sendEvent({ type: 'image.fitted' });
  }, [imageState, sendEvent]);

  // Function to handle image click
  const handleImageClicked = useCallback(() => {
    sendEvent({ type: 'fullscreen.toggle' });
  }, [sendEvent]);

  return (
    <UnstyledButton onClick={handleImageClicked}>
      <Image
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
        ref={imageRef}
      />
    </UnstyledButton>
  );
}

export default memo(PreviewImage);
