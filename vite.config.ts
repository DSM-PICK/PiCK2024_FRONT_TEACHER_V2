import * as path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import envCompatiblePlugin from 'vite-plugin-env-compatible'


export default defineConfig({
  base: "./",
  plugins: [react(), envCompatiblePlugin()],
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
});
