<template>
  <main class="min-h-screen">
    <div class="max-w-4xl mx-auto px-4 py-8">
      <ContentDoc path="/privacy-policy">
        <template #default="{ doc }">
          <article class="prose dark:prose-invert max-w-none">
            <ContentRenderer :value="doc" />
          </article>
        </template>
        <template #not-found>
          <div class="text-center py-8">
            <p class="text-gray-500">Konten tidak ditemukan. Pastikan file content/privacy-policy.md ada.</p>
          </div>
        </template>
      </ContentDoc>
    </div>
  </main>
</template>

<script setup>
const route = useRoute();
const siteUrl = useSiteUrl()

const { data: privacyDoc } = await useAsyncData('privacy-doc', () =>
  queryContent('/privacy-policy').findOne()
)

const title = computed(() => privacyDoc.value?.title || 'Kebijakan Privasi');
const description = computed(() => privacyDoc.value?.description || 'Kebijakan privasi penyadap.pages.dev — bagaimana data dikumpulkan dan digunakan.');
const url = computed(() => siteUrl.value + route.path);

const image = computed(() => `${siteUrl.value}/default.png`);

useSeoMeta({
  title: () => title.value,
  description: () => description.value,
  ogTitle: () => `${title.value} - penyadap.pages.dev`,
  ogDescription: () => description.value,
  ogUrl: () => url.value,
  ogImage: () => image.value,
  ogImageAlt: () => title.value,
  ogType: 'website',
  ogSiteName: 'penyadap.pages.dev',
  twitterCard: 'summary_large_image',
  twitterTitle: () => `${title.value} - penyadap.pages.dev`,
  twitterDescription: () => description.value,
  twitterImage: () => image.value
});

const schemaJson = computed(() =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'PrivacyPolicy',
    '@id': `${url.value}#privacy`,
    url: url.value,
    name: title.value,
    description: description.value,
    inLanguage: 'id-ID',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteUrl.value}#website`,
      url: siteUrl.value,
      name: 'penyadap.pages.dev',
      publisher: {
        '@type': 'Organization',
        '@id': `${siteUrl.value}#organization`,
        name: 'penyadap.pages.dev',
        url: siteUrl.value
      }
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
          name: title.value,
          item: url.value
        }
      ]
    }
  })
)

useHead(() => ({
  link: [
    { rel: 'canonical', href: url.value }
  ],
  script: [
    {
      key: 'schema-org-privacy',
      type: 'application/ld+json',
      innerHTML: schemaJson.value
    }
  ],
  __dangerouslyDisableSanitizersByTagID: {
    'schema-org-privacy': ['innerHTML']
  }
}));
</script>


