# nat-radio



<!-- Auto Generated Below -->


## Overview

Radio button for single selection from multiple options

## Properties

| Property             | Attribute        | Description                   | Type                   | Default     |
| -------------------- | ---------------- | ----------------------------- | ---------------------- | ----------- |
| `checked`            | `checked`        | Whether the radio is checked  | `boolean`              | `false`     |
| `disabled`           | `disabled`       | Whether the radio is disabled | `boolean`              | `false`     |
| `labelPosition`      | `label-position` | Position of the label         | `"left" \| "right"`    | `'right'`   |
| `name` _(required)_  | `name`           | The name of the radio group   | `string`               | `undefined` |
| `size`               | `size`           | Size variant                  | `"lg" \| "md" \| "sm"` | `'md'`      |
| `value` _(required)_ | `value`          | The value of the radio button | `string`               | `undefined` |


## Events

| Event       | Description                           | Type                                                |
| ----------- | ------------------------------------- | --------------------------------------------------- |
| `natBlur`   | Emitted when the radio loses focus    | `CustomEvent<void>`                                 |
| `natChange` | Emitted when the radio value changes  | `CustomEvent<{ value: string; checked: boolean; }>` |
| `natFocus`  | Emitted when the radio receives focus | `CustomEvent<void>`                                 |


## Slots

| Slot | Description         |
| ---- | ------------------- |
|      | Radio label content |


----------------------------------------------


