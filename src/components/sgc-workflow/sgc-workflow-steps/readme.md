# sgc-workflow-steps

<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute      | Description | Type       | Default     |
| ------------------------- | -------------- | ----------- | ---------- | ----------- |
| `isReadOnly` _(required)_ | `is-read-only` |             | `boolean`  | `undefined` |
| `workflow` _(required)_   | `workflow`     |             | `Workflow` | `undefined` |


## Shadow Parts

| Part        | Description |
| ----------- | ----------- |
| `"heading"` |             |


## Dependencies

### Used by

 - [sgc-workflow](..)

### Depends on

- [sgc-translate](../../sgc-translate)
- [sgc-workflow-step](../sgc-workflow-step)
- [sgc-button](../../sgc-button)
- [sgc-icon](../../sgc-icon)

### Graph
```mermaid
graph TD;
  sgc-workflow-steps --> sgc-translate
  sgc-workflow-steps --> sgc-workflow-step
  sgc-workflow-steps --> sgc-button
  sgc-workflow-steps --> sgc-icon
  sgc-workflow-step --> sgc-translate
  sgc-workflow-step --> sgc-icon
  sgc-workflow --> sgc-workflow-steps
  style sgc-workflow-steps fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
