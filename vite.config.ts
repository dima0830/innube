import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  // publicada en la raíz del dominio propio https://innube.online/ (public/CNAME)
  base: "/",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      // dos páginas: el inicio de Innube y la de invitaciones digitales
      input: {
        inicio: fileURLToPath(new URL("./index.html", import.meta.url)),
        invitaciones: fileURLToPath(new URL("./invitaciones/index.html", import.meta.url)),
      },
    },
  },
});
