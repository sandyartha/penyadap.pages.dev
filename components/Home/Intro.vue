<template>
  <div class="space-y-6">
    <img :src="avatarSrc" alt="Fayaz Ahmed"
      class="ring-2 border ring-gray-200 border-gray-300 dark:ring-white/10 dark:border-gray-800 hover:ring-4 transition-all duration-300 bg-gray-200 dark:bg-gray-900 rounded-full h-12 w-12 sm:h-16 sm:w-16"
      width="64" height="64" />

    <NuxtImg
      format="webp"
      src="/avatar.png"
    />

    <h1 class="text-xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
      Hello!
    </h1>
    <p class="text-gray-900 dark:text-gray-400">
      I'm Fayaz, I work as a software, product engineer and designer from
      Bengaluru, India. I specialize in building web applications and sites
      using Javascript, React, Vue &amp; Node. I've procrastinated building this
      website for years but finally it's here, I've carved out my own little
      nook on the internet to share my silly experiments, nifty projects, and
      thoughts (mostly about tech and design).
    </p>
    <p class="text-gray-900 dark:text-gray-400">
      By day, I'm a Fullstack Developer at
      <a href="https://headshotpro.com" target="_blank" class="underline">Headshotpro</a>, and
      by night (and weekends), I'm busy tinkering with some random tool or app
      that I am building.
    </p>
  </div>
</template>

<script setup>
useSeoMeta({
  title: "Fayaz Ahmed",
  description:
    "I'm Fayaz, your friendly neighborhood software, product engineer and designer from Bengaluru, India. I specialize in building web applications and sites using Javascript, React, Vue & Node.",
});

// Resolve image URL via @nuxt/image helper. Avoid using `$img` directly in template
// because it may not be injected into the template scope. useNuxtApp() is
// always available in setup and provides access to the $img helper.
const nuxtApp = useNuxtApp();
// Compute avatarSrc on mounted so the runtime $img helper (provided by
// @nuxt/image) is available on the client. During SSR the helper may not be
// present and we must avoid permanently falling back to the static PNG.
import { ref, onMounted } from 'vue';
// Prefer a pre-generated AVIF in public as a fast, reliable fallback during
// builds/environments where Sharp/IPX isn't available (e.g. CI/CD). Put
// `public/avatar.avif` in the repository (generated locally) and it will be
// served directly.
const avatarSrc = ref('/avatar.avif');
onMounted(() => {
  if (nuxtApp && typeof nuxtApp.$img === 'function') {
    try {
      avatarSrc.value = nuxtApp.$img('/avatar.png', { width: 64, height: 64, format: 'webp', quality: 80 });
      // log for debugging: uncomment if you want to inspect the generated URL
      // console.log('avatarSrc (from $img):', avatarSrc.value)
    } catch (e) {
      // keep fallback
      // console.error('failed to generate avatar via $img', e)
    }
  }
});
</script>
