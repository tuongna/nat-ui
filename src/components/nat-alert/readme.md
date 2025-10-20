# nat-alert



<!-- Auto Generated Below -->


## Overview

Alert component for displaying important messages

## Properties

| Property   | Attribute   | Description       | Type                                           | Default  |
| ---------- | ----------- | ----------------- | ---------------------------------------------- | -------- |
| `closable` | `closable`  | Show close button | `boolean`                                      | `false`  |
| `outline`  | `outline`   | Use outline style | `boolean`                                      | `false`  |
| `showIcon` | `show-icon` | Show icon         | `boolean`                                      | `true`   |
| `size`     | `size`      | Alert size        | `"lg" \| "md" \| "sm"`                         | `'md'`   |
| `variant`  | `variant`   | Alert variant     | `"danger" \| "info" \| "success" \| "warning"` | `'info'` |


## Events

| Event      | Description                  | Type                |
| ---------- | ---------------------------- | ------------------- |
| `natClose` | Emitted when alert is closed | `CustomEvent<void>` |


## Slots

| Slot        | Description           |
| ----------- | --------------------- |
|             | Alert message content |
| `"actions"` | Action buttons        |
| `"icon"`    | Custom icon           |
| `"title"`   | Alert title           |


----------------------------------------------


