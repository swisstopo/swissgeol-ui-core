import { Component, Element, h, Host, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'sgc-tab',
  styleUrl: 'sgc-tab.css',
  shadow: true,
})
export class SgcTab {
  @Prop({ mutable: true })
  isActive = false;

  @Prop()
  panel: HTMLElement | string | null = null;

  @Element()
  element!: HTMLElement;

  connectedCallback(): void {
    this.element['component'] = this;
  }

  @Watch('isActive')
  handleActiveChange(): void {
    this.element.ariaSelected = this.isActive ? 'true' : null;
  }

  get panelId(): string | null {
    if (this.panel === null) {
      return null;
    }
    const id = typeof this.panel === 'string' ? this.panel : this.panel.id;
    return id.length === 0 ? null : id;
  }

  readonly render = () => (
    <Host role="tab">
      <slot></slot>
    </Host>
  );
}
