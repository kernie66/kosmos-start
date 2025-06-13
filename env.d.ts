declare namespace NodeJS {
  interface ProcessEnv {
    DB_FILE_NAME: string;
    NODE_ENV: 'development' | 'production';
    SESSION_PASSWORD: string;
  }
}
