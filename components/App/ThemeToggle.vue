<script setup>
const colorMode = useColorMode();

// Tema TIDAK ditentukan lewat JS (computed `isDark`) karena nilai server dan
// nilai klien berbeda: di server `@nuxtjs/color-mode` mengisi
// `colorMode.value = preference` ("system"), sedangkan di klien nilainya sudah
// teresolusi lewat `prefers-color-scheme` ("dark" untuk pengunjung dark mode).
// Kalau nama ikon ditentukan JS, SVG hasil prerender (moon) tidak sama dengan
// vnode klien (sun) dan Vue mencatat "Hydration completed but contains
// mismatches". Karena itu kedua ikon selalu dirender dan CSS (varian `dark:`)
// yang memilih mana yang tampil — SSR dan klien jadi identik.
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
      <Icon
        aria-hidden="true"
        name="solar:moon-outline"
        class="w-5 h-5 block dark:hidden"
      />
      <Icon
        aria-hidden="true"
        name="solar:sun-2-outline"
        class="w-5 h-5 hidden dark:block"
      />
      <span class="sr-only">Toggle theme</span>
    </button>
  </UTooltip>
</template>
