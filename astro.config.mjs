import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://richitharekula.vercel.app',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
