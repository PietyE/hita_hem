import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { en } from "./en";
import { sv } from "./sv";
import { lang } from "constants/languageConstant";

const resources = {
  en: en,
  sv: sv,
};

const initLanguage = () => {
  const browserLang =
    typeof window !== "undefined"
      ? window?.navigator?.language?.split("-")[0]
      : null;

  // const localStorLang = null;
  // // typeof window !== "undefined" ? localStorage.getItem("language") : null;

  // if (localStorLang && Object.keys(lang).includes(localStorLang)) {
  //   return localStorLang;
  // }

  if (browserLang && Object.keys(lang).includes(browserLang)) {
    return browserLang;
  }

  return lang.en.code;
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: initLanguage(), // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    fallbackLng: ["en", "sv"],
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
