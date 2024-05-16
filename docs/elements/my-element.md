# MyElement

This is MyElement

## Usage

```bash
npm install '@org/elements'
```

Import the element via:

```javascript
import "@org/elements/my-element.js";
```

When looking for the types you can import the types via:

```javascript
import type { MyElement } from '@org/elements';
```

## Example

### docsHint

Copy for the read the docs hint.

<code-example>

<div>
<my-element docs-hint="Hello"></my-element>
</div>

```html
<my-element docs-hint="Hello"></my-element>
```

</code-example>

### count

The number of times the button has been clicked.

<code-example>

<div>
<my-element count="5"></my-element>
</div>

```html
<my-element count="5"></my-element>
```

</code-example>

### size

Sets the size of the element.

<code-example>

<div>
<my-element size="small"></my-element>
<my-element size="medium"></my-element>
<my-element size="large"></my-element>
<my-element id="element-change"></my-element>
</div>

<template data-type="script">
document.querySelector('#element-change').size = 'small';
console.log(document.querySelector('#element-change'));
</template>

```html
<my-element size="small"></my-element>
<my-element size="medium"></my-element>
<my-element size="large"></my-element>
<my-element id="element-change"></my-element>
```

```javascript
document.querySelector("#element-change").size = "small";
console.log(document.querySelector("#element-change"));
```

</code-example>

## Properties / Attributes

| name     | attribute  | type                           | default                                         | description                                       |
| -------- | ---------- | ------------------------------ | ----------------------------------------------- | ------------------------------------------------- |
| docsHint | docs\-hint | string                         | 'Click on the Vite and Lit logos to learn more' | Copy for the read the docs hint\.                 |
| count    | count      | number                         | 0                                               | The number of times the button has been clicked\. |
| size     | my\-size   | 'small' \| 'medium' \| 'large' | 'medium'                                        | Sets the size of the element\.                    |
| disabled | disabled   | boolean                        |                                                 | disables the element                              |
| foo      | foo        | string                         |                                                 | description for foo                               |

## CSS Slots

| name      | description                    |
| --------- | ------------------------------ |
|           | This is a default/unnamed slot |
| container | You can put some elements here |

## CSS Custom Properties

| name                  | description               | default |
| --------------------- | ------------------------- | ------- |
| \-\-text\-color       | Controls the color of foo |         |
| \-\-background\-color | Controls the color of bar | red     |

## CSS Parts

| name | description             |
| ---- | ----------------------- |
| bar  | Styles the color of bar |
