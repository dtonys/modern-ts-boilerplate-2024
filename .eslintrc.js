module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  env: {
    node: true,
    browser: true,
  },
  rules: {
    'max-len': [
      2,
      {
        code: 120,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'react/jsx-one-expression-per-line': [0],
    'react/jsx-no-target-blank': [0],
    'import/no-extraneous-dependencies': [0],
    'react/no-this-in-sfc': [0],
    'react/jsx-no-bind': [0],
    'react/no-direct-mutation-state': [2],
    'react/prop-types': [0],
    'react/destructuring-assignment': [0],
    'react/no-access-state-in-setstate': [0],
    'react/no-array-index-key': [0],
    'react/no-unescaped-entities': [0],
    'react/sort-comp': [0],
    'react/no-did-update-set-state': [1],
    'react/no-multi-comp': [0],
    'brace-style': [0],
    'no-case-declarations': [0],
    'import/prefer-default-export': [0],
    'no-param-reassign': [0],
    radix: [0],
    'no-plusplus': [0],
    'import/no-unresolved': [0],
    'no-shadow': [0],
    'consistent-return': [0],
    'no-use-before-define': [0],
    'no-fallthrough': [0],
    'no-restricted-globals': [0],
    'no-unused-expressions': [0],
    'import/extensions': [0],
    'prefer-rest-params': [0],
    'no-prototype-builtins': [0],
    'array-callback-return': [0],
    'no-nested-ternary': [0],
    'jsx-a11y/alt-text': [0],
    'one-var': [0],
    'no-underscore-dangle': [0],
    'prefer-destructuring': [0],
    'jsx-a11y/no-noninteractive-element-to-interactive-role': [1],
    'jsx-a11y/anchor-has-content': 0,
    'import/order': [1],
    eqeqeq: [1],
    'no-return-assign': [1],
    'import/no-cycle': [1],
    'import/named': [1],
    'class-methods-use-this': [1],
    'no-multi-assign': [0],
    'no-empty': [0],
    'import/no-named-as-default': 0,
    camelcase: 0,
    'func-names': 0,
    'global-require': 0,
    'prefer-promise-reject-errors': 0,
    'no-bitwise': 0,
    'operator-assignment': 0,
    'no-restricted-syntax': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/no-noninteractive-tabindex': 0,
    'jsx-a11y/accessible-emoji': 0,
    'guard-for-in': 0,
    'arrow-parens': 0,
    'arrow-body-style': 0,
    'operator-linebreak': 0,
    'object-curly-newline': 0,
    'no-continue': 0,
    'no-loop-func': 0,
  },
};
