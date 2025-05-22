import { Component, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'sgc-request-review-dialog',
  styleUrl: 'sgc-request-review-dialog.css',
  shadow: true,
})
export class SgcRequestReviewDialog {
  @Event({ eventName: 'closeDialog', composed: true })
  closeEvent: EventEmitter<void>;

  @Event({ eventName: 'requestReview', composed: true })
  requestReviewEvent: EventEmitter<void>;

  render() {
    return (
      <sgc-modal-wrapper>
        <div slot="header">
          <sgc-translate ns="workflow">actions.forward</sgc-translate>
        </div>
        <div slot="content">
          <sgc-text-area
            label="other.comment"
            placeholder="Type here..."
            rows={3}
            onValueChanged={(event) => console.log(event.detail)}
          ></sgc-text-area>
        </div>
        <div slot="footer">
          <sgc-button
            color="secondary"
            onButtonClick={() => this.closeEvent.emit()}
          >
            <sgc-translate ns="general">cancel</sgc-translate>
          </sgc-button>
          <sgc-button onButtonClick={() => this.requestReviewEvent.emit()}>
            <sgc-translate ns="workflow">actions.requestReview</sgc-translate>
            <sgc-icon name="chevronRight"></sgc-icon>
          </sgc-button>
        </div>
      </sgc-modal-wrapper>
    );
  }
}
