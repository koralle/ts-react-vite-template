/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    watch: false,
    coverage: {
      provider: 'v8',
    },
  },
})
