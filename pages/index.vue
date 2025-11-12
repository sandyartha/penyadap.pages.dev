<template>
	<main class="min-h-screen">
		<div class="space-y-24">
			<HomeIntro />

			<section class="max-w-4xl mx-auto prose dark:prose-invert">
				<ContentDoc />
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
const { data: indexDoc } = await useAsyncData('index-doc', () =>
	queryContent().where({ _path: '/index' }).findOne()
)

const metaTitle = indexDoc.value?.title || 'Jasa Pemasangan Parental Control — mSpy (Indonesia)'
const metaDescription = indexDoc.value?.description || 'Layanan pemasangan dan konfigurasi aplikasi parental control mSpy untuk membantu orang tua memantau keamanan digital anak di Indonesia.'

useSeoMeta({
	title: metaTitle,
	description: metaDescription,
	og: {
		title: metaTitle,
		description: metaDescription,
		url: siteUrl + useRoute().path,
		image: indexDoc.value?.image || '/favicon-96x96.png',
		type: 'website'
	},
	twitter: { card: 'summary_large_image' }
})
</script>
