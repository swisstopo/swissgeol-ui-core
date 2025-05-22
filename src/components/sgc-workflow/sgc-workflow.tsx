import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import styles from './sgc-workflow.css';
import {
  GenericWorkflow,
  GenericWorkflowSelection,
  WorkflowStatus,
} from '../../models/workflow.model';
import {
  SgcWorkflowSelectionChangeEventDetails,
  SgcWorkflowSelectionEntry,
} from './sgc-workflow-selection/sgc-workflow-selection';

@Component({
  tag: 'sgc-workflow',
  shadow: true,
  styles,
})
export class SgcWorkflow {
  @Prop()
  workflow!: GenericWorkflow;

  @Prop()
  selection!: Array<SgcWorkflowSelectionEntry<string>>;

  @Prop()
  review!: GenericWorkflowSelection;

  @Prop()
  approval!: GenericWorkflowSelection;

  @Prop()
  isReadOnly!: boolean;

  private modalRef?: HTMLSgcModalElement;

  @Event({ eventName: 'workflowReviewChange', composed: true })
  reviewChangeEvent: EventEmitter<SgcWorkflowSelectionChangeEventDetails>;

  @Event({ eventName: 'workflowApprovalChange', composed: true })
  approvalChangeEvent: EventEmitter<SgcWorkflowSelectionChangeEventDetails>;

  @Event({ eventName: 'assigneeChange', composed: true })
  assigneeChangeEvent: EventEmitter<void>;

  @Event({ eventName: 'statusChange', composed: true })
  statusChangeEvent: EventEmitter<void>;

  @Event({ eventName: 'requestChanges', composed: true })
  requestChangesEvent: EventEmitter<void>;

  @Event({ eventName: 'requestReview', composed: true })
  requestReviewEvent: EventEmitter<null>;

  @Event({ eventName: 'finishReview', composed: true })
  finishReviewEvent: EventEmitter<void>;

  private openDialog(
    dialogName: string,
    eventName: string,
    evntEmitter: EventEmitter,
  ) {
    if (this.modalRef) {
      this.modalRef.innerHTML = '';
      const dialog = document.createElement(dialogName);
      dialog.addEventListener('closeDialog', () => {
        this.modalRef.isopen = false;
      });
      dialog.addEventListener(eventName, () => {
        evntEmitter.emit();
        this.modalRef.isopen = false;
      });
      this.modalRef.appendChild(dialog);
      this.modalRef.isopen = true;
    }
  }

  private openChangeStatusDialog = () => {
    this.openDialog(
      'sgc-change-status-dialog',
      'changeStatus',
      this.statusChangeEvent,
    );
  };

  private openRequestChangesDialog = () => {
    this.openDialog(
      'sgc-request-changes-dialog',
      'requestChanges',
      this.requestChangesEvent,
    );
  };

  private openRequestReviewDialog = () => {
    this.openDialog(
      'sgc-request-review-dialog',
      'requestReview',
      this.requestReviewEvent,
    );
  };

  private openFinishReviewDialog = () => {
    this.openDialog(
      'sgc-finish-review-dialog',
      'finishReview',
      this.finishReviewEvent,
    );
  };

  private openAssignPersonDialog = () => {
    this.openDialog(
      'sgc-assign-person-dialog',
      'assignPerson',
      this.assigneeChangeEvent,
    );
  };

  private get shouldShowAssignee(): boolean {
    return (
      this.workflow.status === WorkflowStatus.Draft ||
      this.workflow.status === WorkflowStatus.InReview
    );
  }

  readonly render = () => (
    <Host>
      {this.renderStatus()}
      {this.renderTabs()}
      <sgc-modal ref={(el) => (this.modalRef = el)}></sgc-modal>
    </Host>
  );

  private renderStatus = () => (
    <div class="status">
      <sgc-workflow-steps
        class="panel"
        workflow={this.workflow}
        isReadOnly={this.isReadOnly}
        onInitializeChangeStatus={this.openChangeStatusDialog}
        onInitializeRequestChanges={this.openRequestChangesDialog}
        onInitializeRequestReview={this.openRequestReviewDialog}
        onInitializeFinishReview={this.openFinishReviewDialog}
      ></sgc-workflow-steps>
      {this.shouldShowAssignee ? (
        <sgc-workflow-assignee
          class="panel"
          workflow={this.workflow}
          onInitializeAssignPerson={this.openAssignPersonDialog}
        ></sgc-workflow-assignee>
      ) : (
        <sgc-workflow-publication
          class="panel"
          workflow={this.workflow}
          isReadOnly={this.isReadOnly}
        ></sgc-workflow-publication>
      )}
    </div>
  );

  private renderTabs = () => (
    <sgc-tabs persistence="hash">
      <sgc-tab panel="history">
        <sgc-translate ns="workflow">tabs.history</sgc-translate>
      </sgc-tab>
      <sgc-tab panel="review">
        <sgc-translate ns="workflow">tabs.review</sgc-translate>
      </sgc-tab>
      <sgc-tab panel="approval">
        <sgc-translate ns="workflow">tabs.approval</sgc-translate>
      </sgc-tab>

      <div slot="panels" role="tabpanel" id="history">
        <sgc-workflow-history workflow={this.workflow}></sgc-workflow-history>
      </div>
      <div slot="panels" role="tabpanel" id="review">
        <sgc-workflow-selection
          workflow={this.workflow}
          entries={this.selection}
          selection={this.review}
          isReadOnly={this.isReadOnly}
          onWorkflowSelectionChange={(event) =>
            this.reviewChangeEvent.emit(event.detail)
          }
        ></sgc-workflow-selection>
      </div>
      <div slot="panels" role="tabpanel" id="approval">
        <sgc-workflow-selection
          workflow={this.workflow}
          entries={this.selection}
          selection={this.approval}
          base={this.review}
          isReadOnly={this.isReadOnly}
          onWorkflowSelectionChange={(event) =>
            this.approvalChangeEvent.emit(event.detail)
          }
        ></sgc-workflow-selection>
      </div>
    </sgc-tabs>
  );
}
