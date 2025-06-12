import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import {
  GenericWorkflow,
  WorkflowStatus,
} from '../../../models/workflow.model';

@Component({
  tag: 'sgc-workflow-publication',
  styleUrl: 'sgc-workflow-publication.css',
  shadow: true,
})
export class SgcWorkflowPublication {
  @Prop()
  workflow!: GenericWorkflow;

  @Prop()
  isReadOnly!: boolean;

  @Event({ eventName: 'sgcOpenPublicationDialog', composed: true })
  openPublicationDialogEvent: EventEmitter<void>;

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
          <sgc-button
            color="primary"
            onButtonClick={() => this.openPublicationDialogEvent.emit()}
          >
            <sgc-translate ns="workflow">actions.publish</sgc-translate>
            <sgc-icon name="chevronRight"></sgc-icon>
          </sgc-button>
        )}
    </Host>
  );
}
