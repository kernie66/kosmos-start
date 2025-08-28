import { Image, UnstyledButton } from '@mantine/core';
import { memo } from 'react';
import { getImageFileInfo } from '~/lib/utils/getImageFileInfo';
import type { FileStateProps } from './SelectFile';

export type ImageSizeSelections = '100%' | '95vh' | '100vh' | '100vw' | 'auto';
export type ImageSizeProps = ImageSizeSelections | number;

type PreviewImageProps = {
  file: FileStateProps;
  onImageClicked?: () => void;
  maxHeight?: ImageSizeProps;
};

const imageHeight = 'auto';
const imageWidth = '100%';
const maxImageWidth = '100vw';

function PreviewImage({ file, onImageClicked, maxHeight = '100%' }: PreviewImageProps) {
  const image = getImageFileInfo(file);
  console.log('image', file, image);

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
