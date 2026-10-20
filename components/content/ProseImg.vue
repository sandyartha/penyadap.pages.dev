<template>
  <img
    v-if="isDev"
    :src="refinedSrc"
    :alt="alt"
    :width="dimensions?.width"
    :height="dimensions?.height"
    loading="lazy"
    decoding="async"
  />
  <NuxtPicture
    v-else
    :src="refinedSrc"
    :alt="alt"
    :width="dimensions?.width"
    :height="dimensions?.height"
    :sizes="SIZES"
    loading="lazy"
    decoding="async"
  />
</template>

<script setup>
import imageDimensions from "#build/image-dimensions.mjs";

// ProseImg menggantikan komponen bawaan MDC untuk tag <img> di Markdown.
//
// DEV   : <img> biasa -> file asli disajikan langsung dari `public/`
//         (tanpa IPX, tanpa encode AVIF/WebP) supaya `nuxt dev` tidak lambat.
// BUILD : NuxtPicture -> saat `nuxt generate`, IPX meng-encode gambar menjadi
//         AVIF (+ fallback JPEG/PNG) dan menulisnya sebagai file statis
//         di `dist/_ipx/`. File asli di `public/` tetap ikut ter-copy.
//
// Catatan: penjelasan ini ditaruh di script, bukan di <template>, karena
// komentar di dalam template Vue ikut tercetak ke HTML hasil render.

// Dua ukuran saja (mobile 100vw + lebar kolom artikel 864px). Kalau `sizes`
// dibiarkan kosong, NuxtPicture memakai daftar `screens` bawaan @nuxt/image
// (7 breakpoint x 2 format = belasan file per gambar) sehingga build jadi
// sangat lama karena ada ratusan gambar artikel.
const SIZES = "xs:100vw md:864px";

const isDev = import.meta.dev;

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

// Selaraskan path absolut dengan app.baseURL (mis. saat deploy di sub-path).
const refinedSrc = computed(() => {
  const base = useRuntimeConfig().app.baseURL;
  if (base && base !== "/" && props.src.startsWith("/") && !props.src.startsWith("//")) {
    return `${base.replace(/\/$/, "")}${props.src}`;
  }
  return props.src;
});
</script>
