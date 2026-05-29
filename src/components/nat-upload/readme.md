# nat-upload



<!-- Auto Generated Below -->


## Overview

Drag-and-drop file upload zone with preview, progress, and multiple file support.

## Properties

| Property       | Attribute       | Description                                                                  | Type                                | Default                                |
| -------------- | --------------- | ---------------------------------------------------------------------------- | ----------------------------------- | -------------------------------------- |
| `accept`       | `accept`        | Accepted file types (same as HTML accept attribute: 'image/*', '.pdf', etc.) | `string`                            | `undefined`                            |
| `disabled`     | `disabled`      | If true, the upload zone is disabled                                         | `boolean`                           | `false`                                |
| `hint`         | `hint`          | Hint text shown below label                                                  | `string`                            | `undefined`                            |
| `label`        | `label`         | Drag & drop label text                                                       | `string`                            | `'Drop files here or click to browse'` |
| `maxFiles`     | `max-files`     | Maximum number of files (only relevant when multiple=true)                   | `number`                            | `undefined`                            |
| `maxSize`      | `max-size`      | Maximum file size in bytes                                                   | `number`                            | `undefined`                            |
| `multiple`     | `multiple`      | Allow multiple file selection                                                | `boolean`                           | `false`                                |
| `showPreviews` | `show-previews` | If true, shows thumbnails for image files                                    | `boolean`                           | `true`                                 |
| `variant`      | `variant`       | Visual variant                                                               | `"default" \| "glass" \| "minimal"` | `'default'`                            |


## Events

| Event             | Description                                              | Type                                                                |
| ----------------- | -------------------------------------------------------- | ------------------------------------------------------------------- |
| `natFileRejected` | Emitted when file exceeds maxSize or type is not allowed | `CustomEvent<{ file: File; reason: "size" \| "type" \| "count"; }>` |
| `natFileRemoved`  | Emitted when a file is removed                           | `CustomEvent<UploadFile>`                                           |
| `natFilesAdded`   | Emitted when files are added (before upload)             | `CustomEvent<File[]>`                                               |


## Methods

### `clearFiles() => Promise<void>`

Clear all files

#### Returns

Type: `Promise<void>`



### `getFiles() => Promise<UploadFile[]>`

Get the list of added files

#### Returns

Type: `Promise<UploadFile[]>`



### `setProgress(id: string, progress: number, status?: UploadFile["status"]) => Promise<void>`

Update progress for a specific file by id

#### Parameters

| Name       | Type                                            | Description |
| ---------- | ----------------------------------------------- | ----------- |
| `id`       | `string`                                        |             |
| `progress` | `number`                                        |             |
| `status`   | `"error" \| "pending" \| "uploading" \| "done"` |             |

#### Returns

Type: `Promise<void>`




## Slots

| Slot | Description                                                        |
| ---- | ------------------------------------------------------------------ |
|      | Custom content inside the drop zone (replaces default icon + text) |


----------------------------------------------


