<template>
  <CRow class="mt-3">
    <CElementCover
      :opacity="1"
      v-if="is_loading"
      :style="
        $store.state.darkMode
          ? { 'background-color': 'fff' }
          : { 'background-color': '000' }
      "
      ><CSpinner size="5xl" color="success" />
    </CElementCover>
    <CCol sm="12">
      <template v-if="$store.state.darkMode">
        <div class="p-logo278">
          <img src="/img/logo-new-278.png" class="p-logo278-img-lg" />
        </div>
      </template>
      <template v-else>
        <div class="p-logo278">
          <img src="/img/logo280.png" class="p-logo278-img-lg" />
        </div>
      </template>
    </CCol>
    <CCol sm="1" />
    <CCol sm="5" class="pl-2 pr-2" v-if="!is_loading">
      <CCard class="height-50">
        <p class="text-center h3 pt-3 font-weight-bold">Điểm 4M</p>
        <div class="text-center big-text center-content pt-2">
          <CBadge v-bind:color="fourm_color">{{ fourm_point }}</CBadge>
        </div>
        <CustomEChart
          :option="options_chart_fourm_history"
          style="height: 333px"
          v-if="!is_loading"
          :handleClick="clickChart4MHistory"
        />
      </CCard>
    </CCol>
    <CCol sm="5" class="pl-2 pr-2">
      <CCard>
        <CustomEChart
          :option="options_chart_4m"
          style="height: 50vh"
          v-if="!is_loading && !is_loading_4m"
        />
        <CElementCover
          :opacity="1"
          v-if="is_loading_4m"
          style="height: 50vh"
          :style="
            $store.state.darkMode
              ? { 'background-color': 'fff' }
              : { 'background-color': '000' }
          "
          ><CSpinner size="5xl" color="success" />
        </CElementCover>
      </CCard>
    </CCol>
    <CCol sm="1" />
    <CCol sm="1" />
    <CCol sm="5" class="pl-2 pr-2" v-if="!is_loading">
      <CCard class="height-50">
        <p class="text-center h3 pt-3 font-weight-bold">Điểm Canslim</p>
        <div class="text-center big-text center-content pt-2">
          <CBadge v-bind:color="canslim_color">{{ canslim_point }}</CBadge>
        </div>
        <CustomEChart
          :option="options_chart_canslim_history"
          style="height: 333px"
          v-if="!is_loading"
          :handleClick="clickChartCanslimHistory"
        />
      </CCard>
    </CCol>
    <CCol sm="5" class="mb-3 pl-2 pr-2">
      <CCard>
        <CustomEChart
          :option="options_chart_canslim"
          style="height: 50vh"
          v-if="!is_loading && !is_loading_canslim"
        />
        <CElementCover
          :opacity="1"
          v-if="is_loading_canslim"
          style="height: 50vh"
          :style="
            $store.state.darkMode
              ? { 'background-color': 'fff' }
              : { 'background-color': '000' }
          "
          ><CSpinner size="5xl" color="success" />
        </CElementCover>
      </CCard>
    </CCol>
    <CCol sm="1" />
  </CRow>
</template>

<script>
import CustomEChart from "@/views/charts/CustomEchart";
import axios from "axios";

