# nat-switch



<!-- Auto Generated Below -->


## Overview

Toggle switch for binary states

## Properties

| Property        | Attribute        | Description                    | Type                                              | Default     |
| --------------- | ---------------- | ------------------------------ | ------------------------------------------------- | ----------- |
| `checked`       | `checked`        | Whether the switch is checked  | `boolean`                                         | `false`     |
| `color`         | `color`          | Color variant when checked     | `"danger" \| "primary" \| "success" \| "warning"` | `'primary'` |
| `disabled`      | `disabled`       | Whether the switch is disabled | `boolean`                                         | `false`     |
| `labelPosition` | `label-position` | Position of the label          | `"left" \| "right"`                               | `'right'`   |
| `loading`       | `loading`        | Show loading state             | `boolean`                                         | `false`     |
| `name`          | `name`           | The name of the switch         | `string`                                          | `undefined` |
| `size`          | `size`           | Size variant                   | `"lg" \| "md" \| "sm"`                            | `'md'`      |


## Events

| Event       | Description                            | Type                                 |
| ----------- | -------------------------------------- | ------------------------------------ |
| `natBlur`   | Emitted when the switch loses focus    | `CustomEvent<void>`                  |
| `natChange` | Emitted when the switch value changes  | `CustomEvent<{ checked: boolean; }>` |
| `natFocus`  | Emitted when the switch receives focus | `CustomEvent<void>`                  |


## Slots

| Slot | Description          |
| ---- | -------------------- |
|      | Switch label content |


----------------------------------------------


