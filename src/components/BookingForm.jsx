import { useMemo, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, ShieldCheck, CalendarDays, Phone } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext.jsx';
import { SERVICE_IDS } from '../i18n/content.js';
import { SITE, waLink } from '../config.js';
import { Reveal, SectionHeader, WhatsAppIcon, openExternal } from './ui.jsx';

const EMPTY = { name: '', phone: '', email: '', service: '', date: '', time: '', message: '' };

const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

export function normalisePhone(v) {
  return v.replace(/[\s\-().]/g, '');
}
export function isValidBDPhone(v) {
  return /^(?:\+?88)?01[3-9]\d{8}$/.test(normalisePhone(v));
}

function validate(f) {
  const e = {};
  if (f.name.trim().length < 2) e.name = 'name';
  if (!isValidBDPhone(f.phone)) e.phone = 'phone';
  if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'email';
  if (!f.service) e.service = 'service';
  if (!f.date || f.date < todayISO()) e.date = 'date';
  if (f.time === '') e.time = 'time';
  return e;
}

export default function BookingForm() {
  const { t, lang } = useLang();
  const b = t.book;
  const [f, setF] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);
  const [sentUrl, setSentUrl] = useState('');
  const formRef = useRef(null);
  const min = useMemo(todayISO, []);

  const set = (k) => (e) => {
    const v = e.target.value;
    setF((p) => {
      const next = { ...p, [k]: v };
      if (touched) setErrors(validate(next));
      return next;
    });
  };

  const buildMessage = () => {
    const L = b.waFields;
    const dateStr = new Intl.DateTimeFormat(lang === 'bn' ? 'bn-BD' : 'en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${f.date}T00:00:00`));
    const lines = [
      `*${b.waHeader}*`,
      '',
      `${L.name}: ${f.name.trim()}`,
      `${L.phone}: ${normalisePhone(f.phone)}`,
      f.email.trim() ? `${L.email}: ${f.email.trim()}` : null,
      `${L.service}: ${t.services.items[f.service].t}`,
      `${L.date}: ${dateStr}`,
      `${L.time}: ${b.times[Number(f.time)]}`,
      f.message.trim() ? `${L.message}: ${f.message.trim()}` : null,
      '',
      b.waFooter,
    ].filter((x) => x !== null);
    return lines.join('\n');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    const errs = validate(f);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = formRef.current?.querySelector(`[name="${Object.keys(errs)[0]}"]`);
      first?.focus();
      return;
    }
    const url = waLink(buildMessage());
    setSentUrl(url);
    openExternal(url);
  };

  const reset = () => { setF(EMPTY); setErrors({}); setTouched(false); setSentUrl(''); };

  const err = (k) => errors[k] && (
    <p id={`${k}-err`} className="error" role="alert"><AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" /> {b.errors[errors[k]]}</p>
  );
  const aria = (k) => ({ 'aria-invalid': errors[k] ? 'true' : 'false', 'aria-describedby': errors[k] ? `${k}-err` : undefined });

  return (
    <section id="consultation" className="section relative overflow-hidden bg-gradient-to-b from-navy-50/70 to-white" aria-labelledby="book-title">
      <div className="container-site grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div>
          <SectionHeader id="book-title" eyebrow={b.eyebrow} title={b.title} lead={b.lead} />
          <Reveal delay={100} className="mt-8 space-y-4">
            {[
              [WhatsAppIcon, 'WhatsApp', SITE.phoneDisplay],
              [CalendarDays, b.date, lang === 'bn' ? 'আপনার সুবিধামতো' : 'At your convenience'],
              [ShieldCheck, lang === 'bn' ? 'গোপনীয়তা' : 'Privacy', lang === 'bn' ? 'ফর্মের তথ্য এই ওয়েবসাইটে সংরক্ষিত হয় না' : 'Form details are not stored on this website'],
            ].map(([Icon, k, v]) => (
              <div key={k} className="flex items-center gap-4 rounded-2xl border border-navy-100 bg-white p-4 shadow-soft">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy-700 text-white"><Icon className="h-5 w-5" /></span>
                <span>
                  <span className="block text-xs font-medium uppercase tracking-wide text-slate-500">{k}</span>
                  <span className="block font-semibold text-navy-900">{v}</span>
                </span>
              </div>
            ))}
            <a href={`tel:${SITE.phoneIntl}`} className="inline-flex items-center gap-2 text-sm font-semibold text-navy-700 hover:text-navy-900">
              <Phone className="h-4 w-4" /> {t.contact.call}: {SITE.phoneDisplay}
            </a>
          </Reveal>
        </div>

        <Reveal delay={80} className="card p-5 sm:p-8">
          {sentUrl ? (
            <div className="py-6 text-center" role="status" aria-live="polite">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600"><CheckCircle2 className="h-8 w-8" /></span>
              <h3 className="mt-5 text-xl font-semibold text-navy-900">{b.successTitle}</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">{b.successText}</p>
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="btn-wa"><WhatsAppIcon /> {b.retry}</a>
                <button type="button" onClick={reset} className="btn-outline">{b.again}</button>
              </div>
            </div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate aria-label={b.title}>
              {touched && Object.keys(errors).length > 0 && (
                <p className="mb-5 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700" role="alert">
                  <AlertCircle className="h-4 w-4" /> {b.errors.summary}
                </p>
              )}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="bf-name" className="field-label">{b.name} <span className="text-red-600" aria-hidden="true">*</span></label>
                  <input id="bf-name" name="name" className="field" autoComplete="name" maxLength={80} value={f.name} onChange={set('name')} required {...aria('name')} />
                  {err('name')}
                </div>
                <div>
                  <label htmlFor="bf-phone" className="field-label">{b.phone} <span className="text-red-600" aria-hidden="true">*</span></label>
                  <input id="bf-phone" name="phone" type="tel" inputMode="tel" className="field" autoComplete="tel" placeholder="01XXXXXXXXX" maxLength={20} value={f.phone} onChange={set('phone')} required {...aria('phone')} />
                  {err('phone')}
                </div>
                <div>
                  <label htmlFor="bf-email" className="field-label">{b.email} <span className="font-normal text-slate-400">({b.optional})</span></label>
                  <input id="bf-email" name="email" type="email" inputMode="email" className="field" autoComplete="email" maxLength={120} value={f.email} onChange={set('email')} {...aria('email')} />
                  {err('email')}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="bf-service" className="field-label">{b.service} <span className="text-red-600" aria-hidden="true">*</span></label>
                  <select id="bf-service" name="service" className="field" value={f.service} onChange={set('service')} required {...aria('service')}>
                    <option value="">{b.choose}</option>
                    {SERVICE_IDS.map((id) => <option key={id} value={id}>{t.services.items[id].t}</option>)}
                  </select>
                  {err('service')}
                </div>
                <div>
                  <label htmlFor="bf-date" className="field-label">{b.date} <span className="text-red-600" aria-hidden="true">*</span></label>
                  <div className="relative">
                    <input id="bf-date" name="date" type="date" min={min} className="field" value={f.date} onChange={set('date')} required {...aria('date')} />
                  </div>
                  {err('date')}
                </div>
                <div>
                  <label htmlFor="bf-time" className="field-label">{b.time} <span className="text-red-600" aria-hidden="true">*</span></label>
                  <div className="relative">
                    <select id="bf-time" name="time" className="field" value={f.time} onChange={set('time')} required {...aria('time')}>
                      <option value="">{b.chooseTime}</option>
                      {b.times.map((tm, i) => <option key={tm} value={String(i)}>{tm}</option>)}
                    </select>
                  </div>
                  {err('time')}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="bf-msg" className="field-label">{b.message} <span className="font-normal text-slate-400">({b.optional})</span></label>
                  <textarea id="bf-msg" name="message" rows={3} maxLength={500} className="field resize-y" placeholder={b.messagePh} value={f.message} onChange={set('message')} />
                </div>
              </div>
              <p className="mt-5 flex items-start gap-2 rounded-xl bg-navy-50 p-3 text-xs leading-relaxed text-navy-800">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" /> {b.privacy}
              </p>
              <button type="submit" className="btn-wa mt-5 w-full !py-3.5 text-base" data-testid="book-submit">
                <WhatsAppIcon /> {b.submit}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
