import Vue from 'vue'
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    YBYStats: {
      rowSet: []
    },
    franchiseLeaders: [],
    teamDetails: [],
    commonTeamRoster: []
  },
  mutations: {
    SET_YBY_STATS: (state, stats) => {
      Vue.set(state, 'YBYStats', stats)
    },
    SET_FRANCHISE_LEADERS: (state, data) => {
      Vue.set(state, 'franchiseLeaders', data)
    },
    SET_TEAM_DETAILS: (state, details) => {
      Vue.set(state, 'teamDetails', details)
    },
    SET_COMMON_TEAM_ROSTER: (state, data) => {
      Vue.set(state, 'commonTeamRoster', data)
    }
  },
  actions: {
    async getTeamYBYStats ({commit}, reqData) {
      try {
        const res = await axios.get(`https://stats.nba.com/stats/teamyearbyyearstats?LeagueID=00&SeasonType=${reqData.seasonType}&PerMode=Totals&TeamID=${reqData.teamId}`)
        commit('SET_YBY_STATS', res.data.resultSets[0])
        return res.data.resultSets[0]
      } catch (err) {

      }
    },
    async getFranchiseLeaders ({commit}, teamID) {
      try {
        const res = await axios.get(`https://stats.nba.com/stats/franchiseleaders?teamID=${teamID}`)
        commit('SET_FRANCHISE_LEADERS', res.data.resultSets)
        return res.data.resultSets
      } catch (err) {}
    },
    async getTeamDetails ({commit}, teamID) {
      try {
        const res = await axios.get(`https://stats.nba.com/stats/teamDetails?teamID=${teamID}`)
        commit('SET_TEAM_DETAILS', res.data.resultSets)
        return res.data.resultSets
      } catch (err) {}
    },
    async getCommonTeamRoster ({commit}, teamID) {
      try {
        const res = await axios.get(`https://stats.nba.com/stats/commonteamroster?LeagueID=00&Season=2017-18&TeamID=${teamID}`)
        commit('SET_COMMON_TEAM_ROSTER', res.data.resultSets)
        return res.data.resultSets
      } catch (err) {}
    }
  },
  getters: {
    _getThisYearStats: state => state.YBYStats.rowSet.reverse()[0]
  }
}
