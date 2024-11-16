export default /** @type {import('eslint').Linter.FlatConfig} */ ({
  rules: {
    '@cspell/spellchecker': [
      'off',
      {
        customWordListFile: './cspell.json',
      },
    ],
  },
});
