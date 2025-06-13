import { SimpleGrid, Stack, Text } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';
import { BsFillLightningFill } from 'react-icons/bs';
import { FeatureCard } from '~/components/home/FeatureCard';
import { GetStarted } from '~/components/home/GetStarted';
import { BrandIconDrizzle } from '~/components/icons/BrandIconDrizzle';
import { BrandIconMantine } from '~/components/icons/BrandIconMantine';
import { BrandIconTRPC } from '~/components/icons/BrandIconTRPC';
import tanStackLogoSrc from '~/components/TanStackLogo.webp';
import classes from './index.module.css';

export const Route = createFileRoute('/_home/')({ component: RouteComponent });

function RouteComponent() {
  return (
    <>
      <Stack align="center">
        <div className={classes.splash} aria-label="Mantine Start" />
        <Text variant="gradient" gradient={{ from: 'green', to: 'cyan' }} ta="center" fw="bold" fz={24}>
          Full-stack, type-safe, done right—with style.
        </Text>
        <Text ta="center" my="md">
          Mantine Start is an opinionated template for building
          <br />
          full-stack web applications with Mantine, TanStack, tRPC and Drizzle.
        </Text>
      </Stack>
      <SimpleGrid mt="xl" spacing="xl" maw={800} mx="auto" cols={{ base: 1, xs: 2 }}>
        <FeatureCard title="TanStack" icon={tanStackLogoSrc}>
          <div>Next.js is great, but comes with a lot of bloat and long-standing unresolved issues.</div>
          <div>
            The TanStack team is doing an amazing job of building a set of performant and easy to use libraries giving
            you SSR, type-safe routing, page loaders and server functions.
          </div>
        </FeatureCard>
        <FeatureCard title="Mantine" icon={BrandIconMantine}>
          <div>
            Tailwind and shadcn are cool, but if you're building a highly interactive application, Mantine is offering
            better, fully-functional input components out of the box.
          </div>
          <div>
            Keep code clutter to a minimum and focus on functionality instead of trying to make sense of thousands of
            class names.
          </div>
        </FeatureCard>
        <FeatureCard title="tRPC" icon={BrandIconTRPC}>
          <div>
            Full-stack type safety is a must and tRPC is the leading solution allowing you to move fast and break
            nothing.
          </div>
          <div>
            Validation, authentication, authorization, request batching—everything playing nicely with TanStack Query.
          </div>
        </FeatureCard>
        <FeatureCard title="Drizzle" icon={BrandIconDrizzle}>
          <div>
            Drizzle is a simple and performant ORM that allows you to interact with your database in a type-safe manner,
            while also giving you the ability to dynamically build complex queries when needed.
          </div>
          <div>Focus on data, not database technicalities.</div>
        </FeatureCard>
      </SimpleGrid>
      <Stack align="center" mt={60} mb="xl">
        <BsFillLightningFill size={24} />
        <Text>Ready to get started?</Text>
        <GetStarted />
      </Stack>
    </>
  );
}
