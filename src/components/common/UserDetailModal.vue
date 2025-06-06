<script setup lang="ts">
import type { User } from "~/types/user";

defineProps<{ user: User | null }>();

// Use defineModel for two-way binding
const modelValue = defineModel<boolean>("isOpen");

const closeModal = () => {
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      modelValue.value = false;
    });
  } else {
    modelValue.value = false;
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeydown);
});

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && modelValue.value) {
    closeModal();
  }
};
</script>

<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      @click.self="closeModal"
    >
      <div
        v-if="user"
        ref="modalCard"
        class="w-full max-w-xl rounded-lg bg-white p-6 shadow-xl"
      >
        <div class="mb-4 flex items-center gap-4">
          <div class="h-16 w-16 overflow-hidden rounded-full">
            <NuxtImg
              :src="`https://api.dicebear.com/9.x/dylan/svg?seed=${encodeURIComponent(user.name)}`"
              :alt="`${user.name}'s avatar`"
            />
          </div>
          <h2 class="text-xl font-bold">
            {{ user.name }}
          </h2>
        </div>

        <div class="space-y-4">
          <p class="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p class="text-gray-700">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident.
          </p>
        </div>

        <div class="mt-6 flex justify-end">
          <Button label="Close" outlined @click="closeModal" />
        </div>
      </div>
    </div>
  </Teleport>
</template>
