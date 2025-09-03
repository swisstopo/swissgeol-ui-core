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
import { spinnerSvg } from './icons/spinner.svg';
import { referenceSvg } from './icons/reference.svg';
import { fileSvg } from './icons/file.svg';
import { downloadSvg } from './icons/download.svg';
import { openLinkSvg } from './icons/open-link.svg';

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
  @Prop({ reflect: true })
  animation: SgcIconAnimation | null = null;

  static get icons(): readonly SgcIconKey[] {
    return Object.keys(icons) as SgcIconKey[];
  }

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
  download: downloadSvg,
  edit: editSvg,
  file: fileSvg,
  openLink: openLinkSvg,
  optional: optionalSvg,
  plus: plusSvg,
  profile: profileSvg,
  reference: referenceSvg,
  required: requiredSvg,
  spinner: spinnerSvg,
};

export type SgcIconKey = keyof typeof icons;

export type SgcIconSize = 'normal' | 'large';

export type SgcIconAnimation = 'spin';
