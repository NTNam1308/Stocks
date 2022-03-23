<template>
  <div>
    <div class="pt-2 d-flex justify-content-between">
      <p class="h6 text-truncate pl-2">Chỉ số {{ mack }}</p>
      <transition :name="getAnimationChangeBlinkByValue(change)" mode="out-in">
        <p
          class="h6 pl-2"
          :key="price"
          :class="
            getClassColorByChange(
              parseFloat(price) - parseFloat(price_eod_yesterday)
            )
          "
        >
          {{ formatMoney(price, 2, 2) }}
        </p>
      </transition>
    </div>
    <div class="d-flex justify-content-between mb-2">
      <p class="h6 pl-2">
        {{ mack }}
      </p>
      <transition :name="getAnimationChangeBlinkByValue(change)" mode="out-in">
        <p
          class="h6"
          v-html="getSpanColorByPerchange(change, perchange)"
          :key="change"
        ></p>
      </transition>
    </div>
    <p class="font-weight-bold mt-2 text-center">Biểu đồ</p>
    <CustomEChart :option="option_chart_price_vol" style="height: 140px">
    </CustomEChart>
    <p class="font-weight-bold mt-2 text-center">Tổng quan</p>
    <div class="position-relative table-responsive">
      <table class="table table-hover">
        <tbody class="position-relative">
          <tr>
            <td class="pt-1 pb-1 pl-2 text-left">Tham chiếu</td>
            <td
              class="pt-1 pb-1 pr-2 text-right font-weight-bold text-nochange"
            >
              {{ formatMoney(price_eod_yesterday, 2, 2) }}
            </td>
          </tr>
          <tr>
            <td class="pt-1 pb-1 pl-2 text-left">Mở cửa</td>
            <td
              class="pt-1 pb-1 pr-2 text-right font-weight-bold"
              :class="
                getClassColorByChange(
                  parseFloat(open_price) - parseFloat(price_eod_yesterday)
                )
              "
            >
              {{ formatMoney(open_price, 2, 2) }}
            </td>
          </tr>
          <tr>
            <td class="pt-1 pb-1 pl-2 text-left">Thấp cao</td>
            <td class="pt-1 pb-1 pr-2 text-right font-weight-bold">
              <span
                :class="
                  getClassColorByChange(
                    parseFloat(lowest_price) - parseFloat(price_eod_yesterday)
                  )
                "
              >
                {{ formatMoney(lowest_price, 2, 2) }}
              </span>
              -
              <span
                :class="
                  getClassColorByChange(
                    parseFloat(highest_price) - parseFloat(price_eod_yesterday)
                  )
                "
              >
                {{ formatMoney(highest_price, 2, 2) }}
              </span>
            </td>
          </tr>
          <tr>
            <td class="pt-1 pb-1 pl-2 text-left">Khối lượng</td>
            <td class="pt-1 pb-1 pr-2 text-right font-weight-bold">
              <transition name="nochange" mode="out-in">
                <span :key="totalvol">
                  {{ formatMoney(totalvol, 0, 0) }}
                </span>
              </transition>
            </td>
          </tr>
          <tr>
            <td class="pt-1 pb-1 pl-2 text-left">Giá trị</td>
            <td class="pt-1 pb-1 pr-2 text-right font-weight-bold">
              <transition name="nochange" mode="out-in">
                <span :key="totalval">
                  {{ formatMoney(totalval / 1000, 2, 2) }} tỷ
                </span>
              </transition>
            </td>
          </tr>
        </tbody>
      </table>
      <!---->
    </div>
    <CustomEChart
      :option="option_value_change_bar_chart"
      style="height: 180px"
    />
  </div>
</template>

<script>
import CustomEChart from "@/views/charts/CustomEchart";

