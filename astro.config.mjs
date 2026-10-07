// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://edric-ramilo.dev',
  output: 'static',

  integrations: [sitemap(), react()],
  
  vite: {
    plugins: [tailwindcss()],
    server: {
      host: "0.0.0.0",
      port: 4321,
      open: true,
    },
  },
});
