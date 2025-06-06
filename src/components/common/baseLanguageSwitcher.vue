<script setup lang="ts">
const { locale, setLocale } = useI18n();
</script>

<template>
  <Button
    class="gap-2 text-sm font-medium flex-center"
    outlined
    rounded
    @click="setLocale(locale === 'en' ? 'km' : 'en')"
  >
    <Icon name="icon:globe" />
    <span class="w-12">
      {{ locale === "en" ? "ភាសាខ្មែរ" : "English" }}
    </span>
  </Button>
</template>
