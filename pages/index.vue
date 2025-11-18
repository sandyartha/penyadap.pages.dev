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

      <section class="max-w-5xl mx-auto space-y-6">
        <div class="text-center space-y-3">
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">Layanan</p>
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Paket Sadap Unggulan</h2>
          <p class="text-gray-600 dark:text-gray-400">
            Pilih solusi sesuai perangkat target—semua sudah termasuk instalasi jarak jauh dan dukungan penuh.
          </p>
        </div>

        <div class="relative">
          <div class="grid gap-6 grid-cols-1 md:grid-cols-2">
            <article
              v-for="service in visibleServices"
              :key="service.id"
              class="rounded-3xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-zinc-900/70 shadow-sm p-6 flex flex-col"
            >
              <div
                class="text-blue-500 dark:text-blue-300"
                v-html="service.icon"
              />
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

      <section class="max-w-5xl mx-auto space-y-6">
        <div class="text-center space-y-3">
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">
            Testimonial
          </p>
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
            Cerita dari pengguna mSpy Indonesia
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            Pengalaman nyata dari orang tua dan pengguna yang mengandalkan aplikasi sadap untuk
            keamanan digital keluarga.
          </p>
        </div>

        <div
          class="grid gap-6 md:grid-cols-2"
        >
          <article
            v-for="item in testimonialItems"
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

      <HomeFeaturedArticles />
      <HomeSocialLinks />
      <HomeNewsletter />

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
import servicesSource from '~/data/index_services.yml?raw'
import testimonialsSource from '~/data/index_testimonials.yml?raw'

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
// HOME DATA (Services, FAQ, Testimonials)
// ======================
const serviceCards = (parse(servicesSource)?.services ?? []).map((service, index) => ({
  ...service,
  id: `${index}-${service.name}`
}))

const serviceSlide = ref(0)
const visibleServices = computed(() => {
  if (serviceCards.length <= 2) return serviceCards

  const current = serviceCards[serviceSlide.value % serviceCards.length]
  const next = serviceCards[(serviceSlide.value + 1) % serviceCards.length]
  return [current, next]
})

const nextServiceSlide = () => {
  if (!serviceCards.length) return
  serviceSlide.value = (serviceSlide.value + 1) % serviceCards.length
}

const prevServiceSlide = () => {
  if (!serviceCards.length) return
  serviceSlide.value =
    (serviceSlide.value - 1 + serviceCards.length) % serviceCards.length
}

const faqItems = (parse(faqSource)?.faq ?? []).map((item, index) => ({
  ...item,
  id: `${index}-${item.question}`
}))
const activeFaq = ref(0)
const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? -1 : index
}

const testimonialItems = (parse(testimonialsSource)?.testimonials ?? []).map(
  (item, index) => ({
    ...item,
    id: `${index}-${item.name}`
  })
)
</script>
