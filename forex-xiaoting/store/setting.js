const axios = require("axios");
import secureStorage from "../plugins/secure-storage";
export default {
  state: () => ({
    status: null,
  }),
  mutations: {
    InitState(state) {},
  },
  actions: {
    async setPasscode({ commit }, data) {
      var res;
      try {
        var res = await this.$axios({
          method: "post",
          url: process.env.BASE_URL + `/auth/generatePasscode`,
          data: data,
        });
        return res;
      } catch (error) {
        throw error;
      }
    },
  },
  getters: {
    // userInfo: (state) => state.userInfo,
  },
};
