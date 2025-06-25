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
  WorkflowChange,
  WorkflowStatus,
} from '../../../../models/workflow.model';
import {
  getRoleForStatus,
  getRoleIndex,
  SimpleUser,
} from '../../../../models/user.model';
import { Id } from '../../../../models/base/id';
import { LocalDate } from '../../../../models/base/local-date';
import {
  SgcSelectWorkflowAssigneeChangeEvent,
  SgcSelectWorkflowStatusChangeEvent,
} from '../sgc-request-review-dialog/sgc-request-review-dialog';
import styles from './sgc-change-status-dialog.css';
import { i18n } from '../../../../locales/i18n';

@Component({
  tag: 'sgc-change-status-dialog',
  styles,
  shadow: true,
})
export class SgcChangeStatusDialog {
  @Prop() workflow: GenericWorkflow;

  @Prop() availableAssignees: SimpleUser[] = [];

  @State() comment: string | null = null;

  @State() newAssignee?: Id<SimpleUser>;

  @State() newStatus?: WorkflowStatus;
  @Event({ eventName: 'sgcCloseDialog', composed: true })
  closeEvent: EventEmitter<void>;

  @Event({ eventName: 'sgcChangeStatus', composed: true })
  statusChangeEvent: EventEmitter<WorkflowChange>;

  private assignees: { id: Id<SimpleUser>; fullName: string }[] = [];

  private statusLabels: { key: WorkflowStatus; translation: string }[] = [];

  @Watch('availableAssignees')
  handleAvailableAssigneesChange() {
    this.updateAssigneesByNewStatus();
  }

  @Watch('newStatus')
  handleNewStatusChange() {
    this.updateAssigneesByNewStatus();
  }

  connectedCallback() {
    this.handleAvailableAssigneesChange();
  }

  componentWillLoad() {
    this.statusLabels = Object.values(WorkflowStatus)
      .map((status) => ({
        key: status,
        translation: i18n.t('workflow', `status.${status}`),
      }))
      .filter(
        (status) =>
          getRoleIndex(getRoleForStatus(status.key)) <=
            getRoleIndex(getRoleForStatus(this.workflow.status)) &&
          status.key !== WorkflowStatus.Published,
      );
  }

  get isButtonDisabled(): boolean {
    return (
      !this.newStatus ||
      ((this.newStatus === WorkflowStatus.Draft ||
        this.newStatus === WorkflowStatus.InReview) &&
        !this.newAssignee)
    );
  }

  updateAssigneesByNewStatus() {
    this.assignees = this.availableAssignees
      .filter(
        (assignee) =>
          getRoleIndex(assignee.role) >=
          getRoleIndex(getRoleForStatus(this.newStatus)),
      )
      .map((assignee) => ({
        id: assignee.id,
        fullName: `${assignee.firstName} ${assignee.lastName} (${assignee.role})`,
      }));
  }

  private readonly handleWorkflowStatusChange = () => {
    const workflowChange: WorkflowChange = {
      comment: this.comment,
      createdAt: LocalDate.fromDate(new Date()),
      fromStatus: this.workflow.status,
      toStatus: this.newStatus,
      fromAssignee: this.workflow.assignee,
      toAssignee: this.availableAssignees.find(
        (assignee) => assignee.id === this.newAssignee,
      ),
      creator: this.workflow.creator,
      hasRequestedChanges: false,
    };
    this.statusChangeEvent.emit(workflowChange);
  };

  private handleStatusSelectionChange(
    event: SgcSelectWorkflowStatusChangeEvent,
  ) {
    this.newStatus = event.detail[0];
    const newAssignee = this.availableAssignees.find(
      (assignee) => assignee.id === this.newAssignee,
    );
    if (
      newAssignee &&
      getRoleIndex(getRoleForStatus(this.newStatus)) <
        getRoleIndex(newAssignee.role)
    ) {
      this.newAssignee = undefined;
    }
  }

  render() {
    return (
      <sgc-modal-wrapper>
        <div slot="header">
          <sgc-translate ns="workflow">actions.changeStatus</sgc-translate>
        </div>
        <div slot="content">
          <sgc-form-item>
            <sgc-translate slot="label" ns="workflow">
              attributes.status
            </sgc-translate>
            <sgc-icon name="required" slot="icon"></sgc-icon>
            <sgc-select
              values={this.statusLabels}
              bindKey="key"
              bindLabel="translation"
              onSelectionChanged={(event) =>
                this.handleStatusSelectionChange(
                  event as unknown as SgcSelectWorkflowStatusChangeEvent,
                )
              }
            ></sgc-select>
          </sgc-form-item>
          <sgc-form-item>
            <sgc-translate slot="label" ns="workflow">
              other.assignee
            </sgc-translate>
            <sgc-icon
              name={
                this.newStatus === 'Draft' || this.newStatus === 'InReview'
                  ? 'required'
                  : 'optional'
              }
              slot="icon"
            ></sgc-icon>
            <sgc-select
              disabled={!this.newStatus}
              values={this.assignees}
              initialKeys={this.newAssignee ? [this.newAssignee] : []}
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
            isDisabled={this.isButtonDisabled}
            onButtonClick={() => this.handleWorkflowStatusChange()}
          >
            <sgc-translate ns="workflow">actions.changeStatus</sgc-translate>
            <sgc-icon name="edit"></sgc-icon>
          </sgc-button>
        </div>
      </sgc-modal-wrapper>
    );
  }
}
