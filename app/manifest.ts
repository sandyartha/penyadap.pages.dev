export default defineAppManifest({
  name: 'penyadap.pages.dev',
  short_name: 'Penyadap',
  description:
    'Jasa pemasangan aplikasi parental control mSpy untuk memantau keamanan digital keluarga di Indonesia.',
  lang: 'id',
  start_url: '/',
  display: 'standalone',
  background_color: '#000000',
  theme_color: '#000000',
  icons: [
    {
      src: '/web-app-manifest-192x192.png',
      sizes: '192x192',
      type: 'image/png'
    },
    {
      src: '/web-app-manifest-512x512.png',
      sizes: '512x512',
      type: 'image/png'
    },
    {
      src: '/favicon-96x96.png',
      sizes: '96x96',
      type: 'image/png'
    }
  ]
})

