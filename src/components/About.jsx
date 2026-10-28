import { Users, Target, Eye, HeartHandshake, MapPin, FileText, CheckCircle2 } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext.jsx';
import { SITE, mapsSearchLink } from '../config.js';
import { Reveal, SectionHeader } from './ui.jsx';

const ICONS = [Users, Target, Eye, HeartHandshake];

function AboutVisual() {
  const { t, lang } = useLang();
  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-navy-900 p-6 shadow-lift sm:p-8">
        <div className="bg-grid-light absolute inset-0" aria-hidden="true" />
        <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-gold-400/15 blur-2xl" aria-hidden="true" />
        <div className="relative">
          {/* Stacked documents illustration */}
          <div className="relative mx-auto h-56 max-w-xs sm:h-64" aria-hidden="true">
            <div className="absolute inset-x-6 top-6 h-48 rotate-[-6deg] rounded-2xl bg-white/10 sm:h-56" />
            <div className="absolute inset-x-3 top-3 h-48 rotate-[3deg] rounded-2xl bg-white/20 sm:h-56" />
            <div className="absolute inset-0 h-48 rounded-2xl bg-white p-5 shadow-xl sm:h-56">
              <div className="flex items-center justify-between">
                <img src="logo-160.webp" alt="" width="40" height="40" className="h-10 w-10 rounded-md" loading="lazy" />
                <FileText className="h-5 w-5 text-navy-300" />
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-2 w-3/4 rounded bg-navy-100" />
                <div className="h-2 w-full rounded bg-slate-100" />
                <div className="h-2 w-5/6 rounded bg-slate-100" />
                <div className="h-2 w-2/3 rounded bg-slate-100" />
              </div>
              <div className="mt-5 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="h-4 w-4" /> {lang === 'bn' ? 'যাচাইকৃত ও প্রস্তুত' : 'Reviewed & ready'}
              </div>
            </div>
          </div>

          <a
            href={mapsSearchLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold-400/20 text-gold-300"><MapPin className="h-5 w-5" /></span>
            <span>
              <span className="block text-sm font-semibold text-white">{t.about.officeLabel}</span>
              <span className="mt-0.5 block text-sm leading-relaxed text-navy-100">{SITE.address[lang]}</span>
            </span>
          </a>
          <p className="mt-3 text-xs leading-relaxed text-navy-200">{t.about.hoursNote}</p>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const { t } = useLang();
  return (
    <section id="about" className="section bg-white" aria-labelledby="about-title">
      <div className="container-site grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal className="order-2 lg:order-1 lg:sticky lg:top-28">
          <AboutVisual />
        </Reveal>
        <div className="order-1 lg:order-2">
          <SectionHeader id="about-title" eyebrow={t.about.eyebrow} title={t.about.title} />
          <Reveal delay={80}>
            <p className="lead mt-5">{t.about.lead}</p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {t.about.items.map((it, i) => {
              const Icon = ICONS[i];
              return (
                <Reveal key={it.t} delay={i * 70} className="card group p-5 transition hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-lift">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-50 text-navy-700 transition group-hover:bg-navy-700 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-[1.05rem] font-semibold text-navy-900">{it.t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{it.d}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
