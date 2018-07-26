<template>
  
</template>

<script>
import store from '@/store/'

export default {
  name: 'playersList',
  props: [ 'filterData' ],
  computed: {
    a () {
      return this.$store.state.playersModule.players
    },
    playersByFilter () {
      return this.$store.getters['playersModule/_getFilteredPlayers'](this.filterData)
    }
  },
  async beforeRouteEnter (to, from, next) {
    store.commit('SET_LOADER', true)
    store.dispatch('playersModule/getPlayers')
    next()
    store.commit('SET_LOADER', false)
  }
}
</script>
