export default {
  attributes: {
    status: 'Status',
    assignee: 'Zugewiesene Person',
  },
  status: {
    Draft: 'Draft',
    InReview: 'Review',
    Reviewed: 'Reviewed',
    Published: 'Published',
    notPublished: 'Not published',
  },
  actions: {
    changeStatus: 'Status manuell ändern',
    requestReview: 'Review anfordern',
    requestChanges: 'Änderungen anfordern',
    requestedChanges: 'Änderungen angefordert',
    finishReview: 'Review abschliessen',
    assign: 'Neue Person zuweisen',
    publish: 'Publish',
    forward: 'Weiterleiten',
  },
  tabs: {
    history: 'Verlauf',
    review: 'Review',
    approval: 'Freigabe',
  },
  history: {
    created: '{{ status }} erstellt',
    statusChanged: 'Status von {{ from }} zu {{ to }} geändert',
    assigneeChanged: '{{ item }} {{ assignee }} zugewiesen',
  },
  selection: {
    tabHeading: 'Tab',
    reviewedLabel: 'Reviewed',
    publishedLabel: 'Freigegeben',
  },
  other: {
    publication: 'Publikation',
    deletedUserName: 'gelöschter Benutzer',
    assignee: 'Empfänger:in',
    comment: 'Kommentar',
    placeholder: 'Platzhalter',
    publishHint:
      'Mit dieser Aktion werden alle im Freigabe-Tab markierten Tabs veröffentlicht.',
  },
};
