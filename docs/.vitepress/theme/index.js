// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import { VueLive } from "vue-live";
import "vue-live/style.css";

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // register your custom global components
    app.component('VueLive', VueLive)
  }
}