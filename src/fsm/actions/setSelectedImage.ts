import { getClipboardImage } from '~/lib/handlers/selectImageHandlers';
import type { Events } from '../selectImageMachine';

export type SelectedImageProps = {
  event: Events;
};

export const setSelectedImage = async ({ event }: SelectedImageProps) => {
  console.log('setSelectedImage event:', event);
  let selectedImage: File | string | null = null;
  if (event.type === 'get image.clipboard') {
    const blob = await getClipboardImage();
    selectedImage = blob;
    return selectedImage;
  } else if (event.type === 'get image.dropzone') {
    const file = event.data; // Assuming event.data contains the file from dropzone
    if (file && file.type.startsWith('image/')) {
      selectedImage = URL.createObjectURL(file);
      return selectedImage;
    }
  } else {
    // if (event.type === 'get image.paste') {
    const pastedImage = await navigator.clipboard.read();
    if (pastedImage.length > 0) {
      const blob = await pastedImage[0].getType('image/png');
      selectedImage = URL.createObjectURL(blob);
      return selectedImage;
    }
  }

  throw new Error('No valid image selected');
};
