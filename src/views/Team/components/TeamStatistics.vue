<template>
  <section class="team__chart" ref="container">
    <el-select v-model="activeStats" class="team__chart__select">
      <el-option value="wl" label="Wins/Losses"></el-option>
      <el-option value="wp" label="Wins percentage"></el-option>
      <el-option value="powl" label="Playoffs wins/Losses"></el-option>
      <el-option value="pts" label="Points"></el-option>
      <el-option value="reb" label="Rebounds"></el-option>
      <el-option value="ast" label="Assists"></el-option>
      <el-option value="stl" label="Steals"></el-option>
      <el-option value="blk" label="Blocks"></el-option>
    </el-select>

    <stats-chart ref="ybyStats" :chart-data="{labels: labels, datasets: datasets}" />

  </section>
</template>

<script>
import { sectionOffset } from '../mixins/'
import StatsChart from './StatsChart'

export default {
  name: 'teamStatistics',
  props: [ 'stats' ],
  components: { StatsChart },
  mixins: [ sectionOffset ],
  data () {
    return {
      activeStats: 'wl',
      keys: {
        wl: ['5', '6'],
        wp: ['7'],
        powl: ['10', '11'],
        pts: ['32'],
        reb: ['26'],
        ast: ['27'],
        stl: ['29'],
        blk: ['31']
      }
    }
  },
  computed: {
    labels () {
      let labels = this.stats.rowSet.map(item => item[3])
      return labels
    },
    datasets () {
      return this.keys[this.activeStats].map(key => {
        return {
          label: this.stats.headers[key],
          data: this.stats.rowSet.map(item => item[key])
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.team__chart {
  margin: 6rem 0;
}
.team__chart__select {
  margin-bottom: 2rem;
}
</style>
