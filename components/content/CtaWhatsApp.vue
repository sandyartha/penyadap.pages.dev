<template>
  <div class="my-6">
    <AppWhatsAppCTA :text="text" />
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: "WhatsApp: +62 851-1142-6625"
  }
})
</script>
