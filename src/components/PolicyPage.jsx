import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext.jsx';
import { POLICIES, POLICY_UPDATED } from '../data/policies.js';
import { SITE, mailLink } from '../config.js';

export default function PolicyPage({ kind }) {
  const { t, lang } = useLang();
  const p = POLICIES[kind][lang];

  useEffect(() => {
    document.title = `${p.title} | Clear Tax BD`;
    window.scrollTo(0, 0);
    return () => { document.title = 'Clear Tax BD | Professional Income Tax & Tax Consultancy Services'; };
  }, [p.title]);

  return (
    <section className="bg-paper py-12 sm:py-16" aria-labelledby="policy-title">
      <div className="container-site max-w-3xl">
        <a href="#home" className="inline-flex items-center gap-2 text-sm font-semibold text-navy-700 hover:text-navy-900">
          <ArrowLeft className="h-4 w-4" /> {t.misc.backHome}
        </a>
        <article className="card mt-6 p-6 sm:p-10">
          <p className="inline-block rounded-full bg-gold-300/30 px-3 py-1 text-xs font-semibold text-gold-600">{t.misc.draftNote}</p>
          <h1 id="policy-title" className="h2 mt-4">{p.title}</h1>
          <p className="mt-2 text-sm text-slate-500">{t.misc.lastUpdated}: {POLICY_UPDATED}</p>
          <p className="lead mt-6">{p.intro}</p>
          {p.sections.map(([h, body]) => (
            <div key={h} className="mt-7">
              <h2 className="text-lg font-semibold text-navy-900">{h}</h2>
              <p className="mt-2 leading-relaxed text-slate-700">{body}</p>
            </div>
          ))}
          <div className="mt-10 rounded-2xl bg-navy-50 p-5 text-sm leading-relaxed text-navy-900">
            <p className="font-semibold">Clear Tax BD</p>
            <p>{SITE.address[lang]}</p>
            <p>WhatsApp: {SITE.phoneDisplay} · <a className="underline" href={mailLink()}>{SITE.email}</a></p>
          </div>
        </article>
      </div>
    </section>
  );
}
