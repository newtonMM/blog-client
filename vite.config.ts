import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // forward `/uploads/` endpoint to -> `http://localhost:5000/uploads/`
      "^/images": {
        target: "http://localhost:3000/",
      },
    },
  },
});
