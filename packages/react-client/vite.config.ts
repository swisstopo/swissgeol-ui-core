import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig(() => ({
  root: __dirname,
  server: {
    hmr: {
      host: 'localhost',
    },
    watch: {
      usePolling: true,
    },
    host: '0.0.0.0',
    port: 8000,
    open: false,
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/@swissgeol/ui-core/dist/swissgeol-ui-core/assets/*',
          dest: 'assets',
        },
      ],
    }),
  ],
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
}));
