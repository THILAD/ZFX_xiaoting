const axios = require("axios");
import secureStorage from "../plugins/secure-storage";
export default {
  state: () => ({
    myStaking: [],
  }),
  mutations: {
    SET_MY_STAKING(state, data) {
      state.myStaking = [
        {
          _id: "6471cd3ce79ef81fd3fbd1c3",
          owner: "646cdb59c214d5ddb1f88b3f",
          amount: 7000,
          wallet: "6471cd3ce79ef81fd3fbd1c1",
          interest: 0.05,
          savingTime: 1,
          status: "pending",
          startDate: "2023-05-27T09:28:28.592Z",
          endDate: "2023-05-28T09:28:28.592Z",
          createdAt: "2023-05-27T09:28:28.615Z",
          updatedAt: "2023-05-27T09:28:28.615Z",
          __v: 0,
        },
        {
          _id: "6471cd3ce79ef81fd3fbd1c3",
          owner: "646cdb59c214d5ddb1f88b3f",
          amount: 7000,
          wallet: "6471cd3ce79ef81fd3fbd1c1",
          interest: 0.05,
          savingTime: 1,
          status: "pending",
          startDate: "2023-05-27T09:28:28.592Z",
          endDate: "2023-05-28T09:28:28.592Z",
          createdAt: "2023-05-27T09:28:28.615Z",
          updatedAt: "2023-05-27T09:28:28.615Z",
          __v: 0,
        },
        {
          _id: "6471cd3ce79ef81fd3fbd1c3",
          owner: "646cdb59c214d5ddb1f88b3f",
          amount: 7000,
          wallet: "6471cd3ce79ef81fd3fbd1c1",
          interest: 0.05,
          savingTime: 1,
          status: "done",
          startDate: "2023-05-27T09:28:28.592Z",
          endDate: "2023-05-28T09:28:28.592Z",
          createdAt: "2023-05-27T09:28:28.615Z",
          updatedAt: "2023-05-27T09:28:28.615Z",
          __v: 0,
        },
      ];
    },
  },
  actions: {
    async requestStaking({ commit }, data) {
      var res;
      try {
        var res = await this.$axios({
          method: "post",
          url: process.env.BASE_URL + `/saving-wallet`,
          data: data,
        });
        return res;
      } catch (error) {
        throw error;
      }
    },
    async getMyRequest({ commit }) {
      var res;
      try {
        var res = await this.$axios({
          method: "get",
          url: process.env.BASE_URL + `/saving-wallet`,
        });
        commit("SET_MY_STAKING", res.data.data);
        return res;
      } catch (error) {
        throw error;
      }
    },
  },
  getters: {
    myStaking: (state) => state.myStaking,
  },
};
