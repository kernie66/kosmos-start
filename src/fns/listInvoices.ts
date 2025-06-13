import { createServerFn } from '@tanstack/react-start';
import { asc, desc, eq, sql } from 'drizzle-orm';
import { invoiceItemsTable, invoicesTable } from '~/database';
import { db } from '~/lib/db';
import { invoiceListSchema } from '~/validation/invoiceListSchema';
import { authMiddleware } from './authMiddleware';

const SORTABLE_COLUMNS = {
  issueDate: invoicesTable.issueDate,
  dueDate: invoicesTable.dueDate,
  to: invoicesTable.to,
};

export const listInvoices = createServerFn()
  .middleware([authMiddleware])
  .validator(invoiceListSchema)
  .handler(async ({ data: { page, pageSize, sortBy, sortOrder }, context: { userId } }) => {
    const [total, rows] = await Promise.all([
      db.$count(invoicesTable, eq(invoicesTable.userId, userId)),
      db
        .select({
          id: invoicesTable.id,
          to: invoicesTable.to,
          series: invoicesTable.series,
          number: invoicesTable.number,
          issueDate: invoicesTable.issueDate,
          dueDate: invoicesTable.dueDate,
          amount: sql<number>`sum(${invoiceItemsTable.unitPrice} * ${invoiceItemsTable.quantity})`,
          currencyCode: invoicesTable.currencyCode,
          status: invoicesTable.status,
        })
        .from(invoicesTable)
        .leftJoin(invoiceItemsTable, eq(invoiceItemsTable.invoiceId, invoicesTable.id))
        .where(eq(invoicesTable.userId, userId))
        .groupBy(invoicesTable.id)
        .orderBy((sortOrder === 'asc' ? asc : desc)(SORTABLE_COLUMNS[sortBy]))
        .limit(pageSize)
        .offset((page - 1) * pageSize),
    ]);

    return { total, rows };
  });
