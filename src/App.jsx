import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import { WhyUs, HowItWorks } from './components/WhyHow.jsx';
import TaxCalculator from './components/TaxCalculator.jsx';
import Checklist from './components/Checklist.jsx';
import BookingForm from './components/BookingForm.jsx';
import FAQ from './components/FAQ.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Floating from './components/Floating.jsx';
import PolicyPage from './components/PolicyPage.jsx';

// Hash routes support direct links and refreshes on static Cloudflare Pages.
const ROUTES = new Set(['home', 'about', 'services', 'why', 'how', 'calculator', 'checklist', 'consultation', 'faq', 'contact', 'privacy', 'terms']);
const currentRoute = () => {
  const hash = window.location.hash;
  const slug = hash.startsWith('#/') ? hash.slice(2).split(/[?#]/)[0] : 'home';
  return ROUTES.has(slug) ? slug : 'home';
};

export default function App() {
  const [route, setRoute] = useState(currentRoute);

  useEffect(() => {
    const sync = () => setRoute(currentRoute());
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  // Preserve existing CTA and footer links while navigating to distinct pages.
  useEffect(() => {
    const navigate = (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const hash = link.getAttribute('href');
      if (!hash || hash === '#' || hash === '#main' || hash.startsWith('#/')) return;
      const slug = hash.slice(1);
      if (!ROUTES.has(slug)) return;
      event.preventDefault();
      window.location.hash = '#/' + slug;
      if (currentRoute() === route) window.scrollTo(0, 0);
    };
    document.addEventListener('click', navigate);
    return () => document.removeEventListener('click', navigate);
  }, [route]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.title = route === 'home' ? 'Clear Tax BD | Your Taxes, Our Expertise' : route.charAt(0).toUpperCase() + route.slice(1) + ' | Clear Tax BD';
  }, [route]);

  const pages = {
    home: <><Hero /><WhyUs /></>,
    about: <About />,
    services: <Services />,
    why: <WhyUs />,
    how: <HowItWorks />,
    calculator: <TaxCalculator />,
    checklist: <Checklist />,
    consultation: <BookingForm />,
    faq: <FAQ />,
    contact: <Contact />,
    privacy: <PolicyPage kind="privacy" />,
    terms: <PolicyPage kind="terms" />,
  };

  return (
    <>
      <Header onHome={route === 'home'} route={route} />
      <main id="main" tabIndex={-1} className="min-h-[55vh] outline-none" key={route}>
        {pages[route]}
      </main>
      <Footer />
      <Floating />
    </>
  );
}
