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
const siteUrl = useSiteUrl()

const description = "Artikel dan panduan berguna seputar penggunaan mSpy dan keamanan digital keluarga.";
const title = "Artikel | mSpy Indonesia";
const canonicalUrl = computed(() => `${siteUrl.value}/articles`);

const image = computed(() => `${siteUrl.value}/default.png`);

const { data: articles } = await useAsyncData("all-articles", () =>
  queryContent("/articles")
    .where({ draft: { $ne: true } })
    .sort({ published: -1 })
    .find()
);

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: () => canonicalUrl.value,
  ogImage: () => image.value,
  ogImageAlt: title,
  ogType: 'website',
  ogSiteName: 'penyadap.pages.dev',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: () => image.value
});

const articleListItems = computed(() => {
  if (!articles.value) return [];
  return articles.value.map((article, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${siteUrl.value}${article._path}`,
    name: article.title,
    description: article.description
  }));
});

const schemaJson = computed(() =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${canonicalUrl.value}#collectionpage`,
        url: canonicalUrl.value,
        name: title,
        description,
        inLanguage: 'id-ID',
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${siteUrl.value}#website`,
          url: siteUrl.value,
          name: 'penyadap.pages.dev'
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: siteUrl.value
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Artikel',
              item: canonicalUrl.value
            }
          ]
        }
      },
      {
        '@type': 'ItemList',
        '@id': `${canonicalUrl.value}#itemlist`,
        url: canonicalUrl.value,
        name: 'Daftar Artikel',
        description,
        numberOfItems: articles.value?.length || 0,
        itemListElement: articleListItems.value
      }
    ]
  })
)

useHead(() => ({
  link: [
    { rel: 'canonical', href: canonicalUrl.value }
  ],
  script: [
    {
      key: 'schema-org-articles',
      type: 'application/ld+json',
      innerHTML: schemaJson.value
    }
  ],
  __dangerouslyDisableSanitizersByTagID: {
    'schema-org-articles': ['innerHTML']
  }
}));
</script>