export default {
  name: "OrderBoardIndex",
  components: {
    CustomEChart,
  },
  data() {
    return {
      is_interval: true,
      activeTab: 0,
      price: 0,
      change: 0,
      perchange: 0,
      price_eod_yesterday: 0,
      data_intraday: {},
      declines: 0,
      nochange: 0,
      advances: 0,
      totalvol: 0,
      totalval: 0,
      highest_price: 0,
      lowest_price: 0,
      open_price: 0,
    };
  },
  props: {
    mack: {
      type: String,
    },
  },
  created() {
    this.getDataInit();
    window.socket_send.on("updateliveindex", (res) => {
      if (!res) return;
      if (res.stockcode == this.mack) {
        this.price = parseFloat(res.price);
        this.change =
          this.price - this.price_eod_yesterday >= 0
            ? parseFloat(res.change)
            : parseFloat(-res.change);
        this.perchange =
          this.price - this.price_eod_yesterday >= 0
            ? parseFloat(res.perchange)
            : parseFloat(-res.perchange);
        this.declines = parseFloat(res.declines);
        this.nochange = parseFloat(res.nochange);
        this.advances = parseFloat(res.advances);
        this.totalvol = parseFloat(res.totalvol);
        this.totalval = parseFloat(res.totalval);
      }
    });
    // setInterval(() => {
    //   if (this.is_valid_interval) {
    //     this.getDataInterval();
    //   }
    // }, 5000);
  },
  methods: {
    getDataInit() {
      if (this.mack == "") return;
      window.socket_send.emit("join", [this.mack]);
      window.socket_send.emit("getliveohlc",this.mack, (res) => {
        if(!res) return;
        if(Object.keys(res).length == 0) return;
        if(res.stockcode.length > 0){
          if(res.stockcode[0] == this.mack){
            this.open_price = parseFloat(res.o[0]);
            this.highest_price = parseFloat(res.h[0]);
            this.lowest_price = parseFloat(res.l[0]);
          }
        }
      });
      window.socket_send.emit("getliveindex", [this.mack], (res) => {
        if (!res) return;
        const rs = res;
        if (rs.stockcode.length > 0) {
          if (rs.stockcode[0]) {
            this.price = parseFloat(rs["lastprice"][0]);
            this.change = parseFloat(rs["change"][0]);
            this.perchange = parseFloat(rs["perchange"][0]);
            this.declines = parseFloat(rs["declines"][0]);
            this.nochange = parseFloat(rs["nochange"][0]);
            this.advances = parseFloat(rs["advances"][0]);
            this.totalvol = parseFloat(rs["totalvol"][0]);
            this.totalval = parseFloat(rs["totalvalue"][0]);
          }
        }
      });
      window.socket_send.emit("getintradayohlc", this.mack, 1, (res) => {
        let time = null;
        if (res) {
          if (res.t.length > 0) {
            const date = new Date((res.t[0] + 7 * 3600) * 1000); //GMT + 7
            time = date.toISOString().slice(0, 19).replace("T", " ");
            time = time.slice(0, 10);
          } else {
            time = new Date(new Date().getTime()).toISOString().substr(0, 10);
          }
        } else {
          time = new Date(new Date().getTime()).toISOString().substr(0, 10);
        }
        window.socket_send.emit("getlasteod", [this.mack], time, (res1) => {
          if (!res1) return;
          if (res1.stockcode.length > 0) {
            if (res1.stockcode[0] == this.mack) {
              this.price_eod_yesterday = parseFloat(res1.eod[0]);
            }
          }
        });
        if (res) {
          if (res.stockcode == this.mack) {
            this.data_intraday = res;
            // this.highest_price = Math.max(...res.h);
            // this.lowest_price = Math.min(...res.l);
          }
        }
      });
    },
    // getDataInterval() {
    //   if (this.mack == "") return;
    //   window.socket_send.emit("getliveindex", [this.mack], (res) => {
    //     if (!res) return;
    //     const rs = res;
    //     if (rs.stockcode.length > 0) {
    //       if (rs.stockcode[0]) {
    //         this.price = parseFloat(rs["lastprice"][0]);
    //         this.change = parseFloat(rs["change"][0]);
    //         this.perchange = parseFloat(rs["perchange"][0]);
    //         this.declines = parseFloat(rs["declines"][0]);
    //         this.nochange = parseFloat(rs["nochange"][0]);
    //         this.advances = parseFloat(rs["advances"][0]);
    //         this.totalvol = parseFloat(rs["totalvol"][0]);
    //         this.totalval = parseFloat(rs["totalvol"][0]) * parseFloat(rs["lastprice"][0]) / 1000;
    //       }
    //     }
    //   });
    //   window.socket_send.emit("getintradayohlc", this.mack, 1, (res) => {
    //     if (res) {
    //       this.data_intraday = res;
    //       this.highest_price = Math.max(...res.h);
    //       this.lowest_price = Math.min(...res.l);
    //     }
    //   });
    // },
    formatMoney(number, min, max) {
      number = parseFloat(number);
      return number.toLocaleString("en", {
        minimumFractionDigits: min,
        maximumFractionDigits: max,
      });
    },
    getAnimationChangeBlinkByValue(change) {
      change = parseFloat(change);
      if (change > 0) {
        return "upchange";
      } else if (change == 0) {
        return "nochange";
      } else {
        return "downchange";
      }
    },
    getClassColorByChange(change) {
      change = parseFloat(change);
      if (change > 0) {
        return "text-upchange";
      } else if (change == 0) {
        return "text-nochange";
      } else {
        return "text-downchange";
      }
    },
    getSpanColorByPerchange(change, perchange) {
      change = parseFloat(change);
      perchange = parseFloat(perchange);
      if (perchange > 0) {
        return `<span class="text-upchange">+${change} (+${perchange}%)</span>
        `;
      } else if (perchange == 0) {
        return `<span class="text-nochange">+${change} (+${perchange}%)</span>
        `;
      } else {
        return `<span class="text-downchange">${change} (${perchange}%)</span>`;
      }
    },
  },
  computed: {
    option_chart_price_vol() {
      if (
        Object.keys(this.data_intraday).length > 0 &&
        this.price_eod_yesterday > 0
      ) {
        let line_data = [];
        let bar_data = [];
        if (parseFloat(this.price_eod_yesterday) > 1) {
          const date1 = new Date(
            (this.data_intraday.t[0] - 60 + 7 * 3600) * 1000
          ); //GMT + 7
          const date_string1 = date1
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
          line_data.push([date_string1, parseFloat(this.price_eod_yesterday)]);
          bar_data.push([date_string1, 0]);
        }
        for (let index = 0; index < this.data_intraday.o.length; index++) {
          const date = new Date(
            (this.data_intraday.t[index] + 7 * 3600) * 1000
          ); //GMT + 7
          const date_string = date.toISOString().slice(0, 19).replace("T", " ");
          line_data.push([
            date_string,
            parseFloat(this.data_intraday.o[index]),
          ]);
          bar_data.push([date_string, parseFloat(this.data_intraday.v[index])]);
        }
        return {
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
                if (
                  minutes == 0 ||
                  minutes == 15 ||
                  minutes == 30 ||
                  minutes == 45
                )
                  return minutes != 0
                    ? hours + ":" + minutes
                    : hours + ":0" + minutes;
                return "";
              },
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
    option_value_change_bar_chart() {
      return {
        title: {
          text: "Số lượng cổ phiếu tăng, giảm, không đổi",
          left: "center",
          align: "auto",
          textStyle: {
            fontFamily: "Tahoma",
            fontSize: "12px",
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
          top: "10%",
          left: "3%",
          right: "20%",
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
          data: ["Giảm", "Không đổi", "Tăng"],
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
                value: this.declines,
                itemStyle: { color: "#990000" },
              },
              {
                value: this.nochange,
                itemStyle: { color: "#ccaa00" },
              },
              {
                value: this.advances,
                itemStyle: { color: "#009900" },
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
            barMaxWidth: 20,
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
    // open_price() {
    //   let return_data = 0;
    //   if (Object.keys(this.data_intraday).length > 0) {
    //     if (this.data_intraday.o.length > 0) {
    //       if (this.mack != "VNINDEX") {
    //         return_data = parseFloat(this.data_intraday.o[0]);
    //       } else {
    //         for (let i = 0; i < this.data_intraday.t.length; i++) {
    //           const date = new Date(
    //             (this.data_intraday.t[i] + 7 * 3600) * 1000
    //           ); //GMT + 7
    //           const hour = date.getUTCHours();
    //           const minute = date.getUTCMinutes();
    //           if (hour == 9 && minute == 15) {
    //             return_data = parseFloat(this.data_intraday.o[i]);
    //             break;
    //           }
    //         }
    //       }
    //     }
    //   }
    //   return return_data;
    // },
  },
  watch: {
    mack: {
      handler(newVal, oldVal) {
        this.price_eod_yesterday = 0;
        this.price = 0;
        this.change = 0;
        this.perchange = 0;
        this.declines = 0;
        this.nochange = 0;
        this.advances = 0;
        this.totalvol = 0;
        this.totalval = 0;
        this.open_price = 0;
        this.highest_price = 0;
        this.lowest_price = 0;
        this.is_no_data = false;
        this.data_intraday = {};
        // window.socket_send.emit("leave", [oldVal]);
        this.getDataInit();
      },
    },
  },
  beforeDestroy() {
    this.is_interval = false;
    // window.socket_send.emit("leave", [this.mack]);
  },
};
</script>
<style lang="scss">
.table-orderboard {
  height: calc(100vh - 455px);
  max-height: calc(100vh - 455px);
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
    cursor: pointer;
  }

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: #f5f5f5;
    cursor: pointer;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
    cursor: pointer;
  }
  table {
    thead {
      position: sticky;
      position: -webkit-sticky;
      top: -1px;
      z-index: 2;
      tr {
        background-color: #fff;
        th {
          background-color: #fff;
        }
      }
    }
  }
}
.result {
  margin-bottom: 1em;
}
.c-dark-theme {
  table {
    tbody {
      tr {
        &:hover {
          td {
            &:first-child {
              background-color: #8c58b3 !important;
            }
            background-color: #8c58b3 !important;
            a {
              color: #fff;
            }
          }
        }
      }
    }
  }
  .list-infinite {
    .loader:after {
      background-color: #282933;
    }
    .list-item-infinite {
      border-bottom: 1px solid rgba(255, 255, 255, 0.075);
      &:hover {
        background-color: #8c58b3 !important;
      }
    }
  }
  .row-column-step {
    &:hover {
      background-color: #8c58b3 !important;
    }
  }
}
.list-infinite {
  width: 100%;
  height: calc(100vh - 465px);
  border-radius: 3px;
  overflow-y: auto;
  cursor: pointer;
  position: relative;
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
    cursor: pointer;
  }

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: #f5f5f5;
    cursor: pointer;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
    cursor: pointer;
  }
  .list-item-infinite {
    display: flex;
    align-items: center;
    padding: 0.4em;
    border-bottom: 1px solid #d8dbe0;
    &:hover {
      background-color: rgba(0, 0, 21, 0.075);
    }
  }
  .loader-wrapper {
    padding: 1em;
  }
  .loader {
    font-size: 10px;
    margin: 0px auto;
    text-indent: -9999em;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #ffffff;
    background: linear-gradient(
      to right,
      #9b4dca 10%,
      rgba(255, 255, 255, 0) 42%
    );
    position: relative;
    animation: load3 1.4s infinite linear;
    transform: translateZ(0);
  }
  .loader:before {
    width: 50%;
    height: 50%;
    background: #9b4dca;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
  }
  .loader:after {
    background-color: #fff;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: "";
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  @-webkit-keyframes load3 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes load3 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
.row-column-step {
  display: flex;
  flex-direction: row;
  flex: 1 1 0%;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  cursor: pointer;
  .row-column-step-wrap {
    display: flex;
    flex-direction: row;
    flex: 1 1 0%;
    position: relative;
    .column-step-vol1 {
      display: flex;
      flex-direction: row;
      flex: 1 1 0%;
      position: relative;
      z-index: 10;
    }
    .column-step-vol2 {
      justify-content: flex-end;
      display: flex;
      flex-direction: row;
      position: relative;
      z-index: 10;
    }
    .column-step-price1 {
      justify-content: flex-end;
      padding-right: 4px;
      font-weight: bold;
      display: flex;
      flex-direction: row;
      position: relative;
      z-index: 10;
    }
    .column-step-price2 {
      padding-left: 4px;
      font-weight: bold;
      display: flex;
      flex-direction: row;
      flex: 1 1 0%;
      position: relative;
      z-index: 10;
    }
  }
  &:hover {
    background-color: rgba(0, 0, 21, 0.075);
  }
}
</style>
