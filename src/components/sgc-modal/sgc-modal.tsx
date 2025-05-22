import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'sgc-modal',
  styleUrl: 'sgc-modal.css',
  shadow: true,
})
export class SgcModal {
  @Prop() isopen: boolean;

  private handleCancel = () => {
    this.isopen = false;
  };

  render() {
    return (
      <div class={this.isopen ? 'modal-wrapper isopen' : 'modal-wrapper'}>
        <div class="modal-overlay" onClick={this.handleCancel} />
        <div class="modal">
          <slot></slot>
        </div>
      </div>
    );
  }
}
