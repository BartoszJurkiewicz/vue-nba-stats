<template>
  <div class="home">
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'home',
  computed: {
    ...mapState({
      teams: state => state.teamsModule.teams
    })
  },
  created () {
    this.$store.dispatch('teamsModule/getTeams')
  }
}
</script>
