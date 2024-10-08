// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['nuxt-quasar-ui', '@nuxt/eslint'],
  eslint: {},

  quasar: {
    sassVariables: true,
    extras: { font: 'roboto-font' },
  },

  compatibilityDate: '2024-09-15',
});