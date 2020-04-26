module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'typescript', '@typescript-eslint', 'import', 'prettier'],
  rules: {
    quotes: [1, 'single'],
    'comma-dangle': 1,
    'linebreak-style': [0, 'unix'],
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    'typescript/no-unused-vars': 'error',
    'max-len': ['warn', 100],
    'import/extensions': [
      'error',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'arrow-parens': [1, 'as-needed'],
    'implicit-arrow-linebreak': 0,
    'jsx-a11y/label-has-for': [
      2,
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'react/prop-types': 0,
    'arrow-body-style': 0,
    'function-paren-newline': 0,
  },
  settings: {
    'import/resolver': {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
};
