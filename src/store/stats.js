import Vue from 'vue'
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    homeLeaders: []
  },
  mutations: {
    SET_HOME_LEADERS: (state, stats) => {
      Vue.set(state, 'homeLeaders', stats)
    }
  },
  actions: {
    async getHomeLeaders ({commit}) {
      try {
        const res = await axios.get('https://stats.nba.com/stats/homepageLeaders?StatCategory=Points&LeagueID=00&Season=2017-18&SeasonType=Regular+Season&PlayerOrTeam=Team&GameScope=Season&PlayerScope=All+Players')
        commit('SET_HOME_LEADERS', res.data.resultSets)
        return res.data.resultSets
      } catch (err) {

      }
    }
  }
}
