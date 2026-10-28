import { useEffect, useRef } from 'react';

/** Fades children in when scrolled into view */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { el.classList.add('in'); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect(); } }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined} {...rest}>
      {children}
    </Tag>
  );
}

export function SectionHeader({ eyebrow, title, lead, center = false, light = false, id }) {
  return (
    <Reveal className={`${center ? 'mx-auto text-center' : ''} max-w-2xl`}>
      <p className={`eyebrow ${center ? 'justify-center' : ''} ${light ? '!text-gold-300' : ''}`}>{eyebrow}</p>
      <h2 id={id} className={`h2 mt-3 ${light ? '!text-white' : ''}`}>{title}</h2>
      {lead && <p className={`lead mt-4 ${light ? '!text-navy-100' : ''}`}>{lead}</p>}
    </Reveal>
  );
}

export function WhatsAppIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="currentColor">
      <path d="M16.04 3C8.86 3 3.02 8.83 3.02 16c0 2.29.6 4.53 1.74 6.5L3 29l6.68-1.75A13 13 0 0 0 16.04 29C23.2 29 29 23.17 29 16S23.2 3 16.04 3Zm0 23.8c-2.02 0-4-.54-5.72-1.57l-.41-.24-3.96 1.04 1.06-3.86-.27-.4A10.77 10.77 0 0 1 5.2 16c0-5.97 4.86-10.82 10.84-10.82 5.97 0 10.8 4.85 10.8 10.82 0 5.96-4.84 10.8-10.8 10.8Zm5.93-8.1c-.33-.16-1.93-.95-2.23-1.06-.3-.11-.52-.16-.74.17-.22.32-.85 1.06-1.04 1.28-.19.22-.38.24-.71.08-.33-.16-1.38-.51-2.63-1.62-.97-.87-1.63-1.94-1.82-2.27-.19-.33-.02-.5.14-.67.15-.15.33-.38.49-.57.17-.19.22-.33.33-.55.11-.22.06-.41-.03-.57-.08-.16-.74-1.78-1.01-2.44-.27-.64-.54-.55-.74-.56h-.63c-.22 0-.57.08-.87.41-.3.33-1.14 1.11-1.14 2.71s1.17 3.15 1.33 3.37c.16.22 2.3 3.5 5.56 4.91.78.34 1.39.54 1.86.69.78.25 1.49.21 2.05.13.63-.09 1.93-.79 2.2-1.55.27-.76.27-1.42.19-1.55-.08-.14-.3-.22-.63-.38Z" />
    </svg>
  );
}

export function FacebookIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.78-3.91 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.43-4.92 8.43-9.94Z" />
    </svg>
  );
}

/** Opens an external URL in a new tab; falls back to same-tab navigation if blocked */
export function openExternal(url) {
  // Note: passing 'noopener' makes window.open return null, so we detach the opener manually.
  const w = window.open(url, '_blank');
  if (w) { try { w.opener = null; } catch { /* ignore */ } }
  else window.location.href = url;
}
