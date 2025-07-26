import { Box, Image, Text, UnstyledButton } from '@mantine/core';
import { memo } from 'react';
import { useImageParams } from '~/hooks/useImageParams';

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

const PreviewImage = memo(({ image, onImageClicked, maxHeight = '100%' }: PreviewImageProps) => {
  const { imageHeight, imageWidth, maxImageHeight, maxImageWidth } = useImageParams({ image, maxHeight });

  if (!image.imageUrl || image.width === 0 || image.height === 0) {
    return (
      <Box>
        <Text c="dimmed" fz="md">
          Ingen bild vald
        </Text>
      </Box>
    );
  }

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
