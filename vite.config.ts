import * as path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import envCompatiblePlugin from 'vite-plugin-env-compatible'
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "./",
  plugins: [
    react(),
    envCompatiblePlugin(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      manifest: {
        name: "PiCK",
        short_name: "PiCK",
        description: "PiCK is Good",
        theme_color: "#ffffff",
        start_url: ".",
        scope: ".",
        display: "standalone",
        icons: [
          {
            src: "logo192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "logo512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  assetsInclude: ["**/*.jpg"],
  server: {
    host: "0.0.0.0",
    port: 3000,
    allowedHosts: [
      "pick-teacher-stag.dsmhs.kr",
      "pick-teacher.dsmhs.kr",
    ],
  },
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components"),
      },
      { find: "@styles", replacement: path.resolve(__dirname, "src/styles") },
      { find: "@stores", replacement: path.resolve(__dirname, "src/stores") },
    ],
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
    },
  },
  define: {
    "process.env": process.env,
  },
  preview: {
    host: "0.0.0.0",
  },
});
