<template>
  <main class="min-h-screen">
    <div class="max-w-4xl mx-auto px-4 py-8">
      <ContentDoc :path="`/articles/${$route.params.slug}`">
        <template #default="{ doc }">
          <article class="prose dark:prose-invert max-w-none">
            <!-- Breadcrumb visual; versi terstruktur (BreadcrumbList) sudah
                 ditambahkan lewat JSON-LD di bagian script. -->
            <nav aria-label="Breadcrumb" class="not-prose mb-6">
              <ol class="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                <li>
                  <NuxtLink
                    to="/"
                    class="text-gray-500 no-underline hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    Beranda
                  </NuxtLink>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <NuxtLink
                    to="/articles"
                    class="text-gray-500 no-underline hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    Artikel
                  </NuxtLink>
                </li>
                <li aria-hidden="true">/</li>
                <li
                  class="line-clamp-1 max-w-xs font-medium text-gray-700 sm:max-w-md dark:text-gray-200"
                  aria-current="page"
                >
                  {{ doc.title }}
                </li>
              </ol>
            </nav>
            <h1 class="mb-4">{{ doc.title }}</h1>
            <div class="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
              <span
                v-if="doc.author"
                class="inline-flex items-center gap-1.5 whitespace-nowrap font-medium text-gray-700 dark:text-gray-200"
              >
                <Icon
                  name="solar:user-circle-linear"
                  class="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500"
                  aria-hidden="true"
                />
                {{ doc.author }}
              </span>
              <span
                v-if="doc.author && formatDate(doc)"
                class="hidden h-4 w-px bg-gray-200 sm:block dark:bg-gray-700"
                aria-hidden="true"
              />
              <span
                v-if="formatDate(doc)"
                class="inline-flex items-center gap-1.5 whitespace-nowrap text-gray-500 dark:text-gray-400"
              >
                <Icon name="solar:calendar-linear" class="h-4 w-4 shrink-0" aria-hidden="true" />
                {{ formatDate(doc) }}
              </span>
              <span class="hidden h-4 w-px bg-gray-200 sm:block dark:bg-gray-700" aria-hidden="true" />
              <span class="inline-flex items-center gap-1.5 whitespace-nowrap text-gray-500 dark:text-gray-400">
                <Icon name="solar:clock-circle-linear" class="h-4 w-4 shrink-0" aria-hidden="true" />
                {{ getReadingTime(doc) }}
              </span>
            </div>
            <!-- Daftar isi dari heading artikel. Tertutup secara default dan
                 bisa dibuka/tutup; hanya muncul kalau artikel punya heading. -->
            <nav
              v-if="doc.toc !== false && doc.body?.toc?.links?.length"
              aria-label="Daftar Isi"
              class="not-prose mb-8 rounded-2xl border border-gray-200 bg-gray-50/70 p-4 dark:border-gray-800 dark:bg-zinc-900/60"
            >
              <button
                type="button"
                class="flex w-full items-center justify-between gap-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100"
                :aria-expanded="tocOpen ? 'true' : 'false'"
                aria-controls="toc-panel"
                @click="tocOpen = !tocOpen"
              >
                <span class="inline-flex items-center gap-2">
                  <Icon
                    name="solar:list-check-linear"
                    class="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400"
                    aria-hidden="true"
                  />
                  Daftar Isi
                </span>
                <Icon
                  :name="tocOpen ? 'solar:alt-arrow-up-linear' : 'solar:alt-arrow-down-linear'"
                  class="h-4 w-4 shrink-0 text-gray-400"
                  aria-hidden="true"
                />
              </button>
              <div v-show="tocOpen" id="toc-panel" class="mt-3">
                <ol class="space-y-1.5 text-sm">
                  <li v-for="link in doc.body.toc.links" :key="link.id">
                    <a
                      :href="`#${link.id}`"
                      class="text-gray-600 no-underline hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                    >
                      {{ link.text }}
                    </a>
                    <ol v-if="link.children?.length" class="mt-1.5 ml-4 space-y-1.5">
                      <li v-for="child in link.children" :key="child.id">
                        <a
                          :href="`#${child.id}`"
                          class="text-gray-500 no-underline hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                        >
                          {{ child.text }}
                        </a>
                      </li>
                    </ol>
                  </li>
                </ol>
              </div>
            </nav>

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
                  <div class="mt-6 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-gray-200 pt-4 dark:border-gray-800">
                    <div class="flex items-center gap-3 text-xs font-medium text-gray-600 dark:text-gray-300">
                      <span v-if="formatDate(prevArticle)" class="inline-flex items-center gap-1.5 whitespace-nowrap">
                        <Icon name="solar:calendar-linear" class="h-3.5 w-3.5 shrink-0 text-gray-400 dark:text-gray-500" aria-hidden="true" />
                        {{ formatDate(prevArticle) }}
                      </span>
                      <span class="inline-flex items-center gap-1.5 whitespace-nowrap">
                        <Icon name="solar:clock-circle-linear" class="h-3.5 w-3.5 shrink-0 text-gray-400 dark:text-gray-500" aria-hidden="true" />
                        {{ getReadingTime(prevArticle) }}
                      </span>
                    </div>
                    <span class="inline-flex shrink-0 items-center gap-1 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700 transition group-hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:group-hover:bg-blue-900/70">
                      Baca
                      <span aria-hidden="true">→</span>
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
                  <div class="mt-6 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-gray-200 pt-4 dark:border-gray-800">
                    <div class="flex items-center gap-3 text-xs font-medium text-gray-600 dark:text-gray-300">
                      <span v-if="formatDate(nextArticle)" class="inline-flex items-center gap-1.5 whitespace-nowrap">
                        <Icon name="solar:calendar-linear" class="h-3.5 w-3.5 shrink-0 text-gray-400 dark:text-gray-500" aria-hidden="true" />
                        {{ formatDate(nextArticle) }}
                      </span>
                      <span class="inline-flex items-center gap-1.5 whitespace-nowrap">
                        <Icon name="solar:clock-circle-linear" class="h-3.5 w-3.5 shrink-0 text-gray-400 dark:text-gray-500" aria-hidden="true" />
                        {{ getReadingTime(nextArticle) }}
                      </span>
                    </div>
                    <span class="inline-flex shrink-0 items-center gap-1 rounded-full bg-violet-100 px-3 py-1.5 text-xs font-semibold text-violet-700 transition group-hover:bg-violet-200 dark:bg-violet-900/40 dark:text-violet-300 dark:group-hover:bg-violet-900/70">
                      Baca
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </NuxtLink>
              </div>
            </section>

            <!-- Artikel terkait: dipilih dari tag yang beririsan dengan artikel ini -->
            <section v-if="relatedArticles.length" class="not-prose mt-16">
              <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Artikel Terkait
              </h2>
              <div class="mt-6 grid gap-6 md:grid-cols-3">
                <NuxtLink
                  v-for="item in relatedArticles"
                  :key="item._path"
                  :to="item._path"
                  class="group flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg no-underline dark:border-gray-800 dark:bg-zinc-900 dark:hover:border-blue-500"
                >
                  <h3
                    class="text-base font-semibold text-gray-900 transition group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-300"
                  >
                    {{ item.title }}
                  </h3>
                  <p
                    v-if="item.description"
                    class="mt-2 text-sm text-gray-600 line-clamp-3 dark:text-gray-400"
                  >
                    {{ item.description }}
                  </p>
                  <span
                    v-if="formatDate(item)"
                    class="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400"
                  >
                    <Icon
                      name="solar:calendar-linear"
                      class="h-3.5 w-3.5 shrink-0"
                      aria-hidden="true"
                    />
                    {{ formatDate(item) }}
                  </span>
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
// Peta dimensi asli gambar di `public/` (dibuat modules/image-dimensions.ts).
// Sudah dipakai juga oleh ProseImg.vue, jadi tidak menambah bundle baru.
import imageDimensions from '#build/image-dimensions.mjs'

