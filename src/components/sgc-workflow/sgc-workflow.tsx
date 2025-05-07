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

  @Event({ eventName: 'workflowReviewChange', composed: true })
  reviewChangeEvent: EventEmitter<SgcWorkflowSelectionChangeEventDetails>;

  @Event({ eventName: 'workflowApprovalChange', composed: true })
  approvalChangeEvent: EventEmitter<SgcWorkflowSelectionChangeEventDetails>;

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
    </Host>
  );

  private renderStatus = () => (
    <div class="status">
      <sgc-workflow-steps
        class="panel"
        workflow={this.workflow}
        isReadOnly={this.isReadOnly}
      ></sgc-workflow-steps>
      {this.shouldShowAssignee ? (
        <sgc-workflow-assignee
          class="panel"
          workflow={this.workflow}
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
