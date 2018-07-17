<template>
  <el-col :sm="width + 2" :md="width" :xl="width - 2" class="list__item">
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
  props: {
    'routerTo': {
      type: String,
      required: true
    },
    'width': {
      type: Number,
      default: 6
    }
  }
}
</script>

<style lang="scss" scoped>
.list__item {
  margin-bottom: 1rem;
}
</style>
