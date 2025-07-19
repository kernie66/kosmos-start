import type { FileRejection } from '@mantine/dropzone';

export const checkFileError = (errorObject: FileRejection) => {
  const error = errorObject.errors[0];
  let errorText = 'Ett okänt fel inträffade, försök igen med en giltig fil.';

  console.log('error', error);
  if (error.code === 'file-invalid-type') {
    errorText = 'Ogiltig filtyp. Vänligen ladda upp en bildfil (jpg, png, gif).';
  } else if (error.code === 'file-too-large') {
    errorText = 'Filen är för stor. Vänligen ladda upp en mindre bild.';
  } else if (error.code === 'too-many-files') {
    errorText = 'För många filer. Vänligen ladda upp endast en bild.';
  }

  return errorText;
};
