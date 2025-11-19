<template>
  <main class="min-h-screen bg-gray-50/70 dark:bg-black">
    <div class="max-w-5xl mx-auto px-6 py-16 space-y-20">
      <ContentDoc path="/pemesanan-aplikasi">
        <template #default="{ doc }">
          <section class="space-y-6">
            <p class="text-sm uppercase tracking-[0.3em] text-blue-500">Pemesanan</p>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {{ doc.title }}
            </h1>

            <div class="prose dark:prose-invert max-w-3xl mx-auto">
              <ContentRenderer :value="doc" />
            </div>
            
          </section>
        </template>
        <template #not-found>
          <div class="text-center py-8">
            <p class="text-gray-500">Konten tidak ditemukan. Pastikan file content/pemesanan-aplikasi.md ada.</p>
          </div>
        </template>
      </ContentDoc>
    </div>
  </main>
</template>

<script setup>
const route = useRoute()
const siteUrl = useSiteUrl()

const { data: orderDoc } = await useAsyncData('order-doc', () =>
  queryContent('/pemesanan-aplikasi').findOne()
)

const title = computed(() => orderDoc.value?.title || 'Pemesanan Aplikasi mSpy Indonesia')
const description = computed(() => orderDoc.value?.description || 'Pesan layanan pemasangan aplikasi mSpy resmi untuk memantau WhatsApp, Telegram, panggilan, dan lokasi perangkat jarak jauh dengan dukungan penuh berbahasa Indonesia.')
const currentUrl = computed(() => siteUrl.value + route.path)
const image = computed(() => `${siteUrl.value}/default.png`)

useSeoMeta({
  title: () => title.value,
  description: () => description.value,
  ogTitle: () => title.value,
  ogDescription: () => description.value,
  ogUrl: () => currentUrl.value,
  ogImage: () => image.value,
  ogImageAlt: () => title.value,
  ogType: 'website',
  ogSiteName: 'penyadap.pages.dev',
  twitterCard: 'summary_large_image',
  twitterTitle: () => title.value,
  twitterDescription: () => description.value,
  twitterImage: () => image.value
})

const schemaJson = computed(() =>
  JSON.stringify({
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
        name: title.value,
        description: description.value,
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
  })
)

useHead(() => ({
  link: [
    { rel: 'canonical', href: currentUrl.value }
  ],
  script: [
    {
      key: 'schema-org-order',
      type: 'application/ld+json',
      innerHTML: schemaJson.value
    }
  ],
  __dangerouslyDisableSanitizersByTagID: {
    'schema-org-order': ['innerHTML']
  }
}))
</script>

