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
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { fixupPluginRules } from "@eslint/compat"

/** @typedef {import('typescript-eslint').ConfigWithExtends} TSESLintConfig */

/** @type {Pick<TSESLintConfig, 'name' | 'ignores'>} */
const ignoreTSESConfig = {
  name: "@ts-react-vite/ignores/base",
  ignores: ['pnpm-lock.yaml', 'build', 'dist', 'docs', 'node_modules', 'public'],
}

/** @type {Pick<TSESLintConfig, 'name' | 'files' | 'languageOptions'>[]} */
const languageOptionsTSESConfigArray = [
  {
    name: "@ts-react-vite/language-options/app",
    files: [
      "./src/**/*.js",
      "./src/**/*.jsx",
      "./src/**/*.cjs",
      "./src/**/*.mjs",
      "./src/**/*.ts",
      "./src/**/*.tsx",
      "./src/**/*.cts",
      "./src/**/*.mts",
      "./src/**/*.d.ts",
    ],
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: resolve(dirname(fileURLToPath(import.meta.url)), "./tsconfig.app.json"),
      },
      globals: {
        ...globals.es2024,
        ...globals.browser,
        ...globals.node,
      }
    }
  },
  {
    name: "@ts-react-vite/language-options/node",
    files: [
      "vite.config.mts",
      "eslint.config.mjs"
    ],
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: resolve(dirname(fileURLToPath(import.meta.url)), "./tsconfig.node.json"),
      },
    }
  }
]

/** @type {Pick<TSESLintConfig, 'name' | 'files' | 'plugins' | 'rules'>} */
const eslintTSESLintConfigs = {
  name: "@ts-react-vite/eslint/base",
  files: [
    "**/*.js",
    "**/*.jsx",
    "**/*.cjs",
    "**/*.mjs",
    "**/*.ts",
    "**/*.tsx",
    "**/*.cts",
    "**/*.mts",
    "**/*.d.ts",
  ],
  rules: {
    ...eslint.configs.recommended.rules
  }
}

const typescriptTSESLintConfig = {
  name: "@ts-react-vite/typescript/base",
  files: [
    "**/*.js",
    "**/*.jsx",
    "**/*.cjs",
    "**/*.mjs",
    "**/*.ts",
    "**/*.tsx",
    "**/*.cts",
    "**/*.mts",
    "**/*.d.ts",
  ],
  plugins: {
    "@typescript-eslint": tseslintPlugin,
  },
  rules: {
    ...tseslintConfigs.strictTypeChecked
      .filter((config) => config.rules !== undefined)
      .map(config => ({...config.rules}))
      .reduce((acc, config) => Object.assign(acc, config), {}),

    ...tseslintConfigs.stylisticTypeChecked
      .filter((config) => config.rules !== undefined)
      .map(config => ({...config.rules}))
      .reduce((acc, config) => Object.assign(acc, config), {}),
  },
}

/** @type {Pick<TSESLintConfig, 'name' | 'files' | 'plugins' | 'rules' | 'settings'>} */
const importTSESLintConfig = {
  name: "@ts-react-vite/import/base",
  files: [
    "**/*.js",
    "**/*.jsx",
    "**/*.cjs",
    "**/*.mjs",
    "**/*.ts",
    "**/*.tsx",
    "**/*.cts",
    "**/*.mts",
    "**/*.d.ts",
  ],
  plugins: {
    import: fixupPluginRules(pluginImport),
  },
  rules: {
    ...pluginImport.configs.recommended.rules,
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [
        ".js",
        ".jsx",
        ".cjs",
        ".mjs",
        ".ts",
        ".tsx",
        ".cts",
        ".mts",
        ".d.ts",
      ],
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".cjs", ".mjs", ".ts", ".tsx", ".cts", ".mts", ".d.ts"],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
}



/** @type {Pick<TSESLintConfig, 'name' | 'files' | 'plugins' | 'rules' | 'settings'>} */
const reactTEESLintConfig = {
  name: "@ts-react-vite/react/base",
  files: [
    "**/*.js",
    "**/*.jsx",
    "**/*.cjs",
    "**/*.mjs",
    "**/*.ts",
    "**/*.tsx",
    "**/*.cts",
    "**/*.mts",
    "**/*.d.ts",
  ],
  plugins: {
    react: pluginReact,
  },
  rules: {
    ...pluginReact.configs.recommended.rules,
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}

/** @type {Pick<TSESLintConfig, 'name' | 'files' | 'plugins' | 'rules'>} */
const reactHooksTSESLintConfigs = {
  name: "@ts-react-vite/react-hooks/base",
  files: [
    "**/*.js",
    "**/*.jsx",
    "**/*.cjs",
    "**/*.mjs",
    "**/*.ts",
    "**/*.tsx",
    "**/*.cts",
    "**/*.mts",
    "**/*.d.ts",
  ],
  plugins: {
    'react-hooks': fixupPluginRules(pluginReactHooks),
  },
  rules: {
    ...pluginReactHooks.configs.recommended.rules,
  },
}


/** @type {Pick<TSESLintConfig, 'name' | 'files' | 'plugins' | 'rules'>} */
const vitestTEESLintConfig = {
  name: "@ts-react-vite/vitest/base",
  files: ['**/*.test.ts', '**/*.test.tsx'],
  plugins: {
    vitest: fixupPluginRules(pluginVitest)
  },
  rules: {
    ...pluginVitest.configs.recommended.rules,
  },
}

/** @type {Pick<TSESLintConfig, 'name' | 'files' | 'plugins' | 'rules'>} */
const testingLibraryTSESLintConfig = {
  name: "@ts-react-vite/testing-library/base",
  files: ['**/*.test.ts', '**/*.test.tsx'],
  plugins: {
    'testing-library': pluginTestingLibrary,
  },
  rules: {
    ...pluginTestingLibrary.configs.react.rules,
  },
}


export default tseslintConfig(
  ignoreTSESConfig,
  ...languageOptionsTSESConfigArray,
  eslintTSESLintConfigs,
  typescriptTSESLintConfig,
  {
    name: "@ts-react-vite/typescript/eslint.config.mjs",
    files: ["eslint.config.mjs"],
    plugins: {
      "@typescript-eslint": tseslintPlugin,
    },
    rules: {
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
    }
  },
  importTSESLintConfig,
  reactTEESLintConfig,
  reactHooksTSESLintConfigs,
  vitestTEESLintConfig,
  testingLibraryTSESLintConfig,
)
