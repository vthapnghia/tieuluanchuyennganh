import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import translationVI from "./vi-VN.json";

const resources = {
  vi: {
    translation: translationVI,
  },
};

i18n.use(Backend).use(initReactI18next).init({
  resources,
  lng: "vi",
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
