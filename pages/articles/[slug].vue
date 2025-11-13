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
const siteUrl = 'https://penyadap.pages.dev'
const { data: article } = await useAsyncData(
  `article-${route.params.slug}`,
  () => queryContent('/articles').where({ slug: route.params.slug }).findOne()
);

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
  // Traverse mdast to extract text content
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
  const minutes = Math.max(1, Math.round(words / 200)); // ~200 wpm
  return `${minutes} menit baca`;
};

useSeoMeta({
  title: article.value?.title || 'Artikel',
  description: article.value?.description || 'Artikel tentang mSpy dan keamanan digital keluarga.',
  og: {
    title: article.value?.title || 'Artikel',
    description: article.value?.description || 'Artikel tentang mSpy dan keamanan digital keluarga.',
    url: `${siteUrl}/articles/${route.params.slug}`,
    image: article.value?.image || '/favicon-96x96.png',
    type: 'article'
  },
  twitter: { card: 'summary_large_image' }
});
</script>
