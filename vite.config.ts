// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Otomatis update jika ada versi baru
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'], // Aset statis Anda
      manifest: {
        name: 'Gycora Essence',
        short_name: 'Gycora',
        description: 'Toko Kosmetik dan Skincare Premium Gycora Essence',
        theme_color: '#006A4E',
        background_color: '#ffffff',
        display: 'standalone', // Membuatnya terlihat seperti native app
        icons: [
          {
            src: 'pwa-192x192.png', // Pastikan Anda menaruh file PNG berukuran ini di folder public/
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png', // Pastikan Anda menaruh file PNG berukuran ini di folder public/
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg}'],
        runtimeCaching: [
          {
            // Cache API Produk agar katalog tetap bisa dibuka saat offline
            urlPattern: /^https:\/\/back\.gycoraessence\.com\/api\/products/,
            handler: 'NetworkFirst', // Coba ambil dari internet dulu, kalau gagal ambil dari cache
            options: {
              cacheName: 'api-products-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 3, // Cache 3 hari
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            // Cache Gambar dari URL External (Misal dari S3 atau CDN)
            urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 7, // Cache 7 hari
              }
            }
          }
        ]
      }
    })
  ],
})