# sgc-checklist

<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description | Type      | Default     |
| ------------ | ------------- | ----------- | --------- | ----------- |
| `isDisabled` | `is-disabled` |             | `boolean` | `false`     |
| `value`      | `value`       |             | `boolean` | `undefined` |


## Events

| Event             | Description | Type                   |
| ----------------- | ----------- | ---------------------- |
| `checklistChange` |             | `CustomEvent<boolean>` |


## Dependencies

### Used by

 - [sgc-workflow-selection](../sgc-workflow/sgc-workflow-selection)

### Depends on

- [sgc-checkbox](../sgc-checkbox)

### Graph
```mermaid
graph TD;
  sgc-checklist --> sgc-checkbox
  sgc-workflow-selection --> sgc-checklist
  style sgc-checklist fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
