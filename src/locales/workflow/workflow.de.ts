export default {
  attributes: {
    status: 'Status',
    assignee: 'Zugewiesene Person',
    selection: {
      general: 'General',
      normalFiles: 'Normale Dateien',
      legalFiles: 'Rechtliche Einwilligungen',
      initiators: 'Auftraggeber',
      suppliers: 'Einlieferer',
      authors: 'Authoren',
      references: 'Referenzen',
      geometries: 'Geometrien',
      legacy: 'Altdaten',
    },
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
    categories: {
      files: 'Dateien',
      contacts: 'Kontakte',
    },
  },
  other: {
    publication: 'Publikation',
    deletedUserName: 'gelöschter Benutzer',
  },
};
