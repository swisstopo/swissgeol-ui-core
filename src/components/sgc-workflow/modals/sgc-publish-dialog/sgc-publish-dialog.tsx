import { Component, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'sgc-publish-dialog',
  styleUrl: 'sgc-publish-dialog.css',
  shadow: true,
})
export class SgcPublishDialog {
  @Event({ eventName: 'closeDialog', composed: true })
  closeEvent: EventEmitter<void>;

  @Event({ eventName: 'publish', composed: true })
  publish: EventEmitter<void>;

  render() {
    return (
      <sgc-modal-wrapper>
        <div slot="header">
          <sgc-translate ns="workflow">actions.publish</sgc-translate>
        </div>
        <div slot="content">Content</div>
        <div slot="footer">
          <sgc-button
            color="secondary"
            onButtonClick={() => this.closeEvent.emit()}
          >
            <sgc-translate ns="general">cancel</sgc-translate>
          </sgc-button>
          <sgc-button onButtonClick={() => this.publish.emit()}>
            <sgc-translate ns="workflow">actions.publish</sgc-translate>
            <sgc-icon name="chevronRight"></sgc-icon>
          </sgc-button>
        </div>
      </sgc-modal-wrapper>
    );
  }
}
