import { Image, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getImageFn } from '~/serverActions/getImageFn';

export default function WeeklyInfo() {
  const [imageFile, setImageFile] = useState<any>(null);

  // Fetch the image file from the server action
  // This will be used to display the weekly information image
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const fileBuffer = await getImageFn();
        const contentType = fileBuffer.headers.get('Content-Type');
        console.log('contentType', contentType);
        const contentLength = fileBuffer.headers.get('Content-Length');
        console.log('contentLength', contentLength);
        const arrayBuffer = await fileBuffer.arrayBuffer();
        console.log('arrayBuffer', arrayBuffer);
        const fileBlob = new Blob([arrayBuffer], { type: 'image/png' });
        const file = URL.createObjectURL(fileBlob);
        console.log('file', file);
        setImageFile(file);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };
    fetchImage();
  }, []);

  return (
    <div>
      <Title>Weekly Information</Title>
      <Text>This component displays weekly information.</Text>
      <Image src={imageFile} />
      {/* Additional content can be added here */}
    </div>
  );
}
