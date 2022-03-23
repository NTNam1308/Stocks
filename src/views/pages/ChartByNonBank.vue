<template>
  <CRow class="mt-3">
    <CElementCover
      :opacity="1"
      v-if="options_nonbank_is_loading"
      :style="
        $store.state.darkMode
          ? { 'background-color': 'fff' }
          : { 'background-color': '000' }
      "
      ><CSpinner size="5xl" color="success" />
    </CElementCover>
    <CCol
      xl="4"
      lg="6"
      class="mb-3 pl-2 pr-2"
      v-for="(item, index) in options_nonbank"
      :key="index"
    >
      <CCard>
        <CustomEChart
          :option="item"
          v-if="
            !options_nonbank_is_loading && item.title.text != '3 lằn ranh đỏ'
          "
        />
        <CustomEChart
          :option="item"
          v-if="
            !options_nonbank_is_loading && item.title.text == '3 lằn ranh đỏ'
          "
          :handleLegendSelectChange="handleLegendSelectChange"
          @syncChartInstance="getChartInstance3RedLines"
        />
      </CCard>
    </CCol>
    <CCol
      xl="4"
      lg="6"
      class="mb-3 pl-2 pr-2"
      v-if="!options_nonbank_is_loading && nganh == 'BẤT ĐỘNG SẢN'"
    >
      <CCard>
        <CustomEChart
          :option="option_chart_3_red_lines_triangle"
          v-if="!options_nonbank_is_loading && nganh == 'BẤT ĐỘNG SẢN'"
        />
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import CustomEChart from "@/views/charts/CustomEchart";

import axios from "axios";

