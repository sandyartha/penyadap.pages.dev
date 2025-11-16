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

useHead(() => ({
  link: [
    { rel: 'canonical', href: url.value }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        '@id': `${url.value}/#about`,
        url: url.value,
        name: title,
        description: description,
        inLanguage: 'id-ID',
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${siteUrl.value}/#website`,
          url: siteUrl.value,
          name: 'penyadap.pages.dev'
        },
        about: {
          '@type': 'Organization',
          '@id': `${siteUrl.value}/#organization`,
          name: 'penyadap.pages.dev',
          url: siteUrl.value,
          description: 'Jasa Pemasangan Parental Control — mSpy (Indonesia)'
        },
        mainEntity: {
          '@type': 'Organization',
          '@id': `${siteUrl.value}/#organization`
        }
      })
    }
  ]
}));
</script>
