<template>
  <div id="app" v-loading="$store.state.isLoading">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app, .el-select-dropdown__item, .el-tooltip__popper {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
a {
  text-decoration: none;
}
.text-left {
  text-align: left;
}
</style>
