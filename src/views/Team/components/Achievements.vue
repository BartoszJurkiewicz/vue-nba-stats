<template>
  <section v-if="achievements.length > 0" class="team__achievements">
    <el-row type="flex" justify="center">
      <el-col>
        <h2 class="section__title text-left">Achievements:</h2>
      </el-col>
    </el-row>
    <el-row>
      <el-col v-for="row in achievements" :key="row.name" :span="8">
        <ul class="team__achievements--list">
          <li class="team__achievements--list--title">
            <h4>{{labels[row.name]}} ({{row.rowSet.length}})</h4>
          </li>
          <li v-for="year in row.rowSet" :key="`champ-${year}`">{{year[0]}}</li>
        </ul>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'achievements',
  props: [ 'teamDetails' ],
  data () {
    return {
      labels: {
        TeamAwardsChampionships: 'Championship wins',
        TeamAwardsConf: 'Conference titles',
        TeamAwardsDiv: 'Division titles'
      }
    }
  },
  computed: {
    achievements () {
      return this.teamDetails.filter(item => ['TeamAwardsChampionships', 'TeamAwardsConf', 'TeamAwardsDiv'].indexOf(item.name) !== -1)
    }
  }
}
</script>

<style lang="scss" scoped>
.team__achievements--list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  li {
    padding: .4rem
  }
}
.team__achievements--list--title {
  flex: 1 100%;
}
</style>
