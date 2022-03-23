<template>
  <CCard>
    <CCardHeader class="title-block">
      <div class="d-flex justify-content-between">
        <div class="pt-1 pl-2">
          <span class="font-weight-bold h5"
            >Biểu đồ nhiệt theo giá trị mua bán</span
          >
        </div>
        <div class="d-flex justify-content-between">
          <CSelect
            :value.sync="data_filter_type_trade"
            :options="option_filter_type_trade"
            class="mb-0 ml-2"
          >
          </CSelect>
          <CSelect
            v-if="data_filter_type_trade == 1 || data_filter_type_trade == 2"
            :value.sync="data_filter_type"
            :options="option_filter_type"
            class="mb-0 ml-2"
          >
          </CSelect>
          <CSelect
            v-if="data_filter_type_trade == 3 || data_filter_type_trade == 4"
            value.sync="1"
            :options="option_filter_type"
            class="mb-0 ml-2"
            disabled="true"
          >
          </CSelect>
        </div>
      </div>
    </CCardHeader>
    <CCardBody
      class="p-2"
      v-if="data_filter_type_trade == 1 || data_filter_type_trade == 2"
    >
      <CRow>
        <CCol sm="6" class="pr-1">
          <p class="h5 text-center">
            Mua:
            {{
              data_filter_type_trade == 1
                ? formatMoney(this.data_heat_map_foreign.value_buy, 0, 2)
                : formatMoney(this.data_heat_map_foreign.value_buy_net, 0, 2)
            }}
            tỷ
          </p>
          <CustomEChart
            :option="
              data_filter_type_trade == 1
                ? option_heatmap_foreign_buy
                : option_heatmap_foreign_buy_net
            "
            style="height: 450px"
            class="mb-1 pr-2"
            :handleClick="clickChartHeatMap"
          />
        </CCol>
        <CCol sm="6" class="pl-1">
          <p class="h5 text-center">
            Bán:
            {{
              data_filter_type_trade == 1
                ? formatMoney(this.data_heat_map_foreign.value_sell, 0, 2)
                : formatMoney(this.data_heat_map_foreign.value_sell_net, 0, 2)
            }}
            tỷ
          </p>
          <CustomEChart
            :option="
              data_filter_type_trade == 1
                ? option_heatmap_foreign_sell
                : option_heatmap_foreign_sell_net
            "
            style="height: 450px"
            class=""
            :handleClick="clickChartHeatMap"
          />
        </CCol>
      </CRow>
    </CCardBody>
    <CCardBody
      class="p-2"
      v-if="data_filter_type_trade == 3 || data_filter_type_trade == 4"
    >
      <CRow>
        <CCol sm="6" class="pr-1">
          <p class="h5 text-center">
            Mua:
            {{
              data_filter_type_trade == 3
                ? formatMoney(this.data_heat_map_prop.value_buy, 0, 2)
                : formatMoney(this.data_heat_map_prop.value_buy_net, 0, 2)
            }}
            tỷ
          </p>
          <CustomEChart
            :option="
              data_filter_type_trade == 3
                ? option_heatmap_prop_buy
                : option_heatmap_prop_buy_net
            "
            style="height: 450px"
            class="mb-1 pr-2"
            :handleClick="clickChartHeatMap"
          />
        </CCol>
        <CCol sm="6" class="pl-1">
          <p class="h5 text-center">
            Bán:
            {{
              data_filter_type_trade == 3
                ? formatMoney(this.data_heat_map_prop.value_sell, 0, 2)
                : formatMoney(this.data_heat_map_prop.value_sell_net, 0, 2)
            }}
            tỷ
          </p>
          <CustomEChart
            :option="
              data_filter_type_trade == 3
                ? option_heatmap_prop_sell
                : option_heatmap_prop_sell_net
            "
            style="height: 450px"
            class=""
            :handleClick="clickChartHeatMap"
          />
        </CCol>
      </CRow>
    </CCardBody>
  </CCard>
</template>
<script>
import CustomEChart from "@/views/charts/CustomEchart";
import { number } from "echarts/core";

