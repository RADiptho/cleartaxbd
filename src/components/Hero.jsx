import { ArrowRight, ShieldCheck, Languages, Calculator, CheckCircle2, BriefcaseBusiness, Lock, Users, HeartHandshake } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext.jsx';
import { waLink } from '../config.js';
import { WhatsAppIcon } from './ui.jsx';

const Rise = ({ delay = 0, className = '', children }) => (
  <div className={`hero-rise ${className}`} style={{ animationDelay: `${delay}ms` }}>{children}</div>
);

const TRUST_ICONS = [BriefcaseBusiness, Lock, Users, HeartHandshake];

function HeroVisual() {
  const { t } = useLang();
  return (
    <div className="relative mx-auto w-full max-w-[460px] lg:max-w-none">
      {/* Glow */}
      <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-sky-300/30 via-navy-100/40 to-gold-300/30 blur-2xl" aria-hidden="true" />

      {/* Main navy panel */}
      <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 p-5 shadow-lift sm:p-7">
        <div className="bg-grid-light absolute inset-0 opacity-70" aria-hidden="true" />
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-sky-400/20 blur-2xl" aria-hidden="true" />
        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white p-1.5 shadow-md">
              <img src="logo-160.webp" alt="" width="48" height="48" className="h-12 w-12 rounded-md" />
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-white">Clear Tax BD</p>
              <p className="text-xs font-medium tracking-wide text-gold-300">Your Taxes, Our Expertise</p>
            </div>
          </div>

          {/* Document card */}
          <div className="mt-6 rounded-2xl bg-white p-5 shadow-xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-slate-400">ITR</p>
                <p className="mt-0.5 font-display text-lg font-semibold text-navy-900">{t.hero.cardTitle}</p>
                <p className="text-xs text-slate-500">{t.hero.cardSub}</p>
              </div>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-700">
                <ShieldCheck className="h-5 w-5" />
              </span>
            </div>
            <ul className="mt-4 space-y-2.5">
              {t.hero.cardSteps.map((s, i) => (
                <li key={s} className="flex items-center gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className={`h-[18px] w-[18px] shrink-0 ${i < 2 ? 'text-emerald-600' : 'text-gold-500'}`} />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-navy-600 to-sky-400" />
              </div>
              <p className="mt-2 text-xs font-medium text-slate-500">{t.hero.cardStatus}</p>
            </div>
          </div>

          {/* Lines suggestive of a form */}
          <div className="mt-5 grid grid-cols-3 gap-3" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="h-1.5 w-2/3 rounded bg-white/30" />
                <div className="mt-2 h-1.5 w-full rounded bg-white/15" />
                <div className="mt-1.5 h-1.5 w-4/5 rounded bg-white/15" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating chips */}
      <a
        href="#calculator"
        className="float-y absolute -left-3 -bottom-5 hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-lift transition hover:border-navy-300 sm:flex lg:-left-10"
      >
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-300/40 text-gold-600"><Calculator className="h-5 w-5" /></span>
        <span>
          <span className="block text-sm font-semibold text-navy-900">{t.hero.calcChip}</span>
          <span className="block text-xs text-slate-500">{t.hero.calcChipSub} →</span>
        </span>
      </a>
      <div className="absolute -right-2 top-8 hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-navy-800 shadow-soft sm:flex lg:-right-6">
        <Languages className="h-4 w-4 text-sky-500" /> {t.hero.chipBilingual}
      </div>
    </div>
  );
}

export default function Hero() {
  const { t, lang } = useLang();
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-white via-paper to-navy-50/60">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" aria-hidden="true" />
      <div className="container-site relative flex flex-col lg:min-h-[calc(100svh-72px)]">
        <div className="grid flex-1 items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.08fr_1fr] lg:gap-14 lg:py-10">
          <div>
            <Rise>
              <p className="eyebrow">{t.hero.eyebrow}</p>
            </Rise>
            <Rise delay={60}>
              <h1 className={`mt-4 font-display font-semibold text-navy-950 ${lang === 'bn' ? 'text-[2rem] leading-[1.35] sm:text-[2.6rem] lg:text-[2.85rem]' : 'text-[2.35rem] leading-[1.08] tracking-[-0.02em] sm:text-[3.1rem] lg:text-[3.45rem]'}`}>
                {t.hero.title}
              </h1>
            </Rise>
            <Rise delay={120}>
              <p lang={lang === 'bn' ? 'en' : 'bn'} className={`mt-4 border-l-2 border-gold-500 pl-4 font-medium text-navy-700 ${lang === 'bn' ? 'font-display text-lg' : 'text-lg sm:text-xl'}`}>
                {t.hero.titleAlt}
              </p>
            </Rise>
            <Rise delay={180}>
              <p className="lead mt-5 max-w-xl">{t.hero.desc}</p>
            </Rise>
            <Rise delay={240} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={waLink(t.hero.waMsg)} target="_blank" rel="noopener noreferrer" className="btn-wa !px-6 !py-3.5 text-base">
                <WhatsAppIcon className="h-5 w-5" /> {t.hero.primary}
              </a>
              <a href="#services" className="btn-outline !px-6 !py-3.5 text-base">
                {t.hero.secondary} <ArrowRight className="h-4 w-4" />
              </a>
            </Rise>
            <Rise delay={300}>
              <p className="mt-5 flex items-center gap-2 text-sm text-slate-500">
                <ShieldCheck className="h-4 w-4 text-navy-500" /> {t.hero.chipSecure} · {t.hero.chipBilingual}
              </p>
            </Rise>
          </div>
          <Rise delay={150}>
            <HeroVisual />
          </Rise>
        </div>

        {/* Trust strip */}
        <Rise delay={350} className="pb-10 lg:pb-8">
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-navy-100 bg-navy-100 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
            {t.trust.map((item, i) => {
              const Icon = TRUST_ICONS[i];
              return (
                <li key={item.t} className="flex items-center gap-3.5 bg-white px-5 py-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-700"><Icon className="h-5 w-5" /></span>
                  <span>
                    <span className="block text-[0.93rem] font-semibold text-navy-900">{item.t}</span>
                    <span className="block text-xs text-slate-500">{item.d}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </Rise>
      </div>
    </section>
  );
}
