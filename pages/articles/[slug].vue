<template>
  <main class="min-h-screen">
    <div class="max-w-4xl mx-auto px-4 py-8">
      <ContentDoc :path="`/articles/${$route.params.slug}`">
        <template #default="{ doc }">
          <article class="prose dark:prose-invert max-w-none">
            <h1 class="mb-4">{{ doc.title }}</h1>
            <div class="text-sm text-gray-500 mb-8 flex items-center">
              <span v-if="formatDate(doc)">{{ formatDate(doc) }}</span>
              <span v-if="formatDate(doc)" class="mx-2">·</span>
              <span class="text-gray-400">
                {{ getReadingTime(doc) }}
              </span>
            </div>
            <ContentRenderer :value="doc" />

            <section
              v-if="prevArticle || nextArticle"
              class="mt-16 border-t border-gray-200 dark:border-gray-800 pt-10"
            >
              <div class="grid gap-6 md:grid-cols-2">
                <NuxtLink
                  v-if="prevArticle"
                  :to="prevArticle._path"
                  class="group flex h-full flex-col justify-between rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-blue-50 via-white to-white dark:from-blue-950/60 dark:via-zinc-900 dark:to-zinc-900 p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg dark:hover:border-blue-500 no-underline"
                >
                  <div>
                    <span class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                      <span class="rounded-full bg-blue-100/80 dark:bg-blue-900/40 px-3 py-1">
                        Artikel Sebelumnya
                      </span>
                    </span>
                    <h3 class="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100 transition group-hover:text-blue-600 dark:group-hover:text-blue-300 group-hover:underline">
                      {{ prevArticle.title }}
                    </h3>
                    <p v-if="prevArticle.description" class="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                      {{ prevArticle.description }}
                    </p>
                  </div>
                  <div class="mt-5 flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
                    <div class="flex items-center gap-2">
                      <span v-if="formatDate(prevArticle)">{{ formatDate(prevArticle) }}</span>
                      <span v-if="formatDate(prevArticle)" aria-hidden="true">·</span>
                      <span>{{ getReadingTime(prevArticle) }}</span>
                    </div>
                    <span class="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 group-hover:no-underline">
                      <span aria-hidden="true">←</span>
                      <span class="text-xs font-medium">Baca</span>
                    </span>
                  </div>
                </NuxtLink>

                <NuxtLink
                  v-if="nextArticle"
                  :to="nextArticle._path"
                  class="group flex h-full flex-col justify-between rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-violet-50 via-white to-white dark:from-violet-950/60 dark:via-zinc-900 dark:to-zinc-900 p-6 shadow-sm transition hover:-translate-y-1 hover:border-violet-500 hover:shadow-lg dark:hover:border-violet-500 no-underline"
                >
                  <div>
                    <span class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-400">
                      <span class="rounded-full bg-violet-100/80 dark:bg-violet-900/40 px-3 py-1">
                        Artikel Selanjutnya
                      </span>
                    </span>
                    <h3 class="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100 transition group-hover:text-violet-600 dark:group-hover:text-violet-300 group-hover:underline">
                      {{ nextArticle.title }}
                    </h3>
                    <p v-if="nextArticle.description" class="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                      {{ nextArticle.description }}
                    </p>
                  </div>
                  <div class="mt-5 flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
                    <div class="flex items-center gap-2">
                      <span v-if="formatDate(nextArticle)">{{ formatDate(nextArticle) }}</span>
                      <span v-if="formatDate(nextArticle)" aria-hidden="true">·</span>
                      <span>{{ getReadingTime(nextArticle) }}</span>
                    </div>
                    <span class="inline-flex items-center gap-1 text-violet-600 dark:text-violet-400 group-hover:no-underline">
                      <span class="text-xs font-medium">Baca</span>
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </NuxtLink>
              </div>
            </section>
          </article>
        </template>

        <template #not-found>
          <div class="text-center py-8">
            <h1 class="text-2xl mb-4">Artikel tidak ditemukan</h1>
            <NuxtLink to="/articles" class="text-blue-500 hover:underline">
              Kembali ke daftar artikel
            </NuxtLink>
          </div>
        </template>
      </ContentDoc>
    </div>
  </main>
</template>
<script setup>
const route = useRoute();
const siteUrl = useSiteUrl()
const currentPath = `/articles/${route.params.slug}`;

const { data: article } = await useAsyncData(
  `article-${route.params.slug}`,
  () => queryContent('/articles').where({ _path: currentPath }).findOne()
);

const { data: adjacentArticles } = await useAsyncData(
  `adjacent-articles-${route.params.slug}`,
  async () => {
    const current = article.value;

    if (!current) return { prev: null, next: null };

    const articles = await queryContent('/articles')
      .only(['_path', 'title', 'description', 'date', 'published', 'createdAt', 'body'])
      .where({ draft: { $ne: true } })
      .sort({ published: -1, date: -1, createdAt: -1 })
      .find();

    const index = articles.findIndex((item) => item._path === current._path);

    if (index === -1) return { prev: null, next: null };

    return {
      prev: index > 0 ? articles[index - 1] : null,
      next: index < articles.length - 1 ? articles[index + 1] : null
    };
  },
  { watch: [article] }
);

