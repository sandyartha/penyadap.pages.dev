<template>
  <div class="my-16 not-prose">
    <div class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl py-16 px-8 border border-green-200 dark:border-green-700 shadow-lg">
      <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-16 text-center">
        {{ title }}
      </h2>
      <div class="flex justify-center">
        <AppWhatsAppCTA :text="buttonText" />
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
  buttonText: {
    type: String,
    default: "Hubungi via WhatsApp"
  }
})
</script>
