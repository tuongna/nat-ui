# nat-popover



<!-- Auto Generated Below -->


## Overview

Popover component for contextual overlays

## Properties

| Property         | Attribute          | Description                                  | Type                                     | Default    |
| ---------------- | ------------------ | -------------------------------------------- | ---------------------------------------- | ---------- |
| `closeOnOutside` | `close-on-outside` | Whether to close when clicking outside       | `boolean`                                | `true`     |
| `open`           | `open`             | When true, shows the popover                 | `boolean`                                | `false`    |
| `placement`      | `placement`        | Placement of the popover relative to trigger | `"bottom" \| "left" \| "right" \| "top"` | `'bottom'` |
| `showArrow`      | `show-arrow`       | Whether to show arrow                        | `boolean`                                | `true`     |
| `size`           | `size`             | Popover size                                 | `"lg" \| "md" \| "sm"`                   | `'md'`     |


## Events

| Event      | Description                 | Type                |
| ---------- | --------------------------- | ------------------- |
| `natClose` | Emitted when popover closes | `CustomEvent<void>` |
| `natOpen`  | Emitted when popover opens  | `CustomEvent<void>` |


## Slots

| Slot        | Description     |
| ----------- | --------------- |
|             | Popover content |
| `"trigger"` | Trigger element |


----------------------------------------------


