<template>
  <el-row class="list-container" type="flex" :gutter="20">
    <slot />
  </el-row>
</template>

<script>
import ListItem from './ListItem'

export default {
  name: 'list'
}
</script>

<style lang="scss" scoped>
.list-container {
  flex-wrap: wrap;
}
</style>
