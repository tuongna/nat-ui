# nat-select



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                                                                   | Type                   | Default              |
| ------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------- | -------------------- |
| `disabled`    | `disabled`    | If true, the select is disabled                                                                                               | `boolean`              | `false`              |
| `error`       | `error`       | Error message displayed below the select                                                                                      | `string`               | `''`                 |
| `fullWidth`   | `full-width`  | If true, the select takes full width of its container                                                                         | `boolean`              | `false`              |
| `helperText`  | `helper-text` | Helper text displayed below the select                                                                                        | `string`               | `''`                 |
| `label`       | `label`       | Label text displayed above the select                                                                                         | `string`               | `''`                 |
| `name`        | `name`        | Name attribute for form submission                                                                                            | `string`               | `''`                 |
| `options`     | --            | Array of option objects with value, label, and optional disabled flag Must be set via JavaScript property, not HTML attribute | `SelectOption[]`       | `[]`                 |
| `placeholder` | `placeholder` | Placeholder text when no value is selected                                                                                    | `string`               | `'Select an option'` |
| `required`    | `required`    | If true, the select is required                                                                                               | `boolean`              | `false`              |
| `size`        | `size`        | Size variant of the select                                                                                                    | `"lg" \| "md" \| "sm"` | `'md'`               |
| `value`       | `value`       | The currently selected value                                                                                                  | `string`               | `''`                 |


## Events

| Event       | Description                             | Type                  |
| ----------- | --------------------------------------- | --------------------- |
| `natChange` | Emitted when the selected value changes | `CustomEvent<string>` |
| `natClose`  | Emitted when the dropdown closes        | `CustomEvent<void>`   |
| `natOpen`   | Emitted when the dropdown opens         | `CustomEvent<void>`   |


## Methods

### `close() => Promise<void>`

Closes the dropdown

#### Returns

Type: `Promise<void>`



### `open() => Promise<void>`

Opens the dropdown

#### Returns

Type: `Promise<void>`




----------------------------------------------


