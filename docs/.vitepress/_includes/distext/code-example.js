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
var CodeExample = /** @class */ (function (_super) {
    __extends(CodeExample, _super);
    function CodeExample() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CodeExample.prototype.connectedCallback = function () {
        var _this = this;
        var scripts = this.querySelectorAll('template[data-type="script"]');
        scripts.forEach(function (script) {
            var scriptElement = document.createElement('script');
            scriptElement.textContent = script.textContent;
            _this.appendChild(scriptElement);
        });
    };
    return CodeExample;
}(HTMLElement));
export { CodeExample };
customElements.define('code-example', CodeExample);
