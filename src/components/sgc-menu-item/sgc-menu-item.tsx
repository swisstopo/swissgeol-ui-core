import {
  Component,
  h,
  Prop,
  Event,
  EventEmitter,
  Host,
  Listen,
} from '@stencil/core';
import styles from './sgc-menu-item.css';
import { SgcIconKey } from '../sgc-icon/sgc-icon';

@Component({
  tag: 'sgc-menu-item',
  shadow: true,
  styles,
})
export class SgcMenuItem {
  @Prop({ reflect: true, attribute: 'empty' })
  isEmpty: boolean = false;

  @Prop({ reflect: true, attribute: 'active' })
  isActive: boolean = false;

  @Prop({ reflect: true, attribute: 'child' })
  isChild: boolean = false;

  @Prop({ reflect: true, attribute: 'reviewed' })
  isReviewed: boolean | string = false;

  @Event({ eventName: 'sgcClick', composed: true })
  clickEvent!: EventEmitter<MouseEvent>;

  @Listen('click')
  handleClick(event: MouseEvent): void {
    this.clickEvent.emit(event);
  }

  private get iconKey(): SgcIconKey | null {
    switch (this.isReviewed) {
      case 'partial':
        return 'checkmarkBrackets';
      case true:
      case 'true':
      case '':
        return 'checkmark';
      default:
        return null;
    }
  }

  private get icon() {
    const key = this.iconKey;
    return key ? (
      <sgc-icon name={key} size="large" class="icon"></sgc-icon>
    ) : null;
  }

  render() {
    return (
      <Host aria-selected={this.isActive ? 'true' : undefined}>
        <slot />
        {this.icon}
      </Host>
    );
  }
}
