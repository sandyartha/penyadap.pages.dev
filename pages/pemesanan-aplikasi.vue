<template>
  <main class="min-h-screen bg-gray-50/70 dark:bg-black">
    <div class="max-w-5xl mx-auto px-6 py-16 space-y-20">
      <section class="text-center space-y-6">
        <p class="text-sm uppercase tracking-[0.3em] text-blue-500">Pemesanan</p>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Pemesanan Aplikasi mSpy Indonesia
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Layanan pemasangan jarak jauh untuk memantau aktivitas WhatsApp, Telegram, Instagram,
          panggilan telepon, serta lokasi perangkat secara real-time. Kami membantu proses instalasi,
          konfigurasi, dan pelatihan penggunaan hingga berhasil.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <NuxtLink
            to="https://wa.me/6289508977727"
            class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-white font-semibold shadow hover:bg-blue-500 transition"
          >
            Pesan via WhatsApp
          </NuxtLink>
          <NuxtLink
            to="/privacy-policy"
            class="inline-flex items-center gap-2 rounded-full border border-gray-300 dark:border-gray-700 px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Lihat Kebijakan Privasi
          </NuxtLink>
        </div>
      </section>

      <section class="grid md:grid-cols-2 gap-8">
        <div class="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-zinc-900/60 p-8 space-y-5 shadow-sm">
          <div class="text-sm font-semibold text-blue-600 uppercase tracking-wide">Langkah Pemesanan</div>
          <ol class="space-y-4 text-gray-700 dark:text-gray-300">
            <li><span class="font-semibold text-gray-900 dark:text-white">1.</span> Hubungi kami via WhatsApp dan konsultasikan kebutuhan pemantauan.</li>
            <li><span class="font-semibold text-gray-900 dark:text-white">2.</span> Pilih paket durasi (1, 3, 6, atau 12 bulan) dan metode pembayaran.</li>
            <li><span class="font-semibold text-gray-900 dark:text-white">3.</span> Jadwalkan sesi onboarding jarak jauh untuk proses instalasi.</li>
            <li><span class="font-semibold text-gray-900 dark:text-white">4.</span> Kami bantu konfigurasi dashboard sampai Anda siap menggunakan.</li>
          </ol>
        </div>
        <div class="rounded-3xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 p-8 text-white space-y-4 shadow-lg">
          <p class="text-sm font-semibold uppercase tracking-wide">Paket Disarankan</p>
          <h2 class="text-3xl font-bold">Langganan 3 Bulan</h2>
          <p class="text-blue-100">Termasuk dukungan instalasi penuh, monitoring multi-platform, serta pembaruan aplikasi otomatis.</p>
          <div class="text-4xl font-bold">Rp2.900.000</div>
          <ul class="space-y-2 text-blue-100">
            <li>• Monitoring WhatsApp, Telegram, Instagram</li>
            <li>• Rekaman panggilan & SMS</li>
            <li>• Tracking lokasi real-time</li>
            <li>• Laporan aktivitas harian</li>
          </ul>
          <NuxtLink
            to="mailto:admin@penyadap.pages.dev?subject=Pemesanan%20Aplikasi%20mSpy"
            class="block text-center mt-6 rounded-full bg-white/10 px-6 py-3 font-semibold hover:bg-white/20 transition"
          >
            Konsultasi Email
          </NuxtLink>
        </div>
      </section>

      <section class="grid md:grid-cols-3 gap-8">
        <div class="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-zinc-900/60 space-y-3">
          <h3 class="font-semibold text-gray-900 dark:text-white">Dukungan 24/7</h3>
          <p class="text-gray-600 dark:text-gray-300 text-sm">
            Tim kami siap membantu troubleshooting kapan pun dibutuhkan melalui WhatsApp atau email.
          </p>
        </div>
        <div class="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-zinc-900/60 space-y-3">
          <h3 class="font-semibold text-gray-900 dark:text-white">Garansi Instalasi</h3>
          <p class="text-gray-600 dark:text-gray-300 text-sm">
            Refund 100% jika pemasangan gagal atau perangkat tidak kompatibel dengan mSpy.
          </p>
        </div>
        <div class="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-zinc-900/60 space-y-3">
          <h3 class="font-semibold text-gray-900 dark:text-white">Pelatihan Dashboard</h3>
          <p class="text-gray-600 dark:text-gray-300 text-sm">
            Panduan video call untuk membaca laporan aktivitas dan menyesuaikan pengaturan keamanan.
          </p>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
const route = useRoute()
const siteUrl = useSiteUrl()

const title = 'Pemesanan Aplikasi mSpy Indonesia'
const description = 'Pesan layanan pemasangan aplikasi mSpy resmi untuk memantau WhatsApp, Telegram, panggilan, dan lokasi perangkat jarak jauh dengan dukungan penuh berbahasa Indonesia.'
const currentUrl = computed(() => siteUrl.value + route.path)
const image = computed(() => `${siteUrl.value}/default.png`)

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: () => currentUrl.value,
  ogImage: () => image.value,
  ogImageAlt: title,
  ogType: 'website',
  ogSiteName: 'penyadap.pages.dev',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: () => image.value
})

const schemaGraph = computed(() => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@id': 'https://penyadap.pages.dev/#website',
      '@type': 'WebSite',
      name: 'penyadap.pages.dev',
      alternateName: 'Jasa Pemasangan Parental Control mSpy Indonesia',
      description: 'Jasa Pemasangan Parental Control — mSpy (Indonesia)',
      url: 'https://penyadap.pages.dev',
      inLanguage: 'id',
      publisher: {
        '@type': 'Organization',
        '@id': 'https://penyadap.pages.dev/#organization',
        name: 'penyadap.pages.dev',
        url: 'https://penyadap.pages.dev'
      }
    },
    {
      '@id': `${currentUrl.value}#webpage`,
      '@type': 'WebPage',
      name: title,
      description,
      url: currentUrl.value,
      isPartOf: {
        '@id': 'https://penyadap.pages.dev/#website'
      },
      mainEntity: {
        '@type': 'Service',
        '@id': `${currentUrl.value}#service`,
        name: 'Paket pemasangan aplikasi mSpy Indonesia',
        description: 'Instalasi jarak jauh, konfigurasi, dan pelatihan penggunaan mSpy lengkap untuk memantau perangkat target.',
        provider: {
          '@type': 'Organization',
          '@id': 'https://penyadap.pages.dev/#organization',
          name: 'penyadap.pages.dev'
        },
        areaServed: {
          '@type': 'Country',
          name: 'Indonesia'
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'IDR',
          price: '2900000',
          availability: 'https://schema.org/InStock',
          url: currentUrl.value
        }
      }
    }
  ]
}))

useHead(() => ({
  link: [
    { rel: 'canonical', href: currentUrl.value }
  ],
  script: [
    {
      key: 'schema-org-order',
      type: 'application/ld+json',
      innerHTML: JSON.stringify(schemaGraph.value)
    }
  ],
  __dangerouslyDisableSanitizersByTagID: {
    'schema-org-order': ['innerHTML']
  }
}))
</script>

