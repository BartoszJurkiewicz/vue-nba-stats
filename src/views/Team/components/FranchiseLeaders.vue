<template>
  <section class="team__franchise-leaders">
    <el-row type="flex" justify="center">
      <el-col>
        <h2 class="section__title text-left">Franchise leaders</h2>
      </el-col>
    </el-row>
    <el-row type="flex" justify="start" :gutter="20">
      <el-col>
        <p>
          {{leaders[3]}}
        </p>
        <p>
          <strong>{{leaders[1]}}</strong> points
        </p>
      </el-col>
      <el-col>
        <p>{{leaders[6]}}</p>
        <p>
          <strong>{{leaders[4]}}</strong> assists
        </p>
      </el-col>
      <el-col>
        <p>{{leaders[9]}}</p>
        <p>
          <strong>{{leaders[7]}}</strong> rebounds
        </p>
      </el-col>
      <el-col>
        <p>{{leaders[12]}}</p>
        <p>
          <strong>{{leaders[10]}}</strong> blocks
        </p>
      </el-col>
      <el-col>
        <p>{{leaders[15]}}</p>
        <p>
          <strong>{{leaders[13]}}</strong> steals
        </p>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'franchiseLEaders',
  props: {
    'leaders': {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.team__franchise-leaders {
  margin-bottom: 2rem;
}
</style>
