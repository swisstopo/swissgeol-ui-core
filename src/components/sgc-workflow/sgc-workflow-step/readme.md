# sgc-workflow-step

<!-- Auto Generated Below -->


## Properties

| Property                | Attribute  | Description | Type                                                                                                     | Default     |
| ----------------------- | ---------- | ----------- | -------------------------------------------------------------------------------------------------------- | ----------- |
| `status` _(required)_   | `status`   |             | `WorkflowStatus.Draft \| WorkflowStatus.InReview \| WorkflowStatus.Published \| WorkflowStatus.Reviewed` | `undefined` |
| `workflow` _(required)_ | `workflow` |             | `Workflow`                                                                                               | `undefined` |


## Dependencies

### Used by

 - [sgc-workflow-publication](../sgc-workflow-publication)
 - [sgc-workflow-steps](../sgc-workflow-steps)

### Depends on

- [sgc-translate](../../sgc-translate)
- [sgc-icon](../../sgc-icon)

### Graph
```mermaid
graph TD;
  sgc-workflow-step --> sgc-translate
  sgc-workflow-step --> sgc-icon
  sgc-workflow-publication --> sgc-workflow-step
  sgc-workflow-steps --> sgc-workflow-step
  style sgc-workflow-step fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
