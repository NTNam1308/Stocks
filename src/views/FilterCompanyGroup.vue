<template>
  <CRow>
    <CCol col="12" xl="12">
      <transition name="slide">
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol col="12" xl="2">
                <CSelect
                  label="Nhóm"
                  :value.sync="company_group"
                  :options="options_company_group"
                />
              </CCol>
              <CCol col="12" xl="2">
                <CSelect
                  label="Quý"
                  :value.sync="quarter"
                  :options="options_quarter"
                />
              </CCol>
              <CCol col="12" xl="2">
                <label for="">Năm</label>
                <CInput
                  type="number"
                  min="1900"
                  max="2099"
                  step="1"
                  :value.sync="year"
                />
              </CCol>
              <CCol col="12" xl="2">
                <CCallout color="info">
                  Số lượng mã<br />
                  <strong class="h4">{{ lengthMack }}</strong>
                </CCallout>
              </CCol>
              <CCol col="12" xl="4">
                <JsonExcel
                  :data="itemExportExcel"
                  :fields="fieldExportExcel"
                  :name="today"
                  class="float-right"
                  style="padding-top: 28px"
                >
                  <CButton color="success">
                    <svg
                      fill="#fff"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 50 50"
                      width="20px"
                      height="20px"
                    >
                      <path
                        d="M 28.875 0 C 28.855469 0.0078125 28.832031 0.0195313 28.8125 0.03125 L 0.8125 5.34375 C 0.335938 5.433594 -0.0078125 5.855469 0 6.34375 L 0 43.65625 C -0.0078125 44.144531 0.335938 44.566406 0.8125 44.65625 L 28.8125 49.96875 C 29.101563 50.023438 29.402344 49.949219 29.632813 49.761719 C 29.859375 49.574219 29.996094 49.296875 30 49 L 30 44 L 47 44 C 48.09375 44 49 43.09375 49 42 L 49 8 C 49 6.90625 48.09375 6 47 6 L 30 6 L 30 1 C 30.003906 0.710938 29.878906 0.4375 29.664063 0.246094 C 29.449219 0.0546875 29.160156 -0.0351563 28.875 0 Z M 28 2.1875 L 28 6.53125 C 27.867188 6.808594 27.867188 7.128906 28 7.40625 L 28 42.8125 C 27.972656 42.945313 27.972656 43.085938 28 43.21875 L 28 47.8125 L 2 42.84375 L 2 7.15625 Z M 30 8 L 47 8 L 47 42 L 30 42 L 30 37 L 34 37 L 34 35 L 30 35 L 30 29 L 34 29 L 34 27 L 30 27 L 30 22 L 34 22 L 34 20 L 30 20 L 30 15 L 34 15 L 34 13 L 30 13 Z M 36 13 L 36 15 L 44 15 L 44 13 Z M 6.6875 15.6875 L 12.15625 25.03125 L 6.1875 34.375 L 11.1875 34.375 L 14.4375 28.34375 C 14.664063 27.761719 14.8125 27.316406 14.875 27.03125 L 14.90625 27.03125 C 15.035156 27.640625 15.160156 28.054688 15.28125 28.28125 L 18.53125 34.375 L 23.5 34.375 L 17.75 24.9375 L 23.34375 15.6875 L 18.65625 15.6875 L 15.6875 21.21875 C 15.402344 21.941406 15.199219 22.511719 15.09375 22.875 L 15.0625 22.875 C 14.898438 22.265625 14.710938 21.722656 14.5 21.28125 L 11.8125 15.6875 Z M 36 20 L 36 22 L 44 22 L 44 20 Z M 36 27 L 36 29 L 44 29 L 44 27 Z M 36 35 L 36 37 L 44 37 L 44 35 Z"
                      />
                    </svg>
                    Xuất File Excel
                  </CButton>
                </JsonExcel>
              </CCol>
              <!-- /.export excel -->
            </CRow>
          </CCardHeader>
          <!-- /.header filter -->
          <CCardHeader>
            <CRow>
              <CCol xl="2">
                <CSelect
                  label="Gen theo"
                  :value.sync="data_filter_gen"
                  :options="options_filter_gen"
                />
              </CCol>
              <CCol xl="2" v-if="data_filter_gen == 'nhom'">
                <CSelect
                  label="Nhóm"
                  :value.sync="data_filter_type_stock"
                  :options="options_filter_type_stock"
                />
              </CCol>
              <CCol xl="2" v-if="data_filter_gen == 'mack'">
                <label>Danh sách mã</label>
                <multiselect
                  v-model="list_mack_selected"
                  selectLabel="Nhấn enter để chọn mã"
                  deselectLabel="Nhấn enter để xóa mã"
                  placeholder="Nhập Mã CK"
                  label="mack"
                  track-by="mack"
                  :options="option_list_mack"
                  :multiple="true"
                  :taggable="true"
                  @tag="addMack"
                ></multiselect>
              </CCol>
              <CCol xl="6">
                <CButton
                  color="primary"
                  class="mt-4"
                  :disabled="is_loading_4m"
                  @click="handleButton4MClick"
                >
                  <CSpinner color="success" size="sm" v-if="is_loading_4m" />
                  <span class="pl-2">GEN điểm 4M</span>
                </CButton>
                <CButton
                  color="primary"
                  class="ml-2 mt-4"
                  :disabled="is_loading_canslim"
                  @click="handleButtonCanslimClick"
                  ><CSpinner
                    color="success"
                    size="sm"
                    v-if="is_loading_canslim"
                  /><span class="pl-2">GEN điểm Canslim</span></CButton
                >
                <CButton
                  color="primary"
                  class="ml-2 mt-4"
                  :disabled="is_loading_compare"
                  @click="handleButtonCompareClick"
                  ><CSpinner
                    color="success"
                    size="sm"
                    v-if="is_loading_compare"
                  /><span class="pl-2">GEN So sánh</span></CButton
                >
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardHeader>
            <CDataTable
              sorter
              hover
              striped
              :items="items_test"
              :fields="fields"
              :tableFilter="{ label: 'Mã CK', placeholder: 'Nhập Mã CK' }"
              :itemsPerPageSelect="{
                label: 'Số lượng:',
                values: [20, 50, 100],
              }"
              :items-per-page="perPage"
              pagination
            >
              <template #mack="{ item }">
                <td>
                  {{ item.mack }}
                </td>
              </template>
              <template #thoigian="{ item }">
                <td>
                  {{ item.thoigian }}
                </td>
              </template>
              <template #nhom="{ item }">
                <td>
                  {{ item.nhom }}
                </td>
              </template>
            </CDataTable>
          </CCardHeader>
          <!-- /.table -->
        </CCard>
      </transition>
    </CCol>
  </CRow>
