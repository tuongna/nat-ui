# nat-date-picker



<!-- Auto Generated Below -->


## Overview

Date picker with an inline calendar popup.
Supports single date selection, min/max constraints, and disabled dates.

## Properties

| Property        | Attribute        | Description                                                        | Type                   | Default          |
| --------------- | ---------------- | ------------------------------------------------------------------ | ---------------------- | ---------------- |
| `disabled`      | `disabled`       | If true, the input is disabled                                     | `boolean`              | `false`          |
| `displayFormat` | `display-format` | Display format for the input field (uses simple token replacement) | `string`               | `'MMM D, YYYY'`  |
| `glass`         | `glass`          | Glass style popup                                                  | `boolean`              | `false`          |
| `label`         | `label`          | Input label                                                        | `string`               | `undefined`      |
| `max`           | `max`            | Maximum selectable date (YYYY-MM-DD)                               | `string`               | `undefined`      |
| `min`           | `min`            | Minimum selectable date (YYYY-MM-DD)                               | `string`               | `undefined`      |
| `placeholder`   | `placeholder`    | Input placeholder                                                  | `string`               | `'Select date…'` |
| `size`          | `size`           | Size variant                                                       | `"lg" \| "md" \| "sm"` | `'md'`           |
| `value`         | `value`          | Selected date as ISO string (YYYY-MM-DD)                           | `string`               | `''`             |


## Events

| Event       | Description                            | Type                                          |
| ----------- | -------------------------------------- | --------------------------------------------- |
| `natChange` | Emitted when the selected date changes | `CustomEvent<{ value: string; date: Date; }>` |


----------------------------------------------


