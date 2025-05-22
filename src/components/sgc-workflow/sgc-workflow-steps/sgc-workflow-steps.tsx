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

  @Event({ eventName: 'initializeChangeStatus', composed: true })
  initializeChangeStatusEvent: EventEmitter<void>;

  @Event({ eventName: 'initializeRequestChanges', composed: true })
  initializeRequestChangesEvent: EventEmitter<void>;

  @Event({ eventName: 'initializeRequestReview', composed: true })
  initializeRequestReviewEvent: EventEmitter<null>;

  @Event({ eventName: 'initializeFinishReview', composed: true })
  initializeFinishReviewEvent: EventEmitter<void>;

  private initializeStatusChange = () => {
    this.initializeChangeStatusEvent.emit();
  };

  private initializeRequestChanges = () => {
    this.initializeRequestChangesEvent.emit();
  };

  private initializeRequestReview = () => {
    this.initializeRequestReviewEvent.emit();
  };

  private initializeFinishReview = () => {
    this.initializeFinishReviewEvent.emit();
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
      </Host>
    );
  }

  private renderActions = () => (
    <div class="actions">
      {this.workflow.status === WorkflowStatus.Draft || [
        <sgc-button
          color="secondary"
          onButtonClick={this.initializeStatusChange}
        >
          <sgc-translate ns="workflow">actions.changeStatus</sgc-translate>
          <sgc-icon name="edit"></sgc-icon>
        </sgc-button>,
        <sgc-button
          color="secondary"
          onButtonClick={this.initializeRequestChanges}
        >
          <sgc-translate ns="workflow">actions.requestChanges</sgc-translate>
          <sgc-icon name="close"></sgc-icon>
        </sgc-button>,
      ]}
      {this.workflow.status === WorkflowStatus.Draft && (
        <sgc-button
          color="primary"
          onButtonClick={this.initializeRequestReview}
        >
          <sgc-translate ns="workflow">actions.requestReview</sgc-translate>
          <sgc-icon name="chevronRight"></sgc-icon>
        </sgc-button>
      )}
      {this.workflow.status === WorkflowStatus.InReview && (
        <sgc-button color="primary" onButtonClick={this.initializeFinishReview}>
          <sgc-translate ns="workflow">actions.finishReview</sgc-translate>
          <sgc-icon name="chevronRight"></sgc-icon>
        </sgc-button>
      )}
    </div>
  );
}
