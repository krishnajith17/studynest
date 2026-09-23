import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'html-transform-dev',
      transformIndexHtml(html, ctx) {
        if (ctx.server) {
          return html
            .replace(
              /<script type="module" crossorigin src=".*?assets\/index\.js"><\/script>/,
              '<script type="module" src="/src/main.jsx"></script>'
            )
            .replace(
              /<link rel="stylesheet" crossorigin href=".*?assets\/index\.css">/,
              ''
            );
        }
        return html;
      },
    },
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
    host: true, // Allows mobile devices on the same Wi-Fi to connect
  },
});
