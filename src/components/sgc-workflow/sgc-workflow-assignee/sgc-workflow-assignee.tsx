import { Component, Event, h, Host, Prop } from '@stencil/core';
import { GenericWorkflow } from '../../../models/workflow.model';
import { EventEmitter } from '@angular/core';

@Component({
  tag: 'sgc-workflow-assignee',
  styleUrl: 'sgc-workflow-assignee.css',
  shadow: true,
})
export class SgcWorkflowAssignee {
  @Prop()
  workflow!: GenericWorkflow;

  @Prop()
  isEditable!: boolean;

  @Event({ eventName: 'sgcOpenAssignPersonDialog', composed: true })
  openAssignPersonDialogEvent!: EventEmitter<void>;

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
      {this.isEditable && (
        <sgc-button
          color="secondary"
          onButtonClick={() => this.openAssignPersonDialogEvent.emit()}
        >
          <sgc-translate ns="workflow">actions.assign</sgc-translate>
          <sgc-icon name="assign"></sgc-icon>
        </sgc-button>
      )}
    </Host>
  );
}
