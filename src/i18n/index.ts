import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import pt from "./locales/pt.json";
import en from "./locales/en.json";
import fr from "./locales/fr.json";

export const SUPPORTED_LANGS = ["pt", "en", "fr"] as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      pt: { translation: pt },
      en: { translation: en },
      fr: { translation: fr },
    },
    fallbackLng: "pt", // conteúdo ainda não traduzido aparece em PT (nunca quebra)
    supportedLngs: SUPPORTED_LANGS as unknown as string[],
    nonExplicitSupportedLngs: true,
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "cabo-lang",
    },
  });

// Mantém o atributo <html lang> em sincronia (SEO + acessibilidade)
const applyLang = (lng: string) => {
  if (typeof document !== "undefined") {
    document.documentElement.lang = (lng || "pt").slice(0, 2);
  }
};
applyLang(i18n.resolvedLanguage || i18n.language);
i18n.on("languageChanged", applyLang);

export default i18n;
