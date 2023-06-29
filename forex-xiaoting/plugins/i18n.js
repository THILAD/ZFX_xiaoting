import Vue from "vue";
import VueI18n from "vue-i18n";
// import secureStorage from './secure-storage'

Vue.use(VueI18n);

export default ({ app, store }) => {
  app.i18n = new VueI18n({
    locale: app.$cookies.get("lang") || "th",
    fallbackLocale: "th",
    messages: {
      en: require("~/locales/en.json"),
      ch: require("~/locales/ch.json"),
      th: require("~/locales/th.json"),
      kr: require("~/locales/kr.json"),
      vn: require("~/locales/vn.json"),
      jp: require("~/locales/jp.json"),
    },
  });
  app.i18n.path = (link) => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`;
    }

    return `/${app.i18n.locale}/${link}`;
  };
};
