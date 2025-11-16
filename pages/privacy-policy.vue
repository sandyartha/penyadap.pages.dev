<template>
  <main class="min-h-screen prose dark:prose-invert prose-lg mx-auto p-6 text-gray-900 dark:text-gray-100">
    <h1>Kebijakan Privasi</h1>
    <p>
      Kami menghargai privasi pengunjung. Halaman ini menjelaskan bagaimana data
      dikumpulkan dan digunakan pada situs ini.
    </p>
    <p>
      Kami tidak menjual data pengguna. Beberapa data dasar seperti alamat IP dan
      informasi analitik dapat dikumpulkan untuk tujuan pemantauan performa dan
      perbaikan situs.
    </p>
  </main>
</template>

<script setup>
const route = useRoute();
const siteUrl = useSiteUrl()

const title = 'Kebijakan Privasi';
const description = 'Kebijakan privasi penyadap.pages.dev — bagaimana data dikumpulkan dan digunakan.';
const url = computed(() => siteUrl.value + route.path);

const image = computed(() => `${siteUrl.value}/default.png`);

useSeoMeta({
  title,
  description,
  ogTitle: `${title} - penyadap.pages.dev`,
  ogDescription: description,
  ogUrl: () => url.value,
  ogImage: () => image.value,
  ogImageAlt: title,
  ogType: 'website',
  ogSiteName: 'penyadap.pages.dev',
  twitterCard: 'summary_large_image',
  twitterTitle: `${title} - penyadap.pages.dev`,
  twitterDescription: description,
  twitterImage: () => image.value
});

useHead(() => ({
  link: [
    { rel: 'canonical', href: url.value }
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
            '@type': 'WebPage',
            '@id': `${url.value}/#webpage`,
            url: url.value,
            name: title,
            description: description,
            inLanguage: 'id-ID',
            isPartOf: {
              '@type': 'WebSite',
              '@id': `${siteUrl.value}/#website`,
              url: siteUrl.value,
              name: 'penyadap.pages.dev',
              publisher: {
                '@type': 'Organization',
                '@id': `${siteUrl.value}/#organization`,
                name: 'penyadap.pages.dev'
              }
            },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: siteUrl.value
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: title
                }
              ]
            }
          }
        ]
      })
    }
  ]
}));
</script>


