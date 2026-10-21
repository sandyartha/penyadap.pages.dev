<template>
  <img
    v-if="isDev"
    :src="originalSrc"
    :alt="alt"
    :width="dimensions?.width"
    :height="dimensions?.height"
    loading="lazy"
    decoding="async"
  />
  <picture v-else>
    <source :srcset="webpSrc" type="image/webp" />
    <img
      :src="originalSrc"
      :alt="alt"
      :width="dimensions?.width"
      :height="dimensions?.height"
      loading="lazy"
      decoding="async"
    />
  </picture>
</template>

<script setup>
import imageDimensions from "#build/image-dimensions.mjs";

// ProseImg menggantikan komponen bawaan MDC untuk tag <img> di Markdown.
//
// DEV   : satu <img> ke file asli di `public/` (tanpa IPX, tanpa encode)
//         supaya `nuxt dev` tetap cepat.
// BUILD : <img> dibungkus <picture>:
//           <source type="image/webp"> -> file WebP hasil IPX (1 file/gambar)
//           <img src="file asli">      -> fallback untuk browser tanpa WebP
//         File asli TIDAK di-encode ulang; ia sudah ikut ter-copy dari
//         `public/` ke `dist/`, jadi fallback ini gratis (0 proses sharp).
//
// Catatan: penjelasan ini ditaruh di script, bukan di <template>, karena
// komentar di dalam template Vue ikut tercetak ke HTML hasil render.

// Konversi 1:1: JPG/PNG asli hanya diubah formatnya menjadi WebP pada ukuran
// yang sama — tanpa modifier `width`/`height`, jadi sharp tidak melakukan
// resize.
//
// Kenapa `$img()` dan bukan <NuxtPicture>? NuxtPicture membangun srcset dari
// `sizes` + `densities`, dan jumlah file yang di-encode = jumlah breakpoint x
// jumlah density x jumlah format. Dengan nilai bawaan modul, satu gambar pecah
// jadi 12 file (7 breakpoint x 2 density x avif/webp/png) sehingga build
// ratusan gambar jadi berjam-jam. `$img()` dengan modifier `format` saja
// menghasilkan TEPAT satu URL IPX, tanpa srcset yang tidak terpakai.
//
// AVIF sengaja tidak dipakai: ipx memanggil sharp.toFormat(format, { quality })
// tanpa meneruskan opsi `effort`, jadi AVIF selalu memakai effort bawaan (4) —
// di mesin ini ~30s per gambar, sedangkan WebP ~2s dengan ukuran file setara
// (WebP malah lebih kecil untuk screenshot PNG).
const isDev = import.meta.dev;
const $img = useImage();
const baseURL = useRuntimeConfig().app.baseURL;

const props = defineProps({
  src: {
    type: String,
    default: ""
  },
  alt: {
    type: String,
    default: ""
  }
});

// width/height TIDAK ditulis di Markdown. Peta dimensi dibaca dari file asli
// di `public/` saat build oleh `modules/image-dimensions.ts`, lalu dipakai di
// sini supaya browser sudah tahu rasio gambar sebelum gambarnya selesai dimuat
// (mencegah Cumulative Layout Shift). Kalau src tidak ada di peta, atribut
// width/height otomatis tidak dirender.
const dimensions = computed(() => imageDimensions[props.src]);

// Path file asli di `public/`, diselaraskan dengan app.baseURL (mis. saat
// deploy di sub-path). Dipakai dev dan sebagai fallback <img> di build.
const originalSrc = computed(() => {
  if (!props.src) {
    return "";
  }
  if (baseURL && baseURL !== "/" && props.src.startsWith("/") && !props.src.startsWith("//")) {
    return `${baseURL.replace(/\/$/, "")}${props.src}`;
  }
  return props.src;
});

// URL IPX satu varian WebP. Dipanggil di dalam <source>, jadi hanya diunduh
// browser yang mendukung WebP. Saat prerender, `$img()` mendaftarkan URL ini ke
// header `x-nitro-prerender` sehingga Nitro menulis filenya ke `dist/_ipx/`.
const webpSrc = computed(() => {
  if (!props.src || isDev) {
    return "";
  }
  return $img(props.src, { format: "webp", quality: 80 });
});
</script>
