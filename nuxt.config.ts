const SITE_URL =
  process.env.NUXT_PUBLIC_SITE_URL || "https://penyadap.pages.dev";

const isDev = process.env.NODE_ENV === "development";

export default defineNuxtConfig({
  // DevTools di-nonaktifkan: setup-nya memakan ~65s di mesin ini dan bikin
  // `nuxt dev` lambat.
  devtools: { enabled: false },

  css: ["~/assets/css/tailwind.css"],

  modules: [
    "@nuxt/ui",
    "nuxt-icon",
    "@nuxtjs/google-fonts",
    "@nuxt/content",
    "@vueuse/nuxt",
    ["@nuxt/image", {
      // Provider IPX hanya dipakai saat build (lihat ProseImg.vue): tiap gambar
      // Markdown dikonversi 1:1 menjadi SATU file WebP dengan dimensi asli.
      //
      // `format` dan `densities` sengaja TIDAK diatur di sini karena opsi ini
      // digabung `defu` dengan default modul secara concatenation, bukan
      // ditimpa: `format: ['avif']` + default ['webp'] bikin 3 format per
      // gambar, dan `densities: [1]` + default [1, 2] tetap menghasilkan
      // varian retina 2x. Pengaturan format karena itu dilakukan di komponen
      // lewat modifier `$img()`.
      quality: 80
    }],

    // SEO Suite
    "@nuxtjs/seo",

    ...(process.env.NODE_ENV === "development" ? ["@nuxthq/studio"] : [])
  ],

  runtimeConfig: {
    public: {
      siteUrl: SITE_URL
    }
  },

  nitro: {
    // `cloudflare-pages` (SSR) memakai provider image "none" sehingga konversi
    // ke AVIF tidak pernah terjadi. `cloudflare-pages-static` mewarisi preset
    // `static` -> provider jadi `ipxStatic` -> tiap gambar dikonversi sekali
    // saat build dan ditulis sebagai file statis ke `dist/`.
    preset: process.env.NODE_ENV === "production" ? "cloudflare-pages-static" : undefined,
    compatibilityDate: "2026-10-20",

    prerender: {
      crawlLinks: true,
      // Route server yang tidak ada link-nya dari halaman mana pun
      // (/robots.txt otomatis ditambahkan oleh @nuxtjs/robots).
      routes: ["/sitemap.xml", "/feed.xml"]
    },

    esbuild: {
      options: { treeShaking: true }
    },

    minify: true
  },

  router: {
    options: {
      strict: false
    }
  },

  // Tailwind module options
  tailwindcss: {
    configPath: "tailwind.config.ts",
    quiet: true
  },

  // ======================
  //  SEO CONFIG
  // ======================

  site: {
    url: SITE_URL,
    name: "penyadap.pages.dev",
    description: "Jasa Pemasangan Parental Control — mSpy (Indonesia)",
    defaultLocale: "id",
    indexable: true
  },

  // Sitemap
  sitemap: {
    sources: ["/api/__sitemap__/articles"]
  },

  // Robots.txt
  robots: {
    sitemap: [`${SITE_URL}/sitemap.xml`],
    groups: [
      {
        userAgent: ['*'],
        allow: ['/']
      }
    ]
  },

  // Schema.org auto integration
  schemaOrg: {
    defaults: false
  },

  // nuxt-og-image (bagian dari @nuxtjs/seo) setup-nya ~10s dan tidak dipakai
  // (ogImage diisi manual via useSeoMeta), jadi dimatikan saat dev.
  ogImage: {
    enabled: !isDev
  },

  // ======================
  //  App HTML Head
  // ======================

  app: {
    head: {
      htmlAttrs: { lang: "id", class: "h-full" },
      bodyAttrs: {
        class: "antialiased bg-gray-50 dark:bg-black min-h-screen"
      },
      link: [
        { rel: "icon", type: "image/png", href: "/favicon-96x96.png" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" }
      ]
    }
  },

  googleFonts: {
    display: "swap",
    families: { Inter: [400, 500, 600, 700, 800, 900] }
  },

  // Mapping komponen MDC: tag <img> pada Markdown otomatis di-render oleh
  // components/content/ProseImg.vue (folder components/content didaftarkan oleh
  // @nuxt/content dengan pathPrefix: false dan prioritas tertinggi).
  content: {
    highlight: { theme: "github-dark" }
  },

  vue: {
    compilerOptions: { whitespace: "condense" }
  },

  vite: {
    build: {
      cssCodeSplit: false,
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["vue", "vue-router"]
          }
        }
      }
    }
  },

  experimental: {
    payloadExtraction: false
  }
});
