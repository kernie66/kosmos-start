import fs from 'node:fs/promises';
import { createServerFn } from '@tanstack/react-start';
import { setHeader } from '@tanstack/react-start/server';

export const getImageFn = createServerFn({ method: 'GET', response: 'raw' }).handler(async () => {
  setHeader('Content-Type', 'image/jpg');
  try {
    const filePath = `${process.cwd()}/uploads/weekly_info.png`;
    const imageBuffer = await fs.readFile(filePath);
    console.log('Image Size:', imageBuffer.length);
    // return imageBuffer;

    return new Response(imageBuffer, {
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
