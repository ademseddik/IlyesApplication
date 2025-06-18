
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./Utils/Languages/en.json";
import fr from "./Utils/Languages/fr.json";
import es from "./Utils/Languages/es.json";
import al from "./Utils/Languages/al.json";
import ar from "./Utils/Languages/ar.json";
import pr from "./Utils/Languages/pr.json";

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  es: { translation: es },
  al: { translation: al },
  ar: { translation: ar },
  pr: { translation: pr },
};

i18n
  .use(initReactI18next) // Bindings for React integration
  .init({
    resources,
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language if translation not found
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
