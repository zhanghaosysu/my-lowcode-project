import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import qiankun from "vite-plugin-qiankun";

// https://vitejs.dev/config/
export default defineConfig({
  base: "http://localhost:3002/",
  server: {
    port: 3002,
    cors: true,
    origin: "http://localhost:3002",
    proxy: {
      '/financial-api/': {
        target: 'http://testcms.gf.com.cn/',
        changeOrigin: true,
      },
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    VueSetupExtend(),
    qiankun("gfw_lowcode", {
      useDevMode: true,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
