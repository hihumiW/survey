import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import jsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";
import qiankun from "vite-plugin-qiankun";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
const { name } = require("./package");
// https://vitejs.dev/config/
export default defineConfig({
  base: "http://192.168.0.185:8916/crftest/",
  plugins: [vue(), jsx(), qiankun(name), cssInjectedByJsPlugin()],
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
        target: "http://192.168.0.185:8907",
        changeOrigin: true,
      },
    },
  },
});
