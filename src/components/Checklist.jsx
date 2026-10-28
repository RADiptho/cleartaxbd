import { useRef, useState } from 'react';
import { CheckSquare, Square, Download, Printer, Info, Loader2 } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext.jsx';
import { CHECKLISTS } from '../data/checklists.js';
import { SITE } from '../config.js';
import { Reveal, SectionHeader } from './ui.jsx';

const TABS = ['personal', 'company', 'professional', 'visa', 'etin'];

/** Printable / PDF sheet (A4 proportion, 794px wide) */
function Sheet({ cat, lang, t, innerRef, id }) {
  const items = CHECKLISTS[cat];
  const date = new Intl.DateTimeFormat(lang === 'bn' ? 'bn-BD' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());
  return (
    <div id={id} ref={innerRef} lang={lang} style={{ width: 794, padding: 48, background: '#fff', color: '#0f1e33', fontFamily: lang === 'bn' ? "'Hind Siliguri','Inter',sans-serif" : "'Inter','Hind Siliguri',sans-serif" }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '3px solid #14406c', paddingBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <img src="logo.jpg" alt="Clear Tax BD logo" width="72" height="72" style={{ width: 72, height: 72 }} />
          <div>
            <div style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: 26, fontWeight: 600, color: '#0b2442' }}>Clear Tax BD</div>
            <div style={{ fontSize: 13, color: '#a17c3a', fontWeight: 600 }}>Your Taxes, Our Expertise</div>
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: 12, color: '#475569', lineHeight: 1.6 }}>
          <div>WhatsApp: {SITE.phoneDisplay}</div>
          <div>{SITE.email}</div>
        </div>
      </div>
      <div style={{ marginTop: 26 }}>
        <div style={{ fontSize: 12, letterSpacing: lang === 'bn' ? 0 : 2, textTransform: lang === 'bn' ? 'none' : 'uppercase', color: '#a17c3a', fontWeight: 600 }}>{t.checklist.pdfTitle}</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: '#0b2442', marginTop: 4 }}>{t.checklist.tabs[cat]}</div>
      </div>
      <ol style={{ marginTop: 20, padding: 0, listStyle: 'none' }}>
        {items.map((it, i) => (
          <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px solid #e2e8f0', fontSize: 14.5, lineHeight: 1.5 }}>
            <span style={{ width: 16, height: 16, border: '2px solid #14406c', borderRadius: 3, flexShrink: 0, marginTop: 3 }} />
            <span style={{ flex: 1 }}>
              {it[lang]}
              {it.cond && (
                <span style={{ marginLeft: 8, fontSize: 11, color: '#a17c3a', fontWeight: 600, whiteSpace: 'nowrap' }}>({t.checklist.ifApplicable})</span>
              )}
            </span>
          </li>
        ))}
      </ol>
      <div style={{ marginTop: 22, background: '#f6f8fb', border: '1px solid #dfe8f3', borderRadius: 10, padding: 14, fontSize: 12.5, lineHeight: 1.6, color: '#334155' }}>{t.checklist.note}</div>
      <div style={{ marginTop: 22, fontSize: 12, color: '#475569', lineHeight: 1.7 }}>
        <div style={{ fontWeight: 700, color: '#0b2442' }}>Clear Tax BD</div>
        <div>{SITE.address[lang]}</div>
        <div>WhatsApp / {lang === 'bn' ? 'ফোন' : 'Phone'}: {SITE.phoneDisplay} · {lang === 'bn' ? 'ইমেইল' : 'Email'}: {SITE.email}</div>
        <div style={{ marginTop: 8, fontSize: 11, color: '#94a3b8' }}>{t.checklist.pdfGenerated} · {date}</div>
      </div>
    </div>
  );
}

