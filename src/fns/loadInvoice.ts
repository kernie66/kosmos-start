import { createServerFn } from '@tanstack/react-start';
import { and, asc, eq } from 'drizzle-orm';
import { invoiceFieldsTable, invoiceItemsTable, invoicesTable } from '~/database';
import { db } from '~/lib/db';
import { ProcedureError } from '~/lib/trpc/server/utils';
import { omit } from '~/lib/utils/omit';
import { idSchema } from '~/validation/idSchema';
import { authMiddleware } from './authMiddleware';

export const loadInvoice = createServerFn()
  .middleware([authMiddleware])
  .validator(idSchema)
  .handler(async ({ data: id, context: { userId } }) => {
    const invoice = await db.query.invoicesTable.findFirst({
      where: and(eq(invoicesTable.id, id), eq(invoicesTable.userId, userId)),
      with: {
        fields: {
          columns: { id: true, type: true, name: true, value: true },
          orderBy: asc(invoiceFieldsTable.index),
        },
        items: {
          columns: { id: true, description: true, unit: true, unitPrice: true, quantity: true },
          orderBy: asc(invoiceItemsTable.index),
        },
      },
    });
    if (!invoice) throw new ProcedureError('Invoice not found');
    const { fields, ...rest } = invoice;
    return {
      ...rest,
      fromFields: fields.filter((r) => r.type === 'from').map((r) => omit(r, 'type')),
      toFields: fields.filter((r) => r.type === 'to').map((r) => omit(r, 'type')),
    };
  });
