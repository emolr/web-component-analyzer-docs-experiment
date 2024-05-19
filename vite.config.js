// vite.config.js
//
// Used for cypress and storybook.

import { defineConfig } from "vite";
import { hmrPlugin, presets } from "vite-plugin-web-components-hmr";

/** @type {import('vite').UserConfig} */
export default defineConfig({
  lib: {
    entry: "./src/index.ts",
    name: "lib",
    fileName: (format) => `lib.${format}.js`,
  
  },
  plugins: [
    hmrPlugin({
      include: ["./src/**/*.ts"],
      presets: [presets.lit],
    }),
  ],
});
