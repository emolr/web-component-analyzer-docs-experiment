// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import '../../../src/my-element'

customElements.define('code-example', class extends HTMLElement {
  connectedCallback() {
    const scripts = this.querySelectorAll('template[data-type="script"]');
    scripts.forEach(script => {
      const scriptElement = document.createElement('script');
      scriptElement.textContent = script.innerHTML;
      this.appendChild(scriptElement);
    });
  }
})

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
  }
}