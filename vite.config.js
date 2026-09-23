import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative assets so it works seamlessly on GitHub Pages or local preview
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 5174,
    host: true, // Allows mobile devices on the same Wi-Fi to connect
  },
});
