import type { WorkflowTranslations } from './index';

export default {
  attributes: {
    status: 'Status',
    assignee: 'Assignee',
  },
  status: {
    Draft: 'Draft',
    InReview: 'In review',
    Reviewed: 'Reviewed',
    Published: 'Published',
    notPublished: 'Not published',
  },
  actions: {
    changeStatus: 'Change status manually',
    requestReview: 'Request review',
    requestChanges: 'Request changes',
    requestedChanges: 'Changes requested',
    finishReview: 'Complete review',
    assign: 'Assign new person',
    publish: 'Publish',
    forward: 'Forward',
  },
  tabs: {
    history: 'History',
    review: 'Review',
    approval: 'Approval',
  },
  history: {
    created: '{{ status }} created',
    statusChanged: 'Status changed from {{ from }} to {{ to }}',
    assigneeChanged: '{{ item }} assigned to {{ assignee }}',
  },
  selection: {
    tabHeading: 'Tab',
    reviewedLabel: 'Reviewed',
    publishedLabel: 'Approved',
  },
  other: {
    publication: 'Publication',
    deletedUserName: 'Deleted user',
    assignee: 'Recipient',
    comment: 'Comment',
    placeholder: 'Placeholder',
    publishHint:
      'With this action, all tabs marked in the approval tab will be published.',
  },
} satisfies WorkflowTranslations;
