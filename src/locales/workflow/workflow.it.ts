import type { WorkflowTranslations } from './index';

export default {
  attributes: {
    status: 'IT Status',
    assignee: 'IT Zugewiesene Person',
  },
  status: {
    Draft: 'IT Draft',
    InReview: 'IT Review',
    Reviewed: 'IT Reviewed',
    Published: 'IT Published',
    notPublished: 'IT Not published',
  },
  actions: {
    changeStatus: 'IT Status manuell ändern',
    requestReview: 'IT Review anfordern',
    requestChanges: 'IT Änderungen anfordern',
    requestedChanges: 'IT Änderungen angefordert',
    finishReview: 'IT Review abschliessen',
    assign: 'IT Neue Person zuweisen',
    publish: 'IT Publish',
    forward: 'IT Weiterleiten',
  },
  tabs: {
    history: 'IT Verlauf',
    review: 'IT Review',
    approval: 'IT Freigabe',
  },
  history: {
    created: 'IT {{ status }} erstellt',
    statusChanged: 'IT Status von {{ from }} zu {{ to }} geändert',
    assigneeChanged: 'IT {{ item }} {{ assignee }} zugewiesen',
  },
  selection: {
    tabHeading: 'IT Tab',
    reviewedLabel: 'IT Reviewed',
    publishedLabel: 'IT Approved',
  },
  other: {
    publication: 'IT Publikation',
    deletedUserName: 'IT gelöschter Benutzer',
    assignee: 'IT Empfänger:in',
    comment: 'IT Kommentar',
    placeholder: 'IT Platzhalter',
    publishHint:
      'IT Mit dieser Aktion werden alle im Freigabe-Tab markierten Tabs veröffentlicht.',
  },
} satisfies WorkflowTranslations;
