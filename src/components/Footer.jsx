import { Mail, MapPin, Phone } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext.jsx';
import { SITE, mailLink, mapsSearchLink, waLink } from '../config.js';
import { FacebookIcon, WhatsAppIcon } from './ui.jsx';

export default function Footer() {
  const { t, lang } = useLang();
  const f = t.footer;
  const quick = [['home', t.nav.home], ['about', t.nav.about], ['services', t.nav.services], ['calculator', t.nav.calculator], ['faq', t.nav.faq], ['contact', t.nav.contact]];
  const social = 'grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/5 transition hover:border-gold-400 hover:bg-white/10';

  return (
    <footer className="relative bg-navy-950 text-navy-100">
      <div className="h-1 bg-gradient-to-r from-navy-700 via-gold-500 to-sky-400" aria-hidden="true" />
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr_1.2fr] lg:gap-12">
        <div>
          <a href="#home" className="inline-flex items-center gap-3">
            <span className="rounded-xl bg-white p-1.5"><img src="logo-160.webp" alt="Clear Tax BD logo" width="52" height="52" className="h-[52px] w-[52px] rounded-md" loading="lazy" /></span>
            <span>
              <span className="block font-display text-xl font-semibold text-white">Clear Tax BD</span>
              <span className="block text-sm text-gold-300">Your Taxes, Our Expertise</span>
            </span>
          </a>
          <p className="mt-5 text-sm leading-relaxed text-navy-200">{f.desc}</p>
          <div className="mt-5 flex gap-2.5">
            {SITE.facebookUrl ? (
              <a href={SITE.facebookUrl} target="_blank" rel="noopener noreferrer" className={social} aria-label="Facebook"><FacebookIcon /></a>
            ) : (
              <span className={`${social} cursor-not-allowed opacity-50`} title={f.fbSoon} aria-label={f.fbSoon} role="img"><FacebookIcon /></span>
            )}
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className={social} aria-label="WhatsApp"><WhatsAppIcon /></a>
            <a href={mailLink()} className={social} aria-label="Email"><Mail className="h-5 w-5" /></a>
            <a href={mapsSearchLink()} target="_blank" rel="noopener noreferrer" className={social} aria-label="Google Maps"><MapPin className="h-5 w-5" /></a>
          </div>
        </div>

        <nav aria-label={f.quick}>
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">{f.quick}</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {quick.map(([id, label]) => (
              <li key={id}><a href={`#${id}`} className="transition hover:text-gold-300">{label}</a></li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">{f.services}</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {f.serviceLinks.map((s) => (
              <li key={s}><a href="#services" className="transition hover:text-gold-300">{s}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">{f.contact}</h2>
          <ul className="mt-4 space-y-3.5 text-sm">
            <li><a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-gold-300"><WhatsAppIcon className="h-4 w-4 shrink-0 text-gold-400" /> WhatsApp: {SITE.phoneDisplay}</a></li>
            <li><a href={`tel:${SITE.phoneIntl}`} className="flex items-center gap-3 hover:text-gold-300"><Phone className="h-4 w-4 shrink-0 text-gold-400" /> {SITE.phoneDisplay}</a></li>
            <li><a href={mailLink()} className="flex items-center gap-3 break-all hover:text-gold-300"><Mail className="h-4 w-4 shrink-0 text-gold-400" /> {SITE.email}</a></li>
            <li><a href={mapsSearchLink()} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 leading-relaxed hover:text-gold-300"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" /> {SITE.address[lang]}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site py-6 text-xs leading-relaxed text-navy-300">
          <p>{f.disclaimer}</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>{f.rights} <span className="text-gold-300">Your Taxes, Our Expertise.</span></p>
            <p className="flex gap-5">
              <a href="#/privacy" className="hover:text-white">{f.privacy}</a>
              <a href="#/terms" className="hover:text-white">{f.terms}</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
