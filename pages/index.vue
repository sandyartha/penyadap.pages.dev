<template>
  <main class="min-h-screen">
    <div class="space-y-24">
      <HomeIntro />

      <section class="max-w-4xl mx-auto prose dark:prose-invert">
        <ContentRenderer v-if="indexDoc" :value="indexDoc" />
        <ContentDoc v-else path="/index">
          <template #default="{ doc }">
            <ContentRenderer :value="doc" />
          </template>

          <template #not-found>
            <div class="text-center py-8">
              <p class="text-gray-500">Konten tidak ditemukan. Pastikan file content/index.md ada.</p>
            </div>
          </template>
        </ContentDoc>
      </section>

      <HomeFeaturedArticles />
      <HomeSocialLinks />
      <HomeNewsletter />

      <section class="max-w-4xl mx-auto space-y-6">
        <div class="text-center space-y-3">
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">FAQ</p>
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Pertanyaan yang sering diajukan</h2>
          <p class="text-gray-600 dark:text-gray-400">
            Semua informasi penting sebelum memesan layanan pemasangan aplikasi mSpy Indonesia.
          </p>
        </div>

        <div class="space-y-4">
          <article
            v-for="(item, index) in faqItems"
            :key="item.id"
            class="rounded-2xl border border-gray-200/70 dark:border-gray-800/80 bg-white/80 dark:bg-zinc-900/60 shadow-sm"
          >
            <button
              type="button"
              class="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
              @click="toggleFaq(index)"
              :aria-expanded="activeFaq === index"
            >
              <span class="font-semibold text-gray-900 dark:text-white">{{ item.question }}</span>
              <span
                class="shrink-0 rounded-full border border-gray-200 dark:border-gray-700 p-2 text-gray-500 dark:text-gray-300 transition"
                :class="activeFaq === index ? 'bg-blue-50/80 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300' : ''"
              >
                <Icon
                  :name="activeFaq === index ? 'solar:minus-circle-outline' : 'solar:add-circle-outline'"
                  class="h-5 w-5"
                />
              </span>
            </button>

            <div
              class="px-6 text-sm text-gray-600 dark:text-gray-300 overflow-hidden transition-all duration-300 ease-out"
              :class="activeFaq === index ? 'max-h-[480px] pb-6 opacity-100' : 'max-h-0 opacity-0'"
            >
              <p class="whitespace-pre-line leading-relaxed">{{ item.answer }}</p>
            </div>
          </article>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { parse } from 'yaml'
import faqSource from '~/data/index_faq.yml?raw'

const route = useRoute()
const siteUrl = useSiteUrl()

// ======================
// AMBIL KONTEN INDEX
// ======================
const { data: indexDoc } = await useAsyncData('index-doc', async () => {
  const pathsToTry = [
    { slug: '/index' },
    { _path: '/index' },
  ]

  for (const where of pathsToTry) {
    const doc = await queryContent().where(where).findOne().catch(() => null)
    if (doc) return doc
  }

  return await queryContent('index').findOne().catch(() => null)
})

// ======================
// META (SEO)
// ======================
const fallbackImage = '/default.png'
const currentUrl = computed(() => siteUrl.value + route.path)

const metaTitle = computed(() => indexDoc.value?.title)
const metaDescription = computed(() => indexDoc.value?.description)
const metaImage = computed(() => {
  const image = indexDoc.value?.image || indexDoc.value?.thumbnail || fallbackImage
  return image?.startsWith('http') ? image : `${siteUrl.value}${image}`
})

useSeoMeta({
  title: () => metaTitle.value,
  description: () => metaDescription.value,

  ogTitle: () => metaTitle.value,
  ogDescription: () => metaDescription.value,
  ogUrl: () => currentUrl.value,
  ogImage: () => metaImage.value,
  ogImageAlt: () => metaTitle.value,
  ogType: 'website',
  ogSiteName: 'penyadap.pages.dev',

  twitterCard: 'summary_large_image',
  twitterTitle: () => metaTitle.value,
  twitterDescription: () => metaDescription.value,
  twitterImage: () => metaImage.value
})


// ======================
// SCHEMA.ORG OTOMATIS
// ======================
const schemaGraph = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://penyadap.pages.dev/#website',
  url: 'https://penyadap.pages.dev',
  name: 'penyadap.pages.dev',
  alternateName: 'Aplikasi Sadap iPhone & Android',
  description: 'Aplikasi Sadap iPhone & Android - WhatsApp, FB, Line, CALL',
  inLanguage: 'id-ID',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://penyadap.pages.dev/search?q={search_term_string}',
    'query-input': 'required name=search_term_string'
  },
  publisher: {
    '@type': 'Organization',
    name: 'penyadap.pages.dev',
    url: 'https://penyadap.pages.dev'
  }
}))

useHead(() => ({
  script: [
    {
      key: 'schema-org',
      type: 'application/ld+json',
      innerHTML: JSON.stringify(schemaGraph.value)
    }
  ],
  __dangerouslyDisableSanitizersByTagID: {
    'schema-org': ['innerHTML']
  }
}))


// ======================
// CANONICAL
// ======================
useHead({
  link: [
    { rel: 'canonical', href: currentUrl.value }
  ]
})

// ======================
// FAQ SECTION
// ======================
const faqItems = (parse(faqSource)?.faq ?? []).map((item, index) => ({
  ...item,
  id: `${index}-${item.question}`
}))
const activeFaq = ref(0)
const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? -1 : index
}
</script>
