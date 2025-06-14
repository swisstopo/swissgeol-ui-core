import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import sortClassMembers from 'eslint-plugin-sort-class-members';
import stylistic from '@stylistic/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const jsFileExtensions = ['.ts', '.tsx'];
const sourcePaths = [
  'src/',
  'scripts/',
  'packages/angular/projects/swissgeol-core-angular',
  'packages/angular-client/src',
  'packages/react/src',
  'packages/react/scripts',
  'packages/react-client/src',
  'packages/wc-client/src',
].flatMap((root) => jsFileExtensions.map((ext) => `${root}/**/*${ext}`));

const tsFiles = [
  'stencil.config.ts',
  'packages/react/vite.config.ts',
  'packages/react-client/vite.config.ts',
];

const sharedConfig = {
  ignores: [
    'www/**',
    'loader/**',
    '.stencil/**',
    '**/node_modules/**',
    '**/dist/**',
    '**/.angular/**',
    '**/stencil-generated/**',
  ],
  languageOptions: {
    globals: globals.browser,
    ecmaVersion: 2018,
    sourceType: 'module',
    parser: tsParser,
    parserOptions: {
      projectService: {
        allowDefaultProject: ['stencil.config.ts'],
      },
      project: './tsconfig.json',
      tsconfigRootDir: __dirname,
    },
  },
  rules: {
    'array-bracket-spacing': 'error',
    'comma-spacing': 'error',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'key-spacing': 'error',
    'no-duplicate-imports': 'off',
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': 'error',
    'no-trailing-spaces': 'error',
    'no-var': 'error',
    'object-shorthand': 'off',
    'prefer-arrow-callback': 'error',
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
      },
    ],
    semi: 'error',
    'space-before-blocks': 'error',
    'space-in-parens': 'error',
    'space-infix-ops': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',

    // Require braces around control statements.
    curly: 'error',

    // Disallow nested ternaries.
    'no-nested-ternary': 'error',

    // Disallow the use of the `public` keyword.
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'no-public',
      },
    ],

    // Use `const` over `let` where possible.
    'prefer-const': 'error',

    // Require parentheses around arrow function parameters.
    '@stylistic/arrow-parens': ['error', 'always'],
  },
};

const baseConfigs = compat
  .extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  )
  .map((config) => ({
    ...config,
    plugins: {
      ...config.plugins,
      '@stylistic': stylistic,
    },
    ignores: sharedConfig.ignores,
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  }));
export default [
  sortClassMembers.configs['flat/recommended'],
  {
    ignores: [...sharedConfig.ignores],
  },
  ...baseConfigs.map((config) => ({
    ...config,
    ignores: [...sharedConfig.ignores, 'src/**'],
    languageOptions: {
      ...config.languageOptions,
      globals: {
        ...globals.node,
      },
    },
    rules: {
      ...config.rules,
      ...sharedConfig.rules,
    },
  })),
  ...baseConfigs.map((config) => ({
    ...config,
    files: [...sourcePaths],
    ignores: [...sharedConfig.ignores, 'src/test/**'],
    languageOptions: {
      ...config.languageOptions,
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    // plugins: { 'sort-class-members': sortClassMembers },
    rules: {
      ...config.rules,
      ...sharedConfig.rules,
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: [
            'variable',
            // 'autoAccessor', // This currently applies to all accessors, not just boolean ones
          ],
          types: ['boolean'],
          format: ['PascalCase'],
          prefix: ['is', 'has', 'can', 'should', 'will', 'was', 'needs'],
        },
      ],
      'sort-class-members/sort-class-members': [
        'error',
        {
          order: [
            '[decoratedProperties]',
            'constructor',
            '[methods]',
            '[render]',
            '[renders]',
            '[styles]',
          ],
          groups: {
            decoratedProperties: [
              {
                type: 'method',
                groupByDecorator: '/^(property|state|query|consume|provide)$/',
              },
            ],
            render: [
              {
                type: 'property',
                propertyType: 'ArrowFunctionExpression',
                name: 'render',
                readonly: true,
              },
              {
                type: 'method',
                name: 'render',
              },
            ],
            renders: [
              {
                type: 'property',
                propertyType: 'ArrowFunctionExpression',
                name: '/render.+/',
                readonly: true,
              },
              {
                type: 'method',
                name: '/render.+/',
              },
            ],
            styles: [{ name: 'styles', static: true, readonly: true }],
          },
        },
      ],
      'lines-between-class-members': [
        'error',
        {
          enforce: [
            { blankLine: 'always', prev: '*', next: 'method' },
            {
              blankLine: 'always',
              prev: 'method',
              next: '*',
            },
          ],
        },
      ],
    },
  })),
  ...baseConfigs.map((config) => ({
    ...config,
    files: [
      'src/test/**/*.ts',
      'src/test/**/*.tsx',
      'src/test/**/*.js',
      'src/test/**/*.jsx',
    ],
    languageOptions: {
      ...config.languageOptions,
      globals: {
        ...globals.mocha,
      },
    },
  })),
  {
    ...sharedConfig,
    files: [...sourcePaths, ...tsFiles],
  },
  {
    ...sharedConfig,
    files: [
      'src/test/**/*.ts',
      'src/test/**/*.tsx',
      'src/test/**/*.js',
      'src/test/**/*.jsx',
    ],
    languageOptions: {
      ...sharedConfig.languageOptions,
      parserOptions: {
        project: './tsconfig.test.json',
      },
      globals: {
        ...globals.mocha,
      },
    },
  },
];
