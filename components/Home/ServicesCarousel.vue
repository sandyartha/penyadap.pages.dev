<template>
  <section class="max-w-5xl mx-auto space-y-6">
    <div class="text-center space-y-3">
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">
        Layanan
      </p>
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
        Aplikasi Parental Control Terbaik
      </h2>
      <p class="text-gray-600 dark:text-gray-400">
        Pilih solusi sesuai perangkat target—semua sudah termasuk instalasi jarak jauh dan dukungan penuh.
      </p>
    </div>

    <div class="relative">
      <div class="grid gap-6 grid-cols-1 md:grid-cols-2">
        <article
          v-for="(service, index) in services"
          :key="service.id"
          class="rounded-3xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-zinc-900/70 shadow-sm p-6 flex flex-col"
          :class="isServiceVisible(index) ? '' : 'hidden'"
        >
          <div class="text-blue-500 dark:text-blue-300" v-html="service.icon" />
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            {{ service.name }}
          </h3>
          <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {{ service.description }}
          </p>
        </article>
      </div>

      <div class="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-zinc-900/70 text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
          @click="prevServiceSlide"
          aria-label="Sebelumnya"
        >
          <Icon name="solar:alt-arrow-left-outline" class="h-4 w-4" />
        </button>
        <button
          type="button"
          class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-zinc-900/70 text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
          @click="nextServiceSlide"
          aria-label="Berikutnya"
        >
          <Icon name="solar:alt-arrow-right-outline" class="h-4 w-4" />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  services: {
    type: Array,
    default: () => []
  }
})

const serviceSlide = ref(0)

// Semua layanan tetap di-render ke DOM (yang tidak aktif disembunyikan dengan
// `hidden`) supaya deskripsinya ikut terindeks mesin pencari. Kalau hanya
// layanan aktif yang di-render, konten sisanya hilang dari HTML statis.
const isServiceVisible = (index) => {
  if (props.services.length <= 2) return true

  const current = serviceSlide.value % props.services.length
  const next = (current + 1) % props.services.length
  return index === current || index === next
}

const nextServiceSlide = () => {
  if (!props.services.length) return
  serviceSlide.value = (serviceSlide.value + 1) % props.services.length
}

const prevServiceSlide = () => {
  if (!props.services.length) return
  serviceSlide.value =
    (serviceSlide.value - 1 + props.services.length) % props.services.length
}
</script>

