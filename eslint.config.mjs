import eslint from '@eslint/js'
import pluginImport from 'eslint-plugin-import'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginTestingLibrary from 'eslint-plugin-testing-library'
import pluginVitest from 'eslint-plugin-vitest'
import globals from 'globals'
import {
  config as tseslintConfig,
  configs as tseslintConfigs,
  parser as tseslintParser,
  plugin as tseslintPlugin,
} from 'typescript-eslint'

const exts = '{js,jsx,cjs,mjs,ts,tsx,cts,mts,d.ts}'

const baseConfigs = [
  {
    files: [`**/*.${exts}`],
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        ecmaVersion: 10,
        project: './tsconfig.json',
      },
      globals: {
        ...globals.es6,
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslintPlugin,
    },
    rules: {
      ...eslint.configs.recommended.rules,
      ...tseslintConfigs.recommended.rules,
    },
  },
]

const reactConfigs = [
  {
    files: [`**/*.${exts}`],
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]

// const exts = "{js,jsx,cjs,mjs,ts,tsx,cts,mts,d.ts}";
const importConfigs = [
  {
    files: [`**/*.${exts}`],
    plugins: { import: pluginImport },
    rules: {
      ...pluginImport.configs.recommended.rules,
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': [
          '.js',
          'jsx',
          '.cjs',
          'mjs',
          '.ts',
          '.tsx',
          '.cts',
          '.mts',
          '.d.ts',
        ],
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.cjs', '.mjs', '.ts', '.tsx', '.cts', '.mts', '.d.ts'],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  },
]

const vitestConfigs = [
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    plugins: { vitest: pluginVitest },
    rules: {
      ...pluginVitest.configs.recommended.rules,
    },
  },
]

const testingLibraryConfigs = [
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    plugins: {
      'testing-library': pluginTestingLibrary,
    },
    rules: {
      ...pluginTestingLibrary.configs.react.rules,
    },
  },
]

export default tseslintConfig(
  {
    ignores: ['pnpm-lock.yaml', 'build', 'dist', 'docs', 'node_modules', 'public'],
  },
  ...baseConfigs,
  ...importConfigs,
  ...reactConfigs,
  ...vitestConfigs,
  ...testingLibraryConfigs,
)
