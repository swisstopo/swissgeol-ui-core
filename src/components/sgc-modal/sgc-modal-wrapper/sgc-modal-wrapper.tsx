import { Component, h, Host } from '@stencil/core';
import styles from './sgc-modal-wrapper.css';

@Component({
  tag: 'sgc-modal-wrapper',
  styles,
  shadow: true,
})
export class SgcModal {
  render() {
    return (
      <Host>
        <h2 class="header">
          <slot name="header"></slot>
        </h2>
        <div class="content">
          <slot name="content"></slot>
        </div>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </Host>
    );
  }
}
