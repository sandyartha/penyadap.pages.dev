<template>
  <section class="max-w-4xl mx-auto space-y-6">
    <div class="text-center space-y-3">
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">FAQ</p>
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Pertanyaan yang sering diajukan</h2>
      <p class="text-gray-600 dark:text-gray-400">
        Semua informasi penting layanan pemasangan aplikasi Spy Indonesia.
      </p>
    </div>

    <div class="space-y-4">
      <article
        v-for="(item, index) in faqs"
        :key="item.id"
        class="rounded-2xl border border-gray-200/70 dark:border-gray-800/80 bg-white/80 dark:bg-zinc-900/60 shadow-sm"
      >
        <button
          type="button"
          class="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
          @click="toggle(index)"
          :aria-expanded="activeIndex === index"
        >
          <span class="font-semibold text-gray-900 dark:text-white">{{ item.question }}</span>
          <span
            class="shrink-0 rounded-full border border-gray-200 dark:border-gray-700 p-2 text-gray-500 dark:text-gray-300 transition"
            :class="activeIndex === index ? 'bg-blue-50/80 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300' : ''"
          >
            <Icon
              :name="activeIndex === index ? 'solar:minus-circle-outline' : 'solar:add-circle-outline'"
              class="h-5 w-5"
            />
          </span>
        </button>

        <div
          class="px-6 text-sm text-gray-600 dark:text-gray-300 overflow-hidden transition-all duration-300 ease-out"
          :class="activeIndex === index ? 'max-h-[480px] pb-6 opacity-100' : 'max-h-0 opacity-0'"
        >
          <p class="whitespace-pre-line leading-relaxed">{{ item.answer }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  faqs: {
    type: Array,
    default: () => []
  }
})

const activeIndex = ref(0)

const toggle = (index) => {
  activeIndex.value = activeIndex.value === index ? -1 : index
}
</script>

