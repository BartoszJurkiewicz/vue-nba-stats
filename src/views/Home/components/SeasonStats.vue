<template>
  <el-col :sm="8">
    <h4 v-if="label" @click="sortDesc = !sortDesc" class="stats-table__title btn" :class="sortDesc ? 'desc' : 'asc'">{{label}}</h4>
    <ul class="stats-table" v-if="sorted.length > 0">
      <li v-for="(row, index) in sorted" :key="`${label}-${index}`" class="stats-table__row" :class="`row__${index}`">
        <span class="stats-table__cell stats-table__cell--sm">
          {{row[property]}}
        </span>
        <span class="stats-table__cell stats-table__cell--bg">
          <router-link :to="getRouterUrl(row)">
            <template v-if="type === 'team'">
              {{getTeamName(row.teamId)}}
            </template>
            <template v-else-if="type === 'player'">
              {{row.player}}
            </template>
          </router-link>
        </span>
      </li>
    </ul>
    <template v-if="allStats.length >= results">
      <p v-if="results !== allStats.length" @click="results = allStats.length" class="stats-table__btn btn">Show all</p>
      <p v-else @click="results = 5" class="stats-table__btn btn">Show less</p>
    </template>
  </el-col>
</template>

<script>
export default {
  name: 'seasonStats',
  props: { 
    'property': {
      type: String,
      required: true,
      default: ''
    }, 
    'allStats': {
      type: Array,
      required: true,
      default: []
    }, 
    'allTeams': {
      type: Array,
      required: true
    }, 
    'label': {
      type: String
    },
    'type': {
      type: String,
      required: true
    }
  },
  data () {
    return {
      sortDesc: true,
      results: 5
    }
  },
  computed: {
    sorted () {
      const stats = this.allStats.filter(item => item[this.property] !== '-')
      stats.sort((a, b) => a[this.property] - b[this.property])
      if (this.sortDesc) stats.reverse()
      return stats
      .slice(0, this.results)
    }
  },
  methods: {
    getRouterUrl (row) { return this.type === 'team' ? `team/${row.url}` : `player/${row.playerID}` },
    getTeamName (id) { 
      const team = this.allTeams.find( team => team.teamId === id )
      return team ? team.fullName : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.stats-table__title {
  display: flex;
  align-items: center;
  text-align: left;
  cursor: pointer;
  &.desc, &.asc {
    &:after {
      content: '';
      width: 0; 
      height: 0;
      margin-left: 1rem;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid black;
      transition: .4s;     
    }
  }
  &.desc {
    &:after {
      transform: rotate(0deg)
    }
  }
  &.asc {
    &:after {
      transform: rotate(180deg)
    }
  }
}
.stats-table {
  max-height: 240px;
  overflow: auto;
}
.stats-table__row {
  display: flex;
  font-size: .8rem;
  &.row__0 {
    font-size: 1rem;
    font-weight: 600;
  }
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
.stats-table__btn {
  cursor: pointer;
}
</style>
