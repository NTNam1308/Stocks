<template>
  <div style="height: 100%">
    <CCard style="min-height: 95%">
      <CCardHeader class="title-block">
        <div class="d-flex justify-content-between">
          <p class="font-weight-bold h5 pt-1 pl-2">Biến động giá</p>
          <div class="d-flex justify-content-between">
            <CSelect
              :value.sync="data_filter_type_board"
              :options="option_filter_type_board"
              class="mb-0"
            >
            </CSelect>
            <CSelect
              :value.sync="data_filter_type"
              :options="option_filter_type"
              class="mb-0 ml-2"
            >
            </CSelect>
          </div>
        </div>
      </CCardHeader>
      <CCardBody class="p-2">
        <CDataTable
          :items="item_table"
          :fields="data_eod_fields"
          hover
          class="bg-tt table-market-vovatility"
        >
          <template #no-items-view>
            <p class="text-center h5">Chưa có dữ liệu</p>
          </template>
          <template #lastprice="{ item }">
            <td :class="$function_global.getClassTextColorFromCL(item.cl)">
              <transition
                :name="$function_global.getAnimationNameFromCL(item.cl)"
                mode="out-in"
              >
                <span :key="item.change">
                  {{ formatMoney(item.lastprice / 1000, 0, 1) }}
                </span>
              </transition>
            </td>
          </template>
          <template #stockcode="{ item }">
            <td @click="showModalTradingChart(item.stockcode)">
              <CLink
                data-toggle="tooltip"
                data-placement="bottom"
                :title="item.ten_cong_ty"
              >
                <b>{{ item.stockcode }}</b>
              </CLink>
            </td>
          </template>
          <template #perchange="{ item }">
            <td :class="$function_global.getClassTextColorFromCL(item.cl)">
              <transition
                :name="$function_global.getAnimationNameFromCL(item.cl)"
                mode="out-in"
              >
                <span :key="item.change">
                  {{
                    `${formatMoney(item.change, 0, 1)} (${formatMoney(
                      item.perchange,
                      0,
                      1
                    )}%)`
                  }}
                </span>
              </transition>
            </td>
          </template>
          <template #totalvol="{ item }">
            <td>
              <transition name="nochange" mode="out-in">
                <span :key="item.totalvol">
                  {{ formatMoney(item.totalvol, 0, 0) }}
                </span>
              </transition>
            </td>
          </template>
        </CDataTable>
      </CCardBody>
    </CCard>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "WidgetMarketVolatility",
  props: {
    limit_row: {
      default: 10,
      type: Number,
    },
  },
  data() {
    return {
      data_eod_fields: [
        { key: "stockcode", _style: "min-width:50px", label: "Mã CK" },
        { key: "lastprice", _style: "min-width:50px", label: "Giá" },
        { key: "perchange", _style: "min-width:50px", label: "Thay đổi" },
        { key: "totalvol", _style: "min-width:50px", label: "Tổng KL" },
      ],
      data_filter_type: "perchange_desc",
      activeCompany: false,
      nameCompany: "",
      option_filter_type: [
        {
          value: "perchange_desc",
          label: "%Tăng",
        },
        {
          value: "perchange_asc",
          label: "%Giảm",
        },
        {
          value: "change_desc",
          label: "Tăng",
        },
        {
          value: "change_asc",
          label: "Giảm",
        },
        {
          value: "volume_desc",
          label: "Khối lượng",
        },
      ],
      option_filter_type_board: [
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
      data_filter_type_board: 1,
      list_mack: [],
    };
  },
  created() {
    this.getListMack();
  },
  computed: {
    item_table() {
      let return_data = [];
      if (
        Object.keys(this.$store.state.data_eod).length > 0 &&
        Object.keys(this.$store.state.list_mack_company).length > 0
      ) {
        for (const item of this.list_mack) {
          return_data.push({
            ...this.$store.state.data_eod[item],
            ten_cong_ty: this.$store.state.list_mack_company.hasOwnProperty(
              item
            )
              ? this.$store.state.list_mack_company[item].ten_cong_ty
              : "",
          });
        }
      }
      return return_data;
    },
  },
  methods: {
    showModalTradingChart(mack) {
      this.$store.state.mackTradingChart = mack;
      this.$store.state.isShowModalTradingChart = true;
    },
    formatMoney(number, min, max) {
      number = parseFloat(number);
      return number.toLocaleString("en", {
        minimumFractionDigits: min,
        maximumFractionDigits: max,
      });
    },
    getListMack() {
      let self = this;
      axios
        .get(
          self.$apiAdress +
            "/api/stocks/dashboard/get-list-mack-market-volatility",
          {
            params: {
              type: self.data_filter_type,
              board: self.data_filter_type_board,
              limit: self.limit_row,
              token: localStorage.getItem("api_token"),
            },
          }
        )
        .then((res) => {
          self.list_mack = res.data;
          self.$emit("updateListMackVolatility", self.list_mack);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  watch: {
    data_filter_type: {
      handler() {
        this.getListMack();
      },
    },
    data_filter_type_board: {
      handler() {
        this.getListMack();
      },
    },
  },
};
</script>
<style lang="scss">
.table-market-vovatility {
  td {
    padding: 0.25rem 0.5rem !important;
  }
  th {
    padding: 0.25rem 0.5rem !important;
  }
}
.font-size-12 {
  font-size: 12px;
}
.tooltip-inner {
  color: white;
  border-radius: 10px;
  background: rgb(230, 173, 29);
  text-align: center;
}
</style>
