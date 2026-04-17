# nat-dialog



<!-- Auto Generated Below -->


## Overview

Premium Dialog component with sleek animations and backdrop blur

## Properties

| Property              | Attribute                | Description                                    | Type      | Default     |
| --------------------- | ------------------------ | ---------------------------------------------- | --------- | ----------- |
| `closable`            | `closable`               | Whether to show the close cross icon           | `boolean` | `true`      |
| `closeOnOutsideClick` | `close-on-outside-click` | Close the dialog when clicking on the backdrop | `boolean` | `true`      |
| `heading`             | `heading`                | The heading text of the dialog                 | `string`  | `undefined` |
| `open`                | `open`                   | Controls the visibility of the dialog          | `boolean` | `false`     |


## Events

| Event      | Description                    | Type                |
| ---------- | ------------------------------ | ------------------- |
| `natClose` | Emitted when the dialog closes | `CustomEvent<void>` |
| `natOpen`  | Emitted when the dialog opens  | `CustomEvent<void>` |


## Slots

| Slot        | Description           |
| ----------- | --------------------- |
|             | Main dialog content   |
| `"actions"` | Footer action buttons |


----------------------------------------------


