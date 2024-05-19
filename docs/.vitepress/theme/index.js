// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import '../../../dist/my-element.js'
import '../../../dist/code-example.js'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
  }
}