```vue
<template>
  <section class="not-prose" style="margin: 56px 0;">
    <div
      style="
        padding: 40px 28px;
        border: 1px solid #e5e7eb;
        border-radius: 16px;
        background: #f9fafb;
        text-align: center;
      "
    >
      <div style="max-width: 560px; margin: 0 auto;">
        <h3
          style="
            margin: 0;
            font-size: clamp(20px, 3vw, 25px);
            line-height: 1.4;
            font-weight: 650;
            color: #111827;
          "
        >
          {{ title }}
        </h3>

        <p
          style="
            margin: 14px 0 0;
            font-size: 15px;
            line-height: 1.8;
            color: #6b7280;
          "
        >
          {{ description }}
        </p>

        <div style="margin-top: 28px;">
          <AppWhatsAppCTA :text="buttonText" />
        </div>
      </div>
    </div>
  </section>
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

<style scoped>
@media (max-width: 640px) {
  section > div {
    padding: 32px 20px !important;
  }
}
</style>
```