</template>

<script>
import axios from "axios";
import JsonExcel from "vue-json-excel";
import moment from "moment";
import Multiselect from "vue-multiselect";

export default {
  name: "Users",
  components: {
    JsonExcel,
    Multiselect,
  },
  data: () => {
    return {
      year: 2021,
      options_filter_gen: [
        { value: "nhom", label: "Nhóm" },
        { value: "mack", label: "Mã CK" },
      ],
      data_filter_gen: "nhom",
      options_filter_type_stock: [
        { value: "stock", label: "Stock" },
        { value: "bank", label: "Bank" },
        { value: "nonbank", label: "NonBank" },
        { value: "insurance", label: "Insurance" },
        { value: "", label: "Tất cả" },
      ],
      data_filter_type_stock: "stock",
      options_company_group: [
        { value: "all", label: "Tất cả" },
        { value: "stock", label: "Stock" },
        { value: "bank", label: "Bank" },
        { value: "nonbank", label: "NonBank" },
        { value: "insurance", label: "Insurance" },
      ],
      company_group: "all",
      options_quarter: [
        { value: "Q1", label: "Q1" },
        { value: "Q2", label: "Q2" },
        { value: "Q3", label: "Q3" },
        { value: "Q4", label: "Q4" },
      ],
      quarter: "Q1",
      type: "bs",

      items_test: [],
      fields: [
        { key: "mack", _style: "width:32%", label: "Mã" },
        { key: "thoigian", _style: "width:33%", label: "Thời Gian" },
        { key: "nhom", _style: "width:33%", label: "Nhóm" },
      ],
      perPage: 20,
      lengthMack: 0,
      today: "Danh sách thống kê " + new Date().toLocaleDateString("en-CA"),
      is_loading_4m: false,
      is_loading_canslim: false,
      is_loading_compare: false,
      list_mack_selected: [],
    };
  },

  created() {
    this.year = moment().year();
    this.getQuater();
    this.filterGroupBank();
  },
  methods: {
    handleButton4MClick() {
      this.is_loading_4m = true;
      let mack = [];
      let type_stock = "";
      if(this.data_filter_gen == "nhom"){
        type_stock = this.data_filter_type_stock;
      }else if(this.data_filter_gen == "mack"){
        if(this.list_mack_selected.length == 0){
          this.$toast.error("Danh sách các mã đang để trống");
          this.is_loading_4m = false;
          return;
        }
        mack = this.list_mack_selected.map(item => item.mack);
      }
      axios
        .get(this.$apiAdress + "/api/stocks/generate", {
          params: {
            mack: mack,
            type_stock: type_stock,
            type_gen: "4m",
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          this.$toast.success(res.data.msg);
          this.is_loading_4m = false;
        })
        .catch((err) => {
          console.error(err);
          this.$toast.error("Có lỗi xảy ra khi GEN điểm 4M");
          this.is_loading_4m = false;
        });
    },
    handleButtonCanslimClick() {
      this.is_loading_canslim = true;
      let mack = [];
      let type_stock = "";
      if(this.data_filter_gen == "nhom"){
        type_stock = this.data_filter_type_stock;
      }else if(this.data_filter_gen == "mack"){
        if(this.list_mack_selected.length == 0){
          this.$toast.error("Danh sách các mã đang để trống");
          this.is_loading_canslim = false;
          return;
        }
        mack = this.list_mack_selected.map(item => item.mack);
      }
      axios
        .get(this.$apiAdress + "/api/stocks/generate", {
          params: {
            mack: mack,
            type_stock: type_stock,
            type_gen: "canslim",
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          this.$toast.success(res.data.msg);
          this.is_loading_canslim = false;
        })
        .catch((err) => {
          console.error(err);
          this.$toast.error("Có lỗi xảy ra khi GEN điểm CANSLIM");
          this.is_loading_canslim = false;
        });
    },
    handleButtonCompareClick() {
      this.is_loading_compare = true;
      this.is_loading_compare = true;
      let mack = [];
      let type_stock = "";
      if(this.data_filter_gen == "nhom"){
        type_stock = this.data_filter_type_stock;
      }else if(this.data_filter_gen == "mack"){
        if(this.list_mack_selected.length == 0){
          this.$toast.error("Danh sách các mã đang để trống");
          this.is_loading_compare = false;
          return;
        }
        mack = this.list_mack_selected.map(item => item.mack);
      }
      axios
        .get(this.$apiAdress + "/api/stocks/generate", {
          params: {
            mack: mack,
            type_stock: type_stock,
            type_gen: "compare",
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          this.$toast.success(res.data.msg);
          this.is_loading_compare = false;
        })
        .catch((err) => {
          console.error(err);
          this.$toast.error("Có lỗi xảy ra khi GEN SO SÁNH");
          this.is_loading_compare = false;
        });
    },
    addMack(mack) {
      // this.options.push(tag)
      this.list_mack_selected.push(mack);
    },
    getQuater() {
      var currentQuarter = moment().quarter();
      if (currentQuarter == 1) {
        currentQuarter = 4;
      } else {
        currentQuarter -= 1;
      }
      var result = "Q" + currentQuarter;
      this.quarter = result;
    },
    filterGroupBank() {
      let self = this;
      axios
        .get(this.$apiAdress + "/api/stocks/filter-company-group", {
          params: {
            type: self.type,
            company_group: self.company_group,
            year: self.year,
            quarter: self.quarter,
            token: localStorage.getItem("api_token"),
          },
        })
        .then(function (response) {
          self.items_test = response.data;
          self.lengthMack = response.data.length;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  computed: {
    option_list_mack() {
      let return_data = [];
      return_data = this.$store.state.list_mack.map((item) => {
        return {
          mack: item.mack,
          nganh: item.nganh,
        };
      });
      return_data.sort(function (a, b) {
        return a.mack.localeCompare(b.mack);
      });
      return return_data;
    },
    fieldExportExcel() {
      return {
        Mã: "mack",
        "Thời gian": "thoigian",
        Nhóm: "nhom",
      };
    },
    itemExportExcel() {
      let return_data = [];
      if (this.items_test.length > 0) {
        return_data = this.items_test.map((item) => {
          return {
            mack: item.mack,
            thoigian: item.thoigian,
            nhom: item.nhom,
          };
        });
      }
      return return_data;
    },
  },
  watch: {
    company_group: function () {
      this.filterGroupBank();
    },
    quarter: function () {
      this.filterGroupBank(this.quarter);
    },
    year: function () {
      this.filterGroupBank();
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
.c-dark-theme {
  .multiselect__tags {
    border: 1px solid rgba(255, 255, 255, 0.075) !important;
    background: unset;
  }
  .multiselect__input {
    border: unset;
    background: unset;
    color: #fff;
    &::placeholder {
      color: #fff;
    }
  }
}
</style>
