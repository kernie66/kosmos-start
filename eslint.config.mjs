import { tanstackConfig } from '@tanstack/eslint-config';
import { defineConfig } from 'eslint/config';
import mantine from 'eslint-config-mantine';
import importXPlugin from 'eslint-plugin-import-x';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';

export default defineConfig([
  ...tanstackConfig,
  reactHooksPlugin.configs['recommended-latest'],
  ...mantine,
  {
    plugins: {
      'unused-imports': unusedImportsPlugin,
      'import-x': importXPlugin,
    },
    parserOptions: {
      project: ['./tsconfig.json'],
      tsconfigRootDir: __dirname,
    },
    rules: {
      'no-useless-rename': 'error',
      'no-duplicate-imports': 'off',
      'import/order': 'off',
      'import-x/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'unknown', 'parent', 'sibling', 'index', 'object', 'type'],
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      curly: ['error', 'multi-line'],
      'no-shadow': 'off',
      'react/no-children-prop': 'off',
    },
  },
]);
