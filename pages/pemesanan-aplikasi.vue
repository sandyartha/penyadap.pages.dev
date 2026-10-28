<template>
  <main class="min-h-screen bg-gray-50/70 dark:bg-black">
    <div class="max-w-5xl mx-auto px-6 py-16 space-y-20">
      <ContentDoc path="/pemesanan-aplikasi">
        <template #default="{ doc }">
          <section class="space-y-6">
            <p class="text-sm uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">Pemesanan</p>
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

const title = computed(() => orderDoc.value?.title || 'Jasa Pemesanan Aplikasi Parental Control Dari FlexiSpy Indonesia')
const description = computed(() => orderDoc.value?.description || 'Pesan layanan pemasangan aplikasi FlexiSpy resmi untuk memantau WhatsApp, Telegram, panggilan, dan lokasi perangkat jarak jauh dengan dukungan penuh berbahasa Indonesia.')
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

const webPageSchemaJson = computed(() =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${currentUrl.value}#webpage`,
    name: title.value,
    description: description.value,
    url: currentUrl.value,
    inLanguage: 'id-ID',
    isPartOf: {
      '@type': 'WebSite',
      name: 'penyadap.pages.dev',
      url: siteUrl.value
    }
  })
)

const breadcrumbSchemaJson = computed(() =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Beranda',
        item: siteUrl.value
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Pemesanan Aplikasi FlexiSpy',
        item: currentUrl.value
      }
    ]
  })
)

useHead(() => {
  if (!orderDoc.value) return {};

  const script = [];
  const sanitizers = {};

  if (webPageSchemaJson.value) {
    script.push({
      key: 'schema-org-order-webpage',
      type: 'application/ld+json',
      innerHTML: webPageSchemaJson.value
    });
    sanitizers['schema-org-order-webpage'] = ['innerHTML'];
  }

  if (breadcrumbSchemaJson.value) {
    script.push({
      key: 'schema-org-order-breadcrumb',
      type: 'application/ld+json',
      innerHTML: breadcrumbSchemaJson.value
    });
    sanitizers['schema-org-order-breadcrumb'] = ['innerHTML'];
  }

  return {
    link: [
      { rel: 'canonical', href: currentUrl.value }
    ],
    script,
    __dangerouslyDisableSanitizersByTagID: sanitizers
  };
})
</script>

