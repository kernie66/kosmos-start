import { getSession } from '@tanstack/react-start/server';
import { TRPCError, initTRPC } from '@trpc/server';
import SuperJSON from 'superjson';
import { ZodError } from 'zod';

export class ProcedureError extends TRPCError {
  constructor(message: string) {
    super({ code: 'BAD_REQUEST', message });
  }
}

export class FieldError extends TRPCError {
  constructor(args: { path: string; message: string } | Array<{ path: string; message: string }>) {
    super({
      code: 'BAD_REQUEST',
      cause: new ZodError(
        (Array.isArray(args) ? args : [args]).map(({ path, message }) => ({
          path: path.split('.'),
          message,
          code: 'custom',
        })),
      ),
    });
  }
}

export async function createContext() {
  const session = await getSession<{ userId?: string }>({ password: process.env.SESSION_PASSWORD });
  return { userId: session.data.userId };
}

export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create({
  errorFormatter(opts) {
    const { shape, error } = opts;
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.code === 'BAD_REQUEST' && error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
  transformer: SuperJSON,
});

export const router = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx: { userId }, next }) => {
  if (!userId) throw new TRPCError({ code: 'UNAUTHORIZED' });
  return next({ ctx: { userId } });
});
