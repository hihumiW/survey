import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import jsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";

import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [vue(), jsx(), cssInjectedByJsPlugin()],
  resolve: {
    alias: {
      "@": resolve("./src"),
      "@comp": resolve("./src/components"),
      "@survey": resolve("./src/components/Survey"),
    },
  },
  server: {
    proxy: {
      "^/ctms/.*": {
        target: "http://192.168.1.185:8907",
        changeOrigin: true,
      },
      "^/rbqm/api/.*": {
        target: "http://192.168.0.185:9999",
        changeOrigin: true,
      },
    },
  },
});
