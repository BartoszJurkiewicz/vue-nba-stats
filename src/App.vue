<template>
  <div id="app" v-loading="$store.state.isLoading">
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'app',
  methods: {
    ...mapActions({
      getPlayers: 'playersModule/getPlayers',
      getTeams: 'teamsModule/getTeams',
      getTeamsStats: 'teamsModule/getTeamsStats',
    }),
    async getInitialData () {
      const teams = this.getTeams().then(res => res)
      const teamsStats = this.getTeamsStats().then(res => res)
      await Promise.all([teams, teamsStats])
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
img {
  max-width: 100%
}
.el-row {
  flex: 1;
  max-width: 100%;
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
.section__title {
  padding-bottom: 1rem;
  border-bottom: 1px solid lightgray;
}
.stats-table {
  .cell {
    font-size: .8rem;
    text-align: center;
  }
}
</style>
