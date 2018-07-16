<template>
  <el-col :sm="8">
    <h4>{{label}}</h4>
    <ul class="stats-table">
      <li v-for="row in tableData" :key="`${label}-${row.teamID}`" class="stats-table__row">
        <span class="stats-table__cell stats-table__cell--sm">
          {{row[property]}}
        </span>
        <span class="stats-table__cell stats-table__cell--bg">
          <router-link :to="`team/${row.teamID}`">
            {{row.teamName}}
          </router-link>
        </span>
      </li>
    </ul>
  </el-col>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'seasonStats',
  props: [ 'property', 'allStats', 'allTeams', 'label' ],
  computed: {
    tableData () {
      let values = this.allStats
      .filter(item => item[this.property].avg !== '-')
      .map(item => { return {[this.property]: item[this.property].avg, teamID: item.teamId} })

      values.forEach(value => {
        const team = this.allTeams.filter(team => team.teamId === value.teamID)[0]
        value.teamName = team.fullName
      })

      return _.sortBy(values, [this.property])
      .reverse()
      .slice(0, 5)
    }
  }
}
</script>

<style lang="scss" scoped>
h4 {
  text-align: left;
}
.stats-table__row {
  display: flex;
}
.stats-table__cell {
  padding: .8rem .6rem;
  border-bottom: 1px solid black;
  text-align: left;
  &.stats-table__cell--sm {
    flex: 0 25%;
  }
  &.stats-table__cell--bg {
    flex: 1;
  }
}
</style>
