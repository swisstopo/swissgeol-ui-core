import { Component, Host, h, Prop } from '@stencil/core';
import { SgcIconKey } from '../sgc-icon/sgc-icon';

@Component({
  tag: 'sgc-form-item-wrapper',
  styleUrl: 'sgc-form-item-wrapper.css',
  shadow: true,
})
export class SgcFormItemWrapper {
  @Prop() label: string;
  @Prop() icon: SgcIconKey;

  render() {
    return (
      <Host>
        <span class="title">
          <label>
            <sgc-translate ns="workflow">{this.label}</sgc-translate>
          </label>
          <sgc-icon name={this.icon}></sgc-icon>
        </span>
        <slot></slot>
      </Host>
    );
  }
}
