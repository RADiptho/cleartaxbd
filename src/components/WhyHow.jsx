import { BadgeCheck, Clock, Lock, Scale, UserCheck, Smartphone, MessagesSquare, ClipboardList, FileCheck2, Send } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext.jsx';
import { Reveal, SectionHeader } from './ui.jsx';

const WHY_ICONS = [BadgeCheck, Clock, Lock, Scale, UserCheck, Smartphone];
const STEP_ICONS = [MessagesSquare, ClipboardList, FileCheck2, Send];

export function WhyUs() {
  const { t } = useLang();
  return (
    <section id="why" className="section relative overflow-hidden bg-navy-950 text-white" aria-labelledby="why-title">
      <div className="bg-grid-light absolute inset-0" aria-hidden="true" />
      <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" aria-hidden="true" />
      <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" aria-hidden="true" />
      <div className="container-site relative">
        <SectionHeader id="why-title" light center eyebrow={t.why.eyebrow} title={t.why.title} lead={t.why.lead} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.why.items.map((it, i) => {
            const Icon = WHY_ICONS[i];
            return (
              <Reveal key={it.t} delay={(i % 3) * 80} className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-gold-400/40 hover:bg-white/[0.07]">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-gold-300 to-gold-500 text-navy-950 shadow-lg">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{it.t}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-navy-100">{it.d}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const { t, num } = useLang();
  return (
    <section id="how" className="section bg-white" aria-labelledby="how-title">
      <div className="container-site">
        <SectionHeader id="how-title" center eyebrow={t.how.eyebrow} title={t.how.title} lead={t.how.lead} />
        <ol className="relative mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* connecting line (desktop) */}
          <span className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-0.5 bg-gradient-to-r from-navy-200 via-gold-400 to-navy-200 lg:block" aria-hidden="true" />
          {t.how.steps.map((s, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <Reveal as="li" key={s.t} delay={i * 110} className="relative flex gap-4 lg:flex-col lg:items-center lg:text-center">
                {/* connecting line (mobile/tablet) */}
                {i < 3 && <span className="absolute left-7 top-16 h-[calc(100%-2rem)] w-0.5 bg-navy-100 md:hidden" aria-hidden="true" />}
                <div className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-navy-700 text-white shadow-lift ring-8 ring-white">
                  <Icon className="h-6 w-6" />
                  <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-gold-500 text-xs font-bold text-navy-950">{num(i + 1)}</span>
                </div>
                <div className="lg:mt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-600">{t.how.step} {num(i + 1)}</p>
                  <h3 className="mt-1 text-lg font-semibold text-navy-900">{s.t}</h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-slate-600">{s.d}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
