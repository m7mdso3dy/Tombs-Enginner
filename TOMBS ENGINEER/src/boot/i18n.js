import { boot } from "quasar/wrappers";
import { createI18n } from "vue-i18n";
import messages from "src/i18n";

const i18nInstance = createI18n({
  legacy: false,
  globalInjection: true,
  locale: "ar-AR",
  fallbackLocale: "ar-AR",
  messages,
});

export default boot(({ app }) => {
  // Set i18n instance on app
  app.use(i18nInstance);
});
export const i18n = i18nInstance.global;
