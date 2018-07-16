<template>
  <el-row :gutter="20" class="list">
    <slot />
  </el-row>
</template>

<script>
import ListItem from './ListItem'

export default {
  name: 'list'
}
</script>
