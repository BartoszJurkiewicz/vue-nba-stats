import Vue from 'vue'
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    teams: [],
    stats: {}
  },
  mutations: {
    SET_TEAMS: (state, teams) => {
      Vue.set(state, 'teams', teams)
    },
    SET_TEAMS_STATS: (state, stats) => {
      Vue.set(state, 'stats', stats)
    }
  },
  actions: {
    async getTeams ({commit}) {
      try {
        const res = await axios.get('https://data.nba.net/prod/v1/2018/teams.json')
        const teams = res.data.league.standard
        commit('SET_TEAMS', teams)
        commit('SET_LOADER', false, {root: true})
        return teams
      } catch (err) {

      }
    },
    async getTeamsStats ({commit}) {
      try {
        const res = await axios.get('https://data.nba.net/prod/v1/2017/team_stats_rankings.json')
        commit('SET_TEAMS_STATS', res.data.league.standard)
        return res.data.league.standard
      } catch (err) {

      }
    }
  },
  getters: {
    _getNbaTeams: state => state.teams.filter(team => team.isNBAFranchise),
    _getTeamData: state => teamID => state.teams.find(team => team.teamId === teamID),
    _getTeamPreOrRegSeasonStats: state => getData => {
      if (state.stats[getData.seasonType]) {
        return state.stats[getData.seasonType].teams.find(team => team.teamId === getData.teamID)
      }
      return false
    },
    _getRegularSeasonStats: state => state.stats.regularSeason,
    _getTeamPlayoffsStats: state => teamID => {
      let stats = []
      state.stats.playoffs.series.forEach(s => {
        if (s.teams.find(team => team.teamId === teamID)) stats.push(s.teams.filter(team => team.teamId === teamID)[0])
      })
      return stats
    }
  }
}
