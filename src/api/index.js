const axios = require("axios");

const apiHandler = {
  get: (endpoint, headers) =>
    axios({
      method: "GET",
      url: `/api/${endpoint}`,
      headers,
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
};

const API = {
  games: {
    create: async (state, options) => {
      if (!state.hasStarted) {
        const { data } = await apiHandler.post("game", {}, { options });
        return data;
      }
    },
    start: async (state, gameId) => {
      if (state.players.length >= 3) {
        const Authorization = localStorage.getItem(`p-${gameId}`);
        const { data } = await apiHandler.post(`game/${gameId}/start`, {
          Authorization,
        });
        return data;
      }
    },
    submitCard: async (state, gameId, cardId) => {
      if (!state.submittedCard && state.me && !state.me.isCardzar) {
        const Authorization = localStorage.getItem(`p-${gameId}`);
        const { data } = await apiHandler.post(
          `game/${gameId}/card`,
          { Authorization },
          { cardId }
        );
        return data;
      }
    },
    chooseWinner: async (state, gameId, cardId) => {
      if (state.me && state.me.isCardzar) {
        const Authorization = localStorage.getItem(`p-${gameId}`);
        const { data } = await apiHandler.post(
          `game/${gameId}/round`,
          { Authorization },
          { cardId }
        );
        return data;
      }
    },
    nextRound: async (gameId) => {
      const Authorization = localStorage.getItem(`p-${gameId}`);
      const { data } = await apiHandler.post(`game/${gameId}/round/reset`, {
        Authorization,
      });
      return data;
    },
    getExpansionPacks: async () => {
      const { data } = await apiHandler.get("game/deck");
      return data;
    },
    resetGame: async (gameId) => {
      const Authorization = localStorage.getItem(`p-${gameId}`);
      const { data } = await apiHandler.post(`game/${gameId}/reset`, {
        Authorization,
      });
      return data;
    },
    skipBlackCard: async (state, gameId) => {
      if (state.isVIP) {
        const Authorization = localStorage.getItem(`p-${gameId}`);
        const { data } = await apiHandler.put(`game/${gameId}/card`, {
          Authorization,
        });
        return data;
      }
    },
  },
  players: {
    add: async (state, gameId, name) => {
      const Authorization = localStorage.getItem(`p-${gameId}`);
      const { data } = await apiHandler.post(
        `game/${gameId}/player`,
        { Authorization },
        { name }
      );
      return data;
    },
    getInfo: async (state, gameId) => {
      const Authorization = localStorage.getItem(`p-${gameId}`);
      const { data } = await apiHandler.get(`game/${gameId}/player`, {
        Authorization,
      });
      return data;
    },
  },
};

module.exports = API;
