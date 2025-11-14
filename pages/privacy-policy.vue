<template>
  <main class="min-h-screen prose dark:prose-invert prose-lg mx-auto p-6 text-gray-900 dark:text-gray-100">
    <h1>Kebijakan Privasi</h1>
    <p>
      Kami menghargai privasi pengunjung. Halaman ini menjelaskan bagaimana data
      dikumpulkan dan digunakan pada situs ini.
    </p>
    <p>
      Kami tidak menjual data pengguna. Beberapa data dasar seperti alamat IP dan
      informasi analitik dapat dikumpulkan untuk tujuan pemantauan performa dan
      perbaikan situs.
    </p>
  </main>
</template>

<script setup>
const route = useRoute();
const siteUrl = 'https://penyadap.pages.dev'
const title = 'Kebijakan Privasi';
const description = 'Kebijakan privasi penyadap.pages.dev — bagaimana data dikumpulkan dan digunakan.';
const url = computed(() => siteUrl + route.path);

const image = `${siteUrl}/default.png`;

// Generate JSON-LD schema
const jsonLd = computed(() =>
  useJsonLd(
    'page',
    {
      title,
      description,
      image,
      url: url.value
    },
    { siteUrl }
  )
);

useSeoMeta({
  title,
  description,
  ogTitle: `${title} - penyadap.pages.dev`,
  ogDescription: description,
  ogUrl: () => url.value,
  ogImage: image,
  ogImageAlt: title,
  ogType: 'website',
  ogSiteName: 'penyadap.pages.dev',
  twitterCard: 'summary_large_image',
  twitterTitle: `${title} - penyadap.pages.dev`,
  twitterDescription: description,
  twitterImage: image,
  jsonLd: () => jsonLd.value
});

useHead(() => ({
  link: [
    { rel: 'canonical', href: url.value }
  ]
}));
</script>
