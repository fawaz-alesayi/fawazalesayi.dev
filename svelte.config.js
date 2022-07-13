import staticAdapter from '@sveltejs/adapter-static';
import { resolve } from 'path';
import md from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    sveltePreprocess({
      aliases: {
        $src: resolve('./src'),
        $static: resolve('./static'),
        $base: resolve('.'),
      },
    }),
    md.mdsvex(mdsvexConfig),
  ],
  extensions: ['.svelte', ...mdsvexConfig.extensions],

  kit: {
    adapter: staticAdapter(),
    prerender: {
      default: true,
    },
  },
};

export default config;
