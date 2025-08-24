import type { FileRejection } from '@mantine/dropzone';

export const checkFileError = (errorObject: Array<FileRejection>) => {
  const error = errorObject[0].errors[0];
  let errorText = 'Ett okänt fel inträffade, försök igen med en giltig fil.';

  if (error.code === 'too-many-files' || errorObject.length > 1) {
    errorText = 'För många filer. Vänligen ladda upp endast en bild.';
  } else if (error.code === 'file-invalid-type') {
    errorText = 'Ogiltig filtyp. Vänligen ladda upp en bildfil (jpg, png, gif).';
  } else if (error.code === 'file-too-large') {
    errorText = 'Filen är för stor. Vänligen ladda upp en mindre bild.';
  }

  return errorText;
};
