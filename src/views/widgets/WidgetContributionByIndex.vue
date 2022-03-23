<template>
  <CCard>
    <CCardHeader class="title-block">
      <div class="d-flex justify-content-between">
        <CTabs
          variant="pills"
          @update:activeTab="clickTab"
          :active-tab="data_filter_type_chart"
        >
          <CTab title="Nhịp đập thị trường" active> </CTab>
          <CTab title="Nhóm ảnh hưởng"> </CTab>
          <CTab title="Thanh khoản"> </CTab>
        </CTabs>
        <div class="d-flex justify-content-between">
          <CSelect
            v-if="data_filter_type_chart == 0"
            :value.sync="data_filter_count_week_before"
            :options="option_filter_count_week_before"
            class="mb-0 mr-1"
          >
          </CSelect>
          <CSelect
            v-if="data_filter_type_chart == 0"
            :value.sync="data_filter_type_chart_market_pulse"
            :options="option_filter_type_chart_market_pulse"
            class="mb-0 mr-1"
          >
          </CSelect>
          <CSelect
            v-if="data_filter_type_chart != 0"
            :value.sync="data_filter_type"
            :options="option_filter_type"
            class="mb-0"
          >
          </CSelect>
        </div>
      </div>
    </CCardHeader>
    <CCardBody class="p-2 d-flex justify-content-center">
      <div v-show="data_filter_type_chart == 0" style="width: 100%">
        <p
          class="text-center h4"
          v-show="data_filter_type_chart_market_pulse == 'nganh'"
        >
          Nhịp đập thị trường theo ngành
        </p>
        <CustomEChart
          v-show="data_filter_type_chart_market_pulse == 'nganh'"
          :option="option_chart_market_pulse"
          style="height: 1450px"
        />
        <p
          class="text-center h4"
          v-show="data_filter_type_chart_market_pulse == 'nhom'"
        >
          Nhịp đập thị trường theo nhóm
        </p>
        <CustomEChart
          v-show="data_filter_type_chart_market_pulse == 'nhom'"
          :option="option_chart_market_pulse"
          style="height: 250px"
        />
      </div>
      <div v-show="data_filter_type_chart == 1" style="width: 100%">
        <p class="text-center h4">Nhóm ảnh hưởng mạnh tới chỉ số</p>
        <CustomEChart
          :option="option_chart_contribution"
          style="height: 450px"
        />
      </div>
      <div v-show="data_filter_type_chart == 2" style="width: 100%">
        <p class="text-center h4">Thanh khoản</p>
        <CustomEChart :option="option_chart_liquid" style="height: 450px" />
      </div>
    </CCardBody>
  </CCard>
</template>
<script>
import CustomEChart from "@/views/charts/CustomEchart";

