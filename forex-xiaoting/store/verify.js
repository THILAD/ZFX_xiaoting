const axios = require("axios");
import secureStorage from "../plugins/secure-storage";
export default {
  state: () => ({}),
  mutations: {
    INIT_STATE(state) {
      state.isLoading = true;
    },
  },
  actions: {
    async uploadVerify({ commit }, form) {
      try {
        var res = await this.$axios({
          method: "post",
          url: process.env.BASE_URL + `/upload/identify`,
          data: form,
        });

        return res;
      } catch (error) {
        throw error;
      }
    },
    async createVerify({ commit }, item) {
      try {
        var res = await this.$axios({
          method: "post",
          url: process.env.BASE_URL + `/verify/request`,
          data: item,
        });

        return res;
      } catch (error) {
        throw error;
      }
    },
    async verifyOTP({ commit }, item) {
      try {
        var res = await this.$axios({
          method: "post",
          url: process.env.BASE_URL + `/auth/verifyOtp`,
          data: item,
        });

        return res;
      } catch (error) {
        throw error;
      }
    },
    async getMyVerify() {
      try {
        var res = await this.$axios({
          method: "get",
          url: process.env.BASE_URL + `/verify`,
        });

        return res;
      } catch (error) {
        throw error;
      }
    },
  },
  getters: {
    isLoading: (state) => state.isLoading,
    stateMyrequests: (state) => state.stateMyrequests,
    isEndPage: (state) => state.isEndPage,
  },
};
