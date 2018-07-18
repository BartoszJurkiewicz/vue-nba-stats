<template>
  <el-container class="player">
    <el-row type="flex" justify="center">
      <el-col :lg="18">
        <el-main v-if="playerData">
          <img :src="`//ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerID}.png`" :alt="`${playerData.displayName} photo`">
          <p v-if="playerData.isAllStar">
            <i class="el-icon-star-on"></i>
          </p>
          <p>{{playerData.displayName}}</p>
          <p>{{playerData.heightFeet}}'{{playerData.heightInches}} | {{playerData.weightPounds}} lbs</p>
          <p>{{playerData.posExpanded}}</p>
          <p>{{playerData.teamData.city}} {{playerData.teamData.nickname}}</p>
        </el-main>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'player',
  props: [ 'playerID' ],
  computed: {
    ...mapState('playerModule', ['YBYStats']),
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
    this.getPlayerYBYStats(this.playerID)
  }
}
</script>
