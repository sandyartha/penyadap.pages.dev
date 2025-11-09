<template>
  <main class="min-h-screen flex items-center justify-center">
    <div class="prose prose-lg text-center">
      <h1>Halaman Bookmarks (Sementara Dinonaktifkan)</h1>
      <p>
        Koleksi bookmark dan tautan favorit saat ini tidak ditampilkan. Halaman
        tetap ada untuk kemungkinan digunakan kembali nanti.
      </p>
      <NuxtLink to="/" class="text-blue-600 hover:underline">Kembali ke
        Beranda</NuxtLink>
    </div>
  </main>
</template>

<script setup>
useSeoMeta({ title: "Bookmarks | Dinonaktifkan" });
</script>
