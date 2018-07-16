<template>
  <el-col :sm="6" class="list__item">
    <router-link :to="routerTo">
      <el-card>
        <slot name="photo" />
        <header>
          <slot name="header" />
        </header>
        <p>
          <slot name="description" />
        </p>
        <footer>
          <slot name="footer" />
        </footer>
      </el-card>
    </router-link>
  </el-col>
</template>

<script>
export default {
  name: 'listItem',
  props: [ 'routerTo', 'teamTricode' ]
}
</script>

<style lang="scss" scoped>
.list__item {
  margin-bottom: 1rem;
}
</style>