const route = useRoute();
const siteUrl = useSiteUrl()
const currentPath = `/articles/${route.params.slug}`;

// Daftar Isi tertutup secara default.
const tocOpen = ref(false);

const { data: article } = await useAsyncData(
  `article-${route.params.slug}`,
  () => queryContent('/articles').where({ _path: currentPath }).findOne()
);

const { data: adjacentArticles } = await useAsyncData(
  `adjacent-articles-${route.params.slug}`,
  async () => {
    const current = article.value;

    if (!current) return { prev: null, next: null, related: [] };

    const articles = await queryContent('/articles')
      .only(['_path', 'title', 'description', 'date', 'published', 'createdAt', 'body', 'tags'])
      .where({ draft: { $ne: true } })
      .sort({ published: -1, date: -1, createdAt: -1 })
      .find();

    const index = articles.findIndex((item) => item._path === current._path);

    if (index === -1) return { prev: null, next: null, related: [] };

    // Artikel terkait: diurutkan dari jumlah tag yang beririsan, maksimal 3.
    const normalize = (tags) => (tags || []).map((tag) => String(tag).toLowerCase());
    const currentTags = normalize(current.tags);
    const related = currentTags.length
      ? articles
          .filter((item) => item._path !== current._path)
          .map((item) => ({
            item,
            score: normalize(item.tags).filter((tag) => currentTags.includes(tag)).length
          }))
          .filter((entry) => entry.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, 3)
          .map((entry) => entry.item)
      : [];

    return {
      prev: index > 0 ? articles[index - 1] : null,
      next: index < articles.length - 1 ? articles[index + 1] : null,
      related
    };
  },
  { watch: [article] }
);

