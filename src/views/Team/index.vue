<template>
  <el-container class="team" ref="container" @scroll="handleScroll">
    <el-row type="flex" justify="center">
      <el-col :lg="18">
        
        <team-header :active-section="activeSection" @changeSection="name => changeActiveSection(name)" />

        <el-main class="team__main-container">

          <team-details :team-data="teamData" :this-year-stats="thisYearStats" :coach="coach" @canObserve="pushOffsetData" />

          <season-stats v-if="regularSeasonStats" season="2017-18" :season-stats="regularSeasonStats" />

          <franchise-leaders v-if="franchiseLeaders" :leaders="franchiseLeaders[0].rowSet[0]" />

          <team-players v-if="teamPlayers.length > 0" :team-players="teamPlayers" @canObserve="pushOffsetData" />

          <team-statistics :stats="YBYStats" @canObserve="pushOffsetData" />

        </el-main>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import store from '@/store/'
import TeamHeader from './components/TeamHeader'
import TeamDetails from './components/TeamDetails'
import SeasonStats from './components/SeasonStats'
import TeamPlayers from './components/TeamPlayers'
import TeamStatistics from './components/TeamStatistics'
import FranchiseLeaders from './components/FranchiseLeaders'

export default {
  name: 'team',
  props: [ 'teamID' ],
  components: { TeamHeader, TeamDetails, SeasonStats, TeamPlayers, TeamStatistics, FranchiseLeaders },
  data () {
    return {
      activeSection: "info",
      sectionOffsets: [],
      activeStats: 'wl',
      labels: {
        apg: 'Assists per game',
        bpg: 'Blocks per game',
        ppg: 'Points per game',
        oppg: 'Opponent points per game',
        spg: 'Steals per game'
      }
    }
  },
  computed: {
    ...mapState('teamModule', [ 'YBYStats', 'franchiseLeaders', 'teamDetails', 'commonTeamRoster' ]),
    ...mapGetters({
      thisYearStats: 'teamModule/_getThisYearStats'
    }),
    teamData () {
      return this.$store.getters['teamsModule/_getTeamData'](this.teamID)
    },
    regularSeasonStats () {
      const stats = this.$store.getters['teamsModule/_getTeamPreOrRegSeasonStats']({seasonType: 'regularSeason', teamID: this.teamID})
      const statsToShow = ['apg', 'bpg', 'ppg', 'oppg', 'spg']
      return statsToShow.map(statName => {
        return {
          short: statName,
          label: this.labels[statName],
          value: stats[statName].avg
        }
      })
    },
    playoffsStats () {
      return this.$store.getters['teamsModule/_getTeamPlayoffsStats'](this.teamID)
    },
    teamPlayers () {
      return this.commonTeamRoster[0].rowSet
    },
    coach () {
      return this.commonTeamRoster[1].rowSet[0]
    }
  },
  async beforeRouteEnter (to, from, next) {
    store.commit('SET_LOADER', true)
    const YBYStats = store.dispatch('teamModule/getTeamYBYStats', {teamId: to.params.id, seasonType: 'Regular+Season'}).then(res => res)
    const franchiseLeaders = store.dispatch('teamModule/getFranchiseLeaders', to.params.id).then(res => res)
    const teamDetails = store.dispatch('teamModule/getTeamDetails', to.params.id).then(res => res)
    const teamRoster = store.dispatch('teamModule/getCommonTeamRoster', to.params.id).then(res => res)
    await Promise.all([YBYStats, franchiseLeaders, teamDetails, teamRoster])
    next()
    store.commit('SET_LOADER', false)
  },
  methods: {
    ...mapActions({
      getTeams: 'teamsModule/getTeams',
      getTeamsStats: 'teamsModule/getTeamsStats',
    }),
    pushOffsetData (elData) {
      this.sectionOffsets.push({name: elData.name, offset: elData.el.offsetTop})
      this.sectionOffsets = this.sectionOffsets.sort((a, b) => a.offset - b.offset).reverse()
    },
    handleScroll (e) {
      const activeSection = this.sectionOffsets.find(el => el.offset <= window.pageYOffset + 300)
      this.activeSection = activeSection.name
    },
    changeActiveSection (sectionName) {
      this.activeSection = sectionName
      const section = this.sectionOffsets.find(el => el.name === sectionName)
      window.scroll({
        top: section.offset - 80,
        behavior: 'smooth'
      })
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
    if (!this.teamData) this.getTeams()
    if (!this.regularSeasonStats) this.getTeamsStats()
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
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
  padding-top: 4rem;
}
</style>
