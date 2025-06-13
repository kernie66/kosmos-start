import * as procedures from '~/procedures';
import { router } from './utils';

export const appRouter = router(procedures);
export type AppRouter = typeof appRouter;
