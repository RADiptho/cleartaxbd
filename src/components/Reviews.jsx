import { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, MessageCircle } from 'lucide-react';

const reviews = [
  { name: 'Arafat Al Kawsur', date: 'Oct 16', quote: 'specially thanks Clear Tax BD k amar kaj ato easily kore dewar jonno. most trustable person. again thanks' },
  { name: 'Palash Khalashi', date: 'Oct 11', quote: 'তাদের সার্ভিস অনেক ভালো। প্রথম এই ধরনের সার্ভিস নিলাম। এমন অনেক অ্যাডভাইস তারা দিয়েছে আমাকে, যেটা আসলে আমার ফিউচারের জন্য অনেক কাজে লাগবে।' },
  { name: 'Nazneen Wahid', date: 'Aug 8', quote: 'Clear Tax BD থেকে আয়কর রিটার্নের সেবা নিয়ে আমি খুবই সন্তুষ্ট। তাদের সেবা দ্রুত, নির্ভুল এবং অত্যন্ত পেশাদার।' },
  { name: 'Saidul Khan Pabon', date: 'Jan 31', quote: 'Amazing Behaviour & Very Professional Service. Specially Thanks To Wahid Bhai For Your Transparent Job. Highly Appreciated & Recommending To Everyone.' },
  { name: 'Arif Ahmed', date: 'Jan 24', quote: 'Very professional and reliable service. My Tax return was handled smoothly and accurately. I am quite satisfied with the service. Highly recommended!' },
  { name: 'Riadul Islam Riad', date: 'Jan 20', quote: 'The service of Clear Tax BD was outstanding. They solved my tax issues with exceptional accuracy and impressive speed. Their pricing is fair and transparent.' },
  { name: 'Milon Bhuiyan', date: 'Dec 30, 2025', quote: 'Clear Tax BD-এর ট্যাক্স সার্ভিসে আমি সম্পূর্ণ সন্তুষ্ট। তাদের কাজের ধরন ছিল স্বচ্ছ এবং সময়ানুগ।' },
  { name: 'Ornob Hasan', date: 'Dec 30, 2025', quote: 'Clear Tax BD-এর ট্যাক্স সার্ভিস ছিল অত্যন্ত professional ও নির্ভরযোগ্য। ডকুমেন্ট হ্যান্ডলিং থেকে শুরু করে রিটার্ন প্রস্তুত ও সাবমিশন প্রতিটি ধাপই তারা দক্ষতা ও দায়িত্বশীলতার সাথে সম্পন্ন করেছে।' },
  { name: 'Farzana Jessi', date: 'Dec 17, 2025', quote: 'এই ট্যাক্স সার্ভিস পেইজটি থেকে যে ধরনের সাপোর্ট পেয়েছি, তা সত্যিই প্রশংসার যোগ্য। তারা প্রতিটি বিষয় খুব ধৈর্য ও যত্নের সঙ্গে বুঝিয়ে দিয়েছে।' },
  { name: 'Pial Ghosh', date: 'Dec 17, 2025', quote: 'Clear Tax BD এর ট্যাক্স সার্ভিসে আমি খুবই সন্তুষ্ট। তারা শুরু থেকেই প্রফেশনালভাবে পুরো ট্যাক্স রিটার্ন প্রক্রিয়াটি সহজ করে দিয়েছে।' },
  { name: 'Md. Habibur Rahman Himel', date: 'Dec 17, 2025', quote: 'Clear Tax BD এর ট্যাক্স সার্ভিস নিয়ে আমার অভিজ্ঞতা অত্যন্ত সন্তোষজনক। ডকুমেন্ট কালেকশন, হিসাব যাচাই এবং রিটার্ন প্রস্তুত ও সাবমিশন প্রতিটি ধাপই তারা অত্যন্ত যত্ন ও দায়িত্বশীলতার সাথে সম্পন্ন করেছে।' },
  { name: 'Rifat Hossain Zinnat', date: 'Dec 17, 2025', quote: 'Clear Tax BD থেকে পাওয়া ট্যাক্স সার্ভিস সত্যিই চমৎকার! খুব দ্রুত, পরিষ্কারভাবে এবং ঝামেলা ছাড়াই সব কাজ সম্পন্ন করেছে।' },
  { name: 'Md Ataul Samad', date: 'Aug 28', quote: 'I have used the tax return services of Mr. Fredous Wahid Prince, owner of Clear Tax BD, Uttara, Dhaka, multiple times, and I am very satisfied with his service.' },
];
const facebook = 'https://www.facebook.com/share/19bnvEV3wN/';
export default function Reviews() {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const review = reviews[index];
  const move = (n) => { setIndex(i => (i + n + reviews.length) % reviews.length); setExpanded(false); };
  return (
    <section aria-label="Facebook client recommendations" className="border-t border-navy-100 bg-white py-7 sm:py-9">
      <div className="container-site">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">Client feedback</p>
            <h2 className="font-display text-xl font-semibold text-navy-900 sm:text-2xl">What Our Clients Say</h2>
            <p className="mt-1 text-sm text-slate-600">Facebook Recommendations · 100% recommend (13 reviews, screenshot snapshot)</p>
          </div>
          <a href={facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 hover:underline">View on Facebook <ExternalLink className="h-4 w-4" /></a>
        </div>
        <div className="rounded-2xl border border-navy-100 bg-navy-50/50 px-5 py-4 shadow-soft sm:px-7">
          <div className="flex items-center gap-2 text-navy-800"><MessageCircle className="h-5 w-5" /><span className="font-semibold">{review.name}</span><span className="ml-auto text-xs text-slate-500">{review.date}</span></div>
          <p className={`mt-3 text-sm leading-7 text-slate-700 sm:text-base ${expanded ? '' : 'line-clamp-3'}`}>{review.quote}</p>
          {review.quote.length > 155 && <button type="button" onClick={() => setExpanded(v => !v)} className="mt-1 text-sm font-semibold text-navy-700 underline">{expanded ? 'Show less' : 'Read more'}</button>}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-slate-500">Recommends Clear Tax BD · {index + 1} / {reviews.length}</span>
            <div className="flex gap-2">
              <button type="button" onClick={() => move(-1)} aria-label="Previous review" className="grid h-9 w-9 place-items-center rounded-full border border-navy-200 bg-white hover:bg-navy-100"><ChevronLeft className="h-5 w-5" /></button>
              <button type="button" onClick={() => move(1)} aria-label="Next review" className="grid h-9 w-9 place-items-center rounded-full border border-navy-200 bg-white hover:bg-navy-100"><ChevronRight className="h-5 w-5" /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
