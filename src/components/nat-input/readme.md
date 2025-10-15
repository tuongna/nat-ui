# nat-input



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute      | Description                                                    | Type                                                                        | Default     |
| -------------- | -------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------- |
| `ariaLabel`    | `aria-label`   | Aria label for accessibility                                   | `string`                                                                    | `undefined` |
| `autocomplete` | `autocomplete` | Autocomplete attribute value                                   | `string`                                                                    | `'off'`     |
| `clearable`    | `clearable`    | If true, shows a clear button when input has value             | `boolean`                                                                   | `false`     |
| `disabled`     | `disabled`     | If true, the input is disabled                                 | `boolean`                                                                   | `false`     |
| `error`        | `error`        | Error message displayed below the input (replaces helper text) | `string`                                                                    | `''`        |
| `fullWidth`    | `full-width`   | If true, the input takes full width of its container           | `boolean`                                                                   | `false`     |
| `helperText`   | `helper-text`  | Helper text displayed below the input                          | `string`                                                                    | `''`        |
| `inputId`      | `input-id`     | ID attribute for the input element                             | `string`                                                                    | `''`        |
| `label`        | `label`        | Label text displayed above the input                           | `string`                                                                    | `''`        |
| `maxLength`    | `max-length`   | Maximum length of input value                                  | `number`                                                                    | `undefined` |
| `minLength`    | `min-length`   | Minimum length of input value                                  | `number`                                                                    | `undefined` |
| `name`         | `name`         | Name attribute for the input                                   | `string`                                                                    | `''`        |
| `pattern`      | `pattern`      | Pattern for input validation (regex)                           | `string`                                                                    | `undefined` |
| `placeholder`  | `placeholder`  | Placeholder text when input is empty                           | `string`                                                                    | `''`        |
| `readonly`     | `readonly`     | If true, the input is readonly                                 | `boolean`                                                                   | `false`     |
| `required`     | `required`     | If true, the input is required                                 | `boolean`                                                                   | `false`     |
| `size`         | `size`         | The size of the input                                          | `"lg" \| "md" \| "sm"`                                                      | `'md'`      |
| `step`         | `step`         | Step value for number inputs                                   | `string`                                                                    | `undefined` |
| `type`         | `type`         | The HTML input type                                            | `"email" \| "number" \| "password" \| "search" \| "tel" \| "text" \| "url"` | `'text'`    |
| `value`        | `value`        | The value of the input                                         | `string`                                                                    | `''`        |
| `variant`      | `variant`      | The visual style variant                                       | `"default" \| "filled" \| "flushed"`                                        | `'default'` |


## Events

| Event       | Description                                                 | Type                  |
| ----------- | ----------------------------------------------------------- | --------------------- |
| `natBlur`   | Emitted when input loses focus                              | `CustomEvent<void>`   |
| `natChange` | Emitted when the input value changes (on blur or Enter key) | `CustomEvent<string>` |
| `natClear`  | Emitted when clear button is clicked                        | `CustomEvent<void>`   |
| `natFocus`  | Emitted when input receives focus                           | `CustomEvent<void>`   |
| `natInput`  | Emitted on every input event (real-time)                    | `CustomEvent<string>` |


## Methods

### `removeFocus() => Promise<void>`

Removes focus from the input element

#### Returns

Type: `Promise<void>`



### `select() => Promise<void>`

Selects all text in the input

#### Returns

Type: `Promise<void>`



### `setFocus() => Promise<void>`

Sets focus on the input element

#### Returns

Type: `Promise<void>`




## Slots

| Slot            | Description                                |
| --------------- | ------------------------------------------ |
| `"prefix-icon"` | Icon or content displayed before the input |
| `"suffix-icon"` | Icon or content displayed after the input  |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
