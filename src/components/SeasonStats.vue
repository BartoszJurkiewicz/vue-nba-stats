<template>
  <section class="season-stats__container">
    <el-row type="flex" justify="center">
      <el-col>
        <h2 class="section__title text-left">
          Regular season ({{season}})
          <small v-if="teamData">
            <router-link :to="`/team/${teamData.teamId}`">
              @ {{teamData.fullName}}
            </router-link>
          </small>
          :
        </h2>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" v-if="seasonStats" class="season-stats__stats-list">
      <el-col v-for="stat in seasonStats" :key="stat.label" :span="4">
        <el-tooltip effect="dark" :content="stat.label">
          <p class="tooltip__content">
            <strong>
              {{stat.short}}:
            </strong>
            {{stat.value}}
          </p>
        </el-tooltip>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'seasonStats',
  props: {
    'seasonStats': {
      type: Array,
      required: true
    },
    'teamTricode': {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapState(['season']),
    teamData () {
      return this.$store.getters['teamsModule/_getTeamData']({fieldName: 'tricode', fieldValue: this.teamTricode})
    }
  }
}
</script>

<style lang="scss" scoped>
.season-stats__stats-list {
  flex-wrap: wrap;
}
</style>
