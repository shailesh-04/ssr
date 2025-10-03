import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: path.resolve(__dirname, "src/app"), // index.html lives here
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      }
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/app"), // <-- points to client src
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist/app"), // full output path
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/app/index.html"),
      }
    },
  }
});
