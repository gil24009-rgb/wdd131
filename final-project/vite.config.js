import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/wdd131/",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html")
      }
    }
  }
});