import * as Sentry from '@sentry/tanstackstart-react';
import { StartClient } from '@tanstack/react-start';
import { hydrateRoot } from 'react-dom/client';
import { createRouter } from './router';

const router = createRouter();

Sentry.init({
  dsn: 'https://41f0a16db3b97b10d87503d31b8e30a8@o4509929289220096.ingest.de.sentry.io/4509929292038224',

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/tanstackstart-react/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  integrations: [Sentry.browserTracingIntegration(), Sentry.browserProfilingIntegration()],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
  // Set profilesSampleRate to 1.0 to profile every transaction.
  // Since profilesSampleRate is relative to tracesSampleRate,
  // the final profiling rate can be computed as tracesSampleRate * profilesSampleRate
  // For example, a tracesSampleRate of 0.5 and profilesSampleRate of 0.5 would
  // results in 25% of transactions being profiled (0.5*0.5=0.25)
  profilesSampleRate: 1.0,
});

hydrateRoot(document, <StartClient router={router} />);
