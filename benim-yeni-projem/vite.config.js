import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,           // Artık 'expect' ve 'test' otomatik tanınacak
    environment: 'jsdom',    // Tarayıcı ortamını simüle eder
    setupFiles: './src/setupTests.js', // Test öncesi ayarlar için (isteğe bağlı)
  },
})