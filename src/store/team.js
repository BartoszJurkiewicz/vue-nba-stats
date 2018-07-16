import Vue from 'vue'
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    YBYStats: {}
  },
  mutations: {
    SET_YBY_STATS: (state, stats) => {
      Vue.set(state, 'YBYStats', stats)
    }
  },
  actions: {
    async getTeamYBYStats ({commit}, reqData) {
      console.log('getting yby stats')
      try {
        const res = await axios.get(`https://stats.nba.com/stats/teamyearbyyearstats?LeagueID=00&SeasonType=${reqData.seasonType}&PerMode=Totals&TeamID=${reqData.teamId}`)
        commit('SET_YBY_STATS', res.data.resultSets[0])
        return res.data.resultSets[0]
      } catch (err) {

      }
    }
  }
}
