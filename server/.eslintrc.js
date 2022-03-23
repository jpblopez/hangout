module.exports = {
  root: true,
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  parser: '@babel/eslint-parser',
  extends: [
    'plugin:import/recommended',
    'plugin:node/recommended',
    'airbnb-base',
    'plugin:security/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['import', 'node', 'security'],
  rules: {
    'node/no-missing-require': 0,
    'node/no-missing-import': 0,
    'node/no-unsupported-features/es-syntax': 0,
    'consistent-return': 1,
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
      node: {
        extensions: ['.js', '.mjs', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
