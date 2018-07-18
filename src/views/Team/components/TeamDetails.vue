<template>
  <section class="team-header" ref="info">
    <el-row v-if="teamData">
      <img :src="`/team_logos/${teamData.tricode}.svg`" :alt="`${teamData.fullName} logo`" class="team-header__team-logo">
      <h1>{{teamData.fullName}}</h1>
    </el-row>
    <el-row type="flex" justify="center" class="team-header__team-details">
      <el-col :sm="10">
        <p class="team-details__conference" v-if="teamData">
          Conference: 
          <strong>
            {{teamData.confName}}
          </strong>
        </p>
        <p class="team-details__coach" v-if="coach">
          Coach: 
          <strong>
            {{coach[5]}}
          </strong>
        </p>
        <template v-if="thisYearStats">
          <p class="team-details__stats--season">
            Season:
            <strong>
              {{thisYearStats[3]}}
            </strong> 
          </p>
          <p class="team-details__stats--wins">
            Wins:
            <strong>
              {{thisYearStats[5]}}
            </strong> 
          </p>
          <p class="team-details__stats--losses">
            Losses: 
            <strong>
              {{thisYearStats[6]}}
            </strong>
          </p>
        </template>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'teamDetails',
  props: {
    'teamData': {
      type: Object,
      required: true
    },
    'thisYearStats': {
      type: Array,
      required: true
    },
    'coach': {
      type: Array,
      required: true
    }
  },
  mounted () {
    this.$emit('canObserve', {el: this.$refs.info, name: 'info'})
  }
}
</script>

<style lang="scss" scoped>
.team-header__regular-season-stats {
  margin-bottom: 2rem;
}
.tooltip__content {
  cursor: default;
}
</style>
