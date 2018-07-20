<template>
  <el-container class="player">
    <el-row type="flex" justify="center">
      <el-col :lg="18">
        <el-main>
          <player-details v-if="playerData" :player-id="playerID" :player-data="playerData" />

          <!-- <season-stats v-if="YBYStats.length > 0" :season="" :season-stats="" /> -->
        </el-main>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
import PlayerDetails from './components/PlayerDetails'
import SeasonStats from '@/components/SeasonStats'

export default {
  name: 'player',
  props: [ 'playerID' ],
  components: { PlayerDetails },
  computed: {
    ...mapState('playerModule', ['YBYStats']),
    ...mapState(['season']),
    playerData () {
      return this.$store.getters['playersModule/_getPlayerData'](this.playerID)
    }
  },
  methods: {
    ...mapActions({
      getPlayers: 'playersModule/getPlayers',
      getPlayerYBYStats: 'playerModule/getYBYStats'
    })
  },
  created () {
    if (!this.playerData) this.getPlayers()
    const reqData = {
      from: '',
      to: '',
      playerID: this.playerID,
      seasonType: 'Regular Season'
    }
    this.getPlayerYBYStats(reqData)
  }
}
</script>
