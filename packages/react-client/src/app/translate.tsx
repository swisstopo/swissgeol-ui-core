import { useEffect, useRef } from 'react';
import { Language, SwissgeolCoreI18n } from '@swissgeol/ui-core';
import { SgcTranslate } from '@swissgeol/ui-core-react';

export const Translate = () => {
  const counterRef = useRef(5);
  const counterElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (counterElementRef.current === null) {
        return;
      }
      const { current: value } = counterRef;
      if (value === 1) {
        SwissgeolCoreI18n.setLanguage(Language.French);
        clearInterval(interval);
      }
      counterRef.current -= 1;
      counterElementRef.current.innerHTML = `${counterRef.current}`;
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      Translation:&nbsp;
      <SgcTranslate ns="general">cancel</SgcTranslate>
      &nbsp;(<span ref={counterElementRef}>{counterRef.current}</span>)
    </div>
  );
};
