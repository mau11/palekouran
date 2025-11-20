// https://vite.dev/config/
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@customHooks": path.resolve(__dirname, "src/customHooks"),
      "@globalStyles": path.resolve(__dirname, "src/Global.styled"),
      "@lib": path.resolve(__dirname, "src/lib"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
  server: {
    port: 5173,
    // https://vite.dev/config/server-options#server-proxy
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // remove /api prefix
      },
    },
  },
});
