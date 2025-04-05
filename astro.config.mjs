// import node from '@astrojs/node';
import netlify from '@astrojs/netlify';
// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  server: {
    host: true,
  },
  // adapter: node({ mode: 'standalone' }),
  adapter: netlify(),
});