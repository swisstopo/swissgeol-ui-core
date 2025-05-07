import { SimpleUser } from './user.model';
import { LocalDate } from './base/local-date';
import { Id } from './base/id';
import { Workgroup } from './workgroup.model';

export interface Workflow {
  id: Id<this>;
  hasRequestedChanges: boolean;
  changes: WorkflowChange[];
  review: WorkflowSelection;
  approval: WorkflowSelection;
  status: WorkflowStatus;
  assignee: SimpleUser | null;
  creator: SimpleUser | null;
  createdAt: LocalDate;
  workgroupId: Id<Workgroup>;
}

export interface WorkflowSelection {
  general: boolean;
  normalFiles: boolean;
  legalFiles: boolean;
  authors: boolean;
  initiators: boolean;
  suppliers: boolean;
  references: boolean;
  geometries: boolean;
  legacy: boolean;
}

export interface WorkflowChange {
  comment: string | null;
  creator: SimpleUser | null;
  fromAssignee: SimpleUser | null;
  toAssignee: SimpleUser | null;
  fromStatus: WorkflowStatus;
  toStatus: WorkflowStatus;
  createdAt: LocalDate;
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
