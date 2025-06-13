import { createServerFn } from '@tanstack/react-start';
import { useSession } from '@tanstack/react-start/server';
import { and, eq } from 'drizzle-orm';
import { usersTable } from '~/database';
import { hashPassword, sessionOptions } from '~/lib/auth';
import { db } from '~/lib/db';
import { loginSchema } from '~/validation/loginSchema';
import type { SessionInfo } from '~/lib/auth';

export const login = createServerFn({ method: 'POST' })
  .validator(loginSchema)
  .handler(async ({ data: { email, password } }) => {
    const user = await db.query.usersTable.findFirst({
      where: and(eq(usersTable.email, email), eq(usersTable.passwordHash, await hashPassword(password))),
      columns: { id: true },
    });
    if (!user) throw new Error('Invalid email or password');
    const session = await useSession<SessionInfo>(sessionOptions);
    await session.update({ userId: user.id });
    return { success: true };
  });
