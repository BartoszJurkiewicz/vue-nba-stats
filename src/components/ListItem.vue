<template>
  <el-col :sm="width" class="list__item">
    <router-link :to="routerTo">
      <el-card shadow="hover">
        <header>
          <slot name="photo" />
          <p>
            <slot name="header" />
          </p>
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
  props: [ 'routerTo', 'width' ]
}
</script>

<style lang="scss" scoped>
.list__item {
  margin-bottom: 1rem;
}
</style>
