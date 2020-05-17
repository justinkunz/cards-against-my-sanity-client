import * as mutationTypes from '../../constants/mutationTypes';
import API from '../../api';

const state = {
  id: null,
  isVIP: false,
  isCardzar: false,
  submittedCard: false,
  hand: [],
  score: 0,
};

const mutations = {
  [mutationTypes.SET_PLAYER_INFO](state, { playerId, isVIP }) {
    state.playerId = playerId;
    state.isVIP = isVIP;
  },
  [mutationTypes.SUBMIT_CARD](state, submittedCard) {
    state.submittedCard = submittedCard;
  },
  [mutationTypes.UPDATE_HAND](state, hand) {
    state.hand = hand;
  },
  [mutationTypes.SET_ROLE](state, game) {
    const players = game.players || {};
    const me = players[state.playerId];
    state.isCardzar = me && me.isCardzar;
  },

};

const actions = {
  async getPlayerInfo({ commit }, { gameId }) {
    const { hand, submittedCard, isVIP, playerId } = await API.players.getInfo(gameId);
    commit(mutationTypes.SET_PLAYER_INFO, { playerId, isVIP })
    commit(mutationTypes.UPDATE_HAND, hand);
    commit(mutationTypes.SUBMIT_CARD, submittedCard);
  },
  async submitCard({ commit, state }, { gameId, cardId }) {
    if (state.submittedCard || state.isCardzar) return;

    const { hand, submittedCard } = await API.games.submitCard(gameId, cardId);
    commit(mutationTypes.UPDATE_HAND, hand);
    commit(mutationTypes.SUBMIT_CARD, submittedCard);
  },
  async addPlayer({ commit }, { gameId, name }) {
    const { jwtToken, hand, isVIP, playerId } = await API.players.add(gameId, name);
    localStorage.setItem(`p-${gameId}`, jwtToken);
    commit(mutationTypes.SET_PLAYER_INFO, { playerId, isVIP });
    commit(mutationTypes.UPDATE_HAND, hand);
  },
  async refreshHand(context, { gameId }) {
   await API.players.refreshHand(gameId)
  }
}
export default { state, mutations, actions };
