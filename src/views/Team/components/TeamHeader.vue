<template>
  <el-header class="team__header">
    <el-menu :default-active="activeSection" mode="horizontal" @select="name => $emit('changeSection', name)">
      <el-menu-item index="detailsContainer">Info</el-menu-item>
      <el-menu-item index="teamContainer">Team</el-menu-item>
      <el-menu-item index="hofContainer">Hall of fame</el-menu-item>
      <el-menu-item index="statsContainer">Year by year statistics</el-menu-item>
    </el-menu>
  </el-header>
</template>

<script>
export default {
  name: 'teamHeader',
  props: {
    'activeSection': {
      type: String,
      required: true
    }
  }
}
</script>
