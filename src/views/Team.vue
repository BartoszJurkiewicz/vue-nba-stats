<template>
  <el-container class="team">
    <el-main>
      <team-stats-header :team-data="teamData" :this-year-stats="thisYearStats" :regular-season-stats="regularSeasonStats" />
      <list v-if="teamPlayers.length > 0">
        <list-item v-for="player in teamPlayers" :key="player.personId" :router-to="`/player/${player.personId}`" :width="4">
          <template slot="photo">
            <img :src="`//ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.personId}.png`" :alt="`${player.displayName} photo`">
          </template>
          <template slot="header">{{player.displayName}}</template>
          <template slot="description">{{player.posExpanded}}</template>
          <template slot="footer">{{player.heightFeet}}'{{player.heightInches}} | {{player.weightPounds}} lbs</template>
        </list-item>
      </list>
    </el-main>
  </el-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import store from '@/store/'
import TeamStatsHeader from '@/components/TeamStatsHeader'
import List from '@/components/List'
import ListItem from '@/components/ListItem'

export default {
  name: 'team',
  props: [ 'teamID' ],
  components: { TeamStatsHeader, List, ListItem },
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
