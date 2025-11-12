export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  nitro: {
    compatibilityDate: '2025-11-08'
  },
  modules: [
    "@nuxt/ui",
    "nuxt-icon",
    "@nuxtjs/google-fonts",
    "@nuxtjs/fontaine",
    "@nuxt/image",
    "@nuxt/content",
    "@nuxthq/studio",
    "@vueuse/nuxt"
  ],
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
        { name: 'description', content: 'Jasa Sadap iPhone / Android Secara Jarak Jauh - Panggilan WhatsApp, Line, Instagram dan Facebook, Buktikan pasangan selingkuh.' },
        { property: 'og:site_name', content: 'penyadap.pages.dev' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { property: 'og:title', content: 'Aplikasi Sadap iPhone & Android - WhatsApp, FB, Line, CALL' },
        { property: 'og:description', content: 'Jasa Sadap iPhone / Android Secara Jarak Jauh - Panggilan WhatsApp, Line, Instagram dan Facebook, Buktikan pasangan selingkuh.' },
        { property: 'og:image', content: '/favicon-96x96.png' }
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
      remarkPlugins: [],
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
    }
  },
  image: {
    provider: 'ipx',
    quality: 80
  }
});
