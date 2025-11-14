<template>
  <main class="min-h-screen">
    <AppHeader class="mb-16" title="Articles" :description="description" />
    <ul class="space-y-16">
      <li v-for="(article, id) in articles" :key="id">
        <AppArticleCard :article="article" />
      </li>
    </ul>
  </main>
</template>

<script setup>
const description = "Artikel dan panduan berguna seputar penggunaan mSpy dan keamanan digital keluarga.";
const siteUrl = 'https://penyadap.pages.dev';
const title = "Artikel | mSpy Indonesia";
const canonicalUrl = `${siteUrl}/articles`;

const image = `${siteUrl}/default.png`;

// Generate JSON-LD schema
const jsonLd = computed(() =>
  useJsonLd(
    'page',
    {
      title,
      description,
      image,
      url: canonicalUrl
    },
    { siteUrl }
  )
);

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: canonicalUrl,
  ogImage: image,
  ogImageAlt: title,
  ogType: 'website',
  ogSiteName: 'penyadap.pages.dev',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: image
});

useHead({
  link: [
    { rel: 'canonical', href: canonicalUrl }
  ]
});

const { data: articles } = await useAsyncData("all-articles", () =>
  queryContent("/articles")
    .where({ draft: { $ne: true } })
    .sort({ published: -1 })
    .find()
);
</script>
