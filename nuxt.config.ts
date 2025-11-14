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
    "@nuxtjs/seo",
    // Hanya load @nuxthq/studio di development
    ...(process.env.NODE_ENV === 'development' ? ["@nuxthq/studio"] : []),
    "@vueuse/nuxt"
  ],
  site: {
    url: 'https://penyadap.pages.dev',
    name: 'penyadap.pages.dev',
    description: 'Jasa Pemasangan Parental Control — mSpy (Indonesia)',
    defaultLocale: 'id'
  },
  sitemap: {
    enabled: true,
    siteUrl: 'https://penyadap.pages.dev',
    cacheTtl: 60 * 60 * 24,
    autoLastmod: true,
    defaults: {
      changefreq: 'weekly',
      priority: 0.7
    },
    sources: ['/api/__sitemap__/articles']
  },
  robots: {
    enabled: true,
    sitemap: ['https://penyadap.pages.dev/sitemap.xml'],
    rules: [
      {
        userAgent: '*',
        allow: '/'
      }
    ]
  },
  sitemap: {
    enabled: true,
    cacheTtl: 60 * 60,
    inferStaticPagesAsRoutes: true,
    autoLastmod: true,
    defaults: {
      changefreq: 'weekly',
      priority: 0.7
    }
  },
  robots: {
    enabled: true,
    sitemap: ['https://penyadap.pages.dev/sitemap.xml'],
    rules: [
      {
        userAgent: '*',
        allow: '/'
      }
    ]
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
        // Meta tag global - akan di-override oleh defineSeoMeta di setiap halaman
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
