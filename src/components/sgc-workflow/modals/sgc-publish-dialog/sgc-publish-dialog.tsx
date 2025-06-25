import { Component, Event, EventEmitter, h, Prop, State } from '@stencil/core';
import {
  GenericWorkflow,
  WorkflowChange,
  WorkflowStatus,
} from '../../../../models/workflow.model';
import { LocalDate } from '../../../../models/base/local-date';
import styles from './sgc-publish-dialog.css';
import { i18n } from '../../../../locales/i18n';

@Component({
  tag: 'sgc-publish-dialog',
  styles,
  shadow: true,
})
export class SgcPublishDialog {
  @Prop() workflow: GenericWorkflow;

  @State() comment: string | null = null;

  @Event({ eventName: 'sgcCloseDialog', composed: true })
  closeEvent: EventEmitter<void>;

  @Event({ eventName: 'sgcPublish', composed: true })
  publishEvent: EventEmitter<WorkflowChange>;

  private readonly handleWorkflowStatusChange = () => {
    const workflowChange: WorkflowChange = {
      comment: this.comment,
      createdAt: LocalDate.fromDate(new Date()),
      fromStatus: this.workflow.status,
      toStatus: WorkflowStatus.Published,
      fromAssignee: this.workflow.assignee,
      toAssignee: null,
      creator: this.workflow.creator,
      hasRequestedChanges: false,
    };
    this.publishEvent.emit(workflowChange);
  };

  render() {
    return (
      <sgc-modal-wrapper>
        <div slot="header">
          <sgc-translate ns="workflow">actions.publish</sgc-translate>
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
          <sgc-translate ns="workflow">other.publishHint</sgc-translate>
        </div>
        <div slot="footer">
          <sgc-button
            color="secondary"
            onButtonClick={() => this.closeEvent.emit()}
          >
            <sgc-translate ns="general">cancel</sgc-translate>
          </sgc-button>
          <sgc-button onButtonClick={() => this.handleWorkflowStatusChange()}>
            <sgc-translate ns="workflow">actions.publish</sgc-translate>
            <sgc-icon name="chevronRight"></sgc-icon>
          </sgc-button>
        </div>
      </sgc-modal-wrapper>
    );
  }
}
