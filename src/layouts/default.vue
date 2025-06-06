<template>
  <div>
    <header class="sticky top-0 z-10 bg-white">
      <div class="container flex py-4">
        <div class="flex-1" />
        <BaseLanguageSwitcher />
      </div>
    </header>

    <main>
      <slot />
    </main>
  </div>
</template>
