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

  integrations: [],
});

hydrateRoot(document, <StartClient router={router} />);
