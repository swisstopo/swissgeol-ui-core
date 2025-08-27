import { Component, h, Host, Prop } from '@stencil/core';
import styles from './sgc-icon.css';
import { plusSvg } from './icons/plus.svg';
import { crossSvg } from './icons/cross.svg';
import { checkmarkSvg } from './icons/checkmark.svg';
import { checkmarkBracketsSvg } from './icons/checkmark-brackets.svg';
import { assignSvg } from './icons/assign.svg';
import { editSvg } from './icons/edit.svg';
import { chevronRightSvg } from './icons/chevron-right.svg';
import { optionalSvg } from './icons/optional.svg';
import { requiredSvg } from './icons/required.svg';
import { profileSvg } from './icons/profile.svg';
import { chevronDownSvg } from './icons/chevron-down.svg';
import { referenceSvg } from './icons/reference.svg';

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
  assign: assignSvg,
  cross: crossSvg,
  checkmark: checkmarkSvg,
  chevronDown: chevronDownSvg,
  checkmarkBrackets: checkmarkBracketsSvg,
  chevronRight: chevronRightSvg,
  edit: editSvg,
  optional: optionalSvg,
  plus: plusSvg,
  profile: profileSvg,
  required: requiredSvg,
  reference: referenceSvg,
};

export type SgcIconKey = keyof typeof icons;

export type SgcIconSize = 'normal' | 'large';
