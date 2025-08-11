import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'sgc-card',
  styleUrl: 'sgc-card.css',
  shadow: true,
})
export class SgcCard {
  @Prop() header: string;

  render() {
    return (
      <Host>
        <div class="card">
          <div class="card-header">
            <span class="card-title">{this.header}</span>
            <div class="card-actions">
              <slot name="card-actions"></slot>
            </div>
          </div>
          <div class="card-body">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
