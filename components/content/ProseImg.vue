<template>
  <img
    :src="src"
    :alt="alt"
    :width="dimensions?.width"
    :height="dimensions?.height"
    loading="lazy"
    decoding="async"
  />
</template>

<script setup>
import imageDimensions from "#build/image-dimensions.mjs";

// ProseImg menggantikan komponen bawaan MDC untuk tag <img> di Markdown.
//
// DEV   : file asli disajikan langsung dari `public/` (tanpa IPX, tanpa encode)
//         supaya `nuxt dev` tetap cepat.
// BUILD : `$img()` menghasilkan SATU URL IPX, lalu Nitro menulis hasil
//         encode-nya sebagai file statis di `dist/_ipx/` saat `nuxt generate`.
//         File asli di `public/` tetap ikut ter-copy.
//
// Catatan: penjelasan ini ditaruh di script, bukan di <template>, karena
// komentar di dalam template Vue ikut tercetak ke HTML hasil render.

// Konversi 1:1: JPG/PNG asli hanya diubah formatnya menjadi WebP dengan dimensi
// yang sama (tanpa modifier `width`/`height`, jadi sharp tidak melakukan resize).
//
// Kenapa `$img()` dan bukan <NuxtPicture>/<NuxtImg>? Kedua komponen itu
// membangun srcset dari `sizes` + `densities`, dan jumlah file yang di-encode =
// jumlah breakpoint x jumlah density x jumlah format. Dengan nilai bawaan
// modul, satu gambar pecah jadi 12 file (7 breakpoint x 2 density x
// avif/webp/png) sehingga build ratusan gambar jadi berjam-jam. `$img()` dengan
// modifier `format` saja menghasilkan TEPAT satu file, tanpa elemen <picture>
// dan tanpa srcset yang tidak terpakai.
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

const src = computed(() => {
  if (!props.src) {
    return "";
  }
  if (isDev) {
    // Selaraskan path absolut dengan app.baseURL (mis. saat dev di sub-path).
    if (baseURL && baseURL !== "/" && props.src.startsWith("/") && !props.src.startsWith("//")) {
      return `${baseURL.replace(/\/$/, "")}${props.src}`;
    }
    return props.src;
  }
  // Build: konversi 1:1 ke WebP — ukuran asli dipertahankan, hanya formatnya
  // yang diubah, jadi satu gambar = satu file.
  return $img(props.src, { format: "webp", quality: 80 });
});
</script>
