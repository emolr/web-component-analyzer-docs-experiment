import { defineConfig } from 'vitepress'
import { hmrPlugin, presets } from "vite-plugin-web-components-hmr";

export default defineConfig({
  vue: {
    template: {
        compilerOptions: {
            isCustomElement: tag => tag.includes("-")
        }
      }
  },
  vite: {
    plugins: [
      hmrPlugin({
        include: ["_includes/dist/**/*.js"],
        presets: [presets.lit],
      }),
    ]
    // Type is `DefaultTheme.Config`
  }
})