import { createServerFn } from '@tanstack/react-start';
import { and, eq } from 'drizzle-orm';
import { invoicesTable } from '~/database';
import { db } from '~/lib/db';
import { idSchema } from '~/validation/idSchema';
import { authMiddleware } from './authMiddleware';

export const deleteInvoice = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(idSchema)
  .handler(async ({ data: id, context: { userId } }) => {
    await db.delete(invoicesTable).where(and(eq(invoicesTable.id, id), eq(invoicesTable.userId, userId)));
  });
