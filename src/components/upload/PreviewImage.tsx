import { Box, Image, Text, UnstyledButton } from '@mantine/core';
import { memo } from 'react';

export type ImageSizeSelections = '100%' | '95vh' | '100vh' | '100vw' | 'auto';
export type ImageSizeProps = ImageSizeSelections | number;
export type ImageProps = {
  imageUrl: string;
  fileName: string;
  imageName?: string;
  width: number;
  height: number;
};

type PreviewImageProps = {
  image: ImageProps;
  onImageClicked?: () => void;
  maxHeight?: ImageSizeProps;
};

const imageHeight = 'auto';
const imageWidth = '100%';
const maxImageWidth = '100vw';

function PreviewImage({ image, onImageClicked, maxHeight = '100%' }: PreviewImageProps) {
  // If no image is selected or the image dimensions are not valid, show a placeholder
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
    <UnstyledButton onClick={onImageClicked}>
      <Image
        key={image.fileName}
        src={image.imageUrl}
        onLoad={() => URL.revokeObjectURL(image.imageUrl)}
        fit="contain"
        alt={image.imageName || image.fileName}
        radius="md"
        h={imageHeight}
        mah={maxHeight}
        w={imageWidth}
        maw={maxImageWidth}
      />
    </UnstyledButton>
  );
}

export default memo(PreviewImage);
