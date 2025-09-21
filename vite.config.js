import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Using relative base so it works on GitHub Pages without extra config
export default defineConfig({
  plugins: [react()],
  base: './',
})
