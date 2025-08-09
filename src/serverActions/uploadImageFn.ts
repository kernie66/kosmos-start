import { createServerFn } from '@tanstack/react-start';
import z from 'zod';
import { saveFile } from '~/lib/utils/saveFile';

export const uploadImageFn = createServerFn({ method: 'POST' })
  .validator(z.instanceof(FormData))
  .handler(async ({ data: formData }) => {
    const file = formData.get('file') as File | null;
    if (!file) {
      throw new Error('No file provided');
    }
    console.log('Uploading file:', file.name);
    const buffer = Buffer.from(await file.arrayBuffer());

    await saveFile({ key: file.name, file: buffer });

    return { success: true, message: 'Image uploaded successfully', fileName: file.name };
  });
