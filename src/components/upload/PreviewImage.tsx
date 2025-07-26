import { Box, Image, Text, UnstyledButton } from '@mantine/core';
import { memo, useLayoutEffect, useState } from 'react';

export type ImageStateSelections = '100%' | '95vh' | '100vh' | '100vw' | 'auto';
export type ImageStateProps = ImageStateSelections | number;
export type ImageProps = {
  imageUrl: string;
  fileName: string;
  width: number;
  height: number;
};

type PreviewImageProps = {
  image: ImageProps;
  onImageClicked?: () => void;
  maxHeight?: ImageStateSelections | number;
};

const isNumber = (value: ImageStateSelections | number) => typeof value === 'number';

const PreviewImage = memo(({ image, onImageClicked, maxHeight = '100%' }: PreviewImageProps) => {
  const [imageHeight, setImageHeight] = useState<ImageStateProps>(0);
  const [imageWidth, setImageWidth] = useState('100%');
  const [maxImageHeight, setMaxImageHeight] = useState<ImageStateProps>('95vh');
  const [maxImageWidth, setMaxImageWidth] = useState<ImageStateProps>('100vw');

  useLayoutEffect(() => {
    console.log('Image size adjusted:', maxHeight);

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

  if (!image.imageUrl || image.width === 0 || image.height === 0) {
    return (
      <Box>
        <Text c="dimmed" fz="md">
          Ingen bild vald
        </Text>
      </Box>
    );
  }

  console.log('fileName', image.fileName);
  console.log('imageWidth', imageWidth);
  console.log('imageHeight', imageHeight);
  console.log('maxImageWidth maxHeight', maxImageWidth, maxHeight);
  console.log('maxImageHeight', maxImageHeight);

  return (
    <UnstyledButton onClick={onImageClicked} h={imageHeight} mah={maxImageHeight} w={imageWidth} maw={maxImageWidth}>
      <Image
        key={image.fileName}
        src={image.imageUrl}
        onLoad={() => URL.revokeObjectURL(image.imageUrl)}
        fit="contain"
        alt={image.fileName}
        radius="md"
      />
    </UnstyledButton>
  );
});

export default PreviewImage;
