import { Component, Element, h, Host, Listen, Prop } from '@stencil/core';
import styles from './sgc-button.css'

@Component({
  tag: 'sgc-button',
  shadow: true,
  styles,
})
export class SgcButton {
  @Prop({ reflect: true })
  color: SgcButtonColor = 'primary'

  @Prop({ reflect: true })
  variant: SgcButtonVariant = 'normal'

  @Prop({ reflect: true })
  justify: SgcButtonJustify = 'center'

  @Prop({ reflect: true, attribute: 'disabled' })
  isDisabled = false

  @Prop({ reflect: true, attribute: 'active' })
  isActive = false

  @Element()
  private readonly element!: HTMLElement;

  render() {
    return (
      <Host>
        <button part="button" disabled={this.isDisabled}>
          <slot></slot>
        </button>
      </Host>
    );
  }

  @Listen('click', { capture: true })
  handleClick(event: MouseEvent): void {
    this.element.dispatchEvent(event)
  }
}

export type SgcButtonColor = 'primary' | 'secondary' | 'tertiary';

export type SgcButtonVariant = 'normal' | 'large' | 'icon' | 'icon-round' | 'chip';

export type SgcButtonJustify = 'center' | 'start' | 'end';
