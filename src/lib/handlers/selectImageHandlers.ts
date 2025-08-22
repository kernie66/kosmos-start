import { notifications } from '@mantine/notifications';
import { checkFileError } from '../utils/checkFileError';
import { getErrorMessage } from '../utils/getErrorMessage';
import type { FileRejection, FileWithPath } from '@mantine/dropzone';

export const getDroppedImage = (acceptedFiles: Array<FileWithPath>) => {
  console.log('acceptedFiles', acceptedFiles);
  return acceptedFiles[0];
};

export const getRejectedImage = (rejectedFiles: Array<FileRejection>) => {
  console.log('rejectedFiles', rejectedFiles);
  return checkFileError(rejectedFiles[0]);
};

export const getPastedImage = (event: ClipboardEvent) => {
  const items = event.clipboardData?.items;

  if (!items) {
    notifications.show({
      title: 'Ingen bild uppladdad från urklipp',
      message: 'Det fanns inget kopierat att klistra in, välj en bild och försök igen.',
      color: 'red',
    });
    console.log('No items in clipboard');
    return null;
  }
  console.log('Pasted items:', items);
  for (const item of items) {
    if (item.kind === 'file') {
      const blob = item.getAsFile();
      console.log('Pasted file:', blob);
      return blob;
    }
  }
  notifications.show({
    title: 'Ingen bild uppladdad från urklipp',
    message: 'Urklipp innehåller ingen bild, välj en bild och försök igen.',
    color: 'red',
  });
  return null;
};

export const getClipboardImage = async () => {
  try {
    const clipboardContents = await navigator.clipboard.read();
    for (const item of clipboardContents) {
      console.log('item', item, item.types);
      if (!item.types.includes('image/png')) {
        throw new Error('Clipboard does not contain PNG image data.');
      }
      const blob = await item.getType('image/png');
      const file = new File([blob], 'pasted-image.png', { type: 'image/png' });
      console.log('Pasted blob:', file);
      return file;
    }
  } catch (error) {
    // If the error is due to permissions, we can handle it gracefully
    if (error instanceof DOMException && error.name === 'NotAllowedError') {
      notifications.show({
        title: 'Kunde inte läsa urklipp',
        message: 'Webbläsaren tillåter inte att läsa urklipp. Försök igen senare.',
        color: 'red',
      });
    } else {
      const errorMessage = getErrorMessage(error);
      console.error('Error reading clipboard:', errorMessage);
      notifications.show({
        title: 'Kunde inte läsa urklipp',
        message: errorMessage,
        color: 'red',
      });
    }
  }
  return null;
};
