import {Line} from 'vue-chartjs'

export default {
  extends: Line,
  props: [ 'stats', 'keys' ],
  computed: {
    labels () {
      let labels = this.stats.rowSet.map(item => item[3])
      return labels
    },
    datasets () {
      let datasets = []
      this.keys.forEach(key => {
        const r = Math.floor(Math.random() * 256)
        const g = Math.floor(Math.random() * 256)
        const b = Math.floor(Math.random() * 256)

        const dataset = {}
        dataset.label = this.stats.headers[key]
        dataset.backgroundColor = `rgba(${r}, ${g}, ${b}, .6)`
        dataset.data = this.stats.rowSet.map(item => item[key])
        datasets.push(dataset)
      })
      return datasets
    }
  },
  mounted () {
    this.renderChart({labels: this.labels, datasets: this.datasets}, {responsive: true, maintainAspectRatio: false})
  }
}
