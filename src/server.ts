import { createClerkHandler } from '@clerk/tanstack-react-start/server';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import * as Sentry from '@sentry/tanstackstart-react';
import { createStartHandler, defaultStreamHandler, defineHandlerCallback } from '@tanstack/react-start/server';
import { createRouter } from './router';

Sentry.init({
  dsn: 'https://41f0a16db3b97b10d87503d31b8e30a8@o4509929289220096.ingest.de.sentry.io/4509929292038224',
  integrations: [nodeProfilingIntegration()],
  // Tracing must be enabled for profiling to work
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is evaluated only once per SDK.init call
  profileSessionSampleRate: 1.0,
  // Trace lifecycle automatically enables profiling during active traces
  profileLifecycle: 'trace',
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/tanstackstart-react/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
});

// Profiling happens automatically after setting it up with `Sentry.init()`.
// All spans (unless those discarded by sampling) will have profiling data attached to them.
Sentry.startSpan(
  {
    name: 'My Span',
  },
  () => {
    // The code executed here will be profiled
  },
);

const handlerFactory = createClerkHandler(
  createStartHandler({
    createRouter,
  }),
);

export default defineHandlerCallback(async (event) => {
  const startHandler = await handlerFactory(Sentry.wrapStreamHandlerWithSentry(defaultStreamHandler));
  return startHandler(event);
});

/*
export default createClerkHandler(
  createStartHandler({
    createRouter,
  }),
)(defaultStreamHandler);
*/
