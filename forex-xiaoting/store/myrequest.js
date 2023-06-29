const axios = require("axios");
import secureStorage from "../plugins/secure-storage";
export default {
  state: () => ({
    isLoading: false,
    stateMyrequests: [],
    isEndPage: false,
  }),
  mutations: {
    INIT_STATE(state) {
      state.isLoading = true;
    },
    SET_STATUS(state) {
      state.isLoading = false;
    },
    SET_HISTORY_DATA(state, data) {
      for (let index = 0; index < data.length; index++) {
        state.stateMyrequests.push(data[index]);
      }
    },
    SET_HISTORY_DATA_ONRELOAD(state, data) {
      state.stateMyrequests = data;
    },
    SET_END_PAGE(state) {
      state.isEndPage = true;
    },
  },
  actions: {
    async myRequest({ commit }, item) {
      if (item.page == 1) {
        commit("INIT_STATE");
      }
      try {
        var res = await this.$axios({
          method: "get",
          url:
            process.env.BASE_URL +
            `/request?page=${item["page"]}&limit=10&type=${item["showType"]}`,
        });
        if (res.status == 200) {
          if (item.page == 1) {
            commit("SET_HISTORY_DATA_ONRELOAD", res.data.data);
          }
          if (item.page != 1) {
            commit("SET_HISTORY_DATA", res.data.data);
          }
          if (res.data.pagination.next == undefined) {
            commit("SET_END_PAGE");
          }
        }
        return res;
      } catch (error) {
        throw error;
      } finally {
        if (item.page == 1) {
          commit("SET_STATUS");
        }
      }
    },
  },
  getters: {
    isLoading: (state) => state.isLoading,
    stateMyrequests: (state) => state.stateMyrequests,
    isEndPage: (state) => state.isEndPage,
  },
};
