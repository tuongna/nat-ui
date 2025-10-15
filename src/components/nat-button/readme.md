# nat-button



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                                                      | Type                                                                        | Default     |
| ----------- | ------------ | ---------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------- |
| `ariaLabel` | `aria-label` | Aria label for the button (accessibility)                        | `string`                                                                    | `undefined` |
| `disabled`  | `disabled`   | If true, the button is disabled and cannot be interacted with    | `boolean`                                                                   | `false`     |
| `fullWidth` | `full-width` | If true, the button will take up the full width of its container | `boolean`                                                                   | `false`     |
| `loading`   | `loading`    | If true, displays a loading spinner and disables interaction     | `boolean`                                                                   | `false`     |
| `size`      | `size`       | The size of the button                                           | `"lg" \| "md" \| "sm"`                                                      | `'md'`      |
| `type`      | `type`       | The HTML button type attribute                                   | `"button" \| "reset" \| "submit"`                                           | `'button'`  |
| `variant`   | `variant`    | The visual style variant of the button                           | `"danger" \| "ghost" \| "primary" \| "secondary" \| "success" \| "warning"` | `'primary'` |


## Events

| Event      | Description                                                             | Type                      |
| ---------- | ----------------------------------------------------------------------- | ------------------------- |
| `natClick` | Emitted when the button is clicked (not fired when disabled or loading) | `CustomEvent<MouseEvent>` |


## Slots

| Slot | Description                        |
| ---- | ---------------------------------- |
|      | Button content (text, icons, etc.) |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
