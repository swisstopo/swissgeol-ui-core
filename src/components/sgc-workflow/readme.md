# sgc-workflow

<!-- Auto Generated Below -->

## Properties

| Property                  | Attribute      | Description | Type       | Default     |
| ------------------------- | -------------- | ----------- | ---------- | ----------- |
| `isReadOnly` _(required)_ | `is-read-only` |             | `boolean`  | `undefined` |
| `workflow` _(required)_   | `workflow`     |             | `Workflow` | `undefined` |

## Dependencies

### Depends on

- [sgc-workflow-steps](sgc-workflow-steps)
- [sgc-workflow-assignee](sgc-workflow-assignee)
- [sgc-workflow-publication](sgc-workflow-publication)
- [sgc-tabs](../sgc-tabs)
- [sgc-tab](../sgc-tab)
- [sgc-translate](../sgc-translate)
- [sgc-workflow-history](../sgc-workflow-history)

### Graph

```mermaid
graph TD;
  sgc-workflow --> sgc-workflow-steps
  sgc-workflow --> sgc-workflow-assignee
  sgc-workflow --> sgc-workflow-publication
  sgc-workflow --> sgc-tabs
  sgc-workflow --> sgc-tab
  sgc-workflow --> sgc-translate
  sgc-workflow --> sgc-workflow-history
  sgc-workflow-steps --> sgc-translate
  sgc-workflow-steps --> sgc-workflow-step
  sgc-workflow-steps --> sgc-button
  sgc-workflow-steps --> sgc-icon
  sgc-workflow-step --> sgc-translate
  sgc-workflow-step --> sgc-icon
  sgc-workflow-assignee --> sgc-translate
  sgc-workflow-assignee --> sgc-button
  sgc-workflow-assignee --> sgc-icon
  sgc-workflow-publication --> sgc-translate
  sgc-workflow-publication --> sgc-workflow-step
  sgc-workflow-publication --> sgc-button
  sgc-workflow-publication --> sgc-icon
  sgc-workflow-history --> sgc-workflow-change
  sgc-workflow-history --> sgc-workflow-change-template
  sgc-workflow-change --> sgc-workflow-change-template
  sgc-workflow-change-template --> sgc-translate
  sgc-workflow-change-template --> sgc-date
  style sgc-workflow fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
