import { svSE } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/tanstack-react-start';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { HeadContent, Scripts } from '@tanstack/react-router';
import App from './App';
import { Progress } from './Progress';
import classes from './RootDocument.module.css';
import type { PropsWithChildren } from 'react';
import './styles.css'; // Remove browser scroll bar, replace with ScrollArea

export function RootDocument({ children }: PropsWithChildren) {
  return (
    <ClerkProvider localization={svSE}>
      <html lang="en" {...mantineHtmlProps}>
        <head>
          <ColorSchemeScript />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <HeadContent />
        </head>
        <body className={classes.root}>
          <MantineProvider theme={{ primaryColor: 'green' }}>
            <Progress />
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
