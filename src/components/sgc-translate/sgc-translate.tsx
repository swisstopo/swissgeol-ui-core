import { Component, Element, h, Host, Prop } from '@stencil/core';
import { i18n, NamespaceKey } from '../../locales/i18n';

@Component({
  tag: 'sgc-translate',
  shadow: false,
})
export class SgcTranslate {
  @Prop()
  ns!: NamespaceKey;

  @Element()
  element!: HTMLElement;

  private key: string | null = null;

  private observer: MutationObserver | null = null;
  private shouldIgnoreNextChange = false;

  private unsubscribeFromLanguageChange: (() => void) | null = null;

  constructor() {
    this.updateKey = this.updateKey.bind(this);
    this.translate = this.translate.bind(this);
  }

  componentDidLoad(): void {
    const observer = new MutationObserver(this.updateKey);
    observer.observe(this.element, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    this.unsubscribeFromLanguageChange = i18n.onLanguageChange(this.translate);

    this.updateKey();
  }

  disconnectedCallback(): void {
    this.observer?.disconnect();
    this.observer = null;

    this.unsubscribeFromLanguageChange?.();
    this.unsubscribeFromLanguageChange = null;
  }

  private updateKey(): void {
    if (this.shouldIgnoreNextChange) {
      this.shouldIgnoreNextChange = false;
      return;
    }
    this.key = this.element.textContent.trim();
    this.translate();
  }

  private translate(): void {
    if (!this.key) {
      return;
    }
    this.shouldIgnoreNextChange = true;
    this.element.innerText = i18n.t(this.ns, this.key);
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
