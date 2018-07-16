<template>
  <el-container class="home">
    <el-main>
      <list type="team">
        <list-item v-for="team in teams" :key="team.teamId" :router-to="`/team/${team.teamId}`" :width="6">
          <template slot="photo">
            <img :src="`/team_logos/${team.tricode}.svg`" :alt="`${team.fullName} logo`">
          </template>
          <template slot="header">{{team.fullName}}</template>
          <template slot="description">{{team.confName}}</template>
        </list-item>
      </list>
    </el-main>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import List from '@/components/List'
import ListItem from '@/components/ListItem'

export default {
  name: 'home',
  components: { List, ListItem },
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
