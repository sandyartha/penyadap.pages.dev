<template>
  <main class="min-h-screen prose dark:prose-invert prose-lg mx-auto p-6 text-gray-900 dark:text-gray-100">
    <h1>Tentang Kami</h1>
    <p>
      Selamat datang di situs kami. Kami menyediakan artikel, proyek, dan
      sumber daya terkait pengembangan perangkat lunak dan desain.
    </p>
    <p>
      Konten di situs ini dibuat untuk tujuan edukasi dan berbagi pengalaman.
      Jika Anda memiliki pertanyaan atau ingin bekerja sama, silakan hubungi
      pemilik situs.
    </p>
  </main>
</template>

<script setup>
const route = useRoute();
const siteUrl = useSiteUrl()

const title = 'Tentang Kami';
const description = 'Tentang penyadap.pages.dev — layanan pemasangan dan panduan penggunaan mSpy untuk keamanan digital keluarga.';
const url = computed(() => siteUrl.value + route.path);

const image = computed(() => `${siteUrl.value}/default.png`);

useSeoMeta({
  title,
  description,
  ogTitle: `${title} - penyadap.pages.dev`,
  ogDescription: description,
  ogUrl: () => url.value,
  ogImage: () => image.value,
  ogImageAlt: title,
  ogType: 'website',
  ogSiteName: 'penyadap.pages.dev',
  twitterCard: 'summary_large_image',
  twitterTitle: `${title} - penyadap.pages.dev`,
  twitterDescription: description,
  twitterImage: () => image.value
});

const schemaGraph = computed(() => ({
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
      name: title,
      description,
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
}));

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
      innerHTML: JSON.stringify(schemaGraph.value)
    }
  ],
  __dangerouslyDisableSanitizersByTagID: {
    'schema-org-graph': ['innerHTML']
  }
}));
</script>
