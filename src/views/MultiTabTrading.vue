<template>
  <div class="wrap-panel-ta">
    <div class="flex-grow-1 pr-1">
      <vue-tabs-chrome
        v-if="!$store.state.is_getting_data_saved"
        ref="tab"
        :minHiddenWidth="120"
        v-model="activeTab"
        :tabs="list_data_tab"
        :onClose="closeTab"
        @dragend="onDragEnd"
      >
        <span slot="after" class="btn-add" @click="addTab">
          <svg
            :fill="$store.state.darkMode ? '#fff' : '#000'"
            height="448pt"
            viewBox="0 0 448 448"
            width="448pt"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0"
            />
          </svg>
        </span>
      </vue-tabs-chrome>
      <template v-for="(item, index) in list_data_tab_clone">
        <TradingChart
          :key="item.key"
          :symbol="item.mack"
          :interval="item.interval"
          :containerId="item.key"
          @symbolUpdated="handleSymbolChanged"
          @intervalUpdated="handleIntervalUpdated"
          @chartSaveUpdated="handleChartSaveUpdated"
          :chartSaved="item.chart_saved"
          v-show="item.key == activeTab"
          v-if="item.is_active && !$store.state.is_getting_data_saved"
        />
      </template>
    </div>
    <div class="panel-collapse-orderboard" :class="collapse ? 'in' : 'out'">
      <div class="custom-tab-vertical">
        <div
          class="custom-tab-vertical__item"
          :class="!collapse && activeTabCollapse == 1 ? 'active' : ''"
          @click="handleClickTabPanelCollapse(1)"
        >
          Thông tin
        </div>
        <div
          class="custom-tab-vertical__item"
          :class="!collapse && activeTabCollapse == 2 ? 'active' : ''"
          @click="handleClickTabPanelCollapse(2)"
        >
          Watchlist
        </div>
      </div>
      <CCard
        class="mb-1"
        style="
          height: 100%;
          overflow: hidden;
          margin-right: 25px;
          border-top-right-radius: 0;
          box-shadow: unset;
        "
      >
        <CCardHeader style="border-bottom: none" class="p-0">
          <div
            @click="collapsePanelOrderBoard"
            v-show="!collapse"
            class="btn-collapse"
            v-c-tooltip="{
              content: 'Nhấn để đóng sổ lệnh',
              placement: 'left',
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="27"
              viewBox="0 0 9 27"
              style="transform: rotate(180deg)"
            >
              <g fill="none" fill-rule="evenodd">
                <path
                  style="fill: #2196f3; stroke: fill: #2196f3"
                  d="M4.5.5a4 4 0 0 1 4 4v18a4 4 0 1 1-8 0v-18a4 4 0 0 1 4-4z"
                ></path>
                <path style="stroke: #fff" d="M5.5 10l-2 3.5 2 3.5"></path>
              </g>
            </svg>
          </div>
          <div
            @click="collapsePanelOrderBoard"
            v-show="collapse"
            class="btn-collapse"
            v-c-tooltip="{
              content: 'Nhấn để mở sổ lệnh',
              placement: 'left',
            }"
          >
            <svg
              v-show="collapse"
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="27"
              viewBox="0 0 9 27"
            >
              <g fill="none" fill-rule="evenodd">
                <path
                  style="fill: #2196f3; stroke: fill: #2196f3"
                  d="M4.5.5a4 4 0 0 1 4 4v18a4 4 0 1 1-8 0v-18a4 4 0 0 1 4-4z"
                ></path>
                <path style="stroke: #fff" d="M5.5 10l-2 3.5 2 3.5"></path>
              </g>
            </svg>
          </div>
          <OrderBoard
            class="p-3"
            :mack="currentMack"
            v-if="!collapse && !is_index && activeTabCollapse == 1"
          />
          <OrderBoardIndex
            class="p-3"
            :mack="currentMack"
            v-if="!collapse && is_index && activeTabCollapse == 1"
          />
          <TabWatchList
            class="p-2"
            :list_mack_in_tab="list_mack_unique"
            :mack="currentMack"
            v-if="!collapse && activeTabCollapse == 2"
            @handleItemClick="showChartTA"
            @updatedListMackWatchList="handleListMackTabWatchlistChanged"
          />
        </CCardHeader>
      </CCard>
    </div>
  </div>
</template>

