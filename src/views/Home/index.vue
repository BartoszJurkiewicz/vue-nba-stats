<template>
  <el-container class="home">
    <el-row type="flex" justify="center">
      <el-col :lg="18">
        <el-main>

          <button @click="activeStats = 'team'" type="text" class="home__stats--btn" :class="activeStats === 'team' ? 'active' : ''">Team</button>
          <button @click="activeStats = 'player'" type="text" class="home__stats--btn" :class="activeStats === 'player' ? 'active' : ''">Player</button>

          <teams-stats v-if="activeStats === 'team'" :stats="regularSeasonStats" :all-teams="allTeams" />
          <players-stats v-if="activeStats === 'player'" :stats="leagueLeaders.resultSet.rowSet" :all-teams="allTeams" />

          <el-row class="home__filter">
            <el-form label-position="top">
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
            <list-item v-for="team in this[activeList]" :key="team.teamId" :router-to="`/team/${team.teamId}`" :width="6">
              <template slot="photo">
                <img :src="`/team_logos/${team.tricode}.svg`" :alt="`${team.fullName} logo`">
              </template>
              <template slot="header">{{team.fullName}}</template>
            </list-item>
          </list>

        </el-main>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  name: 'home',
  components: { 
    List: () => import('@/components/List'),
    ListItem: () => import('@/components/ListItem'), 
    TeamsStats: () => import('./components/TeamsStats'), 
    PlayersStats: () => import('./components/PlayersStats')
  },
  data () {
    return {
      sort: '',
      conference: 'all',
      activeList: 'allTeams',
      activeStats: 'team'
    }
  },
  computed: {
    ...mapState('playersModule', ['leagueLeaders']),
    ...mapGetters({
      allTeams: 'teamsModule/_getNbaTeams',
      regularSeasonStats: 'teamsModule/_getRegularSeasonStats'
    }),
    filteredTeams () {
      return this.allTeams.filter(team => team.confName === this.conference)
    }
  }
}
</script>

<style lang="scss" scoped>
.home__stats {
  margin-bottom: 2rem;
}
.home__filter {
  margin-top: 4rem;
}
.home__stats--btn {
  padding: 1rem;
  border-radius: none;
  &.active {
    border-bottom: 1px solid
  }
}
</style>
