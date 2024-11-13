import * as path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig({
  base: "./",
  plugins: [react(), svgr()],
  assetsInclude: ["**/*.jpg"],
  server: {
    port: 4002,
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
    "process.env": {},
  },
});
