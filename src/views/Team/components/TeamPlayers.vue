<template>
  <list ref="team">
    <list-item v-for="player in teamPlayers" :key="player.personId" :router-to="`/player/${player.personId}`" :width="6">
      <template slot="photo">
        <img :src="`//ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.personId}.png`" :alt="`${player.displayName} photo`">
      </template>
      <template slot="header">{{player.displayName}}</template>
      <template slot="description">{{player.posExpanded}}</template>
      <template slot="footer">{{player.heightFeet}}'{{player.heightInches}} | {{player.weightPounds}} lbs</template>
    </list-item>
  </list>
</template>

<script>
import List from '@/components/List'
import ListItem from '@/components/ListItem'

export default {
  name: 'teamPlayers',
  props: {
    teamPlayers: {
      type: Array,
      required: true
    }
  },
  components: { List, ListItem },
  mounted () {
    this.$emit('canObserve', this.$refs.team.$el)
  }
}
</script>

