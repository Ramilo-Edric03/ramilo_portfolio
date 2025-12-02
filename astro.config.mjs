// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
        server: {
            host: "0.0.0.0",
            port: 4321,
            open: true,
            allowedHosts: ["20781bc5adf4.ngrok-free.app"],
        },
    },
});
