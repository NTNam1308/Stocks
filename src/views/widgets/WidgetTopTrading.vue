<template>
 <div>
  <CCard>
    <CCardHeader class="title-block">
      <div class="d-flex justify-content-between">
        <div class="pt-1 pl-2">
          <span class="font-weight-bold h5"
            >Top Khối lượng Giao dịch Nước ngoài</span
          >
        </div>
        <CSelect
          :value.sync="data_filter_type"
          :options="option_filter_type"
          class="mb-0"
        >
        </CSelect>
      </div>
    </CCardHeader>
    <CCardBody class="p-2">
      <div class="bg-tt table-top-trade">
        <div class="position-relative table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th
                  class="position-relative pr-4 border-right"
                  style="
                    vertical-align: middle;
                    overflow: hidden;
                    cursor: pointer;
                    min-width: 50px;
                    text-align: center;
                    color: #3cdc96;
                  "
                  colspan="2"
                >
                  Mua
                </th>
                <th
                  class="position-relative pr-4"
                  style="
                    vertical-align: middle;
                    overflow: hidden;
                    cursor: pointer;
                    min-width: 50px;
                    text-align: center;
                    color: #ff5858;
                  "
                  colspan="2"
                >
                  Bán
                </th>
              </tr>
            </thead>
            <tbody class="position-relative">
              <tr v-for="(item, index) in item_table" :key="index">
                <td class="verticle-align">
                  <div class="d-flex justify-content-end">
                    <span class="ml-1">{{
                      formatMoney(item.value_buy, 0, 0)
                    }}</span>
                    <div
                      class="progress-bg-color-up ml-1"
                      :style="{ width: item.width_progress_buy + '%' }"
                    ></div>
                  </div>
                </td>
                <td
                  class="border-right"
                  style="
                    padding-left: 0 !important;
                    padding-right: 0 !important;
                    text-align: center;
                    width: 15%;
                  "
                  @click="showModalTradingChart(item.stock_buy)"
                >
                <CLink
                data-toggle="tooltip" data-placement="bottom" :title="item.ten_cong_ty_buy"
                >
                  <b>
                    {{ item.stock_buy }}
                  </b>
                </CLink>
                </td>
                <td
                  style="
                    padding-right: 0 !important;
                    text-align: center;
                    width: 15%;
                  "
                  @click="showModalTradingChart(item.stock_sell)"
                ><CLink
                data-toggle="tooltip" data-placement="bottom" :title="item.ten_cong_ty_sell"
                >
                  <b>
                    {{ item.stock_sell }}
                  </b>
                </CLink>
                </td>
                <td class="verticle-align">
                  <div class="d-flex justify-content-start">
                    <div
                      class="progress-bg-color-down mr-1"
                      :style="{ width: item.width_progress_sell + '%' }"
                    ></div>
                    <span>{{ formatMoney(item.value_sell, 0, 0) }}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </CCardBody>
  </CCard>
   <div v-show="activeCompany" id="alertNameCompany1">
      {{  nameCompany }}
    </div>
    </div>
</template>
<script>

export default {
  name: "WidgetTopTrading",
  props: {
    limit_row: {
      default: 10,
      type: Number,
    },
    data_top_buy: Array,
    data_top_sell: Array,
  },
  data() {
    return {
      activeCompany: false,
      nameCompany: '',
      data_eod_fields: [
        { key: "buy", _style: "min-width:50px", label: "Mua" },
        { key: "sell", _style: "min-width:50px", label: "Bán" },
      ],
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
      ],
      data_filter_type: 1
    };
  },
  created() {},
  computed: {
    item_table() {
      let self = this;
      let return_data = [];
      if (this.data_top_buy.length > 0 && this.data_top_sell.length > 0 && Object.keys(this.$store.state.list_mack_company).length > 0 ) {
        const max_buy = this.data_top_buy[0].value_buy;
        const max_sell = this.data_top_sell[0].value_sell;
        return_data = this.data_top_buy.map((item, index) => {
          const item_sell = this.data_top_sell[index];
          return {
            value_buy: item.value_buy,
            stock_buy: item.stockcode,
            ten_cong_ty_buy: this.$store.state.list_mack_company.hasOwnProperty(item.stockcode) ? this.$store.state.list_mack_company[item.stockcode].ten_cong_ty : "",
            width_progress_buy:
              (parseFloat(item.value_buy) / parseFloat(max_buy)) * 100,
            value_sell: item_sell.value_sell,
            stock_sell: item_sell.stockcode,
            ten_cong_ty_sell: this.$store.state.list_mack_company.hasOwnProperty(item.stockcode) ? this.$store.state.list_mack_company[item_sell.stockcode].ten_cong_ty : "",
            width_progress_sell:
              (parseFloat(item_sell.value_sell) / parseFloat(max_sell)) * 100,
          };
        });
      }
      return return_data;
    },
  },
   watch: {
    data_filter_type: {
      handler() {
        this.$emit("updatedTypeDateTopTrading", this.data_filter_type);
      },
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
  mouseOver: function(event, nameCompany){
      let self = this;
      document.getElementById('alertNameCompany1').style.position = 'absolute';
      self.nameCompany = nameCompany;
      document.getElementById('alertNameCompany1').style.left = (event.pageX)  + "px";
      document.getElementById('alertNameCompany1').style.top =  (event.pageY) + "px";
      self.activeCompany = true; 
    },
  mouseleave: function(){
      let self = this;
      self.activeCompany = false; 
    },
  },
};
</script>
<style lang="scss">
.table-top-trade {
  td {
    padding: 0.25rem 0.5rem !important;
  }
  th {
    padding: 0.25rem 0.5rem !important;
  }
  .progress-bg-color-up {
    height: 4px;
    background-color: #009900;
    margin-top: 0.6rem;
    border-radius: 5px;
  }
  .progress-bg-color-down {
    height: 4px;
    background-color: rgb(255, 0, 23);
    margin-top: 0.6rem;
    border-radius: 5px;
  }
  .verticle-align {
    vertical-align: middle;
  }
}
#alertNameCompany1{
  position: absolute;
  color: white;
  border-radius: 10px;
  background: rgb(230, 173, 29);
  text-align: center;
}
@media  (max-width: 768px) {
  #alertNameCompany1{
      width: 40%;
  }
}
@media screen and (min-width: 768px) and (max-width: 1000px){
  #alertNameCompany1{
      width: 30%;
  }
}
@media screen  and (max-width: 1388px){
  .btn-add-wl{
      width: 80px;
  }
}
@media  (min-width: 1000px) {
  #alertNameCompany1{
      width: 50%;
  }
}
</style>
