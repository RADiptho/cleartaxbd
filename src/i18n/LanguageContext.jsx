import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CONTENT } from './content.js';

const LangContext = createContext(null);
const KEY = 'ctbd-lang'; // only the language preference is stored — never personal data

function initialLang() {
  try {
    const q = new URLSearchParams(window.location.search).get('lang');
    if (q === 'bn' || q === 'en') return q;
  } catch { /* ignore */ }
  try {
    const s = window.localStorage.getItem(KEY);
    if (s === 'bn' || s === 'en') return s;
  } catch { /* storage may be blocked */ }
  return 'en';
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try { window.localStorage.setItem(KEY, lang); } catch { /* ignore */ }
  }, [lang]);

  const setLang = useCallback((l) => setLangState(l === 'bn' ? 'bn' : 'en'), []);
  const toggle = useCallback(() => setLangState((l) => (l === 'en' ? 'bn' : 'en')), []);

  const value = useMemo(() => {
    const nf = new Intl.NumberFormat(lang === 'bn' ? 'bn-BD' : 'en-IN', { maximumFractionDigits: 0 });
    return {
      lang,
      setLang,
      toggle,
      t: CONTENT[lang],
      num: (v) => nf.format(Math.round(v || 0)),
      tk: (v) => (lang === 'bn' ? `${nf.format(Math.round(v || 0))} টাকা` : `Tk ${nf.format(Math.round(v || 0))}`),
      pct: (r) => (lang === 'bn' ? `${nf.format(r * 100)}%` : `${Math.round(r * 100)}%`),
    };
  }, [lang, setLang, toggle]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
