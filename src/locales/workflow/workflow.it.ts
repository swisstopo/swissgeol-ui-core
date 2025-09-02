import type { WorkflowTranslations } from './index';

export default {
  attributes: {
    status: 'Stato',
    assignee: 'Persona assegnata',
  },
  status: {
    Draft: 'Bozza',
    InReview: 'In revisione',
    Reviewed: 'Revisionato',
    Published: 'Pubblicato',
    notPublished: 'Non pubblicato',
  },
  actions: {
    changeStatus: 'Modifica stato manualmente',
    requestReview: 'Richiedi revisione',
    requestChanges: 'Richiedi modifiche',
    requestedChanges: 'Modifiche richieste',
    finishReview: 'Completa revisione',
    assign: 'Assegna nuova persona',
    publish: 'Pubblica',
    forward: 'Inoltra',
  },
  tabs: {
    history: 'Cronologia',
    review: 'Revisione',
    approval: 'Approvazione',
  },
  history: {
    created: '{{ status }} creato',
    statusChanged: 'Stato modificato da {{ from }} a {{ to }}',
    assigneeChanged: '{{ item }} assegnato a {{ assignee }}',
  },
  selection: {
    tabHeading: 'Scheda',
    reviewedLabel: 'Revisionato',
    publishedLabel: 'Approvato',
  },
  other: {
    publication: 'Pubblicazione',
    deletedUserName: 'Utente eliminato',
    assignee: 'Destinatario/a',
    comment: 'Commento',
    placeholder: 'Segnaposto',
    publishHint:
      'Con questa azione, tutte le schede contrassegnate nella scheda di approvazione saranno pubblicate.',
  },
} satisfies WorkflowTranslations;
