import { Component, Host, h, Prop } from '@stencil/core';
import { Workflow, WorkflowStatus } from '../../../models/workflow.model';

@Component({
  tag: 'sgc-workflow-publication',
  styleUrl: 'sgc-workflow-publication.css',
  shadow: true,
})
export class SgcWorkflowPublication {
  @Prop()
  workflow!: Workflow;

  @Prop()
  isReadOnly!: boolean;

  readonly render = () => (
    <Host>
      <h2 part="heading">
        <sgc-translate ns="workflow">other.publication</sgc-translate>
      </h2>

      <sgc-workflow-step
        workflow={this.workflow}
        status={WorkflowStatus.Published}
      ></sgc-workflow-step>

      {this.workflow.status !== WorkflowStatus.Published &&
        !this.isReadOnly && (
          <sgc-button color="primary">
            <sgc-translate ns="workflow">actions.publish</sgc-translate>
            <sgc-icon name="chevronRight"></sgc-icon>
          </sgc-button>
        )}
    </Host>
  );
}
