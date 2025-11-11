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
useSeoMeta({
  title: "Kebijakan Privasi",
  description: "Kebijakan privasi penyadap.pages.dev — bagaimana data dikumpulkan dan digunakan.",
  og: {
    title: 'Kebijakan Privasi - penyadap.pages.dev',
    description: 'Kebijakan privasi penyadap.pages.dev — bagaimana data dikumpulkan dan digunakan.',
    url: siteUrl + route.path,
    image: '/favicon-96x96.png',
    type: 'website'
  },
  twitter: { card: 'summary_large_image' }
});
</script>
