import { Component, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'sgc-request-changes-dialog',
  styleUrl: 'sgc-request-changes-dialog.css',
  shadow: true,
})
export class SgcRequestChangesDialog {
  @Event({ eventName: 'closeDialog', composed: true })
  closeEvent: EventEmitter<void>;

  @Event({ eventName: 'requestChanges', composed: true })
  requestChangesEvent: EventEmitter<void>;

  render() {
    return (
      <sgc-modal-wrapper>
        <div slot="header">
          <sgc-translate ns="workflow">actions.requestChanges</sgc-translate>
        </div>
        <div slot="content">Content</div>
        <div slot="footer">
          <sgc-button
            color="secondary"
            onButtonClick={() => this.closeEvent.emit()}
          >
            <sgc-translate ns="general">cancel</sgc-translate>
          </sgc-button>
          <sgc-button onButtonClick={() => this.requestChangesEvent.emit()}>
            <sgc-translate ns="workflow">actions.requestChanges</sgc-translate>
            <sgc-icon name="chevronRight"></sgc-icon>
          </sgc-button>
        </div>
      </sgc-modal-wrapper>
    );
  }
}
