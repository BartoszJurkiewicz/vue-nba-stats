<template>
  <section class="team__season-stats">
    <el-row type="flex" justify="center">
      <el-col>
        <h2 class="section__title text-left">Regular season ({{season}}):</h2>
      </el-col>
    </el-row>
    <el-row type="flex" justify="start" v-if="seasonStats" class="team-header__regular-season-stats">
      <el-col v-for="stat in seasonStats" :key="stat.label">
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
export default {
  name: 'seasonStats',
  props: {
    'season': {
      type: String,
      required: true
    },
    'seasonStats': {
      type: Array,
      required: true
    }
  }
}
</script>
