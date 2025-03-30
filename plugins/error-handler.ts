export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    console.error('Vue error:', error, info);
  };

  window.onerror = (message, source, lineno, colno, error) => {
    console.error('Global error:', message, source, error);
  };

  window.onunhandledrejection = event => {
    console.error('Promise error:', event.reason);
  };
});
