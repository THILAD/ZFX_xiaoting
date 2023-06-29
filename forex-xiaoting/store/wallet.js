const axios = require("axios");
import secureStorage from "../plugins/secure-storage";
export default {
  state: () => ({
    isLoading: false,
    stateHistories: [],
    isEndPage: false,
    isEmpty: false,
    stateWithdraw: [],
    isWithdrawEmpty: false,
    stateDeposit: [],
    isDepositEmpty: false,
    stateBet: [],
    isBetEmpty: false,
  }),
  mutations: {
    INIT_STATE(state) {
      state.isLoading = true;
    },
    SET_STATUS(state) {
      state.isLoading = false;
    },
    SET_HISTORY_DATA(state, data) {
      for (let index = 0; index < data.data.length; index++) {
        state.stateHistories.push(data.data[index]);
      }

      state.stateHistories.length == 0
        ? (state.isEmpty = true)
        : (state.isEmpty = false);
    },
    SET_HISTORY_WITHDRAW(state, data) {
      // if (secureStorage.getItem("withdraw")) {
      //   state.stateWithdraw = secureStorage.getItem("withdraw");
      // }
      state.stateWithdraw = data;
      state.stateWithdraw.length == 0
        ? (state.isDepositEmpty = true)
        : (state.isDepositEmpty = false);
    },
    SET_HISTORY_DEPOSIT(state, data) {
      // if (secureStorage.getItem("deposit")) {
      //   state.stateDeposit = secureStorage.getItem("deposit");
      // }
      state.stateDeposit = data;
      state.stateDeposit.length == 0
        ? (state.isDepositEmpty = true)
        : (state.isDepositEmpty = false);
    },
    SET_HISTORY_BET(state, data) {
      // if (secureStorage.getItem("position")) {
      //   state.stateBet = secureStorage.getItem("position");
      // }
      state.stateBet = data;
      state.stateBet.length == 0
        ? (state.isBetEmpty = true)
        : (state.isBetEmpty = false);
    },
    SET_HISTORY_DATA_ONRELOAD(state, data) {
      state.stateHistories = data.data;
      state.stateHistories.length == 0
        ? (state.isEmpty = true)
        : (state.isEmpty = false);
    },
    SET_END_PAGE(state) {
      state.isEndPage = true;
    },
  },
  actions: {
    async requestDeposit({ commit }, item) {
      commit("INIT_STATE");
      try {
        var res = await this.$axios({
          method: "post",
          url: process.env.BASE_URL + `/request/deposit`,
          data: {
            amount: parseInt(item.amount),
            transferSlip: item.transferSlip,
            passcode:item.passcode
            
          },
        });

        return res;
      } catch (error) {
        throw error;
      } finally {
        commit("SET_STATUS");
      }
    },
    async requestWithdraw({ commit }, item) {
      commit("INIT_STATE");
      

      try {
        var res = await this.$axios({
          method: "post",
          url: process.env.BASE_URL + `/request/withdraw`,
          data: {
            amount: parseInt(item.amount),
            transferSlip: item.transferSlip,
            passcode:item.passcode,
          },
        });

        return res;
      } catch (error) {
        throw error;
      } finally {
        commit("SET_STATUS");
      }
    },
    async upLoad({ commit }, item) {
      commit("INIT_STATE");
      try {
        var res = await this.$axios({
          method: "post",
          url: process.env.BASE_URL + `/upload/wallet`,
          data: item,
        });
        return res;
      } catch (error) {
        throw error;
      } finally {
        commit("SET_STATUS");
      }
    },
    async getHistoryWithdraw({ commit }, item) {
      var cUrl = process.env.BASE_URL + `/request?type=withdraw`;
      try {
        var res = await this.$axios({
          method: "get",
          url: cUrl,
        });
        if (res.status == 200) {
          // console.log(res.data.data);
          // secureStorage.setItem("withdraw", res.data.data);
          commit("SET_HISTORY_WITHDRAW", res.data.data);
        }

        return res;
      } catch (error) {
        throw error;
      }
    },
    async getHistoryDeposit({ commit }, item) {
      var cUrl = process.env.BASE_URL + `/wallet/history?type=deposit`;
      try {
        var res = await this.$axios({
          method: "get",
          url: cUrl,
        });
       
        if (res.status == 200) {
          // secureStorage.setItem("deposit", res.data.data);
          commit("SET_HISTORY_DEPOSIT", res.data.data);
        }
        return res;
      } catch (error) {
        throw error;
      }
    },
    async getHistoryBet({ commit }, item) {
      var cUrl = process.env.BASE_URL + `/forex/bet`;
      try {
        var res = await this.$axios({
          method: "get",
          url: cUrl,
        });
        if (res.status == 200) {
          // secureStorage.setItem("position", res.data.data);
          commit("SET_HISTORY_BET", res.data.data);
        }

        return res;
      } catch (error) {
        throw error;
      }
    },
    async getHistory(action, item) {
      const {
        commit,
        getters: { stateHistories },
      } = action;
      var cUrl;
      if (item.page == 1) {
        commit("INIT_STATE");
      }
      if (
        item.showType == undefined ||
        !item.showType ||
        item.showType === ""
      ) {
        cUrl =
          process.env.BASE_URL + `/wallet/history?page=${item?.page}&limit=10`;
      } else {
        cUrl =
          process.env.BASE_URL +
          `/wallet/history?page=${item.page}&limit=10&type=${item.showType}`;
      }
      try {
        var res = await this.$axios({
          method: "get",
          url: cUrl,
        });
        if (res.status == 200) {
          if (item.page == 1) {
            commit("SET_HISTORY_DATA_ONRELOAD", res.data);
          }
          if (item.page != 1) {
            commit("SET_HISTORY_DATA", res.data);
          }
          if (res.data.pagination.next == undefined) {
            commit("SET_END_PAGE");
          }
        }

        return res;
      } catch (error) {
        throw error;
      } finally {
        commit("SET_STATUS");
      }
    },
    async myRequest({ commit }, page) {
      if (page == 1) {
        commit("INIT_STATE");
      }
      try {
        var res = await this.$axios({
          method: "get",
          url: process.env.BASE_URL + `/request?page=${page}&limit=10`,
        });
        if (res.status == 200) {
          if (page == 1) {
            commit("SET_HISTORY_DATA_ONRELOAD", res.data.data);
          }
          if (page != 1) {
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
        if (page == 1) {
          commit("SET_STATUS");
        }
      }
    },
  },
  getters: {
    isLoading: (state) => state.isLoading,
    stateHistories: (state) => state.stateHistories,
    isEndPage: (state) => state.isEndPage,
    isEmpty: (state) => state.isEmpty,
    stateWithdraw: (state) => state.stateWithdraw,
    stateDeposit: (state) => state.stateDeposit,
    stateBet: (state) => state.stateBet,
    isWithdrawEmpty: (state) => state.isWithdrawEmpty,
    isBetEmpty: (state) => state.isBetEmpty,
    isDepositEmpty: (state) => state.isDepositEmpty,
  },
};
