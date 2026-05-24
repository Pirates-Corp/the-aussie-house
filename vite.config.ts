import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [remix({
    ignoredRouteFiles: ["**/*.scss", "**/*.css"],
  })],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        loadPaths: [path.resolve(__dirname, 'app')],
        additionalData: (content, filename) => {
          if (filename && filename.includes('global.scss')) {
            return content;
          }
          return `@use "styles/global" as *;\n${content}`;
        }
      }
    }
  }
});
