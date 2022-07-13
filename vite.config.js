// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'path';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  optimizeDeps: { exclude: ['path', 'fs'] },
  resolve: {
    alias: {
      $src: resolve('./src'),
      $static: resolve('./static'),
    },
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
};

export default config;
