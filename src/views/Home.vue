<template>
  <div class="home">
    <list :items="teams" type="team" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import List from '@/components/List'

export default {
  name: 'home',
  components: { List },
  computed: {
    ...mapGetters({
      teams: 'teamsModule/_getNbaTeams'
    })
  },
  created () {
    if (this.teams.length === 0) this.$store.dispatch('teamsModule/getTeams')
  }
}
</script>
