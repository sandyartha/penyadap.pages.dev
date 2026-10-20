<template>
  <footer
    class="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-sm text-center pb-8"
  >
    <br>
    <p>© {{ year }} penyadap.pages.dev. All rights reserved.</p>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>
