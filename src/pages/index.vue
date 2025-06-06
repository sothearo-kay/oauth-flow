<script setup lang="ts">
import type { UserPaginationParams } from "~/repository/user";
import type { User } from "~/types/user";

const { $api, $toast } = useNuxtApp();
const counterStore = useCounterStore();

// Pagination state in a reactive object
const pagination = reactive({
  page: 1,
  limit: 20,
  loading: false,
  hasMore: true,
  total: 0,
});

const allUsers = ref<User[]>([]);
const observer = ref<IntersectionObserver | null>(null);
const loadingElement = ref<HTMLElement | null>(null);

// User modal state
const selectedUser = ref<User | null>(null);
const modalOpen = ref(false);

const openUserModal = (user: User) => {
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      selectedUser.value = user;
      modalOpen.value = true;
    });
  } else {
    selectedUser.value = user;
    modalOpen.value = true;
  }
};

// Initial data fetch
const fetchUsers = async () => {
  if (pagination.loading || !pagination.hasMore) return;

  pagination.loading = true;

  try {
    const params: UserPaginationParams = {
      page: pagination.page,
      limit: pagination.limit,
    };
    const response = await $api.user.get(params);
    const newUsers = response.users;
    allUsers.value = [...allUsers.value, ...newUsers];
    pagination.hasMore = response.hasMore;
    pagination.total = response.total;

    if (pagination.hasMore) {
      pagination.page++;
    }
  } catch (error) {
    console.error("Failed to fetch users:", error);
    $toast("Failed to load users");
  } finally {
    pagination.loading = false;
  }
};

// Initial load
await fetchUsers();

// Set up intersection observer for infinite scrolling
onMounted(() => {
  observer.value = new IntersectionObserver(
    (entries) => {
      if (
        entries[0].isIntersecting &&
        pagination.hasMore &&
        !pagination.loading
      ) {
        fetchUsers();
      }
    },
    {
      threshold: 0,
      rootMargin: "300px",
    },
  );

  if (loadingElement.value) {
    observer.value.observe(loadingElement.value);
  }
});

onBeforeUnmount(() => {
  if (observer.value && loadingElement.value) {
    observer.value.unobserve(loadingElement.value);
    observer.value.disconnect();
  }
});

const showToast = () => {
  counterStore.increment();
  $toast(`This is a toast message ${counterStore.count}!`);
};
</script>

<template>
  <div class="flex flex-col items-center gap-y-8 py-10">
    <div class="space-y-3 text-center">
      <h1 class="text-3xl font-bold">{{ $t("title") }}</h1>
      <p class="text-gray-500">{{ $t("description") }}</p>
    </div>

    <div class="space-x-4">
      <Button label="Show Toast" outlined @click="showToast" />
      <Button
        :label="`Count is: ${counterStore.count}`"
        outlined
        @click="counterStore.increment"
      />
    </div>

    <div class="mx-auto w-full max-w-5xl px-4">
      <!-- User count and page indicator (sticky) -->
      <div class="sticky top-4 z-10 flex w-max justify-start text-gray-500">
        <p class="rounded-md border bg-white px-3 py-2 text-sm shadow-sm">
          Showing {{ allUsers.length }} of {{ pagination.total }} users (Page
          {{ pagination.page }})
        </p>
      </div>

      <ul
        v-if="allUsers.length > 0"
        class="mt-4 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6"
      >
        <li
          v-for="user in allUsers"
          :key="user.id"
          class="flex cursor-pointer items-center gap-4 rounded-md border px-4 py-3 shadow-sm"
          data-aos="fade"
          @click="openUserModal(user)"
        >
          <div class="h-12 w-12 overflow-hidden rounded-full">
            <NuxtImg
              :src="`https://api.dicebear.com/9.x/dylan/svg?seed=${encodeURIComponent(user.name)}`"
              :alt="`${user.name}'s avatar`"
            />
          </div>
          <h2 class="font-bold">{{ user.name }}</h2>
        </li>
      </ul>

      <!-- Loading indicator and observer target - always visible -->
      <div ref="loadingElement" class="my-4 flex w-full justify-center">
        <div v-if="pagination.loading" class="loader" />
        <p v-else-if="pagination.hasMore" class="text-gray-400">
          Scroll for more
        </p>
        <p v-else class="text-gray-400">End of list</p>
      </div>
    </div>

    <!-- User detail modal -->
    <UserDetailModal v-model:is-open="modalOpen" :user="selectedUser" />
  </div>
</template>

<style scoped>
.loader {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 0.5s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
