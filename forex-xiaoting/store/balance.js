const axios = require("axios");
import secureStorage from "../plugins/secure-storage";
export default {
  state: () => ({
    status: null,
    BalanceInfo: {},
  }),
  mutations: {
    InitState(state) {
      state.userInfo = [];
    },
    SET_BALANCE_INFO(state, data) {
      state.BalanceInfo = data.result;
    },
  },
  actions: {
    async myBalance({ commit }) {
      var res;
      try {
        res = await this.$axios({
          method: "get",
          url: process.env.BASE_URL + `/wallet/balance`,
        });

        if (res.status == 200) {
          commit("SET_BALANCE_INFO", res.data);
        }
        return res.data;
      } catch (error) {}
    },
  },
  getters: {
    BalanceInfo: (state) => state.BalanceInfo,
  },
};
