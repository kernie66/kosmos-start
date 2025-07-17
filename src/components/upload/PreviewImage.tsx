import { Image, Loader, UnstyledButton } from '@mantine/core';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useImageSize } from 'react-image-size';
import type { FileStateProps } from './SelectFile';

export type ImageStateProps = string | number;

type PreviewImageProps = {
  file: FileStateProps;
  onImageClicked?: () => void;
  maxHeight?: string | number;
};

export default function PreviewImage({ file, onImageClicked, maxHeight = '100%' }: PreviewImageProps) {
  if (file) {
    console.log('PreviewImage file', file);
  } else {
    console.log('PreviewImage no file');
  }
  const imageUrl = useMemo(() => (file ? URL.createObjectURL(file) : ''), [file]);
  const [dimensions, { loading, error }] = useImageSize(imageUrl);
  const [imageHeight, setImageHeight] = useState<ImageStateProps>(0);
  const [imageWidth, setImageWidth] = useState('100%');
  const [maxImageHeight, setMaxImageHeight] = useState<ImageStateProps>('80vh');
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    const aspectRatio = dimensions ? dimensions.width / dimensions.height : 0;

    if (aspectRatio > 1) {
      setImageWidth('100%');
      setImageHeight('auto');
      setMaxImageHeight(maxHeight); // `${height}px`;
    } else {
      setImageWidth('auto');
      setImageHeight(maxHeight || '100%');
      setMaxImageHeight('90vh');
    }
  }, [dimensions, maxHeight]);

  if (loading) {
    return <Loader color="teal" />;
  }
  if (error) {
    if (error === 'Url is not defined') {
      return null;
    }
    console.error('Error loading image:', error);
    return <div>Error loading image: {error}</div>;
  }
  const fileName = file?.name.split('.').slice(0, -1).join('.');

  console.log('fileName', fileName);
  console.log('imageWidth', imageWidth);
  console.log('imageHeight', imageHeight);
  console.log('maxImageHeight', maxImageHeight);

  return (
    <UnstyledButton onClick={onImageClicked} h={imageHeight} mah={maxImageHeight} w={imageWidth} maw="100vw">
      <Image
        key={fileName}
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
        fit="contain"
        alt={fileName}
        radius="md"
        ref={imageRef}
        h={imageHeight}
        mah={maxImageHeight}
        w={imageWidth}
      />
    </UnstyledButton>
  );
}
