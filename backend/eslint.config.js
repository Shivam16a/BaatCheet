// eslint.config.js
export default [
    {
      files: ['**/*.js'],
      languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      rules: {
        'no-console': 'off',     // allow console.log
        'semi': ['error', 'always'], // require semicolons
        'quotes': ['error', 'single'] // enforce single quotes
      }
    }
  ];
  