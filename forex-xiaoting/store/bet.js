const axios = require("axios");
export default {
  state: () => ({
    isLoading: false,
  }),
  mutations: {
    INIT_STATE(state) {
      state.isLoading = true;
    },
  },
  actions: {
    async checkMaket() {
      try {
        var res = await this.$axios({
          method: "get",
          url: `https://api.polygon.io/v1/marketstatus/now?apiKey=${process.env.POLYGONTOKEN}`,
        });
        return res.data;
      } catch (error) {
        throw error;
      }
    },
    async myBetById({ commit }, id) {
      try {
        var res = await this.$axios({
          method: "get",
          url: process.env.BASE_URL + `/forex/bet/${id}`,
        });
        return res;
      } catch (error) {
        throw error;
      }
    },
    async betting({ commit }, item) {
      try {
        var res = await this.$axios({
          method: "post",
          url: process.env.BASE_URL + `/forex/bet`,
          data: item,
        });
        return res;
      } catch (error) {
        throw error;
      }
    },
  },
  getters: {
    isLoading: (state) => state.isLoading,
  },
};
