<template>
  <div id="app" v-loading="$store.state.isLoading">
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'app',
  methods: {
    ...mapActions({
      getTeams: 'teamsModule/getTeams',
      getTeamsStats: 'teamsModule/getTeamsStats',
      getHomeLeaders: 'statsModule/getHomeLeaders',
      getLeagueLeaders: 'playersModule/getLeagueLeaders'
    }),
    async getInitialData () {
      const teams = this.getTeams().then(res => res)
      const teamsStats = this.getTeamsStats().then(res => res)
      const leagueLeaders = this.getLeagueLeaders().then(res => res)
      await Promise.all([teams, teamsStats, leagueLeaders])
      this.$store.commit('SET_LOADER', false)
    }
  },
  created () {
    this.getInitialData()
  }
}
</script>


<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
#app, .el-select-dropdown__item, .el-tooltip__popper {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
button {
  background: transparent;
  border: none;
  cursor: pointer;
}
a {
  text-decoration: none;
  color: inherit;
}
ul {
  padding: 0;
  list-style-type: none;
}
.el-card {
  height: 100%;
}
.btn {
  transition: .4s;
  &:hover {
    color: lightblue;
  }
}
.text-left {
  text-align: left;
}
</style>
