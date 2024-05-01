# my-element

This is MyElement

## Examples:

### docsHint 
 ```html
<my-element docs-hint="Hello"></my-element>
```

### count 
 ```html
<my-element count="5"></my-element>
```

### size 
 ```html
<my-element size="small"></my-element>
<my-element size="medium"></my-element>
<my-element size="large"></my-element>
```
```javascript
document.querySelector('my-element').size = 'small'
```

## Slots:

| Name | Description |
| --- | --- |
|  | This is a default/unnamed slot |
| container | You can put some elements here |

## Attributes:

| Name | Type | Default | Description | Field Name |
| --- | --- | --- | --- | --- |
| docs-hint | string | 'Click on the Vite and Lit logos to learn more' | Copy for the read the docs hint. | docsHint |
| count | number | 0 | The number of times the button has been clicked. | count |
| my-size | 'small' \| 'medium' \| 'large' | 'medium' | Sets the size of the element. | size |

## Properties:

| Name | Type | Default | Description | Attribute |
| --- | --- | --- | --- | --- |
| docsHint | string | 'Click on the Vite and Lit logos to learn more' | Copy for the read the docs hint. | docs-hint |
| count | number | 0 | The number of times the button has been clicked. | count |
| size | 'small' \| 'medium' \| 'large' | 'medium' | Sets the size of the element. | my-size |
| prop1 | boolean |  | some description |  |
| prop2 | number |  | some description |  |

## Events:

| Name | Type | Description |
| --- | --- | --- |
| custom-event |  | some description for custom-event |
| typed-event | Event | some description for typed-event |
| typed-custom-event | CustomEvent | some description for typed-custom-event |

## CSS Properties:

| Name | Description | Default |
| --- | --- | --- |
| --text-color | Controls the color of foo |  |
| --background-color | Controls the color of bar | red |

## CSS Parts:

| Name | Description |
| --- | --- |
| bar | Styles the color of bar |

## Superclass: 
  - Name: LitElement
  - Package: lit

