<template>
  <main class="min-h-screen">
    <div class="max-w-4xl mx-auto px-4 py-8">
      <ContentDoc path="/about">
        <template #default="{ doc }">
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

const schemaJson = computed(() =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@id': 'https://penyadap.pages.dev/#website',
        '@type': 'WebSite',
        name: 'penyadap.pages.dev',
        alternateName: 'Jasa Pemasangan Parental Control mSpy Indonesia',
        description: 'Jasa Pemasangan Parental Control — mSpy (Indonesia)',
        url: 'https://penyadap.pages.dev',
        inLanguage: 'id',
        publisher: {
          '@type': 'Organization',
          '@id': 'https://penyadap.pages.dev/#organization',
          name: 'penyadap.pages.dev',
          url: 'https://penyadap.pages.dev'
        }
      },
      {
        '@id': 'https://penyadap.pages.dev/about#webpage',
        '@type': ['WebPage', 'AboutPage'],
        name: title.value,
        description: description.value,
        url: 'https://penyadap.pages.dev/about',
        isPartOf: {
          '@id': 'https://penyadap.pages.dev/#website'
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://penyadap.pages.dev/about'
        },
        publisher: {
          '@type': 'Organization',
          '@id': 'https://penyadap.pages.dev/#organization'
        }
      }
    ]
  })
);

useHead(() => ({
  link: [
    { rel: 'canonical', href: url.value }
  ],
  script: [
    {
      type: 'application/ld+json',
      key: 'schema-org-graph',
      'data-nuxt-schema-org': 'true',
      'data-hid': 'schema-org-graph',
      innerHTML: schemaJson.value
    }
  ],
  __dangerouslyDisableSanitizersByTagID: {
    'schema-org-graph': ['innerHTML']
  }
}));
</script>
