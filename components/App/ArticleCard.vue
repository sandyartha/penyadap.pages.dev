<template>
  <NuxtLink :to="article._path" class="group">
    <article>
      <time
        class="relative z-10 order-first mb-3 flex items-center text-sm text-gray-500 dark:text-gray-400 pl-3.5"
        :datetime="getIsoDate(article)"
        ><span
          class="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
          ><span
            class="h-4 w-0.5 rounded-full bg-gray-200 dark:bg-gray-500"
          ></span
        ></span>
        {{ getReadableDate(article) }}
      </time>
      <h2
        class="text-base font-semibold font-display tracking-tight text-gray-800 dark:text-gray-100 group-hover:text-primary-600"
      >
        {{ article.title }}
      </h2>
      <p class="relative z-10 mt-2 text-sm text-gray-600 dark:text-gray-300">
        {{ article.description }}
      </p>
    </article>
  </NuxtLink>
</template>

<script setup>
defineProps({
  article: {
    type: Object,
    required: true,
  },
});

// Tanggal diambil dari frontmatter artikel, dengan urutan prioritas yang sama
// seperti halaman detail artikel.
const resolveDate = (article) =>
  article?.published || article?.date || article?.createdAt;

// Atribut `datetime` wajib format ISO agar dimengerti mesin pencari.
const getIsoDate = (article) => {
  const date = new Date(resolveDate(article));
  return Number.isNaN(date.valueOf()) ? undefined : date.toISOString();
};

// `timeZone` dikunci ke zona audiens: tanpa itu hasil `toLocaleDateString`
// ikut zona perangkat, sehingga HTML prerender (dibuat di mesin build) dan
// render klien bisa berbeda tanggalnya — pemicu hydration mismatch.
const getReadableDate = (article) => {
  const date = new Date(resolveDate(article));
  if (Number.isNaN(date.valueOf())) return "";
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Jakarta",
  });
};
</script>