import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://portfolio-richitharekula-2711.vercel.app',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
