import * as mutationTypes from '../../constants/mutationTypes';
import API from '../../api';
const state = {
    showPlayerList: true
}

const mutations = {
    [mutationTypes.TOGGLE_PLAYER_LIST](state) {
        state.showPlayerList = !state.showPlayerList
    }
}

const actions = {
    togglePlayerListView({ commit }) {
        commit(mutationTypes.TOGGLE_PLAYER_LIST);
    },
    async getConfig() {
       const data = await API.config.firebase();
       console.log(data);
    }
}
export default { state, mutations, actions };