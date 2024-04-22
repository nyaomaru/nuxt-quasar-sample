export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthState();

  if (!auth.value.isAuthenticated) {
    return navigateTo('/login', { redirectCode: 301 });
  }
});
