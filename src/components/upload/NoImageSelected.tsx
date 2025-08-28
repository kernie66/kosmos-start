import { Box, Text } from '@mantine/core';

export default function NoImageSelected() {
  return (
    <Box>
      <Text c="dimmed" fz="md">
        Ingen bild vald
      </Text>
    </Box>
  );
}
