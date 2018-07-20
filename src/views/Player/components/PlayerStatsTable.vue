<template>
  <section class="player__yby-stats">
    <el-row type="flex" justify="center">
      <el-col>
        <h2 class="section__title text-left">Year by year statistics:</h2>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table :data="stats" stripe class="stats-table">
          <el-table-column prop="1" label="Season" fixed width="100" sortable/>
          <el-table-column prop="3" label="Team" width="80" sortable/>
          <el-table-column prop="5" label="Games played" width="130" sortable/>
          <el-table-column prop="6" label="Wins" width="90" sortable/>
          <el-table-column prop="7" label="Losses" width="90" sortable/>
          <el-table-column prop="8" label="Wins %" width="90" sortable/>
          <el-table-column prop="10" label="Offensive rating" width="140" sortable/>
          <el-table-column prop="11" label="Deffensive rating" width="150" sortable/>
          <el-table-column prop="13" label="Assists %" width="100" sortable/>
          <el-table-column prop="16" label="Offensive rebounds %" width="170" sortable/>
          <el-table-column prop="17" label="Deffensive rebounds %" width="180" sortable/>
          <el-table-column prop="18" label="Rebounds %" width="120" sortable/>
          <el-table-column prop="29" label="Field goal %" width="120" sortable/>
        </el-table>
      </el-col>
    </el-row>
  </section>  
</template>

<script>
export default {
  name: 'playerYBYStats',
  props: {
    stats: {
      type: Array,
      required: true
    }
  }
}
</script>
