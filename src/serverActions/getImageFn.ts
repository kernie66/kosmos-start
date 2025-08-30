import fs from 'node:fs/promises';
import { createServerFn } from '@tanstack/react-start';
import { setHeader } from '@tanstack/react-start/server';

export const getImageFn = createServerFn({ method: 'GET', response: 'raw' }).handler(async () => {
  setHeader('Content-Type', 'image/jpg');
  setHeader('Document-Policy', 'js-profiling');

  try {
    const filePath = `${process.cwd()}/uploads/weekly_info.png`;
    const imageBuffer = await fs.readFile(filePath);
    const imageBlob = new Blob([imageBuffer as BlobPart], { type: 'image/png' });
    console.log('Image Size:', imageBlob.size);
    // return imageBuffer;

    return new Response(imageBlob, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Length': Buffer.byteLength(imageBuffer).toString(),
      },
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    throw new Error(`Failed to fetch image: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
});
