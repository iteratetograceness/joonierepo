module.exports = {
  extends: [
    'eslint:recommended',
    'turbo',
    'prettier',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
}
