import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import styles from './sgc-workflow.css';
import {
  GenericWorkflow,
  GenericWorkflowSelection,
  WorkflowChange,
  WorkflowStatus,
} from '../../models/workflow.model';
import {
  SgcWorkflowSelectionChangeEventDetails,
  SgcWorkflowSelectionEntry,
} from './sgc-workflow-selection/sgc-workflow-selection';
import { openDialog } from '../sgc-modal/sgc-modal.helper';
import { SimpleUser } from '../../components';
import { SwissgeolItem } from '../../models/user.model';

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
  availableAssignees: SimpleUser[] = [];

  @Prop()
  isReadOnly!: boolean;

  @Prop()
  canChangeStatus!: boolean;

  /**
   * If false, no actions on the workflow can be performed. All Buttons are hidden.
   */
  @Prop()
  isEditable!: boolean;

  @Prop()
  item: SwissgeolItem = 'Asset';

  private modalRef?: HTMLSgcModalElement;

  @Event({ eventName: 'sgcWorkflowReviewChange', composed: true })
  workflowReviewChangeEvent: EventEmitter<SgcWorkflowSelectionChangeEventDetails>;

  @Event({ eventName: 'sgcWorkflowApprovalChange', composed: true })
  workflowApprovalChangeEvent: EventEmitter<SgcWorkflowSelectionChangeEventDetails>;

  @Event({ eventName: 'sgcWorkflowChange', composed: true })
  workflowChangeEvent: EventEmitter<SgcWorkflowChangeEventDetail>;

  @Event({ eventName: 'sgcWorkflowPublish', composed: true })
  workflowPublishEvent: EventEmitter<SgcWorkflowChangeEventDetail>;

  private readonly openDialog = (
    dialogName: string,
    eventName: string,
    eventEmitter: EventEmitter<SgcWorkflowChangeEventDetail>,
  ) => {
    openDialog(
      this.modalRef,
      dialogName,
      [
        {
          eventName: eventName,
          callback: (event: CustomEvent<WorkflowChange>) => {
            eventEmitter.emit({ changes: event.detail });
            this.modalRef.isOpen = false;
          },
        },
      ],
      {
        isPersistent: false,
        workflow: this.workflow,
        availableAssignees: this.availableAssignees,
      },
    );
  };

  private readonly openChangeStatusDialog = () => {
    this.openDialog(
      'sgc-change-status-dialog',
      'sgcChangeStatus',
      this.workflowChangeEvent,
    );
  };

  private readonly openRequestChangesDialog = () => {
    this.openDialog(
      'sgc-request-changes-dialog',
      'sgcRequestChanges',
      this.workflowChangeEvent,
    );
  };

  private readonly openRequestReviewDialog = () => {
    this.openDialog(
      'sgc-request-review-dialog',
      'sgcRequestReview',
      this.workflowChangeEvent,
    );
  };

  private readonly openFinishReviewDialog = () => {
    this.openDialog(
      'sgc-finish-review-dialog',
      'sgcFinishReview',
      this.workflowChangeEvent,
    );
  };

  private readonly openAssignPersonDialog = () => {
    this.openDialog(
      'sgc-assign-person-dialog',
      'sgcAssignPerson',
      this.workflowChangeEvent,
    );
  };

  private readonly openPublishDialog = () => {
    this.openDialog(
      'sgc-publish-dialog',
      'sgcPublish',
      this.workflowPublishEvent,
    );
  };

  private get shouldShowAssignee(): boolean {
    return (
      this.workflow.status === WorkflowStatus.Draft ||
      this.workflow.status === WorkflowStatus.InReview
    );
  }

  private get isPublishDisabled(): boolean {
    return Object.values(this.approval).every((value) => !value);
  }

  readonly render = () => (
    <Host>
      {this.renderStatus()}
      {this.renderTabs()}
      <sgc-modal ref={(el) => (this.modalRef = el)}></sgc-modal>
    </Host>
  );

  private readonly renderStatus = () => (
    <div class="status">
      <sgc-workflow-steps
        class="panel"
        workflow={this.workflow}
        isEditable={this.isEditable}
        canChangeStatus={this.canChangeStatus}
        onSgcOpenChangeStatusDialog={this.openChangeStatusDialog}
        onSgcOpenRequestChangesDialog={this.openRequestChangesDialog}
        onSgcOpenRequestReviewDialog={this.openRequestReviewDialog}
        onSgcOpenFinishReviewDialog={this.openFinishReviewDialog}
      ></sgc-workflow-steps>
      {this.shouldShowAssignee ? (
        <sgc-workflow-assignee
          class="panel"
          workflow={this.workflow}
          isEditable={this.isEditable}
          onSgcOpenAssignPersonDialog={this.openAssignPersonDialog}
        ></sgc-workflow-assignee>
      ) : (
        <sgc-workflow-publication
          class="panel"
          isDisabled={this.isPublishDisabled}
          workflow={this.workflow}
          isReadOnly={this.isReadOnly || !this.isEditable}
          onSgcOpenPublicationDialog={this.openPublishDialog}
        ></sgc-workflow-publication>
      )}
    </div>
  );

  private readonly renderTabs = () => (
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
        <sgc-workflow-history
          workflow={this.workflow}
          item={this.item}
        ></sgc-workflow-history>
      </div>
      <div slot="panels" role="tabpanel" id="review">
        <sgc-workflow-selection
          workflow={this.workflow}
          entries={this.selection}
          selection={this.review}
          isReadOnly={this.isReadOnly || !this.isEditable}
          onWorkflowSelectionChange={(event) =>
            this.workflowReviewChangeEvent.emit(event.detail)
          }
        ></sgc-workflow-selection>
      </div>
      <div slot="panels" role="tabpanel" id="approval">
        <sgc-workflow-selection
          workflow={this.workflow}
          entries={this.selection}
          selection={this.approval}
          base={this.review}
          isReadOnly={this.isReadOnly || !this.isEditable}
          onWorkflowSelectionChange={(event) =>
            this.workflowApprovalChangeEvent.emit(event.detail)
          }
        ></sgc-workflow-selection>
      </div>
    </sgc-tabs>
  );
}

export type SgcWorkflowChangeEvent = CustomEvent<SgcWorkflowChangeEventDetail>;
export interface SgcWorkflowChangeEventDetail {
  changes: WorkflowChange;
}
