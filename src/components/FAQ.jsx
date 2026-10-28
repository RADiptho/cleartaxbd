import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext.jsx';
import { Reveal, SectionHeader } from './ui.jsx';

export default function FAQ() {
  const { t } = useLang();
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="section bg-paper" aria-labelledby="faq-title">
      <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader id="faq-title" eyebrow={t.faq.eyebrow} title={t.faq.title} />
          <Reveal delay={80}>
            <a href="#contact" className="btn-outline mt-7">{t.nav.contact}</a>
          </Reveal>
        </div>
        <Reveal className="space-y-3">
          {t.faq.items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.q} className={`rounded-2xl border bg-white transition-shadow ${isOpen ? 'border-navy-200 shadow-soft' : 'border-slate-200'}`}>
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left text-[0.98rem] font-semibold text-navy-900 sm:px-6"
                  >
                    <span>{it.q}</span>
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition ${isOpen ? 'rotate-45 bg-navy-700 text-white' : 'bg-navy-50 text-navy-700'}`}>
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                </h3>
                <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className={`acc-panel ${isOpen ? 'open' : ''}`}>
                  <div>
                    <p className="px-5 pb-5 text-[0.95rem] leading-relaxed text-slate-600 sm:px-6">{it.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
