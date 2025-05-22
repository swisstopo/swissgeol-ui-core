import { Component, h, Prop } from '@stencil/core';
import styles from './sgc-modal.css';

@Component({
  tag: 'sgc-modal',
  styles,
  shadow: true,
})
export class SgcModal {
  @Prop() isOpen: boolean;
  @Prop() isPersistent: boolean = false;

  private handleCancel = () => {
    if (this.isPersistent) {
      return;
    }
    this.isOpen = false;
  };

  render() {
    return (
      <div class={this.isOpen ? 'modal-wrapper is-open' : 'modal-wrapper'}>
        <div class="modal-overlay" onClick={this.handleCancel} />
        <div class="modal">
          <slot></slot>
        </div>
      </div>
    );
  }
}
