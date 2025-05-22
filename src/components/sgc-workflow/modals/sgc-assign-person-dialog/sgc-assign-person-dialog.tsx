import { Component, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'sgc-assign-person-dialog',
  styleUrl: 'sgc-assign-person-dialog.css',
  shadow: true,
})
export class SgcAssignPersonDialog {
  @Event({ eventName: 'closeDialog', composed: true })
  closeEvent: EventEmitter<void>;

  @Event({ eventName: 'assignPerson', composed: true })
  assignPersonEvent: EventEmitter<void>;

  render() {
    return (
      <sgc-modal-wrapper>
        <div slot="header">
          <sgc-translate ns="workflow">actions.assign</sgc-translate>
        </div>
        <div slot="content">Content</div>
        <div slot="footer">
          <sgc-button
            color="secondary"
            onButtonClick={() => this.closeEvent.emit()}
          >
            <sgc-translate ns="general">cancel</sgc-translate>
          </sgc-button>
          <sgc-button onButtonClick={() => this.assignPersonEvent.emit()}>
            <sgc-translate ns="workflow">actions.assign</sgc-translate>
            <sgc-icon name="assign"></sgc-icon>
          </sgc-button>
        </div>
      </sgc-modal-wrapper>
    );
  }
}
