import { uploadImage } from '~/serverActions/uploadImage';

export const submitFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.set('file', file, 'weekly_info.png');
    const { fileName } = await uploadImage({ data: formData });
    console.log('File uploaded successfully:', fileName);
    return { fileName };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error(`Failed to upload file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
