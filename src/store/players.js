import Vue from 'vue'
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    players: [],
    leagueLeaders: {}
  },
  mutations: {
    SET_PLAYERS: (state, players) => {
      Vue.set(state, 'players', players)
    },
    SET_LEAGUE_LEADERS: (state, stats) => {
      Vue.set(state, 'leagueLeaders', stats)
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
    },
    async getLeagueLeaders ({commit}) {
      try {
        const res = await axios.get('https://stats.nba.com/stats/leagueLeaders?LeagueID=00&PerMode=PerGame&Scope=S&Season=2017-18&SeasonType=Regular+Season&StatCategory=PTS')
        res.data.resultSet.rowSet = res.data.resultSet.rowSet.slice(0, 10)
        commit('SET_LEAGUE_LEADERS', res.data)
        return res.data
      } catch (err) {
      }
    }
  },
  getters: {
    _getTeamPlayers: state => teamTricode => state.players.filter(player => player.teamData.tricode === teamTricode)
  }
}
