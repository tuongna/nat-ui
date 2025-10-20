# nat-modal



<!-- Auto Generated Below -->


## Overview

Modal dialog component

## Properties

| Property          | Attribute           | Description                            | Type                                     | Default |
| ----------------- | ------------------- | -------------------------------------- | ---------------------------------------- | ------- |
| `centered`        | `centered`          | Center modal vertically                | `boolean`                                | `false` |
| `closable`        | `closable`          | Show close button                      | `boolean`                                | `true`  |
| `closeOnBackdrop` | `close-on-backdrop` | Close modal when clicking backdrop     | `boolean`                                | `true`  |
| `closeOnEscape`   | `close-on-escape`   | Close modal when pressing Escape key   | `boolean`                                | `true`  |
| `open`            | `open`              | Whether the modal is open              | `boolean`                                | `false` |
| `preventScroll`   | `prevent-scroll`    | Prevent body scroll when modal is open | `boolean`                                | `true`  |
| `size`            | `size`              | Modal size                             | `"full" \| "lg" \| "md" \| "sm" \| "xl"` | `'md'`  |


## Events

| Event            | Description                              | Type                                           |
| ---------------- | ---------------------------------------- | ---------------------------------------------- |
| `natBeforeClose` | Emitted before modal closes (cancelable) | `CustomEvent<{ preventDefault: () => void; }>` |
| `natBeforeOpen`  | Emitted before modal opens (cancelable)  | `CustomEvent<{ preventDefault: () => void; }>` |
| `natClose`       | Emitted when modal is closed             | `CustomEvent<void>`                            |
| `natOpen`        | Emitted when modal is opened             | `CustomEvent<void>`                            |


## Methods

### `closeModal() => Promise<void>`

Close the modal programmatically

#### Returns

Type: `Promise<void>`



### `openModal() => Promise<void>`

Open the modal programmatically

#### Returns

Type: `Promise<void>`




## Slots

| Slot       | Description          |
| ---------- | -------------------- |
|            | Modal body content   |
| `"footer"` | Modal footer content |
| `"header"` | Modal header content |


----------------------------------------------


