# nat-sheet



<!-- Auto Generated Below -->


## Overview

Slide-in sheet panel — bottom sheet for mobile, side sheet for desktop.
Glass variant available for Apple liquid glass aesthetic.

## Properties

| Property      | Attribute      | Description                                     | Type                            | Default     |
| ------------- | -------------- | ----------------------------------------------- | ------------------------------- | ----------- |
| `dismissible` | `dismissible`  | If true, clicking the backdrop closes the sheet | `boolean`                       | `true`      |
| `glass`       | `glass`        | Apply liquid glass styling                      | `boolean`                       | `false`     |
| `heading`     | `heading`      | Sheet title (shown in header if no header slot) | `string`                        | `undefined` |
| `open`        | `open`         | Whether the sheet is open                       | `boolean`                       | `false`     |
| `position`    | `position`     | Slide direction                                 | `"bottom" \| "left" \| "right"` | `'bottom'`  |
| `sheetHeight` | `sheet-height` | Height for bottom sheet (CSS value)             | `string`                        | `'auto'`    |
| `sheetWidth`  | `sheet-width`  | Width for side sheets (CSS value)               | `string`                        | `'400px'`   |
| `showHandle`  | `show-handle`  | Shows a drag handle for bottom sheets           | `boolean`                       | `true`      |


## Events

| Event      | Description                   | Type                |
| ---------- | ----------------------------- | ------------------- |
| `natClose` | Emitted when the sheet closes | `CustomEvent<void>` |
| `natOpen`  | Emitted when the sheet opens  | `CustomEvent<void>` |


## Methods

### `hide() => Promise<void>`

Close the sheet

#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`

Open the sheet

#### Returns

Type: `Promise<void>`




## Slots

| Slot       | Description                                            |
| ---------- | ------------------------------------------------------ |
|            | Main sheet content                                     |
| `"footer"` | Sheet footer area (below content, e.g. action buttons) |
| `"header"` | Sheet header area (above content)                      |


----------------------------------------------


