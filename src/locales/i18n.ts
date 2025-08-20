import { Language } from '../models/base/language';

import workflowDe from './workflow/workflow.de';
import workflowEn from './workflow/workflow.en';
import workflowFr from './workflow/workflow.fr';
import workflowIt from './workflow/workflow.it';
import { DeepPartial } from '../utils/utility-types';
import generalDe from './general/general.de';
import generalEn from './general/general.en';
import generalFr from './general/general.fr';
import generalIt from './general/general.it';

const flatten = <T>(object: T, prefix = ''): Record<string, string> => {
  let paths = {} as Record<string, string>;
  for (const [key, value] of Object.entries(object)) {
    if (typeof value === 'string') {
      paths[`${prefix}${key}`] = value;
    } else {
      paths = { ...paths, ...flatten(value, `${prefix}${key}.`) };
    }
  }
  return paths;
};

const ns = <T>(t: {
  de: T;
  en: DeepPartial<T>;
  fr: DeepPartial<T>;
  it: DeepPartial<T>;
}): Namespace => {
  const de = flatten(t.de);
  return {
    [Language.German]: de,
    [Language.English]: { ...de, ...flatten(t.en) },
    [Language.French]: { ...de, ...flatten(t.fr) },
    [Language.Italian]: { ...de, ...flatten(t.it) },
  };
};

type Namespace = Record<Language, Record<string, string>>;

const namespaces = {
  workflow: ns({
    de: workflowDe,
    en: workflowEn,
    fr: workflowFr,
    it: workflowIt,
  }),
  general: ns({
    de: generalDe,
    en: generalEn,
    fr: generalFr,
    it: generalIt,
  }),
};

type NamespaceMapping = typeof namespaces;
export type NamespaceKey = keyof NamespaceMapping;

class I18n {
  private _language = Language.German;

  private callbacks = new Set<() => void>();

  t<NS extends NamespaceKey>(
    ns: NS,
    key: string,
    params: Record<string, string> = {},
  ): string {
    let value = namespaces[ns]?.[this.language]?.[key];
    if (value === undefined) {
      throw new Error(`unknown translation key: ${ns}:${key}`);
    }
    for (const [paramKey, paramValue] of Object.entries(params)) {
      value = value.replaceAll(`{{ ${paramKey} }}`, paramValue);
    }
    return value;
  }

  get language(): Language {
    return this._language;
  }

  setLanguage(language: Language): void {
    this._language = language;
    for (const callback of this.callbacks) {
      callback();
    }
  }

  onLanguageChange(callback: () => void): () => void {
    this.callbacks.add(callback);
    return () => this.callbacks.delete(callback);
  }
}
export const i18n = new I18n();
