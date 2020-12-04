import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';

// import translationEN from '../public/locales/en/translation.json';
// import translationFA from '../public/locales/fa/translation.json';

// // the translations
// const resources = {
//   en: {
//     translation: translationEN,
//   },
//   fa: {
//     translation: translationFA,
//   },
// };

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
