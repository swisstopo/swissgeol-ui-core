import { Component, h, Host, Prop, Watch } from '@stencil/core';
import {
  GenericWorkflow,
  WorkflowChange,
  WorkflowStatus,
} from '../../../models/workflow.model';
import { i18n } from '../../../locales/i18n';
import { OnLanguageChange, registerI18n } from '../../../locales/component';
import { SwissgeolItem } from '../../../models/user.model';

@Component({
  tag: 'sgc-workflow-history',
  styleUrl: 'sgc-workflow-history.css',
  shadow: true,
})
export class SgcWorkflowHistory implements OnLanguageChange {
  @Prop()
  workflow!: GenericWorkflow;

  @Prop()
  item!: SwissgeolItem;

  changes!: WorkflowChange[];

  firstMutationHtml!: string;

  connectedCallback(): void {
    this.handleWorkflowChange();
  }

  @Watch('workflow')
  handleWorkflowChange(): void {
    this.changes = [...this.workflow.changes].reverse();
  }

  onLanguageChange(): void {
    this.firstMutationHtml = i18n.t('workflow', 'history.created', {
      status: `<span class="highlight">${i18n.t('workflow', `status.${WorkflowStatus.Draft}`)}</span>`,
    });
  }

  readonly render = () => (
    <Host>
      {this.changes.map((change) => (
        <sgc-workflow-change
          key={change.createdAt.toString()}
          workflow={this.workflow}
          item={this.item}
          change={change}
        ></sgc-workflow-change>
      ))}

      <sgc-workflow-change-template
        creator={this.workflow.creator}
        createdAt={this.workflow.createdAt}
      >
        <li slot="mutations" innerHTML={this.firstMutationHtml}></li>
      </sgc-workflow-change-template>
    </Host>
  );
}

registerI18n(SgcWorkflowHistory);
