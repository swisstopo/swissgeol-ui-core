import { GenericWorkflow, SimpleUser } from '../../components';

export type SgcDialogSize = 'small' | 'medium' | 'large';

interface DialogEventConfig {
  eventName: string;
  callback: (payload?: Event) => void;
}

interface DialogOptions {
  isPersistent?: boolean;
  size?: SgcDialogSize;
}

interface WorkflowDialogOptions extends DialogOptions {
  workflow: GenericWorkflow;
  availableAssignees?: SimpleUser[];
}

// Experimental, should not be used in production code
export const openDialog = (
  dialogRef: HTMLSgcModalElement,
  dialogName: string,
  events: DialogEventConfig[],
  options?: WorkflowDialogOptions,
) => {
  dialogRef.innerHTML = '';
  const dialog = document.createElement(dialogName);
  dialog.addEventListener('sgcCloseDialog', () => {
    dialogRef.isOpen = false;
  });
  events.forEach(({ eventName, callback }) => {
    dialog.addEventListener(eventName, callback);
  });
  (dialog as HTMLSgcRequestReviewDialogElement).workflow = options.workflow;
  (dialog as HTMLSgcRequestReviewDialogElement).availableAssignees =
    options.availableAssignees;
  dialogRef.appendChild(dialog);
  dialogRef.isPersistent = options?.isPersistent ?? false;
  dialogRef.isOpen = true;
};
