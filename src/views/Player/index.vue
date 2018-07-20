<template>
  <el-container class="player">
    <el-row type="flex" justify="center">
      <el-col :lg="18">
        <el-main>
          <player-details v-if="playerData" :player-id="playerID" :player-data="playerData" />

          <season-stats v-if="seasonStats.length > 0" :season-stats="seasonStats" :team-tricode="YBYStats.Advanced[0].rowSet[0][3]" />

          <player-stats-table v-if="YBYStats.Advanced.length > 0" :stats="YBYStats.Advanced[1].rowSet" />
        </el-main>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import store from '@/store/'
import moment from 'moment'
import PlayerDetails from './components/PlayerDetails'
import SeasonStats from '@/components/SeasonStats'
import PlayerStatsTable from './components/PlayerStatsTable'

export default {
  name: 'player',
  props: [ 'playerID' ],
  components: { PlayerDetails, SeasonStats, PlayerStatsTable },
  data () {
    return {
      labels: {
        fg3_pct: '3 Point Field Goals %',
        reb: 'Rebounds',
        ast: 'Assists',
        stl: 'Steals',
        blk: 'Blocks',
        pts: 'Points',
        dd2: 'Double doubles',
        td3: 'Triple doubles',
        gp: 'Games played',
        off_rating: 'Offensive rating',
        def_rating: 'Defensive rating',
        ast_to: 'Assist to turnover ratio',
        ast_pct: 'Assists %',
        reb_pct: 'Rebounds %',
        fg_pct: 'Field goal %'
      },
      shorts: {
        fg3_pct: '3p%',
        reb: 'reb',
        ast: 'ast',
        stl: 'stl',
        blk: 'blk',
        pts: 'pts',
        dd2: 'dd',
        td3: 'td',
        gp: 'gp',
        off_rating: 'offrating',
        def_rating: 'defrating',
        ast_to: 'astto',
        ast_pct: 'astpct',
        reb_pct: 'rebpct',
        fg_pct: 'fgpct'
      }
    }
  },
  computed: {
    ...mapState('playerModule', ['YBYStats']),
    ...mapState(['season']),
    playerData () {
      return this.$store.getters['playersModule/_getPlayerData'](this.playerID)
    },
    baseStats () {
      let base = []
      const baseProps = [15, 21, 22, 24, 25, 29, 32, 33]
      if (this.YBYStats.Base.length > 0) {
        base = baseProps.map(prop => {
          return {
            label: this.labels[this.YBYStats.Base[0].headers[prop].toLowerCase()],
            short: this.shorts[this.YBYStats.Base[0].headers[prop].toLowerCase()] || prop,
            value: this.YBYStats.Base[0].rowSet[0][prop]
          }
        })
      }
      return base
    },
    advancedStats () {
      let advanced = []
      const advanceProps = [5, 10, 11, 14, 13, 18, 29]
      if (this.YBYStats.Advanced.length > 0) {
        advanced = advanceProps.map(prop => {
          return {
            label: this.labels[this.YBYStats.Advanced[0].headers[prop].toLowerCase()],
            short: this.shorts[this.YBYStats.Advanced[0].headers[prop].toLowerCase()] || prop,
            value: this.YBYStats.Advanced[0].rowSet[0][prop]
          }
        })
      }
      return advanced
    },
    seasonStats () {
      return [...this.baseStats, ...this.advancedStats]
    }
  },
  methods: {
    ...mapActions({
      getPlayers: 'playersModule/getPlayers'
    })
  },
  async beforeRouteEnter (to, from, next) {
    const reqData = {
      from: '',
      to: '',
      playerID: to.params.id,
      seasonType: 'Regular Season',
    }
    store.commit('SET_LOADER', true)
    const YBYBaseStats = store.dispatch('playerModule/getYBYStats', Object.assign({}, reqData, { measureType: 'Advanced' })).then(res => res)
    const YBYAdvancedStats = store.dispatch('playerModule/getYBYStats', Object.assign({}, reqData, { measureType: 'Base' })).then(res => res)
    await Promise.all([YBYBaseStats, YBYAdvancedStats])
    next()
    store.commit('SET_LOADER', false)
  },
  created () {
    if (!this.playerData) this.getPlayers()
  }
}
</script>