export default {
  name: "WidgetContributionByIndex",
  props: {},
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
        {
          value: 4,
          label: "VN30",
        },
        {
          value: 5,
          label: "HNX30",
        },
      ],
      option_filter_type_chart: [
        {
          value: 0,
          label: "Nhịp đập thị trường",
        },
        {
          value: 1,
          label: "Nhóm ảnh hưởng",
        },
        {
          value: 2,
          label: "Thanh khoản",
        },
      ],
      option_filter_count_week_before: [
        {
          value: 1,
          label: "1 ngày",
        },
        {
          value: 3,
          label: "3 ngày",
        },
        {
          value: 5,
          label: "1 tuần",
        },
        {
          value: 10,
          label: "2 tuần",
        },
        {
          value: 15,
          label: "3 tuần",
        },
        {
          value: 20,
          label: "1 tháng",
        },
      ],
      option_filter_type_chart_market_pulse: [
        {
          value: "nganh",
          label: "Ngành",
        },
        {
          value: "nhom",
          label: "Nhóm",
        },
      ],
      data_filter_type_chart: 0,
      data_filter_type: 1,
      data_filter_count_week_before: 1,
      data_filter_type_chart_market_pulse: "nganh",
      data_cli: [],
      data_cld: [],
      price_eod_yesterday: 0,
      data_liquid_yesterday: {
        price: [],
        totalval: [],
        totalvol: [],
        tradingdate: [],
      },
      data_liquid_today: {
        price: [],
        totalval: [],
        totalvol: [],
        tradingdate: [],
      },
      data_market_pulse: {
        name: [],
        percent: [],
        totalval: [],
        totalvalbefore: [],
      },
      data_market_pulse_market_cap: {
        name: [],
        percent: [],
        totalval: [],
        totalvalbefore: [],
      },
      is_interval: true,
      isModerator: false,
    };
  },
  methods: {
    changeTextSpecial(text) {
      text = text.trim().toLowerCase();
      text = text.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
      text = text.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
      text = text.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
      text = text.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
      text = text.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
      text = text.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
      text = text.replace(/đ/gi, "d");
      return text.toUpperCase();
    },
    clickTab(e) {
      this.data_filter_type_chart = e;
    },
    getDataContribution() {
      let index_mack = "";
      switch (this.data_filter_type) {
        case 1:
          index_mack = "VNINDEX";
          break;
        case 2:
          index_mack = "HNXINDEX";
          break;
        case 3:
          index_mack = "UPCOMINDEX";
          break;
        case 4:
          index_mack = "VN30";
          break;
        case 5:
          index_mack = "HNX30";
          break;
        default:
          break;
      }
      window.socket_send.emit("getcontributionbyindex", index_mack, (res) => {
        this.data_cli = [];
        this.data_cld = [];
        if (!res) return;
        if (res.stockcode.length > 0) {
          window.socket_send.emit("getlive", res.stockcode, (res) => {
            for (let i = 0; i < res["stockcode"].length; i++) {
              const stockcode = res["stockcode"][i];
              let item = {
                cl: res["cl"][i],
                lastprice: res["lastprice"][i],
                change:
                  res["cl"][i] == "d" || res["cl"][i] == "f"
                    ? -res["change"][i]
                    : res["change"][i],
                perchange:
                  res["cl"][i] == "d" || res["cl"][i] == "f"
                    ? -res["perchange"][i]
                    : res["perchange"][i],
                stockcode: res["stockcode"][i],
                totalval: res["totalval"][i],
                totalvol: res["totalvol"][i],
              };
              this.$store.state.data_eod[stockcode] = item;
            }
          });
          for (let i = 0; i < res.stockcode.length; i++) {
            const item = {
              change: res.change[i],
              cl: res.cl[i],
              perchange: res.perchange[i] * 100,
              rank: res.rank[i],
              stockcode: res.stockcode[i],
              totalval: res.totalval[i],
              totalvol: res.totalvol[i],
            };
            if (res.cl[i] == "i") {
              this.data_cli.push(item);
            } else if (res.cl[i] == "d") {
              this.data_cld.push(item);
            }
          }
        }
      });
    },
    getDataLiquid() {
      let index_mack = "";
      switch (this.data_filter_type) {
        case 1:
          index_mack = "VNINDEX";
          break;
        case 2:
          index_mack = "HNXINDEX";
          break;
        case 3:
          index_mack = "UPCOMINDEX";
          break;
        case 4:
          index_mack = "VN30";
          break;
        case 5:
          index_mack = "HNX30";
          break;
        default:
          break;
      }
      if (this.data_liquid_yesterday.tradingdate.length == 0) {
        window.socket_send.emit("getlastliquidbyindex", index_mack, (res) => {
          if (!res) return;
          if (Object.keys(res).length == 0) return;
          if (res.stockcode == index_mack) {
            this.data_liquid_yesterday = res;
            const time = res.tradingdate[0].substr(0, 10);
            window.socket_send.emit(
              "getlasteod",
              [index_mack],
              time,
              (res1) => {
                if (!res1) return;
                if (res1.stockcode.length > 0) {
                  if (res1.stockcode[0] == index_mack) {
                    this.price_eod_yesterday = parseFloat(res1.eod[0]);
                  }
                }
              }
            );
          }
        });
      }
      window.socket_send.emit("getliquidbyindex", index_mack, (res) => {
        if (!res) return;
        if (Object.keys(res).length == 0) return;
        if (res.stockcode == index_mack) {
          this.data_liquid_today = res;
        }
      });
    },
    getMarketPulse() {
      // this.data_market_pulse = {
      //   name: [],
      //   percent: [],
      //   totalval: [],
      //   totalvalbefore: [],
      // };
      window.socket_send.emit(
        "getmarketpulse",
        this.data_filter_type_chart_market_pulse,
        this.data_filter_count_week_before,
        (res) => {
          if (!res) return;
          if (Object.keys(res) == 0) return;
          this.data_market_pulse = {
            name: res.name,
            percent: res.percent,
            totalval: res.totalval,
            totalvalbefore: res.totalvalbefore,
          };
        }
      );
    },
    getMarketPulseMarketCap() {
      window.socket_send.emit(
        "getmarketpulsemarketcap",
        this.data_filter_type_chart_market_pulse,
        this.data_filter_count_week_before,
        (res) => {
          if (!res) return;
          if (Object.keys(res) == 0) return;
          this.data_market_pulse_market_cap = {
            name: res.name,
            percent: res.percent,
            totalval: res.totalval,
            totalvalbefore: res.totalvalbefore,
          };
        }
      );
    },
    formatMoney(number, min, max) {
      number = parseFloat(number);
      return number.toLocaleString("en", {
        minimumFractionDigits: min,
        maximumFractionDigits: max,
      });
    },
    getBGColorFromChange(change) {
      if(this.$store.state.darkMode){
        if(change >= 0){
          return "#13461d";
        }else{
          return "#43141a";
        }
      }else{
        if(change >= 0){
          return "#2db85b";
        }else{
          return "#e55353";
        }
      }
    }
  },
  created() {
    this.getDataContribution();
    // this.getDataLiquid();
    this.getMarketPulse();
    this.getMarketPulseMarketCap();
    setInterval(() => {
      if (this.is_valid_interval) {
        if (this.data_filter_count_week_before == 1) {
          this.getMarketPulse();
          this.getMarketPulseMarketCap();
        }
      }
    }, 10000);
    setInterval(() => {
      if (this.is_valid_interval) {
        if (this.data_filter_type_chart == 1) {
          this.getDataContribution();
        } else if (this.data_filter_type_chart == 2) {
          this.getDataLiquid();
        }
      }
    }, 30000);
  },
  mounted() {
    let roles = localStorage.getItem("roles");
    if (roles != null) {
      roles = roles.split(',')
      this.isModerator = roles.indexOf('moderator') >= 0 ? true : false;
    }
  },
  beforeDestroy() {
    this.is_interval = false;
  },
  computed: {
    option_chart_contribution() {
      if (this.data_cli.length > 0) {
        let temp_data_cli = JSON.parse(JSON.stringify(this.data_cli));
        let temp_data_cld = JSON.parse(JSON.stringify(this.data_cld));
        temp_data_cli.sort(function (a, b) {
          return parseFloat(a.rank) - parseFloat(b.rank);
        });
        temp_data_cld.sort(function (a, b) {
          return parseFloat(b.rank) - parseFloat(a.rank);
        });
        let list_mack = [];
        let data_cli_bar = [];
        let data_cld_bar = [];
        for (const item of temp_data_cli) {
          list_mack.push(item.stockcode);
          data_cli_bar.push({
            value: parseFloat(item.change),
            itemStyle: {
              color: "#009D5B",
            },
          });
          data_cld_bar.push("-");
        }
        for (const item of temp_data_cld) {
          list_mack.push(item.stockcode);
          data_cld_bar.push({
            value: parseFloat(item.change),
            itemStyle: {
              color: "#e63946",
            },
          });
          data_cli_bar.push("-");
        }
        return {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
            formatter: (params) => {
              let item = null;
              if (params[0].data == "-") {
                item =
                  temp_data_cld[params[1].dataIndex - temp_data_cli.length];
              } else {
                item = temp_data_cli[params[1].dataIndex];
              }
              const price_item = this.$store.state.data_eod.hasOwnProperty(
                item.stockcode
              )
                ? this.$store.state.data_eod[item.stockcode].lastprice / 1000
                : 0;
              const change_item = this.$store.state.data_eod.hasOwnProperty(
                item.stockcode
              )
                ? this.$store.state.data_eod[item.stockcode].change
                : 0;
              const perchange_item = this.$store.state.data_eod.hasOwnProperty(
                item.stockcode
              )
                ? this.$store.state.data_eod[item.stockcode].perchange
                : 0;
              return [
                '<div class="tooltip-title">' + item.stockcode + "</div>",
                this.$store.state.list_mack_company.hasOwnProperty(
                  item.stockcode
                )
                  ? this.$store.state.list_mack_company[item.stockcode]
                      .ten_cong_ty
                  : "",
                "<br>",
                "Đóng góp: &nbsp;" +
                  parseFloat(item.change).toLocaleString("en", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }) +
                  " ~ " +
                  parseFloat(item.perchange).toLocaleString("en", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }) +
                  "%<br>",
                "Giá: &nbsp;" +
                  parseFloat(price_item).toLocaleString("en", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }) +
                  " (" +
                  parseFloat(change_item).toLocaleString("en", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }) +
                  " ~ " +
                  parseFloat(perchange_item).toLocaleString("en", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }) +
                  "%)<br>",
                "Khối lượng: &nbsp;" +
                  (parseFloat(item.totalvol) / 1000).toLocaleString("en", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }) +
                  " nghìn<br>",
                "Giá trị: &nbsp;" +
                  (parseFloat(item.totalval) / 1000000000).toLocaleString(
                    "en",
                    {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    }
                  ) +
                  " tỷ <br>",
              ].join("");
            },
          },
          grid: {
            left: "3%",
            right: "0%",
            top: "10%",
            bottom: "0%",
            containLabel: true,
          },
          xAxis: {
            type: "category",
            show: false,
            data: list_mack,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "cli",
              type: "bar",
              stack: "Total",
              label: {
                formatter: (params) => {
                  return params.name;
                },
                show: true,
                position: "bottom",
              },
              data: data_cli_bar,
            },
            {
              name: "cld",
              type: "bar",
              stack: "Total",
              label: {
                show: true,
                formatter: (params) => {
                  return params.name;
                },
                position: "top",
              },
              data: data_cld_bar,
            },
          ],
        };
      }
      return {
        grid: {
          left: "3%",
          right: "0%",
          top: "10%",
          bottom: "0%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          show: false,
          data: [],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "cli",
            type: "bar",
            stack: "Total",
            label: {
              formatter: (params) => {
                return params.name;
              },
              show: true,
              position: "bottom",
            },
            data: [],
          },
          {
            name: "cld",
            type: "bar",
            stack: "Total",
            label: {
              show: true,
              formatter: (params) => {
                return params.name;
              },
              position: "top",
            },
            data: [],
          },
        ],
      };
    },
    option_chart_liquid() {
      if (
        this.data_liquid_yesterday.tradingdate.length > 0 &&
        this.data_liquid_today.tradingdate.length > 0 &&
        this.price_eod_yesterday > 0
      ) {
        let data_map_liquid_yesterday = {};
        let data_map_liquid_today = {};
        let list_tradingdate_yesterday_by_minutes = [];
        let list_tradingdate_today_by_minutes = [];
        let data_line_yesterday = [];
        let data_line_today = [];
        let data_price_today = [];
        let data_vol_today = [];
        for (
          let i = 0;
          i < this.data_liquid_yesterday.tradingdate.length;
          i++
        ) {
          let tradingdate = this.data_liquid_yesterday.tradingdate[i];
          tradingdate = tradingdate.substring(11, 17) + "00";
          list_tradingdate_yesterday_by_minutes.push(tradingdate);
          data_map_liquid_yesterday[tradingdate] = {
            tradingdate: tradingdate,
            price: this.data_liquid_yesterday.price[i],
            totalval: this.data_liquid_yesterday.totalval[i],
            totalvol: this.data_liquid_yesterday.totalvol[i],
          };
          // data_line_yesterday.push([
          //   tradingdate,
          //   this.data_liquid_yesterday.totalval[i],
          // ]);
        }
        for (let i = 0; i < this.data_liquid_today.tradingdate.length; i++) {
          let tradingdate = this.data_liquid_today.tradingdate[i];
          tradingdate = tradingdate.substring(11, 17) + "00";
          list_tradingdate_today_by_minutes.push(tradingdate);
          data_map_liquid_today[tradingdate] = {
            tradingdate: tradingdate,
            price: this.data_liquid_today.price[i],
            totalval: this.data_liquid_today.totalval[i],
            totalvol: this.data_liquid_today.totalvol[i],
          };
          // data_line_today.push([
          //   tradingdate,
          //   this.data_liquid_today.totalval[i],
          // ]);
        }
        // list_tradingdate_yesterday_by_minutes.sort(function (a, b) {
        //   return Date.parse(a) - Date.parse(b);
        // });
        // for (const tradingdate of list_tradingdate_yesterday_by_minutes) {
        //   if (data_map_liquid_yesterday.hasOwnProperty(tradingdate)) {
        //     data_line_yesterday.push([
        //       tradingdate,
        //       data_map_liquid_yesterday[tradingdate].totalval,
        //     ]);
        //   }
        // }

        // list_tradingdate_today_by_minutes.sort(function (a, b) {
        //   return Date.parse(a) - Date.parse(b);
        // });
        // for (const tradingdate of list_tradingdate_today_by_minutes) {
        //   if (data_map_liquid_today.hasOwnProperty(tradingdate)) {
        //     data_line_today.push([
        //       tradingdate,
        //       data_map_liquid_today[tradingdate].totalval,
        //     ]);
        //   }
        // }

        let arr_tradingdate = [
          ...list_tradingdate_yesterday_by_minutes,
          ...list_tradingdate_today_by_minutes,
        ];
        arr_tradingdate = [...new Set(arr_tradingdate)];
        arr_tradingdate = Object.values(arr_tradingdate);
        arr_tradingdate.sort(function (a, b) {
          return Date.parse("2020-01-01 "+a) - Date.parse("2020-01-01 "+b);
        });
        for (const tradingdate of arr_tradingdate) {
          if (data_map_liquid_today.hasOwnProperty(tradingdate)) {
            data_price_today.push([
              tradingdate,
              data_map_liquid_today[tradingdate].price,
            ]);
            data_line_today.push([
              tradingdate,
              data_map_liquid_today[tradingdate].totalval,
            ]);
          }
          if (data_map_liquid_yesterday.hasOwnProperty(tradingdate)) {
            data_line_yesterday.push([
              tradingdate,
              data_map_liquid_yesterday[tradingdate].totalval,
            ]);
          }
        }
        return {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
            },
            formatter: (params) => {
              let text = `Thời gian: ${params[0].axisValueLabel} <br/>`;
              for (const item of params) {
                if (item.seriesName == "Tổng GTGD hôm qua") {
                  text +=
                    item.seriesName +
                    ": " +
                    this.formatMoney(item.value[1] / 1000000000, 0, 1) +
                    " tỷ<br/>";
                } else if (item.seriesName == "Tổng GTGD hôm nay") {
                  if (!text.includes("Tổng GTGD hôm nay")) {
                    text +=
                      item.seriesName +
                      ": " +
                      this.formatMoney(item.value[1] / 1000000000, 0, 1) +
                      " tỷ<br/>";
                  }
                } else if (item.seriesName == "Giá") {
                  text +=
                    item.seriesName +
                    ": " +
                    this.formatMoney(item.value[1], 0, 2) +
                    "<br/>" +
                    "Giá tham chiếu: " +
                    this.formatMoney(this.price_eod_yesterday, 0, 2) +
                    "<br/>";
                }
              }
              return text;
            },
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            textStyle: {
              color: "#000",
            },
          },
          axisPointer: {
            link: [
              {
                xAxisIndex: "all",
              },
            ],
            label: {
              backgroundColor: "#777",
            },
          },
          grid: [
            {
              left: "10%",
              right: "2%",
              height: 200,
              bottom: 30,
            },
            {
              left: "10%",
              right: "2%",
              height: 200,
              bottom: 230,
            },
          ],
          xAxis: [
            {
              data: arr_tradingdate,
              axisLabel: {
                formatter: (params) => {
                  return params;
                },
              },
              axisPointer: {
                label: {
                  show: true,
                  backgroundColor: "#7581BD",
                  formatter: (params) => {
                    return params.value;
                  },
                },
              },
              splitLine: {
                show: false,
              },
            },
            {
              data: arr_tradingdate,
              gridIndex: 1,
              axisPointer: {
                label: {
                  show: true,
                  backgroundColor: "#7581BD",
                  formatter: (params) => {
                    return params.value;
                  },
                },
              },
              axisLine: { show: true },
              axisTick: { show: false },
              splitLine: { show: false },
              axisLabel: { show: false },
            },
          ],
          yAxis: [
            {
              scale: true,
              splitNumber: 2,
              axisTick: { show: false },
              splitLine: { show: false },
              axisLabel: {
                formatter: (params) => {
                  return this.formatMoney(params / 1000000000, 0, 1);
                },
              },
              axisPointer: {
                label: {
                  show: true,
                  backgroundColor: "#7581BD",
                  formatter: (params) => {
                    return this.formatMoney(params.value / 1000000000, 0, 1);
                  },
                },
              },
            },
            {
              scale: true,
              gridIndex: 1,
              splitNumber: 2,
              axisLabel: { show: false },
              axisLine: { show: false },
              axisTick: { show: false },
              splitLine: { show: false },
            },
          ],
          series: [
            {
              name: "Tổng GTGD hôm qua",
              type: "line",
              itemStyle: {
                color: "#F8BC06",
              },
              areaStyle: {
                color: "#F8BC06",
              },
              emphasis: {
                itemStyle: {
                  color: "#F8BC06",
                },
                areaStyle: {
                  color: "#F8BC06",
                },
              },
              silent: true,
              yAxisIndex: 0,
              xAxisIndex: 0,
              data: data_line_yesterday,
              z: 5,
            },
            {
              name: "Tổng GTGD hôm nay",
              type: "line",
              emphasis: {
                itemStyle: {
                  color: "#00BB00",
                },
                areaStyle: {
                  color: "#00BB00",
                },
              },
              silent: true,
              itemStyle: {
                color: "#00BB00",
              },
              areaStyle: {
                color: "#00BB00",
              },
              yAxisIndex: 0,
              xAxisIndex: 0,
              data: data_line_today,
              z: 10,
            },
            {
              name: "Giá",
              type: "line",
              silent: true,
              itemStyle: {
                color: "#00BB00",
              },
              areaStyle: {
                color: "#00BB00",
              },
              emphasis: {
                itemStyle: {
                  color: "#00BB00",
                },
                areaStyle: {
                  color: "#00BB00",
                },
              },
              markLine: {
                silent: true,
                data: [
                  {
                    yAxis: this.price_eod_yesterday,
                    lineStyle: { color: "#ccaa00", type: "solid", width: 2 },
                    label: {
                      normal: {
                        show: true,
                        position: "insideMiddleTop",
                        formatter: "",
                      },
                    },
                  },
                ],
              },
              yAxisIndex: 1,
              xAxisIndex: 1,
              data: data_price_today,
            },
          ],
        };
      }
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
          formatter: (params) => {
            let text = `Thời gian: ${params[0].axisValueLabel} <br/>`;
            for (const item of params) {
              if (item.seriesName == "Tổng GTGD hôm qua") {
                text +=
                  item.seriesName +
                  ": " +
                  this.formatMoney(item.value[1] / 1000000000, 0, 1) +
                  " tỷ<br/>";
              } else if (item.seriesName == "Tổng GTGD hôm nay") {
                if (!text.includes("Tổng GTGD hôm nay")) {
                  text +=
                    item.seriesName +
                    ": " +
                    this.formatMoney(item.value[1] / 1000000000, 0, 1) +
                    " tỷ<br/>";
                }
              } else if (item.seriesName == "Giá") {
                text +=
                  item.seriesName +
                  ": " +
                  this.formatMoney(item.value[1], 0, 2) +
                  "<br/>" +
                  "Giá tham chiếu: " +
                  this.formatMoney(this.price_eod_yesterday, 0, 2) +
                  "<br/>";
              }
            }
            return text;
          },
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          textStyle: {
            color: "#000",
          },
        },
        axisPointer: {
          link: [
            {
              xAxisIndex: "all",
            },
          ],
          label: {
            backgroundColor: "#777",
          },
        },
        grid: [
          {
            left: "10%",
            right: "2%",
            height: 200,
            bottom: 30,
          },
          {
            left: "10%",
            right: "2%",
            height: 200,
            bottom: 230,
          },
        ],
        xAxis: [
          {
            data: [],
            axisLabel: {
              formatter: (params) => {
                return params;
              },
            },
            axisPointer: {
              label: {
                show: true,
                backgroundColor: "#7581BD",
                formatter: (params) => {
                  return params.value;
                },
              },
            },
            splitLine: {
              show: false,
            },
          },
          {
            data: [],
            gridIndex: 1,
            axisPointer: {
              label: {
                show: true,
                backgroundColor: "#7581BD",
                formatter: (params) => {
                  return params.value;
                },
              },
            },
            axisLine: { show: true },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { show: false },
          },
        ],
        yAxis: [
          {
            scale: true,
            splitNumber: 2,
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: {
              formatter: (params) => {
                return this.formatMoney(params / 1000000000, 0, 1);
              },
            },
            axisPointer: {
              label: {
                show: true,
                backgroundColor: "#7581BD",
                formatter: (params) => {
                  return this.formatMoney(params.value / 1000000000, 0, 1);
                },
              },
            },
          },
          {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
          },
        ],
        series: [
          {
            name: "Tổng GTGD hôm qua",
            type: "line",
            itemStyle: {
              color: "#F8BC06",
            },
            areaStyle: {
              color: "#F8BC06",
            },
            emphasis: {
              itemStyle: {
                color: "#F8BC06",
              },
              areaStyle: {
                color: "#F8BC06",
              },
            },
            silent: true,
            yAxisIndex: 0,
            xAxisIndex: 0,
            data: [],
            z: 5,
          },
          {
            name: "Tổng GTGD hôm nay",
            type: "line",
            emphasis: {
              itemStyle: {
                color: "#00BB00",
              },
              areaStyle: {
                color: "#00BB00",
              },
            },
            silent: true,
            itemStyle: {
              color: "#00BB00",
            },
            areaStyle: {
              color: "#00BB00",
            },
            yAxisIndex: 0,
            xAxisIndex: 0,
            data: [],
            z: 10,
          },
          {
            name: "Giá",
            type: "line",
            silent: true,
            itemStyle: {
              color: "#00BB00",
            },
            areaStyle: {
              color: "#00BB00",
            },
            emphasis: {
              itemStyle: {
                color: "#00BB00",
              },
              areaStyle: {
                color: "#00BB00",
              },
            },
            yAxisIndex: 1,
            xAxisIndex: 1,
            data: [],
          },
        ],
      };
    },
    option_chart_market_pulse() {
      if (this.data_market_pulse.name.length > 0 && this.data_market_pulse_market_cap.name.length > 0) {
        let data_bar = [];
        let data_bar2 = [];
        let data_yasis_label = [];
        let data_array_to_object = [];
        let data_market_pulse_temp = {};
        let data_market_pulse_marketcap_temp = {};
        for (let i = 0; i < this.data_market_pulse.name.length; i++) {
          const name = this.changeTextSpecial(this.data_market_pulse.name[i]);
          data_market_pulse_temp[name] = {
            name: this.data_market_pulse.name[i],
            percent: this.data_market_pulse.percent[i],
            totalval: this.data_market_pulse.totalval[i],
            totalvalbefore: this.data_market_pulse.totalvalbefore[i],
          }
        }
        for (let i = 0; i < this.data_market_pulse_market_cap.name.length; i++) {
          const name = this.changeTextSpecial(this.data_market_pulse_market_cap.name[i]);
          data_market_pulse_marketcap_temp[name] = {
            name: this.data_market_pulse_market_cap.name[i],
            percent: this.data_market_pulse_market_cap.percent[i],
            totalval: this.data_market_pulse_market_cap.totalval[i],
            totalvalbefore: this.data_market_pulse_market_cap.totalvalbefore[i],
          }
        }
        for (const key of Object.keys(data_market_pulse_temp)) {
          data_array_to_object.push({
            name: data_market_pulse_temp.hasOwnProperty(key) ? data_market_pulse_temp[key].name : "",
            percent: data_market_pulse_temp.hasOwnProperty(key) ? data_market_pulse_temp[key].percent : 0,
            percent2: data_market_pulse_marketcap_temp.hasOwnProperty(key) ? data_market_pulse_marketcap_temp[key].percent : 0,
            totalval: data_market_pulse_temp.hasOwnProperty(key) ? data_market_pulse_temp[key].totalval : 0,
            totalval2: data_market_pulse_marketcap_temp.hasOwnProperty(key) ? data_market_pulse_marketcap_temp[key].totalval : 0,
            totalvalbefore: data_market_pulse_temp.hasOwnProperty(key) ? data_market_pulse_temp[key].totalvalbefore : 0,
            totalvalbefore2: data_market_pulse_marketcap_temp.hasOwnProperty(key) ? data_market_pulse_marketcap_temp[key].totalvalbefore : 0,
          });
        }
        data_array_to_object.sort(function (a, b) {
          return parseFloat(a.totalval) - parseFloat(b.totalval);
        });
        for (const item of data_array_to_object) {
          data_yasis_label.push(item.name);
          data_bar.push({
            value: item.percent,
            itemStyle: {
              color: item.percent >= 0 ? "rgb(46, 184, 92)" : "rgb(229, 83, 83)",
              decal: {
                symbol: ["rect"],
                symbolSize: 5,
                rotation: 15,
                color: "rgba(0, 0, 0, 0.1)"
              }
            },
            label: {
              position: "right",
            },
          });
          data_bar2.push({
            value: item.percent2 * 10,
            itemStyle: {
              color: item.percent2 >= 0 ? "rgb(46, 184, 92)" : "rgb(229, 83, 83)",
              decal: {
                symbol: "none",
              }
            },
            label: {
              position: "right",
            },
          });
        }
        return {
          aria: {
            enabled: true,
            decal: {
              show: true,
              decals: {
                symbolSize: 5,
              }
            }
          },
          tooltip: {
            backgroundColor: this.$store.state.darkMode ? "#451352" : "#8d58b4",
            className: "p-0",
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
            textStyle: {
              fontFamily: "Tahoma",
              color: this.$store.state.darkMode ? "#fff" : "#282933",
            },
            formatter: (params) => {
              let text = "<p class='text-center pl-2 pt-2 font-weight-bold' style='color: #fff'>" + params[0].axisValueLabel + "</p><br/>";
              text += "<hr style='margin-top: -25px;margin-bottom: 5px'/>";
              text += "<table><tbody><tr><td class='p-2' style='background-color: "+this.getBGColorFromChange(data_array_to_object[params[0].dataIndex].percent)+"!important; color: #fff'>"
              text += "<b>Nỗ lực:</b>" + "<br/>";
              text +=
                "Trước đó: " +
                this.formatMoney(
                  data_array_to_object[params[0].dataIndex].totalvalbefore,
                  0,
                  2
                ) +
                " tỷ<br/>";
              text +=
                "Hiện tại: " +
                this.formatMoney(
                  data_array_to_object[params[0].dataIndex].totalval,
                  0,
                  2
                ) +
                " tỷ<br/>";
              text +=
                "%Thay đổi: " +
                this.formatMoney(
                  data_array_to_object[params[0].dataIndex].percent,
                  0,
                  2
                ) +
                "%<br/>";
              text +=
                "Thay đổi ròng: " +
                this.formatMoney(
                  data_array_to_object[params[0].dataIndex].totalval -
                    data_array_to_object[params[0].dataIndex].totalvalbefore,
                  0,
                  2
                ) +
                " tỷ<br/>";
              text += "</td><td class='p-2 border-left' style='background-color: "+this.getBGColorFromChange(data_array_to_object[params[0].dataIndex].percent2)+" !important; color: #fff; vertical-align: baseline'>";
              text += "<b>Kết quả:</b>" + "<br/>";
              if(this.isModerator){
                text +=
                  "Trước đó: " +
                  this.formatMoney(
                    data_array_to_object[params[0].dataIndex].totalvalbefore2,
                    0,
                    2
                  ) +
                  " tỷ<br/>";
                text +=
                  "Hiện tại: " +
                  this.formatMoney(
                    data_array_to_object[params[0].dataIndex].totalval2,
                    0,
                    2
                  ) +
                  " tỷ<br/>";
              }
              text +=
                "%Thay đổi: " +
                this.formatMoney(
                  data_array_to_object[params[0].dataIndex].percent2,
                  0,
                  2
                ) +
                "%<br/>";
              if(this.isModerator){
                text +=
                  "Thay đổi ròng: " +
                  this.formatMoney(
                    data_array_to_object[params[0].dataIndex].totalval2 -
                      data_array_to_object[params[0].dataIndex].totalvalbefore2,
                    0,
                    2
                  ) +
                  " tỷ<br/>";
              }
              text += "</td>";
              text += "</tr></tbody></table>"
              return text;
            },
          },
          grid: {
            top: 10,
            bottom: 30,
            left: 200,
            right: 50,
          },
          xAxis: {
            type: "value",
            position: "top",
            splitLine: {
              lineStyle: {
                type: "dashed",
              },
            },
          },
          yAxis: {
            type: "category",
            axisLine: { show: false },
            axisLabel: { show: true, fontFamily: "Tahoma" },
            axisTick: { show: false },
            splitLine: { show: false },
            data: data_yasis_label,
            splitArea: {
              show: true,
              areaStyle: {
                color: [
                  this.$store.state.darkMode ? "rgba(210,219,238,0.2)" : "rgba(210,219,250,0.2)",
                  this.$store.state.darkMode ? "rgba(40, 41, 51, 0.2)" : "rgba(250, 250, 250, 0.2)"
                ]
              }
            }
          },
          series: [
            {
              name: "Cost",
              type: "bar",
              label: {
                show: true,
                formatter: "{c}%",
              },
              data: data_bar,
            },
            {
              name: "Cost2",
              type: "bar",
              label: {
                show: true,
                formatter: params => {
                  return this.formatMoney(params.value / 10, 0, 2) + "%";
                },
              },
              data: data_bar2,
            },
          ],
        };
      }
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          top: 80,
          bottom: 30,
        },
        xAxis: {
          type: "value",
          position: "top",
          splitLine: {
            lineStyle: {
              type: "dashed",
            },
          },
        },
        yAxis: {
          type: "category",
          axisLine: { show: false },
          axisLabel: { show: true },
          axisTick: { show: false },
          splitLine: { show: false },
          data: [],
        },
        series: [
          {
            name: "Cost",
            type: "bar",
            stack: "Total",
            label: {
              show: true,
              formatter: "{c}%",
            },
            data: [],
          },
        ],
      };
    },
    option_chart_market_pulse_no_market_cap() {
      if (this.data_market_pulse.name.length > 0) {
        let data_bar = [];
        let data_yasis_label = [];
        let data_array_to_object = [];
        for (let i = 0; i < this.data_market_pulse.name.length; i++) {
          data_array_to_object.push({
            name: this.data_market_pulse.name[i],
            percent: this.data_market_pulse.percent[i],
            totalval: this.data_market_pulse.totalval[i],
            totalvalbefore: this.data_market_pulse.totalvalbefore[i],
          });
        }
        data_array_to_object.sort(function (a, b) {
          return parseFloat(a.totalval) - parseFloat(b.totalval);
        });
        for (const item of data_array_to_object) {
          data_yasis_label.push(item.name);
          if (item.percent >= 0) {
            data_bar.push({
              value: item.percent,
              itemStyle: {
                color: "rgb(46, 184, 92)",
              },
              label: {
                position: "right",
              },
            });
          } else {
            data_bar.push({
              value: item.percent,
              itemStyle: {
                color: "rgb(229, 83, 83)",
              },
              label: {
                position: "right",
              },
            });
          }
        }
        return {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
            textStyle: {
              fontFamily: "Tahoma",
            },
            formatter: (params) => {
              let text = params[0].axisValueLabel + "<br/>";
              text +=
                "Trước đó: " +
                this.formatMoney(
                  data_array_to_object[params[0].dataIndex].totalvalbefore,
                  0,
                  2
                ) +
                " tỷ<br/>";
              text +=
                "Hiện tại: " +
                this.formatMoney(
                  data_array_to_object[params[0].dataIndex].totalval,
                  0,
                  2
                ) +
                " tỷ<br/>";
              text +=
                "Thay đổi: " +
                this.formatMoney(
                  data_array_to_object[params[0].dataIndex].percent,
                  0,
                  2
                ) +
                "%<br/>";
              text +=
                "Thay đổi ròng: " +
                this.formatMoney(
                  data_array_to_object[params[0].dataIndex].totalval -
                    data_array_to_object[params[0].dataIndex].totalvalbefore,
                  0,
                  2
                ) +
                " tỷ<br/>";
              return text;
            },
          },
          grid: {
            top: 10,
            bottom: 30,
            left: 200,
            right: 50,
          },
          xAxis: {
            type: "value",
            position: "top",
            splitLine: {
              lineStyle: {
                type: "dashed",
              },
            },
          },
          yAxis: {
            type: "category",
            axisLine: { show: false },
            axisLabel: { show: true, fontFamily: "Tahoma" },
            axisTick: { show: false },
            splitLine: { show: false },
            data: data_yasis_label,
          },
          series: [
            {
              name: "Cost",
              type: "bar",
              stack: "Total",
              label: {
                show: true,
                formatter: "{c}%",
              },
              data: data_bar,
            },
          ],
        };
      }
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          top: 80,
          bottom: 30,
        },
        xAxis: {
          type: "value",
          position: "top",
          splitLine: {
            lineStyle: {
              type: "dashed",
            },
          },
        },
        yAxis: {
          type: "category",
          axisLine: { show: false },
          axisLabel: { show: true },
          axisTick: { show: false },
          splitLine: { show: false },
          data: [],
        },
        series: [
          {
            name: "Cost",
            type: "bar",
            stack: "Total",
            label: {
              show: true,
              formatter: "{c}%",
            },
            data: [],
          },
        ],
      };
    },
    is_valid_interval() {
      const offset = 7;
      let date = new Date(new Date().getTime() + offset * 3600 * 1000);
      let hour = date.getUTCHours();
      let day = date.getDay();
      let minute = date.getUTCMinutes();
      if (day <= 5 && hour >= 8 && hour <= 15) {
        if (hour == 8 || hour == 11 || hour == 12 || hour == 15) {
          if (hour == 8) {
            if (minute >= 55) {
              if (this.is_interval) {
                return true;
              }
            }
          } else if (hour == 11) {
            if (minute <= 35) {
              if (this.is_interval) {
                return true;
              }
            }
          } else if (hour == 12) {
            if (minute >= 55) {
              if (this.is_interval) {
                return true;
              }
            }
          } else if (hour == 15) {
            if (minute <= 5) {
              if (this.is_interval) {
                return true;
              }
            }
          }
        } else {
          if (this.is_interval) {
            return true;
          }
        }
      }
      return false;
    },
  },
  watch: {
    data_filter_type: {
      handler() {
        if (this.data_filter_type_chart == 1) {
          this.getDataContribution();
        } else if (this.data_filter_type_chart == 2) {
          this.data_liquid_yesterday = {
            price: [],
            totalval: [],
            totalvol: [],
            tradingdate: [],
          };
          this.data_liquid_today = {
            price: [],
            totalval: [],
            totalvol: [],
            tradingdate: [],
          };
          this.price_eod_yesterday = 0;
          this.getDataLiquid();
        }
      },
    },
    data_filter_type_chart: {
      handler() {
        if (this.data_filter_type_chart == 1) {
          this.getDataContribution();
        } else if (this.data_filter_type_chart == 2) {
          this.getDataLiquid();
        }
      },
    },
    data_filter_count_week_before: {
      handler() {
        this.data_market_pulse = {
          name: [],
          percent: [],
          totalval: [],
          totalvalbefore: [],
        };
        this.data_market_pulse_market_cap = {
          name: [],
          percent: [],
          totalval: [],
          totalvalbefore: [],
        };
        this.getMarketPulse();
        this.getMarketPulseMarketCap();
      },
    },
    data_filter_type_chart_market_pulse: {
      handler() {
        this.data_market_pulse = {
          name: [],
          percent: [],
          totalval: [],
          totalvalbefore: [],
        };
        this.data_market_pulse_market_cap = {
          name: [],
          percent: [],
          totalval: [],
          totalvalbefore: [],
        };
        this.getMarketPulse();
        this.getMarketPulseMarketCap();
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
.c-dark-theme {
  .nav-pills {
    .nav-link {
      &.active {
        color: #fff !important;
      }
    }
  }
}
</style>
