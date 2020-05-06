import * as types from '../../constants/mutationTypes';

const state =  {
    scoring: false,
    nextRound: false,
    skipCard: false,
  }

const mutations =  {
    [types.SET_FETCHING_STATUS](state, { type, status }) {
      state[type] = status;
    },
  };

export default { state, mutations }