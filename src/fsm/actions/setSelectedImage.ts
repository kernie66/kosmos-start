import { getClipboardImage, getPastedImage } from '~/lib/handlers/selectImageHandlers';
import type { FileWithPath } from '@mantine/dropzone';

export type ImageFileTypes = FileWithPath | ClipboardEvent | null;

export type SelectedImageProps = {
  selection: ImageFileTypes;
};

export const setSelectedImage = async ({ selection }: SelectedImageProps) => {
  if (selection instanceof File) {
    const file = selection; // Assuming event.data contains a single file from dropzone
    if (file.type.startsWith('image/')) {
      return file;
    }
    // eslint-disable-next-line
  } else if (navigator.clipboard) {
    if (selection instanceof ClipboardEvent) {
      const file = getPastedImage(selection);
      return file;
    }
    // If selection is null, try to read from clipboard
    try {
      const file = await getClipboardImage();
      return file;
    } catch (error) {
      console.error('Error reading from clipboard:', error);
      throw error;
    }
  } else {
    console.warn('Clipboard API not supported');
    throw new Error('Clipboard API not supported');
  }

  throw new Error('No valid image selected');
};
