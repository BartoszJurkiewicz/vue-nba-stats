<template>
  <section class="team__players" ref="container">
    <el-row type="flex" justify="center">
      <el-col>
        <h2 class="section__title text-left">Players</h2>
      </el-col>
    </el-row>
    <list>
      <list-item v-for="player in teamPlayers" :key="player.personId" :router-to="`/player/${player.personId}`" :width="6">
        <template slot="photo">
          <img :src="`//ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.personId}.png`" :alt="`${player.displayName} photo`">
        </template>
        <template slot="header">{{player.displayName}}</template>
        <template slot="description">{{player.posExpanded}}</template>
        <template slot="footer">{{player.heightFeet}}'{{player.heightInches}} | {{player.weightPounds}}lbs</template>
      </list-item>
    </list>
  </section>
</template>

<script>
import { sectionOffset } from '../mixins/'
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
  mixins: [ sectionOffset ],
  components: { List, ListItem }
}
</script>

