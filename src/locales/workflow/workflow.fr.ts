import type { WorkflowTranslations } from './index';

export default {
  attributes: {
    status: 'Statut',
    assignee: 'Personne assignée',
  },
  status: {
    Draft: 'Draft',
    InReview: 'En révision',
    Reviewed: 'Révisé',
    Published: 'Publié',
    notPublished: 'Non publié',
  },
  actions: {
    changeStatus: 'Modifier le statut manuellement',
    requestReview: 'Demander une révision',
    requestChanges: 'Demander des modifications',
    requestedChanges: 'Modifications demandées',
    finishReview: 'Terminer la révision',
    assign: 'Attribuer une nouvelle personne',
    publish: 'Publier',
    forward: 'Transférer',
  },
  tabs: {
    history: 'Chronologie',
    review: 'Revue',
    approval: 'Approbation',
  },
  history: {
    created: '{{ status }} créé',
    statusChanged: 'Statut modifié de {{ from }} à {{ to }}',
    assigneeChanged: '{{ item }} assigné à {{ assignee }}',
  },
  selection: {
    tabHeading: 'Onglet',
    reviewedLabel: 'Révisé',
    publishedLabel: 'Approuvé',
  },
  other: {
    publication: 'Publication',
    deletedUserName: 'Utilisateur supprimé',
    assignee: 'Destinataire',
    comment: 'Commentaire',
    placeholder: 'Espace réservé',
    publishHint:
      'Avec cette action, tous les onglets marqués dans l’onglet d’approbation seront publiés.',
  },
} satisfies WorkflowTranslations;
