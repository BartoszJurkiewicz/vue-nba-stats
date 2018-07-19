<template>
  <section class="team__players" ref="team">
    <el-row type="flex" justify="center">
      <el-col>
        <h2 class="section__title text-left">Players</h2>
      </el-col>
    </el-row>
    <list>
      <list-item v-for="player in teamPlayers" :key="player[12]" :router-to="`/player/${player[12]}`" :width="6">
        <template slot="photo">
          <img :src="`//ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player[12]}.png`" :alt="`${player[3]} photo`">
        </template>
        <template slot="header">{{player[3]}}</template>
        <template slot="description">{{player[5]}}</template>
        <template slot="footer">{{player[6].replace("-", "'")}} | {{player[7]}} lbs</template>
      </list-item>
    </list>
  </section>
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
    this.$nextTick(() => {
      this.$emit('canObserve', {offset: this.$refs.team.offsetTop, name: 'team'})
    })
  }
}
</script>

