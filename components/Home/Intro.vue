<template>
  <!-- Hero homepage: kartu berisi logo saja. -->
  <section class="max-w-4xl mx-auto px-4">
    <div
      class="relative overflow-hidden rounded-3xl border border-violet-200/70 bg-gradient-to-br from-violet-50 via-white to-violet-50 px-6 py-14 dark:border-violet-500/20 dark:from-violet-950/40 dark:via-zinc-900 dark:to-zinc-950"
    >
      <div
        class="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/25 blur-3xl dark:bg-violet-500/20"
        aria-hidden="true"
      />
      <img
        src="/penyadap-logo.svg"
        alt="Logo Penyadap"
        width="1152"
        height="896"
        loading="lazy"
        decoding="async"
        class="relative mx-auto h-20 w-auto sm:h-28"
      />
    </div>
  </section>
</template>

<script setup>
// Logo statis: pakai path langsung dari `public/` agar tidak diproses
// runtime image optimizer.
</script>