export default {
  name: "WidgetHeatMapForeign",
  props: {
    data_exchange_trade: {
      type: Object,
      required: true,
    },
    data_heat_map_foreign: {
      type: Object,
      required: true,
    },
    data_heat_map_prop: {
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
      option_filter_type_trade: [
        {
          value: 1,
          label: "GDNN",
        },
        {
          value: 2,
          label: "GDNN Ròng",
        },
        {
          value: 3,
          label: "Giao dịch Quỹ nội",
        },
        {
          value: 4,
          label: "Giao dịch Quỹ nội Ròng",
        },
      ],
      data_filter_type_trade: 1,
    };
  },
  methods: {
    formatMoney(number, min, max) {
      number = parseFloat(number);
      return number.toLocaleString("en", {
        minimumFractionDigits: min,
        maximumFractionDigits: max,
      });
    },
    clickChartHeatMap(e) {
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
    option_heatmap_foreign_buy() {
      if (this.data_heat_map_foreign.list_buy.length > 0) {
        const visualMinBound = -40;
        const visualMaxBound = 40;
        const visualMin = -100;
        const visualMax = 100;
        let total_all_vol = 0;
        const max = this.data_heat_map_foreign.max_percent;
        const min = this.data_heat_map_foreign.min_percent;

        const list_item = this.data_heat_map_foreign.list_buy.map((item) => {
          total_all_vol += item.totalvol;
          let perchange = this.$store.state.data_eod.hasOwnProperty(item.mack)
            ? this.$store.state.data_eod[item.mack].perchange
            : 0;
          let lastprice = this.$store.state.data_eod.hasOwnProperty(item.mack)
            ? this.$store.state.data_eod[item.mack].lastprice
            : 0;
          let cl = this.$store.state.data_eod.hasOwnProperty(item.mack)
            ? this.$store.state.data_eod[item.mack].cl
            : 0;
          let value_color = 0;
          switch (cl) {
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
          return {
            id: item.mack,
            name: item.mack + " \n" + perchange + "%",
            description: item.mack,
            value: [
              item.fbuy / 1000000,
              lastprice / 1000,
              perchange,
              value_color,
            ],
            children: [],
          };
        });

        return {
          animation: false,
          tooltip: {
            renderMode: "html",
            formatter: (item) => {
              return [
                '<div class="tooltip-title">' +
                  item.data.description +
                  "</div>",
                this.$store.state.list_mack_company.hasOwnProperty(
                  item.data.description
                )
                  ? this.$store.state.list_mack_company[item.data.description]
                      .ten_cong_ty
                  : "",
                "<br>Giá: &nbsp;&nbsp;" +
                  parseFloat(item.value[1]).toLocaleString("en", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }) +
                  "<br>",
                "Giá trị GD: &nbsp;&nbsp;" +
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
            },
          },
          series: [
            {
              name: "Tất cả",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              type: "treemap",
              roam: false,
              nodeClick: false,
              label: {
                show: true,
                formatter: "{b}",
                normal: {
                  textStyle: {
                    ellipsis: true,
                  },
                },
              },
              itemStyle: {
                normal: {
                  borderColor: "black",
                },
              },
              visualMin: -100,
              visualMax: 100,
              visualDimension: 3,
              upperLabel: {
                show: true,
                height: 26,
              },
              levels: [
                {
                  itemStyle: {
                    borderWidth: 0,
                    borderColor: "#777",
                    gapWidth: 1,
                  },
                  upperLabel: {
                    show: false,
                  },
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
                    borderWidth: 0,
                    gapWidth: 1,
                  },
                  upperLabel: { show: false },
                },
              ],
              data: [
                {
                  id: "ROOT",
                  name: "Bản đồ nhiệt",
                  description: "Bản đồ nhiệt",
                  value: [total_all_vol, null, null, 0],
                  children: list_item,
                },
              ],
            },
          ],
        };
      }
      return {
        series: [],
      };
    },
    option_heatmap_foreign_sell() {
      if (this.data_heat_map_foreign.list_sell.length > 0) {
        const visualMinBound = -40;
        const visualMaxBound = 40;
        const visualMin = -100;
        const visualMax = 100;
        let total_all_vol = 0;
        const max = this.data_heat_map_foreign.max_percent;
        const min = this.data_heat_map_foreign.min_percent;

        const list_item = this.data_heat_map_foreign.list_sell.map((item) => {
          total_all_vol += item.totalvol;
          let perchange = this.$store.state.data_eod.hasOwnProperty(item.mack)
            ? this.$store.state.data_eod[item.mack].perchange
            : 0;
          let lastprice = this.$store.state.data_eod.hasOwnProperty(item.mack)
            ? this.$store.state.data_eod[item.mack].lastprice
            : 0;
          let cl = this.$store.state.data_eod.hasOwnProperty(item.mack)
            ? this.$store.state.data_eod[item.mack].cl
            : 0;
          let value_color = 0;
          switch (cl) {
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
          return {
            id: item.mack,
            name: item.mack + " \n" + perchange + "%",
            description: item.mack,
            value: [
              item.fsell / 1000000,
              lastprice / 1000,
              perchange,
              value_color,
            ],
            children: [],
          };
        });

        return {
          animation: false,
          tooltip: {
            renderMode: "html",
            formatter: (item) => {
              return [
                '<div class="tooltip-title">' +
                  item.data.description +
                  "</div>",
                this.$store.state.list_mack_company.hasOwnProperty(
                  item.data.description
                )
                  ? this.$store.state.list_mack_company[item.data.description]
                      .ten_cong_ty
                  : "",
                "<br>Giá: &nbsp;&nbsp;" +
                  parseFloat(item.value[1]).toLocaleString("en", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }) +
                  "<br>",
                "Giá trị GD: &nbsp;&nbsp;" +
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
            },
          },
          series: [
            {
              name: "Tất cả",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              type: "treemap",
              roam: false,
              nodeClick: false,
              label: {
                show: true,
                formatter: "{b}",
                normal: {
                  textStyle: {
                    ellipsis: true,
                  },
                },
              },
              itemStyle: {
                normal: {
                  borderColor: "black",
                },
              },
              visualMin: -100,
              visualMax: 100,
              visualDimension: 3,
              upperLabel: {
                show: true,
                height: 26,
              },
              levels: [
                {
                  itemStyle: {
                    borderWidth: 0,
                    borderColor: "#777",
                    gapWidth: 1,
                  },
                  upperLabel: {
                    show: false,
                  },
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
                    borderWidth: 0,
                    gapWidth: 1,
                  },
                  upperLabel: { show: false },
                },
              ],
              data: [
                {
                  id: "ROOT",
                  name: "Bản đồ nhiệt",
                  description: "Bản đồ nhiệt",
                  value: [total_all_vol, null, null, 0],
                  children: list_item,
                },
              ],
            },
          ],
        };
      }
      return {
        series: [],
      };
    },
    option_heatmap_foreign_buy_net() {
      if (this.data_heat_map_foreign.list_buy_net.length > 0) {
        const visualMinBound = -40;
        const visualMaxBound = 40;
        const visualMin = -100;
        const visualMax = 100;
        let total_all_vol = 0;
        const max = this.data_heat_map_foreign.max_percent;
        const min = this.data_heat_map_foreign.min_percent;

        const list_item = this.data_heat_map_foreign.list_buy_net.map(
          (item) => {
            total_all_vol += item.totalvol;
            let perchange = this.$store.state.data_eod.hasOwnProperty(item.mack)
              ? this.$store.state.data_eod[item.mack].perchange
              : 0;
            let lastprice = this.$store.state.data_eod.hasOwnProperty(item.mack)
              ? this.$store.state.data_eod[item.mack].lastprice
              : 0;
            let cl = this.$store.state.data_eod.hasOwnProperty(item.mack)
              ? this.$store.state.data_eod[item.mack].cl
              : 0;
            let value_color = 0;
            switch (cl) {
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
            return {
              id: item.mack,
              name: item.mack + " \n" + perchange + "%",
              description: item.mack,
              value: [
                item.fbuy / 1000000,
                lastprice / 1000,
                perchange,
                value_color,
              ],
              children: [],
            };
          }
        );

        return {
          animation: false,
          tooltip: {
            renderMode: "html",
            formatter: (item) => {
              return [
                '<div class="tooltip-title">' +
                  item.data.description +
                  "</div>",
                this.$store.state.list_mack_company.hasOwnProperty(
                  item.data.description
                )
                  ? this.$store.state.list_mack_company[item.data.description]
                      .ten_cong_ty
                  : "",
                "<br>Giá: &nbsp;&nbsp;" +
                  parseFloat(item.value[1]).toLocaleString("en", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }) +
                  "<br>",
                "Giá trị GD: &nbsp;&nbsp;" +
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
            },
          },
          series: [
            {
              name: "Tất cả",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              type: "treemap",
              roam: false,
              nodeClick: false,
              label: {
                show: true,
                formatter: "{b}",
                normal: {
                  textStyle: {
                    ellipsis: true,
                  },
                },
              },
              itemStyle: {
                normal: {
                  borderColor: "black",
                },
              },
              visualMin: -100,
              visualMax: 100,
              visualDimension: 3,
              upperLabel: {
                show: true,
                height: 26,
              },
              levels: [
                {
                  itemStyle: {
                    borderWidth: 0,
                    borderColor: "#777",
                    gapWidth: 1,
                  },
                  upperLabel: {
                    show: false,
                  },
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
                    borderWidth: 0,
                    gapWidth: 1,
                  },
                  upperLabel: { show: false },
                },
              ],
              data: [
                {
                  id: "ROOT",
                  name: "Bản đồ nhiệt",
                  description: "Bản đồ nhiệt",
                  value: [total_all_vol, null, null, 0],
                  children: list_item,
                },
              ],
            },
          ],
        };
      }
      return {
        series: [],
      };
    },
    option_heatmap_foreign_sell_net() {
      if (this.data_heat_map_foreign.list_sell_net.length > 0) {
        const visualMinBound = -40;
        const visualMaxBound = 40;
        const visualMin = -100;
        const visualMax = 100;
        let total_all_vol = 0;
        const max = this.data_heat_map_foreign.max_percent;
        const min = this.data_heat_map_foreign.min_percent;

        const list_item = this.data_heat_map_foreign.list_sell_net.map(
          (item) => {
            total_all_vol += item.totalvol;
            let perchange = this.$store.state.data_eod.hasOwnProperty(item.mack)
              ? this.$store.state.data_eod[item.mack].perchange
              : 0;
            let lastprice = this.$store.state.data_eod.hasOwnProperty(item.mack)
              ? this.$store.state.data_eod[item.mack].lastprice
              : 0;
           let cl = this.$store.state.data_eod.hasOwnProperty(item.mack)
            ? this.$store.state.data_eod[item.mack].cl
            : 0;
          let value_color = 0;
          switch (cl) {
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
            return {
              id: item.mack,
              name: item.mack + " \n" + perchange + "%",
              description: item.mack,
              value: [
                item.fsell / 1000000,
                lastprice / 1000,
                perchange,
                value_color,
              ],
              children: [],
            };
          }
        );

        return {
          animation: false,
          tooltip: {
            renderMode: "html",
            formatter: (item) => {
              return [
                '<div class="tooltip-title">' +
                  item.data.description +
                  "</div>",
                this.$store.state.list_mack_company.hasOwnProperty(
                  item.data.description
                )
                  ? this.$store.state.list_mack_company[item.data.description]
                      .ten_cong_ty
                  : "",
                "<br>Giá: &nbsp;&nbsp;" +
                  parseFloat(item.value[1]).toLocaleString("en", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }) +
                  "<br>",
                "Giá trị GD: &nbsp;&nbsp;" +
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
            },
          },
          series: [
            {
              name: "Tất cả",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              type: "treemap",
              roam: false,
              nodeClick: false,
              label: {
                show: true,
                formatter: "{b}",
                normal: {
                  textStyle: {
                    ellipsis: true,
                  },
                },
              },
              itemStyle: {
                normal: {
                  borderColor: "black",
                },
              },
              visualMin: -100,
              visualMax: 100,
              visualDimension: 3,
              upperLabel: {
                show: true,
                height: 26,
              },
              levels: [
                {
                  itemStyle: {
                    borderWidth: 0,
                    borderColor: "#777",
                    gapWidth: 1,
                  },
                  upperLabel: {
                    show: false,
                  },
                },
                {
                  color: ["#52d3f9", "#bb0000", "#cccc00", "#00bb00", "#be00be"],
                  colorMappingBy: "value",
                  itemStyle: {
                    borderColor: "#555",
                    borderWidth: 0,
                    gapWidth: 1,
                  },
                  upperLabel: { show: false },
                },
              ],
              data: [
                {
                  id: "ROOT",
                  name: "Bản đồ nhiệt",
                  description: "Bản đồ nhiệt",
                  value: [total_all_vol, null, null, 0],
                  children: list_item,
                },
              ],
            },
          ],
        };
      }
      return {
        series: [],
      };
    },
    option_heatmap_prop_buy() {
      if (this.data_heat_map_prop.list_buy.length > 0) {
        const visualMinBound = -40;
        const visualMaxBound = 40;
        const visualMin = -100;
        const visualMax = 100;
        let total_all_vol = 0;
        const max = this.data_heat_map_prop.max_percent;
        const min = this.data_heat_map_prop.min_percent;

        const list_item = this.data_heat_map_prop.list_buy.map((item) => {
          total_all_vol += item.totalvol;
          let perchange = this.$store.state.data_eod.hasOwnProperty(item.mack)
            ? this.$store.state.data_eod[item.mack].perchange
            : 0;
          let lastprice = this.$store.state.data_eod.hasOwnProperty(item.mack)
            ? this.$store.state.data_eod[item.mack].lastprice
            : 0;
          let cl = this.$store.state.data_eod.hasOwnProperty(item.mack)
            ? this.$store.state.data_eod[item.mack].cl
            : 0;
          let value_color = 0;
          switch (cl) {
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
          return {
            id: item.mack,
            name: item.mack + " \n" + perchange + "%",
            description: item.mack,
            value: [
              item.pbuy / 1000000,
              lastprice / 1000,
              perchange,
              value_color,
            ],
            children: [],
          };
        });

        return {
          animation: false,
          tooltip: {
            renderMode: "html",
            formatter: (item) => {
              return [
                '<div class="tooltip-title">' +
                  item.data.description +
                  "</div>",
                this.$store.state.list_mack_company.hasOwnProperty(
                  item.data.description
                )
                  ? this.$store.state.list_mack_company[item.data.description]
                      .ten_cong_ty
                  : "",
                "<br>Giá: &nbsp;&nbsp;" +
                  parseFloat(item.value[1]).toLocaleString("en", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }) +
                  "<br>",
                "Giá trị GD: &nbsp;&nbsp;" +
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
            },
          },
          series: [
            {
              name: "Tất cả",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              type: "treemap",
              roam: false,
              nodeClick: false,
              label: {
                show: true,
                formatter: "{b}",
                normal: {
                  textStyle: {
                    ellipsis: true,
                  },
                },
              },
              itemStyle: {
                normal: {
                  borderColor: "black",
                },
              },
              visualMin: -100,
              visualMax: 100,
              visualDimension: 3,
              upperLabel: {
                show: true,
                height: 26,
              },
              levels: [
                {
                  itemStyle: {
                    borderWidth: 0,
                    borderColor: "#777",
                    gapWidth: 1,
                  },
                  upperLabel: {
                    show: false,
                  },
                },
                {
                  color: ["#52d3f9", "#bb0000", "#cccc00", "#00bb00", "#be00be"],
                  colorMappingBy: "value",
                  itemStyle: {
                    borderColor: "#555",
                    borderWidth: 0,
                    gapWidth: 1,
                  },
                  upperLabel: { show: false },
                },
              ],
              data: [
                {
                  id: "ROOT",
                  name: "Bản đồ nhiệt",
                  description: "Bản đồ nhiệt",
                  value: [total_all_vol, null, null, 0],
                  children: list_item,
                },
              ],
            },
          ],
        };
      }
      return {
        series: [],
      };
    },
    option_heatmap_prop_sell() {
      if (this.data_heat_map_prop.list_sell.length > 0) {
        const visualMinBound = -40;
        const visualMaxBound = 40;
        const visualMin = -100;
        const visualMax = 100;
        let total_all_vol = 0;
        const max = this.data_heat_map_prop.max_percent;
        const min = this.data_heat_map_prop.min_percent;

        const list_item = this.data_heat_map_prop.list_sell.map((item) => {
          total_all_vol += item.totalvol;
          let perchange = this.$store.state.data_eod.hasOwnProperty(item.mack)
            ? this.$store.state.data_eod[item.mack].perchange
            : 0;
          let lastprice = this.$store.state.data_eod.hasOwnProperty(item.mack)
            ? this.$store.state.data_eod[item.mack].lastprice
            : 0;
          let cl = this.$store.state.data_eod.hasOwnProperty(item.mack)
            ? this.$store.state.data_eod[item.mack].cl
            : 0;
          let value_color = 0;
          switch (cl) {
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
          return {
            id: item.mack,
            name: item.mack + " \n" + perchange + "%",
            description: item.mack,
            value: [
              item.psell / 1000000,
              lastprice / 1000,
              perchange,
              value_color,
            ],
            children: [],
          };
        });

        return {
          animation: false,
          tooltip: {
            renderMode: "html",
            formatter: (item) => {
              return [
                '<div class="tooltip-title">' +
                  item.data.description +
                  "</div>",
                this.$store.state.list_mack_company.hasOwnProperty(
                  item.data.description
                )
                  ? this.$store.state.list_mack_company[item.data.description]
                      .ten_cong_ty
                  : "",
                "<br>Giá: &nbsp;&nbsp;" +
                  parseFloat(item.value[1]).toLocaleString("en", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }) +
                  "<br>",
                "Giá trị GD: &nbsp;&nbsp;" +
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
            },
          },
          series: [
            {
              name: "Tất cả",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              type: "treemap",
              roam: false,
              nodeClick: false,
              label: {
                show: true,
                formatter: "{b}",
                normal: {
                  textStyle: {
                    ellipsis: true,
                  },
                },
              },
              itemStyle: {
                normal: {
                  borderColor: "black",
                },
              },
              visualMin: -100,
              visualMax: 100,
              visualDimension: 3,
              upperLabel: {
                show: true,
                height: 26,
              },
              levels: [
                {
                  itemStyle: {
                    borderWidth: 0,
                    borderColor: "#777",
                    gapWidth: 1,
                  },
                  upperLabel: {
                    show: false,
                  },
                },
                {
                  color: ["#52d3f9", "#bb0000", "#cccc00", "#00bb00", "#be00be"],
                  colorMappingBy: "value",
                  itemStyle: {
                    borderColor: "#555",
                    borderWidth: 0,
                    gapWidth: 1,
                  },
                  upperLabel: { show: false },
                },
              ],
              data: [
                {
                  id: "ROOT",
                  name: "Bản đồ nhiệt",
                  description: "Bản đồ nhiệt",
                  value: [total_all_vol, null, null, 0],
                  children: list_item,
                },
              ],
            },
          ],
        };
      }
      return {
        series: [],
      };
    },
    option_heatmap_prop_buy_net() {
      if (this.data_heat_map_prop.list_buy_net.length > 0) {
        const visualMinBound = -40;
        const visualMaxBound = 40;
        const visualMin = -100;
        const visualMax = 100;
        let total_all_vol = 0;
        const max = this.data_heat_map_prop.max_percent;
        const min = this.data_heat_map_prop.min_percent;

        const list_item = this.data_heat_map_prop.list_buy_net.map((item) => {
          total_all_vol += item.totalvol;
          let perchange = this.$store.state.data_eod.hasOwnProperty(item.mack)
            ? this.$store.state.data_eod[item.mack].perchange
            : 0;
          let lastprice = this.$store.state.data_eod.hasOwnProperty(item.mack)
            ? this.$store.state.data_eod[item.mack].lastprice
            : 0;
          let cl = this.$store.state.data_eod.hasOwnProperty(item.mack)
            ? this.$store.state.data_eod[item.mack].cl
            : 0;
          let value_color = 0;
          switch (cl) {
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
          return {
            id: item.mack,
            name: item.mack + " \n" + perchange + "%",
            description: item.mack,
            value: [
              item.pbuy / 1000000,
              lastprice / 1000,
              perchange,
              value_color,
            ],
            children: [],
          };
        });

        return {
          animation: false,
          tooltip: {
            renderMode: "html",
            formatter: (item) => {
              return [
                '<div class="tooltip-title">' +
                  item.data.description +
                  "</div>",
                this.$store.state.list_mack_company.hasOwnProperty(
                  item.data.description
                )
                  ? this.$store.state.list_mack_company[item.data.description]
                      .ten_cong_ty
                  : "",
                "<br>Giá: &nbsp;&nbsp;" +
                  parseFloat(item.value[1]).toLocaleString("en", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }) +
                  "<br>",
                "Giá trị GD: &nbsp;&nbsp;" +
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
            },
          },
          series: [
            {
              name: "Tất cả",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              type: "treemap",
              roam: false,
              nodeClick: false,
              label: {
                show: true,
                formatter: "{b}",
                normal: {
                  textStyle: {
                    ellipsis: true,
                  },
                },
              },
              itemStyle: {
                normal: {
                  borderColor: "black",
                },
              },
              visualMin: -100,
              visualMax: 100,
              visualDimension: 3,
              upperLabel: {
                show: true,
                height: 26,
              },
              levels: [
                {
                  itemStyle: {
                    borderWidth: 0,
                    borderColor: "#777",
                    gapWidth: 1,
                  },
                  upperLabel: {
                    show: false,
                  },
                },
                {
                  color: ["#52d3f9", "#bb0000", "#cccc00", "#00bb00", "#be00be"],
                  colorMappingBy: "value",
                  itemStyle: {
                    borderColor: "#555",
                    borderWidth: 0,
                    gapWidth: 1,
                  },
                  upperLabel: { show: false },
                },
              ],
              data: [
                {
                  id: "ROOT",
                  name: "Bản đồ nhiệt",
                  description: "Bản đồ nhiệt",
                  value: [total_all_vol, null, null, 0],
                  children: list_item,
                },
              ],
            },
          ],
        };
      }
      return {
        series: [],
      };
    },
    option_heatmap_prop_sell_net() {
      if (this.data_heat_map_prop.list_sell_net.length > 0) {
        const visualMinBound = -40;
        const visualMaxBound = 40;
        const visualMin = -100;
        const visualMax = 100;
        let total_all_vol = 0;
        const max = this.data_heat_map_prop.max_percent;
        const min = this.data_heat_map_prop.min_percent;

        const list_item = this.data_heat_map_prop.list_sell_net.map((item) => {
          total_all_vol += item.totalvol;
          let perchange = this.$store.state.data_eod.hasOwnProperty(item.mack)
            ? this.$store.state.data_eod[item.mack].perchange
            : 0;
          let lastprice = this.$store.state.data_eod.hasOwnProperty(item.mack)
            ? this.$store.state.data_eod[item.mack].lastprice
            : 0;
          let cl = this.$store.state.data_eod.hasOwnProperty(item.mack)
            ? this.$store.state.data_eod[item.mack].cl
            : 0;
          let value_color = 0;
          switch (cl) {
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
          return {
            id: item.mack,
            name: item.mack + " \n" + perchange + "%",
            description: item.mack,
            value: [
              item.psell / 1000000,
              lastprice / 1000,
              perchange,
              value_color,
            ],
            children: [],
          };
        });

        return {
          animation: false,
          tooltip: {
            renderMode: "html",
            formatter: (item) => {
              return [
                '<div class="tooltip-title">' +
                  item.data.description +
                  "</div>",
                this.$store.state.list_mack_company.hasOwnProperty(
                  item.data.description
                )
                  ? this.$store.state.list_mack_company[item.data.description]
                      .ten_cong_ty
                  : "",
                "<br>Giá: &nbsp;&nbsp;" +
                  parseFloat(item.value[1]).toLocaleString("en", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }) +
                  "<br>",
                "Giá trị GD: &nbsp;&nbsp;" +
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
            },
          },
          series: [
            {
              name: "Tất cả",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              type: "treemap",
              roam: false,
              nodeClick: false,
              label: {
                show: true,
                formatter: "{b}",
                normal: {
                  textStyle: {
                    ellipsis: true,
                  },
                },
              },
              itemStyle: {
                normal: {
                  borderColor: "black",
                },
              },
              visualMin: -100,
              visualMax: 100,
              visualDimension: 3,
              upperLabel: {
                show: true,
                height: 26,
              },
              levels: [
                {
                  itemStyle: {
                    borderWidth: 0,
                    borderColor: "#777",
                    gapWidth: 1,
                  },
                  upperLabel: {
                    show: false,
                  },
                },
                {
                  color: ["#52d3f9", "#bb0000", "#cccc00", "#00bb00", "#be00be"],
                  colorMappingBy: "value",
                  itemStyle: {
                    borderColor: "#555",
                    borderWidth: 0,
                    gapWidth: 1,
                  },
                  upperLabel: { show: false },
                },
              ],
              data: [
                {
                  id: "ROOT",
                  name: "Bản đồ nhiệt",
                  description: "Bản đồ nhiệt",
                  value: [total_all_vol, null, null, 0],
                  children: list_item,
                },
              ],
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
        this.$emit("updatedTypeBoardHeatMapForeign", this.data_filter_type);
      },
    },
    data_filter_type_trade: {
      handler() {
        this.$emit(
          "updatedTypeTradeHeatMapForeign",
          this.data_filter_type_trade
        );
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
</style>
