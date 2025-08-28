import type { FileStateProps } from '~/components/upload/SelectFile';

export type ImageProps = {
  imageUrl: string;
  fileName: string;
  imageName?: string;
};

export const getImageFileInfo = (file: FileStateProps) => {
  const imageUrl = file ? URL.createObjectURL(file) : '';
  const fileName = file ? file.name : '';
  const imageName = file ? file.name.split('.').slice(0, -1).join('.') : '';

  return { imageUrl, fileName, imageName } as const;
};
