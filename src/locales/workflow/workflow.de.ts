export default {
  attributes: {
    status: 'Status',
    assignee: 'Zugewiesene Person',
  },
  status: {
    Draft: 'Draft',
    InReview: 'Review',
    Reviewed: 'Reviewed',
    Published: 'Veröffentlicht',
    notPublished: 'Nicht Veröffentlicht',
  },
  actions: {
    changeStatus: 'Status manuell ändern',
    requestReview: 'Review anfordern',
    requestChanges: 'Änderungen anfordern',
    finishReview: 'Review abschliessen',
    assign: 'Neue Person zuweisen',
    publish: 'Publish',
  },
  tabs: {
    history: 'Verlauf',
    review: 'Review',
    approval: 'Freigabe',
  },
  history: {
    created: '{{ status }} erstellt',
    statusChanged: 'Status von {{ from }} zu {{ to }} geändert',
    assigneeChanged: 'Asset {{ assignee }} zugewiesen',
  },
  selection: {
    tabHeading: 'Tab',
    reviewedLabel: 'Reviewed',
    publishedLabel: 'Published',
  },
  other: {
    publication: 'Publikation',
    deletedUserName: 'gelöschter Benutzer',
  },
};
