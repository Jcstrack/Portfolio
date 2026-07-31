import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

const legacyTargets = [
  'Chrome >= 64',
  'Edge >= 79',
  'Firefox >= 67',
  'Safari >= 12',
  'iOS >= 12',
  'not IE 11',
]

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: legacyTargets,
      renderLegacyChunks: true,
    }),
  ],
  build: {
    cssTarget: 'chrome61',
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    restoreMocks: true,
    clearMocks: true,
  },
})
