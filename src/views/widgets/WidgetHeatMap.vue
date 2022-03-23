<template>
  <CCard>
    <CCardHeader class="title-block">
      <div class="d-flex justify-content-between">
        <p class="font-weight-bold h5 pt-1 pl-2">Biểu đồ nhiệt</p>
        <CSelect
          :value.sync="data_filter_type"
          :options="option_filter_type"
          class="mb-0"
        >
        </CSelect>
      </div>
    </CCardHeader>
    <CCardBody class="p-2">
      <CRow class="mb-1">
        <CCol sm="12" lg="6">
          <CustomEChart
            :option="option_value_change_bar_chart"
            style="height: 250px"
          />
        </CCol>
        <CCol sm="12" lg="6" class="">
          <div
            style="background-color: #009900; height: 100px; border-radius: 5px"
            class="d-flex align-items-center mb-1 ml-2 mt-3"
          >
            <div class="h3 ml-3" style="verticle-align: middle; color: #fff">
              Tổng khối lượng:
              {{
                data_exchange
                  ? parseFloat(this.data_exchange.totalvol).toLocaleString(
                      "en",
                      {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }
                    )
                  : 0
              }}
            </div>
          </div>
          <div
            style="background-color: #009900; height: 100px; border-radius: 5px"
            class="d-flex align-items-center mb-1 ml-2 mt-2"
          >
            <div class="h3 ml-3" style="verticle-align: middle; color: #fff">
              Tổng giá trị:
              {{
                data_exchange
                  ? parseFloat(data_exchange.totalval / 1000).toLocaleString(
                      "en",
                      {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      }
                    )
                  : 0
              }}
              tỷ đồng
            </div>
          </div>
        </CCol>
      </CRow>
      <p class="text-center h4">Bản đồ nhiệt theo ngành</p>
      <CustomEChart
        :option="option_heatmap"
        style="height: 450px"
        :handleClick="clickChartHeatMap"
      />
      <div class="d-flex mt-1" v-if="current_department_click != ''">
        <div class="px-2 py-1 mr-2 font-weight-bold">{{ current_department_click }}</div>
        <div class="px-2 py-1 mr-2 bg-ceilchange_n">Trần: {{ data_change.ceilchange_n }}</div>
        <div class="px-2 py-1 mr-2 bg-upchange_n">Tăng: {{ data_change.upchange_n }}</div>
        <div class="px-2 py-1 mr-2 bg-nochange_n">Không đổi: {{ data_change.nochange_n }}</div>
        <div class="px-2 py-1 mr-2 bg-downchange_n">Giảm: {{ data_change.downchange_n }}</div>
        <div class="px-2 py-1 mr-2 bg-floorchange_n">Sàn: {{ data_change.floorchange_n }}</div>
      </div>
    </CCardBody>
  </CCard>
</template>
<script>
import CustomEChart from "@/views/charts/CustomEchart";

