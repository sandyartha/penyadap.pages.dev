const SITE_URL =
  process.env.NUXT_PUBLIC_SITE_URL || "https://penyadap.pages.dev";

export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV === "development" },

  css: ["~/assets/css/tailwind.css"],

  modules: [
    "@nuxt/ui",
    "nuxt-icon",
    "@nuxtjs/google-fonts",
    "@nuxt/content",
    "@vueuse/nuxt",

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
    preset: process.env.NODE_ENV === "production" ? "cloudflare-pages" : undefined,
    compatibilityDate: "2025-11-08",

    prerender: {
      crawlLinks: true
    },

    esbuild: {
      options: { treeShaking: true }
    },

    minify: true
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
    cacheTtl: 0,
    autoLastmod: true,
    defaults: { changefreq: "weekly", priority: 0.7 },
    sources: ["/api/__sitemap__/articles"]
  },

  // Robots.txt
  robots: {
    sitemap: [`${SITE_URL}/sitemap.xml`],
    policies: [{ userAgent: "*", allow: "/" }]
  },

  // Schema.org auto integration
  schemaOrg: {
    defaults: false
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

  content: {
    highlight: { theme: "github-dark" },
    markdown: { anchorLinks: false }
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
