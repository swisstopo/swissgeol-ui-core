import {
  Component,
  Host,
  h,
  Element,
  ComponentInterface,
  Prop,
} from '@stencil/core';
import styles from './sgc-dropdown-item.css';

@Component({
  tag: 'sgc-dropdown-item',
  styles,
  shadow: true,
})
export class SgcDropdownItem implements ComponentInterface {
  /**
   * Anchor `href` attribute.
   * When this is set, the button will use the `a` tag instead of `button`.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a anchor}
   */
  @Prop()
  href: string | null = null;

  /**
   * Anchor `target` attribute.
   * Only has an effect when {@link href} is set.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#target}
   */
  @Prop()
  target: string | null = null;

  /**
   * Anchor `rel` attribute.
   * Only has an effect when {@link href} is set.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#rel}
   */
  @Prop()
  rel: string | null = null;

  /**
   * Anchor `download` attribute.
   * Only has an effect when {@link href} is set.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#download}
   */
  @Prop()
  download: string | null = null;

  @Prop({ reflect: true, attribute: 'disabled' })
  isDisabled = false;

  @Element()
  element!: HTMLElement;

  connectedCallback(): void {
    this.element['component'] = this;
  }

  render() {
    return (
      <Host>
        {this.href === null ? (
          <button class="button" part="button" disabled={this.isDisabled}>
            <slot></slot>
          </button>
        ) : (
          <a
            class="button"
            part="button"
            aria-disabled={this.isDisabled}
            href={this.isDisabled ? undefined : this.href}
            rel={this.rel}
            target={this.target}
          >
            <slot></slot>
          </a>
        )}
      </Host>
    );
  }
}
