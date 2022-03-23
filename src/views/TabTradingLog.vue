<template>
  <div>
    <CTabs @update:activeTab="clickTab" :active-tab="activeTab">
      <CTab title="Lãi/lỗ" class="mt-1">
        <ProfitLoss v-if="activeTab == 0" />
      </CTab>
      <CTab title="Nhật ký giao dịch" class="mt-1">
        <TradingLog v-if="activeTab == 1" />
      </CTab>
      <CTab title="Quản lý danh mục" class="mt-1">
        <ManageCategory v-if="activeTab == 2" />
      </CTab>
      <CTab title="Phân bổ vốn" class="mt-1">
        <CapitalAllocation v-if="activeTab == 3" />
      </CTab>
    </CTabs>
    <NewsRelated
      :mack="list_mack_unique_of_data_trading"
      v-if="activeTab == 0 || activeTab == 1"
    />
  </div>
</template>

<script>
import TradingLog from "@/views/TradingLog.vue";
import ProfitLoss from "@/views/ProfitLoss.vue";
import ManageCategory from "@/views/ManageCategory.vue";
import CapitalAllocation from "@/views/CapitalAllocation.vue";
import NewsRelated from "@/views/pages/NewsRelated";
import axios from "axios";

export default {
  name: "TabTradingLog",
  data() {
    let data_return = {
      activeTab: 0,
      is_interval: true,
      connection: null,
    };
    return data_return;
  },
  components: {
    TradingLog,
    ProfitLoss,
    ManageCategory,
    NewsRelated,
    CapitalAllocation
  },
  methods: {
    clickTab(event) {
      this.activeTab = event;
    },
    updateDataEOD() {
      let self = this;
      if (self.list_mack_unique_of_data_trading.length == 0) return;
      axios
        // .get(self.$apiAdress + "/api/stocks/dashboard/get-data-eod-by-mack", {
        // 
        .get("https://ta.kungfustockspro.live:2083/getlive", {
          params: {
            mack: self.list_mack_unique_of_data_trading,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          const rs = res.data;
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
            self.$store.state.data_eod[stockcode] = item;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getDataRealtimeEOD() {
      this.connection.onmessage = function (event) {
        console.log(event);
      };
    },
  },
  created() {
    // this.updateDataEOD();
    // setInterval(() => {
    //   const offset = 7;
    //   let date = new Date(new Date().getTime() + offset * 3600 * 1000);
    //   let hour = date.getUTCHours();
    //   let day = date.getDay();
    //   let minute = date.getUTCMinutes();
    //   if (day <= 5 && hour >= 8 && hour <= 15) {
    //     if (hour == 8 || hour == 11 || hour == 12 || hour == 15) {
    //       if (hour == 8) {
    //         if (minute >= 55) {
    //           if (this.is_interval) {
    //             this.updateDataEOD();
    //           }
    //         }
    //       } else if (hour == 11) {
    //         if (minute <= 35) {
    //           if (this.is_interval) {
    //             this.updateDataEOD();
    //           }
    //         }
    //       } else if (hour == 12) {
    //         if (minute >= 55) {
    //           if (this.is_interval) {
    //             this.updateDataEOD();
    //           }
    //         }
    //       } else if (hour == 15) {
    //         if (minute <= 5) {
    //           if (this.is_interval) {
    //             this.updateDataEOD();
    //           }
    //         }
    //       }
    //     } else {
    //       if (this.is_interval) {
    //         this.updateDataEOD();
    //       }
    //     }
    //   }
    // }, 4000);
    // setInterval(() => {
    //   this.$socket.emit('getlive', this.data_mack);
    // }, 2000);
  },
  beforeDestroy() {
    this.is_interval = false;
  },
  computed: {
    data_mack() {
      let data_return = [];
      if (this.$store.state.data_trading_log.length > 0) {
        for (const item of this.$store.state.data_trading_log) {
          if (!data_return.includes(item.mack)) {
            data_return.push(item.mack);
          }
        }
      }
      return data_return;
    },
    data_trading_log() {
      let data_return = [];
      if (this.$store.state.data_trading_log.length > 0) {
        let data_trading_temp = [...this.$store.state.data_trading_log];
        let data_trading_temp_filtered = [];
        let data_trading_temp_filtered_item = { ...data_trading_temp[0] };
        for (let item of data_trading_temp) {
          if (data_trading_temp_filtered_item.danh_muc != item.danh_muc) {
            let temp_table_filter_by_time_mack = [];
            let mack_filter_time = data_trading_temp_filtered[0].mack;
            for (let item of data_trading_temp_filtered) {
              if (item.mack != mack_filter_time) {
                let tong_khoi_luong_mua = 0;
                let tong_khoi_luong_ban = 0;
                let tong_gia_tri_dau_tu = 0;
                let tong_khoi_luong = 0;
                let gia_trung_binh = 0;
                for (let item of temp_table_filter_by_time_mack) {
                  if (item.loai_giao_dich == "mua") {
                    tong_khoi_luong_mua += parseFloat(item.khoi_luong);
                    tong_khoi_luong += parseFloat(item.khoi_luong);
                    tong_gia_tri_dau_tu +=
                      item.khoi_luong *
                      item.gia_thuc_hien *
                      (1 + item.phi / 100);
                    gia_trung_binh =
                      tong_khoi_luong != 0
                        ? tong_gia_tri_dau_tu / tong_khoi_luong
                        : 0;
                  }
                  if (item.loai_giao_dich == "ban") {
                    tong_khoi_luong_ban += parseFloat(item.khoi_luong);
                    tong_khoi_luong -= parseFloat(item.khoi_luong);
                    tong_gia_tri_dau_tu = gia_trung_binh * tong_khoi_luong;
                    gia_trung_binh =
                      tong_khoi_luong != 0
                        ? tong_gia_tri_dau_tu / tong_khoi_luong
                        : 0;
                  }
                }
                data_return.push({
                  change: 0,
                  danh_muc: temp_table_filter_by_time_mack[0].danh_muc,
                  lastprice: 0,
                  mack: temp_table_filter_by_time_mack[0].mack,
                  perchange: 0,
                  tong_khoi_luong: tong_khoi_luong,
                  tong_gia_tri_dau_tu: tong_gia_tri_dau_tu,
                  tong_khoi_luong_ban: tong_khoi_luong_ban,
                  tong_khoi_luong_mua: tong_khoi_luong_mua,
                  gia_trung_binh: gia_trung_binh,
                });

                mack_filter_time = item.mack;
                temp_table_filter_by_time_mack = [];
              }
              temp_table_filter_by_time_mack.push(item);
            }
            let tong_khoi_luong_mua = 0;
            let tong_khoi_luong_ban = 0;
            let tong_gia_tri_dau_tu = 0;
            let tong_khoi_luong = 0;
            let gia_trung_binh = 0;
            for (let item of temp_table_filter_by_time_mack) {
              if (item.loai_giao_dich == "mua") {
                tong_khoi_luong_mua += parseFloat(item.khoi_luong);
                tong_khoi_luong += parseFloat(item.khoi_luong);
                tong_gia_tri_dau_tu +=
                  item.khoi_luong * item.gia_thuc_hien * (1 + item.phi / 100);
                gia_trung_binh =
                  tong_khoi_luong != 0
                    ? tong_gia_tri_dau_tu / tong_khoi_luong
                    : 0;
              }
              if (item.loai_giao_dich == "ban") {
                tong_khoi_luong_ban += parseFloat(item.khoi_luong);
                tong_khoi_luong -= parseFloat(item.khoi_luong);
                tong_gia_tri_dau_tu = gia_trung_binh * tong_khoi_luong;
                gia_trung_binh =
                  tong_khoi_luong != 0
                    ? tong_gia_tri_dau_tu / tong_khoi_luong
                    : 0;
              }
            }
            data_return.push({
              change: 0,
              danh_muc: temp_table_filter_by_time_mack[0].danh_muc,
              lastprice: 0,
              mack: temp_table_filter_by_time_mack[0].mack,
              perchange: 0,
              tong_khoi_luong: tong_khoi_luong,
              tong_gia_tri_dau_tu: tong_gia_tri_dau_tu,
              tong_khoi_luong_ban: tong_khoi_luong_ban,
              tong_khoi_luong_mua: tong_khoi_luong_mua,
              gia_trung_binh: gia_trung_binh,
            });
            data_trading_temp_filtered = [];
          }
          data_trading_temp_filtered_item = item;
          data_trading_temp_filtered.push({
            ...data_trading_temp_filtered_item,
          });
        }
        let temp_table_filter_by_time_mack = [];
        let mack_filter_time = data_trading_temp_filtered[0].mack;
        for (let item of data_trading_temp_filtered) {
          if (item.mack != mack_filter_time) {
            let tong_khoi_luong_mua = 0;
            let tong_khoi_luong_ban = 0;
            let tong_gia_tri_dau_tu = 0;
            let tong_khoi_luong = 0;
            let gia_trung_binh = 0;
            for (let item of temp_table_filter_by_time_mack) {
              if (item.loai_giao_dich == "mua") {
                tong_khoi_luong_mua += parseFloat(item.khoi_luong);
                tong_khoi_luong += parseFloat(item.khoi_luong);
                tong_gia_tri_dau_tu +=
                  item.khoi_luong * item.gia_thuc_hien * (1 + item.phi / 100);
                gia_trung_binh =
                  tong_khoi_luong != 0
                    ? tong_gia_tri_dau_tu / tong_khoi_luong
                    : 0;
              }
              if (item.loai_giao_dich == "ban") {
                tong_khoi_luong_ban += parseFloat(item.khoi_luong);
                tong_khoi_luong -= parseFloat(item.khoi_luong);
                tong_gia_tri_dau_tu = gia_trung_binh * tong_khoi_luong;
                gia_trung_binh =
                  tong_khoi_luong != 0
                    ? tong_gia_tri_dau_tu / tong_khoi_luong
                    : 0;
              }
            }
            data_return.push({
              change: 0,
              danh_muc: temp_table_filter_by_time_mack[0].danh_muc,
              lastprice: 0,
              mack: temp_table_filter_by_time_mack[0].mack,
              perchange: 0,
              tong_khoi_luong: tong_khoi_luong,
              tong_gia_tri_dau_tu: tong_gia_tri_dau_tu,
              tong_khoi_luong_ban: tong_khoi_luong_ban,
              tong_khoi_luong_mua: tong_khoi_luong_mua,
              gia_trung_binh: gia_trung_binh,
            });

            mack_filter_time = item.mack;
            temp_table_filter_by_time_mack = [];
          }
          temp_table_filter_by_time_mack.push(item);
        }
        let tong_khoi_luong_mua = 0;
        let tong_khoi_luong_ban = 0;
        let tong_gia_tri_dau_tu = 0;
        let tong_khoi_luong = 0;
        let gia_trung_binh = 0;
        for (let item of temp_table_filter_by_time_mack) {
          if (item.loai_giao_dich == "mua") {
            tong_khoi_luong_mua += parseFloat(item.khoi_luong);
            tong_khoi_luong += parseFloat(item.khoi_luong);
            tong_gia_tri_dau_tu +=
              item.khoi_luong * item.gia_thuc_hien * (1 + item.phi / 100);
            gia_trung_binh =
              tong_khoi_luong != 0 ? tong_gia_tri_dau_tu / tong_khoi_luong : 0;
          }
          if (item.loai_giao_dich == "ban") {
            tong_khoi_luong_ban += parseFloat(item.khoi_luong);
            tong_khoi_luong -= parseFloat(item.khoi_luong);
            tong_gia_tri_dau_tu = gia_trung_binh * tong_khoi_luong;
            gia_trung_binh =
              tong_khoi_luong != 0 ? tong_gia_tri_dau_tu / tong_khoi_luong : 0;
          }
        }
        data_return.push({
          change: 0,
          danh_muc: temp_table_filter_by_time_mack[0].danh_muc,
          lastprice: 0,
          mack: temp_table_filter_by_time_mack[0].mack,
          perchange: 0,
          tong_khoi_luong: tong_khoi_luong,
          tong_gia_tri_dau_tu: tong_gia_tri_dau_tu,
          tong_khoi_luong_ban: tong_khoi_luong_ban,
          tong_khoi_luong_mua: tong_khoi_luong_mua,
          gia_trung_binh: gia_trung_binh,
        });
      }
      return data_return;
    },
    list_mack_unique_of_data_trading() {
      let return_data = [];
      if (this.data_trading_log.length > 0) {
        for (const item of this.data_trading_log) {
          if (!return_data.includes(item.mack) && item.tong_khoi_luong > 0) {
            return_data.push(item.mack);
          }
        }
      }
      return return_data;
    },
  },
};
</script>
<style lang="scss">
.datatable-trading-log {
  .table {
    td {
      padding: 0.15rem 0.75rem !important;
    }
  }
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
</style>
