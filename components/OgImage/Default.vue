<template>
  <div class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700 text-white p-16">
    <h1 class="text-6xl font-bold mb-6 text-center leading-tight">
      {{ title }}
    </h1>
    <p class="text-2xl text-slate-300 text-center max-w-3xl">
      {{ description }}
    </p>
    <div class="mt-8 text-slate-400 text-xl">
      penyadap.pages.dev
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

