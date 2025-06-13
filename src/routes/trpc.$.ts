import { createServerFileRoute } from '@tanstack/react-start/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '~/lib/trpc/server';
import { createContext } from '~/lib/trpc/server/utils';

const handler = ({ request: req }: { request: Request }) =>
  fetchRequestHandler({ endpoint: '/trpc', req, router: appRouter, createContext });

export const ServerRoute = createServerFileRoute('/trpc/$').methods({ GET: handler, POST: handler });
