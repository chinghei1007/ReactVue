// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Pages from 'vite-plugin-pages'


export default defineConfig({
  plugins: [react(), Pages({
    onRoutesGenerated(routes) {
      console.log('Generated routes:', JSON.stringify(routes, null, 2))
    },
  }),],
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