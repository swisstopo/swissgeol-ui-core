import { Component, h, Host, Prop } from '@stencil/core';
import { Workflow, WorkflowStatus } from '../../../models/workflow.model';

@Component({
  tag: 'sgc-workflow-steps',
  styleUrl: 'sgc-workflow-steps.css',
  shadow: true,
})
export class SgcWorkflowSteps {
  @Prop()
  workflow!: Workflow;

  @Prop()
  isReadOnly!: boolean;

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
        <sgc-button color="secondary">
          <sgc-translate ns="workflow">actions.changeStatus</sgc-translate>
          <sgc-icon name="edit"></sgc-icon>
        </sgc-button>,
        <sgc-button color="secondary">
          <sgc-translate ns="workflow">actions.requestChanges</sgc-translate>
          <sgc-icon name="close"></sgc-icon>
        </sgc-button>,
      ]}
      {this.workflow.status === WorkflowStatus.Draft && (
        <sgc-button color="primary">
          <sgc-translate ns="workflow">actions.requestReview</sgc-translate>
          <sgc-icon name="chevronRight"></sgc-icon>
        </sgc-button>
      )}
      {this.workflow.status === WorkflowStatus.InReview && (
        <sgc-button color="primary">
          <sgc-translate ns="workflow">actions.finishReview</sgc-translate>
          <sgc-icon name="chevronRight"></sgc-icon>
        </sgc-button>
      )}
    </div>
  );
}
