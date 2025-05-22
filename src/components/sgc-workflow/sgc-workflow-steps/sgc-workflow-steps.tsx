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

  private openStatusChangeDialog = () => {
    if (this.modalRef) {
      this.modalRef.innerHTML = '';
      const requestReview = document.createElement('sgc-change-status-dialog');
      requestReview.addEventListener('closeDialog', () => {
        this.modalRef.isopen = false;
      });
      requestReview.addEventListener('changeStatus', () => {
        this.changeStatus.emit();
        this.modalRef.isopen = false;
      });
      this.modalRef.appendChild(requestReview);
      this.modalRef.isopen = true;
    }
  };

  private openRequestChangesDialog = () => {
    if (this.modalRef) {
      this.modalRef.innerHTML = '';
      const requestChanges = document.createElement(
        'sgc-request-changes-dialog',
      );
      requestChanges.addEventListener('closeDialog', () => {
        this.modalRef.isopen = false;
      });
      requestChanges.addEventListener('requestChanges', () => {
        this.requestChanges.emit();
        this.modalRef.isopen = false;
      });
      this.modalRef.appendChild(requestChanges);
      this.modalRef.isopen = true;
    }
  };

  private openRequestReviewDialog = () => {
    if (this.modalRef) {
      this.modalRef.innerHTML = '';
      const requestReview = document.createElement('sgc-request-review-dialog');
      requestReview.addEventListener('closeDialog', () => {
        this.modalRef.isopen = false;
      });
      requestReview.addEventListener('requestReview', () => {
        this.requestChanges.emit();
        this.modalRef.isopen = false;
      });
      this.modalRef.appendChild(requestReview);
      this.modalRef.isopen = true;
    }
  };

  private openFinishReviewDialog = () => {
    if (this.modalRef) {
      this.modalRef.innerHTML = '';
      const finisheReview = document.createElement('sgc-finish-review-dialog');
      finisheReview.addEventListener('closeDialog', () => {
        this.modalRef.isopen = false;
      });
      finisheReview.addEventListener('finishReview', () => {
        this.finishReview.emit();
        this.modalRef.isopen = false;
      });
      this.modalRef.appendChild(finisheReview);
      this.modalRef.isopen = true;
    }
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
