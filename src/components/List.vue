<template>
  <el-row :gutter="20" class="list">
    <list-item v-for="item in items" :key="item.teamId" :router-to="`/${type}/${item.teamId}`">
      <template slot="photo">
        <img :src="`/team_logos/${item.tricode}.svg`" :alt="`${item.fullName} logo`">
      </template>
      <template slot="header">{{item.fullName}}</template>
      <template slot="description">{{item.confName}}</template>
    </list-item>
  </el-row>
</template>

<script>
import ListItem from './ListItem'

export default {
  name: 'list',
  props: [ 'items', 'type' ],
  components: { ListItem }
}
</script>
