import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // For User/Organization pages (username.github.io), the base is usually '/'
  // For Project pages (username.github.io/repo/), the base is './'
  base: './', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  // We specify that static assets are in the root so posts.json and content/ are copied
  publicDir: './', 
  server: {
    port: 3000,
    open: true
  }
});