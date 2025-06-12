import { Component, h, Host } from '@stencil/core';
import styles from './sgc-form-item.css';

@Component({
  tag: 'sgc-form-item',
  styles,
  shadow: true,
})
export class SgcFormItem {
  render() {
    return (
      <Host>
        <span class="title">
          <label>
            <slot name="label"></slot>
          </label>
          <slot name="icon"></slot>
        </span>
        <slot></slot>
      </Host>
    );
  }
}
