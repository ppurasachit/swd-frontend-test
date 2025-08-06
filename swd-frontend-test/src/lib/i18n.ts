// src/lib/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslation from '../locales/en/translation.json';
import thTranslation from '../locales/th/translation.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  th: {
    translation: thTranslation,
  },
};

// Get saved language from localStorage or default to 'en'
const getInitialLanguage = (): string => {
  if (typeof window !== 'undefined') {
    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage && ['en', 'th'].includes(savedLanguage)) {
      return savedLanguage;
    }
    // Detect browser language
    const browserLang = navigator.language.split('-')[0];
    return ['en', 'th'].includes(browserLang) ? browserLang : 'en';
  }
  return 'en';
};

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    lng: getInitialLanguage(), // Set initial language
    fallbackLng: 'en', // Use English if detected language is not available
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

// Save language to localStorage when it changes
i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('i18nextLng', lng);
  }
});

export default i18n;