export default {
  name: "ChartByMack",
  props: {
    mack: {
      type: String,
      default: "HPG",
    },
  },
  created() {
    this.mackChange();
  },
  components: {
    CustomEChart,
  },

  data() {
    let return_data = {
      options_nonbank: [],
      options_nonbank_is_loading: true,
      chart_instance_3_red_lines: null,
      data_3_red_lines_hover: {
        quarter: "",
        no_tts: 0,
        no_vcsh: 0,
        thanh_toan: 0
      }
    };
    return return_data;
  },
  methods: {
    getAllChartNonBank() {
      let self = this;
      self.options_nonbank_is_loading = true;
      axios
        .get(self.$apiAdress + "/api/stocks/chart/nonbank", {
          params: {
            mack: self.mack,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          for (let chart of res.data.optionChart) {
            chart.tooltip = {
              ...chart.tooltip,
              position: function (pos, params, dom, rect, size) {
                const width_chart = size.viewSize[0];
                // if(i==0 || i==3 || i==6 )
                //   return {
                //       left: pos[0],
                //       top: "10%",
                //     };
                // else if (i==2 || i==5 || i==8 )
                //   return {
                //     right: width_chart - pos[0],
                //     top: "10%",
                //   }
                // else{
                //   return [pos[0],pos[1]];
                // }
                if (pos[0] < width_chart / 2) {
                  if (size.contentSize[0] + pos[0] > width_chart)
                    return {
                      left: 0,
                      top: pos[1] - size.contentSize[1],
                    };
                  return {
                    left: pos[0],
                    top: pos[1] - size.contentSize[1],
                  };
                } else {
                  if (
                    size.contentSize[0] + (width_chart - pos[0]) >
                    width_chart
                  )
                    return {
                      right: 0,
                      top: pos[1] - size.contentSize[1],
                    };
                  return {
                    right: width_chart - pos[0],
                    top: pos[1] - size.contentSize[1],
                  };
                }

                // // tooltip will be fixed on the right if mouse hovering on the left,
                // // and on the left if hovering on the right.
                // var obj = { top: 60 };
                // obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                // return obj;
                // test
              },
              formatter: (params) => {
                let yAxis = chart.yAxis;
                let series = chart.series;
                let text = "";
                text += "<b>" + params[0].axisValueLabel + "</b><br/>";
                params.forEach((item) => {
                  let position = series[item.seriesIndex].yAxisIndex
                    ? series[item.seriesIndex].yAxisIndex
                    : 0;
                  let post_text = yAxis[position].name;
                  switch (post_text) {
                    case "Phần trăm":
                      post_text = "%";
                      break;
                    default:
                      break;
                  }
                  text += item.seriesName;
                  text += ": <b>";
                  text += item.value.toLocaleString("en", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 1,
                  });
                  text += "</b> ";
                  text += post_text;
                  text += "<br/>";
                });
                return text;
              },
            };
            if (chart.title.text == "Khả năng thanh toán - TTM") {
              for (let yAxisItem of chart.yAxis) {
                if (yAxisItem.name.toUpperCase().includes("TRIỆU"))
                  yAxisItem.axisLabel.formatter = (value) => {
                    return (value / 1000).toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 1,
                    });
                  };
              }
            }
            if (chart.title.text == "3 lằn ranh đỏ") {
              chart.yAxis[0].axisLabel.formatter = (item) => {
                return (item == 0 || item == 0.7 || item == 1 || item == 1.5 || item == 2) ? item : "";
              }
              this.data_3_red_lines_hover.quarter = chart.xAxis[0].data[chart.xAxis[0].data.length - 1];
              this.data_3_red_lines_hover.no_tts = chart.series[0].data[chart.series[0].data.length - 1];
              this.data_3_red_lines_hover.no_vcsh = chart.series[1].data[chart.series[1].data.length - 1];
              this.data_3_red_lines_hover.thanh_toan = chart.series[5].data[chart.series[5].data.length - 1];
              chart.tooltip.formatter = (params) => {
                this.data_3_red_lines_hover.quarter = params[0].axisValueLabel;
                this.data_3_red_lines_hover.no_tts = params[0].value;
                this.data_3_red_lines_hover.no_vcsh = params[1].value;
                this.data_3_red_lines_hover.thanh_toan = params[5].value;
                let yAxis = chart.yAxis;
                let series = chart.series;
                let text = "";
                text += "<b>" + params[0].axisValueLabel + "</b><br/>";
                params.forEach((item) => {
                  let position = series[item.seriesIndex].yAxisIndex
                    ? series[item.seriesIndex].yAxisIndex
                    : 0;
                  let post_text = yAxis[position].name;
                  switch (post_text) {
                    case "Phần trăm":
                      post_text = "%";
                      break;
                    default:
                      break;
                  }
                  if(!item.seriesName.includes("LẰN RANH ĐỎ")){
                    text += item.seriesName;
                    text += ": <b>";
                    text += item.value.toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 1,
                    });
                    text += "</b> ";
                    text += post_text;
                    text += "<br/>";
                  }
                });
                return text;
              }
            }
            chart.toolbox = {
              show: true,
              feature: {
                dataView: {
                  readOnly: true,
                  title: "Bảng dữ liệu",
                  lang: ["Bảng dữ liệu", "Đóng", "Tải lại"],
                },
                magicType: {
                  type: ["line", "bar", "stack"],
                  title: {
                    line: "Biểu đồ đường",
                    bar: "Biểu đồ cột",
                    stack: "Biểu đồ chồng",
                  },
                },
                restore: {
                  title: "Khôi phục",
                },
              },
            };
          }
          self.options_nonbank = res.data.optionChart;
          self.options_nonbank_is_loading = false;
        })
        .catch((err) => {
          console.error(err);
          self.options_nonbank = {};
          self.options_nonbank_is_loading = false;
        });
    },
    handleLegendSelectChange(e) {
      let obj_selected = JSON.parse(JSON.stringify(e.selected));
      const type_action = obj_selected[e.name] ? "legendSelect" : "legendUnSelect";
      switch(e.name){
        case "LẰN RANH ĐỎ NỢ/TTS":
          this.chart_instance_3_red_lines.dispatchAction({
              type: type_action,
              name: "NỢ/TTS"
          })
          break;
        case "LẰN RANH ĐỎ NỢ/VCSH":
          this.chart_instance_3_red_lines.dispatchAction({
              type: type_action,
              name: "NỢ/VCSH"
          })
          break;
        case "LẰN RANH ĐỎ THANH TOÁN":
          this.chart_instance_3_red_lines.dispatchAction({
              type: type_action,
              name: "THANH TOÁN"
          })
          break;
        case "NỢ/TTS":
          this.chart_instance_3_red_lines.dispatchAction({
              type: type_action,
              name: "LẰN RANH ĐỎ NỢ/TTS"
          })
          break;
        case "NỢ/VCSH":
          this.chart_instance_3_red_lines.dispatchAction({
              type: type_action,
              name: "LẰN RANH ĐỎ NỢ/VCSH"
          })
          break;
        case "THANH TOÁN":
          this.chart_instance_3_red_lines.dispatchAction({
              type: type_action,
              name: "LẰN RANH ĐỎ THANH TOÁN"
          })
          break;
      }
    },
    getChartInstance3RedLines(instance) {
      this.chart_instance_3_red_lines = instance;
    },
    mackChange() {
      this.getAllChartNonBank();
    },
  },
  computed: {
    nganh() {
      return this.$store.state.list_mack_company.hasOwnProperty(this.mack.toUpperCase())
        ? this.$store.state.list_mack_company[this.mack.toUpperCase()].nganh
        : "";
    },
    option_chart_3_red_lines_triangle() {
      let max_value = Math.max(
        this.data_3_red_lines_hover.thanh_toan, 
        this.data_3_red_lines_hover.no_tts, 
        this.data_3_red_lines_hover.no_vcsh
      );
      max_value = Math.ceil(max_value);
      const color_green = this.$store.state.darkMode ? "rgb(11, 223, 57)" : "rgb(46, 184, 92)";
      const color_red = "rgb(255, 0, 23)";
      return {
        "title": {
            "text": this.data_3_red_lines_hover.quarter,
            "bottom": '2%',
            "left": "center",
            "align": "auto",
            "textStyle": {
              "fontFamily": "Tahoma"
            }
        },
        tooltip: {
          show: true
        },
        "radar": {
          "indicator": [
            {"name": 'THANH TOÁN', "max": max_value, color: this.data_3_red_lines_hover.thanh_toan >= 1 ? color_green : color_red},
            {"name": 'Nợ/TTS', "max": max_value, color: this.data_3_red_lines_hover.no_tts <= 0.7 ? color_green : color_red},
            {"name": 'NỢ/VCSH', "max": max_value, color: this.data_3_red_lines_hover.no_vcsh <= 0.7 ? color_green : color_red},
          ]
        },
        "grid": {
          "top": "32%",
          "bottom": "15%",
          "left": "13%",
          "right": "13%"
        },
        "series": [
          {
            "name": 'Budget vs spending',
            "type": 'radar',
            "data": [
              {
                "value": [1, 0.7, 0.7],
                "name": '3 lằn ranh đỏ',
                "lineStyle": {
                  "color": "#ff0000"
                },
                "itemStyle": {
                  "color": "#ff0000"
                }
              },
              {
                "value": [
                  this.data_3_red_lines_hover.thanh_toan, 
                  this.data_3_red_lines_hover.no_tts, 
                  this.data_3_red_lines_hover.no_vcsh
                ],
                'name': this.data_3_red_lines_hover.quarter
              }
            ]
          }
        ]
      };
    }
  },
  watch: {
    "$store.state.mack": function () {
      this.mackChange();
    },
  },
};
</script>
<style lang="scss" scoped>
.card {
  margin-bottom: 0.5rem;
}
</style>
