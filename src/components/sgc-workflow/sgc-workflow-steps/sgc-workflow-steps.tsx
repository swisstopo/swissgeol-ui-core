import { Component, h, Host, Prop, Event, EventEmitter } from '@stencil/core';
import {
  GenericWorkflow,
  WorkflowStatus,
} from '../../../models/workflow.model';

@Component({
  tag: 'sgc-workflow-steps',
  styleUrl: 'sgc-workflow-steps.css',
  shadow: true,
})
export class SgcWorkflowSteps {
  @Prop()
  workflow!: GenericWorkflow;

  @Prop()
  isReadOnly!: boolean;

  private modalRef?: HTMLSgcModalElement;

  @Event({ eventName: 'manualStatusChange', composed: true })
  changeStatus: EventEmitter<void>;

  @Event({ eventName: 'changeRequest', composed: true })
  requestChanges: EventEmitter<void>;

  @Event({ eventName: 'reviewRequest', composed: true })
  requestReview: EventEmitter<void>;

  @Event({ eventName: 'reviewFinish', composed: true })
  finishReview: EventEmitter<void>;

  private openDialog(
    dialogName: string,
    eventName: string,
    evntEmitter: EventEmitter,
  ) {
    if (this.modalRef) {
      this.modalRef.innerHTML = '';
      const dialog = document.createElement(dialogName);
      dialog.addEventListener('closeDialog', () => {
        this.modalRef.isopen = false;
      });
      dialog.addEventListener(eventName, () => {
        evntEmitter.emit();
        this.modalRef.isopen = false;
      });
      this.modalRef.appendChild(dialog);
      this.modalRef.isopen = true;
    }
  }

  private openStatusChangeDialog = () => {
    this.openDialog(
      'sgc-change-status-dialog',
      'changeStatus',
      this.changeStatus,
    );
  };

  private openRequestChangesDialog = () => {
    this.openDialog(
      'sgc-request-changes-dialog',
      'requestChanges',
      this.requestChanges,
    );
  };

  private openRequestReviewDialog = () => {
    this.openDialog(
      'sgc-request-review-dialog',
      'requestReview',
      this.requestReview,
    );
  };

  private openFinishReviewDialog = () => {
    this.openDialog(
      'sgc-finish-review-dialog',
      'finishReview',
      this.finishReview,
    );
  };

  render() {
    return (
      <Host>
        <h2 part="heading">
          <sgc-translate ns="workflow">attributes.status</sgc-translate>
        </h2>
        <ul>
          <li>
            <sgc-workflow-step
              workflow={this.workflow}
              status={WorkflowStatus.Draft}
            ></sgc-workflow-step>
          </li>
          <div class="connector" aria-hidden="true"></div>
          <li>
            <sgc-workflow-step
              workflow={this.workflow}
              status={WorkflowStatus.InReview}
            ></sgc-workflow-step>
          </li>
          <div class="connector" aria-hidden="true"></div>
          <li>
            <sgc-workflow-step
              workflow={this.workflow}
              status={WorkflowStatus.Reviewed}
            ></sgc-workflow-step>
          </li>
        </ul>

        {this.isReadOnly || this.renderActions()}
        <sgc-modal ref={(el) => (this.modalRef = el)}></sgc-modal>
      </Host>
    );
  }

  private renderActions = () => (
    <div class="actions">
      {this.workflow.status === WorkflowStatus.Draft || [
        <sgc-button
          color="secondary"
          onButtonClick={this.openStatusChangeDialog}
        >
          <sgc-translate ns="workflow">actions.changeStatus</sgc-translate>
          <sgc-icon name="edit"></sgc-icon>
        </sgc-button>,
        <sgc-button
          color="secondary"
          onButtonClick={this.openRequestChangesDialog}
        >
          <sgc-translate ns="workflow">actions.requestChanges</sgc-translate>
          <sgc-icon name="close"></sgc-icon>
        </sgc-button>,
      ]}
      {this.workflow.status === WorkflowStatus.Draft && (
        <sgc-button
          color="primary"
          onButtonClick={this.openRequestReviewDialog}
        >
          <sgc-translate ns="workflow">actions.requestReview</sgc-translate>
          <sgc-icon name="chevronRight"></sgc-icon>
        </sgc-button>
      )}
      {this.workflow.status === WorkflowStatus.InReview && (
        <sgc-button color="primary" onButtonClick={this.openFinishReviewDialog}>
          <sgc-translate ns="workflow">actions.finishReview</sgc-translate>
          <sgc-icon name="chevronRight"></sgc-icon>
        </sgc-button>
      )}
    </div>
  );
}
