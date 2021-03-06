const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  parser: '@typescript-eslint/parser',

  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/eslint-recommended', // Disable base rules
    'plugin:@typescript-eslint/recommended', // Enable ts rules
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],

  plugins: ['prettier', '@typescript-eslint'],

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
      },
    },
  },

  ignorePatterns: ['**/*.scss', '**/*.svg'],

  rules: {
    'prettier/prettier': [WARN],

    'no-use-before-define': [ERROR, { functions: false }],
    'no-unused-expressions': OFF,
    'no-param-reassign': [
      ERROR,
      {
        ignorePropertyModificationsFor: ['state'],
      },
    ],

    '@typescript-eslint/no-unused-expressions': 'error',

    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/order': WARN,
    'import/prefer-default-export': WARN,

    'react/jsx-filename-extension': OFF,
    'react/prop-types': OFF,
    'react/jsx-props-no-spreading': [
      WARN,
      {
        custom: 'ignore',
      },
    ],

    'jsx-a11y/no-noninteractive-tabindex': OFF,
    'jsx-a11y/no-static-element-interactions': OFF,
  },
};
