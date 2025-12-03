// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://Ramilo-Edric03.github.io',
  output: 'static',

  integrations: [react()],
  
  vite: {
    plugins: [tailwindcss()],
    server: {
      host: "0.0.0.0",
      port: 4321,
      open: true,
      allowedHosts: ["c7066b399c9d.ngrok-free.app"],
    },
  },
});
