<template>
  <section class="team-header" ref="info">
    <el-row v-if="teamData">
      <img :src="`/team_logos/${teamData.tricode}.svg`" :alt="`${teamData.fullName} logo`" class="team-header__team-logo">
      <h1>{{teamData.fullName}}</h1>
      <template v-if="teamDetails">
        <ul v-if="teamDetails[1].rowSet.length > 1" class="team-header__historical-nicknames">
          <li v-for="(historyDetails, index) in teamDetails[1].rowSet" v-if="index > 0" :key="historyDetails[3]">
            a.k.a. {{historyDetails[1]}} {{historyDetails[2]}} ({{historyDetails[3]}} - {{historyDetails[4]}})
          </li>
        </ul>
      </template>
    </el-row>
    <el-row type="flex" justify="center" class="team-header__team-details">
      <el-col :sm="10">
        <p class="team-details__conference" v-if="teamData">
          Conference: 
          <strong>
            {{teamData.confName}}
          </strong>
        </p>
        <template v-if="teamDetails">
          <p class="team-details__founded" v-if="coach">
            Founded: 
            <strong>
              {{teamDetails[0].rowSet[0][3]}}
            </strong>
          </p>
          <p class="team-details__founded" v-if="coach">
            DLeague: 
            <strong>
              {{teamDetails[0].rowSet[0][10]}}
            </strong>
          </p>
        </template>
        <p class="team-details__coach" v-if="coach.rowSet">
          Coach: 
          <strong>
            {{coach.rowSet[0][5]}}
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
      type: Object,
      required: true
    },
    'teamDetails': {
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
.team-header__historical-nicknames {
  margin: 0;
  margin-bottom: 1rem;
}
.team-header__regular-season-stats {
  margin-bottom: 2rem;
}
.tooltip__content {
  cursor: default;
}
</style>
