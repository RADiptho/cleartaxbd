import { Mail, MapPin, Navigation, Phone, ExternalLink } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext.jsx';
import { SITE, mailLink, mapsDirectionsLink, mapsSearchLink, waLink } from '../config.js';
import { Reveal, SectionHeader, WhatsAppIcon } from './ui.jsx';

export default function Contact() {
  const { t, lang } = useLang();
  const c = t.contact;
  const cards = [
    { icon: WhatsAppIcon, label: c.whatsapp, value: SITE.phoneDisplay, href: `tel:${SITE.phoneIntl}`, ext: false },
    { icon: Mail, label: c.email, value: SITE.email, href: mailLink(c.emailSubject), ext: false },
    { icon: MapPin, label: c.office, value: SITE.address[lang], href: mapsSearchLink(), ext: true },
  ];
  return (
    <section id="contact" className="section bg-white" aria-labelledby="contact-title">
      <div className="container-site">
        <SectionHeader id="contact-title" center eyebrow={c.eyebrow} title={c.title} lead={c.lead} />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <Reveal className="card overflow-hidden">
            <div className="flex items-center gap-4 border-b border-slate-100 bg-navy-900 px-6 py-5 sm:px-8">
              <div className="rounded-xl bg-white p-1.5"><img src="logo-160.webp" alt="" width="44" height="44" className="h-11 w-11 rounded-md" loading="lazy" /></div>
              <div>
                <p className="font-display text-xl font-semibold text-white">Clear Tax BD</p>
                <p className="text-sm text-gold-300">Your Taxes, Our Expertise</p>
              </div>
            </div>
            <ul className="divide-y divide-slate-100">
              {cards.map(({ icon: Icon, label, value, href, ext }) => (
                <li key={label}>
                  <a href={href} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="flex items-start gap-4 px-6 py-5 transition hover:bg-paper sm:px-8">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-700"><Icon className="h-5 w-5" /></span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</span>
                      <span className="mt-0.5 block break-words font-semibold leading-relaxed text-navy-900">{value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="grid gap-3 border-t border-slate-100 p-6 sm:grid-cols-2 sm:px-8">
              <a href={waLink(lang === 'bn' ? 'আসসালামু আলাইকুম, Clear Tax BD। আপনাদের ওয়েবসাইট থেকে যোগাযোগ করছি।' : 'Hello Clear Tax BD, I am contacting you from your website.')} target="_blank" rel="noopener noreferrer" className="btn-wa whitespace-nowrap !px-3 text-sm sm:col-span-2" data-testid="contact-wa">
                <WhatsAppIcon className="h-[18px] w-[18px]" /> {c.chat}
              </a>
              <a href={mailLink(c.emailSubject)} className="btn-primary whitespace-nowrap !px-3 text-sm" data-testid="contact-email">
                <Mail className="h-4 w-4" /> {c.sendEmail}
              </a>
              <a href={mapsDirectionsLink()} target="_blank" rel="noopener noreferrer" className="btn-outline whitespace-nowrap !px-3 text-sm" data-testid="contact-directions">
                <Navigation className="h-4 w-4" /> {c.directions}
              </a>
            </div>
          </Reveal>

          <Reveal delay={100} className="overflow-hidden rounded-2xl border border-slate-200 shadow-soft">
            {SITE.mapEmbedSrc ? (
              <iframe
                title="Clear Tax BD office location"
                src={SITE.mapEmbedSrc}
                className="h-full min-h-[360px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="relative flex h-full min-h-[360px] flex-col justify-end overflow-hidden bg-navy-900 p-6 text-white sm:p-8">
                <div className="bg-grid-light absolute inset-0" aria-hidden="true" />
                
                <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
                  <span className="wa-ring absolute inset-0 rounded-full bg-gold-400" />
                  <span className="relative grid h-14 w-14 place-items-center rounded-full bg-gold-400 text-navy-950 shadow-lift"><MapPin className="h-7 w-7" /></span>
                </div>
                <div className="relative rounded-2xl bg-white/10 p-5 backdrop-blur">
                  <p className="font-display text-xl font-semibold">{c.mapNoteTitle}</p>
                  <p className="mt-1 text-sm leading-relaxed text-navy-100">{SITE.address[lang]}</p>
                  <p className="mt-2 text-xs text-navy-200">{c.mapNote}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a href={mapsDirectionsLink()} target="_blank" rel="noopener noreferrer" className="btn-gold !py-2.5 text-sm"><Navigation className="h-4 w-4" /> {c.directions}</a>
                    <a href={mapsSearchLink()} target="_blank" rel="noopener noreferrer" className="btn-ghost-light !py-2.5 text-sm"><ExternalLink className="h-4 w-4" /> {c.viewMap}</a>
                  </div>
                </div>
              </div>
            )}
          </Reveal>
        </div>
        <p className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
          <Phone className="h-4 w-4" /> <a className="font-semibold text-navy-700 hover:underline" href={`tel:${SITE.phoneIntl}`}>{c.call}: {SITE.phoneDisplay}</a>
        </p>
      </div>
    </section>
  );
}
