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
    </div>
  </main>
</template>

<script setup>
const route = useRoute()
const siteUrl = useSiteUrl()

const { data: indexDoc } = await useAsyncData('index-doc', async () => {
        let doc = await queryContent().where({ slug: '/index' }).findOne().catch(() => null)
        if (doc) return doc

        doc = await queryContent('/index').findOne().catch(() => null)
        if (doc) return doc

        doc = await queryContent().where({ _path: '/index' }).findOne().catch(() => null)
        if (doc) return doc

        doc = await queryContent('index').findOne().catch(() => null)
        return doc || null
})

const fallbackImage = '/default.png';
const currentUrl = computed(() => siteUrl.value + route.path);

const metaTitle = computed(() => indexDoc.value?.title);
const metaDescription = computed(() => indexDoc.value?.description);
const metaImage = computed(() => {
  const image = indexDoc.value?.image || indexDoc.value?.thumbnail || fallbackImage;
  return image?.startsWith('http') ? image : `${siteUrl.value}${image}`;
});

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

useHead(() => ({
  link: [
    { rel: 'canonical', href: currentUrl.value }
  ],
  script: [
    {
      type: 'application/ld+json',
      key: 'schema-org-graph',
      'data-nuxt-schema-org': 'true',
      'data-hid': 'schema-org-graph',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@id': `${siteUrl.value}/#website`,
            '@type': 'WebSite',
            description: 'Jasa Pemasangan Parental Control — mSpy (Indonesia)',
            inLanguage: 'id-ID',
            name: 'penyadap.pages.dev',
            url: siteUrl.value,
            potentialAction: [
              {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: `${siteUrl.value}/?s={search_term_string}`
                },
                'query-input': 'required name=search_term_string'
              }
            ]
          },
          {
            '@id': `${currentUrl.value.replace(/\/$/, '')}/#webpage`,
            '@type': 'WebPage',
            description: metaDescription.value || 'Jasa Sadap iPhone / Android Secara Jarak Jauh - Panggilan WhatsApp, Line, Instagram dan Facebook, Buktikan pasangan selingkuh.',
            name: metaTitle.value || 'Aplikasi Sadap iPhone & Android - WhatsApp, FB, Line, CALL',
            url: currentUrl.value,
            inLanguage: 'id-ID',
            isPartOf: {
              '@id': `${siteUrl.value}/#website`
            },
            mainEntityOfPage: {
              '@id': `${currentUrl.value.replace(/\/$/, '')}/#webpage`
            }
          }
        ]
      })
    }
  ]
}))

</script>