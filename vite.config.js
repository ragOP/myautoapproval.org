import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/leadscout/submit": {
        target: "https://app.leadscout.ca",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace("/api/leadscout/submit", "/api/v1/public/submit"),
      },
    },
  },
});