<script>
import TradingChart from "@/views/pages/TradingChart.vue";
import OrderBoardIndex from "@/views/OrderBoardIndex.vue";
import OrderBoard from "@/views/OrderBoard.vue";
import TabWatchList from "@/views/TabWatchList.vue";
import VueTabsChrome from "vue-tabs-chrome";
import _ from "lodash";

export default {
  created() {
    window.socket_send.on("connect", () => {
      window.socket_send.emit("join", this.list_mack_unique);
    });
    if (!this.$store.state.is_getting_data_saved) {
      this.getDataFromLocalStorage();
    }
  },
  name: "MultiTabTrading",
  data() {
    return {
      activeTab: "",
      currentMack: "",
      list_data_tab: [],
      list_data_tab_clone: [],
      collapse: true,
      activeTabCollapse: 1,
      list_mack_watchlist_tab: [],
      is_first_set_data: true,
      is_interval: true,
    };
  },
  components: {
    TradingChart,
    VueTabsChrome,
    OrderBoard,
    OrderBoardIndex,
    TabWatchList,
  },
  methods: {
    getDataFromLocalStorage() {
      let collapse_panel_order_board = localStorage.getItem(
        "collapse_panel_order_board"
      );
      if (collapse_panel_order_board != null) {
        collapse_panel_order_board = JSON.parse(collapse_panel_order_board);
        this.collapse = collapse_panel_order_board;
      }
      let active_tab_collapse_panel_order_board = localStorage.getItem(
        "active_tab_collapse_panel_order_board"
      );
      if (active_tab_collapse_panel_order_board != null) {
        active_tab_collapse_panel_order_board = JSON.parse(
          active_tab_collapse_panel_order_board
        );
        this.activeTabCollapse = active_tab_collapse_panel_order_board;
      }
      let list_item_trading_chart = localStorage.getItem(
        "list_item_trading_chart"
      );
      list_item_trading_chart = JSON.parse(list_item_trading_chart);
      let active_tab_chart = localStorage.getItem("active_tab_chart");
      if (list_item_trading_chart) {
        this.list_data_tab = list_item_trading_chart.map((item) => {
          return {
            label: item.label,
            key: item.key,
            mack: item.mack,
            interval: item.interval,
            chart_saved: item.chart_saved,
            is_active: false,
          };
        });
        this.list_data_tab_clone = list_item_trading_chart.map((item) => {
          return {
            label: item.label,
            key: item.key,
            mack: item.mack,
            interval: item.interval,
            chart_saved: item.chart_saved,
            is_active: false,
          };
        });
        if (active_tab_chart) {
          let check_exist_key = false;
          for (let i = 0; i < this.list_data_tab_clone.length; i++) {
            if (this.list_data_tab_clone[i].key == active_tab_chart) {
              check_exist_key = true;
              this.list_data_tab_clone[i].is_active = true;
            }
          }
          if (check_exist_key) {
            this.activeTab = active_tab_chart;
          } else {
            this.activeTab =
              this.list_data_tab_clone[this.list_data_tab_clone.length - 1].key;
            this.list_data_tab_clone[
              this.list_data_tab_clone.length - 1
            ].is_active = true;
          }
        } else {
          this.activeTab =
            this.list_data_tab_clone[this.list_data_tab_clone.length - 1].key;
          this.list_data_tab_clone[
            this.list_data_tab_clone.length - 1
          ].is_active = true;
        }
      } else {
        const key = "tab" + Date.now();
        this.activeTab = key;
        this.list_data_tab = [
          {
            label: "GAS 1D",
            key: key,
            mack: "GAS",
            interval: "1D",
            is_active: true,
          },
        ];
        this.list_data_tab_clone = [
          {
            label: "GAS 1D",
            key: key,
            mack: "GAS",
            interval: "1D",
            is_active: true,
          },
        ];
      }
      setTimeout(() => {
        this.is_first_set_data = false;
      }, 1000);
    },
    handleListMackTabWatchlistChanged(list_mack) {
      this.list_mack_watchlist_tab = list_mack;
    },
    showChartTA(mack) {
      for (let i = 0; i < this.list_data_tab.length; i++) {
        if (this.list_data_tab[i].key == this.activeTab) {
          this.list_data_tab[i].label =
            mack + " " + this.list_data_tab[i].interval;
          this.list_data_tab[i].mack = mack;
          this.currentMack = mack;
        }
      }
      for (let i = 0; i < this.list_data_tab_clone.length; i++) {
        if (this.list_data_tab_clone[i].key == this.activeTab) {
          this.list_data_tab_clone[i].mack = mack;
        }
      }
    },
    collapsePanelOrderBoard() {
      this.collapse = !this.collapse;
      localStorage.setItem("collapse_panel_order_board", this.collapse);
      if (!this.is_first_set_data) {
        this.save_collapse_panel_order_board();
      }
      setTimeout(() => {
        this.$refs.tab.doLayout();
      }, 1000);
    },
    handleClickTabPanelCollapse(tab) {
      if (this.collapse) {
        this.collapse = !this.collapse;
        this.activeTabCollapse = tab;
        setTimeout(() => {
          this.$refs.tab.doLayout();
        }, 1000);
      } else {
        if (tab == this.activeTabCollapse) {
          this.collapse = !this.collapse;
          setTimeout(() => {
            this.$refs.tab.doLayout();
          }, 1000);
        } else {
          this.activeTabCollapse = tab;
        }
      }
      localStorage.setItem("collapse_panel_order_board", this.collapse);
      localStorage.setItem(
        "active_tab_collapse_panel_order_board",
        this.activeTabCollapse
      );
      if (!this.is_first_set_data) {
        this.save_collapse_panel_order_board();
        this.save_active_tab_collapse_panel_order_board();
      }
    },
    addTab() {
      if (this.list_data_tab.length >= 15) {
        this.$toast.clear();
        this.$toast.info("Bạn đã mở tối đa 15 tab");
        return;
      }
      const key = "tab" + Date.now();
      let newTabs = [
        {
          label: this.list_data_tab[this.list_data_tab.length - 1].label,
          chart_saved:
            this.list_data_tab[this.list_data_tab.length - 1].chart_saved,
          key: key,
          mack: this.list_data_tab[this.list_data_tab.length - 1].mack,
          interval: this.list_data_tab[this.list_data_tab.length - 1].interval,
          is_active: true,
        },
      ];
      if (newTabs[0].chart_saved.charts[0].chartId)
        delete newTabs[0].chart_saved.charts[0].chartId;
      this.$refs.tab.addTab(...newTabs);
      this.activeTab = key;
      this.list_data_tab_clone.push(newTabs[0]);
    },
    closeTab(tab, key, index) {
      for (let i = 0; i < this.list_data_tab_clone.length; i++) {
        if (this.list_data_tab_clone[i].key == key) {
          this.list_data_tab_clone.splice(i, 1);
          this.$store.commit("clearSetting", key);
        }
      }
      return true;
    },
    handleSymbolChanged(symbol, key) {
      for (let i = 0; i < this.list_data_tab.length; i++) {
        if (this.list_data_tab[i].key == key) {
          this.list_data_tab[i].label =
            symbol + " " + this.list_data_tab[i].interval;
          this.list_data_tab[i].mack = symbol;
          this.currentMack = symbol;
        }
      }
    },
    handleIntervalUpdated(interval, key) {
      for (let i = 0; i < this.list_data_tab.length; i++) {
        if (this.list_data_tab[i].key == key) {
          this.list_data_tab[i].label =
            this.list_data_tab[i].mack + " " + interval;
          this.list_data_tab[i].interval = interval;
        }
      }
    },
    handleChartSaveUpdated(object, key) {
      for (let i = 0; i < this.list_data_tab.length; i++) {
        if (this.list_data_tab[i].key == key) {
          this.list_data_tab[i].chart_saved = object;
        }
      }
    },
    onDragEnd() {},
    saveActiveTab: _.debounce(function () {
      this.$store.commit("saveSetting", ["active_tab_chart", this.activeTab]);
    }, 2000),
    save_list_item_trading_chart: _.debounce(function () {
      this.$store.commit("saveSetting", [
        "list_item_trading_chart",
        JSON.stringify(this.list_tab),
      ]);
    }, 2000),
    save_collapse_panel_order_board: _.debounce(function () {
      this.$store.commit("saveSetting", [
        "collapse_panel_order_board",
        this.collapse ? "true" : "false",
      ]);
    }, 2000),
    save_active_tab_collapse_panel_order_board: _.debounce(function () {
      this.$store.commit("saveSetting", [
        "active_tab_collapse_panel_order_board",
        this.activeTabCollapse,
      ]);
    }, 2000),
  },
  computed: {
    is_index() {
      return ["VNINDEX", "HNXINDEX", "UPCOMINDEX", "VN30", "HNX30"].includes(
        this.currentMack
      );
    },
    list_tab() {
      let return_data = [];
      for (const item of this.list_data_tab_clone) {
        if (item.is_active && !return_data.includes(item.mack)) {
          return_data.push(item.mack);
        }
      }
      return return_data;
    },
    list_mack_in_tab() {
      let return_data = [];
      for (const item of this.list_data_tab_clone) {
        if (item.is_active && !return_data.includes(item.mack)) {
          return_data.push(item.mack);
        }
      }
      return return_data;
    },
    list_mack_unique() {
      let return_data = [];
      for (const item of this.list_data_tab) {
        if (item.is_active && !return_data.includes(item.mack)) {
          return_data.push(item.mack);
        }
      }
      for (const mack of this.list_mack_watchlist_tab) {
        if (!return_data.includes(mack)) {
          return_data.push(mack);
        }
      }
      return return_data;
    },
    list_tab() {
      return this.list_data_tab.map((item) => {
        return {
          interval: item.interval,
          key: item.key,
          label: item.label,
          mack: item.mack,
        };
      });
    },
  },
  watch: {
    list_data_tab: {
      deep: true,
      handler(newVal, oldVal) {
        if (this.list_data_tab.length == 0) {
          const key = "tab" + Date.now();
          this.activeTab = key;
          this.list_data_tab = [
            {
              label: "GAS 1D",
              key: key,
              mack: "GAS",
              interval: "1D",
              is_active: true,
            },
          ];
          this.list_data_tab_clone = [
            {
              label: "GAS 1D",
              key: key,
              mack: "GAS",
              interval: "1D",
              is_active: true,
            },
          ];
        }
        localStorage.setItem(
          "list_item_trading_chart",
          JSON.stringify(
            this.list_data_tab.map((item) => {
              return {
                interval: item.interval,
                key: item.key,
                label: item.label,
                mack: item.mack,
                chart_saved: item.chart_saved,
              };
            })
          )
        );
      },
    },
    list_tab: {
      deep: true,
      handler(newVal, oldVal) {
        if (!this.is_first_set_data) {
          this.save_list_item_trading_chart();
        }
      },
    },
    list_mack_in_tab: {
      handler() {
        window.list_mack_in_tab = this.list_mack_in_tab;
      },
    },
    list_mack_unique: {
      handler(newVal, oldVal) {
        let list_mack_need_leave = [];
        let list_mack_need_join = [];
        //check xem có mã nào cần join
        for (const mack of newVal) {
          if (!oldVal.includes(mack)) {
            list_mack_need_join.push(mack);
          }
        }
        //check xem có mã nào cần leave
        for (const mack of oldVal) {
          if (!newVal.includes(mack)) {
            list_mack_need_leave.push(mack);
          }
        }
        // console.log("danh sách các mã cũ", oldVal);
        // console.log("danh sách các mã mới", newVal);
        if (list_mack_need_leave.length > 0) {
          window.socket_send.emit("leave", list_mack_need_leave);
          // console.log("danh sách các mã cần leave",list_mack_need_leave);
        }
        if (list_mack_need_join.length > 0) {
          window.socket_send.emit("join", list_mack_need_join);
          // console.log("danh sách các mã cần join",list_mack_need_join);
        }
      },
    },
    activeTab: {
      deep: true,
      handler() {
        for (let i = 0; i < this.list_data_tab_clone.length; i++) {
          if (this.list_data_tab_clone[i].key == this.activeTab) {
            this.list_data_tab_clone[i].is_active = true;
            this.currentMack = this.list_data_tab_clone[i].mack;
          }
        }
        for (let i = 0; i < this.list_data_tab.length; i++) {
          if (this.list_data_tab[i].key == this.activeTab) {
            this.list_data_tab[i].is_active = true;
            this.currentMack = this.list_data_tab[i].mack;
          }
        }
        localStorage.setItem("active_tab_chart", this.activeTab);
        if (
          !this.is_first_set_data &&
          !this.$store.state.is_getting_data_saved
        ) {
          this.saveActiveTab();
        }
      },
    },
    currentMack: {
      handler() {
        if (this.currentMack.length == 3) {
          this.$store.state.mack = this.currentMack;
        }
      },
    },
    collapse: {
      handler() {
        setTimeout(() => {
          this.$refs.tab.doLayout();
        }, 1000);
      },
    },
    "$store.state.is_getting_data_saved": {
      handler(newVal, oldVal) {
        this.getDataFromLocalStorage();
      },
    },
  },
  mounted: function () {
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
  },
  beforeDestroy() {
    window.socket_send.emit("leave", this.list_mack_unique);
    window.list_mack_in_tab = [];
    this.is_interval = false;
  },
};
</script>

