import {
  Component,
  Event,
  EventEmitter,
  h,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import {
  GenericWorkflow,
  GenericWorkflowSelection,
  WorkflowStatus,
} from '../../../models/workflow.model';

@Component({
  tag: 'sgc-workflow-selection',
  styleUrl: 'sgc-workflow-selection.css',
  shadow: true,
})
export class SgcWorkflowSelection {
  @Prop()
  workflow!: GenericWorkflow;

  @Prop()
  entries!: Array<SgcWorkflowSelectionEntry<string>>;

  @Prop()
  selection!: GenericWorkflowSelection;

  @Prop()
  base: GenericWorkflowSelection | null = null;

  @Prop()
  isReadOnly!: boolean;

  @Event({ eventName: 'workflowSelectionChange', composed: true })
  changeEvent: EventEmitter<SgcWorkflowSelectionChangeEventDetails>;

  @State()
  fields!: GenericWorkflowSelection;

  private timeoutForSubmit: NodeJS.Timeout | null = null;

  connectedCallback(): void {
    this.handleSelectionChange();
  }

  @Watch('selection')
  handleSelectionChange(): void {
    this.fields = { ...this.selection };
  }

  private get isFullyDisabled(): boolean {
    return !this.hasCorrectStatus || this.isReadOnly;
  }

  private get hasCorrectStatus(): boolean {
    return this.base === null
      ? this.workflow.status === WorkflowStatus.InReview
      : this.workflow.status === WorkflowStatus.Reviewed;
  }

  private updateField(field: string, value: boolean): void {
    this.fields = { ...this.fields, [field]: value };
    if (this.timeoutForSubmit !== null) {
      clearTimeout(this.timeoutForSubmit);
    }
    this.timeoutForSubmit = setTimeout(this.submit, 500);
  }

  private readonly submit = (): void => {
    this.timeoutForSubmit = null;
    const patch: Partial<GenericWorkflowSelection> = {};
    for (const [key, isActive] of Object.entries(this.fields)) {
      if (isActive !== this.selection[key]) {
        patch[key] = isActive;
      }
    }
    this.changeEvent.emit({ changes: patch });
  };

  readonly render = () => (
    <sgc-checklist>
      <sgc-translate ns="workflow" slot="name">
        selection.tabHeading
      </sgc-translate>
      <sgc-translate ns="workflow" slot="label">
        {this.base === null
          ? 'selection.reviewedLabel'
          : 'selection.publishedLabel'}
      </sgc-translate>
      {this.entries.map((entry) =>
        'fields' in entry ? this.renderGroup(entry) : this.renderField(entry),
      )}
    </sgc-checklist>
  );

  private readonly renderGroup = (group: SgcWorkflowSelectionGroup<string>) => (
    <sgc-checklist name={group.name()}>
      {group.fields.map(this.renderField)}
    </sgc-checklist>
  );

  private readonly renderField = (field: SgcWorkflowSelectionField<string>) => (
    <sgc-checklist
      name={field.name(field.field)}
      value={this.fields[field.field]}
      isDisabled={
        this.isFullyDisabled || (this.base !== null && !this.base[field.field])
      }
      onChecklistChange={(event) => this.updateField(field.field, event.detail)}
    ></sgc-checklist>
  );
}

export type SgcWorkflowSelectionChangeEvent =
  CustomEvent<SgcWorkflowSelectionChangeEventDetails>;

export interface SgcWorkflowSelectionChangeEventDetails {
  changes: Partial<GenericWorkflowSelection>;
}

export type SgcWorkflowSelectionEntry<TField extends string> =
  | SgcWorkflowSelectionGroup<TField>
  | SgcWorkflowSelectionField<TField>;

export interface SgcWorkflowSelectionGroup<TField extends string> {
  name: () => string;
  fields: Array<SgcWorkflowSelectionField<TField>>;
}

export interface SgcWorkflowSelectionField<TField extends string> {
  name: (field: TField) => string;
  field: TField;
}
