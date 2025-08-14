import { svSE } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/tanstack-react-start';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { HeadContent, Scripts } from '@tanstack/react-router';
import { App } from './App';
import { Progress } from './Progress';
import type { PropsWithChildren } from 'react';
import './styles.css'; // Remove browser scroll bar, replace with ScrollArea
import { Notifications } from '@mantine/notifications';

export function RootDocument({ children }: PropsWithChildren) {
  return (
    <ClerkProvider localization={svSE}>
      <html lang="en" {...mantineHtmlProps}>
        <head>
          <ColorSchemeScript />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <HeadContent />
        </head>
        <body>
          <MantineProvider theme={{ primaryColor: 'green' }}>
            <Progress />
            <Notifications />
            <ModalsProvider>
              <App>{children}</App>
            </ModalsProvider>
          </MantineProvider>
          <Scripts />
        </body>
      </html>
    </ClerkProvider>
  );
}
