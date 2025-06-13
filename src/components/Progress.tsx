import { NavigationProgress, nprogress } from '@mantine/nprogress';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { useRouterState } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { store } from '~/store';

export function Progress() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const status = useRouterState({ select: (state) => state.status });
  const { pendingFns } = useSnapshot(store);

  useEffect(() => {
    if (isFetching || isMutating || status === 'pending' || pendingFns > 0) {
      nprogress.start();
    } else {
      nprogress.complete();
    }
  }, [isFetching, isMutating, status, pendingFns]);

  return <NavigationProgress />;
}
