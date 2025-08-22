import { getClipboardImage } from '~/lib/handlers/selectImageHandlers';

export type SelectedImageProps = {
  context: {
    selectedImage: {} | null;
  };
  event: {
    type: 'get image.clipboard' | 'get image.dropzone' | 'get image.paste';
    data?: File; // Optional, used for dropzone
  };
};

export const setSelectedImage = async ({ context, event }: SelectedImageProps) => {
  if (event.type === 'get image.clipboard') {
    const blob = await getClipboardImage();
    context.selectedImage = blob;
    return context;
  } else if (event.type === 'get image.dropzone') {
    const file = event.data; // Assuming event.data contains the file from dropzone
    if (file && file.type.startsWith('image/')) {
      context.selectedImage = URL.createObjectURL(file);
      return context;
    }
  } else {
    // if (event.type === 'get image.paste') {
    const pastedImage = await navigator.clipboard.read();
    if (pastedImage.length > 0) {
      const blob = await pastedImage[0].getType('image/png');
      context.selectedImage = URL.createObjectURL(blob);
      return context;
    }
  }

  throw new Error('No valid image selected');
};
