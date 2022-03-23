<template>
  <div class="c-app" :class="{ 'c-dark-theme': $store.state.darkMode }">
    <TheSidebar />
    <CWrapper>
      <TheHeader />
      <div v-if="$store.state.maintenance == 'on' "  class="pt-1 text-maintenance-left" height="30px" :style="{'background': $store.state.darkMode ? '#270D34' : 'white' }">
      </div>
      <marquee v-if="$store.state.maintenance == 'on' "  class="text-danger pt-1 text-maintenance"
       :style="{'background': $store.state.darkMode ? '#270D34' : 'white' }"
       width="60%" direction="right" scrollamount="6" height="35px">
        Kungfu Stocks Pro đang bảo trì
      </marquee>
      <div class="c-body" :style="{'margin-top': $store.state.maintenance == 'on' ? '20px' : ''}">
        <main class="c-main">
          <CContainer fluid>
            <transition name="fade">
              <router-view></router-view>
            </transition>
          </CContainer>
          <CModal
            title="Thông báo"
            color="warning"
            :centered="true"
            :show.sync="$store.state.clanModal"
          >
            <template #footer>
              <CButton color="secondary" @click="$store.state.clanModal = false"
                >Đóng</CButton
              >
            </template>
            Cám ơn các bạn đã quan tâm! Chức năng này hiện chỉ mở cho học viên
            của KUNGFU chứng khoán.
          </CModal>
          <CModal
            :title="$store.state.mackTradingChart"
            :show.sync="$store.state.isShowModalTradingChart"
            size="xl"
            :centered="true"
            class="modal-hide-header-footer"
          >
            <TradingChart
              v-if="$store.state.isShowModalTradingChart"
              containerId="tv_chart_container_filter_modal"
              :symbol="$store.state.mackTradingChart"
              @chartSaveUpdated="handleChartSaveUpdated"
              :chartSaved="chart_saved"
            />
            <template #footer>
              <div></div>
            </template>
            <template #header class="modal-header">
              <h5 class="modal-title">{{ $store.state.mackTradingChart }}</h5>
              <CDropdown
                placement="bottom-start"
                add-menu-classes="pt-0 pb-2"
                class="pl-3"
              >
                <template #toggler>
                  <div class="tooltip-add">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-file-earmark-plus"
                      :style="
                        $store.state.darkMode
                          ? { color: '#7267d3' }
                          : { color: '#321fdb' }
                      "
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z"
                      />
                      <path
                        d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"
                      />
                    </svg>
                    <span class="tooltiptext-add">Thêm vào Watchlist</span>
                  </div>
                </template>
                <CSelect
                  class="px-1 m-0 pt-2"
                  :options="option_filter_category"
                  :value.sync="list_data_model_add.current_my_watchlist_id"
                >
                </CSelect>
                <div class="px-1">
                  <div class="bg-success border-radius-3">
                    <CDropdownItem
                      class="mt-1 py-2 hover-button-mack text-white"
                      @click="addNewWatchlist($store.state.mackTradingChart)"
                    >
                      <CIcon name="cibAddthis" /> <span class="pl-4">Thêm</span>
                    </CDropdownItem>
                  </div>
                </div>
              </CDropdown>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="closeModal()"
              >
                ×
              </button>
            </template>
          </CModal>
        </main>
      </div>
    </CWrapper>
  </div>
