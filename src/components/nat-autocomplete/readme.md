# nat-autocomplete



<!-- Auto Generated Below -->


## Overview

Autocomplete / combobox — a text input with a filtered dropdown list.
Supports single and multiple selection, keyboard navigation, and clearable mode.

## Properties

| Property      | Attribute     | Description                                  | Type                   | Default     |
| ------------- | ------------- | -------------------------------------------- | ---------------------- | ----------- |
| `clearable`   | `clearable`   | Show a clear button when a value is selected | `boolean`              | `true`      |
| `disabled`    | `disabled`    | If true, the component is disabled           | `boolean`              | `false`     |
| `label`       | `label`       | Input label                                  | `string`               | `undefined` |
| `maxOptions`  | `max-options` | Maximum number of results to show            | `number`               | `8`         |
| `multiple`    | `multiple`    | Allow selecting multiple values              | `boolean`              | `false`     |
| `options`     | --            | List of available options                    | `AutocompleteOption[]` | `[]`        |
| `placeholder` | `placeholder` | Input placeholder                            | `string`               | `'Search…'` |
| `size`        | `size`        | Size variant                                 | `"lg" \| "md" \| "sm"` | `'md'`      |
| `value`       | `value`       | Currently selected value (single mode)       | `string`               | `''`        |
| `values`      | --            | Currently selected values (multiple mode)    | `string[]`             | `[]`        |


## Events

| Event            | Description                             | Type                                                                |
| ---------------- | --------------------------------------- | ------------------------------------------------------------------- |
| `natChange`      | Emitted when the selection changes      | `CustomEvent<{ value: string; option: AutocompleteOption; }>`       |
| `natMultiChange` | Emitted when multiple selection changes | `CustomEvent<{ values: string[]; options: AutocompleteOption[]; }>` |
| `natSearch`      | Emitted when the input text changes     | `CustomEvent<string>`                                               |


## Methods

### `clear() => Promise<void>`

Clear the current selection

#### Returns

Type: `Promise<void>`




----------------------------------------------


