import type { User } from "~/types/user";

export const useAuthStore = defineStore("auth", () => {
  const userCookie = useCookie<User>("user-profile");
  const user = ref<User | null>(userCookie.value);
  const isLoading = ref(false);
  const isAuthenticated = computed(() => !!user.value);

  async function fetchUser() {
    try {
      const { data } = await $fetch("/api/auth/me");
      user.value = data.user;
    } catch {
      user.value = null;
    }
  }

  async function login() {
    window.location.href = "/auth/github";
  }

  async function logout() {
    isLoading.value = true;
    try {
      await $fetch("/api/auth/logout", {
        method: "POST",
      });
      user.value = null;
      await navigateTo("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    user,
    isLoading,
    isAuthenticated,
    fetchUser,
    login,
    logout,
  };
});
