const axios = require("axios");
import secureStorage from "../plugins/secure-storage";

export default {
  state: () => ({
    status: null,
    graphData: [],
    stateXAUUSD: 0,
    xauusdColor: "#4caf50",
    stateXAGUSD: 0,
    xagusdColor: "#4caf50",
    stateUSDJPY: 0,
    usdjpyColor: "#4caf50",
    stateAUDUSD: 0,
    audusdColor: "#4caf50",
    stateEURUSD: 0,
    eurusdColor: "#4caf50",
    stateUSDCAD: 0,
    usdcadColor: "#4caf50",
    stateGBPUAD: 0,
    gbpuadColor: "#4caf50",
    stateUSDCNH: 0,
    usdcnhColor: "#4caf50",
    stateUSDSEK: 0,
    usdsekColor: "#4caf50",
    stateUSDTHB: 0,
    usdthbColor: "#4caf50",

    // "#4caf50": "#FF5252",
  }),
  mutations: {
    SET_GRAPHDATA(state, data) {
      state.graphData = data;
    },
    SET_STATE_MARKET_LIST(state, data) {
      switch (data.key) {
        case "XAU/USD":
          Number(state.stateXAUUSD) < Number(data.value)
            ? (state.xauusdColor = "#4caf50")
            : (state.xauusdColor = "#FF5252");
          state.stateXAUUSD = data.value;
          break;
        case "XAG/USD":
          Number(state.stateXAGUSD) < Number(data.value)
            ? (state.xagusdColor = "#4caf50")
            : (state.xagusdColor = "#FF5252");
          state.stateXAGUSD = data.value;
          break;
        case "USD/JPY":
          Number(state.stateUSDJPY) < Number(data.value)
            ? (state.usdjpyColor = "#4caf50")
            : (state.usdjpyColor = "#FF5252");
          state.stateUSDJPY = data.value;
          break;
        case "AUD/USD":
          Number(state.stateAUDUSD) < Number(data.value)
            ? (state.audusdColor = "#4caf50")
            : (state.audusdColor = "#FF5252");
          state.stateAUDUSD = data.value;
          break;
        case "EUR/USD":
          Number(state.stateEURUSD) < Number(data.value)
            ? (state.eurusdColor = "#4caf50")
            : (state.eurusdColor = "#FF5252");
          state.stateEURUSD = data.value;
          break;
        case "USD/CAD":
          Number(state.stateUSDCAD) < Number(data.value)
            ? (state.usdcadColor = "#4caf50")
            : (state.usdcadColor = "#FF5252");
          state.stateUSDCAD = data.value;
          break;
        case "GBP/USD":
          Number(state.stateGBPUAD) < Number(data.value)
            ? (state.gbpuadColor = "#4caf50")
            : (state.gbpuadColor = "#FF5252");
          state.stateGBPUAD = data.value;
          break;
        case "USD/CNH":
          Number(state.stateUSDCNH) < Number(data.value)
            ? (state.usdcnhColor = "#4caf50")
            : (state.usdcnhColor = "#FF5252");
          state.stateUSDCNH = data.value;
          break;
        case "USD/SEK":
          Number(state.stateUSDSEK) < Number(data.value)
            ? (state.usdsekColor = "#4caf50")
            : (state.usdsekColor = "#FF5252");
          state.stateUSDSEK = data.value;
          break;
        case "USD/THB":
          Number(state.stateUSDTHB) < Number(data.value)
            ? (state.usdthbColor = "#4caf50")
            : (state.usdthbColor = "#FF5252");
          state.stateUSDTHB = data.value;
          break;
      }
    },
    InitState(state) {
      state.graphData = [];
      state.status = "loading";
    },
  },
  actions: {
    async getGraphData({ commit }, item) {
      var response;
      const url = `https://api.polygon.io/v2/aggs/ticker/C:${item.pair}/range/${item.timeFrame}/${item.timeFrameUnit}/${item.fromDate}/${item.toDate}?adjusted=true&sort=desc&limit=2500&apiKey=${process.env.POLYGONTOKEN}`;

      try {
        response = await this.$axios({
          method: "get",
          url: url,
        });
        commit("SET_GRAPHDATA", response.data.results);

        return response.data;
      } catch (error) {
        throw error;
      }
      //   return new Promise((resolve, reject) => {
      //     commit("InitState");
      //     this.$axios({
      //       method: "post",
      //       url: `/api/user/login`,
      //       data: { email: item.email, password: item.password },
      //     })
      //       .then((resp) => {
      //         commit("SET_DATAME", resp);
      //         secureStorage.setItem("token", resp.data.data.token);
      //         secureStorage.setItem("userinfo", resp.data.data.data);
      //         resolve(resp);
      //       })
      //       .catch((err) => {
      //         commit("StateError", err);
      //         console.log("vuex error: " + err);
      //         reject(err);
      //       });
      //   });
    },
  },
  getters: {
    graphData: (state) => state.graphData,
    stateXAUUSD: (state) => state.stateXAUUSD,
    stateXAGUSD: (state) => state.stateXAGUSD,
    stateUSDJPY: (state) => state.stateUSDJPY,
    stateAUDUSD: (state) => state.stateAUDUSD,
    stateEURUSD: (state) => state.stateEURUSD,
    stateUSDCAD: (state) => state.stateUSDCAD,
    stateGBPUAD: (state) => state.stateGBPUAD,
    stateUSDCNH: (state) => state.stateUSDCNH,
    stateUSDSEK: (state) => state.stateUSDSEK,
    stateUSDTHB: (state) => state.stateUSDTHB,

    xauusdColor: (state) => state.xauusdColor,
    xagusdColor: (state) => state.xagusdColor,
    usdjpyColor: (state) => state.usdjpyColor,
    audusdColor: (state) => state.audusdColor,
    eurusdColor: (state) => state.eurusdColor,
    usdcadColor: (state) => state.usdcadColor,
    gbpuadColor: (state) => state.gbpuadColor,
    usdcnhColor: (state) => state.usdcnhColor,
    usdsekColor: (state) => state.usdsekColor,
    usdthbColor: (state) => state.usdthbColor,
  },
};
