const axios = require("axios");
import secureStorage from "../plugins/secure-storage";
export default {
  state: () => ({
    isLoading: false,
    stateMyInfo: {},
    myAvatar: "",
  }),
  mutations: {
    INIT_STATE(state) {
      state.isLoading = true;
    },
    SET_MY_INFO(state, data) {
      state.stateMyInfo = data;
    },
    SET_AVATAR(state, data) {
      state.myAvatar = data;
    },
    SET_STATUS(state) {
      state.isLoading = false;
    },
  },
  actions: {
    async getMyinfo({ commit, dispatch }, form) {
      commit("INIT_STATE");
      try {
        var res = await this.$axios({
          method: "get",
          url: process.env.BASE_URL + `/auth/me`,
        });

        if (res.status == 200) {
          // console.log(res.data.result.avatar);
          dispatch("getAvatar", res.data?.result?.user?.avatar);
          // secureStorage.setItem("myinfo", res.data.result);
          commit("SET_MY_INFO", res.data.result);
        }
        commit("SET_STATUS");
        return res.data.result;
      } catch (error) {
        commit("SET_STATUS");
      }
    },
    async uploadProfile({ commit }, form) {
      try {
        var res = await this.$axios({
          method: "post",
          url: process.env.BASE_URL + `/upload/avatar`,
          data: form,
        });

        return res;
      } catch (error) {
        throw error;
      }
    },
    async getAvatar({ commit, getters }, item) {
      if (getters.myAvatar == "") {
        commit("INIT_STATE");
        try {
          var res = await this.$axios({
            method: "get",
            responseType: "arraybuffer",
            url: process.env.BASE_URL + `/image/avatar/` + item,
          });

          commit(
            "SET_AVATAR",
            Buffer.from(res.data, "binary").toString("base64")
          );
          localStorage.setItem(
            "myAvatar",
            Buffer.from(res.data, "binary").toString("base64")
          );
        } catch (error) {
        } finally {
          commit("SET_STATUS");
        }
      }
    },
  },
  getters: {
    isLoading: (state) => state.isLoading,
    stateMyInfo: (state) => state.stateMyInfo,
    myAvatar: (state) => state.myAvatar,
  },
};
