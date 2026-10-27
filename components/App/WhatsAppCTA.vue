<template>
  <a
    :href="whatsappUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="inline-flex items-center gap-2.5 bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30 group"
  >
    <Icon name="mdi:whatsapp" class="w-5 h-5" />
    <span>{{ text }}</span>
    <Icon
      name="solar:arrow-right-up-bold"
      class="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
    />
  </a>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: "WhatsApp: +62 851-1142-6625"
  }
})

const whatsappUrl = "https://wa.me/6285111426625"
</script>
