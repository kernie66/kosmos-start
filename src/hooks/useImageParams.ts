import { useLayoutEffect, useState } from 'react';
import type { ImageProps, ImageStateProps, ImageStateSelections } from '~/components/upload/PreviewImage';

type UseImageParamsProps = {
  image: ImageProps;
  maxHeight: ImageStateSelections | number;
};

const isNumber = (value: ImageStateSelections | number) => typeof value === 'number';

export const useImageParams = ({ image, maxHeight }: UseImageParamsProps) => {
  const [imageHeight, setImageHeight] = useState<ImageStateProps>(0);
  const [imageWidth, setImageWidth] = useState('100%');
  const [maxImageHeight, setMaxImageHeight] = useState<ImageStateProps>('95vh');
  const [maxImageWidth, setMaxImageWidth] = useState<ImageStateProps>('100vw');

  useLayoutEffect(() => {
    const aspectRatio = image.width / image.height;
    const newMaxImageWidth =
      isNumber(maxHeight) && isNumber(aspectRatio) ? Math.trunc(maxHeight * aspectRatio) : '100vw';
    if (aspectRatio > 1) {
      setImageWidth('100%');
      setImageHeight('auto');
      setMaxImageHeight(maxHeight);
    } else {
      setImageWidth('auto');
      setImageHeight(maxHeight);
      setMaxImageHeight('95vh');
    }
    setMaxImageWidth(newMaxImageWidth);
  }, [image, maxHeight]);

  return { imageHeight, imageWidth, maxImageHeight, maxImageWidth };
};
