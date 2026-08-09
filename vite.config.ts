// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Pages from 'vite-plugin-pages'
import tailwindcss from '@tailwindcss/vite'

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [tailwindcss(), react(), Pages({
    onRoutesGenerated(routes) {
      console.log('Generated routes:', JSON.stringify(routes, null, 2))
    },
  }), cloudflare()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
