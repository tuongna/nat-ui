# nat-drawer



<!-- Auto Generated Below -->


## Overview

Premium slide-out Drawer panel

## Properties

| Property              | Attribute                | Description                                                                                | Type                                     | Default     |
| --------------------- | ------------------------ | ------------------------------------------------------------------------------------------ | ---------------------------------------- | ----------- |
| `closable`            | `closable`               | Show close button                                                                          | `boolean`                                | `true`      |
| `closeOnOutsideClick` | `close-on-outside-click` | Close when clicking outside                                                                | `boolean`                                | `true`      |
| `heading`             | `heading`                | Drawer heading text                                                                        | `string`                                 | `undefined` |
| `open`                | `open`                   | Controls visibility of the drawer                                                          | `boolean`                                | `false`     |
| `position`            | `position`               | The edge from which the drawer slides out                                                  | `"bottom" \| "left" \| "right" \| "top"` | `'right'`   |
| `size`                | `size`                   | Size of the drawer (width for left/right, height for top/bottom) Examples: '300px', '50vw' | `string`                                 | `'350px'`   |


## Events

| Event      | Description | Type                |
| ---------- | ----------- | ------------------- |
| `natClose` |             | `CustomEvent<void>` |
| `natOpen`  |             | `CustomEvent<void>` |


## Slots

| Slot       | Description         |
| ---------- | ------------------- |
|            | Main drawer content |
| `"footer"` | Footer action area  |


----------------------------------------------