export default function Checklist() {
  const { t, lang } = useLang();
  const [cat, setCat] = useState('personal');
  const [busy, setBusy] = useState(false);
  const sheetRef = useRef(null);
  const tabRefs = useRef([]);

  const download = async () => {
    setBusy(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import('html2canvas'), import('jspdf')]);
      if (document.fonts?.ready) await document.fonts.ready;
      const node = sheetRef.current;
      const canvas = await html2canvas(node, { scale: 2, backgroundColor: '#ffffff', useCORS: true, logging: false, windowWidth: 900 });
      const pdf = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
      const pw = pdf.internal.pageSize.getWidth();
      const ph = pdf.internal.pageSize.getHeight();
      const imgH = (canvas.height * pw) / canvas.width;
      const img = canvas.toDataURL('image/jpeg', 0.92);
      let y = 0;
      pdf.addImage(img, 'JPEG', 0, y, pw, imgH);
      let left = imgH - ph;
      while (left > 1) {
        y -= ph;
        pdf.addPage();
        pdf.addImage(img, 'JPEG', 0, y, pw, imgH);
        left -= ph;
      }
      pdf.setProperties({ title: `Clear Tax BD — ${t.checklist.tabs[cat]}`, author: 'Clear Tax BD', subject: 'Document checklist' });
      pdf.save(`ClearTaxBD-Checklist-${cat}-${lang}.pdf`);
    } catch (err) {
      // Fallback: open the print dialog, where "Save as PDF" is available
      print();
    } finally {
      setBusy(false);
    }
  };

  const print = () => {
    // Copy the sheet to a top-level container so print CSS can hide everything else
    const holder = document.createElement('div');
    holder.id = 'print-root';
    holder.appendChild(sheetRef.current.cloneNode(true));
    document.body.appendChild(holder);
    document.body.classList.add('print-checklist');
    const done = () => {
      document.body.classList.remove('print-checklist');
      holder.remove();
      window.removeEventListener('afterprint', done);
    };
    window.addEventListener('afterprint', done);
    window.print();
    setTimeout(done, 1500);
  };

  const onKeyTabs = (e, i) => {
    let n = null;
    if (e.key === 'ArrowRight') n = (i + 1) % TABS.length;
    if (e.key === 'ArrowLeft') n = (i - 1 + TABS.length) % TABS.length;
    if (n != null) { e.preventDefault(); setCat(TABS[n]); tabRefs.current[n]?.focus(); }
  };

  return (
    <section id="checklist" className="section bg-white" aria-labelledby="checklist-title">
      <div className="container-site">
        <SectionHeader id="checklist-title" eyebrow={t.checklist.eyebrow} title={t.checklist.title} lead={t.checklist.lead} />

        <Reveal className="mt-10">
          <div role="tablist" aria-label={t.checklist.title} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
            {TABS.map((k, i) => (
              <button
                key={k}
                ref={(el) => (tabRefs.current[i] = el)}
                role="tab"
                id={`tab-${k}`}
                aria-selected={cat === k}
                aria-controls="checklist-panel"
                tabIndex={cat === k ? 0 : -1}
                onClick={() => setCat(k)}
                onKeyDown={(e) => onKeyTabs(e, i)}
                className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${cat === k ? 'border-navy-700 bg-navy-700 text-white shadow-soft' : 'border-slate-200 bg-white text-slate-600 hover:border-navy-300 hover:text-navy-800'}`}
              >
                {t.checklist.tabs[k]}
              </button>
            ))}
          </div>

          <div id="checklist-panel" role="tabpanel" aria-labelledby={`tab-${cat}`} className="card mt-5 grid gap-6 p-5 sm:p-7 lg:grid-cols-[1fr_280px]">
            <div>
              <h3 className="text-lg font-semibold text-navy-900">{t.checklist.tabs[cat]}</h3>
              <ul className="mt-4 grid gap-2.5 md:grid-cols-2">
                {CHECKLISTS[cat].map((it, i) => (
                  <li key={`${cat}-${i}`} className={`flex items-start gap-3 rounded-xl border p-3.5 text-[0.93rem] leading-snug ${it.cond ? 'border-dashed border-gold-400/70 bg-[#fdfaf3]' : 'border-slate-200 bg-paper'}`}>
                    {it.cond ? <Square className="mt-0.5 h-[18px] w-[18px] shrink-0 text-gold-500" /> : <CheckSquare className="mt-0.5 h-[18px] w-[18px] shrink-0 text-navy-600" />}
                    <span className="text-slate-700">
                      {it[lang]}
                      {it.cond && <span className="ml-1.5 whitespace-nowrap text-xs font-semibold text-gold-600">· {t.checklist.ifApplicable}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <aside className="flex flex-col gap-4 rounded-2xl bg-navy-50/70 p-5">
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2 text-slate-700"><CheckSquare className="h-4 w-4 text-navy-600" /> {t.checklist.legendCommon}</p>
                <p className="flex items-center gap-2 text-slate-700"><Square className="h-4 w-4 text-gold-500" /> {t.checklist.legendCond}</p>
              </div>
              <button type="button" onClick={download} disabled={busy} className="btn-primary w-full" data-testid="checklist-download">
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                {busy ? t.checklist.preparing : t.checklist.download}
              </button>
              <button type="button" onClick={print} className="btn-outline w-full">
                <Printer className="h-4 w-4" /> {t.checklist.print}
              </button>
              <p className="flex items-start gap-2 text-xs leading-relaxed text-slate-600"><Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-navy-500" /> {t.checklist.note}</p>
            </aside>
          </div>
        </Reveal>
      </div>

      {/* Off-screen sheet used for PDF and print */}
      <div aria-hidden="true" style={{ position: 'fixed', left: -10000, top: 0, pointerEvents: 'none' }}>
        <Sheet id="checklist-print" cat={cat} lang={lang} t={t} innerRef={sheetRef} />
      </div>
    </section>
  );
}
