# nat-number-input



<!-- Auto Generated Below -->


## Overview

Number input with increment/decrement stepper buttons.

## Properties

| Property      | Attribute     | Description                                            | Type                   | Default     |
| ------------- | ------------- | ------------------------------------------------------ | ---------------------- | ----------- |
| `adornEnd`    | `adorn-end`   | Trailing symbol shown after the input (e.g. 'kg', '%') | `string`               | `undefined` |
| `adornStart`  | `adorn-start` | Leading symbol shown before the input (e.g. '$', '€')  | `string`               | `undefined` |
| `disabled`    | `disabled`    | If true, the input is disabled                         | `boolean`              | `false`     |
| `label`       | `label`       | Input label                                            | `string`               | `undefined` |
| `max`         | `max`         | Maximum allowed value                                  | `number`               | `Infinity`  |
| `min`         | `min`         | Minimum allowed value                                  | `number`               | `-Infinity` |
| `placeholder` | `placeholder` | Placeholder text                                       | `string`               | `'0'`       |
| `precision`   | `precision`   | Number of decimal places to display                    | `number`               | `undefined` |
| `readonly`    | `readonly`    | If true, the input is read-only                        | `boolean`              | `false`     |
| `size`        | `size`        | Size variant                                           | `"lg" \| "md" \| "sm"` | `'md'`      |
| `step`        | `step`        | Step size for increment/decrement                      | `number`               | `1`         |
| `value`       | `value`       | The current numeric value                              | `number`               | `0`         |


## Events

| Event       | Description                   | Type                  |
| ----------- | ----------------------------- | --------------------- |
| `natChange` | Emitted when value changes    | `CustomEvent<number>` |
| `natInput`  | Emitted on input while typing | `CustomEvent<number>` |


----------------------------------------------


