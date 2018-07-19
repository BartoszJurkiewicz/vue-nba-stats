<template>
  <section class="team__hall-of-fame" ref="hof">
    <el-row type="flex" justify="center">
      <el-col>
        <h2 class="section__title text-left">Hall of fame:</h2>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table :data="teamHof.rowSet" class="hall-of-fame__table">
          <el-table-column prop="1" label="Player" sortable />
          <el-table-column prop="2" label="Position" sortable />
          <el-table-column prop="4" label="Seasons with team" sortable />
        </el-table>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'hallOfFame',
  props: [ 'teamHof' ],
  mounted () {
    this.$nextTick(() => {
      this.$emit('canObserve',  {offset: this.$refs.hof.offsetTop, name: 'hof'})
    })
  }
}
</script>

<style lang="scss">
.hall-of-fame__table {
  .cell {
    text-align: center
  }
}
</style>
