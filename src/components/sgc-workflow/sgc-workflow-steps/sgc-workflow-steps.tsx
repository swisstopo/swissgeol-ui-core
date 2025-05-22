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
  requestChange: EventEmitter<void>;

  @Event({ eventName: 'reviewRequest', composed: true })
  requestReview: EventEmitter<void>;

  @Event({ eventName: 'reviewFinish', composed: true })
  finishReview: EventEmitter<void>;

  private emitChangeStatus = () => {
    if (this.modalRef) {
      this.modalRef.innerHTML = '';
      const requestReview = document.createElement('sgc-request-review');
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

  private emitRequestChange = () => {
    if (this.modalRef) {
      this.modalRef.innerHTML = '';
      const requestReview = document.createElement('sgc-request-review');
      this.modalRef.appendChild(requestReview); // Slots will be distributed
      this.modalRef.isopen = true;
    }
    this.requestChange.emit();
  };

  private emitRequestReview = () => {
    if (this.modalRef) {
      this.modalRef.innerHTML =
        '<sgc-workflow-publication class="panel" workflow={this.workflow} isReadOnly={this.isReadOnly} ></sgc-workflow-publication>';
      this.modalRef.isopen = true;
    }
    this.requestReview.emit();
  };

  private emitFinishReview = () => {
    this.finishReview.emit();
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
        <sgc-button color="secondary" onClick={this.emitChangeStatus}>
          <sgc-translate ns="workflow">actions.changeStatus</sgc-translate>
          <sgc-icon name="edit"></sgc-icon>
        </sgc-button>,
        <sgc-button color="secondary" onButtonClick={this.emitRequestChange}>
          <sgc-translate ns="workflow">actions.requestChanges</sgc-translate>
          <sgc-icon name="close"></sgc-icon>
        </sgc-button>,
      ]}
      {this.workflow.status === WorkflowStatus.Draft && (
        <sgc-button color="primary" onButtonClick={this.emitRequestReview}>
          <sgc-translate ns="workflow">actions.requestReview</sgc-translate>
          <sgc-icon name="chevronRight"></sgc-icon>
        </sgc-button>
      )}
      {this.workflow.status === WorkflowStatus.InReview && (
        <sgc-button color="primary" onButtonClick={this.emitFinishReview}>
          <sgc-translate ns="workflow">actions.finishReview</sgc-translate>
          <sgc-icon name="chevronRight"></sgc-icon>
        </sgc-button>
      )}
    </div>
  );
}
