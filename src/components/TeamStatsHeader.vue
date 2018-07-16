<template>
  <div class="team__header">
    <el-row>
      <img v-if="teamData" :src="`/team_logos/${teamData.tricode}.svg`" :alt="`${teamData.fullName} logo`" class="team__header__logo">
    </el-row>
    <el-row v-if="thisYearStats" type="flex" justify="center" class="team__header__this-year-stats">
      <el-col :sm="10">
        <p class="this-year-stats__season">Season: {{thisYearStats[3]}}</p>
        <p class="this-year-stats__wins">Wins: {{thisYearStats[5]}}</p>
        <p class="this-year-stats__losses">Losses: {{thisYearStats[6]}}</p>
      </el-col>
    </el-row>
    <el-row type="flex" v-if="regularSeasonStats" class="team__header__regular-season-stats">
      <el-col>
        <el-tooltip effect="dark" content="Assists per game">
          <p>
            APG: {{regularSeasonStats.apg.avg}}
          </p>
        </el-tooltip>
      </el-col>
      <el-col>
        <el-tooltip effect="dark" content="Blocks per game">
          <p>BPG: {{regularSeasonStats.bpg.avg}}</p>
        </el-tooltip>
      </el-col>
      <el-col>
        <el-tooltip effect="dark" content="Points per game">
          <p>PPG: {{regularSeasonStats.ppg.avg}}</p>
        </el-tooltip>
      </el-col>
      <el-col>
        <el-tooltip effect="dark" content="Opponent points per game">
          <p>OPPG: {{regularSeasonStats.oppg.avg}}</p>
        </el-tooltip>
      </el-col>
      <el-col>
        <el-tooltip effect="dark" content="Steals per game">
          <p>SPG: {{regularSeasonStats.spg.avg}}</p>
        </el-tooltip>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'teamStatsHeader',
  props: [ 'teamData', 'thisYearStats', 'regularSeasonStats' ]
}
</script>

<style lang="scss" scoped>
.team__header__this-year-stats {
  margin: 2rem 0;
}
.team__header__regular-season-stats {
  margin-bottom: 2rem;
}
</style>
