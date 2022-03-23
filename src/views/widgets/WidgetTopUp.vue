<template>
  <CCard>
    <CCardHeader class="title-block">
      <div class="d-flex justify-content-between">
        <div class="pt-1 pl-2">
          <span class="font-weight-bold h5"
            >Top tăng mạnh nhất</span
          >
        </div>
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
      <div>
        <div class="top-change-percent">
          <template v-for="(item, index) in item_table">
            <div :style="{ 'background-color': item.color }" :key="index" style="cursor: pointer" @click="showModalTradingChart(item.stockcode)">
              <span>{{ item.stockcode }}</span
              ><span>{{ formatMoney(item.perchange, 0, 2) }}%</span>
            </div>
          </template>
        </div>
      </div>
    </CCardBody>
  </CCard>
</template>
<script>
export default {
  name: "WidgetTopUp",
  props: {
    data_item: Array,
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
      data_color: [
        "rgb(60, 220, 150)",
        "rgba(60, 220, 150, 0.937)",
        "rgba(60, 220, 150, 0.514)",
        "rgba(60, 220, 150, 0.447)",
        "rgba(60, 220, 150, 0.255)",
        "rgba(60, 220, 150, 0.224)",
        "rgba(60, 220, 150, 0.208)",
        "rgba(60, 220, 150, 0.173)",
        "rgba(60, 220, 150, 0.173)",
        "rgba(60, 220, 150, 0.1)",
      ],
      data_filter_type: "month",
      option_filter_type: [
        {
          value: "week",
          label: "Tuần",
        },
        {
          value: "month",
          label: "Tháng",
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
    };
  },
  computed: {
    item_table() {
      let return_data = [];
      if (this.data_item.length > 0) {
        return_data = this.data_item.map((item, index) => {
          return { ...item, color: this.data_color[index] };
        });
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
    getBgColorByChangeValue(newVal, oldVal) {
      if (newVal < oldVal) return "downchange";
      else if (newVal > oldVal) return "upchange";
      else return "nochange";
    },
    getColorByChangeValue(perchange) {
      perchange = parseFloat(perchange);
      if (perchange > 0) return "stock-perchange-up";
      else return "stock-perchange-down";
    },
  },
  watch: {
    data_filter_type: {
      handler() {
        this.$emit("updatedTypeDateTopUp", this.data_filter_type);
      },
    },
    data_filter_type_board: {
      handler() {
        this.$emit("updatedTypeBoardTopUp", this.data_filter_type_board);
      },
    },
  },
};
</script>
<style lang="scss">
.top-change-percent {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  height: 120px;
  width: 100%;
  > div {
    width: calc(100% / 5 - 4px);
    height: calc(100% / 2 - 3px);
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin-right: 5px;
    margin-bottom: 5px;
    border-radius: 5px;
    &:nth-child(5n + 0) {
      margin-right: 0;
    }
    span {
      &:first-child {
        font-weight: 700;
      }
      &:last-child {
        font-size: 10px;
        color: #fff !important;
        background-color: rgba(59, 63, 80, 0.35);
        padding: 0 3px;
        font-weight: 700;
        border-radius: 3px;
      }
    }
  }
}
</style>
