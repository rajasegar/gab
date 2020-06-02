module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ['prettier', 'node'],
  extends: ['eslint:recommended', 'plugin:node/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'node/no-unpublished-require': 0,
  },
};
