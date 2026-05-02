import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'static',
  integrations: [mdx()],
  site: 'https://squizzer73.dev',
  adapter: cloudflare(),
});