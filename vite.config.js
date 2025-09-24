import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        matter: resolve(__dirname, "src/matter.html"),
        categories: resolve(__dirname, "src/categories.html"),
        motivation: resolve(__dirname, "src/motivation.html"),
        admsonly: resolve(__dirname, "src/admsonly.html"),
        set: resolve(__dirname, "src/set.html"),
        teste: resolve(__dirname, "src/teste.html"),
      },
    },
  },
});