const prevArticle = computed(() => adjacentArticles.value?.prev || null);
const nextArticle = computed(() => adjacentArticles.value?.next || null);
const relatedArticles = computed(() => adjacentArticles.value?.related || []);

// `timeZone` dikunci (Asia/Jakarta) supaya tanggal yang dirender sama antara
// HTML hasil prerender dan render klien, apa pun zona perangkat pengunjung.
const formatDate = (doc) => {
  const rawDate = doc?.date || doc?.published || doc?.createdAt;
  if (!rawDate) return '';
  const parsed = new Date(rawDate);
  if (Number.isNaN(parsed.valueOf())) return '';
  return parsed.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Jakarta'
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
// Diambil dari frontmatter `author` tiap artikel.
const metaAuthor = computed(() => article.value?.author || 'penyadap.pages.dev');

// Path gambar apa adanya (frontmatter atau fallback), dipakai juga untuk
// mencari dimensi aslinya di peta `imageDimensions`.
const rawImage = computed(
  () => article.value?.image || article.value?.thumbnail || fallbackImage
);
const metaImage = computed(() =>
  rawImage.value?.startsWith('http') ? rawImage.value : `${siteUrl.value}${rawImage.value}`
);
// Dimensi asli gambar og. Dipakai di meta og:image dan schema Article supaya
// angkanya sesuai kenyataan (sebelumnya selalu ditulis 1200x630).
const ogImageSize = computed(() => imageDimensions[rawImage.value] || null);

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
  ogImageWidth: () => ogImageSize.value?.width,
  ogImageHeight: () => ogImageSize.value?.height,
  ogType: 'article',
  ogSiteName: 'penyadap.pages.dev',
  author: () => metaAuthor.value,
  articleAuthor: () => [metaAuthor.value],
  articlePublishedTime: () => datePublished.value,
  articleModifiedTime: () => dateModified.value,
  articleSection: 'Parental Control',
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

const articleSchemaJson = computed(() => {
  if (!article.value || !metaTitle.value || !datePublished.value) return null;

  const articleId = `${currentUrl.value}#article`;
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
      ...(ogImageSize.value
        ? { width: ogImageSize.value.width, height: ogImageSize.value.height }
        : {})
    },
    datePublished: datePublished.value,
    dateModified: dateModified.value || datePublished.value,
    author: {
      '@type': 'Person',
      name: metaAuthor.value
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
    articleSection: 'Parental Control',
    keywords: article.value?.tags?.join(', ') || '',
    wordCount: wordCount.value,
    inLanguage: 'id-ID',
    isPartOf: {
      '@type': 'WebSite',
      '@id': websiteId
    }
  }

  return JSON.stringify({
    '@context': 'https://schema.org',
    ...articleNode
  });
});

const breadcrumbSchemaJson = computed(() => {
  if (!article.value || !metaTitle.value || !datePublished.value) return null;

  const breadcrumbId = `${currentUrl.value}#breadcrumb`;

  const breadcrumbNode = {
    '@type': 'BreadcrumbList',
    '@id': breadcrumbId,
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

  return JSON.stringify({
    '@context': 'https://schema.org',
    ...breadcrumbNode
  });
});

useHead(() => {
  const script = [];
  const sanitizers = {};

  if (articleSchemaJson.value) {
    script.push({
      key: 'schema-org-article',
      type: 'application/ld+json',
      innerHTML: articleSchemaJson.value
    });
    sanitizers['schema-org-article'] = ['innerHTML'];
  }

  if (breadcrumbSchemaJson.value) {
    script.push({
      key: 'schema-org-breadcrumb',
      type: 'application/ld+json',
      innerHTML: breadcrumbSchemaJson.value
    });
    sanitizers['schema-org-breadcrumb'] = ['innerHTML'];
  }

  if (!script.length) return {};

  return {
    script,
    __dangerouslyDisableSanitizersByTagID: sanitizers
  };
});
</script>