</template>
<script>
import TheSidebar from "./TheSidebar";
import TheHeader from "./TheHeader";
import axios from "axios";
import TradingChart from "@/views/pages/TradingChart.vue";
import * as io from "socket.io-client";
import { mapGetters } from "vuex";
import _ from "lodash";
export default {
  name: "TheContainer",
  components: {
    TheSidebar,
    TheHeader,
    TradingChart,
  },
  data() {
    return {
      connection: null,
      is_interval: true,
      chart_saved: {},
      is_first_set_data: true,
    };
  },
  computed: {
    ...mapGetters(["option_filter_category", "list_data_model_add"]),
  },
  created() {
    window.list_mack_in_tab = [];
    window.list_mack_join = [];
    this.getMyWatchlist();
    this.$socket = io(process.env.VUE_APP_URL_WEBSOCKET, {
      path: process.env.VUE_APP_PATH_WEBSOCKET,
      autoConnect: false,
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: "Bearer " + localStorage.getItem("api_token"),
          },
        },
      },
    });
    this.$socket.connect();
    let roles = localStorage.getItem("roles");
    if (roles != null) {
      roles = roles.split(",");
    }
    if (roles.indexOf("admin") >= 0) {
      this.$store.state.sidebarMinimize = true;
      this.$store.state.sidebarShow = "responsive";
    } else {
      this.$store.state.sidebarMinimize = false;
      this.$store.state.sidebarShow = "false";
    }
    // this.connection = new WebSocket("wss://ta.kungfustockspro.live:2083/socket/ws");
    // setInterval(() => {
    //   this.$socket.emit('getlive', ['HPG','VNM']);
    // }, 2000);
    window.socket_listen = this.sockets;
    window.socket_send = this.$socket;
    // this.$socket.emit("join", ["BSR","SSI", "HPG", "VNM"]);
    this.$socket.on("updatelive", (data) => {
      this.handleReceivedMessageWSUpdateLive(data);
    });
    // this.getDataEOD();
    // this.getDataTradingLog();
    this.getAllMack();
    // this.getDataCategory();
    // this.getDataRealtimeEOD();
    this.getDataSaveSettings();
  },
  mounted() {
    window.onbeforeunload = () => {
      // this.backupDataChartTA();
    };
  },
  beforeDestroy() {
    this.$socket.removeAllListeners();
    this.$socket.disconnect();
    this.is_interval = false;
    // this.backupDataChartTA();
  },
  methods: {
    getMyWatchlist() {
      let self = this;
      self.is_loading_data = true;
      axios
        .get(self.$apiAdress + "/api/my-watchlist", {
          params: {
            token: localStorage.getItem("api_token"),
          },
        })
        .then(function (res) {
          self.is_loading_data = false;
          let reverseData = res.data.reverse();
          for (let item of reverseData) {
            self.option_filter_category.push({
              value: item.id,
              label: item.name,
            });
          }
          self.list_data_model_add.current_my_watchlist_id =
            self.option_filter_category[0].value;
        })
        .catch(function (error) {
          console.error(error);
          self.is_loading_data = false;
        });
    },
    addNewWatchlist(mack_name) {
      let self = this;
      if (!this.$store.state.data_eod.hasOwnProperty(mack_name.toUpperCase())) {
        self.$toast.error("Mã CK không hợp lệ!");
        return;
      }
      axios
        .post(this.$apiAdress + "/api/watchlist", {
          mack: mack_name.toUpperCase(),
          my_watchlist_id: self.list_data_model_add.current_my_watchlist_id,
          token: localStorage.getItem("api_token"),
        })
        .then(function (response) {
          response.data._classes = "table-success";
          self.$toast.success("Thêm vào watchlist thành công");
        })
        .catch(function (error) {
          console.error(error);
          self.$toast.error(
            "Mã chứng khoán đã có trong Wacthlist, vui lòng thử lại"
          );
        });
    },
    closeModal() {
      this.$store.state.isShowModalTradingChart = false;
    },
    handleReceivedMessageWS(res) {
      const rs = res;
      if (!rs) return;
      for (let i = 0; i < rs["stockcode"].length; i++) {
        const stockcode = rs["stockcode"][i];
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
        };
        this.$store.state.data_eod[stockcode] = item;
      }
    },
    handleReceivedMessageWSUpdateLive(res) {
      this.$store.state.data_eod[res.stockcode] = {
        ...res,
        lastprice: res.price,
        change: res.cl == "d" || res.cl == "f" ? -res.change : res.change,
        perchange:
          res.cl == "d" || res.cl == "f" ? -res.perchange : res.perchange,
        totalval:
          this.$store.state.data_eod[res.stockcode].totalval +
          res.vol * res.price,
      };
    },
    handleChartSaveUpdated(object, key) {
      this.chart_saved = object;
    },
    getDataEOD() {
      let self = this;
      axios
        .get(self.$apiAdress + "/api/stocks/dashboard/get-data-eod", {
          params: {
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          self.$store.state.data_eod = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getAllMack() {
      window.socket_send.emit("getallstockcode", (res) => {
        let temp_list_mack = [];
        let temp_list_mack_company = [];
        let temp_data_eod = {};
        const rs = res;
        if (!rs) return;
        for (let i = 0; i < rs["stockcode"].length; i++) {
          const stockcode = rs["stockcode"][i];
          let item = {
            mack: rs["stockcode"][i],
            nganh: rs["nganh"][i] != "" ? rs["nganh"][i] : rs["nganh_hep"][i],
            nganh_hep: rs["nganh_hep"][i],
            nhom: rs["nhom"][i],
            san: rs["san"][i],
            ten_cong_ty: rs["ten"][i],
          };
          if (stockcode.length == 3) {
            temp_list_mack.push(item);
          }
          temp_data_eod[stockcode] = {
            change: 0,
            cl: 0,
            lastprice: 0,
            perchange: 0,
            stockcode: stockcode,
            totalval: 0,
            totalvol: 0,
          };
          temp_list_mack_company[stockcode] = item;
        }
        this.$store.state.list_mack = temp_list_mack;
        this.$store.state.list_mack_company = temp_list_mack_company;
        this.$store.state.data_eod = temp_data_eod;
      });
    },
    getDataTradingLog() {
      let self = this;
      axios
        .get(self.$apiAdress + "/api/stocks/profit_loss/get-all", {
          params: {
            token: localStorage.getItem("api_token"),
          },
        })
        .then(function (res) {
          self.$store.state.data_trading_log = res.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    getDataCategory() {
      let self = this;
      axios
        .get(self.$apiAdress + "/api/stocks/category/get-all", {
          params: {
            token: localStorage.getItem("api_token"),
          },
        })
        .then(function (res) {
          self.$store.state.data_category = res.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    getDataRealtimeEOD() {
      let self = this;
      this.connection.onmessage = function (event) {
        if (event.data[0] == "4") {
          let str_data = event.data;
          str_data = str_data.substring(2);
          let row = JSON.parse(str_data);
          if (typeof row == "object") {
            if (row[0] == "stock" || row[0] == "stockps") {
              let data_row = row[1].data;
              self.$store.state.data_eod[data_row.sym].change = data_row.change;
              self.$store.state.data_eod[data_row.sym].lastprice =
                data_row.lastPrice;
              self.$store.state.data_eod[data_row.sym].perchange =
                data_row.changePc;
              self.$store.state.data_eod[data_row.sym].totalvol =
                data_row.totalVol;
            }
          }
        }
      };
    },
    getDataSaveSettings() {
      axios
        .get(this.$apiAdressSaveSettings + "/getusersettings", {
          params: {
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          if (res.data.length == 0) {
            this.backupDataSaveSettings();
          } else {
            this.setDataToLocalStorage(res.data);
          }
          this.$store.state.is_getting_data_saved = false;
        })
        .catch((error) => {
          console.error(error);
          this.$store.state.is_getting_data_saved = false;
          setTimeout(() => {
            this.is_first_set_data = false;
          }, 1000);
        });
    },
    backupDataSaveSettings() {
      let list_item_local_storage = [];
      list_item_local_storage.push({
        key: "darkMode",
        value: localStorage.getItem("darkMode")
          ? localStorage.getItem("darkMode")
          : "false",
      });
      list_item_local_storage.push({
        key: "chart_saved_modal",
        value: localStorage.getItem("chart_saved_modal")
          ? localStorage.getItem("chart_saved_modal")
          : "{}",
      });
      list_item_local_storage.push({
        key: "collapse_panel_order_board",
        value: localStorage.getItem("collapse_panel_order_board") ? localStorage.getItem("collapse_panel_order_board") : "",
      });
      list_item_local_storage.push({
        key: "active_tab_collapse_panel_order_board",
        value: localStorage.getItem("active_tab_collapse_panel_order_board") ? localStorage.getItem("active_tab_collapse_panel_order_board") : "",
      });
      list_item_local_storage.push({
        key: "active_tab_chart",
        value: localStorage.getItem("active_tab_chart") ? localStorage.getItem("active_tab_chart") : "",
      });
      list_item_local_storage.push({
        key: "data_filter_item",
        value: localStorage.getItem("data_filter_item") ? localStorage.getItem("data_filter_item") : "",
      });
      const user_id = localStorage.getItem("user_id");
      list_item_local_storage.push({
        key: "watchlist_" + user_id,
        value: localStorage.getItem("watchlist_" + user_id) ? localStorage.getItem("watchlist_" + user_id) : "",
      });
      let list_item_trading_chart = localStorage.getItem(
        "list_item_trading_chart"
      );
      list_item_trading_chart = JSON.parse(list_item_trading_chart);
      if (list_item_trading_chart) {
        for (const item of list_item_trading_chart) {
          list_item_local_storage.push({
            key: "chartTASaved_" + item.key,
            value: item.chart_saved ? JSON.stringify(item.chart_saved) : "{}",
          });
        }
        list_item_local_storage.push({
          key: "list_item_trading_chart",
          value: JSON.stringify(
            list_item_trading_chart.map((item) => {
              return {
                label: item.label,
                key: item.key,
                mack: item.mack,
                interval: item.interval,
                is_active: false,
              };
            })
          ),
        });
      } else {
        list_item_local_storage.push({
          key: "list_item_trading_chart",
          value: "",
        });
      }
      axios
        .post(this.$apiAdressSaveSettings + "/updateusersettings?token="+localStorage.getItem("api_token"), {
          listitem: list_item_local_storage,
        })
        .then((res) => {})
        .catch((error) => {
          console.error(error);
        });
      setTimeout(() => {
        this.is_first_set_data = false;
      }, 1000);
    },
    setDataToLocalStorage(data) {
      let list_item_trading_chart = [];
      let has_data_list_item_trading_chart = false;
      let list_item_trading_chart_clone = [];
      let list_chart_saved = {};
      for (const item of data) {
        if (item.key == "list_item_trading_chart") {
          list_item_trading_chart = JSON.parse(item.value);
          if (item.value != null && item.value.trim() != "") {
            has_data_list_item_trading_chart = true;
          }
        } else if (item.key.includes("chartTASaved")) {
          let key_chart_saved = item.key.replace("chartTASaved_", "");
          list_chart_saved[key_chart_saved] = JSON.parse(item.value);
        } else {
          if (item.value != null && item.value.trim() != "") {
            localStorage.setItem(item.key, item.value);
          }
        }
      }
      if (has_data_list_item_trading_chart) {
        for (const item of list_item_trading_chart) {
          if (list_chart_saved.hasOwnProperty(item.key)) {
            list_item_trading_chart_clone.push(
              Object.assign(item, {
                chart_saved: list_chart_saved[item.key],
              })
            );
          } else {
            list_item_trading_chart_clone.push(item);
          }
        }
        localStorage.setItem(
          "list_item_trading_chart",
          JSON.stringify(list_item_trading_chart_clone)
        );
      }

      let chart_saved_modal = localStorage.getItem("chart_saved_modal");
      if (chart_saved_modal != null) {
        chart_saved_modal = JSON.parse(chart_saved_modal);
        this.chart_saved = chart_saved_modal;
      }
      let darkMode = localStorage.getItem("darkMode");
      if (darkMode != null) {
        this.$store.state.darkMode = JSON.parse(darkMode);
      }
      setTimeout(() => {
        this.is_first_set_data = false;
      }, 1000);
    },
    saveDarkMode: _.debounce(function () {
      this.$store.commit("saveSetting", [
        "darkMode",
        this.$store.state.darkMode ? "true" : "false",
      ]);
    }, 2000),
  },
  watch: {
    "$store.state.darkMode": function () {
      localStorage.setItem("darkMode", this.$store.state.darkMode);
      if (!this.$store.state.is_getting_data_saved && !this.is_first_set_data) {
        this.saveDarkMode();
      }
    },
    chart_saved: {
      handler() {
        localStorage.setItem(
          "chart_saved_modal",
          JSON.stringify(this.chart_saved)
        );
      },
    },
    "$store.state.isShowModalTradingChart": {
      handler() {
        if (this.$store.state.isShowModalTradingChart) {
          window.socket_send.emit("join", [this.$store.state.mackTradingChart]);
        } else {
          // if(!window.list_mack_join.includes(this.$store.state.mackTradingChart)){
          // window.socket_send.emit("leave", [this.$store.state.mackTradingChart]);
          // }
        }
      },
    },
  },
};
</script>
<style scoped>
.tooltip-add {
  position: relative;
  display: inline-block;
}
.tooltip-add .tooltiptext-add {
  border: 1px solid rgb(160, 160, 160);
  visibility: hidden;
  width: 135px;
  background-color: rgb(255, 255, 255);
  color: rgb(37, 37, 37);
  text-align: center;
  padding: 2px 0;
  font-size: 14px;
  border-radius: 1px;
  top: -4px;
  left: 22px;
  position: absolute;
  z-index: 1;
}
.tooltip-add:hover .tooltiptext-add {
  visibility: visible;
}
.border-radius-3 {
  border-radius: 3px;
}
.hover-button-mack:hover {
  color: rgb(240, 240, 240) !important;
  background-color: #2eb85c !important;
  border-radius: 3px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.text-maintenance-left {
  position: fixed !important;
  top: 50px;
  left: 0;
  background: #270D34;
  height: 35px;
  z-index: 100;
  width: 70%;
}
.text-maintenance {
  background: #270D34;
  position: fixed !important;
  top: 50px;
  right: 0;
  width: 30%;
  z-index: 100;
  font-size: 20px;
}
</style>
