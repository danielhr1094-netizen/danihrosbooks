import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import es from './locales/es.json';
import en from './locales/en.json';

// Function to update HTML lang attribute
const updateHtmlLang = (lang: string) => {
  document.documentElement.lang = lang;
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en }
    },
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

// Set initial lang attribute
updateHtmlLang(i18n.language || 'es');

// Update lang attribute on language change
i18n.on('languageChanged', (lang) => {
  updateHtmlLang(lang);
});

export default i18n;
