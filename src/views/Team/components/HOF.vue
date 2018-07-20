<template>
  <section class="team__hall-of-fame" ref="container">
    <el-row type="flex" justify="center">
      <el-col>
        <h2 class="section__title text-left">Hall of fame:</h2>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table :data="teamHof.rowSet" class="hall-of-fame__table stats-table">
          <el-table-column prop="1" label="Player" sortable />
          <el-table-column prop="2" label="Position" sortable />
          <el-table-column prop="4" label="Seasons with team" sortable />
        </el-table>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import { sectionOffset } from '../mixins/'

export default {
  name: 'hallOfFame',
  props: [ 'teamHof' ],
  mixins: [ sectionOffset ]
}
</script>

<style lang="scss">
.hall-of-fame__table {
  .cell {
    text-align: center
  }
}
</style>
