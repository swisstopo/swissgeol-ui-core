import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: './node_modules/@swisstopo/swissgeol-ui-core/dist/swissgeol-ui-core/assets/*',
          dest: 'assets',
        },
        {
          src: './node_modules/@swisstopo/swissgeol-ui-core/dist/swissgeol-ui-core/assets/*',
          dest: 'assets',
        },
      ],
      watch: { reloadPageOnChange: true },
      hook: 'buildStart',
    }),
  ].filter(Boolean),
  esbuild: {
    keepNames: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    minify: 'terser',
    sourcemap: true,
    cssCodeSplit: true,
    terserOptions: {
      keep_classnames: true,
      keep_fnames: true,
    },
    rollupOptions: {
      input: 'index.html',
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
});
