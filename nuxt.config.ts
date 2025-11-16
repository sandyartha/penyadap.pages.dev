const SITE_URL = process.env.NUXT_PUBLIC_SITE_URL || 'https://penyadap.pages.dev';
const PORT = Number(process.env.PORT ?? 5000);
const REPL_HOST = process.env.REPL_SLUG && process.env.REPL_OWNER 
  ? `${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co` 
  : 'localhost';

export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV === 'development' },
  css: ['~/assets/css/tailwind.css'],
  runtimeConfig: {
    public: {
      siteUrl: SITE_URL
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: PORT,
    url: `http://0.0.0.0:${PORT}`
  },
  nitro: {
    compatibilityDate: '2025-11-08',
    preset: process.env.NODE_ENV === 'production' ? 'cloudflare-pages' : undefined,
    externals: {
      inline: process.env.NODE_ENV === 'production' ? ['sharp'] : []
    },
    minify: true,
    prerender: {
      crawlLinks: true
    },
    esbuild: {
      options: {
        treeShaking: true
      }
    },
    experimental: {
      wasm: true
    }
  },
  modules: [
    "@nuxt/ui",
    "nuxt-icon",
    "@nuxtjs/google-fonts",
    "@nuxtjs/fontaine",
    "@nuxt/content",
    "@nuxtjs/seo",
    ...(process.env.NODE_ENV === 'development' ? ["@nuxthq/studio"] : []),
    "@vueuse/nuxt"
  ],
  site: {
    url: SITE_URL,
    name: 'penyadap.pages.dev',
    description: 'Jasa Pemasangan Parental Control — mSpy (Indonesia)',
    defaultLocale: 'id',
    indexable: true
  },
  sitemap: {
    cacheTtl: 0,
    autoLastmod: true,
    defaults: {
      changefreq: 'weekly',
      priority: 0.7
    },
    sources: ['/api/__sitemap__/articles']
  } as any,
  robots: {
    sitemap: [`${SITE_URL}/sitemap.xml`],
    policies: [
      {
        userAgent: '*',
        allow: '/'
      }
    ]
  } as any,
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
      meta: [],
      link: [
        { rel: "icon", type: "image/png", href: "/favicon-96x96.png", sizes: "96x96" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "shortcut icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }
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
  vue: {
    compilerOptions: {
      whitespace: 'condense' // Condense whitespace to avoid hydration mismatch
    }
  },
  vite: {
    build: {
      cssCodeSplit: false, // Extract all CSS into single file for faster loading
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['vue', 'vue-router'],
          }
        }
      }
    },
    css: {
      devSourcemap: false // Disable sourcemap in dev for faster CSS loading
    }
  },
  experimental: {
    payloadExtraction: false
  }
});
