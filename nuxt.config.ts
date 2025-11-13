export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV === 'development' },
  css: ['~/assets/css/tailwind.css'],
  nitro: {
    compatibilityDate: '2025-11-08',
    // Optimize untuk Cloudflare Pages
    preset: 'cloudflare-pages',
    // Exclude dependencies yang tidak perlu di bundle
    externals: {
      // Exclude native dependencies yang besar
      inline: ['sharp', '@parcel/watcher']
    },
    // Minify output
    minify: true,
    // Prerender routes untuk mengurangi bundle
    prerender: {
      crawlLinks: true
    },
    // Reduce bundle size dengan tree-shaking
    esbuild: {
      options: {
        treeShaking: true
      }
    }
  },
  modules: [
    "@nuxt/ui",
    "nuxt-icon",
    "@nuxtjs/google-fonts",
    "@nuxtjs/fontaine",
    "@nuxt/content",
    "nuxt-og-image",
    // Hanya load @nuxthq/studio di development
    ...(process.env.NODE_ENV === 'development' ? ["@nuxthq/studio"] : []),
    "@vueuse/nuxt"
  ],
  ogImage: {
    fonts: ['Inter:400', 'Inter:500', 'Inter:600', 'Inter:700', 'Inter:800', 'Inter:900'],
  },
  ui: {
    icons: ["heroicons", "lucide"]
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      htmlAttrs: {
        lang: "id",
        class: "h-full",
      },
      bodyAttrs: {
        class: "antialiased bg-gray-50 dark:bg-black min-h-screen",
      },
      meta: [
        // Meta tag global - tidak akan override nilai dari halaman spesifik
        { property: 'og:site_name', content: 'penyadap.pages.dev' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        // description, og:title, og:description, dan og:image akan di-set oleh useSeoMeta di setiap halaman
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/favicon-96x96.png", sizes: "96x96" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "shortcut icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" }
      ]
    },
  },
  googleFonts: {
    display: "swap",
    families: {
      Inter: [400, 500, 600, 700, 800, 900],
    },
  },
  content: {
    highlight: {
      theme: "github-dark"
    },
    markdown: {
      anchorLinks: false,
      remarkPlugins: ['remark-gfm'],
      rehypePlugins: []
    }
  },
  vite: {
    server: {
      hmr: {
        clientPort: 24678,
        port: 24678
      },
      watch: {
        usePolling: true
      }
    },
    build: {
      // Optimize chunk size
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          // Manual chunk splitting untuk mengurangi ukuran
          manualChunks: {
            'vendor': ['vue', 'vue-router'],
          }
        }
      }
    }
  },
  // Experimental features untuk mengurangi bundle size
  experimental: {
    payloadExtraction: false
  }
});
