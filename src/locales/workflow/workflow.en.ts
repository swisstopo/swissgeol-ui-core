import type { WorkflowTranslations } from './index';

export default {
  attributes: {
    status: 'EN Status',
    assignee: 'EN Zugewiesene Person',
  },
  status: {
    Draft: 'EN Draft',
    InReview: 'EN Review',
    Reviewed: 'EN Reviewed',
    Published: 'EN Published',
    notPublished: 'EN Not published',
  },
  actions: {
    changeStatus: 'EN Status manuell ändern',
    requestReview: 'EN Review anfordern',
    requestChanges: 'EN Änderungen anfordern',
    requestedChanges: 'EN Änderungen angefordert',
    finishReview: 'EN Review abschliessen',
    assign: 'EN Neue Person zuweisen',
    publish: 'EN Publish',
    forward: 'EN Weiterleiten',
  },
  tabs: {
    history: 'EN Verlauf',
    review: 'EN Review',
    approval: 'EN Freigabe',
  },
  history: {
    created: 'EN {{ status }} erstellt',
    statusChanged: 'EN Status von {{ from }} zu {{ to }} geändert',
    assigneeChanged: 'EN {{ item }} {{ assignee }} zugewiesen',
  },
  selection: {
    tabHeading: 'EN Tab',
    reviewedLabel: 'Reviewed',
    publishedLabel: 'Approved',
  },
  other: {
    publication: 'EN Publikation',
    deletedUserName: 'EN gelöschter Benutzer',
    assignee: 'EN Empfänger:in',
    comment: 'EN Kommentar',
    placeholder: 'EN Platzhalter',
    publishHint:
      'EN Mit dieser Aktion werden alle im Freigabe-Tab markierten Tabs veröffentlicht.',
  },
} satisfies WorkflowTranslations;
