# nat-textarea



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                       | Type                                             | Default      |
| ------------- | -------------- | ----------------------------------------------------------------- | ------------------------------------------------ | ------------ |
| `ariaLabel`   | `aria-label`   | Aria label for accessibility                                      | `string`                                         | `undefined`  |
| `autoResize`  | `auto-resize`  | If true, textarea auto-resizes to fit content                     | `boolean`                                        | `false`      |
| `clearable`   | `clearable`    | If true, shows a clear button when textarea has value             | `boolean`                                        | `false`      |
| `disabled`    | `disabled`     | If true, the textarea is disabled                                 | `boolean`                                        | `false`      |
| `error`       | `error`        | Error message displayed below the textarea (replaces helper text) | `string`                                         | `''`         |
| `fullWidth`   | `full-width`   | If true, the textarea takes full width of its container           | `boolean`                                        | `false`      |
| `helperText`  | `helper-text`  | Helper text displayed below the textarea                          | `string`                                         | `''`         |
| `label`       | `label`        | Label text displayed above the textarea                           | `string`                                         | `''`         |
| `maxLength`   | `max-length`   | Maximum number of characters allowed                              | `number`                                         | `undefined`  |
| `minLength`   | `min-length`   | Minimum number of characters required                             | `number`                                         | `undefined`  |
| `name`        | `name`         | Name attribute for form submission                                | `string`                                         | `''`         |
| `placeholder` | `placeholder`  | Placeholder text when textarea is empty                           | `string`                                         | `''`         |
| `readonly`    | `readonly`     | If true, the textarea is readonly                                 | `boolean`                                        | `false`      |
| `required`    | `required`     | If true, the textarea is required                                 | `boolean`                                        | `false`      |
| `resize`      | `resize`       | Resize behavior: 'none', 'vertical', 'horizontal', 'both'         | `"both" \| "horizontal" \| "none" \| "vertical"` | `'vertical'` |
| `rows`        | `rows`         | Number of visible text lines (height)                             | `number`                                         | `3`          |
| `showCounter` | `show-counter` | If true, shows character counter when maxLength is set            | `boolean`                                        | `false`      |
| `textareaId`  | `textarea-id`  | ID attribute for the textarea element                             | `string`                                         | `''`         |
| `value`       | `value`        | The value of the textarea                                         | `string`                                         | `''`         |


## Events

| Event       | Description                                       | Type                  |
| ----------- | ------------------------------------------------- | --------------------- |
| `natBlur`   | Emitted when textarea loses focus                 | `CustomEvent<void>`   |
| `natChange` | Emitted when the textarea value changes (on blur) | `CustomEvent<string>` |
| `natClear`  | Emitted when clear button is clicked              | `CustomEvent<void>`   |
| `natFocus`  | Emitted when textarea receives focus              | `CustomEvent<void>`   |
| `natInput`  | Emitted on every input event (real-time)          | `CustomEvent<string>` |


## Methods

### `removeFocus() => Promise<void>`

Removes focus from the textarea element

#### Returns

Type: `Promise<void>`



### `select() => Promise<void>`

Selects all text in the textarea

#### Returns

Type: `Promise<void>`



### `setFocus() => Promise<void>`

Sets focus on the textarea element

#### Returns

Type: `Promise<void>`




## Slots

| Slot | Description      |
| ---- | ---------------- |
|      | Textarea content |


----------------------------------------------


