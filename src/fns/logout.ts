import { createServerFn } from '@tanstack/react-start';
import { useSession } from '@tanstack/react-start/server';
import { sessionOptions } from '~/lib/auth';
import type { SessionInfo } from '~/lib/auth';

export const logout = createServerFn().handler(async () => {
  const session = await useSession<SessionInfo>(sessionOptions);
  await session.clear();
  return { success: true };
});
