import {
  Component,
  Event,
  EventEmitter,
  h,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { SgcSelectWorkflowAssigneeChangeEvent } from '../sgc-request-review-dialog/sgc-request-review-dialog';
import { Id } from '../../../../models/base/id';
import {
  getRoleForStatus,
  getRoleIndex,
  SimpleUser,
} from '../../../../models/user.model';
import {
  GenericWorkflow,
  WorkflowChange,
} from '../../../../models/workflow.model';
import { LocalDate } from '../../../../models/base/local-date';
import styles from './sgc-assign-person-dialog.css';
import { i18n } from '../../../../locales/i18n';

@Component({
  tag: 'sgc-assign-person-dialog',
  styles,
  shadow: true,
})
export class SgcAssignPersonDialog {
  @Prop() workflow: GenericWorkflow;

  @Prop() availableAssignees: SimpleUser[] = [];

  @State() comment: string | null = null;

  @State() newAssignee?: Id<SimpleUser>;

  @Event({ eventName: 'sgcCloseDialog', composed: true })
  closeEvent: EventEmitter<void>;

  @Event({ eventName: 'sgcAssignPerson', composed: true })
  assignPersonEvent: EventEmitter<WorkflowChange>;

  private assignees: { id: Id<SimpleUser>; fullName: string }[] = [];

  @Watch('availableAssignees')
  handleAvailableAssigneesChange() {
    this.assignees = this.availableAssignees
      .filter(
        (assignee) =>
          getRoleIndex(assignee.role) >=
            getRoleIndex(getRoleForStatus(this.workflow.status)) &&
          assignee.id !== this.workflow.assignee?.id,
      )
      .map((assignee) => ({
        id: assignee.id,
        fullName: `${assignee.firstName} ${assignee.lastName} (${assignee.role})`,
      }));
  }

  connectedCallback() {
    this.handleAvailableAssigneesChange();
  }

  private readonly handleWorkflowStatusChange = () => {
    const workflowChange: WorkflowChange = {
      comment: this.comment,
      createdAt: LocalDate.fromDate(new Date()),
      fromStatus: this.workflow.status,
      toStatus: this.workflow.status,
      fromAssignee: this.workflow.assignee,
      toAssignee: this.availableAssignees.find(
        (assignee) => assignee.id === this.newAssignee,
      ),
      creator: this.workflow.creator,
    };
    this.assignPersonEvent.emit(workflowChange);
  };

  render() {
    return (
      <sgc-modal-wrapper>
        <div slot="header">
          <sgc-translate ns="workflow">actions.assign</sgc-translate>
        </div>
        <div slot="content">
          <sgc-form-item>
            <sgc-translate slot="label" ns="workflow">
              other.assignee
            </sgc-translate>
            <sgc-icon name="required" slot="icon"></sgc-icon>
            <sgc-select
              values={this.assignees}
              bindKey="id"
              bindLabel="fullName"
              onSelectionChanged={(event) =>
                (this.newAssignee = (
                  event as unknown as SgcSelectWorkflowAssigneeChangeEvent
                ).detail[0])
              }
            ></sgc-select>
          </sgc-form-item>
          <sgc-form-item>
            <sgc-translate slot="label" ns="workflow">
              other.comment
            </sgc-translate>
            <sgc-icon name="optional" slot="icon"></sgc-icon>
            <sgc-text-area
              rows={3}
              placeholder={i18n.t('workflow', 'other.placeholder')}
              onValueChanged={(event) => (this.comment = event.detail)}
            ></sgc-text-area>
          </sgc-form-item>
        </div>
        <div slot="footer">
          <sgc-button
            color="secondary"
            onButtonClick={() => this.closeEvent.emit()}
          >
            <sgc-translate ns="general">cancel</sgc-translate>
          </sgc-button>
          <sgc-button
            isDisabled={!this.newAssignee}
            onButtonClick={() => this.handleWorkflowStatusChange()}
          >
            <sgc-translate ns="workflow">actions.assign</sgc-translate>
            <sgc-icon name="assign"></sgc-icon>
          </sgc-button>
        </div>
      </sgc-modal-wrapper>
    );
  }
}
