import { Component, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'sgc-change-status-dialog',
  styleUrl: 'sgc-change-status-dialog.css',
  shadow: true,
})
export class SgcChangeStatusDialog {
  @Event({ eventName: 'closeDialog', composed: true })
  closeEvent: EventEmitter<void>;

  @Event({ eventName: 'changeStatus', composed: true })
  statusChangeEvent: EventEmitter<void>;

  render() {
    return (
      <sgc-modal-wrapper>
        <div slot="header">
          <sgc-translate ns="workflow">actions.changeStatus</sgc-translate>
        </div>
        <div slot="content">Content</div>
        <div slot="footer">
          <sgc-button
            color="secondary"
            onButtonClick={() => this.closeEvent.emit()}
          >
            <sgc-translate ns="general">cancel</sgc-translate>
          </sgc-button>
          <sgc-button onButtonClick={() => this.statusChangeEvent.emit()}>
            <sgc-translate ns="workflow">actions.changeStatus</sgc-translate>
            <sgc-icon name="edit"></sgc-icon>
          </sgc-button>
        </div>
      </sgc-modal-wrapper>
    );
  }
}
