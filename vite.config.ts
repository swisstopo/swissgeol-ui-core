import { defineConfig } from 'vite';
import liveReload from 'vite-plugin-live-reload';

export default defineConfig({
  root: 'src',
  publicDir: '../www', // serve contents of www/ at root
  server: {
    fs: {
      allow: ['..'], // allow access to www/ one level up
    },
  },
  plugins: [liveReload(['../www/index.html'])],
});
