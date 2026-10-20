<template>
  <!-- Pengganti shortcode Hugo {{< btn >}} di Markdown.
       Dipakai: <DownloadButton link="..." title="..."></DownloadButton>
       Tag penutup WAJIB ditulis (remark-mdc tidak mendukung self-closing). -->
  <div class="my-6 not-prose">
    <a
      :href="link"
      :target="isExternal ? '_blank' : undefined"
      :rel="isExternal ? 'noopener noreferrer' : undefined"
      class="inline-flex items-center gap-2.5 rounded-full border border-violet-300 bg-violet-50 px-5 py-2.5 text-sm font-semibold text-violet-700 no-underline transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400 hover:bg-violet-100 hover:shadow-lg hover:shadow-violet-500/20 dark:border-violet-500/30 dark:bg-violet-950/40 dark:text-violet-200 dark:hover:bg-violet-900/50"
    >
      <Icon
        name="solar:download-minimalistic-linear"
        class="h-4 w-4 shrink-0"
        aria-hidden="true"
      />
      <span>{{ title }}</span>
      <Icon
        v-if="isExternal"
        name="solar:arrow-right-up-bold"
        class="h-4 w-4 shrink-0 opacity-70"
        aria-hidden="true"
      />
    </a>
  </div>
</template>

<script setup>
const props = defineProps({
  link: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

// Link keluar (http/https) dibuka di tab baru supaya pembaca tidak
// kehilangan halaman artikel; link internal tetap di tab yang sama.
const isExternal = computed(() => /^https?:\/\//i.test(props.link))
</script>
