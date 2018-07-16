import Vue from 'vue'
import Vuex from 'vuex'

import teams from './teams'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    teamsModule: teams
  }
})
