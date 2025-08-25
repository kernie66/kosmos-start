import { notifications } from '@mantine/notifications';
import { checkFileError } from '../utils/checkFileError';
import { getErrorMessage } from '../utils/getErrorMessage';
import type { FileRejection, FileWithPath } from '@mantine/dropzone';

// Handle dropped files
export const getDroppedImage = (acceptedFile: FileWithPath) => {
  if (acceptedFile.type.startsWith('image/')) {
    return acceptedFile;
  }
};

// Handle rejected files and show appropriate error messages
export const getRejectedImageCause = (rejectedFiles: Array<FileRejection>) => {
  console.log('rejectedFiles', rejectedFiles);
  return checkFileError(rejectedFiles);
};

// Handle pasted images from clipboard events (Cmd + V)
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
    console.log('item', item);
    if (item.type === 'image/png') {
      const file = item.getAsFile();
      console.log('Pasted file:', file);
      return file;
    }
  }
  notifications.show({
    title: 'Ingen bild uppladdad från urklipp',
    message: 'Urklipp innehåller ingen bild, välj en bild och försök igen.',
    color: 'red',
  });
  return null;
};

// Handle images read from the clipboard using the Clipboard API
// Requires user permission to read from clipboard
export const getClipboardImage = async () => {
  try {
    const clipboardContents = await navigator.clipboard.read();
    for (const item of clipboardContents) {
      console.log('item', item, item.types);
      // Each item may contain multiple types, we look for image/png
      if (!item.types.includes('image/png')) {
        throw new Error('Clipboard does not contain PNG image data.');
      }
      // Get the image blob
      const blob = await item.getType('image/png');
      // Convert blob to File object
      const file = new File([blob], 'pasted-image.png', { type: 'image/png' });
      return file;
    }
  } catch (error) {
    // If the error is due to permissions, we can handle it gracefully
    if (error instanceof DOMException && error.name === 'NotAllowedError') {
      notifications.show({
        title: 'Kunde inte läsa urklipp',
        message: 'Webbläsaren tillåter inte att läsa urklipp. Försök med att klistra in istället.',
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
