const axios = require("axios");
import secureStorage from "../plugins/secure-storage";
export default {
  state: () => ({
    isLoading: false,
    isEmpty: false,
    stateListTitleTicket: [],
    stateMyChatInfo: [],
    stateTitleChat: "",
    stateOwnerChat: null,
    stateChatMessage: [],
    isEndPage: false,
  }),
  mutations: {
    SET_START_LOADING(state) {
      state.isLoading = true;
    },
    SET_STOP_LOADING(state) {
      state.isLoading = false;
    },
    SET_LIST_TITLE(state, data) {
      state.stateListTitleTicket = data;
    },
    SET_MESSAGE_REPLY(state, data) {
      state.stateChatMessage = [];
      for (let index = 0; index < data.data.length; index++) {
        state.stateChatMessage.unshift(data.data[index]);
      }
    },

    SET_MY_CHAT_INFO(state, data) {
      state.stateMyChatInfo = data;
      state.stateMyChatInfo.length > 0
        ? (state.isEmpty = false)
        : (state.isEmpty = true);
    },
    SET_CHAT_MESSAGE(state, data) {
      state.stateOwnerChat = data.owner;
      state.stateTitleChat = data.message;
      if (state.stateChatMessage.length == data.chat.length) {
        return;
      } else {
        state.stateChatMessage = [];
        for (let index = 0; index < data.chat.length; index++) {
          state.stateChatMessage.unshift(data.chat[index]);
        }
      }
    },
    SET_RESET_CHAT(state) {
      state.stateTitleChat = "";
      state.stateOwnerChat = null;
      state.stateChatMessage = [];
    },
  },
  actions: {
    async getListTitleTicket({ commit }) {
      try {
        var res = await this.$axios({
          method: "get",
          url: process.env.BASE_URL + `/ticket/list/title`,
        });
        commit("SET_LIST_TITLE", res.data.result);

        return res;
      } catch (error) {
        throw error;
      }
    },
    async getMyChat({ commit }) {
      commit("SET_START_LOADING");

      try {
        var res = await this.$axios({
          method: "get",
          url: process.env.BASE_URL + `/ticket`,
        });
        commit("SET_MY_CHAT_INFO", res.data.data);
        commit("SET_STOP_LOADING");

        return res;
      } catch (error) {
        commit("SET_STOP_LOADING");

        throw error;
      }
    },
    getDataDialogChat({ commit }, item) {
      commit("SET_CHAT_MESSAGE", item);
    },
    async createTicket({ commit, dispatch }, item) {
      try {
        var res = await this.$axios({
          method: "post",
          url: process.env.BASE_URL + `/ticket`,
          data: item,
        });

        if (res.status == 201) {
          dispatch("getMyChat");
        }
        return res;
      } catch (error) {
        throw error;
      }
    },
    async replyChat({ commit }, item) {
      try {
        var res = await this.$axios({
          method: "put",
          url: process.env.BASE_URL + `/ticket/${item.id}/chat`,
          data: { text: item.text },
        });
        if (res.status == 201) {
          commit("SET_MESSAGE_REPLY", res);
        }
        return res;
      } catch (error) {
        throw error;
      }
    },
    resetChat({ commit }) {
      commit("SET_RESET_CHAT");
    },
  },
  getters: {
    isLoading: (state) => state.isLoading,
    isEmpty: (state) => state.isEmpty,
    stateListTitleTicket: (state) => state.stateListTitleTicket,
    stateMyChatInfo: (state) => state.stateMyChatInfo,
    stateOwnerChat: (state) => state.stateOwnerChat,
    stateTitleChat: (state) => state.stateTitleChat,
    stateChatMessage: (state) => state.stateChatMessage,
    isEndPage: (state) => state.isEndPage,
  },
};
