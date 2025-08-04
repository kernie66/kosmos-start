import { getImageSize } from 'react-image-size';
import type { FileStateProps } from '~/components/upload/SelectFile';

export const getImageFileInfo = async (file: FileStateProps) => {
  let imageUrl = file ? URL.createObjectURL(file) : '';
  const fileName = file ? file.name : '';
  const imageName = file ? file.name.split('.').slice(0, -1).join('.') : '';
  let width = 0;
  let height = 0;
  try {
    if (imageUrl !== '') {
      const dimensions = await getImageSize(imageUrl);
      width = dimensions.width;
      height = dimensions.height;
    }
  } catch (error) {
    console.error('Error getting image size:', error);
    imageUrl = '';
  }
  return { imageUrl, fileName, imageName, width, height } as const;
};
