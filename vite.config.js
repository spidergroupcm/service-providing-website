import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'firebase': ['firebase/app', 'firebase/auth'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase chunk size limit to 1000 kB
  },
})
