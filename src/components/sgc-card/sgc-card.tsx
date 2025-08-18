import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'sgc-card',
  styleUrl: 'sgc-card.css',
  shadow: true,
})
export class SgcCard {
  @Prop() header: string;
  /**
   * Renders a collapsed title without background, less padding to the content,
   * and hides actions (even if supplied).
   */
  @Prop() collapsed: boolean = false;

  render() {
    return (
      <Host>
        <div class="card">
          <div
            class={{
              'card-header': true,
              'card-header--collapsed': this.collapsed,
            }}
          >
            <span class="card-title">{this.header}</span>
            {!this.collapsed && (
              <div class="card-actions">
                <slot name="card-actions"></slot>
              </div>
            )}
          </div>
          <div
            class={{
              'card-body': true,
              'card-body--collapsed': this.collapsed,
            }}
          >
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
