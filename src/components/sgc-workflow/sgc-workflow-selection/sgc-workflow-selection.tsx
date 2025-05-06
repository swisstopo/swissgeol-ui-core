import {
  Component,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import {
  Workflow,
  WorkflowSelection,
  WorkflowStatus,
} from '../../../models/workflow.model';

@Component({
  tag: 'sgc-workflow-selection',
  styleUrl: 'sgc-workflow-selection.css',
  shadow: true,
})
export class SgcWorkflowSelection {
  @Prop()
  workflow!: Workflow;

  @Prop()
  selection!: 'review' | 'approval';

  @Prop()
  isReadOnly!: boolean;

  @Event({ eventName: 'workflowReviewChange', composed: true, bubbles: true })
  reviewChangeEvent: EventEmitter<SgcWorkflowSelectionChangeEventDetails>;

  @Event({ eventName: 'workflowApprovalChange', composed: true, bubbles: true })
  approvalChangeEvent: EventEmitter<SgcWorkflowSelectionChangeEventDetails>;

  @State()
  fields!: WorkflowSelection;

  baseFields: WorkflowSelection | null = null;

  private isFullyDisabled = false;

  private timeoutForSubmit: NodeJS.Timeout | null = null;

  connectedCallback(): void {
    this.handleWorkflowChange();
  }

  @Watch('workflow')
  handleWorkflowChange(): void {
    this.isFullyDisabled = false;
    this.baseFields = null;
    this.fields = { ...this.workflow[this.selection] };
    if (!this.hasCorrectStatus || this.isReadOnly) {
      this.isFullyDisabled = true;
    } else if (this.selection === 'approval') {
      this.configureBaseFields();
    }
  }

  private configureBaseFields(): void {
    const { review } = this.workflow;
    this.baseFields = {} as WorkflowSelection;
    for (const [key, isReviewed] of Object.entries(review)) {
      this.baseFields[key] = isReviewed;
    }
  }

  private get hasCorrectStatus(): boolean {
    switch (this.selection) {
      case 'review':
        return this.workflow.status === WorkflowStatus.InReview;
      case 'approval':
        return this.workflow.status === WorkflowStatus.Reviewed;
    }
  }

  private updateField(field: keyof WorkflowSelection, value: boolean): void {
    this.fields = { ...this.fields, [field]: value };
    if (this.timeoutForSubmit !== null) {
      clearTimeout(this.timeoutForSubmit);
    }
    this.timeoutForSubmit = setTimeout(this.submit, 500);
  }

  private readonly submit = (): void => {
    this.timeoutForSubmit = null;
    const patch: Partial<WorkflowSelection> = {};
    for (const [key, value] of Object.entries(this.fields)) {
      if (value !== this.workflow[this.selection][key]) {
        patch[key] = value;
      }
    }
    const emitter =
      this.selection === 'review'
        ? this.reviewChangeEvent
        : this.approvalChangeEvent;
    emitter.emit({
      changes: patch,
    });
  };

  readonly render = () => (
    <Host>
      <sgc-checklist>
        <sgc-translate ns="workflow" slot="title">
          selection.tabHeading
        </sgc-translate>
        <sgc-translate ns="workflow" slot="label">
          selection.reviewedLabel
        </sgc-translate>
        {this.renderItem('general')}
        <sgc-checklist>
          <sgc-translate ns="workflow" slot="title">
            selection.categories.files
          </sgc-translate>
          {this.renderItem('normalFiles')}
          {this.renderItem('legalFiles')}
        </sgc-checklist>
        <sgc-checklist>
          <sgc-translate ns="workflow" slot="title">
            selection.categories.contacts
          </sgc-translate>
          {this.renderItem('initiators')}
          {this.renderItem('suppliers')}
          {this.renderItem('authors')}
        </sgc-checklist>
        {this.renderItem('references')}
        {this.renderItem('geometries')}
        {this.renderItem('legacy')}
      </sgc-checklist>
    </Host>
  );

  private renderItem = (field: keyof WorkflowSelection) => (
    <sgc-checklist
      isDisabled={
        this.isFullyDisabled ||
        (this.baseFields !== null && !this.baseFields[field])
      }
      value={this.fields[field]}
      onChecklistChange={(event) => this.updateField(field, event.detail)}
    >
      <sgc-translate ns="workflow" slot="title">
        attributes.selection.{field}
      </sgc-translate>
    </sgc-checklist>
  );
}

export interface SgcWorkflowSelectionChangeEventDetails {
  changes: Partial<WorkflowSelection>;
}
export type SgcWorkflowSelectionChangeEvent =
  CustomEvent<SgcWorkflowSelectionChangeEventDetails>;
