# sgc-workflow-history

<!-- Auto Generated Below -->

## Properties

| Property                | Attribute  | Description | Type       | Default     |
| ----------------------- | ---------- | ----------- | ---------- | ----------- |
| `workflow` _(required)_ | `workflow` |             | `Workflow` | `undefined` |

## Dependencies

### Used by

- [sgc-workflow](../sgc-workflow)

### Depends on

- [sgc-workflow-change](../sgc-workflow-change)
- [sgc-workflow-change-template](../sgc-workflow-change-template)

### Graph

```mermaid
graph TD;
  sgc-workflow-history --> sgc-workflow-change
  sgc-workflow-history --> sgc-workflow-change-template
  sgc-workflow-change --> sgc-workflow-change-template
  sgc-workflow-change-template --> sgc-translate
  sgc-workflow-change-template --> sgc-date
  sgc-workflow --> sgc-workflow-history
  style sgc-workflow-history fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
