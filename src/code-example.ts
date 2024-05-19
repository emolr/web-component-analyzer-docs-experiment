import { LitElement } from "lit";

export class CodeExample extends LitElement {
    connectedCallback() {
      const scripts = this.querySelectorAll('template[data-type="script"]');
      
      scripts.forEach(script => {
        const scriptElement = document.createElement('script');
        scriptElement.textContent = script.textContent;
        
        this.appendChild(scriptElement);
      });
    }
  }

customElements.define('code-example', CodeExample)