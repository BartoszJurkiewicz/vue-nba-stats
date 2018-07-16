<template>
  <div class="team">
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'team',
  props: [ 'teamID' ],
  computed: {
    teamData () {
      return this.$store.getters['teamsModule/_getTeamById'](this.teamID)
    },
    YBYStats () {
      return this.$store.state.teamModule.YBYStats
    }
  },
  methods: {
    ...mapActions({
      getTeamYBYStats: 'teamModule/getTeamYBYStats'
    })
  },
  mounted () {
    this.getTeamYBYStats({teamId: this.teamID, seasonType: 'Playoffs'})
  }
}
</script>
