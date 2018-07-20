<template>
  <el-container class="team" @scroll="handleScroll">
    <el-row type="flex" justify="center">
      <el-col :lg="18">
        
        <team-header :active-section="activeSection" @changeSection="name => changeActiveSection(name)" />

        <el-main class="team__main-container">

          <team-details ref="detailsContainer" :team-data="teamData" :this-year-stats="thisYearStats" :coach="coach" :team-details="teamDetails" />

          <season-stats v-if="regularSeasonStats" :season-stats="regularSeasonStats" />

          <franchise-leaders v-if="franchiseLeaders" :leaders="franchiseLeaders[0].rowSet[0]" />

          <achievements v-if="teamDetails" :team-details="teamDetails" />

          <team-players ref="teamContainer" v-if="teamPlayers.length > 0" :team-players="teamPlayers" />

          <team-hof ref="hofContainer" v-if="hof.rowSet.length > 0" :team-hof="hof" />

          <team-statistics ref="statsContainer" v-if="YBYStats" :stats="YBYStats" />

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
import SeasonStats from '@/components/SeasonStats'
import TeamPlayers from './components/TeamPlayers'
import TeamStatistics from './components/TeamStatistics'
import FranchiseLeaders from './components/FranchiseLeaders'
import Achievements from './components/Achievements'
import TeamHof from './components/HOF'

export default {
  name: 'team',
  props: [ 'teamID' ],
  components: { TeamHeader, TeamDetails, SeasonStats, TeamPlayers, TeamStatistics, FranchiseLeaders, Achievements, TeamHof },
  data () {
    return {
      activeSection: "detailsContainer",
      hasToSetSectionsOffset: true,
      // sectionsOffsets: [],
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
      return this.$store.getters['teamsModule/_getTeamData']({fieldName: 'teamId', fieldValue: this.teamID})
    },
    regularSeasonStats () {
      const stats = this.$store.getters['teamsModule/_getTeamPreOrRegSeasonStats']({seasonType: 'regularSeason', teamID: this.teamID})
      const statsToShow = ['apg', 'bpg', 'ppg', 'oppg', 'spg']
      if (stats) {
        return statsToShow.map(statName => {
          return {
            short: statName,
            label: this.labels[statName],
            value: stats[statName].avg
          }
        })
      } else {
        return []
      }
    },
    playoffsStats () {
      return this.$store.getters['teamsModule/_getTeamPlayoffsStats'](this.teamID)
    },
    teamPlayers () {
      const teamBackground = this.teamDetails.find(item => item.name === 'TeamBackground')
      return this.$store.getters['playersModule/_getTeamPlayers'](teamBackground.rowSet[0][1])
    },
    coach () {
      return this.commonTeamRoster.find(item => item.name === 'Coaches')
    },
    hof () {
      return this.teamDetails.find(item => item.name === 'TeamHof')
    },
    sectionsOffsets () {
      return Object.keys(this.$refs)
      .filter(sectionName => sectionName.includes('Container'))
      .map(sectionName => { return {sectionName: sectionName, offset: this.$refs[sectionName].sectionOffset} })
      .sort((a, b) => a.offset - b.offset)
      .reverse()
    }
  },
  methods: {
    ...mapActions({
      getPlayers: 'playersModule/getPlayers',
      getTeams: 'teamsModule/getTeams',
      getTeamsStats: 'teamsModule/getTeamsStats',
    }),
    handleScroll (e) {
      const activeSection = this.sectionsOffsets.find(el => el.offset <= window.pageYOffset + 140)
      this.activeSection = activeSection.sectionName
    },
    changeActiveSection (sectionName) {
      this.activeSection = sectionName
      const section = this.$refs[sectionName].$el
      window.scroll({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      })
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
  created () {
    window.addEventListener('scroll', this.handleScroll)
    if (this.teamPlayers.length < 1) this.getPlayers()
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
