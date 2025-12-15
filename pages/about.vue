<template>
  <main class="min-h-screen">
    <div class="max-w-4xl mx-auto px-4 py-8">
      <ContentDoc path="/about">
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
            <p class="text-gray-500">Konten tidak ditemukan. Pastikan file content/about.md ada.</p>
          </div>
        </template>
      </ContentDoc>
    </div>
  </main>
</template>

<script setup>
const route = useRoute();
const siteUrl = useSiteUrl()

const { data: aboutDoc } = await useAsyncData('about-doc', () =>
  queryContent('/about').findOne()
)

const title = computed(() => aboutDoc.value?.title || 'Tentang Kami');
const description = computed(() => aboutDoc.value?.description || 'Tentang penyadap.pages.dev — layanan pemasangan dan panduan penggunaan mSpy untuk keamanan digital keluarga.');
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
    '@type': 'AboutPage',
    '@id': `${url.value}#webpage`,
    name: title.value,
    description: description.value,
    url: url.value,
    inLanguage: 'id-ID',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteUrl.value}#website`,
      name: 'penyadap.pages.dev',
      url: siteUrl.value
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${siteUrl.value}#organization`,
      name: 'penyadap.pages.dev',
      url: siteUrl.value,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl.value}/logo.png`,
        width: 512,
        height: 512
      }
    }
  })
);

const breadcrumbSchemaJson = computed(() =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${url.value}#breadcrumb`,
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
  })
);

useHead(() => {
  const script = [];
  const sanitizers = {};

  if (webPageSchemaJson.value) {
    script.push({
      type: 'application/ld+json',
      key: 'schema-org-about-webpage',
      innerHTML: webPageSchemaJson.value
    });
    sanitizers['schema-org-about-webpage'] = ['innerHTML'];
  }

  if (breadcrumbSchemaJson.value) {
    script.push({
      type: 'application/ld+json',
      key: 'schema-org-about-breadcrumb',
      innerHTML: breadcrumbSchemaJson.value
    });
    sanitizers['schema-org-about-breadcrumb'] = ['innerHTML'];
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
