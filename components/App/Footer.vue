<template>
  <footer
    class="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-sm text-center pb-8"
  >
    <br>
    <p>© {{ year }} penyadap.pages.dev. All rights reserved.</p>
  </footer>
</template>

<script setup>
// Situs ini statis (prerender), jadi HTML-nya memuat tahun saat build. Kalau
// tahun diambil langsung dari `new Date()` saat render, klien akan menghitung
// tahun berjalan dan hasilnya beda begitu masuk tahun baru (mis. HTML "2026"
// vs klien "2027") — pemicu hydration mismatch. Karena itu nilai awal diambil
// dari `buildYear` (identik di server & klien), lalu dikoreksi setelah mount.
const buildYear = useRuntimeConfig().public.buildYear;
const year = ref(buildYear);

onMounted(() => {
  year.value = new Date().getFullYear();
});
</script>
