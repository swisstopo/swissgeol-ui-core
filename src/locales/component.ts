import { forceUpdate } from '@stencil/core';
import { i18n } from './i18n';

const DISCONNECT_KEY = Symbol('i18n/disconnect');

export interface OnLanguageChange {
  onLanguageChange(): void;
}

export const registerI18n = (componentClass: { prototype: object }): void => {
  const connectedBackup = componentClass.prototype['connectedCallback'] as
    | (() => void)
    | undefined;

  componentClass.prototype['connectedCallback'] = function () {
    this[DISCONNECT_KEY] = i18n.onLanguageChange(() => {
      this['onLanguageChange']?.();
      forceUpdate(this);
    });
    const result = connectedBackup?.apply(this);
    this['onLanguageChange']?.();
    return result;
  };

  const disconnectedBackup = componentClass.prototype[
    'disconnectedCallback'
  ] as (() => void) | undefined;

  componentClass.prototype['disconnectedCallback'] = function () {
    this[DISCONNECT_KEY]();
    delete this[DISCONNECT_KEY];
    return disconnectedBackup?.apply(this);
  };
};
