# nat-pin-input



<!-- Auto Generated Below -->


## Overview

OTP / PIN code input — a series of connected single-digit fields
with auto-advance, paste support, and backspace navigation.

## Properties

| Property      | Attribute     | Description                                   | Type                   | Default |
| ------------- | ------------- | --------------------------------------------- | ---------------------- | ------- |
| `disabled`    | `disabled`    | If true, all inputs are disabled              | `boolean`              | `false` |
| `invalid`     | `invalid`     | Shows invalid state styling                   | `boolean`              | `false` |
| `length`      | `length`      | Number of PIN digits                          | `number`               | `6`     |
| `masked`      | `masked`      | If true, hides the characters (password mode) | `boolean`              | `false` |
| `numeric`     | `numeric`     | Only allow numeric input                      | `boolean`              | `true`  |
| `placeholder` | `placeholder` | Placeholder character shown in empty slots    | `string`               | `'·'`   |
| `size`        | `size`        | Size variant                                  | `"lg" \| "md" \| "sm"` | `'md'`  |


## Events

| Event         | Description                          | Type                  |
| ------------- | ------------------------------------ | --------------------- |
| `natChange`   | Emitted on any value change          | `CustomEvent<string>` |
| `natComplete` | Emitted when the full PIN is entered | `CustomEvent<string>` |


## Methods

### `clear() => Promise<void>`

Clear all digits

#### Returns

Type: `Promise<void>`



### `getValue() => Promise<string>`

Get the current value as a string

#### Returns

Type: `Promise<string>`




----------------------------------------------


