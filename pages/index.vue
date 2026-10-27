<template>
  <main class="min-h-screen">
    <div class="space-y-24">
      <HomeIntro />

      <section class="max-w-4xl mx-auto prose dark:prose-invert prose-headings:font-bold">
        <ContentDoc>
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

      <HomeServicesCarousel :services="serviceCards" />
      <HomeTestimonials :testimonials="testimonialItems" />
      <HomeFaq :faqs="faqItems" />
      
      <HomeFeaturedArticles />
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
// `content/index.md` punya `_path: "/"`, bukan "/index" (akhiran `index`
// dibuang oleh transformer `path-meta` @nuxt/content). Jadi query-nya harus
// memakai "/" — `queryContent('index')` akan mencari `_path: "/index"` yang
// tidak pernah ada, dan saat prerender Nitro menganggapnya 404 lalu
// menggagalkan build.
const { data: indexDoc } = await useAsyncData('index-doc', () =>
  queryContent('/').findOne()
)

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
const schemaJson = computed(() =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    // `@id` WebSite & Organization harus identik dengan yang dirujuk schema
    // Article di halaman artikel (`${siteUrl}#website` / `${siteUrl}#organization`)
    // agar graph-nya tersambung. Sebelumnya di sini ada trailing slash.
    '@id': `${siteUrl.value}#website`,
    url: siteUrl.value,
    name: 'penyadap.pages.dev',
    alternateName: 'Aplikasi Sadap iPhone & Android',
    description: 'Aplikasi Sadap iPhone & Android - WhatsApp, FB, Line, CALL',
    inLanguage: 'id-ID',
    publisher: {
      '@type': 'Organization',
      '@id': `${siteUrl.value}#organization`,
      name: 'penyadap.pages.dev',
      url: siteUrl.value,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl.value}/logo.png`
      }
    }
  })
)

useHead(() => ({
  script: [
    {
      key: 'schema-org',
      type: 'application/ld+json',
        innerHTML: schemaJson.value
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

const faqItems = (parse(faqSource)?.faq ?? []).map((item, index) => ({
  ...item,
  id: `${index}-${item.question}`
}))

const testimonialItems = (parse(testimonialsSource)?.testimonials ?? []).map(
  (item, index) => ({
    ...item,
    id: `${index}-${item.name}`
  })
)

// ======================
// SCHEMA.ORG FAQ
// ======================
// Pertanyaan di halaman ini berasal dari `data/index_faq.yml`. Ditandai sebagai
// FAQPage supaya memenuhi syarat rich result FAQ di hasil pencarian.
const faqSchemaJson = computed(() => {
  if (!faqItems.length) return null

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${siteUrl.value}/#faq`,
    inLanguage: 'id-ID',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        // YAML block scalar menyisakan baris baru di akhir, jadi dipangkas.
        text: (item.answer || '').trim()
      }
    }))
  })
})

useHead(() => {
  if (!faqSchemaJson.value) return {}

  return {
    script: [
      {
        key: 'schema-org-faq',
        type: 'application/ld+json',
        innerHTML: faqSchemaJson.value
      }
    ],
    __dangerouslyDisableSanitizersByTagID: {
      'schema-org-faq': ['innerHTML']
    }
  }
})
</script>
