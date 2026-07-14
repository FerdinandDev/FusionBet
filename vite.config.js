import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  // GitHub Pages: set this to "/<repo-name>/" when deploying to a project page.
  base: "/",
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
