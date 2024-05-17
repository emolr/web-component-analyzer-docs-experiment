// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import '../../dist/my-element.js'

customElements.define('code-example', class extends HTMLElement {
  connectedCallback() {
    const scripts = this.querySelectorAll('template[data-type="script"]');
    
    scripts.forEach(script => {
      const scriptElement = document.createElement('script');
      scriptElement.textContent = script.textContent;
      
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