export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();

  // Redirect unauthenticated users to login from all pages
  if (to.path !== "/login" && !authStore.isAuthenticated) {
    return navigateTo("/login");
  }

  // Redirect authenticated users away from login page
  if (to.path === "/login" && authStore.isAuthenticated) {
    return navigateTo("/");
  }
});
