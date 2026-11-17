import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base: './' makes the built site work from any folder or subpath
// (Netlify, Vercel, GitHub Pages, or plain web hosting).
export default defineConfig({
  base: './',
  plugins: [react()],
})
