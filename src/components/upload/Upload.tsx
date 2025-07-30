import { Center } from '@mantine/core';
import { useDisclosure, useSetState } from '@mantine/hooks';
import { useCallback, useMemo, useRef } from 'react';
import { getImageSize } from 'react-image-size';
import { useImageResize } from '~/hooks/useImageResize';
import FileModal from './FileModal';
import PreviewImage from './PreviewImage';
import SelectFile from './SelectFile';
import type { ImageProps } from './PreviewImage';
import type { FileStateProps } from './SelectFile';

export function Upload() {
  const [fullScreen, { toggle: toggleFullScreen }] = useDisclosure(false);
  const [image, setImage] = useSetState<ImageProps>({ imageUrl: '', fileName: '', width: 0, height: 0 });

  const { clearImageResize, imageHeight } = useImageResize();

  const centerRef = useRef<HTMLDivElement>(null);

  const marginTop = useMemo(() => (fullScreen ? 0 : 'md'), [fullScreen]); // Remove image margin when in full screen

  // Function to handle file selection
  const handleSelectedFile = useCallback(
    async (file: FileStateProps) => {
      const imageUrl = file ? URL.createObjectURL(file) : '';
      const fileName = file ? file.name.split('.').slice(0, -1).join('.') : '';
      try {
        if (imageUrl !== '') {
          const { width, height } = await getImageSize(imageUrl);
          setImage({ imageUrl, fileName, width, height });
        } else {
          setImage({ width: 0, height: 0 });
        }
      } catch (error) {
        console.error('Error getting image size:', error);
      }
    },
    [setImage],
  );

  // Function to handle image click
  const handleImageClicked = useCallback(() => {
    console.log('Image clicked, toggling full screen');
    toggleFullScreen();
    clearImageResize();
  }, [toggleFullScreen, clearImageResize]);

  const handleModalResize = () => {
    clearImageResize();
  };

  return (
    <FileModal onModalResize={handleModalResize}>
      {!fullScreen && <SelectFile onSelectFile={handleSelectedFile} />}
      <Center mt={marginTop} ref={centerRef}>
        <PreviewImage image={image} onImageClicked={handleImageClicked} maxHeight={imageHeight} />
      </Center>
    </FileModal>
  );
}
