<script setup lang="ts">
const authStore = useAuthStore();
const { isNavigating, navigateWithLoading } = useNavigating();
</script>

<template>
  <div class="text-center">
    <Button
      variant="outlined"
      @click="() => navigateWithLoading(authStore.login)"
    >
      Login in with GitHub
      <Icon
        v-if="isNavigating"
        name="icon:loader"
        class="h-5 w-5 animate-spin"
      />
      <Icon v-else name="icon:github" class="h-5 w-5" />
    </Button>
  </div>
</template>
