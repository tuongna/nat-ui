# nat-rating



<!-- Auto Generated Below -->


## Overview

Star rating component with hover preview, half-star support, and keyboard accessibility.

## Properties

| Property    | Attribute    | Description                            | Type                           | Default |
| ----------- | ------------ | -------------------------------------- | ------------------------------ | ------- |
| `allowHalf` | `allow-half` | Allow half-star ratings                | `boolean`                      | `false` |
| `color`     | `color`      | Color for filled stars                 | `string`                       | `''`    |
| `count`     | `count`      | Total number of stars                  | `number`                       | `5`     |
| `disabled`  | `disabled`   | If true, the component is disabled     | `boolean`                      | `false` |
| `readonly`  | `readonly`   | If true, user cannot change the rating | `boolean`                      | `false` |
| `size`      | `size`       | Size of each star                      | `"lg" \| "md" \| "sm" \| "xl"` | `'md'`  |
| `value`     | `value`      | Current rating value (0 to count)      | `number`                       | `0`     |


## Events

| Event       | Description                                                       | Type                  |
| ----------- | ----------------------------------------------------------------- | --------------------- |
| `natChange` | Emitted when user selects a rating                                | `CustomEvent<number>` |
| `natHover`  | Emitted when hover state changes (preview value, or 0 when leave) | `CustomEvent<number>` |


----------------------------------------------


