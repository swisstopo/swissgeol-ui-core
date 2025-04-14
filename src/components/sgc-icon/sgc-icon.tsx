import { Component, h, Host, Prop } from '@stencil/core';
import styles from './sgc-icon.css';
import { plusSvg } from './icons/plus.svg';

@Component({
  tag: 'sgc-icon',
  shadow: true,
  styles,
})
export class SgcIcon {
  @Prop()
  name: SgcIconKey;

  @Prop({ reflect: true })
  size: SgcIconSize = 'normal';

  render() {
    return (
      <Host>
        <span innerHTML={icons[this.name]}></span>
      </Host>
    );
  }
}

const icons = {
  plus: plusSvg,
};

export type SgcIconKey = keyof typeof icons;

export type SgcIconSize = 'normal' | 'large';
