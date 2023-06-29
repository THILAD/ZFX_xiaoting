const axios = require("axios");
import secureStorage from "../plugins/secure-storage";

export default {
  state: () => ({
    status: null,
    gainerData: [],
    loserData: [],
    XAUUSD: { last: 0, percent: 0 },
    USDJPY: { last: 0, percent: 0 },
    XAGUSD: { last: 0, percent: 0 },
    USDTHB: { last: 0, percent: 0 },
  }),
  mutations: {
    SET_XAUUSD(state, data) {
      state.XAUUSD.last = data.lastQuote.b;
      state.XAUUSD.percent = data.todaysChangePerc;
    },
    SET_USDJPY(state, data) {
      state.USDJPY.last = data.lastQuote.b;
      state.USDJPY.percent = data.todaysChangePerc;
    },
    SET_XAGUSD(state, data) {
      state.XAGUSD.last = data.lastQuote.b;
      state.XAGUSD.percent = data.todaysChangePerc;
    },
    SET_USDTHB(state, data) {
      state.USDTHB.last = data.lastQuote.b;
      state.USDTHB.percent = data.todaysChangePerc;
    },
    SET_GAINER(state, data) {
      state.gainerData = data.slice(0, 7);
    },
    SET_LOSER(state, data) {
      state.loserData = data.slice(0, 7);
    },
  },
  actions: {
    async getGainerLoserPair({ commit }) {
      var response;

      var pair = ["XAUUSD", "USDJPY", "XAGUSD", "USDTHB"];
      for (let index = 0; index < pair.length; index++) {
        const url = `https://api.polygon.io/v2/snapshot/locale/global/markets/forex/tickers/C:${pair[index]}?apiKey=${process.env.POLYGONTOKEN}`;
        try {
          response = await this.$axios({
            method: "get",
            url: url,
          });
          commit(`SET_${pair[index]}`, response.data.ticker);
        } catch (error) {
          throw error;
        }
      }
    },
    async getGainer({ commit }) {
      var response;
      const url = `https://api.polygon.io/v2/snapshot/locale/global/markets/forex/gainers?apiKey=${process.env.POLYGONTOKEN}`;
      try {
        response = await this.$axios({
          method: "get",
          url: url,
        });
        commit("SET_GAINER", response.data.tickers);
      } catch (error) {
        throw error;
      }
    },
    async getLoser({ commit }) {
      var response;
      const url = `https://api.polygon.io/v2/snapshot/locale/global/markets/forex/losers?apiKey=${process.env.POLYGONTOKEN}`;
      try {
        response = await this.$axios({
          method: "get",
          url: url,
        });
        commit("SET_LOSER", response.data.tickers);
      } catch (error) {
        throw error;
      }
    },
  },
  getters: {
    gainerData: (state) => state.gainerData,
    loserData: (state) => state.loserData,
    XAUUSD: (state) => state.XAUUSD,
    USDJPY: (state) => state.USDJPY,
    XAGUSD: (state) => state.XAGUSD,
    USDTHB: (state) => state.USDTHB,
  },
};
