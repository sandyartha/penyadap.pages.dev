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
const siteUrl = 'https://penyadap.pages.dev'
useSeoMeta({
  title: "Tentang Kami",
  description: "Tentang penyadap.pages.dev — layanan pemasangan dan panduan penggunaan mSpy untuk keamanan digital keluarga.",
  og: {
    title: 'Tentang Kami - penyadap.pages.dev',
    description: 'Tentang penyadap.pages.dev — layanan pemasangan dan panduan penggunaan mSpy untuk keamanan digital keluarga.',
    url: siteUrl + route.path,
    image: '/favicon-96x96.png',
    type: 'website'
  },
  twitter: { card: 'summary_large_image' }
});
</script>
