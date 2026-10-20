<template>
  <div class="my-16 not-prose">
    <div class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl py-16 px-8 border border-green-200 dark:border-green-700 shadow-lg">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          {{ title }}
        </h2>
        <p class="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-300">
          {{ description }}
        </p>
        <div class="mt-10 flex justify-center">
          <AppWhatsAppCTA :text="buttonText" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "Aplikasi Pengawas Ponsel Jarak Jauh"
  },
  description: {
    type: String,
    default: "Dapatkan informasi mengenai fitur, cara kerja, dan pilihan layanan. Hubungi kami untuk mendapatkan penjelasan lebih lanjut."
  },
  buttonText: {
    type: String,
    default: "Hubungi via WhatsApp"
  }
})
</script>
