<template>
  <el-container class="home">
    <el-main>
      <el-form label-position="top">
        <el-form-item label="Conference">
          <el-select v-model="conference" @change="val => activeList = val === 'all' ? val : 'filtered'">
            <el-option value="all" label="All"></el-option>
            <el-option value="East" label="East"></el-option>
            <el-option value="West" label="West"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <list type="team" v-if="all">
        <list-item v-for="team in this[activeList]" :key="team.teamId" :router-to="`/team/${team.teamId}`" :width="6">
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
  data () {
    return {
      sort: '',
      conference: 'all',
      activeList: 'all'
    }
  },
  computed: {
    ...mapGetters({
      all: 'teamsModule/_getNbaTeams'
    }),
    filtered () {
      return this.all.filter(team => team.confName === this.conference)
    }
  },
  created () {
    if (this.all.length === 0) this.$store.dispatch('teamsModule/getTeams')
  }
}
</script>
