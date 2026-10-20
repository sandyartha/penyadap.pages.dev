<template>
  <img
    v-if="isDev"
    :src="refinedSrc"
    :alt="alt"
    :width="width"
    :height="height"
    loading="lazy"
    decoding="async"
  />
  <NuxtPicture
    v-else
    :src="refinedSrc"
    :alt="alt"
    :width="width"
    :height="height"
    :sizes="sizes"
    loading="lazy"
    decoding="async"
  />
</template>

<script setup>
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
// Format gambar tidak dipaksa di sini: mengikuti konfigurasi modul @nuxt/image
// (build produksi = AVIF; dev = format asli).
const isDev = import.meta.dev;

// Dua ukuran saja (mobile 320w + lebar kolom artikel 864w). Kalau `sizes`
// dibiarkan kosong, NuxtPicture memakai daftar `screens` bawaan @nuxt/image
// (7 breakpoint x 2 format = belasan file per gambar) sehingga build jadi
// sangat lama karena ada ratusan gambar artikel.
const DEFAULT_SIZES = "xs:100vw md:864px";

const props = defineProps({
  src: {
    type: String,
    default: ""
  },
  alt: {
    type: String,
    default: ""
  },
  width: {
    type: [String, Number],
    default: undefined
  },
  height: {
    type: [String, Number],
    default: undefined
  },
  sizes: {
    type: [String, Object],
    default: DEFAULT_SIZES
  }
});

// Selaraskan path absolut dengan app.baseURL (mis. saat deploy di sub-path).
const refinedSrc = computed(() => {
  const base = useRuntimeConfig().app.baseURL;
  if (base && base !== "/" && props.src.startsWith("/") && !props.src.startsWith("//")) {
    return `${base.replace(/\/$/, "")}${props.src}`;
  }
  return props.src;
});
</script>
