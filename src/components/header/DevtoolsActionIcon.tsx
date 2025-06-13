import { ActionIcon, Portal } from '@mantine/core';
import { useDisclosure, useHotkeys } from '@mantine/hooks';
import clsx from 'clsx';
import src from '~/components/TanStackLogo.webp';
import { useModKey } from '~/hooks/useModKey';
import classes from './DevtoolsActionIcon.module.css';
import { QueryDevtools } from './QueryDevtools';
import { RouterDevtools } from './RouterDevtools';

export function DevtoolsActionIcon() {
  const [opened, { toggle }] = useDisclosure();
  useHotkeys([['mod+d', toggle]]);
  const modKey = useModKey();

  return (
    <>
      <ActionIcon onClick={toggle} variant="transparent" radius="lg" title={`Toggle TanStack devtools (${modKey}+D)`}>
        <img src={src} className={clsx(classes.img, { [classes.opened]: opened })} alt="TanStack logo" />
      </ActionIcon>
      {opened && (
        <Portal>
          <QueryDevtools buttonPosition="bottom-left" />
          <RouterDevtools position="bottom-right" />
        </Portal>
      )}
    </>
  );
}
