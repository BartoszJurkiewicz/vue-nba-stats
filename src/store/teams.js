import Vue from 'vue'
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    teams: []
  },
  mutations: {
    SET_TEAMS: (state, teams) => {
      Vue.set(state, 'teams', teams)
    }
  },
  actions: {
    async getTeams ({commit}) {
      try {
        const res = await axios.get('https://data.nba.net/prod/v1/2018/teams.json')
        const teams = res.data.league.standard
        commit('SET_TEAMS', teams)
        return teams
      } catch (err) {

      }
    }
  }
}