const prevArticle = computed(() => adjacentArticles.value?.prev || null);
const nextArticle = computed(() => adjacentArticles.value?.next || null);

const formatDate = (doc) => {
  const rawDate = doc?.date || doc?.published || doc?.createdAt;
  if (!rawDate) return '';
  const parsed = new Date(rawDate);
  if (Number.isNaN(parsed.valueOf())) return '';
  return parsed.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const getReadingTime = (doc) => {
  const collectText = (node) => {
    if (!node) return '';
    if (Array.isArray(node)) return node.map(collectText).join(' ');
    const type = node.type;
    if (type === 'text' && typeof node.value === 'string') return node.value;
    if (node.children && Array.isArray(node.children)) {
      return node.children.map(collectText).join(' ');
    }
    return '';
  };

  const body = doc?.body;
  const text = collectText(body).replace(/\s+/g, ' ').trim();
  if (!text) return '1 menit baca';
  const words = text.split(' ').filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} menit baca`;
};

const fallbackImage = '/default.png';
const currentUrl = computed(() => `${siteUrl.value}/articles/${route.params.slug}`);

const metaTitle = computed(() => article.value?.title || 'Artikel');
const metaDescription = computed(() => article.value?.description || 'Artikel mSpy Indonesia');
const metaImage = computed(() => {
  if (!article.value) return `${siteUrl.value}${fallbackImage}`;
  const image = article.value.image || article.value.thumbnail || fallbackImage;
  return image?.startsWith('http') ? image : `${siteUrl.value}${image}`;
});

const datePublished = computed(() => {
  if (!article.value) return null;
  const date = article.value.published || article.value.date || article.value.createdAt;
  if (!date) return null;
  return new Date(date).toISOString();
});

const dateModified = computed(() => {
  if (!article.value) return null;
  const date = article.value.dateModified || article.value.updatedAt || article.value.published || article.value.date;
  if (!date) return null;
  return new Date(date).toISOString();
});

const wordCount = computed(() => {
  if (!article.value?.body) return 0;
  
  const collectText = (node) => {
    if (!node) return '';
    if (Array.isArray(node)) return node.map(collectText).join(' ');
    const type = node.type;
    if (type === 'text' && typeof node.value === 'string') return node.value;
    if (node.children && Array.isArray(node.children)) {
      return node.children.map(collectText).join(' ');
    }
    return '';
  };

  const text = collectText(article.value.body).replace(/\s+/g, ' ').trim();
  return text.split(' ').filter(Boolean).length;
});

useSeoMeta({
  title: () => metaTitle.value,
  description: () => metaDescription.value,
  ogTitle: () => metaTitle.value,
  ogDescription: () => metaDescription.value,
  ogUrl: () => currentUrl.value,
  ogImage: () => metaImage.value,
  ogImageAlt: () => metaTitle.value,
  ogType: 'article',
  ogSiteName: 'penyadap.pages.dev',
  articlePublishedTime: () => datePublished.value,
  articleModifiedTime: () => dateModified.value,
  articleSection: 'Technology',
  articleTag: () => article.value?.tags || [],
  twitterCard: 'summary_large_image',
  twitterTitle: () => metaTitle.value,
  twitterDescription: () => metaDescription.value,
  twitterImage: () => metaImage.value
});

useHead(() => ({
  link: [
    { rel: 'canonical', href: currentUrl.value }
  ]
}))

const schemaGraph = computed(() => {
  if (!article.value || !metaTitle.value || !datePublished.value) return null;

  const articleId = `${currentUrl.value}#article`;
  const breadcrumbId = `${currentUrl.value}#breadcrumb`;
  const organizationId = `${siteUrl.value}#organization`;
  const websiteId = `${siteUrl.value}#website`;

  const articleNode = {
    '@type': 'Article',
    '@id': articleId,
    headline: metaTitle.value,
    description: metaDescription.value,
    image: {
      '@type': 'ImageObject',
      url: metaImage.value,
      width: 1200,
      height: 630
    },
    datePublished: datePublished.value,
    dateModified: dateModified.value || datePublished.value,
    author: {
      '@type': 'Organization',
      '@id': organizationId,
      name: 'penyadap.pages.dev',
      url: siteUrl.value
    },
    publisher: {
      '@type': 'Organization',
      '@id': organizationId,
      name: 'penyadap.pages.dev',
      url: siteUrl.value,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl.value}/logo.png`,
        width: 512,
        height: 512
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': currentUrl.value
    },
    articleSection: 'Technology',
    keywords: article.value?.tags?.join(', ') || '',
    wordCount: wordCount.value,
    inLanguage: 'id-ID',
    isPartOf: {
      '@type': 'WebSite',
      '@id': websiteId
    }
  }

  const breadcrumbNode = {
    '@type': 'BreadcrumbList',
    '@id': breadcrumbId,
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
        name: 'Artikel',
        item: `${siteUrl.value}/articles`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: metaTitle.value,
        item: currentUrl.value
      }
    ]
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [articleNode, breadcrumbNode]
  };
});

useHead(() => {
  if (!schemaGraph.value) return {};

  return {
    script: [
      {
        key: 'schema-org-article',
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schemaGraph.value)
      }
    ],
    __dangerouslyDisableSanitizersByTagID: {
      'schema-org-article': ['innerHTML']
    }
  };
});
</script>
