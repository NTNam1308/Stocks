<template>
  <CustomEChart :option="option" style="width: 30px; height: 20px" />
</template>
<script>
import CustomEChart from "@/views/charts/CustomEchart";

export default {
  name: "EchartInTable",
  props: ["databar"],
  components: {
    CustomEChart,
  },
  computed: {
    option() {
      let arr = [];
      Object.keys(this.databar).forEach((key) => {
        if (key.includes("gia_tri"))
          {
            if(typeof this.databar[key] =="string" && this.databar[key].includes(","))
              arr.push(parseFloat(this.databar[key].split(",").join("")));
            else
              arr.push(parseFloat(this.databar[key]));
          }
      });
      return {
        grid: {
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
        },
        xAxis: {
          type: "category",
          show: false,
        },
        yAxis: {
          type: "value",
          show: false,
        },
        series: [
          {
            data: arr,
            type: "bar",
            barMaxWidth: "5",
          },
        ],
      };
    },
  },
};
</script>
