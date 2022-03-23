<template>
  <CCard>
    <div class="d-flex justify-content-between mt-1">
      <div class="pl-3 pt-2">
        <p class="font-weight-bold h6">
          {{ mack }}
        </p>
      </div>
      <div class="pr-3 pt-2">
        <transition :name="transition_bgcolor_price" mode="out-in">
          <p class="h6" :key="price">
            {{ price }}
          </p>
        </transition>
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <div class="pl-3">
        <transition :name="transition_bgcolor_perchange" mode="out-in">
          <p
            :key="percent_change"
            :class="$function_global.getClassColorByPercent(price_change)"
            class="font-weight-bold h4"
          >
            {{ percent_change > 0 ? "+" : "" }}{{ percent_change }}%
          </p>
        </transition>
      </div>
      <div class="pr-3 pl-0">
        <transition :name="transition_bgcolor_perchange" mode="out-in">
          <p
            :key="percent_change"
            :class="$function_global.getClassColorByPercent(price_change)"
            class="font-weight-bold h6"
          >
            {{ price_change > 0 ? "+" : "" }}{{ price_change }}
          </p>
        </transition>
      </div>
    </div>
    <CustomEChart :option="option_chart" :style="{ height: height }">
    </CustomEChart>
  </CCard>
</template>
<script>
import CustomEChart from "@/views/charts/CustomEchart";

