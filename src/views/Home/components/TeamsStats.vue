<template>
  <section class="home__teams-stats">
    <el-row :gutter="40" class="home__stats">
      <h2>Regular season team statistics (2017-18)</h2>
      <season-stats :all-stats="processedStats" :all-teams="allTeams" property="ppg" label="Points per game" type="team" />
      <season-stats :all-stats="processedStats" :all-teams="allTeams" property="oppg" label="Opponent points per game" type="team" />
      <season-stats :all-stats="processedStats" :all-teams="allTeams" property="bpg" label="Blocks per game" type="team" />
    </el-row>

    <el-row :gutter="40" class="home__stats">
      <season-stats :all-stats="processedStats" :all-teams="allTeams" property="apg" label="Assists per game" type="team" />
      <season-stats :all-stats="processedStats" :all-teams="allTeams" property="spg" label="Steals per game" type="team" />
      <season-stats :all-stats="processedStats" :all-teams="allTeams" property="tpg" label="Turnovers per game" type="team" />
    </el-row>
  </section>
</template>

<script>
import SeasonStats from './SeasonStats'

export default {
  name: 'teamsStats',
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
      const processed = this.stats.map(item => {
        const processedItem = {}
        Object.keys(item).forEach(key => {
          processedItem[key] = item[key].avg || item[key]
        })
        const team = this.allTeams.find(team => team.teamId === item.teamId)
        processedItem.team = team
        processedItem.url = item.teamId
        return processedItem
      })
      return processed
    }
  }
}
</script>
