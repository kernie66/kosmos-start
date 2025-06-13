import { z } from 'zod';

export const invoiceListSchema = z.object({
  page: z.number().min(1).default(1),
  pageSize: z.number().min(1).max(100).default(20),
  sortBy: z.enum(['issueDate', 'dueDate', 'to']).default('issueDate'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});
