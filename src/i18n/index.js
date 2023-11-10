import { createI18n } from "vue-i18n";
import English from './locale/en'
import Chinese from './locale/zh'

const translations = {
  en: English,
  zh: Chinese
}

const env = import.meta.env.MODE

export default createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCALE, // <--- 1
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE, // <--- 2
  legacy: false, // <--- 3
  globalInjection: true,
  messages: translations,
  missing: (locale, key, vm, values) => {
    // This function is called when a translation key is not found
    return env === 'development'? "i18N: MISSING" : ""; // return an empty string as the fallback value
  },
})
