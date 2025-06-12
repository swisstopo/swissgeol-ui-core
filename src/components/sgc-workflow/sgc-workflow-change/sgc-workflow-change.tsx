import { Component, h, Prop, Watch } from '@stencil/core';
import {
  GenericWorkflow,
  WorkflowChange,
} from '../../../models/workflow.model';
import { OnLanguageChange, registerI18n } from '../../../locales/component';
import { i18n } from '../../../locales/i18n';
import { SwissgeolItem } from '../../../models/user.model';

@Component({
  tag: 'sgc-workflow-change',
  styleUrl: 'sgc-workflow-change.css',
  shadow: true,
})
export class SgcWorkflowChange implements OnLanguageChange {
  @Prop()
  workflow!: GenericWorkflow;

  @Prop()
  change!: WorkflowChange;

  @Prop()
  item!: SwissgeolItem;

  private statusMutationHtml: string | null;
  private assigneeMutationHtml: string | null;

  @Watch('change')
  onLanguageChange(): void {
    this.statusMutationHtml = this.makeStatusMutationHtml();
    this.assigneeMutationHtml = this.makeAssigneeMutationHtml();
  }

  private makeStatusMutationHtml(): string | null {
    const { fromStatus, toStatus } = this.change;
    if (fromStatus === toStatus) {
      return null;
    }
    const from = i18n.t('workflow', `status.${fromStatus}`);
    const to = i18n.t('workflow', `status.${toStatus}`);
    return i18n.t('workflow', 'history.statusChanged', {
      from: `<span class="highlight">${from}</span>`,
      to: `<span class="highlight">${to}</span>`,
    });
  }

  private makeAssigneeMutationHtml(): string | null {
    const { fromAssignee, toAssignee } = this.change;
    if (fromAssignee?.id === toAssignee?.id) {
      return null;
    }
    const assignee =
      toAssignee === null
        ? i18n.t('workflow', 'other.deletedUserName')
        : `${toAssignee.firstName} ${toAssignee.lastName}`;
    return i18n.t('workflow', 'history.assigneeChanged', {
      item: this.item,
      assignee: `<span class="highlight">${assignee}</span>`,
    });
  }

  readonly render = () => (
    <sgc-workflow-change-template
      creator={this.change.creator}
      createdAt={this.change.createdAt}
    >
      {this.statusMutationHtml && (
        <li slot="mutations" innerHTML={this.statusMutationHtml}></li>
      )}
      {this.assigneeMutationHtml && (
        <li slot="mutations" innerHTML={this.assigneeMutationHtml}></li>
      )}
      {this.change.comment && (
        <div slot="body" class="comment">
          {this.change.comment}
        </div>
      )}
    </sgc-workflow-change-template>
  );
}

registerI18n(SgcWorkflowChange);
