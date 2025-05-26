import {
  Component,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
} from '@stencil/core';
import styles from './sgc-button.css';

@Component({
  tag: 'sgc-button',
  shadow: true,
  styles,
})
export class SgcButton {
  @Prop({ reflect: true })
  color: SgcButtonColor = 'primary';

  @Prop({ reflect: true })
  variant: SgcButtonVariant = 'normal';

  @Prop({ reflect: true })
  justify: SgcButtonJustify = 'center';

  @Prop({ reflect: true, attribute: 'disabled' })
  isDisabled = false;

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

  @Prop({ reflect: true, attribute: 'active' })
  isActive = false;

  @Event({ eventName: 'buttonClick', composed: true })
  clickEvent!: EventEmitter<MouseEvent>;

  @Listen('click')
  handleClick(event: MouseEvent): void {
    this.clickEvent.emit(event);
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

export type SgcButtonColor = 'primary' | 'secondary' | 'tertiary';

export type SgcButtonVariant =
  | 'normal'
  | 'large'
  | 'icon'
  | 'icon-round'
  | 'chip';

export type SgcButtonJustify = 'center' | 'start' | 'end';
