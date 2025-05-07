# sgc-workflow-change

<!-- Auto Generated Below -->


## Properties

| Property                | Attribute  | Description | Type             | Default     |
| ----------------------- | ---------- | ----------- | ---------------- | ----------- |
| `change` _(required)_   | `change`   |             | `WorkflowChange` | `undefined` |
| `workflow` _(required)_ | `workflow` |             | `Workflow`       | `undefined` |


## Dependencies

### Used by

 - [sgc-workflow-history](../sgc-workflow-history)

### Depends on

- [sgc-workflow-change-template](../sgc-workflow-change-template)

### Graph
```mermaid
graph TD;
  sgc-workflow-change --> sgc-workflow-change-template
  sgc-workflow-change-template --> sgc-translate
  sgc-workflow-change-template --> sgc-date
  sgc-workflow-history --> sgc-workflow-change
  style sgc-workflow-change fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
