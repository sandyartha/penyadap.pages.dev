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

			<!-- Parental Control Service Section (mSpy Indonesia) -->
			
		</div>
	</main>
</template>

<script setup>
// Use frontmatter from `content/index.md` for SEO (title, description, og)
const siteUrl = 'https://penyadap.pages.dev'
const route = useRoute()
// Query for SEO meta - try multiple methods
const { data: indexDoc } = await useAsyncData('index-doc', async () => {
	// Method 1: Query by slug (from frontmatter)
	let doc = await queryContent().where({ slug: '/index' }).findOne().catch(() => null)
	if (doc) return doc

	// Method 2: Query by path
	doc = await queryContent('/index').findOne().catch(() => null)
	if (doc) return doc

	// Method 3: Query by _path
	doc = await queryContent().where({ _path: '/index' }).findOne().catch(() => null)
	if (doc) return doc

	// Method 4: Try without leading slash
	doc = await queryContent('index').findOne().catch(() => null)
	return doc || null
})

const fallbackImage = '/default.png';
const currentUrl = computed(() => siteUrl + route.path);

const metaTitle = computed(() => indexDoc.value?.title);
const metaDescription = computed(() => indexDoc.value?.description);
const metaImage = computed(() => {
  const image = indexDoc.value?.image || indexDoc.value?.thumbnail || fallbackImage;
  return image?.startsWith('http') ? image : `${siteUrl}${image}`;
});

// Generate JSON-LD schema
const jsonLd = computed(() =>
  useJsonLd(
    'index',
    {
      title: metaTitle.value,
      description: metaDescription.value,
      image: metaImage.value,
      url: currentUrl.value
    },
    { siteUrl }
  )
);

const jsonLdScript = computed(() => {
  if (!jsonLd.value) return null;
  return {
    type: 'application/ld+json',
    key: 'jsonld-index',
    innerHTML: JSON.stringify(jsonLd.value)
  };
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
  script: jsonLdScript.value ? [jsonLdScript.value] : [],
  __dangerouslyDisableSanitizersByTagID: jsonLdScript.value
    ? {
        'jsonld-index': ['innerHTML']
      }
    : undefined
}))
</script>
