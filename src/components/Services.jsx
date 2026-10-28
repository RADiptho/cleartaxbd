import { User, Building2, BriefcaseBusiness, GraduationCap, IdCard, MessagesSquare } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext.jsx';
import { CONTENT, SERVICE_IDS } from '../i18n/content.js';
import { waLink } from '../config.js';
import { Reveal, SectionHeader, WhatsAppIcon } from './ui.jsx';

export const SERVICE_ICONS = { personal: User, company: Building2, professional: BriefcaseBusiness, visa: GraduationCap, etin: IdCard, advisory: MessagesSquare };

/** WhatsApp message for a specific service, in the visitor's language */
export function serviceMessage(lang, id) {
  const c = CONTENT[lang].services;
  return c.waMsg(c.items[id].t);
}

export default function Services() {
  const { t, lang } = useLang();
  return (
    <section id="services" className="section relative bg-paper" aria-labelledby="services-title">
      <div className="container-site">
        <SectionHeader id="services-title" center eyebrow={t.services.eyebrow} title={t.services.title} lead={t.services.lead} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_IDS.map((id, i) => {
            const Icon = SERVICE_ICONS[id];
            const s = t.services.items[id];
            return (
              <Reveal
                key={id}
                as="article"
                delay={(i % 3) * 80}
                className="card group relative flex flex-col overflow-hidden p-6 transition duration-300 hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift sm:p-7"
              >
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-navy-700 via-sky-400 to-gold-400 transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy-700 text-white shadow-soft transition group-hover:bg-navy-800">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="font-display text-3xl font-semibold text-navy-100" aria-hidden="true">0{i + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold leading-snug text-navy-900">{s.t}</h3>
                <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-slate-600">{s.d}</p>
                <a
                  href={waLink(serviceMessage(lang, id))}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-service={id}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl border border-navy-200 px-4 py-2.5 text-sm font-semibold text-navy-800 transition hover:border-[#1f9d55] hover:bg-[#1f9d55] hover:text-white focus-visible:ring-4 focus-visible:ring-sky-300"
                  aria-label={`${t.services.cta}: ${s.t} (WhatsApp)`}
                >
                  <WhatsAppIcon className="h-[18px] w-[18px]" /> {t.services.cta}
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
