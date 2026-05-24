// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { verifyOptions } from 'astro/assets';

export default defineConfig({
  site: 'https://edric-ramilo.dev',
  output: 'static',

  integrations: [react(), sitemap()],
  
  vite: {
    // @ts-expect-error
    plugins: [tailwindcss()],
    server: {
      host: "0.0.0.0",
      port: 4321,
      open: true,
    },
  },
});
