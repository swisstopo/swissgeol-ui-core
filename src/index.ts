/**
 * @fileoverview entry point for your component library
 *
 * This is the entry point for your component library. Use this file to export utilities,
 * constants or data structure that accompany your components.
 *
 * DO NOT use this file to export your components. Instead, use the recommended approaches
 * to consume components of this package as outlined in the `README.md`.
 */

export type * from './components.d.ts';

export { i18n as SwissgeolCoreI18n } from './locales/i18n';

export { format } from './utils/utils';

export * from './models/base/id';
export * from './models/base/local-date';
export * from './models/base/language';
export * from './models/user.model';
export * from './models/workflow.model';
