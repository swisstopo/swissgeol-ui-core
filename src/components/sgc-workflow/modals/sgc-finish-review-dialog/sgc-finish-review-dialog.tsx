import { Component, Event, EventEmitter, h, Prop, State } from '@stencil/core';
import {
  GenericWorkflow,
  WorkflowChange,
  WorkflowStatus,
} from '../../../../models/workflow.model';
import { LocalDate } from '../../../../models/base/local-date';
import styles from './sgc-finish-review-dialog.css';
import { i18n } from '../../../../locales/i18n';

@Component({
  tag: 'sgc-finish-review-dialog',
  styles,
  shadow: true,
})
export class SgcFinishReviewDialog {
  @Prop() workflow: GenericWorkflow;

  @State() comment: string | null = null;

  @Event({ eventName: 'sgcCloseDialog', composed: true })
  closeEvent: EventEmitter<void>;

  @Event({ eventName: 'sgcFinishReview', composed: true })
  finishReviewEvent: EventEmitter<WorkflowChange>;

  private readonly handleWorkflowStatusChange = () => {
    const workflowChange: WorkflowChange = {
      comment: this.comment,
      createdAt: LocalDate.fromDate(new Date()),
      fromStatus: this.workflow.status,
      toStatus: WorkflowStatus.Reviewed,
      fromAssignee: this.workflow.assignee,
      toAssignee: this.workflow.assignee,
      creator: this.workflow.creator,
      hasRequestedChanges: false,
    };
    this.finishReviewEvent.emit(workflowChange);
  };

  render() {
    return (
      <sgc-modal-wrapper>
        <div slot="header">
          <sgc-translate ns="workflow">actions.finishReview</sgc-translate>
        </div>
        <div slot="content">
          <sgc-form-item>
            <sgc-translate slot="label" ns="workflow">
              other.comment
            </sgc-translate>
            <sgc-icon name="optional" slot="icon"></sgc-icon>
            <sgc-text-area
              rows={3}
              placeholder={i18n.t('workflow', 'other.placeholder')}
              onValueChanged={(event) => (this.comment = event.detail)}
            ></sgc-text-area>
          </sgc-form-item>
        </div>
        <div slot="footer">
          <sgc-button
            color="secondary"
            onButtonClick={() => this.closeEvent.emit()}
          >
            <sgc-translate ns="general">cancel</sgc-translate>
          </sgc-button>
          <sgc-button onButtonClick={() => this.handleWorkflowStatusChange()}>
            <sgc-translate ns="workflow">actions.finishReview</sgc-translate>
            <sgc-icon name="chevronRight"></sgc-icon>
          </sgc-button>
        </div>
      </sgc-modal-wrapper>
    );
  }
}