export default {
  name: "WidgetHeatMap",
  props: {
    data_exchange_trade: {
      type: Object,
      required: true,
    },
    data_heat_map: {
      type: Array,
      required: true,
    },
    data_heat_map_foreign: {
      type: Object,
      required: true,
    },
  },
  components: {
    CustomEChart,
  },
  data() {
    return {
      option_filter_type: [
        {
          value: 1,
          label: "HSX",
        },
        {
          value: 2,
          label: "HNX",
        },
        {
          value: 3,
          label: "UPCOM",
        },
      ],
      data_filter_type: 1,
      current_department_click: "",
    };
  },
  methods: {
    clickChartHeatMap(e) {
      if (e.hasOwnProperty("selfType")) {
        if (e.nodeData.name == "Tất cả") {
          this.current_department_click = "";
          return;
        }
      }
      if (e.data.children.length > 0) {
        this.current_department_click = e.name;
        return;
      }
      const mack = e.data.id;
      this.$store.state.mackTradingChart = mack;
      this.$store.state.isShowModalTradingChart = true;
    },
  },
  computed: {
    data_exchange_trade_temp() {
      return this.data_exchange_trade;
    },
    data_eod() {
      let board_name = "";
      switch (this.data_filter_type) {
        case 1:
          board_name = "HOSE";
          break;
        case 2:
          board_name = "HNX";
          break;
        case 3:
          board_name = "UPCOM";
          break;
        default:
          break;
      }
      let return_data = [];
      if (
        Object.keys(this.data_heat_map).length > 0 &&
        Object.keys(this.$store.state.list_mack).length > 0
      ) {
        return this.$store.state.list_mack
          .filter((item) => {
            return item.san == board_name;
          })
          .map((item) => {
            return { ...this.$store.state.data_eod[item.mack] };
          });
      }
      return return_data;
    },
    option_heatmap() {
      if (this.data_heat_map.length > 0) {
        let total_all_vol = 0;
        let temp_eod = [...this.data_heat_map];
        temp_eod = temp_eod.filter((item) => item.stockcode.length <= 3);
        const list_perchange = temp_eod.map((item) => item.perchange);
        // temp_eod.sort((a,b) => {
        //   return parseFloat(b.totalvol) - parseFloat(a.totalvol);
        // });
        // if(temp_eod.length>200){
        //   temp_eod = temp_eod.slice(0,199);
        // }
        let temp_list_item_by_department = [];
        let temp_department = temp_eod[0].nganh;
        let temp_item_department = [];
        for (const item of temp_eod) {
          if (temp_department != item.nganh) {
            if (this.current_department_click != "") {
              if (temp_department == this.current_department_click) {
                temp_list_item_by_department.push({
                  children: temp_item_department,
                  description: temp_department,
                  id: temp_department,
                  name: temp_department,
                  value: [total_all_vol, null, null, 0],
                });
              }
            } else {
              temp_list_item_by_department.push({
                children: temp_item_department,
                description: temp_department,
                id: temp_department,
                name: temp_department,
                value: [total_all_vol, null, null, 0],
              });
            }
            temp_department = item.nganh;
            temp_item_department = [];
            total_all_vol = 0;
          }
          total_all_vol += parseFloat(item.totalvol);
          let value_color = 0;
          switch (item.cl) {
            case "c":
              value_color = 100;
              break;
            case "f":
              value_color = -100;
              break;
            case "d":
              value_color = -50;
              break;
            case "i":
              value_color = 50;
              break;
            case "e":
              value_color = 0;
          }
          temp_item_department.push({
            id: item.stockcode,
            name: item.stockcode + " \n" + item.perchange + "%",
            description: item.stockcode,
            value: [
              item.totalvol,
              item.lastprice / 1000,
              item.perchange,
              value_color,
            ],
            children: [],
          });
        }
        if (this.current_department_click != "") {
          if (temp_department == this.current_department_click) {
            temp_list_item_by_department.push({
              children: temp_item_department,
              description: temp_department,
              id: temp_department,
              name: temp_department,
              value: [total_all_vol, null, null, 0],
            });
          }
        } else {
          temp_list_item_by_department.push({
            children: temp_item_department,
            description: temp_department,
            id: temp_department,
            name: temp_department,
            value: [total_all_vol, null, null, 0],
          });
        }
        return {
          animation: false,
          tooltip: {
            renderMode: "html",
            formatter: (item) => {
              if (item.hasOwnProperty("data")) {
                if (item.data.children.length > 0) {
                  return [
                    '<div class="tooltip-title">' +
                      item.data.description +
                      "</div>",
                    "Khối lượng GD: &nbsp;&nbsp;" +
                      parseFloat(item.value[0]).toLocaleString("en", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      }) +
                      "<br>",
                  ].join("");
                } else {
                  return [
                    '<div class="tooltip-title">' +
                      item.data.description +
                      "</div>",
                    this.$store.state.list_mack_company.hasOwnProperty(
                      item.data.description
                    )
                      ? this.$store.state.list_mack_company[
                          item.data.description
                        ].ten_cong_ty
                      : "",
                    "<br>Giá: &nbsp;&nbsp;" +
                      parseFloat(item.value[1]).toLocaleString("en", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      }) +
                      "<br>",
                    "Khối lượng GD: &nbsp;&nbsp;" +
                      parseFloat(item.value[0]).toLocaleString("en", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      }) +
                      "<br>",
                    "Thay đổi: &nbsp;&nbsp;" +
                      parseFloat(item.value[2]).toLocaleString("en", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      }) +
                      " %<br>",
                  ].join("");
                }
              } else {
                return "";
              }
            },
          },
          series: [
            {
              name: "Tất cả",
              breadcrumb: { show: true },
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              type: "treemap",
              nodeClick: false,
              roam: false,
              label: {
                show: true,
                formatter: "{b}",
                normal: { textStyle: { ellipsis: true } },
              },
              itemStyle: { normal: { borderColor: "black" } },
              visualMin: -100,
              visualMax: 100,
              visualDimension: 3,
              upperLabel: { show: true, height: 26, color: "#fff" },
              levels: [
                {
                  itemStyle: {
                    borderWidth: 0,
                    borderColor: "#777",
                    gapWidth: 1,
                  },
                  upperLabel: { show: false },
                },
                {
                  color: [
                    "#52d3f9",
                    "#bb0000",
                    "#cccc00",
                    "#00bb00",
                    "#be00be",
                  ],
                  colorMappingBy: "value",
                  itemStyle: {
                    borderColor: "#555",
                    borderWidth: 3,
                    gapWidth: 1,
                  },
                  emphasis: { itemStyle: { borderColor: "#ddd" } },
                },
              ],
              data: temp_list_item_by_department,
            },
          ],
        };
      }
      return {
        series: [],
      };
    },
    data_change() {
      if (this.data_heat_map.length > 0) {
        let ceilchange = 0;
        let upchange = 0;
        let nochange = 0;
        let downchange = 0;
        let floorchange = 0;
        let ceilchange_n = 0;
        let upchange_n = 0;
        let nochange_n = 0;
        let downchange_n = 0;
        let floorchange_n = 0;
        for (const item of this.data_heat_map) {
          switch (item.cl) {
            case "c":
              ceilchange++;
              break;
            case "f":
              floorchange++;
              break;
            case "d":
              downchange++;
              break;
            case "i":
              upchange++;
              break;
            case "e":
              nochange++;
              break;
            default:
              break;
          }
          if (this.current_department_click != "" && item.nganh == this.current_department_click) {
            switch (item.cl) {
              case "c":
                ceilchange_n++;
                break;
              case "f":
                floorchange_n++;
                break;
              case "d":
                downchange_n++;
                break;
              case "i":
                upchange_n++;
                break;
              case "e":
                nochange_n++;
                break;
              default:
                break;
            }
          }
        }
        return {
          ceilchange,
          upchange,
          nochange,
          downchange,
          floorchange,
          ceilchange_n,
          upchange_n,
          nochange_n,
          downchange_n,
          floorchange_n,
        };
      }
      return {
        ceilchange: 0,
        upchange: 0,
        nochange: 0,
        downchange: 0,
        floorchange: 0,
        ceilchange_n: 0,
        upchange_n: 0,
        nochange_n: 0,
        downchange_n: 0,
        floorchange_n: 0,
      };
    },
    option_value_change_bar_chart() {
      if (this.data_exchange) {
        return {
          title: {
            text: "Số lượng cổ phiếu tăng, giảm, không đổi",
            left: "center",
            align: "auto",
            top: "2%",
            textStyle: {
              fontFamily: "Tahoma",
            },
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
            formatter: function (params) {
              return (
                params[0].name +
                ": " +
                parseFloat(params[0].data.value).toLocaleString("en", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }) +
                " mã"
              );
            },
          },
          grid: {
            left: "3%",
            right: "15%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: {
            type: "value",
            splitLine: {
              show: false,
            },
            axisLabel: {
              formatter: function (value) {
                return parseFloat(value).toLocaleString("en", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                });
              },
            },
          },
          yAxis: {
            type: "category",
            data: ["Sàn", "Giảm", "Không đổi", "Tăng", "Trần"],
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: {
              show: false,
            },
            axisPointer: {
              snap: true,
            },
            axisLabel: {},
          },
          series: [
            {
              data: [
                {
                  value: this.data_change.floorchange,
                  itemStyle: { color: "rgb(23, 194, 206)" },
                },
                {
                  value: this.data_change.downchange,
                  itemStyle: { color: "#990000" },
                },
                {
                  value: this.data_change.nochange,
                  itemStyle: { color: "#ccaa00" },
                },
                {
                  value: this.data_change.upchange,
                  itemStyle: { color: "#009900" },
                },
                {
                  value: this.data_change.ceilchange,
                  itemStyle: { color: "#da06f7" },
                },
              ],
              type: "bar",
              label: {
                show: true,
                position: "right",
                formatter: function (params) {
                  return (
                    parseFloat(params.value).toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }) + " mã"
                  );
                },
              },
              barMinWidth: 20,
              barMaxWidth: 30,
            },
          ],
        };
      }
      return {
        series: [],
      };
    },
    data_exchange() {
      let return_data = {};
      switch (this.data_filter_type) {
        case 1:
          return_data = this.data_exchange_trade["VNINDEX"];
          break;
        case 2:
          return_data = this.data_exchange_trade["HNXINDEX"];
          break;
        case 3:
          return_data = this.data_exchange_trade["UPCOMINDEX"];
          break;
        default:
          break;
      }
      return return_data;
    },
  },
  watch: {
    data_filter_type: {
      handler() {
        this.current_department_click = "";
        this.$emit("updatedTypeBoardHeatMap", this.data_filter_type);
      },
    },
  },
};
</script>
<style lang="scss">
.stock-perchange-up {
  color: #3cdc96;
}
.stock-perchange-down {
  color: #ff5858;
}
.table-market-vovatility {
  td {
    padding: 0.25rem 0.5rem;
  }
  th {
    padding: 0.25rem 0.5rem;
  }
}
.font-size-12 {
  font-size: 12px;
}
.bg-ceilchange_n {
  background-color: rgb(190, 0, 190);
  color: #fff;
  border-radius: 5%;
}
.bg-upchange_n {
  background-color:  rgb(0, 124, 1);
  color: #fff;
  border-radius: 5%;
}
.bg-nochange_n {
  background-color:rgb(246, 155, 11);
  color: #fff;
  border-radius: 5%;
}
.bg-downchange_n {
  background-color: rgb(255, 0, 23);
  color: #fff;
  border-radius: 5%;
}
.bg-floorchange_n {
  background-color: rgb(0, 105, 196);
  color: #fff;
  border-radius: 5%;
}
</style>
