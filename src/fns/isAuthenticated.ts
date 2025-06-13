import { createIsomorphicFn } from '@tanstack/react-start';
import { getSession } from '@tanstack/react-start/server';
import { sessionOptions } from '~/lib/auth';
import type { SessionInfo } from '~/lib/auth';

export const isAuthenticated = createIsomorphicFn()
  .client(() => localStorage.getItem('isAuthenticated') === 'true')
  .server(async () => !!(await getSession<SessionInfo>(sessionOptions)).data.userId);
