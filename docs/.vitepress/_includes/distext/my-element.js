var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
/**
 * @summary This is MyElement
 *
 * @usage
 * ```bash
 * npm install '@org/elements'
 * ```
 *
 * Import the element via:
 *
 * ```javascript
 * import '@org/elements/my-element.js';
 * ```
 *
 * When looking for the types you can import the types via:
 *
 * ```javascript
 * import type { MyElement } from '@org/elements';
 * ```
 *
 * @example
 * ```html
 * <my-element></my-element>
 * ```
 *
 * @attr {boolean} disabled - disables the element
 * @attribute {string} foo - description for foo
 *
 * @csspart bar - Styles the color of bar
 *
 * @slot - This is a default/unnamed slot
 * @slot container - You can put some elements here
 *
 * @cssprop --text-color - Controls the color of foo
 * @cssproperty [--background-color=red] - Controls the color of bar
 *
 * @fires custom-event - some description for custom-event
 * @fires {Event} typed-event - some description for typed-event
 * @event {MyElementEvent} typed-custom-event - some description for typed-custom-event
 *
 * @summary This is MyElement
 *
 * @tag my-element
 * @tagname my-element
 */
var MyElement = /** @class */ (function (_super) {
    __extends(MyElement, _super);
    function MyElement() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Copy for the read the docs hint.
         *
         * @example
         * ```html
         * <my-element docs-hint="Hello"></my-element>
         * ```
         */
        _this.docsHint = 'Click on the Vite and Lit logos to learn more';
        /**
         * The number of times the button has been clicked.
         *
         * @example
         * ```html
         * <my-element count="5"></my-element>
         * ```
         */
        _this.count = 0;
        /**
         * Sets the size of the element.
         *
         * @example
         * ```html
         * <my-element size="small"></my-element>
         * <my-element size="medium"></my-element>
         * <my-element size="large"></my-element>
         * <my-element id="element-change"></my-element>
         * ```
         * ```javascript
         * document.querySelector('#element-change').size = 'small';
         * console.log(document.querySelector('#element-change'));
         * ```
         */
        _this.size = 'medium';
        return _this;
    }
    MyElement.prototype.render = function () {
        return html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      ", "\n      <p class=\"read-the-docs\">", "</p>\n    "], ["\n      ", "\n      <p class=\"read-the-docs\">", "</p>\n    "])), this.size, this.docsHint);
    };
    MyElement.styles = css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    :host {\n      max-width: 1280px;\n      margin: 0 auto;\n      padding: 2rem;\n      text-align: center;\n      display: block;\n    }\n\n    .logo {\n      height: 6em;\n      padding: 1.5em;\n      will-change: filter;\n      transition: filter 300ms;\n    }\n    .logo:hover {\n      filter: drop-shadow(0 0 2em #646cffaa);\n    }\n    .logo.lit:hover {\n      filter: drop-shadow(0 0 2em #325cffaa);\n    }\n\n    .card {\n      padding: 2em;\n    }\n\n    .read-the-docs {\n      color: #888;\n    }\n\n    ::slotted(h1) {\n      font-size: 3.2em;\n      line-height: 1.1;\n    }\n\n    a {\n      font-weight: 500;\n      color: #646cff;\n      text-decoration: inherit;\n    }\n    a:hover {\n      color: #535bf2;\n    }\n\n    button {\n      border-radius: 8px;\n      border: 1px solid transparent;\n      padding: 0.6em 1.2em;\n      font-size: 1em;\n      font-weight: 500;\n      font-family: inherit;\n      background-color: #1a1a1a;\n      cursor: pointer;\n      transition: border-color 0.25s;\n    }\n    button:hover {\n      border-color: #646cff;\n    }\n    button:focus,\n    button:focus-visible {\n      outline: 4px auto -webkit-focus-ring-color;\n    }\n\n    @media (prefers-color-scheme: light) {\n      a:hover {\n        color: #747bff;\n      }\n      button {\n        background-color: #f9f9f9;\n      }\n    }\n  "], ["\n    :host {\n      max-width: 1280px;\n      margin: 0 auto;\n      padding: 2rem;\n      text-align: center;\n      display: block;\n    }\n\n    .logo {\n      height: 6em;\n      padding: 1.5em;\n      will-change: filter;\n      transition: filter 300ms;\n    }\n    .logo:hover {\n      filter: drop-shadow(0 0 2em #646cffaa);\n    }\n    .logo.lit:hover {\n      filter: drop-shadow(0 0 2em #325cffaa);\n    }\n\n    .card {\n      padding: 2em;\n    }\n\n    .read-the-docs {\n      color: #888;\n    }\n\n    ::slotted(h1) {\n      font-size: 3.2em;\n      line-height: 1.1;\n    }\n\n    a {\n      font-weight: 500;\n      color: #646cff;\n      text-decoration: inherit;\n    }\n    a:hover {\n      color: #535bf2;\n    }\n\n    button {\n      border-radius: 8px;\n      border: 1px solid transparent;\n      padding: 0.6em 1.2em;\n      font-size: 1em;\n      font-weight: 500;\n      font-family: inherit;\n      background-color: #1a1a1a;\n      cursor: pointer;\n      transition: border-color 0.25s;\n    }\n    button:hover {\n      border-color: #646cff;\n    }\n    button:focus,\n    button:focus-visible {\n      outline: 4px auto -webkit-focus-ring-color;\n    }\n\n    @media (prefers-color-scheme: light) {\n      a:hover {\n        color: #747bff;\n      }\n      button {\n        background-color: #f9f9f9;\n      }\n    }\n  "])));
    __decorate([
        property({ attribute: 'docs-hint' })
    ], MyElement.prototype, "docsHint", void 0);
    __decorate([
        property({ type: Number })
    ], MyElement.prototype, "count", void 0);
    __decorate([
        property({ attribute: 'my-size', reflect: true })
    ], MyElement.prototype, "size", void 0);
    MyElement = __decorate([
        customElement('my-element')
    ], MyElement);
    return MyElement;
}(LitElement));
export { MyElement };
var templateObject_1, templateObject_2;
