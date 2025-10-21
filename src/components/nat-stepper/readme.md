# nat-stepper



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description          | Type            | Default |
| ----------- | ----------- | -------------------- | --------------- | ------- |
| `active`    | `active`    | Which step is active | `number`        | `0`     |
| `clickable` | `clickable` | Clickable steps      | `boolean`       | `false` |
| `steps`     | --          | Steps list           | `StepperStep[]` | `[]`    |
| `vertical`  | `vertical`  | Layout orientation   | `boolean`       | `false` |


## Events

| Event       | Description             | Type                                             |
| ----------- | ----------------------- | ------------------------------------------------ |
| `natChange` | Emits when step changes | `CustomEvent<{ index: number; value: string; }>` |


## Dependencies

### Depends on

- [nat-icon](../nat-icon)

### Graph
```mermaid
graph TD;
  nat-stepper --> nat-icon
  style nat-stepper fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