export default {
  name: "FourmAndCanslim",
  props: {
    mack: {
      type: String,
      default: "HPG",
    },
  },
  created() {
    this.getFourmAndCanslim();
  },
  components: {
    CustomEChart,
  },

  data() {
    let return_data = {
      canslim_point: "N/A",
      canslim_color: "danger",
      fourm_point: "N/A",
      fourm_color: "danger",
      is_loading: true,
      is_loading_4m: false,
      is_loading_canslim: false,
      options_chart_4m: {},
      options_chart_canslim: {},
      options_chart_canslim_history: {},
      options_chart_fourm_history: {},
    };
    return return_data;
  },
  methods: {
    getFourmAndCanslim() {
      this.is_loading = true;
      let self = this;
      axios
        .get(self.$apiAdress + "/api/stocks/chart/fourm-canslim-point-chart", {
          params: {
            mack: self.mack,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          let fourm_point = res.data.fourm_point;
          if (fourm_point >= 50) {
            self.fourm_color = "success";
          } else {
            self.fourm_color = "danger";
          }
          let canslim_point = res.data.canslim_point;
          if (canslim_point >= 50) {
            self.canslim_color = "success";
          } else {
            self.canslim_color = "danger";
          }
          self.fourm_point = fourm_point;
          self.canslim_point = canslim_point;
          self.options_chart_4m = res.data.fourm_option_chart;
          self.options_chart_canslim = res.data.canslim_option_chart;
          self.options_chart_canslim_history =
            res.data.canslim_option_history_chart;
          self.options_chart_fourm_history =
            res.data.fourm_option_history_chart;
          self.is_loading = false;
        })
        .catch((err) => {
          console.error(err);
          self.options_chart_4m = {};
          self.options_chart_canslim = {};
          self.options_chart_canslim_history = {};
          self.options_chart_fourm_history = {};
          self.is_loading = false;
        });
    },
    clickChart4MHistory(e) {
      let time = e.name;
      time = time.split(".");
      time = time[0] + " 20" + time[1];
      this.is_loading_4m = true;
      axios
        .get(
          this.$apiAdress +
            "/api/stocks/chart/fourm-canslim-point-chart-by-time",
          {
            params: {
              mack: this.mack,
              type: "4m",
              time: time,
              token: localStorage.getItem("api_token"),
            },
          }
        )
        .then((res) => {
          let point = res.data.point;
          if (point >= 50) {
            this.fourm_color = "success";
          } else {
            this.fourm_color = "danger";
          }
          this.fourm_point = point;
          this.options_chart_4m = res.data.option_chart;
          this.options_chart_fourm_history.series[0].markPoint.data = [
            {
              value: point,
              yAxis: point,
              xAxis: e.name,
            },
          ];
          this.options_chart_fourm_history.series[0].itemStyle.color =
            point >= 50 ? "#2eb85c" : "#e55353";
          this.is_loading_4m = false;
        })
        .catch((err) => {
          console.error(err);
          this.is_loading_4m = false;
        });
    },
    clickChartCanslimHistory(e) {
      let time = e.name;
      time = time.split(".");
      time = time[0] + " 20" + time[1];
      this.is_loading_canslim = true;
      axios
        .get(
          this.$apiAdress +
            "/api/stocks/chart/fourm-canslim-point-chart-by-time",
          {
            params: {
              mack: this.mack,
              type: "canslim",
              time: time,
              token: localStorage.getItem("api_token"),
            },
          }
        )
        .then((res) => {
          let point = res.data.point;
          if (point >= 50) {
            this.canslim_color = "success";
          } else {
            this.canslim_color = "danger";
          }
          this.canslim_point = point;
          this.options_chart_canslim = res.data.option_chart;
          this.options_chart_canslim_history.series[0].markPoint.data = [
            {
              value: point,
              yAxis: point,
              xAxis: e.name,
            },
          ];
          this.options_chart_canslim_history.series[0].itemStyle.color =
            point >= 50 ? "#2eb85c" : "#e55353";
          this.is_loading_canslim = false;
        })
        .catch((err) => {
          console.error(err);
          this.is_loading_canslim = false;
        });
    },
  },
  watch: {
    "$store.state.mack": function() {
      this.getFourmAndCanslim();
    },
  },
};
</script>
<style lang="scss">
.p-logo278 {
  text-align: center;
  margin-bottom: 30px;
}
.p-logo278-img-lg {
  max-width: 200px;
  width: 100%;
  height: auto;
}
.big-text {
  font-size: 6rem;
}
.center-content {
  display: flex;
  justify-content: center;
}
.height-50 {
  height: 50vh;
}
</style>
