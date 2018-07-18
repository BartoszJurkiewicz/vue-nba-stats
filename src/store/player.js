import Vue from 'vue'
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    YBYStats: {
      rowSet: []
    }
  },
  mutations: {
    SET_YBY_STATS: (state, stats) => {
      Vue.set(state, 'YBYStats', stats)
    }
  },
  actions: {
    async getYBYStats ({commit}, playerID) {
      try {
        const res = await axios.get(`https://stats.nba.com/stats/playerdashboardbyyearoveryear?DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerID=${playerID}&PlusMinus=N&Rank=N&Season=2017-18&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&Split=yoy&VsConference=&VsDivision=`)
        commit('SET_YBY_STATS', res.data.resultSets)
        return res.data.resultSets
      } catch (err) {
      }
    }
  }
}
