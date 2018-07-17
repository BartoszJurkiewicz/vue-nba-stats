<template>
  <section class="home__players-stats">
    <el-row :gutter="40" class="home__stats">
      <h2>Regular season player statistics (2017-18)</h2>
      <season-stats :all-stats="processedStats" :all-teams="allTeams" property="pts" label="Points per game" type="player" />
      <season-stats :all-stats="processedStats" :all-teams="allTeams" property="ast" label="Assists per game" type="player" />
      <season-stats :all-stats="processedStats" :all-teams="allTeams" property="blk" label="Blocks per game" type="player" />
    </el-row>
    <el-row :gutter="40" class="home__stats">
      <season-stats :all-stats="processedStats" :all-teams="allTeams" property="reb" label="Rebounds per game" type="player" />
      <season-stats :all-stats="processedStats" :all-teams="allTeams" property="stl" label="Steals per game" type="player" />
      <season-stats :all-stats="processedStats" :all-teams="allTeams" property="min" label="Minutes per game" type="player" />
    </el-row>
  </section>
</template>

<script>
import SeasonStats from './SeasonStats'

export default {
  name: 'playersStats',
  props: {
    'stats': {
      type: Array,
      required: true
    },
    'allTeams': {
      type: Array,
      required: true
    }
  },
  components: { SeasonStats },
  computed: {
    processedStats () {
      const headers = ['playerID', 'rank', 'player', 'team', 'gp', 'min', 'fgm', 'fga', 'fgPct', 'fg3m', 'fg3a', 'fg3Pct', 'ftm', 'fta', 'ftPct', 'oreb', 'dreb', 'reb', 'ast', 'stl', 'blk', 'tov', 'pts', 'eff']
      const processed = this.stats.map(item => {
        const processedItem = {}
        Object.keys(item).forEach(key => {
          processedItem[headers[key]] = item[key]
        })
        const team = this.allTeams.find(team => team.tricode === processedItem.team)
        processedItem.team = team
        return processedItem
      })
      return processed
    }
  }
}
</script>
