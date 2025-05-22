import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
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

  private modalRef?: HTMLSgcModalElement;

  @Event({ eventName: 'publish', composed: true })
  publishEvent: EventEmitter<void>;

  private openPublishDialog = () => {
    if (this.modalRef) {
      this.modalRef.innerHTML = '';
      const publishDialog = document.createElement('sgc-publish-dialog');
      publishDialog.addEventListener('closeDialog', () => {
        this.modalRef.isopen = false;
      });
      publishDialog.addEventListener('publish', () => {
        this.publishEvent.emit();
        this.modalRef.isopen = false;
      });
      this.modalRef.appendChild(publishDialog);
      this.modalRef.isopen = true;
    }
  };

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
          <sgc-button color="primary" onButtonClick={this.openPublishDialog}>
            <sgc-translate ns="workflow">actions.publish</sgc-translate>
            <sgc-icon name="chevronRight"></sgc-icon>
          </sgc-button>
        )}
      <sgc-modal ref={(el) => (this.modalRef = el)}></sgc-modal>
    </Host>
  );
}
