<template>
  <!-- Halaman error (404/500). error.vue berdiri sendiri di luar app.vue,
       jadi navbar/footer global tidak ikut ter-render di sini. -->
  <div class="min-h-screen bg-gray-50 dark:bg-black">
    <div
      class="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 py-20 text-center"
    >
      <NuxtLink to="/" class="mb-10" aria-label="penyadap.pages.dev — Beranda">
        <img
          src="/penyadap-logo.svg"
          alt="Logo Penyadap"
          width="1152"
          height="896"
          class="h-16 w-auto"
        />
      </NuxtLink>

      <p
        class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400"
      >
        Error {{ statusCode }}
      </p>

      <h1
        class="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white"
      >
        {{ heading }}
      </h1>

      <p class="mt-4 max-w-lg text-base text-gray-600 dark:text-gray-400">
        {{ message }}
      </p>

      <div class="mt-10 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          @click="goHome"
        >
          <Icon name="solar:home-smile-outline" class="h-4 w-4" aria-hidden="true" />
          Kembali ke Beranda
        </button>
        <NuxtLink
          to="/articles"
          class="inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-gray-400 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-zinc-900"
        >
          Lihat Artikel
          <Icon name="solar:arrow-right-linear" class="h-4 w-4" aria-hidden="true" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: {
    type: Object,
    default: null
  }
})

const statusCode = computed(() => props.error?.statusCode || 404)
const isNotFound = computed(() => statusCode.value === 404)

const heading = computed(() =>
  isNotFound.value ? 'Halaman tidak ditemukan' : 'Terjadi kesalahan'
)

const message = computed(() => {
  if (isNotFound.value) {
    return 'Halaman yang Anda cari mungkin sudah dipindahkan atau tidak pernah ada. Silakan kembali ke beranda atau jelajahi daftar artikel kami.'
  }
  return (
    props.error?.message ||
    'Sesuatu yang tidak terduga terjadi. Silakan coba lagi beberapa saat nanti.'
  )
})

const goHome = () => clearError({ redirect: '/' })

// Halaman error tidak boleh masuk indeks mesin pencari.
useHead({
  title: () => heading.value,
  meta: [{ name: 'robots', content: 'noindex, follow' }]
})
</script>
