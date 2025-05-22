import { Component, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'sgc-finish-review-dialog',
  styleUrl: 'sgc-finish-review-dialog.css',
  shadow: true,
})
export class SgcFinishReviewDialog {
  @Event({ eventName: 'closeDialog', composed: true })
  closeEvent: EventEmitter<void>;

  @Event({ eventName: 'finishReview', composed: true })
  finishReviewEvent: EventEmitter<void>;

  render() {
    return (
      <sgc-modal-wrapper>
        <div slot="header">
          <sgc-translate ns="workflow">actions.finishReview</sgc-translate>
        </div>
        <div slot="content">Content</div>
        <div slot="footer">
          <sgc-button
            color="secondary"
            onButtonClick={() => this.closeEvent.emit()}
          >
            <sgc-translate ns="general">cancel</sgc-translate>
          </sgc-button>
          <sgc-button onButtonClick={() => this.finishReviewEvent.emit()}>
            <sgc-translate ns="workflow">actions.finishReview</sgc-translate>
            <sgc-icon name="chevronRight"></sgc-icon>
          </sgc-button>
        </div>
      </sgc-modal-wrapper>
    );
  }
}
