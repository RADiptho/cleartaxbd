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

/** Hash-based pages (#/privacy, #/terms) work on any static host without server rewrites */
const routeFromHash = () => {
  const h = window.location.hash;
  if (h === '#/privacy') return 'privacy';
  if (h === '#/terms') return 'terms';
  return 'home';
};

export default function App() {
  const [route, setRoute] = useState(routeFromHash);

  useEffect(() => {
    const onHash = () => setRoute(routeFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // When the home page renders (first load, or returning from a policy page),
  // scroll to the section named in the URL hash, e.g. a shared link …/#services
  useEffect(() => {
    if (route !== 'home') return;
    const id = window.location.hash.slice(1);
    if (!id || id.startsWith('/')) return;
    const timer = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'instant' }), 60);
    return () => clearTimeout(timer);
  }, [route]);

  return (
    <>
      <Header onHome={route === 'home'} />
      <main id="main" tabIndex={-1} className="outline-none">
        {route === 'home' ? (
          <>
            <Hero />
            <About />
            <Services />
            <WhyUs />
            <HowItWorks />
            <TaxCalculator />
            <Checklist />
            <BookingForm />
            <FAQ />
            <Contact />
          </>
        ) : (
          <PolicyPage kind={route} />
        )}
      </main>
      <Footer />
      <Floating />
    </>
  );
}
