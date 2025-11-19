<template>
  <section class="max-w-5xl mx-auto space-y-6">
    <div class="text-center space-y-3">
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">
        Testimonial
      </p>
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
        Cerita dari pengguna
      </h2>
      <p class="text-gray-600 dark:text-gray-400">
        Pengalaman nyata dari orang tua dan pengguna yang mengandalkan aplikasi sadap untuk
        keamanan digital keluarga.
      </p>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <article
        v-for="item in testimonials"
        :key="item.id"
        class="relative rounded-3xl border border-gray-200/80 dark:border-gray-800 bg-white/90 dark:bg-zinc-900/80 shadow-sm p-6 flex flex-col overflow-hidden"
      >
        <span
          class="pointer-events-none absolute -top-6 -left-6 h-20 w-20 rounded-full bg-blue-100/70 dark:bg-blue-500/10 blur-2xl"
        ></span>
        <span
          class="pointer-events-none absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-blue-100/60 dark:bg-blue-500/10 blur-3xl"
        ></span>

        <p class="relative text-sm leading-relaxed text-gray-700 dark:text-gray-200 whitespace-pre-line">
          “{{ item.quote }}”
        </p>

        <div class="relative mt-5 flex items-center justify-between gap-3">
          <div>
            <p class="text-sm font-semibold text-gray-900 dark:text-white">
              {{ item.name }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ item.city }}
            </p>
          </div>
          <img
            v-if="item.image"
            :src="item.image"
            :alt="`Foto ${item.name}`"
            loading="lazy"
            class="h-12 w-12 rounded-full object-cover ring-2 ring-blue-100 dark:ring-blue-500/40"
          />
          <div
            v-else
            class="h-10 w-10 flex items-center justify-center rounded-full border border-blue-100/70 dark:border-blue-500/30 bg-blue-50/70 dark:bg-blue-500/10 text-blue-600 dark:text-blue-300 text-xs font-semibold"
          >
            mSpy
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
defineProps({
  testimonials: {
    type: Array,
    default: () => []
  }
})
</script>

