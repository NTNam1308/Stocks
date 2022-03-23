
<script>
import { Pie } from "vue-chartjs";
export default {
  extends: Pie,
  props: {
    chartdata: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
    reload: Boolean
  },
  watch: {
    reload: {
      handler() {
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
