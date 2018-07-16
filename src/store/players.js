import Vue from 'vue'
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    players: []
  },
  mutations: {
    SET_PLAYERS: (state, players) => {
      Vue.set(state, 'players', players)
    }
  },
  actions: {
    async getPlayers ({commit}) {
      try {
        const res = await axios.get('http://www.nba.com/players/active_players.json')
        commit('SET_PLAYERS', res.data)
        return res.data
      } catch (err) {
      }
    }
  },
  getters: {
    _getTeamPlayers: state => teamTricode => state.players.filter(player => player.teamData.tricode === teamTricode)
  }
}
