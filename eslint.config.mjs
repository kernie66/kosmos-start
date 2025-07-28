import { tanstackConfig } from '@tanstack/eslint-config';
import mantine from 'eslint-config-mantine';
import importXPlugin from 'eslint-plugin-import-x';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default tseslint.config([
  ...tanstackConfig,
  reactHooksPlugin.configs['recommended-latest'],
  ...mantine,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    ignores: ['**/dist/**', '**/build/**', '**/coverage/**', '**/node_modules/**', 'eslint.config.mjs'],
    plugins: {
      'unused-imports': unusedImportsPlugin,
      'import-x': importXPlugin,
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
