import staticAdapter from '@sveltejs/adapter-static';
import { resolve } from "path";
import md from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import sveltePreprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [sveltePreprocess({
    aliases: {
      '$src': resolve('./src'),
      '$static': resolve('./static'),
    },
    replace: [['API_ENDPOINT', "amazing"]],
  }), md.mdsvex(mdsvexConfig)],
  extensions: ['.svelte', ...mdsvexConfig.extensions],

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    vite: {
      resolve: {
        alias: {
          $src: resolve('./src'),
          $static: resolve('./static'),
        },
      },
    },

    adapter: staticAdapter(),
  },
};

export default config;
