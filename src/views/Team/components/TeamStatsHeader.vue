<template>
  <div class="team__stats-header" ref="regStats">
    <el-row v-if="teamData">
      <img :src="`/team_logos/${teamData.tricode}.svg`" :alt="`${teamData.fullName} logo`" class="team__header__logo">
      <h1>{{teamData.fullName}}</h1>
    </el-row>
    <el-row v-if="thisYearStats" type="flex" justify="center" class="team__header__this-year-stats">
      <el-col :sm="10">
        <p class="this-year-stats__conference" v-if="teamData">
          Conference: 
          <strong>
            {{teamData.confName}}
          </strong>
        </p>
        <p class="this-year-stats__season">
          Season: 
          <strong>
            {{thisYearStats[3]}}
          </strong>
        </p>
        <p class="this-year-stats__wins">
          Wins:
          <strong>
            {{thisYearStats[5]}}
          </strong> 
        </p>
        <p class="this-year-stats__losses">
          Losses: 
          <strong>
            {{thisYearStats[6]}}
          </strong>
        </p>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="22">
        <h2 class="text-left">Regular season:</h2>
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
  props: {
    'teamData': {
      type: Object,
      required: true
    },
    'thisYearStats': {
      type: Array,
      required: true
    },
    'regularSeasonStats': {
      type: Object,
      required: true
    }
  },
  mounted () {
    this.$emit('canObserve', {el: this.$refs.regStats, name: 'regStats'})
  }
}
</script>

<style lang="scss" scoped>
.team__stats-header__this-year-stats {
  margin: 1rem 0;
}
.team__stats-header__regular-season-stats {
  margin-bottom: 2rem;
}
</style>
