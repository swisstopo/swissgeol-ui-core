import { LitElement, html } from 'lit';
import '@swissgeol/ui-core/import';
import { customElement } from 'lit/decorators.js';

@customElement('my-element')
export class MyElement extends LitElement {
  render = () => html` <sgc-button>Hey!</sgc-button> `;
}
