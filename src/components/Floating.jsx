import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext.jsx';
import { waLink } from '../config.js';
import { WhatsAppIcon } from './ui.jsx';

export default function Floating() {
  const { t } = useLang();
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const on = () => setShowTop(window.scrollY > 700);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-30 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
        aria-label={t.misc.backToTop}
        title={t.misc.backToTop}
        tabIndex={showTop ? 0 : -1}
        className={`grid h-11 w-11 place-items-center rounded-full border border-navy-100 bg-white text-navy-800 shadow-lift transition-all duration-300 hover:bg-navy-50 ${showTop ? 'pointer-events-auto translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
      <a
        href={waLink(t.hero.waMsg)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.misc.whatsappFloat}
        title={t.misc.whatsappFloat}
        className="pointer-events-auto relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,.6)] transition hover:scale-105 focus-visible:ring-4 focus-visible:ring-green-200"
        data-testid="wa-float"
      >
        <span className="wa-ring absolute inset-0 rounded-full bg-[#25D366]" aria-hidden="true" />
        <WhatsAppIcon className="relative h-7 w-7" />
      </a>
    </div>
  );
}
