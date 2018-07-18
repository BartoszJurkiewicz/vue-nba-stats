import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [ reactiveProp ],
  props: [ 'chartData' ],
  data () {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0
          }
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
