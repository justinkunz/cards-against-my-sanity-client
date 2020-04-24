const axios = require('axios');


const apiHandler = {
    get:  (endpoint, headers) => axios({
        method: 'GET',
        url: `/api/${endpoint}`,
        headers,
    }),
    post: (endpoint, headers, data) => axios({
        method: 'POST',
        url: `/api/${endpoint}`,
        headers,
        data
    })
}

const API = {
    games: {
        create: async(state, options) =>  {
            console.log('creatingggg', options)
            if(!state.hasStarted){
                const { data } = await apiHandler.post('game', {}, { options })
                return data;
            }
        },
        start: async(state, gameId) => {
            if(state.players.length >= 3){
                const { data } = await apiHandler.post(`game/${gameId}/start`)
                return data;
            }
        },
        submitCard: async(state, gameId, cardId, playerId,) => {
            if(!state.submittedCard && state.me && !state.me.isCardzar){
                const { data } = await apiHandler.post(`game/${gameId}/card`, { playerId }, { cardId });
                return data;
            }
        },
        chooseWinner: async(state, gameId, cardId, playerId) => {
            if(state.me && state.me.isCardzar){
            const { data } = await apiHandler.post(`game/${gameId}/round`, { playerId }, { cardId });
            return data;
            }
        },
        nextRound: async(gameId) => {
            const { data } = await apiHandler.post(`game/${gameId}/round/reset`);
            return data;
        },
        getExpansionPacks: async() => {
            const { data } = await apiHandler.get('game/deck');
            return data;
        },
        resetGame: async(gameId) => {
            const { data } = await apiHandler.post(`game/${gameId}/reset`);
            return data;
        }

    },
    players: {
        add: async(state, gameId, name) => {
            console.log(state);
            const { data } = await apiHandler.post(`game/${gameId}/player`,{}, { name });
            return data;
        },
        getInfo: async(state, gameId, playerId) => {
        console.log(state);
           const { data } = await apiHandler.get(`game/${gameId}/player`, { playerId });
           return data;
        }
    }
    
}

module.exports = API;