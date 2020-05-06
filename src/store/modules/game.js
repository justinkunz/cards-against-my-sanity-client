import * as mutationTypes from '../../constants/mutationTypes';
import API from '../../api';

const state = {
  expansionPacks: [],
  isGameOver: false,
  gameWinner: {},
  round: {},
  hasStarted: false,
  playerSummary: [],
  blackCard: {
    id: null,
    text: "Waiting on other players. . .",
  },
};

const getters = {
  players: ({ playerSummary }) => Object.keys(playerSummary).map((key) => ({...playerSummary[key], id: key})),
  cardSubmissions: ({ playerSummary, round }) => round.ready ? round.cards : Object.keys(playerSummary).filter(key => playerSummary[key].submittedCard),
  haveCardSubmissions: ({ playerSummary }) => Object.keys(playerSummary).some(key => playerSummary[key].submittedCard)
}

const mutations = {
  [mutationTypes.SET_EXPANSION_PACKS](state, packs) {
    state.expansionPacks = packs;
  },
  [mutationTypes.SET_GAME](state, game) {
    const { blackCard, round, hasStarted } = game;

    state.playerSummary = game.players || {};
    state.hasStarted = hasStarted;
    state.round = round || {};
    state.blackCard = blackCard;
    state.isGameOver = game.gameOver || false;
    state.gameWinner = game.winner.winner || {};

  },
}

const actions = {
  updateGame({ commit }, game) {
    commit(mutationTypes.SET_GAME, game);
    commit(mutationTypes.SET_ROLE, game);
  },
  async createGame(context, options) {
    const { gameId }  = await API.games.create(options);
    return gameId;
  },
  async beginGame(context, gameId) {
    await API.games.start(gameId);
  },
  async selectRoundWinner({ rootState, commit }, { gameId, cardId }) {
    if(rootState.isFetching.scoring) return;
    commit(mutationTypes.SET_FETCHING_STATUS, { type: 'scoring', status: true });
    await API.games.chooseWinner(gameId, cardId);
    commit(mutationTypes.SET_FETCHING_STATUS, { type: 'scoring', status: false });
  },
  async nextRound({ rootState, commit }, gameId) {
    if(rootState.isFetching.nextRound) return;
    commit(mutationTypes.SET_FETCHING_STATUS, { type: 'nextRound', status: true });
    await API.games.nextRound(gameId);
    commit(mutationTypes.SET_FETCHING_STATUS, { type: 'nextRound', status: false });
  },
  async getExpansionPacks({ commit }){
    const packs = await API.games.getExpansionPacks();
    commit(mutationTypes.SET_EXPANSION_PACKS, packs)
  },
  async resetGame(app, gameId) {
    await API.games.resetGame(gameId);
  },
  async skipBlackCard({ rootState, commit }, gameId) {
    if(rootState.isFetching.skipCard) return;
    commit(mutationTypes.SET_FETCHING_STATUS, { type: 'skipCard', status: true });
    await API.games.skipBlackCard(gameId);
    commit(mutationTypes.SET_FETCHING_STATUS, { type: 'skipCard', status: false });
  },
  async checkRoundStatus(context, gameId) {
    await API.games.checkStatus(gameId);
  }
}
export default { state, mutations, getters, actions };
