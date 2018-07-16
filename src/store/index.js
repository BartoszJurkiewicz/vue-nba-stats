import Vue from 'vue'
import Vuex from 'vuex'

import teams from './teams'
import team from './team'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    teamsModule: teams,
    teamModule: team
  }
})
