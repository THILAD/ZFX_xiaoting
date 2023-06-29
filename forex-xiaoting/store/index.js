export const state = () => ({
  locales: [
    {
      name: "Lao",
      value: "la",
      ficon: "~/assets/image/la.png",
    },
    {
      name: "English",
      value: "en",
      ficon: "~/assets/image/united.png",
    },
  ],
  locale: "la",
  drawer: false,
  isShowLoading: false,
});
export const getters = {
  locale: (state) => state.locales,
  locales: (state) => state.locales,
};
export const mutations = {
  // set language
  SET_LANG(state, locale) {
    state.locale = locale;
    this.$cookies.set("lang", locale);
  },
  //ser drawer
  set_drawer(state, newVal) {
    state.drawer = newVal;
  },
  SET_LOADING(state, loading) {
    state.isShowLoading = loading;
  },
};
export const actions = {};
