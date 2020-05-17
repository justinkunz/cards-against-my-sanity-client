const axios = require("axios");

const apiHandler = {
  get: (endpoint, headers, params) =>
    axios({
      method: "GET",
      url: `/api/${endpoint}`,
      headers,
      params,
    }),
  post: (endpoint, headers, data) =>
    axios({
      method: "POST",
      url: `/api/${endpoint}`,
      headers,
      data,
    }),
  put: (endpoint, headers) =>
    axios({
      method: "PUT",
      url: `/api/${endpoint}`,
      headers,
    }),
  delete: (endpoint, headers) =>
    axios({
      method: "DELETE",
      url: `/api/${endpoint}`,
      headers,
    }),
};

const API = {
  games: {
    create: async (options) => {
      const { data } = await apiHandler.post("game", {}, { options });
      return data;
    },
    start: async (gameId) => {
      const Authorization = localStorage.getItem(`p-${gameId}`);
      const { data } = await apiHandler.post(`game/${gameId}/start`, {
        Authorization,
      });
      return data;
    },
    submitCard: async (gameId, cardId) => {
      const Authorization = localStorage.getItem(`p-${gameId}`);
      const { data } = await apiHandler.post(
        `game/${gameId}/card`,
        { Authorization },
        { cardId }
      );
      return data;
    },
    chooseWinner: async (gameId, cardId) => {
      const Authorization = localStorage.getItem(`p-${gameId}`);
      const { data } = await apiHandler.post(
        `game/${gameId}/round`,
        { Authorization },
        { cardId }
      );
      return data;
    },
    nextRound: async (gameId) => {
      const Authorization = localStorage.getItem(`p-${gameId}`);
      const { data } = await apiHandler.post(`game/${gameId}/round/reset`, {
        Authorization,
      });
      return data;
    },
    getExpansionPacks: async (query) => {
      const { data } = await apiHandler.get("game/deck", {}, query);
      return data;
    },
    resetGame: async (gameId) => {
      const Authorization = localStorage.getItem(`p-${gameId}`);
      const { data } = await apiHandler.post(`game/${gameId}/reset`, {
        Authorization,
      });
      return data;
    },
    skipBlackCard: async (gameId) => {
      const Authorization = localStorage.getItem(`p-${gameId}`);
      const { data } = await apiHandler.put(`game/${gameId}/card`, {
        Authorization,
      });
      return data;
    },
    checkStatus: async (gameId) => {
      const Authorization = localStorage.getItem(`p-${gameId}`);
      const { data } = await apiHandler.get(`game/${gameId}/round`, {
        Authorization,
      });
      return data;
    },
  },
  players: {
    add: async (gameId, name) => {
      const Authorization = localStorage.getItem(`p-${gameId}`);
      const { data } = await apiHandler.post(
        `game/${gameId}/player`,
        { Authorization },
        { name }
      );
      return data;
    },
    getInfo: async (gameId) => {
      const Authorization = localStorage.getItem(`p-${gameId}`);
      const { data } = await apiHandler.get(`game/${gameId}/player`, {
        Authorization,
      });
      return data;
    },

    refreshHand: async (gameId) => {
      const Authorization = localStorage.getItem(`p-${gameId}`);
      const { data } = await apiHandler.delete(`game/${gameId}/player/hand`, {
        Authorization,
      });
      return data;
    },
  },
};

module.exports = API;
