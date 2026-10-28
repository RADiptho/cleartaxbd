import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { LanguageProvider } from './i18n/LanguageContext.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);

// Remove the loading screen once the first frame is painted
requestAnimationFrame(() => {
  const boot = document.getElementById('boot');
  if (!boot) return;
  boot.classList.add('hide');
  setTimeout(() => boot.remove(), 400);
});
