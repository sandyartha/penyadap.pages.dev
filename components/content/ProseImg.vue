<template>
	<!-- In dev: render native img to avoid IPX transformation; In prod: use NuxtPicture with AVIF/WebP -->
	<component :is="isDev ? 'img' : NuxtPicture"
		:src="src"
		:alt="alt || ''"
		loading="lazy"
		decoding="async"
		:format="isDev ? undefined : ['avif', 'webp']"
		:sizes="isDev ? undefined : 'sm:100vw md:100vw lg:100vw xl:1200px'"
		class="rounded-lg my-4 mx-auto max-w-full h-auto"
	/>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
	src?: string
	alt?: string
	width?: string | number
	height?: string | number
}>(), {
	src: '',
	alt: ''
})

const isDev = process.dev
</script>
