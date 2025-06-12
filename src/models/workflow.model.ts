import { SimpleUser } from './user.model';
import { LocalDate } from './base/local-date';
import { Id } from './base/id';

export interface GenericWorkflow {
  id: Id<GenericWorkflow>;
  hasRequestedChanges: boolean;
  status: WorkflowStatus;
  changes: WorkflowChange[];
  assignee: SimpleUser | null;
  creator: SimpleUser | null;
  createdAt: LocalDate;
  workgroupId: Id<unknown>;
}

export type GenericWorkflowSelection = {
  [K in string]: boolean;
};

export interface WorkflowChange {
  comment: string | null;
  creator: SimpleUser | null;
  fromAssignee: SimpleUser | null;
  toAssignee: SimpleUser | null;
  fromStatus: WorkflowStatus;
  toStatus: WorkflowStatus;
  createdAt: LocalDate;
  hasRequestedChanges?: boolean;
}

export enum WorkflowStatus {
  Draft = 'Draft',
  InReview = 'InReview',
  Reviewed = 'Reviewed',
  Published = 'Published',
}

export const getWorkflowStatusIndex = (status: WorkflowStatus): number => {
  switch (status) {
    case WorkflowStatus.Draft:
      return 0;
    case WorkflowStatus.InReview:
      return 1;
    case WorkflowStatus.Reviewed:
      return 2;
    case WorkflowStatus.Published:
      return 3;
  }
};
