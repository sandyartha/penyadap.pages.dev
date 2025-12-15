<template>
  <main class="min-h-screen">
    <div class="max-w-4xl mx-auto px-4 py-8">
      <ContentDoc path="/privacy-policy">
        <template #default="{ doc }">
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {{ doc.title }}
          </h1>

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

const webPageSchemaJson = computed(() =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url.value}#webpage`,
    name: title.value,
    description: description.value,
    url: url.value,
    inLanguage: 'id-ID',
    isPartOf: {
      '@type': 'WebSite',
      name: 'penyadap.pages.dev',
      url: siteUrl.value
    }
  })
)

const breadcrumbSchemaJson = computed(() =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Beranda',
        item: siteUrl.value
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: title.value,
        item: url.value
      }
    ]
  })
)

useHead(() => {
  if (!privacyDoc.value) return {};

  const script = [];
  const sanitizers = {};

  if (webPageSchemaJson.value) {
    script.push({
      key: 'schema-org-privacy-webpage',
      type: 'application/ld+json',
      innerHTML: webPageSchemaJson.value
    });
    sanitizers['schema-org-privacy-webpage'] = ['innerHTML'];
  }

  if (breadcrumbSchemaJson.value) {
    script.push({
      key: 'schema-org-privacy-breadcrumb',
      type: 'application/ld+json',
      innerHTML: breadcrumbSchemaJson.value
    });
    sanitizers['schema-org-privacy-breadcrumb'] = ['innerHTML'];
  }

  return {
    link: [
      { rel: 'canonical', href: url.value }
    ],
    script,
    __dangerouslyDisableSanitizersByTagID: sanitizers
  };
});
</script>


