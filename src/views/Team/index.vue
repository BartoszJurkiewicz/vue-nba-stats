<template>
  <el-container class="team" ref="container">
    <el-row type="flex" justify="center">
      <el-col :lg="18">
        <el-header class="team__header">
          <el-menu :default-active="activeSection" mode="horizontal">
            <el-menu-item index="regStats">Regular season statistics</el-menu-item>
            <el-menu-item index="team">Team</el-menu-item>
            <el-menu-item index="ybyStats">Year by year statistics</el-menu-item>
          </el-menu>
        </el-header>
        <el-main class="team__main-container">

          <team-stats-header :team-data="teamData" :this-year-stats="thisYearStats" :regular-season-stats="regularSeasonStats" @canObserve="observe" />

          <team-players v-if="teamPlayers.length > 0" :team-players="teamPlayers" @canObserve="observe" />
          
        </el-main>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import store from '@/store/'
import TeamStatsHeader from './components/TeamStatsHeader'
import TeamPlayers from './components/TeamPlayers'

export default {
  name: 'team',
  props: [ 'teamID' ],
  components: { TeamStatsHeader, TeamPlayers },
  data () {
    return {
      activeSection: "regStats"
    }
  },
  computed: {
    ...mapState('teamModule', {
      YBYStats: 'YBYStats',
    }),
    ...mapGetters({
      thisYearStats: 'teamModule/_getThisYearStats'
    }),
    teamData () {
      return this.$store.getters['teamsModule/_getTeamData'](this.teamID)
    },
    regularSeasonStats () {
      return this.$store.getters['teamsModule/_getTeamPreOrRegSeasonStats']({seasonType: 'regularSeason', teamID: this.teamID})
    },
    playoffsStats () {
      return this.$store.getters['teamsModule/_getTeamPlayoffsStats'](this.teamID)
    },
    teamPlayers () {
      return (this.teamData) ? this.$store.getters['playersModule/_getTeamPlayers'](this.teamData.tricode) : []
    }
  },
  async beforeRouteEnter (to, from, next) {
    store.commit('SET_LOADER', true)
    await store.dispatch('teamModule/getTeamYBYStats', {teamId: to.params.id, seasonType: 'Playoffs'})
    next()
    store.commit('SET_LOADER', false)
  },
  methods: {
    ...mapActions({
      getTeams: 'teamsModule/getTeams',
      getTeamsStats: 'teamsModule/getTeamsStats',
      getTeamYBYStats: 'teamModule/getTeamYBYStats',
      getPlayers: 'playersModule/getPlayers'
    })
  },
  created () {
    if (!this.teamData) this.getTeams()
    if (!this.regularSeasonStats) this.getTeamsStats()
    if (this.teamPlayers.length === 0) this.getPlayers()
  }
}
</script>

<style lang="scss" scoped>
.team__header {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 2;
}
.team__main-container {
  padding-top: 6rem;
}
</style>
