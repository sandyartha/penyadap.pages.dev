<template>
  <div class="space-y-6 px-4">
    <div class="text-4xl sm:text-5xl ring-2 border ring-gray-200 border-gray-300 dark:ring-white/10 dark:border-gray-800 hover:ring-4 transition-all duration-300 bg-gray-200 dark:bg-gray-900 rounded-full h-16 w-16 sm:h-24 sm:w-24 flex items-center justify-center">
      <img src="/penyadap-logo.svg" alt="Logo Penyadap" class="h-12 w-12 sm:h-24 sm:w-24" />
    </div>

    <TextRotator />
    <!-- Konten deskriptif dipindahkan ke halaman index.vue; komponen ini
         hanya menampilkan gambar dan judul agar bisa dipakai ulang di
         tempat lain tanpa teks panjang. -->

    
  </div>
</template>

<script setup>
useSeoMeta({
  title: "Jasa Pemasangan Aplikasi Sadap Android — mSpy (Indonesia)",
  description:
    "Jasa pemasangan aplikasi parental control mSpy. Layanan meliputi instalasi, penggunaan penyadap hp android jarak jauh untuk orang tua.",
});

// Using direct static image path for avatar to avoid runtime image processing.
</script>
