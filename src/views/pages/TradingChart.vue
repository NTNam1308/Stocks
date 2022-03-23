<template>
  <div>
    <div class="TVChartContainer" :id="containerId" />
    <CModal
      title="Lưu đồ thị"
      :show.sync="isShowEditModal"
      :centered="true"
      size="sm"
    >
      <template #footer>
        <CButton color="secondary" @click="isShowEditModal = false"
          >Đóng</CButton
        >
        <CButton color="primary" @click="saveAction"
          ><CIcon name="cilSave" /> Lưu
        </CButton>
      </template>
      <CRow>
        <CCol sm="12">
          <CInput type="text" label="Tên đồ thị" v-model="chartName" />
          <CAlert v-if="errorMessage != ''" color="danger">
            {{ errorMessage }}
          </CAlert>
        </CCol>
      </CRow>
    </CModal>
  </div>
</template>

<script>
import { widget } from "../../../public/js/charting_library";

export default {
  name: "Chart",
  props: {
    symbol: {
      default: "VNM",
      type: String,
    },
    interval: {
      default: "1D",
      type: String,
    },
    containerId: {
      default: "tv_chart_container",
      type: String,
    },
    datafeedUrl: {
      default: `${process.env.VUE_APP_URL_API_TRADING_CHART}:${process.env.VUE_APP_API_TRADING_CHART_PORT}`,
      type: String,
    },
    libraryPath: {
      default: "/js/charting_library/",
      type: String,
    },
    chartsStorageUrl: {
      default: `${process.env.VUE_APP_SAVE_LOAD_BACKEND_IP}:${process.env.VUE_APP_SAVE_LOAD_BACKEND_PORT}`,
      type: String,
    },
    chartsStorageApiVersion: {
      default: "1.1",
      type: String,
    },
    clientId: {
      default: "kungfustockspro.live",
      type: String,
    },
    userId: {
      default: "public_user_id",
      type: String,
    },
    fullscreen: {
      default: false,
      type: Boolean,
    },
    autosize: {
      default: true,
      type: Boolean,
    },
    studiesOverrides: {
      type: Object,
    },
    chartSaved: {
      type: Object,
    },
  },
  data() {
    return {
      chartName: "",
      isShowEditModal: false,
      errorMessage: "",
      is_interval: true,
      currentMackTA: "",
      is_loaded: false
    };
  },
  tvWidget: null,
  mounted() {
    this.currentMackTA = this.symbol ? this.symbol : this.$store.state.mack;
    const widgetOptions = {
      symbol: this.symbol ? this.symbol : this.$store.state.mack,
      // BEWARE: no trailing slash is expected in feed URL
      datafeed: new window.Datafeeds.UDFCompatibleDatafeed(this.datafeedUrl),
      interval: this.interval,
      container: this.containerId,
      library_path: this.libraryPath,
      auto_save_delay: 3,
      locale: "vi",
      disabled_features:
        this.containerId == "tv_chart_container_filter_modal" ||
        this.containerId == "tv_chart_container_tab"
          ? ["header_symbol_search"]
          : [],
      enabled_features: [
        "side_toolbar_in_fullscreen_mode",
        "items_favoriting",
        "header_in_fullscreen_mode",
      ],
      charts_storage_url: this.chartsStorageUrl,
      charts_storage_api_version: this.chartsStorageApiVersion,
      client_id: this.clientId,
      user_id: localStorage.getItem("user_id"),
      //timeframe: "3M",
      time_frames: [
        { text: "5y", resolution: "1W", description: "5 Năm", title: "5 Năm" },
        { text: "1y", resolution: "1W", description: "1 Năm", title: "1 Năm" },
        {
          text: "6m",
          resolution: "1D",
          description: "6 Tháng",
          title: "6 Tháng",
        },
        {
          text: "1m",
          resolution: "1D",
          description: "1 Tháng",
          title: "1 Tháng",
        },
        {
          text: "1w",
          resolution: "1D",
          description: "1 Tuần",
          title: "1 Tuần",
        },
        { text: "1d", resolution: "1", description: "1 Ngày", title: "1 Ngày" },
      ],
      fullscreen: this.fullscreen,
      autosize: this.autosize,
      studies_overrides: this.studiesOverrides,
      theme: this.$store.state.darkMode ? "Dark" : "Light",
      timezone: "Asia/Ho_Chi_Minh",
      debug: false,
      custom_indicators_getter: function(PineJS) {
        return Promise.resolve([
          {
            name: "TP",
            metainfo: {
                _metainfoVersion: 27,
                isTVScript: !1,
                isTVScriptStub: !1,
                is_hidden_study: !1,
                defaults: {
                    styles: {
                        plot_0: {
                            linestyle: 1,
                            linewidth: 1,
                            plottype: 5,
                            trackPrice: !1,
                            transparency: 10,
                            visible: !0,
                            color: "#59ac59"
                        },
                        plot_1: {
                            linestyle: 0,
                            linewidth: 2,
                            plottype: 2,
                            trackPrice: !1,
                            transparency: 10,
                            visible: !0,
                            color: "#ff5959"
                        },
                        plot_2: {
                            linestyle: 0,
                            linewidth: 2,
                            plottype: 2,
                            trackPrice: !1,
                            transparency: 10,
                            visible: !0,
                            color: "#ff5959"
                        },
                        plot_3: {
                            linestyle: 0,
                            linewidth: 3,
                            plottype: 2,
                            trackPrice: !1,
                            transparency: 10,
                            visible: !0,
                            color: "#ac59ac"
                        },
                        plot_4: {
                            linestyle: 0,
                            linewidth: 2,
                            plottype: 2,
                            trackPrice: !1,
                            transparency: 10,
                            visible: !0,
                            color: "#8484ff"
                        }
                    },
                    precision: 4,
                    palettes: {
                        palette_0: {
                            colors: {
                                0: {
                                    color: "#FF0000",
                                    width: 1,
                                    style: 0
                                },
                                1: {
                                    color: "#008000",
                                    width: 1,
                                    style: 0
                                }
                            }
                        }
                    },
                    inputs: {
                        in_0: 5,
                        in_1: 100,
                        in_2: 2,
                        in_3: 5,
                        in_4: 75,
                        in_5: 2
                    }
                },
                plots: [
                    {
                        id: "plot_0",
                        type: "line"
                    },
                    {
                        id: "plot_1",
                        type: "line"
                    },
                    {
                        id: "plot_2",
                        type: "line"
                    },
                    {
                        id: "plot_3",
                        type: "line"
                    },
                    {
                        id: "plot_4",
                        type: "line"
                    },
                    {
                        id: "plot_5",
                        palette: "palette_0",
                        target: "plot_0",
                        type: "colorer"
                    }
                ],
                styles: {
                    plot_0: {
                        title: "Price Ratio",
                        histogramBase: 0
                    },
                    plot_1: {
                        title: "High Band",
                        histogramBase: 0
                    },
                    plot_2: {
                        title: "Low Band",
                        histogramBase: 0
                    },
                    plot_3: {
                        title: "Volume Ratio",
                        histogramBase: 0
                    },
                    plot_4: {
                        title: "Buy/Sell Level",
                        histogramBase: 0
                    }
                },
                description: "TP",
                shortDescription: "TP",
                is_price_study: !1,
                palettes: {
                    palette_0: {
                        colors: {
                            0: {
                                name: "Color 0"
                            },
                            1: {
                                name: "Color 1"
                            }
                        }
                    }
                },
                inputs: [{
                    id: "in_0",
                    name: "Fast Length",
                    defval: 5,
                    type: "integer"
                }, {
                    id: "in_1",
                    name: "Slow Length",
                    defval: 100,
                    type: "integer"
                }, {
                    id: "in_2",
                    name: "Band",
                    defval: 2,
                    type: "integer"
                }, {
                    id: "in_3",
                    name: "Length",
                    defval: 5,
                    type: "float"
                }, {
                    id: "in_4",
                    name: "Ratio",
                    defval: 75,
                    type: "integer"
                }, {
                    id: "in_5",
                    name: "Period",
                    defval: 2,
                    type: "integer"
                }],
                id: "KungfuVRI@tv-basicstudies-1",
                scriptIdPart: "",
                name: "TP"
            },
            constructor: function() {
                this.main = function(e, t) {
                    this._context = e, this._input = t;
                    //Price Change
                    // fastLength = input(5, "Fast Length")
                    var fastLength = this._input(0);
                    // slowLength = input(100, "Slow Length")
                    var slowLength = this._input(1);
                    // band = input(2, "Band")
                    var band = this._input(2);
                    //Price Change
                    var fastLengthClose = this._context.new_var(PineJS.Std.close(this._context)).get(fastLength);
                    var oneClose = this._context.new_var(PineJS.Std.close(this._context)).get(1);
                    var series_close = this._context.new_var(PineJS.Std.close(this._context)).get();
                    var priceChange = PineJS.Std.abs(PineJS.Std.close(this._context) - fastLengthClose);
                    //Price Change Standard Deviation
                    // TODO: priceStd = stdev(close - close[1], slowLength)
                    // var priceStd = PineJS.Std.stdev(this._context.new_var(PineJS.Std.close(this._context)), slowLength, this._context);
                    var vpt_close = this._context.new_var(PineJS.Std.close(this._context));
                    var vpt_close_1 = this._context.new_var(PineJS.Std.close(this._context)).get(1);
                    var priceStd = PineJS.Std.stdev(this._context.new_var(vpt_close - vpt_close_1), slowLength, this._context);
                    var pR = priceStd != 0 ? priceChange/priceStd : NaN;
                    var pRS = PineJS.Std.sign(PineJS.Std.close(this._context) - fastLengthClose) * pR;
                    var vptColor = pRS >= 0 ? 0 : 1;
                    // // plot(pRS, "Price Ratio", color = pRS >= 0 ? red : green, style = columns)
                    //plot(band, "High Band", color = orange, linewidth = 2)
                    //plot(-band, "Low Band", color = orange, linewidth = 2)

                    //Volume Ratio
                    // length = input(5, "Length")
                    var length = this._input(3);
                    // ratio = input(75, "Ratio")
                    var ratio = this._input(4);
                    // Period = input(2)
                    var Period = this._input(5);
                    // var vol1 = PineJS.Std.sma(this._context.new_var(PineJS.Std.volume(this._context)), length, this._context);
                    // var vol1 = PineJS.Std.sma(volume, length)[1];
                    var new_volume1 = this._context.new_var(PineJS.Std.volume(this._context)).get(1);
                    var vol1 = PineJS.Std.sma(this._context.new_var(new_volume1), length, this._context);
                    // TODO: var vol2 = PineJS.Std.sma(volume, length)[length * Period + 1];
                    var vol2 = PineJS.Std.sma(this._context.new_var(PineJS.Std.volume(this._context)), length, this._context);
                    var new_volume2 = this._context.new_var(PineJS.Std.volume(this._context)).get(length * Period + 1);
                    var vol2 = PineJS.Std.sma(this._context.new_var(new_volume2), length, this._context);
                    var volRatio = vol2 == 0 ? NaN : vol1/vol2;
                    // // plot(volRatio, "Volume Ratio", color = purple, linewidth = 3)
                    // // plot(ratio/100, "Buy/Sell Level", color = blue, linewidth = 2)
                    var yesterday = this._context.new_var(PineJS.Std.close(this._context)).get(1);
                    return [pRS, band, -band, volRatio, ratio/100, vptColor]
                }
            }
          },
          {
                name: "MCDX",
                metainfo: {
                    _metainfoVersion: 40,
                    id: "MCDX@tv-basicstudies-1",
                    scriptIdPart: "STD;MCDX1",
                    name: "MCDX",
                    description: "Kungfu - Multi Color Dragon Extended (MCDX)",
                    shortDescription: "Kungfu MCDX",
                    is_hidden_study: !1,
                    is_price_study: !1,
                    isCustomIndicator: !0,
                    defaults: {
                        styles: {
                            plot_0: {
                                linestyle: 0,
                                visible: !0,
                                linewidth: 1,
                                plottype: 5,
                                trackPrice: !1,
                                transparency: 10,
                                color: "#00FF00"
                            },
                            plot_1: {
                                linestyle: 0,
                                visible: !0,
                                linewidth: 1,
                                plottype: 5,
                                trackPrice: !1,
                                transparency: 10,
                                color: "#FFFF00"
                            },
                            plot_2: {
                                linestyle: 0,
                                visible: !0,
                                linewidth: 1,
                                plottype: 5,
                                trackPrice: !1,
                                transparency: 0,
                                color: "#FF0000"
                            },
                            plot_3: {
                                linestyle: 0,
                                visible: !0,
                                linewidth: 1,
                                plottype: 5,
                                trackPrice: !1,
                                transparency: 10,
                                color: "#FF8080"
                            },
                            plot_4: {
                                linestyle: 0,
                                visible: !1,
                                linewidth: 1,
                                plottype: 2,
                                trackPrice: !1,
                                transparency: 10,
                                color: "#0080FF"
                            },
                            plot_5: {
                                linestyle: 0,
                                visible: !1,
                                linewidth: 1,
                                plottype: 2,
                                trackPrice: !1,
                                transparency: 10,
                                color: "#FF8040"
                            },
                            plot_6: {
                                linestyle: 0,
                                visible: !0,
                                linewidth: 1,
                                plottype: 2,
                                trackPrice: !1,
                                transparency: 10,
                                color: "#8000FF"
                            },
                            plot_7: {
                                linestyle: 0,
                                visible: !0,
                                linewidth: 1,
                                plottype: 2,
                                trackPrice: !1,
                                transparency: 10,
                                color: "#000000"
                            },
                            plot_8: {
                                linestyle: 0,
                                visible: !0,
                                linewidth: 1,
                                plottype: 2,
                                trackPrice: !1,
                                transparency: 10,
                                color: "#000000"
                            },
                            plot_9: {
                                linestyle: 0,
                                visible: !0,
                                linewidth: 1,
                                plottype: 2,
                                trackPrice: !1,
                                transparency: 10,
                                color: "#000000"
                            }
                        },
                        precision: 4,
                        inputs: {
                            in_0: 50,
                            in_1: 50,
                            in_2: 1.5,
                            in_3: 30,
                            in_4: 40,
                            in_5: .7,
                            in_6: 20,
                            in_7: 10
                        }
                    },
                    plots: [{
                        id: "plot_0",
                        type: "line"
                    }, {
                        id: "plot_1",
                        type: "line"
                    }, {
                        id: "plot_2",
                        type: "line"
                    }, {
                        id: "plot_3",
                        type: "line"
                    }, {
                        id: "plot_4",
                        type: "line"
                    }, {
                        id: "plot_5",
                        type: "line"
                    }, {
                        id: "plot_6",
                        type: "line"
                    },
                    {
                        id: "plot_7",
                        type: "line"
                    }, {
                        id: "plot_8",
                        type: "line"
                    }, {
                        id: "plot_9",
                        type: "line"
                    }],
                    styles: {
                        plot_0: {
                            title: "Retailer",
                            histogramBase: 0
                        },
                        plot_1: {
                            title: "Hot Money",
                            histogramBase: 0
                        },
                        plot_2: {
                            title: "Banker Smart Money",
                            histogramBase: 0
                        },
                        plot_3: {
                            title: "Banker Weak Money",
                            histogramBase: 0
                        },
                        plot_4: {
                            title: "Retailer Average",
                            histogramBase: 0
                        },
                        plot_5: {
                            title: "Hot Money Average",
                            histogramBase: 0
                        },
                        plot_6: {
                            title: "Banker Average",
                            histogramBase: 0
                        },
                        plot_7: {
                            title: "25%",
                            histogramBase: 0
                        },
                        plot_8: {
                            title: "50%",
                            histogramBase: 0
                        },
                        plot_9: {
                            title: "75%",
                            histogramBase: 0
                        }
                    },
                    inputs: [{
                        id: "in_0",
                        name: "Banker Base",
                        defval: 50,
                        type: "integer"
                    }, {
                        id: "in_1",
                        name: "Banker Period",
                        defval: 50,
                        type: "integer"
                    }, {
                        id: "in_2",
                        name: "Banker Sensitivity",
                        defval: 1.5,
                        type: "float"
                    }, {
                        id: "in_3",
                        name: "Hot Money Base",
                        defval: 30,
                        type: "float"
                    }, {
                        id: "in_4",
                        name: "Hot Money Period",
                        defval: 40,
                        type: "integer"
                    }, {
                        id: "in_5",
                        name: "Hot Money Sensitivity",
                        defval: .7,
                        type: "float"
                    }, {
                        id: "in_6",
                        name: "Retailer",
                        defval: 20,
                        type: "integer"
                    }, {
                         id: "in_7",
                         name: "Average Period",
                         defval: 10,
                         type: "integer"
                     }
                    ]
                },
                constructor: function() {
                    this.f_0 = function(e, t, n, i) {
                        var r = t * (e - n);
                        return r > i && (r = i), r < 0 && (r = 0), r
                    },
                    this.f_1 = function(p_array, p_step) {
                        if (p_array) {
                          var p_array_len = p_array.length;
                          if (p_array_len > p_step) {
                            p_array_len = p_step;
                          }
                          var p_array_sum = 0;
                          for( var i = 0; i < p_array_len; i++ ){
                            p_array_sum += p_array[i];
                          }
                          return p_array_sum/p_array_len;
                        } else {
                          return 0;
                        }
                    },
                    this.init = function(e, t) {
                        this.time = 0, this.priceList = [], this.bma = [], this.hma = [], this.rma = [], this.gain = 0, this.loss = 0, this.gainBanker = 0, this.lossBanker = 0, this.gainBankerPrev = 0, this.lossBankerPrev = 0, this.gainHotMoney = 0, this.lossHotMoney = 0, this.gainHotMoneyPrev = 0, this.lossHotMoneyPrev = 0, this.banker = 0, this.banker2 = 0, this.hotmoney = 0, this.retailer = 0, this.rsiBanker = 50, this.rsiHotMoney = 50, this.count = 0, this._context = e, this._input = t;
                        //var i = PineJS.Std.ticker(this._context);
                        //this._context.new_sym(i, PineJS.Std.period(this._context), PineJS.Std.period(this._context))
                    }, this.main = function(e, t) {
                      try {
                        this.count += 1, this._context = e, this._input = t;//, this._context.select_sym(1);
                        var o = this._input(0),
                            a = this._input(1),
                            s = this._input(2),
                            l = this._input(3),
                            c = this._input(4),
                            u = this._input(5);
                        this.retailer = this._input(6);
                        var d, p, m, h, g = this._input(7),
                        // var d, p, m, h, g = 10,
                            f = a < c ? c : a,
                            v = a < c ? a : c,
                            b = 1,
                            y = 0;

                        if (this.count > 1) {
                            if (this.time != this._context.symbol.time) {
                                if (this.priceList.push(PineJS.Std.close(this._context)), h = this.priceList.length, v == a ? (this.gain = this.gainBanker, this.loss = this.lossBanker) : (this.gain = this.gainHotMoney, this.loss = this.lossHotMoney), h >= v + 1) {
                                    if (h == v + 1)
                                        for (b = 1; b <= v; b++) this.priceList[b] > this.priceList[b - 1] && (this.gain = this.gain + this.priceList[b] - this.priceList[b - 1]), this.priceList[b] < this.priceList[b - 1] && (this.loss = this.loss + this.priceList[b - 1] - this.priceList[b]);
                                    else this.priceList[h - 1] > this.priceList[h - 2] ? this.gain = this.gain * (v - 1) / v + this.priceList[h - 1] - this.priceList[h - 2] : this.gain = this.gain * (v - 1) / v, this.priceList[h - 1] < this.priceList[h - 2] ? this.loss = this.loss * (v - 1) / v + this.priceList[h - 2] - this.priceList[h - 1] : this.loss = this.loss * (v - 1) / v;
                                    if (y = this.gain + this.loss == 0 ? 100 : 100 * this.gain / (this.gain + this.loss), v == a ? (this.rsiBanker = y, this.gainBankerPrev = this.gainBanker, this.lossBankerPrev = this.lossBanker, this.gainBanker = this.gain, this.lossBanker = this.loss) : (this.rsiHotMoney = y, this.gainHotMoneyPrev = this.gainHotMoney, this.lossHotMoneyPrev = this.lossHotMoney, this.gainHotMoney = this.gain, this.lossHotMoney = this.loss), f == a ? (this.gain = this.gainBanker, this.loss = this.lossBanker) : (this.gain = this.gainHotMoney, this.loss = this.lossHotMoney), h >= f + 1) {
                                        if (h == f + 1)
                                            for (b = 1; b <= f; b++) this.priceList[b] > this.priceList[b - 1] && (this.gain = this.gain + this.priceList[b] - this.priceList[b - 1]), this.priceList[b] < this.priceList[b - 1] && (this.loss = this.loss + this.priceList[b - 1] - this.priceList[b]);
                                        else this.priceList[h - 1] > this.priceList[h - 2] ? this.gain = this.gain * (f - 1) / f + this.priceList[h - 1] - this.priceList[h - 2] : this.gain = this.gain * (f - 1) / f, this.priceList[h - 1] < this.priceList[h - 2] ? this.loss = this.loss * (f - 1) / f + this.priceList[h - 2] - this.priceList[h - 1] : this.loss = this.loss * (f - 1) / f, this.priceList.splice(0, 1);
                                        y = this.gain + this.loss == 0 ? 100 : 100 * this.gain / (this.gain + this.loss), f == a ? (this.rsiBanker = y, this.gainBankerPrev = this.gainBanker, this.lossBankerPrev = this.lossBanker, this.gainBanker = this.gain, this.lossBanker = this.loss) : (this.rsiHotMoney = y, this.gainHotMoneyPrev = this.gainHotMoney, this.lossHotMoneyPrev = this.lossHotMoney, this.gainHotMoney = this.gain, this.lossHotMoney = this.loss)
                                    } else f == a ? this.rsiBanker = 50 : this.rsiHotMoney = 50
                                } else v == a ? this.rsiBanker = 50 : this.rsiHotMoney = 50;
                                return this.time = this._context.symbol.time, this.banker = this.f_0(this.rsiBanker, s, o, this.retailer), this.banker2 = this.banker, this.hotmoney = this.f_0(this.rsiHotMoney, u, l, this.retailer), this.bma.push(this.banker), this.hma.push(this.hotmoney < this.banker ? 0 : this.hotmoney - this.banker), this.rma.push(this.hotmoney < this.banker ? this.retailer - this.banker : this.retailer - this.hotmoney), m = this.f_1(this.bma, g), d = this.f_1(this.hma, g, this._context), p = this.f_1(this.rma, g, this._context), (h = this.bma.length) >= 2 && (this.bma[h - 1] >= this.bma[h - 2] ? this.banker2 = null : this.banker = null), this.bma.length > g && (this.bma.splice(0, 1), this.hma.splice(0, 1), this.rma.splice(0, 1)), [this.retailer, this.hotmoney, this.banker, this.banker2, p, d, m, 5, 10, 15]
                                // return this.time = this._context.symbol.time, this.banker = this.f_0(this.rsiBanker, s, o, this.retailer), this.banker2 = this.banker, this.hotmoney = this.f_0(this.rsiHotMoney, u, l, this.retailer), this.bma.push(this.banker), this.hma.push(this.hotmoney < this.banker ? 0 : this.hotmoney - this.banker), this.rma.push(this.hotmoney < this.banker ? this.retailer - this.banker : this.retailer - this.hotmoney), m = 0, d = 0, p = 0, (h = this.bma.length) >= 2 && (this.bma[h - 1] >= this.bma[h - 2] ? this.banker2 = null : this.banker = null), this.bma.length > g && (this.bma.splice(0, 1), this.hma.splice(0, 1), this.rma.splice(0, 1)), [this.retailer, this.hotmoney, this.banker, this.banker2, 5, 10, 15]
                            }
                            if (this.priceList.length >= f + 1) {
                                this.priceList.pop(), this.priceList.push(PineJS.Std.close(this._context));
                                var w = 0,
                                    S = 0;
                                return h = this.priceList.length, this.gain = this.gainBankerPrev, this.loss = this.lossBankerPrev, this.priceList[h - 1] > this.priceList[h - 2] ? this.gain = this.gain * (a - 1) / a + this.priceList[h - 1] - this.priceList[h - 2] : this.gain = this.gain * (a - 1) / a, this.priceList[h - 1] < this.priceList[h - 2] ? this.loss = this.loss * (a - 1) / a + this.priceList[h - 2] - this.priceList[h - 1] : this.loss = this.loss * (a - 1) / a, w = this.gain + this.loss == 0 ? 100 : 100 * this.gain / (this.gain + this.loss), this.rsiBanker = w, this.gain = this.gainHotMoneyPrev, this.loss = this.lossHotMoneyPrev, this.priceList[h - 1] > this.priceList[h - 2] ? this.gain = this.gain * (c - 1) / c + this.priceList[h - 1] - this.priceList[h - 2] : this.gain = this.gain * (c - 1) / c, this.priceList[h - 1] < this.priceList[h - 2] ? this.loss = this.loss * (c - 1) / c + this.priceList[h - 2] - this.priceList[h - 1] : this.loss = this.loss * (c - 1) / c, S = this.gain + this.loss == 0 ? 100 : 100 * this.gain / (this.gain + this.loss), this.rsiHotMoney = S, this.banker = t(this.rsiBanker, s, o, this.retailer), this.hotmoney = t(this.rsiHotMoney, u, l, this.retailer), this.banker2 = this.banker, this.bma.pop(), this.hma.pop(), this.hma.pop(), this.bma.push(this.banker), this.hma.push(this.hotmoney < this.banker ? 0 : this.hotmoney - this.banker), this.rma.push(this.hotmoney < this.banker ? this.retailer - this.banker : this.retailer - this.hotmoney), m = PineJS.Std.rma(this.bma[0], g, this._context), d = PineJS.Std.rma(this.hma[0], g, this._context), p = PineJS.Std.rma(this.rma[0], g, this._context), (h = this.bma.length) >= 2 && (this.bma[h - 1] >= this.bma[h - 2] ? this.banker2 = null : this.banker = null), [this.retailer, this.hotmoney, this.banker, this.banker2, p, d, m, 5, 10, 15]
                                // return h = this.priceList.length, this.gain = this.gainBankerPrev, this.loss = this.lossBankerPrev, this.priceList[h - 1] > this.priceList[h - 2] ? this.gain = this.gain * (a - 1) / a + this.priceList[h - 1] - this.priceList[h - 2] : this.gain = this.gain * (a - 1) / a, this.priceList[h - 1] < this.priceList[h - 2] ? this.loss = this.loss * (a - 1) / a + this.priceList[h - 2] - this.priceList[h - 1] : this.loss = this.loss * (a - 1) / a, w = this.gain + this.loss == 0 ? 100 : 100 * this.gain / (this.gain + this.loss), this.rsiBanker = w, this.gain = this.gainHotMoneyPrev, this.loss = this.lossHotMoneyPrev, this.priceList[h - 1] > this.priceList[h - 2] ? this.gain = this.gain * (c - 1) / c + this.priceList[h - 1] - this.priceList[h - 2] : this.gain = this.gain * (c - 1) / c, this.priceList[h - 1] < this.priceList[h - 2] ? this.loss = this.loss * (c - 1) / c + this.priceList[h - 2] - this.priceList[h - 1] : this.loss = this.loss * (c - 1) / c, S = this.gain + this.loss == 0 ? 100 : 100 * this.gain / (this.gain + this.loss), this.rsiHotMoney = S, this.banker = this.f_0(this.rsiBanker, s, o, this.retailer), this.hotmoney = this.f_0(this.rsiHotMoney, u, l, this.retailer), this.banker2 = this.banker, this.bma.pop(), this.hma.pop(), this.hma.pop(), this.bma.push(this.banker), this.hma.push(this.hotmoney < this.banker ? 0 : this.hotmoney - this.banker), this.rma.push(this.hotmoney < this.banker ? this.retailer - this.banker : this.retailer - this.hotmoney), m = 0, d = 0, p = 0, (h = this.bma.length) >= 2 && (this.bma[h - 1] >= this.bma[h - 2] ? this.banker2 = null : this.banker = null), [this.retailer, this.hotmoney, this.banker, this.banker2, 5, 10, 15]
                            }
                        }
                      } catch(err) {
                        console.log('Cannot get MCDX data', err.message);
                      }
                    }
                }
            }
        ]);
      },
    };
    const tvWidget = new widget(widgetOptions);
    let self = this;
    tvWidget.onChartReady(function () {
      tvWidget
        .chart()
        .onSymbolChanged()
        .subscribe(null, function (symbolData) {
          if(symbolData.name){
            self.$emit("symbolUpdated", symbolData.name, self.containerId);
            self.currentMackTA = symbolData.name;
          }
        });
      tvWidget
        .chart()
        .onIntervalChanged()
        .subscribe(null, function (intervalData) {
          self.$emit("intervalUpdated", intervalData, self.containerId);
        });
    });

    tvWidget.headerReady().then(function () {
      tvWidget.subscribe('onAutoSaveNeeded', () => {
        // tvWidget.save(state => {
        //   saveState(state, 'CHART_SETTINGS');
        // });
        tvWidget.save(data => {
          // self.$emit("chartSaveUpdated", data, self.containerId);
          if(self.is_loaded){
            if(self.containerId == "tv_chart_container_filter_modal"){
              self.$store.commit("saveSetting",["chart_saved_modal", JSON.stringify(data)]);
            }else{
              self.$store.commit("saveSetting",["chartTASaved_" + self.containerId, JSON.stringify(data)]);
            }
          }
        })
      });
      tvWidget.subscribe('chart_loaded', () => {
        tvWidget.changeTheme(self.$store.state.darkMode ? "Dark" : "Light");
      });
      tvWidget.changeTheme(self.$store.state.darkMode ? "Dark" : "Light");
      if (self.chartSaved) {
        if (Object.keys(self.chartSaved).length > 0) {
          tvWidget.load(self.chartSaved);
          if (self.containerId == "tv_chart_container_filter_modal") {
            tvWidget
              .chart()
              .onDataLoaded()
              .subscribe(
                null,
                () => {
                  tvWidget
                    .chart()
                    .setSymbol(self.$store.state.mackTradingChart);
                },
                true
              );
          }
        }
      }
      setTimeout(() => {
        self.is_loaded = true;
      }, 3500);
      function callback_save(object) {
        self.$emit("chartSaveUpdated", object, self.containerId);
      }
      setInterval(() => {
        if (self.is_interval) {
          tvWidget.save(callback_save);
        }
      }, 2000);

      if (self.containerId == "tv_chart_container_filter_modal") {
        var button = tvWidget.createButton();
        button.setAttribute("title", "Thông tin doanh nghiệp");
        button.style.cursor = "pointer";
        button.addEventListener("click", function () {
          self.$store.state.mack = self.symbol;
          self.$store.state.isShowModalTradingChart = false;
          window.open("/phan-tich-doanh-nghiep/" + self.symbol, "_blank");
        });
        button.textContent = "Thông tin doanh nghiệp";
      } else {
        var button = tvWidget.createButton();
        button.setAttribute("title", "Thông tin doanh nghiệp");
        button.style.cursor = "pointer";
        button.addEventListener("click", function () {
          self.$store.state.mack = self.symbol;
          self.$store.state.isShowModalTradingChart = false;
          window.open(
            "/phan-tich-doanh-nghiep/" + self.currentMackTA,
            "_blank"
          );
        });
        button.textContent = "Thông tin doanh nghiệp";
      }

      tvWidget.addCustomCSSFile("custom-chart.css");
      // const button_change_manager = tvWidget.createButton();
      // button_change_manager.setAttribute('id', 'vpt-custom-menu');

      // const dropdown = document.createElement("div");
      // dropdown.setAttribute("class", "dropdown")

      // const menu_chart = document.createElement("div");
      // menu_chart.setAttribute("class", "parent-button");
      // const dropdown_span = document.createElement("span");
      // dropdown_span.textContent = "Đồ thị"
      // const menu_icon = document.createElement("div");
      // menu_icon.setAttribute("class", "custom-toolbar-dropdown-icon");
      // menu_chart.appendChild(dropdown_span);
      // menu_chart.appendChild(menu_icon);

      // const dropdown_content = document.createElement("div");
      // dropdown_content.setAttribute("class", "dropdown-content");

      // const menu_item_1 = document.createElement("div");
      // menu_item_1.setAttribute("class", "vpt-menu-item");
      // menu_item_1.textContent = "Lưu đồ thị"
      // menu_item_1.addEventListener("click", function() {
      //   self.openDialog();
      // });

      // const menu_item_2 = document.createElement("div");
      // menu_item_2.setAttribute("class", "vpt-menu-item");
      // menu_item_2.textContent = "Copy đồ thị"
      // menu_item_2.addEventListener("click", function() {
      //   tvWidget.showSaveAsChartDialog();
      // });

      // const menu_item_3 = document.createElement("div");
      // menu_item_3.setAttribute("class", "vpt-menu-item");
      // menu_item_3.textContent = "Danh sách đồ thị"
      // menu_item_3.addEventListener("click", function() {
      //   tvWidget.showLoadChartDialog();
      // });

      // dropdown_content.appendChild(menu_item_1);
      // dropdown_content.appendChild(menu_item_2);
      // dropdown_content.appendChild(menu_item_3);
      // dropdown.appendChild(menu_chart);
      // dropdown.appendChild(dropdown_content);
      // button_change_manager.appendChild(dropdown);
      // button_change_manager.addEventListener("click", function() {
      //   if (dropdown_content.getAttribute("class") == "dropdown-content") {
      //     dropdown_content.setAttribute("class", "dropdown-content show");
      //   } else {
      //     dropdown_content.setAttribute("class", "dropdown-content");
      //   }
      // });
      // document.addEventListener('click', function() {
      //   dropdown_content.setAttribute("class", "dropdown-content");
      // });
    });

    this.tvWidget = tvWidget;
  },
  beforeDestroy() {
    this.is_interval = false;
  },
  methods: {
    saveAction() {
      function callback_save_chart(object) {
        alert("callback_save_chart");
        return object;
      }
      // this.tvWidget.save(function() {alert("Save chart to object")});
      var chartObject = this.tvWidget.getSavedCharts(
        callback_save_chart({ id: 44, name: "PV1" })
      );
      console.log(chartObject);
      this.tvWidget.loadChartFromServer({ id: 44, name: "PV1" });
      // this.tvWidget.saveChartToServer(this.closeDialog, this.errorCallback, {"chartName":this.chartName});
      // if (this.chartName != null) {
      //   this.tvWidget.saveChartToServer(this.closeDialog, this.errorCallback, {"chartName":this.chartName});
      // } else {
      //   this.errorMessage = "Tên đồ thị không được để trống.";
      // }
    },
    openDialog() {
      this.isShowEditModal = true;
      this.errorMessage = "";
    },
    closeDialog() {
      this.isShowEditModal = false;
      this.errorMessage = "";
    },
    errorCallback() {
      this.errorMessage = "Lỗi. Không thể lưu đồ thị";
    },
  },
  watch: {
    "$store.state.darkMode": function () {
      this.tvWidget.changeTheme(this.$store.state.darkMode ? "Dark" : "Light");
    },
    symbol: {
      handler() {
        let interval = this.tvWidget.symbolInterval();
        interval = interval.interval;
        this.tvWidget.setSymbol(this.symbol, interval, () => {});
        this.currentMackTA = this.symbol;
      },
    },
  },
  destroyed() {
    if (this.tvWidget !== null) {
      this.tvWidget.remove();
      this.tvWidget = null;
    }
  },
};
</script>

<style lang="scss" scoped>
.TVChartContainer {
  height: calc(100vh - 115px);
  width: 100%;
}
.c-main {
  padding-top: 0px;
  .container-fluid {
    padding-left: 0px;
    padding-right: 0px;
  }
}
</style>
