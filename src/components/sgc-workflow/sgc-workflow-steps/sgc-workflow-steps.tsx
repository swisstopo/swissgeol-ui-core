import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
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
  canChangeStatus!: boolean;

  @Event({ eventName: 'sgcOpenChangeStatusDialog', composed: true })
  openChangeStatusDialogEvent: EventEmitter<void>;

  @Event({ eventName: 'sgcOpenRequestChangesDialog', composed: true })
  openRequestChangesDialogEvent: EventEmitter<void>;

  @Event({ eventName: 'sgcOpenRequestReviewDialog', composed: true })
  openRequestReviewDialogEvent: EventEmitter<null>;

  @Event({ eventName: 'sgcOpenFinishReviewDialog', composed: true })
  openFinishReviewDialogEvent: EventEmitter<void>;

  private get shouldShowChangeStatusButton(): boolean {
    return (
      this.canChangeStatus && this.workflow.status !== WorkflowStatus.Draft
    );
  }

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
        {this.renderActions()}
      </Host>
    );
  }

  private readonly renderActions = () => (
    <div class="actions">
      {this.shouldShowChangeStatusButton && (
        <sgc-button
          color="secondary"
          onButtonClick={() => this.openChangeStatusDialogEvent.emit()}
        >
          <sgc-translate key="changeStatus" ns="workflow">
            actions.changeStatus
          </sgc-translate>
          <sgc-icon name="edit"></sgc-icon>
        </sgc-button>
      )}
      {this.workflow.status !== WorkflowStatus.Draft &&
        this.canChangeStatus && (
          <sgc-button
            color="secondary"
            onButtonClick={() => this.openRequestChangesDialogEvent.emit()}
          >
            <sgc-translate key="requestChanges" ns="workflow">
              actions.requestChanges
            </sgc-translate>
            <sgc-icon name="cross"></sgc-icon>
          </sgc-button>
        )}
      {this.workflow.status === WorkflowStatus.Draft && (
        <sgc-button
          color="primary"
          onButtonClick={() => this.openRequestReviewDialogEvent.emit()}
        >
          <sgc-translate key="requestReview" ns="workflow">
            actions.requestReview
          </sgc-translate>
          <sgc-icon name="chevronRight"></sgc-icon>
        </sgc-button>
      )}
      {this.workflow.status === WorkflowStatus.InReview &&
        this.canChangeStatus && (
          <sgc-button
            color="primary"
            onButtonClick={() => this.openFinishReviewDialogEvent.emit()}
          >
            <sgc-translate key="finishReview" ns="workflow">
              actions.finishReview
            </sgc-translate>
            <sgc-icon name="chevronRight"></sgc-icon>
          </sgc-button>
        )}
    </div>
  );
}
