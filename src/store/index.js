import Vue from "vue";
import Vuex from "vuex";
import API from '../api';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    me: {},
    expansionPacks: [],
    isGameOver: false,
    sendingRequest: false,
    gameWinner: {},
    playerId: '',
    isVIP: false,
    round: {},
    hasStarted: false,
    players: [],
    gameId: null,
    submittedCard: null,
    hand: [],
    blackCard: {
      id: null,
      text: "Waiting on other players. . .",
    },
  },
  mutations: {
    setGameInfo(state, { gameId, hand, isVIP }) {
      state.gameId = gameId;
      state.hand = hand;
      state.isVIP = isVIP;
    },
    setSubmittedCard(state, submittedCard) {
      console.log(submittedCard);
      state.submittedCard = submittedCard;
    },

    setPlayerInfo(state, playerId) {
      state.playerId = playerId;
    },
    setExpansionPacks(state, packs) {
      state.expansionPacks = packs;
    },

    updateGame(state, { game, gameId }) {

      const { blackCard, round, hasStarted } = game;
      const players = game.players || {};
      const mappedPlayers = Object.keys(players).map((key) => players[key]);
      const me = players[state.playerId || localStorage.getItem(`p-${gameId}`)];
      state.players = mappedPlayers;
      state.me = me || {};
      state.hasStarted = hasStarted;
      state.round = round || {};
      state.blackCard = blackCard;
      state.isGameOver = game.gameOver || false
      state.gameWinner = game.winner.winner || {}

      console.log('state after update', state)
    },
  },
  actions: {
    async createGame({state}, options) {
      console.log(options);
      const { gameId }  = await API.games.create(state, options);
      return gameId;
    },
    async getPlayerInfo({ commit, state }, { gameId, playerId }) {
      console.log("Getting player info");
      const { hand, submittedCard, isVIP } = await API.players.getInfo(state, gameId, playerId);
      console.log(hand, submittedCard);
      commit("setGameInfo", { gameId, hand, isVIP });
      commit("setSubmittedCard", submittedCard);
    },
    async beginGame({ state }, gameId) {
      await API.games.start(state, gameId);
    },
    async submitCard({ commit, state }, { gameId, cardId }) {
      console.log("choosing card");
      const playerId = localStorage.getItem(`p-${gameId}`);
      const { hand, submittedCard } = await API.games.submitCard(state, gameId, cardId, playerId);

      commit("setGameInfo", { gameId, hand });
      commit("setSubmittedCard", submittedCard);
    },
    async addPlayer({ commit, state }, { gameId, name }) {
      console.log("adding player");
      const { playerId, hand, isVIP } = await API.players.add(state, gameId, name);
      localStorage.setItem(`p-${gameId}`, playerId);
      commit("setGameInfo", { gameId, hand, isVIP });
      commit("setPlayerInfo", playerId);
    },
    async selectRoundWinner({ state }, { gameId, cardId }) {
      await API.games.chooseWinner(state, gameId, cardId, state.playerId);
    },
    async nextRound(app, gameId) {
      console.log(gameId);
      await API.games.nextRound(gameId);
    },

    async getExpansionPacks({ commit }){
      const packs = await API.games.getExpansionPacks();
      commit('setExpansionPacks', packs)
    },
    async resetGame(app, gameId) {
      await API.games.resetGame(gameId);
    }
  },
});

export default store;
