<template>
  <el-container class="home">
    <el-main>

      <el-row v-if="regularSeasonStats" :gutter="40" class="home__stats">
        <season-stats :all-stats="regularSeasonStats.teams" :all-teams="allTeams" property="ppg" label="Points per game" />
        <season-stats :all-stats="regularSeasonStats.teams" :all-teams="allTeams" property="oppg" label="Opponent points per game" />
        <season-stats :all-stats="regularSeasonStats.teams" :all-teams="allTeams" property="bpg" label="Blocks per game" />
      </el-row>

      <el-row v-if="regularSeasonStats" :gutter="40" class="home__stats">
        <season-stats :all-stats="regularSeasonStats.teams" :all-teams="allTeams" property="apg" label="Assists per game" />
        <season-stats :all-stats="regularSeasonStats.teams" :all-teams="allTeams" property="spg" label="Steals per game" />
        <season-stats :all-stats="regularSeasonStats.teams" :all-teams="allTeams" property="tpg" label="Turnovers per game" />
      </el-row>

      <el-row>
        <el-form label-position="top" class="home__filter">
          <el-form-item label="Conference">
            <el-select v-model="conference" @change="val => activeList = val === 'allTeams' ? val : 'filteredTeams'">
              <el-option value="allTeams" label="All"></el-option>
              <el-option value="East" label="East"></el-option>
              <el-option value="West" label="West"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-row>

      <list type="team" v-if="allTeams" class="home__list">
        <list-item v-for="team in this[activeList]" :key="team.teamId" :router-to="`/team/${team.teamId}`" :width="4">
          <template slot="photo">
            <img :src="`/team_logos/${team.tricode}.svg`" :alt="`${team.fullName} logo`">
          </template>
          <template slot="header">{{team.fullName}}</template>
          <template slot="description">{{team.confName}}</template>
        </list-item>
      </list>

    </el-main>
  </el-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import List from '@/components/List'
import ListItem from '@/components/ListItem'
import SeasonStats from './components/SeasonStats'

export default {
  name: 'home',
  components: { List, ListItem, SeasonStats },
  data () {
    return {
      sort: '',
      conference: 'all',
      activeList: 'allTeams'
    }
  },
  computed: {
    ...mapGetters({
      allTeams: 'teamsModule/_getNbaTeams',
      regularSeasonStats: 'teamsModule/_getRegularSeasonStats'
    }),
    filteredTeams () {
      return this.allTeams.filter(team => team.confName === this.conference)
    }
  },
  methods: {
    ...mapActions({
      getTeams: 'teamsModule/getTeams',
      getTeamsStats: 'teamsModule/getTeamsStats'
    })
  },
  created () {
    if (this.allTeams.length === 0) this.getTeams()
    if (!this.regularSeasonStats) this.getTeamsStats()
  }
}
</script>

<style lang="scss" scoped>
.home__stats {
  margin-bottom: 4rem;
}
</style>
