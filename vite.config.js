import { defineConfig } from "vite";
import tsconfigPaths from 'vite-tsconfig-paths';


// https://vite.dev/config/
export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  server: {
    port: 8888,
    open: true,
  },
  plugins: [tsconfigPaths()],
});
