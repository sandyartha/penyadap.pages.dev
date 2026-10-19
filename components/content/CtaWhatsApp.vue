<template>
  <div class="my-6">
    <AppWhatsAppCTA :text="text" />
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: "WhatsApp: +62 085-111-426-625"
  }
})
</script>
