import type { WorkflowTranslations } from './index';

export default {
  attributes: {
    status: 'FR Status',
    assignee: 'FR Zugewiesene Person',
  },
  status: {
    Draft: 'FR Draft',
    InReview: 'FR Review',
    Reviewed: 'FR Reviewed',
    Published: 'FR Published',
    notPublished: 'FR Not published',
  },
  actions: {
    changeStatus: 'FR Status manuell ändern',
    requestReview: 'FR Review anfordern',
    requestChanges: 'FR Änderungen anfordern',
    requestedChanges: 'FR Änderungen angefordert',
    finishReview: 'FR Review abschliessen',
    assign: 'FR Neue Person zuweisen',
    publish: 'FR Publish',
    forward: 'FR Weiterleiten',
  },
  tabs: {
    history: 'FR Verlauf',
    review: 'FR Review',
    approval: 'FR Freigabe',
  },
  history: {
    created: 'FR {{ status }} erstellt',
    statusChanged: 'FR Status von {{ from }} zu {{ to }} geändert',
    assigneeChanged: 'FR {{ item }} {{ assignee }} zugewiesen',
  },
  selection: {
    tabHeading: 'FR Tab',
    reviewedLabel: 'FR Reviewed',
    publishedLabel: 'FR Approved',
  },
  other: {
    publication: 'FR Publikation',
    deletedUserName: 'FR gelöschter Benutzer',
    assignee: 'FR Empfänger:in',
    comment: 'FR Kommentar',
    placeholder: 'FR Platzhalter',
    publishHint:
      'FR Mit dieser Aktion werden alle im Freigabe-Tab markierten Tabs veröffentlicht.',
  },
} satisfies WorkflowTranslations;