<style lang="scss">
.tabs-close {
  .tabs-close-icon {
    margin-top: -10px;
  }
}
.vue-tabs-chrome {
  background-color: unset !important;
  .tabs-footer {
    height: 0px !important;
    background-color: unset !important;
  }
  .tabs-content {
    .tabs-item {
      cursor: pointer;
      .tabs-main {
        font-weight: bold;
      }
    }
  }
}
.btn-add {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  padding: 0 10px;
  color: #333;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 300ms;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.c-dark-theme {
  .btn-add {
    color: #fff;
    &:hover {
      background-color: hsla(0, 0%, 100%, 0.075);
    }
  }
  .tabs-content {
    .tabs-item {
      &:hover {
        .tabs-background {
          .tabs-background-content {
            background-color: hsla(0, 0%, 100%, 0.075);
          }
          .tabs-background-before {
            fill: hsla(0, 0%, 100%, 0.075);
          }
          .tabs-background-after {
            fill: hsla(0, 0%, 100%, 0.075);
          }
        }
        .tabs-main {
          color: #7267d3;
        }
      }
    }
    .active {
      .tabs-background {
        .tabs-background-content {
          background-color: hsla(0, 0%, 100%, 0.075);
          color: #7267d3;
        }
        .tabs-background-before {
          fill: hsla(0, 0%, 100%, 0.075);
        }
        .tabs-background-after {
          fill: hsla(0, 0%, 100%, 0.075);
        }
      }
      .tabs-main {
        color: #7267d3;
      }
    }
  }
  .panel-collapse-orderboard {
    .custom-tab-vertical {
      &__item {
        background-color: hsla(0, 0%, 100%, 0.075);
        &.active {
          color: #7267d3;
          background-color: #282933;
        }
      }
    }
    &.in {
      .card {
        background-color: #282933;
      }
      .card-header {
        background-color: #282933;
      }
    }
  }
}
.panel-collapse-orderboard {
  transition: 0.5s ease-in-out;
  position: relative;
  .btn-collapse {
    position: absolute;
    left: 0;
    top: 50%;
    cursor: pointer;
  }
  &.in {
    height: calc(100vh - 75px);
    width: 25px;
    .card {
      background-color: #e0e3eb;
    }
    .card-header {
      background-color: #e0e3eb;
      padding-left: 0px;
      padding-right: 0px;
    }
    .item-beta-corner {
      transform: rotate(-48deg);
      text-align: center;
      position: absolute;
      background-color: #479df2;
      width: 0px;
      left: -35px;
      top: 5px;
      overflow: hidden;
      color: #fff;
      font-size: 12px;
    }
  }
  &.out {
    width: 360px;
    height: calc(100vh - 75px);
    .item-beta-corner {
      transform: rotate(-48deg);
      text-align: center;
      position: absolute;
      background-color: #479df2;
      width: 100px;
      left: -35px;
      top: 5px;
      overflow: hidden;
      color: #fff;
      font-size: 12px;
    }
  }
}
.wrap-panel-ta {
  display: flex;
  flex-direction: row;
}
@media only screen and (max-width: 750px) {
  .wrap-panel-ta {
    display: flex;
    flex-direction: column;
  }
  .panel-collapse-orderboard {
    margin-top: 10px;
    &.out {
      width: 100%;
    }
  }
}
.custom-tab-vertical {
  position: absolute;
  top: 71px;
  right: -70px;
  transform: rotate(90deg);
  white-space: nowrap;
  display: flex;
  &__item {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    background-color: #e0e3eb;
    margin-right: 5px;
    padding: 0px 10px 3px 10px;
    cursor: pointer;
    &.active {
      background-color: #fff;
    }
  }
}
</style>
