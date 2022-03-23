<template>
  <div>
    <div class="row-index-stock">
      <div
        class="row-index-stock__col-index px-1"
        v-for="(item, index) in data_index"
        :key="index"
      >
        <WidgetPriceChange
          :mack="index"
          :price_eod_yesterday="data_index[index].price_eod_yesterday"
          :price="
            Object.keys(data_exchange_trade).length > 0
              ? data_exchange_trade[index].price
              : 0
          "
          :percent_change="
            Object.keys(data_exchange_trade).length > 0
              ? data_exchange_trade[index].perchange
              : 0
          "
          :price_change="
            Object.keys(data_exchange_trade).length > 0
              ? data_exchange_trade[index].change
              : 0
          "
          :total_vol="
            Object.keys(data_exchange_trade).length > 0
              ? data_exchange_trade[index].totalvol
              : 0
          "
          :total_val="
            Object.keys(data_exchange_trade).length > 0
              ? data_exchange_trade[index].totalval
              : 0
          "
          :up="
            Object.keys(data_exchange_trade).length > 0
              ? data_exchange_trade[index].advances
              : 0
          "
          :nochange="
            Object.keys(data_exchange_trade).length > 0
              ? data_exchange_trade[index].nochange
              : 0
          "
          :down="
            Object.keys(data_exchange_trade).length > 0
              ? data_exchange_trade[index].declines
              : 0
          "
          :data_chart="data_index[index].data_intraday"
        />
      </div>
      <div class="row-index-stock__col-world pl-1 pr-1">
        <CCard style="height: 190px">
          <CCardBody style="height: 190px" class="p-2 bg-tt">
            <WidgetPriceWorldIndexChange
              :data_price_world_index_change="data_price_world_index_change"
            />
          </CCardBody>
        </CCard>
      </div>
    </div>
    <CRow>
      <CCol lg="8" sm="12" class="mb-3">
        <CRow>
          <CCol lg="6" sm="12">
            <WidgetMarketVolatility
              @updateListMackVolatility="
                handleIntervalListMackVolatilityUpdated
              "
              class="widget-vovality"
            />
          </CCol>
          <CCol lg="6" sm="12" v-if="false">
            <WidgetTopTrading
              :data_top_buy="data_top_buy"
              :data_top_sell="data_top_sell"
              @updatedTypeDateTopTrading="handleTypeDateTopTradingUpdated"
            />
          </CCol>
          <CCol lg="6" sm="12">
            <WidgetMarketPulse />
          </CCol>
        </CRow>
        <CRow>
          <CCol lg="6" sm="12">
            <WidgetTopUp
              :data_item="data_top_up"
              @updatedTypeDateTopUp="handleTypeDateTopUpUpdated"
              @updatedTypeBoardTopUp="handleTypeBoardTopUpUpdated"
            />
          </CCol>
          <CCol lg="6" sm="12">
            <WidgetTopDown
              :data_item="data_top_down"
              @updatedTypeDateTopDown="handleTypeDateTopDownUpdated"
              @updatedTypeBoardTopDown="handleTypeBoardTopDownUpdated"
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12">
            <WidgetHeatMap
              :data_exchange_trade="data_exchange_trade"
              :data_heat_map="data_heat_map"
              :data_heat_map_foreign="data_heat_map_foreign"
              @updatedTypeBoardHeatMap="handleTypeBoardHeatMapUpdated"
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12">
            <WidgetHeatMapForeign
              :data_exchange_trade="data_exchange_trade"
              :data_heat_map_foreign="data_heat_map_foreign"
              :data_heat_map_prop="data_heat_map_prop"
              @updatedTypeBoardHeatMapForeign="
                handleTypeBoardHeatMapForeignUpdated
              "
              @updatedTypeTradeHeatMapForeign="
                handleTypeChartHeatMapForeignUpdated
              "
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12">
            <WidgetMA />
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12">
            <WidgetContributionByIndex />
          </CCol>
        </CRow>
      </CCol>
      <CCol lg="4" sm="12">
        <CCard>
          <CCardHeader class="title-block">
            <div class="d-flex justify-content-between">
              <div class="pt-1 pl-2">
                <span class="font-weight-bold h5">Tin tức</span>
              </div>
              <div class="d-flex justify-content-between">
                <CSelect
                  :value.sync="data_filter_type_news"
                  :options="option_filter_type_news"
                  class="mb-0"
                >
                </CSelect>
              </div>
            </div>
          </CCardHeader>
          <CCardBody>
            <div
              class="d-flex"
              v-for="(news, index) in news_data"
              href="#"
              @click="showModal(news)"
              :key="index"
            >
              <div class="p-2">
                <img
                  :src="news.image"
                  width="120px"
                  onerror="this.src='/img/default.jpg';"
                />
              </div>
              <div class="p-2 flex-grow-1 bg-hover">
                <p>{{ news.title }}</p>
                <p>{{ diffForHumans(news.date) }}</p>
              </div>
            </div>
          </CCardBody>
          <NavLink :nav="nav" :items="news_data"></NavLink>
        </CCard>
        <CCard>
          <CCardHeader class="title-block">
            <div class="d-flex justify-content-between">
              <div class="pt-1 d-flex align-items-center">
                <CIcon name="cilCalendar" />
                <div class="font-weight-bold h5 mb-0 pl-2"
                  >Lịch sự kiện sắp diễn ra</div
                >
              </div>
            </div>
          </CCardHeader>
          <CCardBody class="p-0 px-2 pb-2">
            <div
              class="d-flex bg-hover border-bottom p-2"
              v-for="(item, index) in event_data"
              href="#"
              @click="getContentEvent(item.eventid)"
              :key="index"
            >
              <div
                class="mr-2 bg-hover d-flex align-items-center font-weight-bold"
                style="white-space: nowrap"
              >
                {{ item.date_time }}
              </div>
              <div class="mr-2 border-left pl-2 flex-grow-1 d-flex align-items-center">
                {{ item.title }}
              </div>
            </div>
          </CCardBody>
          <template v-if="event_data.length > 0">
            <CPagination
              :activePage.sync="current_page"
              :pages="count_page"
              align="center"
            />
          </template>
        </CCard>
      </CCol>
    </CRow>

    <CModal
      title=" Chi tiết tin tức"
      :show.sync="show_modal_news"
      size="xl"
      :centered="true"
      class="modal-hide-header-footer"
    >
      <div class="overflow-auto" style="height: 70vh; overflow-x: hidden">
        <div class="pl-5 pr-5 pt-2" v-if="this.image != ''">
          <img :src="this.image" onerror="this.src='/img/default.jpg';" />
        </div>
        <p class="h3 mx-5 mt-2">{{ this.title }}</p>
        <div
          class="pl-5 pr-5 pt-2"
          v-html="this.content"
          v-if="data_filter_type_news != 'tin_tuc_nhan_dinh_11111111111'"
        ></div>
        <div
          class="pl-5 pr-5 pt-2"
          v-html="this.content"
          v-if="data_filter_type_news == 'tin_tuc_nhan_dinh_11111111111'"
        ></div>
      </div>
    </CModal>
    <CModal
      title="Chi tiết sự kiện"
      :centered="true"
      :show.sync="show_modal_event"
      size="xl"
      class="modal-hide-header-footer"
    >
      <div class="overflow-auto" style="height: 70vh; overflow-x: hidden">
        <div v-html="content_event" class="pl-4 pr-4" style="width: 100%; height: 100%"></div>
      </div>
    </CModal>
  </div>
