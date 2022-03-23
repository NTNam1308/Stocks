<template>
  <CCard>
    <CCardHeader class="title-block">
      <div class="d-flex justify-content-between">
        <p class="font-weight-bold h5 pt-1 pl-2">Thống kê MA</p>
        <div class="d-flex justify-content-between">
         
        </div>
      </div>
    </CCardHeader>
    <CCardBody class="p-2 d-flex justify-content-center">
      <div style="width: 100%">
        <CustomEChart
          :option="option_chart_market_pulsema"
          style="height: 250px"
        />
      </div>
    </CCardBody>
  </CCard>
</template>
<script>
import CustomEChart from "@/views/charts/CustomEchart";

export default {
  name: "WidgetMA",
  props: {},
  components: {
    CustomEChart,
  },
  data() {
    return {
      data_market_pulse_ma: {
        name: [],
        above: [],
        under: [],
      },
    };
  },
  methods: {
    getMarketPulseMa() {
      window.socket_send.emit("getmarketpulsema", (res) => {
        this.data_market_pulse_ma.name = res.name;
        this.data_market_pulse_ma.above = res.above;
        this.data_market_pulse_ma.under = res.under;
      });
    },
  },
  created() {
   this.getMarketPulseMa();
  },
  beforeDestroy() {
  },
  computed: {
    option_chart_market_pulsema() {
      if (this.data_market_pulse_ma.name.length > 0) {
        const data_ma10 = [
          {
            name: "Số mã trên",
            value: this.data_market_pulse_ma.above[0],
            itemStyle: {
              color: "rgb(46, 184, 92)",
            },
          },
          {
            name: "Số mã dưới",
            value: this.data_market_pulse_ma.under[0],
            itemStyle: {
              color: "rgb(229, 83, 83)",
            },
          },
        ];
        const data_ma20 = [
          {
            name: "Số mã trên",
            value: this.data_market_pulse_ma.above[1],
            itemStyle: {
              color: "rgb(46, 184, 92)",
            },
          },
          {
            name: "Số mã dưới",
            value: this.data_market_pulse_ma.under[1],
            itemStyle: {
              color: "rgb(229, 83, 83)",
            },
          },
        ];
        const data_ma50 = [
          {
            name: "Số mã trên",
            value: this.data_market_pulse_ma.above[2],
            itemStyle: {
              color: "rgb(46, 184, 92)",
            },
          },
          {
            name: "Số mã dưới",
            value: this.data_market_pulse_ma.under[2],
            itemStyle: {
              color: "rgb(229, 83, 83)",
            },
          },
        ];
        return {
          title: [
            {
              text: "MA10",
              left: "16.67%",
              top: "80%",
              bottom: "10%",
              textAlign: "center",
              textStyle: {
                fontFamily: "Tahoma",
              },
            },
            {
              text: "MA20",
              left: "50%",
              top: "80%",
              bottom: "10%",
              textAlign: "center",
              textStyle: {
                fontFamily: "Tahoma",
              },
            },
            {
              text: "MA50",
              left: "83.33%",
              top: "80%",
              bottom: "10%",
              textAlign: "center",
              textStyle: {
                fontFamily: "Tahoma",
              },
            },
          ],
          tooltip: {},
          grid: {
            top: 0,
            bottom: "10%",
          },
          series: [
            {
              type: "pie",
              center: ["50%", "40%"],
              data: data_ma10,
              label: {
                position: "outside",
                formatter: "{b}",
              },
              labelLayout(params) {
                return {
                  x: params.rect.x + 40,
                  y:
                    params.dataIndex == 0
                      ? 20
                      : 190,
                  verticalAlign: "middle",
                  align: "left",
                  width: 100,
                };
              },
              radius: "50%",
              left: 0,
              right: "66.6667%",
              top: 0,
              bottom: 0,
              startAngle: 180,
            },
            {
              type: "pie",
              center: ["50%", "40%"],
              data: data_ma10,
              label: {
                position: "inside",
                formatter: "{c}",
                color: "#fff",
              },
              radius: "50%",
              left: 0,
              right: "66.6667%",
              top: 0,
              bottom: 0,
              startAngle: 180,
            },
            {
              type: "pie",
              center: ["50%", "40%"],
              data: data_ma20,
              label: {
                position: "outside",
                formatter: "{b}",
              },
              labelLayout(params) {
                return {
                  x: params.rect.x + 40,
                  y:
                    params.dataIndex == 0
                      ? 20
                      : 190,
                  verticalAlign: "middle",
                  align: "left",
                  width: 100,
                };
              },
              radius: "50%",
              left: "33.3333%",
              right: "33.3333%",
              top: 0,
              bottom: 0,
              startAngle: 180,
            },
            {
              type: "pie",
              center: ["50%", "40%"],
              data: data_ma20,
              label: {
                position: "inside",
                formatter: "{c}",
                color: "#fff",
              },
              radius: "50%",
              left: "33.3333%",
              right: "33.3333%",
              top: 0,
              bottom: 0,
              startAngle: 180,
            },
            {
              type: "pie",
              center: ["50%", "40%"],
              data: data_ma50,
              label: {
                position: "outside",
                formatter: "{b}",
              },
              labelLayout(params) {
                return {
                  x: params.rect.x + 40,
                  y:
                    params.dataIndex == 0
                      ? 20
                      : 190,
                  verticalAlign: "middle",
                  align: "left",
                  width: 100,
                };
              },
              radius: "50%",
              left: "66.6667%",
              right: 0,
              top: 0,
              bottom: 0,
              startAngle: 180,
            },
            {
              type: "pie",
              center: ["50%", "40%"],
              data: data_ma50,
              label: {
                position: "inside",
                formatter: "{c}",
                color: "#fff",
              },
              radius: "50%",
              left: "66.6667%",
              right: 0,
              top: 0,
              bottom: 0,
              startAngle: 180,
            },
          ],
        };
      }
      return {
        title: [
          {
            text: "MA10",
            left: "16.67%",
            top: "60%",
            bottom: "10%",
            textAlign: "center",
            textStyle: {
              fontFamily: "Tahoma",
            },
          },
          {
            text: "MA20",
            left: "50%",
            top: "60%",
            bottom: "10%",
            textAlign: "center",
            textStyle: {
              fontFamily: "Tahoma",
            },
          },
          {
            text: "MA50",
            left: "83.33%",
            top: "60%",
            bottom: "10%",
            textAlign: "center",
            textStyle: {
              fontFamily: "Tahoma",
            },
          },
        ],
        tooltip: {},
        grid: {
          top: 0,
          bottom: "10%",
        },
        series: [
          {
            type: "pie",
            radius: "25%",
            center: ["50%", "30%"],
            data: [],
            label: {
              position: "outer",
              alignTo: "none",
              bleedMargin: 5,
            },
            left: 0,
            right: "66.6667%",
            top: 0,
            bottom: 0,
            startAngle: 180,
          },
          {
            type: "pie",
            radius: "25%",
            center: ["50%", "30%"],
            data: [],
            label: {
              position: "outer",
              alignTo: "labelLine",
              bleedMargin: 5,
            },
            left: "33.3333%",
            right: "33.3333%",
            top: 0,
            bottom: 0,
            startAngle: 180,
          },
          {
            type: "pie",
            radius: "25%",
            center: ["50%", "30%"],
            data: [],
            label: {
              position: "outer",
              alignTo: "edge",
              margin: 20,
            },
            left: "66.6667%",
            right: 0,
            top: 0,
            bottom: 0,
            startAngle: 180,
          },
        ],
      };
    },
  },
  watch: {
  },
};
</script>
<style lang="scss">
</style>
