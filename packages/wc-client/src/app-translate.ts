import { LitElement, html } from 'lit';
import '@swissgeol/ui-core/import';
import { customElement, state } from 'lit/decorators.js';
import { Language, SwissgeolCoreI18n } from '@swissgeol/ui-core';

@customElement('app-translate')
export class AppTranslate extends LitElement {
  @state()
  accessor counter = 5;

  connectedCallback() {
    super.connectedCallback();

    const interval = setInterval(() => {
      if (this.counter === 1) {
        SwissgeolCoreI18n.setLanguage(Language.French);
        clearInterval(interval);
      }
      this.counter -= 1;
    }, 1000);
  }

  readonly render = () =>
    html` <sgc-translate ns="general">cancel</sgc-translate> (${this.counter})`;
}
