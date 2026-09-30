import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      name: 'html-entry-restore',
      enforce: 'pre',
      transformIndexHtml: {
        order: 'pre',
        handler(html) {
          return html
            .replace(
              /<script type="module" crossorigin src=".*?assets\/index\.js(\?[^"]*)?"><\/script>/,
              '<script type="module" src="/src/main.jsx"></script>'
            )
            .replace(
              /<link rel="stylesheet" crossorigin href=".*?assets\/index\.css(\?[^"]*)?">/g,
              ''
            );
        },
      },
    },
    react(),
  ],
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
  server: {
    port: 5174,
    host: true,
  },
});
