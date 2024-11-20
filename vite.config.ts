import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import dotenv from "dotenv";

// .env 파일에서 환경 변수 로드 (로컬 개발 시 사용)
dotenv.config();

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      svgr({
        svgrOptions: {},
      }),
    ],
    server: {
      proxy: {
        "/auth": {
          target: process.env.VITE_API_BASE_URL || "https://vibrato1.shop",
          changeOrigin: true,
        },
        "/search": {
          target: process.env.VITE_API_BASE_URL || "https://vibrato1.shop",
          changeOrigin: true,
        },
        "/follows": {
          target: process.env.VITE_API_BASE_URL || "https://vibrato1.shop",
          changeOrigin: true,
        },
        "/reviews": {
          target: process.env.VITE_API_BASE_URL || "https://vibrato1.shop",
          changeOrigin: true,
        },
        "/review": {
          target: process.env.VITE_API_BASE_URL || "https://vibrato1.shop",
          changeOrigin: true,
        },
        "/newmusic": {
          target: process.env.VITE_API_BASE_URL || "https://vibrato1.shop",
          changeOrigin: true,
        },
      },
    },
    base: "",
    define: {
      VITE_API_BASE_URL: JSON.stringify(
        process.env.VITE_API_BASE_URL || "https://vibrato1.shop"
      ),
    },
  };
});
