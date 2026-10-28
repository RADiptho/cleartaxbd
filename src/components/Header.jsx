import { useEffect, useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext.jsx';

export const NAV = ['home', 'about', 'services', 'why', 'how', 'faq', 'contact'];

function LangSwitch({ className = '' }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`inline-flex items-center rounded-full border border-navy-100 bg-navy-50/70 p-0.5 text-sm ${className}`} role="group" aria-label="Language / ভাষা">
      {[
        ['bn', 'বাংলা'],
        ['en', 'English'],
      ].map(([code, label]) => (
        <button
          key={code}
          type="button"
          lang={code}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`whitespace-nowrap rounded-full px-2 py-1 text-[0.8rem] font-medium transition sm:px-2.5 sm:text-sm ${lang === code ? 'bg-navy-700 text-white shadow-sm' : 'text-navy-700 hover:text-navy-900'}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default function Header({ onHome }) {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section highlighting
  useEffect(() => {
    if (!onHome) return;
    const els = NAV.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.01] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [onHome]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open]);

  const close = () => setOpen(false);

  // Mobile menu links: unlock page scroll first, then scroll to the section
  const goMobile = (e, id) => {
    e.preventDefault();
    setOpen(false);
    document.body.style.overflow = '';
    if (window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`);
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }));
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled || open ? 'bg-white/95 shadow-[0_1px_0_rgba(15,49,87,.08),0_8px_24px_-12px_rgba(15,49,87,.18)] backdrop-blur' : 'bg-white/80 backdrop-blur-sm'}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-navy-800 focus:px-4 focus:py-2 focus:text-white">
        {t.nav.skip}
      </a>
      <div className={`container-site flex items-center justify-between gap-4 transition-all duration-300 ${scrolled ? 'h-16' : 'h-[72px]'}`}>
        <a href="#home" onClick={close} className="flex shrink-0 items-center gap-2.5" aria-label="Clear Tax BD — Home">
          <img src="logo-160.webp" alt="Clear Tax BD logo" width="44" height="44" className={`rounded-lg transition-all ${scrolled ? 'h-10 w-10' : 'h-11 w-11'}`} />
          <span className="hidden leading-tight min-[370px]:block">
            <span className="block whitespace-nowrap font-display text-[1.02rem] font-semibold text-navy-900 sm:text-[1.15rem]">Clear Tax BD</span>
            <span className="hidden text-[0.7rem] font-medium tracking-wide text-gold-600 sm:block">Your Taxes, Our Expertise</span>
          </span>
        </a>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {NAV.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={onHome && active === id ? 'true' : undefined}
                  className={`relative whitespace-nowrap rounded-lg px-2.5 py-2 text-[0.875rem] font-medium transition-colors ${onHome && active === id ? 'text-navy-900' : 'text-slate-600 hover:text-navy-900'}`}
                >
                  {t.nav[id]}
                  <span className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gold-500 transition-transform duration-300 ${onHome && active === id ? 'scale-x-100' : 'scale-x-0'}`} />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LangSwitch />
          <a href="#consultation" className="btn-primary hidden whitespace-nowrap !px-4 !py-2.5 text-sm md:inline-flex">
            {t.nav.cta}
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-navy-100 text-navy-800 xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.close : t.nav.menu}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`xl:hidden absolute inset-x-0 top-full overflow-hidden border-t border-navy-100/70 bg-white shadow-lift transition-[max-height,opacity] duration-300 ease-out ${open ? 'max-h-[calc(100svh-64px)] opacity-100' : 'max-h-0 opacity-0'}`}
        aria-hidden={!open}
        inert={open ? undefined : ''}
      >
        <nav aria-label="Mobile" className="container-site max-h-[calc(100svh-64px)] overflow-y-auto py-4">
          <ul className="grid gap-1">
            {[...NAV.slice(0, 5), 'calculator', 'checklist', ...NAV.slice(5)].map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => goMobile(e, id)}
                  className={`flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium ${onHome && active === id ? 'bg-navy-50 text-navy-900' : 'text-slate-700 hover:bg-slate-50'}`}
                >
                  {t.nav[id]}
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-slate-100 pt-4 pb-2">
                        <a href="#consultation" onClick={(e) => goMobile(e, 'consultation')} className="btn-primary w-full sm:w-auto">{t.nav.cta}</a>
          </div>
        </nav>
      </div>
    </header>
  );
}
