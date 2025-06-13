import { Card, Group, Stack, Text } from '@mantine/core';
import type { ComponentType, PropsWithChildren } from 'react';
import type { BrandIconProps } from '~/components/icons/BrandIconProps';

export type FeatureCardProps = PropsWithChildren<{
  icon: ComponentType<BrandIconProps> | string;
  title: string;
}>;

export function FeatureCard({ icon: Icon, title, children }: FeatureCardProps) {
  return (
    <Card withBorder radius="lg" p="md">
      <Stack gap="sm">
        <Group>
          {typeof Icon === 'string' ? <img src={Icon} alt={title} width={24} height={24} /> : <Icon role="img" />}
          <Text component="h2" size="lg" fw="bold">
            {title}
          </Text>
        </Group>
        <Stack fz="sm" gap="xs">
          {children}
        </Stack>
      </Stack>
    </Card>
  );
}
