import { pbkdf2 } from 'node:crypto';
import type { SessionConfig } from '@tanstack/react-start/server';

export type SessionInfo = { userId?: string };

export const sessionOptions: SessionConfig = {
  password: process.env.SESSION_PASSWORD,
  cookie: {
    httpOnly: true,
    // secure: false, // needed if previewing from a different host
    secure: process.env.NODE_ENV === 'production',
  },
};

export function hashPassword(password: string) {
  return new Promise<string>((resolve, reject) => {
    pbkdf2(password, 'salt', 100000, 64, 'sha256', (err, derivedKey) => {
      if (err) reject(err);
      resolve(derivedKey.toString('hex'));
    });
  });
}
