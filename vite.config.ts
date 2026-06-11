import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: { outDir: 'dist', sourcemap: false },
  optimizeDeps: { include: ['qr-code-styling'] },
  server: {
    port: process.env['PORT'] ? parseInt(process.env['PORT']) : 5173,
    strictPort: false,
  },
})
