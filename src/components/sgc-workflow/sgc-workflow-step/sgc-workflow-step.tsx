import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import {
  getWorkflowStatusIndex,
  GenericWorkflow,
  WorkflowStatus,
} from '../../../models/workflow.model';
import styles from 'sgc-workflow-step.css';

@Component({
  tag: 'sgc-workflow-step',
  shadow: true,
  styles,
})
export class SgcWorkflowStep {
  @Prop()
  workflow!: GenericWorkflow;

  @Prop()
  status!: WorkflowStatus;

  index!: number;

  @State()
  stage!: Stage;

  @Element()
  element!: HTMLElement;

  private isDone = false;
  private isActive = false;

  connectedCallback(): void {
    this.handleStatusChange();
    this.handleWorkflowChange();
    this.handleStageChange();
  }

  @Watch('status')
  handleStatusChange(): void {
    this.index = getWorkflowStatusIndex(this.status);
  }

  @Watch('workflow')
  handleWorkflowChange(): void {
    this.stage = this.getStageByWorkflow();
  }

  @Watch('stage')
  handleStageChange(): void {
    this.isActive =
      this.stage === Stage.Active ||
      (this.stage === Stage.Done && this.status === WorkflowStatus.Reviewed);
    this.element.classList.toggle('is-active', this.isActive);

    this.isDone =
      this.stage === Stage.Done ||
      (this.stage === Stage.Active && this.status === WorkflowStatus.Published);
    this.element.classList.toggle('is-done', this.isDone);
  }

  private getStageByWorkflow(): Stage {
    const activeIndex = getWorkflowStatusIndex(this.workflow.status);
    if (activeIndex === this.index) {
      return Stage.Active;
    } else if (activeIndex < this.index) {
      return Stage.Inactive;
    } else {
      return Stage.Done;
    }
  }

  render = () => (
    <Host>
      <div class="indicator">{this.renderIndicator()}</div>
      {this.status === WorkflowStatus.Published &&
      this.stage !== Stage.Active ? (
        <sgc-translate ns="workflow">status.notPublished</sgc-translate>
      ) : (
        <sgc-translate ns="workflow">status.{this.status}</sgc-translate>
      )}
    </Host>
  );

  private renderIndicator() {
    if (this.isDone) {
      return <sgc-icon name="checkmark"></sgc-icon>;
    }
    if (this.status === WorkflowStatus.Published) {
      return <sgc-icon name="close"></sgc-icon>;
    }
    return `${this.index + 1}`;
  }
}

export enum Stage {
  Inactive,
  Active,
  Done,
}
