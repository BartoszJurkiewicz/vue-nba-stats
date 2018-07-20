import Vue from 'vue'
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    YBYStats: {
      Advanced: [],
      Base: []
    }
  },
  mutations: {
    SET_YBY_STATS: (state, stats) => {
      Vue.set(state.YBYStats, stats.parameters.MeasureType, stats.resultSets)
    }
  },
  actions: {
    async getYBYStats ({commit, rootState}, reqData) {
      try {
        const res = await axios.get(`https://stats.nba.com/stats/playerdashboardbyyearoveryear?DateFrom=${reqData.from}&DateTo=${reqData.to}&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=${reqData.measureType}&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerID=${reqData.playerID}&PlusMinus=N&Rank=N&Season=${rootState.season}&SeasonSegment=&SeasonType=${reqData.seasonType}&ShotClockRange=&Split=yoy&VsConference=&VsDivision=`)
        commit('SET_YBY_STATS', res.data)
        return res.data
      } catch (err) {
      }
    }
  }
}
