import { Image, UnstyledButton } from '@mantine/core';
import { memo, useCallback } from 'react';
import { getImageFileInfo } from '~/lib/utils/getImageFileInfo';
import { ImageSelectionContext } from '~/routes/_auth/upload';
import type { FileStateProps } from './SelectFile';

export type ImageSizeSelections = '100%' | '95vh' | '100vh' | '100vw' | 'auto';
export type ImageSizeProps = ImageSizeSelections | number;

type PreviewImageProps = {
  file: FileStateProps;
  maxHeight?: ImageSizeProps;
};

const imageHeight = 'auto';
const imageWidth = '100%';
const maxImageWidth = '100vw';

function PreviewImage({ file, maxHeight = '100%' }: PreviewImageProps) {
  const imageSelectionActor = ImageSelectionContext.useActorRef();

  const image = getImageFileInfo(file);

  // Function to handle image click
  const handleImageClicked = useCallback(() => {
    imageSelectionActor.send({ type: 'toggle.fullscreen' });
  }, [imageSelectionActor]);

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
        mah={maxHeight}
        w={imageWidth}
        maw={maxImageWidth}
      />
    </UnstyledButton>
  );
}

export default memo(PreviewImage);
