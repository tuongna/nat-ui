# nat-color-picker



<!-- Auto Generated Below -->


## Overview

Full-featured color picker with hue/saturation/value spectrum,
alpha slider, hex input, and preset swatches.

## Properties

| Property       | Attribute       | Description                         | Type       | Default                                                                                                                     |
| -------------- | --------------- | ----------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------- |
| `glass`        | `glass`         | Glass style picker panel            | `boolean`  | `false`                                                                                                                     |
| `showAlpha`    | `show-alpha`    | Show alpha (opacity) slider         | `boolean`  | `false`                                                                                                                     |
| `showSwatches` | `show-swatches` | Show preset color swatches          | `boolean`  | `true`                                                                                                                      |
| `swatches`     | --              | Custom swatch colors (hex strings)  | `string[]` | `['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#6b7280', '#000000', '#ffffff']` |
| `value`        | `value`         | Current color value as a hex string | `string`   | `'#5b6fe8'`                                                                                                                 |


## Events

| Event       | Description                   | Type                                                    |
| ----------- | ----------------------------- | ------------------------------------------------------- |
| `natChange` | Emitted on every color change | `CustomEvent<{ hex: string; rgba: string; rgb: RGB; }>` |


----------------------------------------------