export default {
  name: "WidgetPriceChange",
  props: {
    height: {
      type: String,
      default: "120px",
    },
    mack: String,
    total_vol: Number,
    total_val: Number,
    percent_change: Number,
    price_change: Number,
    price: Number,
    price_eod_yesterday: Number,
    total: Number,
    up: Number,
    nochange: Number,
    down: Number,
    data_chart: Object,
  },
  data() {
    return {
      transition_bgcolor_price: "nochange",
      transition_bgcolor_perchange: "nochange",
      transition_bgcolor_total_vol: "nochange",
      transition_bgcolor_total_val: "nochange",
      transition_bgcolor_up: "nochange",
      transition_bgcolor_nochange: "nochange",
      transition_bgcolor_down: "nochange",
    };
  },
  components: {
    CustomEChart,
  },
  methods: {
    format_money(money) {
      // if (money >= 1000000000000 || money <= -1000000000000)
      //   return (
      //     (money / 1000000000000).toLocaleString("en", {
      //       minimumFractionDigits: 0,
      //       maximumFractionDigits: 1,
      //     }) + " ng tỷ"
      //   );
      if (money >= 1000000000 || money <= -1000000000)
        return (
          (money / 1000000000).toLocaleString("en", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 1,
          }) + " tỷ"
        );
      if (money >= 1000000 || money <= -1000000)
        return (
          (money / 1000000).toLocaleString("en", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 1,
          }) + " tr"
        );
      if (money >= 1000 || money <= -1000)
        return (
          (money / 1000).toLocaleString("en", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 1,
          }) + " ngàn"
        );
      else return money;
    },
    getBgColorByChangeValue(newVal, oldVal) {
      if (newVal < oldVal) return "downchange";
      else if (newVal > oldVal) return "upchange";
      else return "nochange";
    },
  },
  created() {},
  computed: {
    option_chart() {
      if (Object.keys(this.data_chart).length > 0) {
        let line_data = [];
        let bar_data = [];
        if (parseFloat(this.price_eod_yesterday) > 1) {
          const date1 = new Date((this.data_chart.t[0] - 60 + 7 * 3600) * 1000); //GMT + 7
          const date_string1 = date1
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
          line_data.push([date_string1, parseFloat(this.price_eod_yesterday)]);
          bar_data.push([date_string1, 0]);
        }
        for (let index = 0; index < this.data_chart.o.length; index++) {
          const date = new Date((this.data_chart.t[index] + 7 * 3600) * 1000); //GMT + 7
          const date_string = date.toISOString().slice(0, 19).replace("T", " ");
          line_data.push([date_string, parseFloat(this.data_chart.o[index])]);
          bar_data.push([date_string, parseFloat(this.data_chart.v[index])]);
        }
        return{
          title: { show: false },
          tooltip: {
            trigger: "axis",
            axisPointer: { type: "line" },
            formatter: (params) => {
              return `Thời gian: ${
                params[0].axisValueLabel.split(" ")[1]
              }<br/>Giá: ${params[0].value[1].toLocaleString()} <br/> Khối lượng: ${params[1].value[1].toLocaleString()}`;
            },
          },
          grid: { top: 0, bottom: 0, left: 14, right: 10, containLabel: true },
          visualMap: [
            {
              show: false,
              seriesIndex: 0,
              pieces: [
                { gte: this.price_eod_yesterday, color: "#00aa00" },
                { lt: this.price_eod_yesterday, gt: 0, color: "#ee5442" },
              ],
            },
          ],
          xAxis: {
            type: "time",
            axisLabel: {
              formatter: (params) => {
                const date = new Date(params);
                const hours = date.getHours();
                const minutes = date.getMinutes();
                if(minutes == 0 || minutes == 15 || minutes == 30 || minutes == 45)
                  return minutes != 0 ? hours+":"+minutes : hours+":0"+minutes;
                return "";
              }
            },
          },
          yAxis: [
            {
              type: "value",
              position: "right",
              scale: true,
              axisLine: { show: false },
              axisTick: { show: false },
              splitLine: { lineStyle: { type: "dashed" } },
              axisPointer: { snap: true },
              show: false,
              axisLabel: { show: false },
            },
            {
              type: "value",
              position: "left",
              show: false,
              scale: false,
              axisLabel: { show: false },
              axisLine: { show: false },
              axisTick: { show: false },
              splitLine: { lineStyle: { type: "dashed" } },
              axisPointer: { snap: true },
            },
          ],
          series: [
            {
              type: "line",
              smooth: false,
              symbol: "none",
              data: line_data,
              markLine: {
                silent: true,
                data: [
                  {
                    yAxis: this.price_eod_yesterday,
                    lineStyle: { color: "#ccaa00" },
                    label: {
                      normal: { position: "insideMiddleTop", formatter: "" },
                    },
                  },
                ],
              },
              markPoint: {
                data: [
                  {
                    symbol: "circle",
                    symbolSize: 10,
                    coord: [240, line_data[line_data.length - 1][1]],
                    itemStyle: { color: "rgb(239, 83, 80)" },
                  },
                ],
              },
            },
            {
              type: "bar",
              smooth: false,
              xAxisIndex: 0,
              yAxisIndex: 1,
              data: bar_data,
              itemStyle: { color: "#ccaa00" },
              markLine: { silent: true, data: [] },
              markPoint: { data: [] },
            },
          ],
        };
      } else {
        return {
          series: [],
        };
      }
    },
  },
  watch: {
    price: {
      deep: true,
      handler(newVal, oldVal) {
        this.transition_bgcolor_price = this.getBgColorByChangeValue(
          newVal,
          oldVal
        );
      },
    },
    percent_change: {
      deep: true,
      handler(newVal, oldVal) {
        this.transition_bgcolor_perchange = this.getBgColorByChangeValue(
          newVal,
          oldVal
        );
      },
    },
    total_vol: {
      deep: true,
      handler(newVal, oldVal) {
        this.transition_bgcolor_total_vol = this.getBgColorByChangeValue(
          newVal,
          oldVal
        );
      },
    },
    total_val: {
      deep: true,
      handler(newVal, oldVal) {
        this.transition_bgcolor_total_val = this.getBgColorByChangeValue(
          newVal,
          oldVal
        );
      },
    },
    up: {
      deep: true,
      handler(newVal, oldVal) {
        this.transition_bgcolor_up = this.getBgColorByChangeValue(
          newVal,
          oldVal
        );
      },
    },
    nochange: {
      deep: true,
      handler(newVal, oldVal) {
        this.transition_bgcolor_nochange = this.getBgColorByChangeValue(
          newVal,
          oldVal
        );
      },
    },
    down: {
      deep: true,
      handler(newVal, oldVal) {
        this.transition_bgcolor_down = this.getBgColorByChangeValue(
          newVal,
          oldVal
        );
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.font-size-12 {
  font-size: 12px;
}
</style>
