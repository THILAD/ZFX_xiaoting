const axios = require("axios");
import secureStorage from "../plugins/secure-storage";
export default {
  state: () => ({
    status: null,
    userInfo: [],
    isLogin: false,
  }),
  mutations: {
    SET_LOGOUT(state) {
      state.userInfo = [];
      state.isLogin = false;
      secureStorage.clear();
    },

    InitState(state) {
      state.userInfo = [];
    },
    SET_DATA(state, data) {
      state.userInfo = data;
    },
    SET_CHECK_LOGIN(state, data) {
      state.isLogin = data;
    },
  },
  actions: {
    async resetPasswordLogin({ commit }, data) {
      var res;
      try {
        var res = await this.$axios({
          method: "put",
          url: process.env.BASE_URL + `/auth/resetPassword`,
          data: data,
        });
        return res;
      } catch (error) {
        throw error;
      }
    },
    checkLogin({ commit }) {
      if (secureStorage.getItem("token")) {
        commit("SET_CHECK_LOGIN", true);
      } else {
        commit("SET_CHECK_LOGIN", false);
      }
    },
    async login({ commit }, item) {
      commit("InitState");
      try {
        var res = await this.$axios({
          method: "post",
          url: process.env.BASE_URL + `/auth/login`,
          data: item,
        });

        if (res.status == 200) {
          secureStorage.setItem("token", res.data.token);
          secureStorage.setItem("userInfo", res.data);
          commit("SET_DATA", res.data);
        }
        return res;
      } catch (error) {
        throw error;
      }
    },
    async register({ commit }, item) {
      var res;
      try {
        res = await this.$axios({
          method: "post",
          url: process.env.BASE_URL + `/auth/register`,
          data: item,
        });

        return res;
      } catch (error) {
        throw error;
      }
    },
    logout({ commit }, item) {
      commit("SET_LOGOUT");
    },
  },
  getters: {
    userInfo: (state) => state.userInfo,
    isLogin: (state) => state.isLogin,
  },
};
