<template>
  <section class="player__details">
    <el-row>
      <template v-if="playerData">
        <img :src="`//ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerId}.png`" :alt="`${playerData.displayName} photo`">
        <p v-if="playerData.isAllStar">
          <el-tooltip effect="dark" content="All star">

            <!-- TODO - Players listing view / filtered by isAllstar -->

            <router-link to="/players/allstars">
              <el-button icon="el-icon-star-on" circle></el-button>
            </router-link>
          </el-tooltip>
        </p>
        <p>#{{playerData.jersey}} {{playerData.displayName}}</p>
        <p>{{playerData.heightFeet}}'{{playerData.heightInches}} | {{playerData.weightPounds}}lbs</p>
        
        <!-- TODO - Players listing view / filtered by position -->

        <p>
          <router-link to="/">
            {{playerData.posExpanded}}
          </router-link>
        </p>
      </template>
      <router-link v-if="teamData" :to="`/team/${teamData.teamId}`">{{teamData.fullName}}</router-link>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'playerDetails',
  props: {
    playerId: {
      type: String,
      required: true
    },
    playerData: {
      type: Object,
      required: true
    }
  },
  computed: {
    teamData () {
      return this.$store.getters['teamsModule/_getTeamData']({fieldName: 'tricode', fieldValue: this.playerData.teamData.tricode})
    }
  }
}
</script>
