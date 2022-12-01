import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import jsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/survey/",
  plugins: [vue(), jsx()],
  resolve: {
    alias: {
      "@": resolve("./src"),
      "@comp": resolve("./src/components"),
      "@survey": resolve("./src/components/Survey"),
    },
  },
});
