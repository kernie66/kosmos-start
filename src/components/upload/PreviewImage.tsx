import { Image, LoadingOverlay, Text, UnstyledButton } from '@mantine/core';
import { useLayoutEffect, useRef, useState } from 'react';
import { useImageSize } from 'react-image-size';

export type ImageStateProps = string | number;
export type ImageProps = {
  imageUrl: string;
  fileName: string;
};

type PreviewImageProps = {
  image: ImageProps;
  onImageClicked?: () => void;
  maxHeight?: string | number;
};

export default function PreviewImage({ image, onImageClicked, maxHeight = '100%' }: PreviewImageProps) {
  const [dimensions, { loading, error }] = useImageSize(image.imageUrl);
  const [imageHeight, setImageHeight] = useState<ImageStateProps>(0);
  const [imageWidth, setImageWidth] = useState('100%');
  const [maxImageHeight, setMaxImageHeight] = useState<ImageStateProps>('95vh');
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    const aspectRatio = dimensions ? dimensions.width / dimensions.height : 0;
    console.log('Image size adjusted:', maxHeight);
    if (aspectRatio > 1) {
      setImageWidth('100%');
      setImageHeight('auto');
      setMaxImageHeight(maxHeight);
    } else {
      setImageWidth('auto');
      setImageHeight(maxHeight);
      setMaxImageHeight('95vh');
    }
  }, [dimensions, maxHeight]);

  if (loading) {
    return <LoadingOverlay visible overlayProps={{ blur: 2 }} />;
  }
  if (error) {
    if (error === 'Url is not defined') {
      console.warn('Image URL is not defined, returning null');
      return null;
    }
    console.error('Error loading image:', error);
    return <Text>Error loading image: {error}</Text>;
  }

  console.log('fileName', image.fileName);
  console.log('imageWidth', imageWidth);
  console.log('imageHeight', imageHeight);
  console.log('maxImageHeight', maxImageHeight);

  return (
    <UnstyledButton onClick={onImageClicked} h={imageHeight} mah={maxImageHeight} w={imageWidth} maw="100vw">
      <Image
        key={image.fileName}
        src={image.imageUrl}
        onLoad={() => URL.revokeObjectURL(image.imageUrl)}
        fit="contain"
        alt={image.fileName}
        radius="md"
        ref={imageRef}
        h={imageHeight}
        mah={maxImageHeight}
        w={imageWidth}
      />
    </UnstyledButton>
  );
}
