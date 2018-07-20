import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

import teams from './teams'
import team from './team'
import players from './players'
import player from './player'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: true,
    season: `${moment().subtract(1, 'years').format('YYYY')}-${moment().format('YY')}`
  },
  mutations: {
    SET_LOADER: (state, bool) => {
      state.isLoading = bool
    }
  },
  modules: {
    teamsModule: teams,
    teamModule: team,
    playersModule: players,
    playerModule: player
  }
})