</template>

<script>
import WidgetPriceChange from "@/views/widgets/WidgetPriceChange";
import WidgetMarketVolatility from "@/views/widgets/WidgetMarketVolatility";
import WidgetTopTrading from "@/views/widgets/WidgetTopTrading";
import WidgetMarketPulse from "@/views/widgets/WidgetMarketPulse";
import WidgetTopUp from "@/views/widgets/WidgetTopUp";
import WidgetTopDown from "@/views/widgets/WidgetTopDown";
import WidgetHeatMap from "@/views/widgets/WidgetHeatMap";
import WidgetHeatMapForeign from "@/views/widgets/WidgetHeatMapForeign";
import WidgetPriceWorldIndexChange from "@/views/widgets/WidgetPriceWorldIndexChange";
import WidgetContributionByIndex from "@/views/widgets/WidgetContributionByIndex";
import WidgetMA from "@/views/widgets/WidgetMA";
import NavLink from "@/containers/NavLink";
import axios from "axios";
import moment from "moment";

export default {
  name: "Dashboard",
  components: {
    WidgetPriceChange,
    WidgetMarketVolatility,
    WidgetTopTrading,
    WidgetMarketPulse,
    WidgetTopUp,
    WidgetTopDown,
    WidgetHeatMap,
    WidgetPriceWorldIndexChange,
    WidgetHeatMapForeign,
    WidgetContributionByIndex,
    NavLink,
    WidgetMA,
  },
  data() {
    return {
      data_eod_fields: [
        { key: "stockcode", _style: "min-width:50px", label: "Mã CK" },
        { key: "lastprice", _style: "min-width:50px", label: "Giá" },
        { key: "change", _style: "min-width:50px", label: "+/-" },
        { key: "perchange", _style: "min-width:50px", label: "%" },
        { key: "totalvol", _style: "min-width:50px", label: "Tổng KL" },
      ],
      data_index: {
        VNINDEX: {
          stockcode: "VNINDEX",
          data_intraday: {},
          price_eod_yesterday: 1,
        },
        HNXINDEX: {
          stockcode: "HNXINDEX",
          data_intraday: {},
          price_eod_yesterday: 1,
        },
        UPCOMINDEX: {
          stockcode: "UPCOMINDEX",
          data_intraday: {},
          price_eod_yesterday: 1,
        },
        VN30: { stockcode: "VN30", data_intraday: {}, price_eod_yesterday: 1 },
      },
      data_exchange_trade: {
        VNINDEX: {
          advances: 0,
          change: 0,
          declines: 0,
          price: 0,
          lastvol: 0,
          nochange: 0,
          perchange: 0,
          stockcode: "VNINDEX",
          time: 0,
          totalvol: 0,
          totalval: 0,
        },
        HNXINDEX: {
          advances: 0,
          change: 0,
          declines: 0,
          price: 0,
          lastvol: 0,
          nochange: 0,
          perchange: 0,
          stockcode: "HNXINDEX",
          time: 0,
          totalvol: 0,
          totalval: 0,
        },
        UPCOMINDEX: {
          advances: 0,
          change: 0,
          declines: 0,
          price: 0,
          lastvol: 0,
          nochange: 0,
          perchange: 0,
          stockcode: "UPCOMINDEX",
          time: 0,
          totalvol: 0,
          totalval: 0,
        },
        VN30: {
          advances: 0,
          change: 0,
          declines: 0,
          price: 0,
          lastvol: 0,
          nochange: 0,
          perchange: 0,
          stockcode: "VN30",
          time: 0,
          totalvol: 0,
          totalval: 0,
        },
      },
      data_price_world_index_change: [],
      data_index_intraday: [],
      news_data: [],
      event_data: [],
      interval_5s: null,
      interval_1m: null,
      show_modal_news: false,
      show_modal_event: false,
      title: "",
      content: "",
      title_event: "",
      content_event: "",
      is_interval: true,
      list_mack_market_volatility: [],
      data_top_up: [],
      type_date_top_up: "month",
      data_top_down: [],
      type_date_top_down: "month",
      type_board_heat_map: 1,
      type_board_heat_map_foreign: 1,
      type_chart_heat_map_foreign: 1,
      type_board_top_trading: 1,
      type_board_top_up: 1,
      type_board_top_down: 1,
      data_top_buy: [],
      data_top_sell: [],
      option_filter_type_news: [
        // {
        //   value: "tin_tuc_nhan_dinh_11111111111",
        //   label: "Tin tức nhận định",
        //   type: "tin_tuc_nhan_dinh",
        // },
      ],
      // data_filter_type_news: "tin_tuc_nhan_dinh_11111111111",
      data_filter_type_news: "",
      data_heat_map: [],
      data_heat_map_foreign: {
        max_percent: 0,
        min_percent: 0,
        list_buy: [],
        list_buy_net: [],
        list_sell: [],
        list_sell_net: [],
        value_buy: 0,
        value_buy_net: 0,
        value_sell: 0,
        value_sell_net: 0,
      },
      data_heat_map_prop: {
        max_percent: 0,
        min_percent: 0,
        list_buy: [],
        list_buy_net: [],
        list_sell: [],
        list_sell_net: [],
        value_buy: 0,
        value_buy_net: 0,
        value_sell: 0,
        value_sell_net: 0,
      },
      image: null,
      per_page: 10,
      nav: {
        totalPages: 0,
        currentPage: 1,
        lastPage: 0,
      },
      current_page: 1,
      count_page: 0,
    };
  },
  methods: {
    showModal(news) {
      this.show_modal_news = true;
      this.title = news.title;
      this.image = news.image;
      this.content = null;
      let self = this;
      //const type = self.option_filter_type_news.find(
      //  (x) => x.value == self.data_filter_type_news
      //).type;
      axios
        .get(self.$apiAdress + "/api/stocks/dashboard/news/get-content-news", {
          params: {
            id: news.id,
            category: self.data_filter_type_news,
            type: "cafef",
            token: localStorage.getItem("api_token"),
          },
        })
        .then((response) => {
          self.content = response.data;
        })
        .catch((err) => {
          console.error(err);
          self.content = null;
        });
    },
    getCountPageEvent() {
      axios
        .get(this.$apiAdressSaveSettings + "/get-count-page-event", {
          params: {
            token: localStorage.getItem("api_token"),
          },
        })
        .then((response) => {
          this.count_page = Math.ceil(response.data / 20);
        })
        .catch((err) => {
          console.error(err);
          this.count_page = 0;
        });
    },
    getListEvent() {
      this.event_data.length = 0;
      axios
        .get(this.$apiAdressSaveSettings + "/get-list-event", {
          params: {
            page: this.current_page,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((response) => {
          this.event_data = response.data;
        })
        .catch((err) => {
          console.error(err);
          this.event_data.length = 0;
        });
    },
    getContentEvent(id) {
      this.show_modal_event = true;
      axios
        .get(this.$apiAdressSaveSettings + "/get-content-event", {
          params: {
            id: id,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((response) => {
          this.content_event = response.data;
          this.content_event =  this.content_event.replace(/a href/, "a target='blank' href")
          this.is_loading = false;
        })
        .catch((err) => {
          console.error(err);
          this.content_event = null;
        });
    },
    getDataEODYesterday() {
      window.socket_send.emit("getintradayohlc", "UPCOMINDEX", 1, (res) => {
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
        window.socket_send.emit(
          "getlasteod",
          ["VNINDEX", "HNXINDEX", "UPCOMINDEX", "VN30"],
          time,
          (res1) => {
            if (!res1) return;
            for (let i = 0; i < res1["stockcode"].length; i++) {
              const stockcode = res1["stockcode"][i];
              this.data_index[stockcode].price_eod_yesterday = parseFloat(
                res1["eod"][i]
              );
            }
          }
        );
      });
    },
    getDataExchangeTrade() {
      window.socket_send.emit(
        "getliveindex",
        ["VNINDEX", "HNXINDEX", "VN30", "UPCOMINDEX"],
        (res) => {
          if (!res) return;
          const rs = res;
          for (let i = 0; i < rs["stockcode"].length; i++) {
            const stockcode = rs["stockcode"][i];
            let item = {
              advances: parseFloat(rs["advances"][i]),
              change: parseFloat(rs["change"][i]),
              declines: parseFloat(rs["declines"][i]),
              price: parseFloat(rs["lastprice"][i]),
              lastvol: parseFloat(rs["lastvol"][i]),
              nochange: parseFloat(rs["nochange"][i]),
              perchange: parseFloat(rs["perchange"][i]),
              stockcode: rs["stockcode"][i],
              time: parseFloat(rs["time"][i]),
              totalvol: parseFloat(rs["totalvol"][i]),
              totalval: parseFloat(rs["totalvalue"][i]),
            };
            this.data_exchange_trade[stockcode] = item;
          }
        }
      );
      // axios
      //   .get(
      //     // self.$apiAdress + "/api/stocks/dashboard/get-data-exchange-trade",
      //     "https://ta.kungfustockspro.live:2083/getliveindex",
      //     {
      //       params: {
      //         mack: ["VNINDEX", "HNXINDEX", "VN30", "UPCOMINDEX"],
      //         token: localStorage.getItem("api_token"),
      //         // token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBpLmt1bmdmdXN0b2Nrc3Byby5saXZlOjg0NDNcL2FwaVwvbG9naW4iLCJpYXQiOjE2MzA0NTk4NjIsImV4cCI6MTYzMDU0NjI2MiwibmJmIjoxNjMwNDU5ODYyLCJqdGkiOiJHcFVjVlpzV0VCTldhWDBGIiwic3ViIjozNiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.Oy3C0JzwGVOMDmssIYDFitKHdE0QsOeFdruZ65fWm0I",
      //       },
      //     }
      //   )
      //   .then((res) => {
      //     const rs = res.data;
      //     for (let i = 0; i < rs["stockcode"].length; i++) {
      //       const stockcode = rs["stockcode"][i];
      //       let item = {
      //         advances: parseFloat(rs["advances"][i]),
      //         change: parseFloat(rs["change"][i]),
      //         declines: parseFloat(rs["declines"][i]),
      //         price: parseFloat(rs["lastprice"][i]),
      //         lastvol: parseFloat(rs["lastvol"][i]),
      //         nochange: parseFloat(rs["nochange"][i]),
      //         perchange: parseFloat(rs["perchange"][i]),
      //         stockcode: rs["stockcode"][i],
      //         time: parseFloat(rs["time"][i]),
      //         totalvol: parseFloat(rs["totalvol"][i]),
      //         totalval: parseFloat(rs["totalvalue"][i]),
      //       };
      //       self.data_exchange_trade[stockcode] = item;
      //     }
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //   });
    },
    getDataIndexIntraday(mack) {
      window.socket_send.emit("getintradayohlc", mack, 1, (res) => {
        if (!res) return;
        this.data_index[mack].data_intraday = res;
      });
      //   let self = this;
      //   mack = mack.toUpperCase();
      //   axios
      //     .get(self.$apiAdress + "/api/stocks/dashboard/get-data-itd-index", {
      //       params: {
      //         mack: mack,
      //         token: localStorage.getItem("api_token"),
      //       },
      //     })
      //     .then((res) => {
      //       self.data_index[mack].data_intraday = res.data.data_trading;
      //     })
      //     .catch((err) => {
      //       console.error(err);
      //     });
    },
    getDataPriceWorldIndexChange() {
      window.socket_send.emit("getworldindex", (res) => {
        if (!res) return;
        const rs = res;
        this.data_price_world_index_change = [];
        for (let i = 0; i < rs.index.length; i++) {
          this.data_price_world_index_change.push({
            index: rs.index[i],
            change: rs.change[i],
            changePc: rs.changePc[i],
            high: rs.high[i],
            low: rs.low[i],
            last: rs.last[i].replace(/,/g, ""),
            time: rs.time[i],
          });
        }
      });
    },
    handleIntervalListMackVolatilityUpdated(list_mack) {
      this.list_mack_market_volatility = list_mack;
    },
    handleTypeDateTopUpUpdated(type) {
      this.type_date_top_up = type;
    },
    handleTypeDateTopDownUpdated(type) {
      this.type_date_top_down = type;
    },
    handleTypeBoardHeatMapUpdated(type) {
      this.type_board_heat_map = type;
    },
    handleTypeBoardHeatMapForeignUpdated(type) {
      this.type_board_heat_map_foreign = type;
    },
    handleTypeChartHeatMapForeignUpdated(type) {
      this.type_chart_heat_map_foreign = type;
    },
    handleTypeDateTopTradingUpdated(type) {
      this.type_board_top_trading = type;
      this.getDataTopBuySell();
    },
    handleTypeBoardTopUpUpdated(type) {
      this.type_board_top_up = type;
    },
    handleTypeBoardTopDownUpdated(type) {
      this.type_board_top_down = type;
    },
    getDataTopUpDown() {
      let self = this;
      axios
        .get(
          self.$apiAdress + "/api/stocks/dashboard/get-top-up-down-percent",
          {
            params: {
              type_date: "month",
              type_board: 1,
              token: localStorage.getItem("api_token"),
            },
          }
        )
        .then((res) => {
          self.data_top_up = Object.values(res.data.list_top_up);
          self.data_top_down = Object.values(res.data.list_top_down);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getDataTopBuySell() {
      let board = "";
      switch (this.type_board_top_trading) {
        case 1:
          board = "HOSE";
          break;
        case 2:
          board = "HNX";
          break;
        case 3:
          board = "UPCOM";
          break;
        default:
          break;
      }
      window.socket_send.emit("gettopforeign", board, (res) => {
        if (!res) return;
        this.data_top_buy = [];
        this.data_top_sell = [];
        for (let i = 0; i < res["stockcode"].length; i++) {
          if (res["side"][i] == "B") {
            this.data_top_buy.push({
              stockcode: res["stockcode"][i],
              value_buy: res["vol"][i],
            });
          } else if (res["side"][i] == "S") {
            this.data_top_sell.push({
              stockcode: res["stockcode"][i],
              value_sell: res["vol"][i],
            });
          }
        }
      });
      // let self = this;
      // axios
      //   .get(self.$apiAdress + "/api/stocks/dashboard/get-top-buy-sell", {
      //     params: {
      //       type: "vol",
      //       board: self.type_board_top_trading,
      //       token: localStorage.getItem("api_token"),
      //     },
      //   })
      //   .then((res) => {
      //     self.data_top_buy = Object.values(res.data.top_buy);
      //     self.data_top_sell = Object.values(res.data.top_sell);
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //   });
    },
    getDataCategory() {
      let self = this;
      axios
        .get(self.$apiAdress + "/api/stocks/dashboard/news/get-category-news", {
          params: {
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          for (const item of res.data.list_category) {
            self.option_filter_type_news.push({
              value: item,
              label: item,
              type: "cafef",
            });
          }
          self.option_filter_type_news.unshift({
            value: "",
            label: "Tất cả",
            type: "cafef",
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    updateDataInterval() {
      let self = this;
      axios
        .get(
          self.$apiAdress +
            "/api/stocks/dashboard/get-all-data-dashboard-interval",
          {
            params: {
              mack: self.list_mack_market_volatility,
              board_heat_map: self.type_board_heat_map,
              board_top_trading: self.type_board_top_trading,
              token: localStorage.getItem("api_token"),
            },
          }
        )
        .then((res) => {
          const rs_eod = res.data.data_eod;
          for (const key in rs_eod) {
            self.$store.state.data_eod[key] = rs_eod[key];
          }
          self.data_top_buy = Object.values(res.data.top_buy);
          self.data_top_sell = Object.values(res.data.top_sell);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getChapters() {
      this.loading = true;
      BaseRequest.get(
        "story/" +
          this.story_id +
          "/chapter?per_page=" +
          this.per_page +
          "&page=" +
          this.nav.currentPage
      )
        .then((res) => {
          this.chapters = res.data;
          this.nav.totalPages = res.last_page;
          this.nav.lastPage = res.last_page;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    getListNewsFromCategory() {
      let self = this;
      // const type = self.option_filter_type_news.find(
      //   (x) => x.value == self.data_filter_type_news
      // ).type;
      const type = "cafef";
      axios
        .get(
          self.$apiAdress +
            "/api/stocks/dashboard/news/get-list-news-from-categorys",
          {
            params: {
              category: self.data_filter_type_news,
              page: self.nav.currentPage,
              type: type,
              token: localStorage.getItem("api_token"),
            },
          }
        )
        .then((res) => {
          self.news_data.length = 0;
          this.nav.totalPages = res.data.last_page;
          this.nav.lastPage = res.data.last_page;

          for (const item of res.data.data) {
            let image = item.image;
            if (!image) {
              image = "/img/default.jpg";
            }
            self.news_data.push({
              id: item.id,
              image: image,
              title: item.title,
              date: item.date,
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    diffForHumans(times) {
      const convertTime = moment(times);
      const timeNow = new Date();
      const convertTimeNow = moment(timeNow);
      const duration = moment.duration(convertTimeNow.diff(convertTime));
      const seconds = duration.seconds();
      const minutes = duration.minutes();
      const hours = duration.hours();
      const days = duration.days();
      const weeks = duration.weeks();
      const months = duration.months();
      const years = duration.years();
      if (years > 0) {
        return years + " năm trước";
      }
      if (months > 0) {
        return months + " tháng trước";
      }
      if (weeks > 0) {
        return weeks + " tuần trước";
      }
      if (days > 0) {
        return days + " ngày trước";
      }
      if (hours > 0) {
        return hours + " giờ trước";
      }
      if (minutes > 0) {
        return minutes + " phút trước";
      }
      if (seconds > 0) {
        return seconds + " giây trước";
      }
    },
    updateDataLiveByBoard() {
      let board = "";
      switch (this.type_board_heat_map) {
        case 1:
          board = "HOSE";
          break;
        case 2:
          board = "HNX";
          break;
        case 3:
          board = "UPCOM";
          break;
        default:
          break;
      }
      window.socket_send.emit("getlivebyexchange", board, (res) => {
        const rs = res;
        if (!rs) return;
        let temp_array = [];
        for (let i = 0; i < rs["stockcode"].length; i++) {
          let item = {
            cl: rs["cl"][i],
            lastprice: rs["lastprice"][i],
            change:
              rs["cl"][i] == "d" || rs["cl"][i] == "f"
                ? -rs["change"][i]
                : rs["change"][i],
            perchange:
              rs["cl"][i] == "d" || rs["cl"][i] == "f"
                ? -rs["perchange"][i]
                : rs["perchange"][i],
            stockcode: rs["stockcode"][i],
            totalval: rs["totalval"][i],
            totalvol: rs["totalvol"][i],
            nganh: rs["nganh"][i],
          };
          temp_array.push(item);
        }
        this.data_heat_map = temp_array;
        // for (let i = 0; i < rs["stockcode"].length; i++) {
        //   const stockcode = rs["stockcode"][i];
        //   let item = {
        //     cl: rs["cl"][i],
        //     lastprice: rs["lastprice"][i],
        //     change:
        //       rs["cl"][i] == "d" || rs["cl"][i] == "f"
        //         ? -rs["change"][i]
        //         : rs["change"][i],
        //     perchange:
        //       rs["cl"][i] == "d" || rs["cl"][i] == "f"
        //         ? -rs["perchange"][i]
        //         : rs["perchange"][i],
        //     stockcode: rs["stockcode"][i],
        //     totalval: rs["totalval"][i],
        //     totalvol: rs["totalvol"][i],
        //   };
        //   this.$store.state.data_eod[stockcode] = item;
        // }
      });
    },
    updateDataForeignLiveByBoard() {
      let board = "";
      switch (this.type_board_heat_map_foreign) {
        case 1:
          board = "VNINDEX";
          break;
        case 2:
          board = "HNXINDEX";
          break;
        case 3:
          board = "UPCOMINDEX";
          break;
        default:
          break;
      }
      this.data_heat_map_foreign = {
        max_percent: 0,
        min_percent: 0,
        list_buy: [],
        list_buy_net: [],
        list_sell: [],
        list_sell_net: [],
        value_buy: 0,
        value_buy_net: 0,
        value_sell: 0,
        value_sell_net: 0,
      };
      window.socket_send.emit("getforeignbyindex", board, (response) => {
        if (!response) return;
        this.data_heat_map_foreign.value_buy =
          parseFloat(response.fbuy[0]) / 1000000000;
        this.data_heat_map_foreign.value_sell =
          parseFloat(response.fsell[0]) / 1000000000;
        this.data_heat_map_foreign.value_buy_net =
          parseFloat(response.fnetbuy[0]) / 1000000000;
        this.data_heat_map_foreign.value_sell_net =
          parseFloat(response.fnetsell[0]) / 1000000000;
        // this.data_heat_map_foreign = response;
        window.socket_send.emit("getlive", response.stockcode, (res) => {
          let temp_arr_perchange = res.perchange;
          temp_arr_perchange = temp_arr_perchange.map((item) => {
            return parseFloat(item);
          });
          this.data_heat_map_foreign.max_percent = Math.max(
            ...temp_arr_perchange
          );
          this.data_heat_map_foreign.min_percent = Math.min(
            ...temp_arr_perchange
          );
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
        let temp_list_sell = [];
        let temp_list_buy = [];
        let temp_list_buy_net = [];
        let temp_list_sell_net = [];
        for (let i = 1; i < response.stockcode.length; i++) {
          temp_list_sell.push({
            mack: response.stockcode[i],
            fsell: parseFloat(response.fsell[i]),
          });
          temp_list_buy.push({
            mack: response.stockcode[i],
            fbuy: parseFloat(response.fbuy[i]),
          });
          temp_list_sell_net.push({
            mack: response.stockcode[i],
            fsell: parseFloat(response.fnetsell[i]),
          });
          temp_list_buy_net.push({
            mack: response.stockcode[i],
            fbuy: parseFloat(response.fnetbuy[i]),
          });
        }
        this.data_heat_map_foreign.list_buy = temp_list_buy;
        this.data_heat_map_foreign.list_sell = temp_list_sell;
        this.data_heat_map_foreign.list_buy_net = temp_list_buy_net;
        this.data_heat_map_foreign.list_sell_net = temp_list_sell_net;
      });
    },
    updateDataPropLiveByBoard() {
      this.data_heat_map_prop = {
        max_percent: 0,
        min_percent: 0,
        list_buy: [],
        list_buy_net: [],
        list_sell: [],
        list_sell_net: [],
        value_buy: 0,
        value_buy_net: 0,
        value_sell: 0,
        value_sell_net: 0,
      };
      window.socket_send.emit("getpropbyindex", "VNINDEX", (response) => {
        if (!response) return;
        this.data_heat_map_prop.value_buy =
          parseFloat(response.pbuy[0]) / 1000000000;
        this.data_heat_map_prop.value_sell =
          parseFloat(response.psell[0]) / 1000000000;
        this.data_heat_map_prop.value_buy_net =
          parseFloat(response.pnetbuy[0]) / 1000000000;
        this.data_heat_map_prop.value_sell_net =
          parseFloat(response.pnetsell[0]) / 1000000000;
        // this.data_heat_map_foreign = response;
        window.socket_send.emit("getlive", response.stockcode, (res) => {
          let temp_arr_perchange = res.perchange;
          temp_arr_perchange = temp_arr_perchange.map((item) => {
            return parseFloat(item);
          });
          this.data_heat_map_prop.max_percent = Math.max(...temp_arr_perchange);
          this.data_heat_map_prop.min_percent = Math.min(...temp_arr_perchange);
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
        let temp_list_sell = [];
        let temp_list_buy = [];
        let temp_list_buy_net = [];
        let temp_list_sell_net = [];
        for (let i = 1; i < response.stockcode.length; i++) {
          temp_list_sell.push({
            mack: response.stockcode[i],
            psell: parseFloat(response.psell[i]),
          });
          temp_list_buy.push({
            mack: response.stockcode[i],
            pbuy: parseFloat(response.pbuy[i]),
          });
          temp_list_sell_net.push({
            mack: response.stockcode[i],
            psell: parseFloat(response.pnetsell[i]),
          });
          temp_list_buy_net.push({
            mack: response.stockcode[i],
            pbuy: parseFloat(response.pnetbuy[i]),
          });
        }
        this.data_heat_map_prop.list_buy = temp_list_buy;
        this.data_heat_map_prop.list_sell = temp_list_sell;
        this.data_heat_map_prop.list_buy_net = temp_list_buy_net;
        this.data_heat_map_prop.list_sell_net = temp_list_sell_net;
      });
    },
  },
  created() {
    this.is_loading_page = true;
    this.getDataPriceWorldIndexChange();
    this.getDataEODYesterday();
    this.getDataExchangeTrade();
    this.getDataTopUpDown();
    this.getDataTopBuySell();
    this.getDataCategory();
    this.getListNewsFromCategory();
    this.getCountPageEvent();
    this.getListEvent();
    for (const mack in this.data_index) {
      this.getDataIndexIntraday(mack);
    }
    this.updateDataLiveByBoard();
    if (
      this.type_chart_heat_map_foreign == 1 ||
      this.type_chart_heat_map_foreign == 2
    ) {
      this.updateDataForeignLiveByBoard();
    } else if (
      this.type_chart_heat_map_foreign == 3 ||
      this.type_chart_heat_map_foreign == 4
    ) {
      this.updateDataPropLiveByBoard();
    }
    this.interval_5s = setInterval(() => {
      if (this.is_valid_interval) {
        this.getDataExchangeTrade();
        // this.updateDataInterval();
        this.updateDataLiveByBoard();
      }
    }, 5000);
    setInterval(() => {
      if (this.is_valid_interval) {
        if (
          this.type_chart_heat_map_foreign == 1 ||
          this.type_chart_heat_map_foreign == 2
        ) {
          this.updateDataForeignLiveByBoard();
        } else if (
          this.type_chart_heat_map_foreign == 3 ||
          this.type_chart_heat_map_foreign == 4
        ) {
          this.updateDataPropLiveByBoard();
        }
      }
    }, 30000);
    setInterval(() => {
      if (this.is_interval) {
        this.getDataPriceWorldIndexChange();
      }
    }, 30000);
    this.interval_1m = setInterval(() => {
      if (this.is_valid_interval) {
        for (const mack in this.data_index) {
          this.getDataIndexIntraday(mack);
        }
      }
    }, 60000);
  },
  beforeDestroy() {
    clearInterval(this.interval_5s);
    clearInterval(this.interval_1m);
    this.is_interval = false;
    window.socket_send.emit("leave", this.list_mack_market_volatility);
  },
  computed: {
    index_change_info() {
      let temp_list = [];
      if (Object.keys(this.data_exchange_trade).length > 0) {
        Object.keys(this.data_index).forEach((item) => {
          temp_list.push({
            Code: item,
            Name: "Chỉ số " + item,
            Price: this.data_exchange_trade[item].price,
            PerChange: this.data_exchange_trade[item].perchange,
            Change: this.data_exchange_trade[item].change,
          });
        });
      }
      return temp_list;
    },
    data_eod() {
      return Object.values(this.$store.state.data_eod);
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
    type_date_top_up: {
      handler() {
        let self = this;
        axios
          .get(
            self.$apiAdress + "/api/stocks/dashboard/get-top-up-down-percent",
            {
              params: {
                type_date: self.type_date_top_up,
                type_board: self.type_board_top_up,
                token: localStorage.getItem("api_token"),
              },
            }
          )
          .then((res) => {
            self.data_top_up = Object.values(res.data.list_top_up);
          })
          .catch((err) => {
            console.error(err);
          });
      },
    },
    type_board_top_up: {
      handler() {
        let self = this;
        axios
          .get(
            self.$apiAdress + "/api/stocks/dashboard/get-top-up-down-percent",
            {
              params: {
                type_date: self.type_date_top_up,
                type_board: self.type_board_top_up,
                token: localStorage.getItem("api_token"),
              },
            }
          )
          .then((res) => {
            self.data_top_up = Object.values(res.data.list_top_up);
          })
          .catch((err) => {
            console.error(err);
          });
      },
    },
    type_date_top_down: {
      handler() {
        let self = this;
        axios
          .get(
            self.$apiAdress + "/api/stocks/dashboard/get-top-up-down-percent",
            {
              params: {
                type_date: self.type_date_top_down,
                type_board: self.type_board_top_down,
                token: localStorage.getItem("api_token"),
              },
            }
          )
          .then((res) => {
            self.data_top_down = Object.values(res.data.list_top_down);
          })
          .catch((err) => {
            console.error(err);
          });
      },
    },
    type_board_top_down: {
      handler() {
        let self = this;
        axios
          .get(
            self.$apiAdress + "/api/stocks/dashboard/get-top-up-down-percent",
            {
              params: {
                type_date: self.type_date_top_down,
                type_board: self.type_board_top_down,
                token: localStorage.getItem("api_token"),
              },
            }
          )
          .then((res) => {
            self.data_top_down = Object.values(res.data.list_top_down);
          })
          .catch((err) => {
            console.error(err);
          });
      },
    },
    data_filter_type_news: {
      handler() {
        this.nav.currentPage = 1;
        this.getListNewsFromCategory();
      },
    },
    list_mack_market_volatility: {
      handler(newVal, oldVal) {
        if (oldVal.length > 0) {
          window.socket_send.emit("leave", oldVal);
        }
        window.socket_send.emit("getlive", newVal, (res) => {
          if (!res) return;
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
        window.socket_send.emit("join", newVal);
      },
    },
    type_board_heat_map: {
      handler() {
        this.updateDataLiveByBoard();
      },
    },
    type_board_heat_map_foreign: {
      handler() {
        if (
          this.type_chart_heat_map_foreign == 1 ||
          this.type_chart_heat_map_foreign == 2
        ) {
          this.updateDataForeignLiveByBoard();
        } else if (
          this.type_chart_heat_map_foreign == 3 ||
          this.type_chart_heat_map_foreign == 4
        ) {
          this.updateDataPropLiveByBoard();
        }
      },
    },
    type_chart_heat_map_foreign: {
      handler() {
        if (
          this.type_chart_heat_map_foreign == 1 ||
          this.type_chart_heat_map_foreign == 2
        ) {
          this.updateDataForeignLiveByBoard();
        } else if (
          this.type_chart_heat_map_foreign == 3 ||
          this.type_chart_heat_map_foreign == 4
        ) {
          this.updateDataPropLiveByBoard();
        }
      },
    },
    "nav.currentPage": function () {
      this.getListNewsFromCategory();
    },
    current_page: function () {
      this.getListEvent();
    },
  },
  mounted: function () {
    let self = this;
    if (localStorage.getItem("clan") == 1) {
      self.clanModal = true;
    } else {
      self.clanModal = false;
    }
  },
};
</script>
<style lang="scss">
.c-dark-theme {
  .bg-tt {
    th {
      background: #282933;
    }
  }
  .bg-hover {
    &:hover {
      color: hsla(0, 0%, 100%, 0.87);
      background-color: hsla(0, 0%, 100%, 0.1);
      cursor: pointer;
    }
  }
}
.column-5 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 25%;
  flex: 0 0 25%;
  max-width: 25%;
  @media only screen and (max-width: 1024px) {
    flex: 0 0 100%;
    max-width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
.column-half {
  width: 49%;
}
.pl-2-first {
  &:first-child {
    padding-left: 1rem;
  }
}
.list-group-item {
  border: none;
  margin-bottom: 8px;
}
.modal-hide-header-footer {
  .modal-content {
    .modal-header {
      padding: 0.5rem;
    }
    .modal-body {
      padding: 0;
    }
    .modal-footer {
      display: none;
    }
  }
}
.bg-hover {
  &:hover {
    color: white;
    background-color: #8c58b3;
    cursor: pointer;
  }
}

#contentdetail {
  .tindnd {
    display: none !important;
  }
}
#listNewsInContent,
.link-content-footer,
.chisochungkhoan {
  display: none !important;
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
}
.row-index-stock {
  display: flex;
  flex-wrap: wrap;
}
@media only screen and (min-width: 1901px) {
  .row-index-stock {
    &__col-index {
      flex: 0 0 20%;
      max-width: 20%;
    }
    &__col-world {
      flex: 0 0 20%;
      max-width: 20%;
    }
  }
}
@media only screen and (min-width: 1600px) and (max-width: 1900px) {
  .row-index-stock {
    &__col-index {
      flex: 0 0 19.5%;
      max-width: 19.5%;
    }
    &__col-world {
      flex: 0 0 22%;
      max-width: 22%;
    }
  }
}
@media only screen and (min-width: 1140px) and (max-width: 1599px) {
  .row-index-stock {
    &__col-index {
      width: calc(((100vw - 350px) / 4) - 10px);
    }
    &__col-world {
      width: 350px;
    }
  }
}
@media only screen and (max-width: 1139px) {
  .row-index-stock {
    &__col-index {
      flex: 0 0 33.33333%;
      max-width: 33.33333%;
    }
    &__col-world {
      flex: 0 0 66%;
      max-width: 66%;
    }
  }
}
@media only screen and (max-width: 720px) {
  .row-index-stock {
    &__col-index {
      flex: 0 0 33.33333%;
      max-width: 33.33333%;
    }
    &__col-world {
      flex: 0 0 66%;
      max-width: 66%;
    }
  }
}
@media only screen and (max-width: 540px) {
  .row-index-stock {
    &__col-index {
      flex: 0 0 100%;
      max-width: 100%;
    }
    &__col-world {
      flex: 0 0 100%;
      max-width: 100%;
    }
  }
}
</style>
