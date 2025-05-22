import { Component, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'sgc-request-review',
  styleUrl: 'sgc-request-review.css',
  shadow: true,
})
export class SgcRequestReview {
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
            <sgc-translate ns="workflow">actions.requestChanges</sgc-translate>
            <sgc-icon name="close"></sgc-icon>
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
