
<script>
import { Bar } from "vue-chartjs";
export default {
  extends: Bar,
  props: {
    chartdata: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
  },
  watch: {
    chartdata: {
      deep: true,
      handler: function () {
        this.renderChart(this.chartdata, this.options);
      },
    },
    options: {
      deep: true,
      handler: function () {
        this.renderChart(this.chartdata, this.options);
      },
    },
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>
