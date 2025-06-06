<script setup lang="ts">
const authStore = useAuthStore();
const { user, isLoading } = storeToRefs(authStore);
</script>

<template>
  <div>
    <div v-if="user">
      <NuxtImg :src="user.avatarUrl" :alt="`${user.username}'s avatar`" />
      <p>Welcome, {{ user.username }}!</p>
      <Button variant="outlined" @click="authStore.logout">
        {{ isLoading ? "Logging out..." : "Logout" }}
      </Button>
    </div>
  </div>
</template>
