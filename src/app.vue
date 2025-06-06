<script setup lang="ts">
const siteUrl = "https://nuxt-boilerplate-psi.vercel.app";

const metaTitle = "User List - Site";
const metaDescription = "Browse a list of users with infinite scrolling.";
const ogImageUrl = `${siteUrl}/preview.jpg`;
const ogUrl = siteUrl;
const ogSiteName = "User List - Site";

useSeoMeta({
  title: metaTitle,
  description: metaDescription,
  ogTitle: metaTitle,
  ogDescription: metaDescription,
  ogImage: ogImageUrl,
  ogImageUrl: ogImageUrl,
  ogImageType: "image/jpeg",
  ogType: "website",
  ogUrl,
  ogSiteName,
  twitterCard: "summary_large_image",
  twitterTitle: metaTitle,
  twitterDescription: metaDescription,
  twitterImage: ogImageUrl,
});
</script>

<template>
  <Toaster close-button />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
