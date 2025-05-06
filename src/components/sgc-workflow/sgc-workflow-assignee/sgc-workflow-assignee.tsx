import { Component, Host, h, Prop } from '@stencil/core';
import { Workflow } from '../../../models/workflow.model';

@Component({
  tag: 'sgc-workflow-assignee',
  styleUrl: 'sgc-workflow-assignee.css',
  shadow: true,
})
export class SgcWorkflowAssignee {
  @Prop()
  workflow!: Workflow;

  readonly render = () => (
    <Host>
      <h2 part="heading">
        <sgc-translate ns="workflow">attributes.assignee</sgc-translate>
      </h2>
      {this.workflow.assignee !== null && (
        <div class="assignee">
          {this.workflow.assignee.firstName} {this.workflow.assignee.lastName}
        </div>
      )}
      <sgc-button color="secondary">
        <sgc-translate ns="workflow">actions.assign</sgc-translate>
        <sgc-icon name="assign"></sgc-icon>
      </sgc-button>
    </Host>
  );
}
