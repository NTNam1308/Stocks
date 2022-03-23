<template>
  <v-chart
    class="chart bg-chart"
    ref="chart"
    :option="option"
    :theme="themeChart"
    :autoresize="true"
    @click="handleClick"
    @legendselectchanged="handleLegendSelectChange"
  />
</template>

<script>
import { use } from "echarts/core";
import "echarts";
import { CanvasRenderer } from "echarts/renderers";
import * as componentEchart from "echarts/components";
import VChart from "vue-echarts";

use(CanvasRenderer);
for (let index = 0; index < componentEchart.length; index++) {
  use(componentEchart[index]);
}

export default {
  name: "CustomEChart",
  components: {
    VChart,
  },
  props: {
    option: {
      type: Object
    },
    handleClick: {
      type: Function,
      default: () => {}
    },
    handleLegendSelectChange: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    themeChart() {
      return this.$store.state.darkMode ? "dark" : "light";
    },
  },
  mounted() {
    this.$emit("syncChartInstance", this.$refs.chart);
  },
  watch: {
    option: {
      deep: true,
      handler(){
        this.$refs.chart.setOption(this.option);
        this.$emit("syncChartInstance", this.$refs.chart);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.c-dark-theme {
  .bg-chart{
    background: #282933;
  }
}

.chart {
  height: 350px;
}
</style>
