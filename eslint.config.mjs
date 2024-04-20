import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'vue/no-multiple-template-root': 'off',
  },
}).prepend();
