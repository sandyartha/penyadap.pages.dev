<template>
  <div class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100">
    <span class="inline-block min-h-[1.2em]">
      <span
        v-for="(text, index) in texts"
        :key="index"
        :class="[
          'inline-block transition-all duration-500',
          currentIndex === index
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 absolute translate-y-4'
        ]"
      >
        {{ text }}
      </span>
    </span>
  </div>
</template>

<script setup>
const texts = [
  'Jasa Sadap WhatsApp',
  'Jasa Sadap Telegram',
  'Jasa Sadap Instagram',
  'Jasa Sadap Facebook',
  'Jasa Sadap Snapchat'
]

const currentIndex = ref(0)

onMounted(() => {
  const interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % texts.length
  }, 3000)

  onUnmounted(() => {
    clearInterval(interval)
  })
})
</script>

