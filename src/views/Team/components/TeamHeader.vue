<template>
  <el-header class="team__header">
    <el-menu :default-active="activeSection" mode="horizontal" @select="name => $emit('changeSection', name)">
      <el-menu-item index="info">Info</el-menu-item>
      <el-menu-item index="team">Team</el-menu-item>
      <el-menu-item index="ybyStats">Year by year statistics</el-menu-item>
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
