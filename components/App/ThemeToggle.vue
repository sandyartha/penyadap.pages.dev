<script setup>
const colorMode = useColorMode();

// Tema TIDAK ditentukan lewat JS (computed `isDark`) karena nilai server dan
// nilai klien berbeda: di server `@nuxtjs/color-mode` mengisi
// `colorMode.value = preference` ("system"), sedangkan di klien nilainya sudah
// teresolusi lewat `prefers-color-scheme` ("dark" untuk pengunjung dark mode).
// Kalau nama ikon ditentukan JS, SVG hasil prerender (moon) tidak sama dengan
// vnode klien (sun) dan Vue mencatat "Hydration completed but contains
// mismatches". Karena itu kedua ikon selalu dirender dan CSS (varian `dark:`
// pada elemen pembungkus tiap ikon) yang memilih mana yang tampil — SSR dan
// klien jadi identik.
const toggle = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>

<template>
  <UTooltip text="Toggle theme" :ui="{ popper: { strategy: 'absolute' } }">
    <button
      class="relative px-3 py-4 flex items-center justify-center transition hover:text-primary-500 dark:hover:text-primary-400"
      @click="toggle"
    >
      <!-- Class penyembunyi diletakkan di <span> pembungkus, BUKAN di <Icon>:
           komponen bawaan nuxt-icon menyisipkan `.icon[data-v-...]` dengan
           `display:inline-block` (spesifisitas 0,2,0) yang mengalahkan
           `.hidden` (0,1,0) dan urutannya juga lebih akhir daripada
           `.dark\:hidden` -> akibatnya kedua ikon ikut tampil. Span tidak
           terkena aturan tersebut, jadi penyembunyian berjalan normal. -->
      <span class="block dark:hidden">
        <Icon aria-hidden="true" name="solar:moon-outline" class="w-5 h-5" />
      </span>
      <span class="hidden dark:block">
        <Icon aria-hidden="true" name="solar:sun-2-outline" class="w-5 h-5" />
      </span>
      <span class="sr-only">Toggle theme</span>
    </button>
  </UTooltip>
</template>
