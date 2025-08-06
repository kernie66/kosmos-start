import fs from 'node:fs/promises';
import path from 'node:path';

type SaveFileProps = {
  key: string;
  file: File | Buffer;
};

const appDir = `${process.cwd()}/`;
const uploadDir = 'uploads/';

export const saveFile = async ({ key, file }: SaveFileProps) => {
  // Convert File to Buffer if necessary
  const fileBuffer = file instanceof File ? Buffer.from(await file.arrayBuffer()) : file;

  const dirPath = path.join(appDir, uploadDir);
  console.log('dirPath', dirPath);
  const filePath = path.join(dirPath, key);
  console.log('filePath', filePath);

  try {
    await fs.mkdir(dirPath, { recursive: true });

    await fs.writeFile(filePath, fileBuffer);
    console.log(`File saved successfully at ${filePath}`);

    return key;
  } catch (error) {
    console.error('Error saving file:', error);
    throw new Error(`Failed to save file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
