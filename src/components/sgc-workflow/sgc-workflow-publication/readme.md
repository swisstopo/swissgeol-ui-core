# sgc-workflow-publication

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
  sgc-workflow-publication --> sgc-translate
  sgc-workflow-publication --> sgc-workflow-step
  sgc-workflow-publication --> sgc-button
  sgc-workflow-publication --> sgc-icon
  sgc-workflow-step --> sgc-translate
  sgc-workflow-step --> sgc-icon
  sgc-workflow --> sgc-workflow-publication
  style sgc-workflow-publication fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
