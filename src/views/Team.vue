<template>
  <div class="team">
      <header>
        <img v-if="teamData" :src="`/team_logos/${teamData.tricode}.svg`" :alt="`${teamData.fullName} logo`">
        <template v-if="thisYearStats">
          <p>Season: {{thisYearStats[3]}}</p>
          <p>Wins: {{thisYearStats[5]}}</p>
          <p>Losses: {{thisYearStats[6]}}</p>
        </template>
        <template v-if="regularSeasonStats">
          <el-tooltip effect="dark" content="Assists per game">
            <p>
              APG: {{regularSeasonStats.apg.avg}}
            </p>
          </el-tooltip>
          <el-tooltip effect="dark" content="Blocks per game">
            <p>BPG: {{regularSeasonStats.bpg.avg}}</p>
          </el-tooltip>
          <el-tooltip effect="dark" content="Points per game">
            <p>PPG: {{regularSeasonStats.ppg.avg}}</p>
          </el-tooltip>
          <el-tooltip effect="dark" content="Opponent points per game">
            <p>OPPG: {{regularSeasonStats.oppg.avg}}</p>
          </el-tooltip>
          <el-tooltip effect="dark" content="Steals per game">
            <p>SPG: {{regularSeasonStats.spg.avg}}</p>
          </el-tooltip>
        </template>
      </header>
      
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import store from '@/store/'

export default {
  name: 'team',
  props: [ 'teamID' ],
  computed: {
    teamData () {
      return this.$store.getters['teamsModule/_getTeamData'](this.teamID)
    },
    YBYStats () {
      return this.$store.state.teamModule.YBYStats
    },
    thisYearStats () {
      return this.$store.state.teamModule.YBYStats.rowSet.reverse()[0]
    },
    regularSeasonStats () {
      return this.$store.getters['teamsModule/_getTeamPreOrRegSeasonStats']({seasonType: 'regularSeason', teamID: this.teamID})
    },
    playoffsStats () {
      return this.$store.getters['teamsModule/_getTeamPlayoffsStats'](this.teamID)
    }
  },
  async beforeRouteEnter (to, from, next) {
    await store.dispatch('teamModule/getTeamYBYStats', {teamId: to.params.id, seasonType: 'Playoffs'})
    next()
  },
  methods: {
    ...mapActions({
      getTeams: 'teamsModule/getTeams',
      getTeamsStats: 'teamsModule/getTeamsStats',
      getTeamYBYStats: 'teamModule/getTeamYBYStats'
    })
  },
  created () {
    if (!this.teamData) this.getTeams()
    if (!this.regularSeasonStats) this.getTeamsStats()
  }
}
</script>
