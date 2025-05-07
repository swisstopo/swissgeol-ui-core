# sgc-workflow-change-template

<!-- Auto Generated Below -->

## Properties

| Property                 | Attribute    | Description | Type         | Default     |
| ------------------------ | ------------ | ----------- | ------------ | ----------- |
| `createdAt` _(required)_ | `created-at` |             | `LocalDate`  | `undefined` |
| `creator` _(required)_   | `creator`    |             | `SimpleUser` | `undefined` |

## Dependencies

### Used by

- [sgc-workflow-change](../sgc-workflow-change)
- [sgc-workflow-history](../sgc-workflow-history)

### Depends on

- [sgc-translate](../sgc-translate)
- [sgc-date](../sgc-date)

### Graph

```mermaid
graph TD;
  sgc-workflow-change-template --> sgc-translate
  sgc-workflow-change-template --> sgc-date
  sgc-workflow-change --> sgc-workflow-change-template
  sgc-workflow-history --> sgc-workflow-change-template
  style sgc-workflow-change-template fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
