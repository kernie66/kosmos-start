import { createMiddleware } from '@tanstack/react-start';
import { getSession } from '@tanstack/react-start/server';
import { sessionOptions } from '~/lib/auth';
import type { SessionInfo } from '~/lib/auth';

export const authMiddleware = createMiddleware({ type: 'function' }).server(async ({ next }) => {
  const {
    data: { userId },
  } = await getSession<SessionInfo>(sessionOptions);
  if (!userId) throw new Error('Unauthorized');
  return next({ context: { userId } });
});
