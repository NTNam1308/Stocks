<template>
  <div>
    <CCard class="mb-1">
      <CCardHeader>
        <CRow>
          <CCol sm="2">
            <CSelect
              label="Loại GD"
              :value.sync="list_data_model_add.data_filter_type_trade"
              :options="option_filter_type_trade"
            >
            </CSelect>
          </CCol>
          <CCol sm="2">
            <div
              style="position: relative"
              v-bind:class="{ show: openSuggestion }"
            >
              <CInput
                label="Mã CK"
                v-model="list_data_model_add.mack_trade"
                placeholder="Mã CK"
                @keydown.enter="enter"
                @keydown.down="down"
                @keydown.up="up"
                @input="change"
                :addInputClasses="{
                  'is-invalid': !is_valid_form_add.mack_trade || check_key,
                }"
                class="mb-1"
              >
              </CInput>
              <CListGroup
                v-if="openSuggestion"
                class="dropdown-menu pb-0 pt-0"
                style="width: 200%"
                :class="{ show: open }"
              >
                <CListGroupItem
                  href="#"
                  v-for="(item, index) in suggestions"
                  :key="index"
                  @click="suggestionClick(index)"
                  :class="{ active: isActive(index) }"
                >
                  <table style="width: 100%">
                    <tr>
                      <td class="font-weight-bold" style="width: 20%">
                        {{ item.mack }}
                      </td>
                      <td>{{ item.ten_cong_ty }}</td>
                    </tr>
                  </table>
                </CListGroupItem>
              </CListGroup>
            </div>
          </CCol>
          <CCol sm="2">
            <CInput
              type="date"
              label="Ngày"
              v-model="list_data_model_add.date_trade"
            />
          </CCol>
          <CCol sm="2">
            <div role="group" class="form-group">
              <label for="uid-o9j9f21csfs" class=""> Khối lượng </label>
              <input
                id="uid-o9j9f21csfs"
                @change="handleVolumeMaskChange()"
                v-money="money"
                v-model="volume_mask"
                class="form-control"
                :class="!is_valid_form_add.volume_trade ? 'is-invalid' : ''"
              />
            </div>
          </CCol>
          <CCol sm="2">
            <CInput
              label="Giá thực hiện (Nghìn đồng)"
              type="number"
              v-model="list_data_model_add.pride_trade"
              :addInputClasses="{
                'is-invalid': !is_valid_form_add.pride_trade,
              }"
            />
          </CCol>
          <CCol sm="2">
            <CInput
              label="Phí (%)"
              type="number"
              v-model="list_data_model_add.fee_trade"
              :addInputClasses="{ 'is-invalid': !is_valid_form_add.fee_trade }"
            />
          </CCol>
          <CCol sm="4">
            <CTextarea label="Ghi chú" v-model="list_data_model_add.note" @focus="focusTextarea()"  @focusout="focusOutTextarea()">
            </CTextarea>
          </CCol>
          <CCol sm="2">
            <CSelect
              label="Danh mục"
              :value.sync="list_data_model_add.data_filter_category"
              :options="option_filter_category"
            >
            </CSelect>
          </CCol>
          <CCol sm="2" class="margin-top-1-7rem">
            <CButton
              color="success"
              id="addTradingLog"
              @click="addNewTradingLog()"
              ><CIcon name="cibAddthis" /> Thêm mới</CButton
            >
          </CCol>
        </CRow>
      </CCardHeader>
    </CCard>
    <CCard class="mb-1">
      <CCardHeader>
        <CElementCover
          :opacity="1"
          v-if="is_loading_table"
          :style="
            $store.state.darkMode
              ? { 'background-color': 'fff' }
              : { 'background-color': '000' }
          "
          ><CSpinner size="5xl" color="success" />
        </CElementCover>
        <CRow v-if="!is_loading_table">
          <CCol sm="2">
            <CSelect
              label="Xem nhật ký theo thời gian"
              :value.sync="data_filter_type_time"
              :options="option_filter_type_time"
            >
            </CSelect>
          </CCol>
          <CCol sm="2" v-if="data_filter_type_time == 'theo_khoang_thoi_gian'">
            <CSelect
              label="Thời gian"
              :value.sync="data_filter_time"
              :options="option_filter_time"
            >
            </CSelect>
          </CCol>
          <CCol sm="2" v-if="data_filter_type_time == 'tuy_chon'">
            <CInput
              type="date"
              label="Từ ngày"
              v-model="data_filter_time_from"
            />
          </CCol>
          <CCol sm="2" v-if="data_filter_type_time == 'tuy_chon'">
            <CInput
              type="date"
              label="Đến ngày"
              v-model="data_filter_time_to"
            />
          </CCol>
          <CCol sm="2">
            <CSelect
              label="Xem theo mã cổ phiếu"
              :value.sync="data_filter_mack"
              :options="option_filter_mack"
            >
            </CSelect>
          </CCol>
          <CCol sm="2" class="margin-top-1-7rem">
            <JsonExcel
              :data="itemExportExcel"
              :fields="fieldExportExcel"
              name="Nhật ký giao dịch"
              class="float-left"
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
          <CCol sm="2">
            <p class="text-right mt-5">Đơn vị: nghìn đồng</p>
          </CCol>
        </CRow>
        <div class="datatable-trading-log" v-if="!is_loading_table">
          <!---->
          <div class="position-relative table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th
                    class="text-center"
                    v-for="(item, index) in list_field_trading_log"
                    :key="index"
                  >
                    <div>{{ item.label }}</div>
                  </th>
                </tr>
                <!---->
              </thead>
              <tbody class="position-relative">
                <template v-for="item in itemTradingLog">
                  <tr
                    v-if="item.loai_hien_thi == 'giao_dich'"
                    :key="item.index_row"
                  >
                    <td
                      class="text-center"
                      @click="showModalTradingChart(item.mack)"
                    >
                      <CLink
                        data-toggle="tooltip"
                        data-placement="bottom"
                        :title="item.ten_cong_ty"
                      >
                        <b>{{ item.mack }}</b>
                      </CLink>
                    </td>
                    <td class="text-center">
                      {{
                        formatDate(
                          item.ngay_giao_dich.substr(0, 10),
                          "yyyy-MM-dd",
                          "-"
                        )
                      }}
                    </td>
                    <td 
                    class="text-center" 
                    :class="{ 'text-success': item.loai_giao_dich == 'mua', 'text-danger': item.loai_giao_dich == 'ban'}">
                      {{
                        option_filter_type_trade.find(
                          (x) => x.value == item.loai_giao_dich
                        ).label
                      }}
                    </td>
                    <td class="text-right">
                      {{
                        parseFloat(item.khoi_luong).toLocaleString("en", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })
                      }}
                    </td>
                    <td class="text-right">
                      {{ item.gia_thuc_hien }}
                    </td>
                    <td class="text-right">
                      {{ item.phi }}
                    </td>
                    <td class="text-center">
                      {{
                        option_filter_category.find(
                          (x) => x.value == item.danh_muc
                        ).label
                      }}
                    </td>
                    <td class="text-right">
                      {{
                        parseFloat(item.lai_lo_da_thuc_hien).toLocaleString(
                          "en",
                          {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }
                        )
                      }}
                    </td>
                    <td class="text-center">
                      <CButton
                        color="info"
                        size="sm"
                        @click="toggleDetails(item.index_row)"
                      >
                        {{ Boolean(item.is_show_note) ? "Đóng" : "Xem" }}
                      </CButton>
                    </td>
                    <td class="text-center">
                      <CButton
                        size="sm"
                        color="info"
                        class=""
                        @click="showModalEdit(item)"
                      >
                        Sửa
                      </CButton>
                      <CButton
                        size="sm"
                        color="danger"
                        class="ml-1"
                        @click="showModalDelete(item)"
                      >
                        Xóa
                      </CButton>
                    </td>
                  </tr>
                  <tr
                    class="p-0"
                    style="border: none !important"
                    v-if="item.loai_hien_thi == 'giao_dich'"
                    :key="item.index_row + 'toggle'"
                  >
                    <td
                      colspan="10"
                      class="p-0"
                      style="border: none !important"
                    >
                      <CCollapse
                        :show="Boolean(item.is_show_note)"
                        :duration="collapseDuration"
                      >
                        <CCardBody>
                          {{
                            item.chu_thich != "" && item.chu_thich != null
                              ? item.chu_thich
                              : "Không có chú thích"
                          }}
                        </CCardBody>
                      </CCollapse>
                    </td>
                  </tr>
                  <tr
                    v-if="item.loai_hien_thi == 'tieu_de_danh_muc'"
                    :key="item.index_row"
                  >
                    <td colspan="10">
                      <b>{{ item.tieu_de }}</b>
                    </td>
                  </tr>
                  <tr
                    v-if="item.loai_hien_thi == 'tieu_de_tong_ket'"
                    :key="item.index_row"
                  >
                    <td colspan="7">
                      <b>{{ item.tieu_de }}</b>
                    </td>
                    <td class="text-right">
                      <b>{{
                        parseFloat(item.tong_ket).toLocaleString("en", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })
                      }}</b>
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                </template>
                <tr v-if="itemTradingLog.length > 0">
                  <td colspan="7">
                    <b>Tổng kết toàn bộ</b>
                  </td>
                  <td class="text-right">
                    <b>{{
                      parseFloat(totalValueAll).toLocaleString("en", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                    }}</b>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr v-if="itemTradingLog.length == 0">
                  <td colspan="9">
                    <div class="text-center my-5">
                      <h2>Chưa có giao dịch nào</h2>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <!---->
          </div>
          <!---->
        </div>
      </CCardHeader>
    </CCard>
    <CModal title="Sửa dữ liệu" :show.sync="isShowEditModal" size="lg">
      <template #footer>
        <CButton color="secondary" @click="isShowEditModal = false"
          >Đóng</CButton
        >
        <CButton color="primary" id="editTradingLog" @click="saveEditTrading"
          ><CIcon name="cilSave" /> Lưu
        </CButton>
      </template>
      <CRow>
        <CCol sm="3">
          <CSelect
            label="Loại giao dịch"
            :value.sync="list_data_model_edit.data_filter_type_trade"
            :options="option_filter_type_trade"
          >
          </CSelect>
        </CCol>
        <CCol sm="3">
          <CInput
            label="Mã CK"
            v-model="list_data_model_edit.mack_trade"
            class="mb-1"
            disabled
          >
          </CInput>
        </CCol>
        <CCol sm="3">
          <CInput
            type="date"
            label="Ngày"
            v-model="list_data_model_edit.date_trade"
          />
        </CCol>
        <CCol sm="3">
          <CInput
            label="Khối lượng"
            type="number"
            v-model="list_data_model_edit.volume_trade"
            :addInputClasses="{
              'is-invalid': !is_valid_form_edit.volume_trade,
            }"
          />
        </CCol>
        <CCol sm="3">
          <CInput
            label="Giá thực hiện (Nghìn đồng)"
            type="number"
            v-model="list_data_model_edit.pride_trade"
            :addInputClasses="{ 'is-invalid': !is_valid_form_edit.pride_trade }"
          />
        </CCol>
        <CCol sm="3">
          <CInput
            label="Phí (%)"
            type="number"
            v-model="list_data_model_edit.fee_trade"
            :addInputClasses="{ 'is-invalid': !is_valid_form_edit.fee_trade }"
          />
        </CCol>
        <CCol sm="3">
          <CSelect
            label="Danh mục"
            :value.sync="list_data_model_edit.data_filter_category"
            :options="option_filter_category"
          >
          </CSelect>
        </CCol>
        <CCol sm="6">
          <CTextarea label="Ghi chú" v-model="list_data_model_edit.note"
           @focus="focusTextarea()"  @focusout="focusOutTextarea()"
          >
          </CTextarea>
        </CCol>
      </CRow>
    </CModal>
    <CModal title="Xóa dữ liệu" :show.sync="isShowDeleteModal" size="sm">
      <template #footer>
        <CButton color="secondary" @click="isShowDeleteModal = false"
          >Đóng</CButton
        >
        <CButton color="danger" id="delteTradingLog" @click="saveDeleteTrading"
          ><CIcon name="cilTrash" /> Xóa
        </CButton>
      </template>
      <CRow>
        <CCol sm="12"> Bạn có chắc chắn không? </CCol>
      </CRow>
    </CModal>
    <div v-show="activeCompany" id="alertNameCompany">
      {{ nameCompany }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
import JsonExcel from "vue-json-excel";
export default {
  name: "TradingLog",
  components: {
    JsonExcel,
  },
  data() {
    let data_return = {
      check_key: false,
      is_loading_table: true,
      temp_volume_update: 0,
      volume_mask: "0",
      open: false,
      activeCompany: false,
      nameCompany: "",
      current: 0,
      timer: 0,
      suggestions: [],
      list_data_model_add: {
        data_filter_type_trade: "mua",
        mack_trade: "",
        date_trade: new Date(Date.now()).toISOString().substr(0, 10),
        volume_trade: 0,
        pride_trade: 0,
        fee_trade: 0.15,
        data_filter_category: "",
        note: "",
      },
      list_data_model_edit: {
        data_filter_type_trade: "",
        mack_trade: "",
        date_trade: "",
        volume_trade: 0,
        pride_trade: 0,
        fee_trade: 0.15,
        data_filter_category: "",
        note: "",
      },
      is_valid_form_add: {
        mack_trade: true,
        volume_trade: true,
        pride_trade: true,
        fee_trade: true,
      },
      is_valid_form_edit: {
        mack_trade: true,
        volume_trade: true,
        pride_trade: true,
        fee_trade: true,
      },
      isShowEditModal: false,
      isShowDeleteModal: false,
      idItemTradingLogDelete: -1,
      option_filter_type_trade: [
        {
          value: "mua",
          label: "Mua",
        },
        {
          value: "ban",
          label: "Bán",
        },
      ],
      list_item_trading_log: [],
      list_field_trading_log: [
        {
          key: "mack",
          label: "Mã CK",
          sorter: true,
          filter: true,
        },
        {
          key: "ngay_giao_dich",
          label: "Ngày giao dịch",
          sorter: true,
          filter: true,
        },
        {
          key: "loai_giao_dich",
          label: "Loại giao dịch",
          sorter: true,
          filter: true,
        },
        {
          key: "khoi_luong",
          label: "Khối lượng",
          sorter: true,
          filter: true,
        },
        {
          key: "gia_thuc_hien",
          label: "Giá thực hiện",
          sorter: true,
          filter: true,
        },
        {
          key: "phi",
          label: "Phí",
          sorter: true,
          filter: true,
        },
        {
          key: "danh_muc",
          label: "Danh mục",
          sorter: true,
          filter: true,
        },
        {
          key: "lai_lo_da_thuc_hien",
          label: "Lãi/lỗ đã thực hiện",
          sorter: true,
          filter: true,
        },
        {
          key: "chu_thich",
          label: "Ghi chú",
        },
        {
          key: "id",
          label: "",
          _style: "width:10%",
          sorter: false,
          filter: false,
        },
      ],
      option_filter_mack: [],
      data_filter_mack: "*",
      option_filter_type_time: [
        {
          label: "Theo khoảng thời gian",
          value: "theo_khoang_thoi_gian",
        },
        {
          label: "Tùy chọn",
          value: "tuy_chon",
        },
      ],
      data_filter_type_time: "theo_khoang_thoi_gian",
      option_filter_time: [
        {
          label: "Toàn bộ",
          value: 0,
        },
      ],
      data_filter_time: 0,
      money: {
        decimal: ".",
        thousands: ",",
        prefix: "",
        suffix: "",
        precision: 0,
        masked: false /* doesn't work with directive */,
      },
      option_filter_category: [],
      collapseDuration: 0,
      data_filter_time_from: new Date(
        new Date().getTime() - 1000 * 3600 * 24 * 365
      )
        .toISOString()
        .substr(0, 10),
      data_filter_time_to: new Date(new Date().getTime())
        .toISOString()
        .substr(0, 10),
      enter_form: true,
    };
    return data_return;
  },
  created() {
    this.getAllTrading();
    for (let index = 1; index <= 12; index++) {
      this.option_filter_time.push({
        label: index + " tháng",
        value: index,
      });
    }
    this.getDataCategory();
  },
  methods: {
    focusTextarea() {
      this.enter_form = false;
    },
    focusOutTextarea() {
      this.enter_form = true;
    },
    showModalTradingChart(mack) {
      this.$store.state.mackTradingChart = mack;
      this.$store.state.isShowModalTradingChart = true;
    },
    formatDate(_date, _format, _delimiter) {
      var formatLowerCase = _format.toLowerCase();
      var formatItems = formatLowerCase.split(_delimiter);
      var dateItems = _date.split(_delimiter);
      var monthIndex = formatItems.indexOf("mm");
      var dayIndex = formatItems.indexOf("dd");
      var yearIndex = formatItems.indexOf("yyyy");
      var day = parseInt(dateItems[dayIndex]);
      var month = parseInt(dateItems[monthIndex]);
      var year = parseInt(dateItems[yearIndex]);
      return day + "/" + month + "/" + year;
    },
    enter() {
      if (this.openSuggestion) {
        this.list_data_model_add.mack_trade =
          this.suggestions[this.current].mack;
        this.list_data_model_add.pride_trade =
          this.$store.state.data_eod[this.list_data_model_add.mack_trade]
            .lastprice / 1000;
        this.open = false;
      }
    },

    up() {
      if (this.current > 0) this.current--;
    },

    down() {
      if (this.current < this.suggestions.length - 1) this.current++;
    },

    isActive(index) {
      return index === this.current;
    },

    handleVolumeMaskChange() {
      this.list_data_model_add.volume_trade = this.volume_mask
        .split(",")
        .join("");
    },

    searchMack(mack) {
      mack = mack.toUpperCase();
      let return_data = [];
      const limit = 5;
      if (this.$store.state.list_mack.length > 0 && mack != "") {
        for (let i = 0; i < this.$store.state.list_mack.length; i++) {
          if (this.$store.state.list_mack[i].mack.includes(mack)) {
            return_data.push(this.$store.state.list_mack[i]);
          }
          if (return_data.length == limit) break;
        }
      }
      return return_data;
    },

    change() {
      if (this.open == false) {
        this.open = true;
        this.current = 0;
      }
      let list_key = /[\s~`!@#$%\^&*()+=\-\[\]\\';,/{}|\\":<>\?]/;
      if(list_key.test(this.list_data_model_add.mack_trade)) {
        this.check_key = true;
      } else {
        this.check_key = false;
      }

      this.suggestions = this.searchMack(this.list_data_model_add.mack_trade);
    },
    toggleDetails(index) {
      this.itemTradingLog[index].is_show_note =
        !this.itemTradingLog[index].is_show_note;
      this.collapseDuration = 300;
      this.$nextTick(() => {
        this.collapseDuration = 0;
      });
    },

    suggestionClick(index) {
      this.list_data_model_add.mack_trade = this.suggestions[index].mack;
      this.list_data_model_add.pride_trade =
        this.$store.state.data_eod[this.list_data_model_add.mack_trade]
          .lastprice / 1000;
      this.open = false;
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
          for (let item of res.data) {
            self.option_filter_category.push({
              value: item.id,
              label: item.name,
            });
          }
          self.list_data_model_add.data_filter_category =
            self.option_filter_category[0].value;
        })
        .catch(function (error) {
          console.error(error);
        });
    },

    addNewTradingLog() {
      let self = this;
      self.is_valid_form_add.mack_trade = !(
        self.list_data_model_add.mack_trade == "" ||
        !self.list_data_model_add.mack_trade
      );
      self.is_valid_form_add.volume_trade = !(
        self.list_data_model_add.volume_trade <= 0
      );
      self.is_valid_form_add.pride_trade = !(
        self.list_data_model_add.pride_trade < 0
      );
      self.is_valid_form_add.fee_trade = !(
        self.list_data_model_add.fee_trade < 0
      );
      let check_valid = true;
      Object.keys(self.is_valid_form_add).forEach(function (key) {
        if (!self.is_valid_form_add[key]) check_valid = false;
      });
      const date_now = new Date(Date.now());
      const date_trade = new Date(
        Date.parse(self.list_data_model_add.date_trade)
      );
      if (date_trade > date_now) {
        self.$toast.error(
          "Ngày giao dịch phải bé hơn hoặc bằng ngày hiện tại!"
        );
        return;
      }
      if (
        !this.$store.state.data_eod.hasOwnProperty(
          self.list_data_model_add.mack_trade.toUpperCase()
        )
      ) {
        self.$toast.error("Mã CK không hợp lệ!");
        return;
      }
      const khoi_luong_ton = this.getInventoryVolume(
        self.list_data_model_add.mack_trade.toUpperCase(),
        self.list_data_model_add.data_filter_category
      );
      if (self.list_data_model_add.data_filter_type_trade == "ban") {
        if (khoi_luong_ton < self.list_data_model_add.volume_trade) {
          self.$toast.error(
            "Khối lượng bán phải bé hơn hoặc bằng số lượng mua!"
          );
          return;
        }
      }
      if (self.list_data_model_add.data_filter_category == "") {
        self.$toast.error(
          "Hiện chưa có danh mục nào. Bạn phải tạo mới danh mục rồi thêm giao dịch!"
        );
        return;
      }
      if (!check_valid) {
        self.$toast.error("Một số nội dung vừa nhập không hợp lệ!");
        return;
      }
      axios
        .post(this.$apiAdress + "/api/stocks/trading_log/store", {
          mack: self.list_data_model_add.mack_trade.toUpperCase(),
          ngay_giao_dich: self.list_data_model_add.date_trade,
          loai_giao_dich: self.list_data_model_add.data_filter_type_trade,
          khoi_luong: self.list_data_model_add.volume_trade,
          gia_thuc_hien: self.list_data_model_add.pride_trade,
          phi: self.list_data_model_add.fee_trade,
          danh_muc: self.list_data_model_add.data_filter_category,
          chu_thich: self.list_data_model_add.note,
          token: localStorage.getItem("api_token"),
        })
        .then(function (response) {
          self.list_item_trading_log = response.data.list_data_item.map(
            (item, index) => {
              return { ...item, index };
            }
          );
          self.option_filter_mack = response.data.list_data_mack.map(
            (item, index) => {
              return {
                label: item.mack,
                value: item.mack,
              };
            }
          );
          self.option_filter_mack.unshift({
            label: "Tất cả",
            value: "*",
          });
          self.$toast.success(
            `Đã thêm mới giao dịch ${
              self.option_filter_type_trade.find(
                (x) =>
                  x.value == self.list_data_model_add.data_filter_type_trade
              ).label
            } ${
              self.list_data_model_add.volume_trade
            } CP mã ${self.list_data_model_add.mack_trade.toUpperCase()} với giá: ${
              self.list_data_model_add.pride_trade
            } và phí: ${self.list_data_model_add.fee_trade}%`
          );
          self.$store.state.data_trading_log = self.list_item_trading_log;
          self.list_data_model_add.data_filter_type_trade = "mua";
          self.list_data_model_add.mack_trade = "";
          self.list_data_model_add.date_trade = new Date(Date.now())
            .toISOString()
            .substr(0, 10);
          self.list_data_model_add.volume_trade = 0;
          self.list_data_model_add.pride_trade = 0;
          self.list_data_model_add.fee_trade = 0.15;
          self.list_data_model_add.note = "";
          self.volume_mask = "0";
          let check_exist_mack = false;
          self.option_filter_mack.forEach((item) => {
            if (response.data.mack == item.value) {
              check_exist_mack = true;
            }
          });
          if (!check_exist_mack) {
            self.option_filter_mack.push({
              label: response.data.mack,
              value: response.data.mack,
            });
          }
        })
        .catch(function (error) {
          console.error(error);
          self.$toast.error("Có lỗi xảy ra, vui lòng thử lại");
        });
    },

    showModalEdit(item) {
      let self = this;
      self.isShowEditModal = true;
      self.list_data_model_edit.id = item.id;
      self.list_data_model_edit.mack_trade = item.mack;
      self.list_data_model_edit.data_filter_type_trade = item.loai_giao_dich;
      self.list_data_model_edit.date_trade = new Date(
        Date.parse(item.ngay_giao_dich.substr(0, 10))
      )
        .toISOString()
        .substr(0, 10);
      self.list_data_model_edit.volume_trade = item.khoi_luong;
      self.temp_volume_update = item.khoi_luong;
      self.list_data_model_edit.pride_trade = item.gia_thuc_hien;
      self.list_data_model_edit.fee_trade = item.phi;
      self.list_data_model_edit.data_filter_category = parseInt(item.danh_muc);
      self.list_data_model_edit.note = item.chu_thich;
      self.list_data_model_edit.index = item.index;
    },

    saveEditTrading(item) {
      let self = this;
      self.is_valid_form_edit.mack_trade = !(
        self.list_data_model_edit.mack_trade == "" ||
        !self.list_data_model_edit.mack_trade
      );
      self.is_valid_form_edit.volume_trade = !(
        self.list_data_model_edit.volume_trade <= 0
      );
      self.is_valid_form_edit.pride_trade = !(
        self.list_data_model_edit.pride_trade < 0
      );
      self.is_valid_form_edit.fee_trade = !(
        self.list_data_model_edit.fee_trade < 0
      );
      const date_now = new Date(Date.now());
      const date_trade = new Date(
        Date.parse(self.list_data_model_edit.date_trade)
      );
      if (date_trade > date_now) {
        self.$toast.error(
          "Ngày giao dịch phải bé hơn hoặc bằng ngày hiện tại!"
        );
        return;
      }
      if (
        !this.$store.state.data_eod.hasOwnProperty(
          self.list_data_model_edit.mack_trade.toUpperCase()
        )
      ) {
        self.$toast.error("Mã CK không hợp lệ!");
        return;
      }
      let khoi_luong_ton = this.getInventoryVolume(
        self.list_data_model_edit.mack_trade.toUpperCase(),
        self.list_data_model_edit.data_filter_category
      );
      khoi_luong_ton = khoi_luong_ton + self.temp_volume_update;
      if (self.list_data_model_edit.data_filter_type_trade == "ban") {
        if (khoi_luong_ton < self.list_data_model_edit.volume_trade) {
          self.$toast.error(
            "Khối lượng bán phải bé hơn hoặc bằng số lượng mua!"
          );
          return;
        }
      }
      let check_valid = true;
      Object.keys(self.is_valid_form_edit).forEach(function (key) {
        if (!self.is_valid_form_edit[key]) check_valid = false;
      });
      if (!check_valid) {
        self.$toast.error("Một số nội dung vừa nhập không hợp lệ");
        return;
      }
      axios
        .put(this.$apiAdress + "/api/stocks/trading_log/update", {
          id: self.list_data_model_edit.id,
          mack: self.list_data_model_edit.mack_trade.toUpperCase(),
          ngay_giao_dich: self.list_data_model_edit.date_trade,
          loai_giao_dich: self.list_data_model_edit.data_filter_type_trade,
          khoi_luong: self.list_data_model_edit.volume_trade,
          gia_thuc_hien: self.list_data_model_edit.pride_trade,
          phi: self.list_data_model_edit.fee_trade,
          danh_muc: self.list_data_model_edit.data_filter_category,
          chu_thich: self.list_data_model_edit.note,
          token: localStorage.getItem("api_token"),
        })
        .then(function (response) {
          self.list_item_trading_log = response.data.list_data_item.map(
            (item, index) => {
              return { ...item, index };
            }
          );
          self.option_filter_mack = response.data.list_data_mack.map(
            (item, index) => {
              return {
                label: item.mack,
                value: item.mack,
              };
            }
          );
          self.option_filter_mack.unshift({
            label: "Tất cả",
            value: "*",
          });
          self.$store.state.data_trading_log = self.list_item_trading_log;
          self.$toast.success(
            `Đã cập nhật giao dịch ${
              self.option_filter_type_trade.find(
                (x) =>
                  x.value == self.list_data_model_edit.data_filter_type_trade
              ).label
            } ${
              self.list_data_model_edit.volume_trade
            } CP mã ${self.list_data_model_edit.mack_trade.toUpperCase()} với giá: ${
              self.list_data_model_edit.pride_trade
            } và phí: ${self.list_data_model_edit.fee_trade}%`
          );
          self.isShowEditModal = false;
        })
        .catch(function (error) {
          console.error(error);
          self.isShowEditModal = false;
          self.$toast.error("Có lỗi xảy ra, vui lòng thử lại");
        });
    },

    showModalDelete(item) {
      let self = this;
      self.isShowDeleteModal = true;
      self.idItemTradingLogDelete = item.id;
    },

    saveDeleteTrading() {
      let self = this;
      axios
        .delete(
          this.$apiAdress +
            "/api/stocks/trading_log/" +
            self.idItemTradingLogDelete,
          {
            params: {
              token: localStorage.getItem("api_token"),
            },
          }
        )
        .then(function (response) {
          self.list_item_trading_log = response.data.list_data_item.map(
            (item, index) => {
              return { ...item, index };
            }
          );
          self.option_filter_mack = response.data.list_data_mack.map(
            (item, index) => {
              return {
                label: item.mack,
                value: item.mack,
              };
            }
          );
          self.option_filter_mack.unshift({
            label: "Tất cả",
            value: "*",
          });
          self.$store.state.data_trading_log = self.list_item_trading_log;
          self.$toast.success("Đã xóa giao dịch thành công");
          self.isShowDeleteModal = false;
        })
        .catch(function (error) {
          console.error(error);
          self.isShowDeleteModal = false;
          self.$toast.error("Có lỗi xảy ra, vui lòng thử lại");
        });
    },

    getAllTrading() {
      let self = this;
      self.is_loading_table = true;
      axios
        .get(this.$apiAdress + "/api/stocks/trading_log/getAll", {
          params: {
            token: localStorage.getItem("api_token"),
          },
        })
        .then(function (response) {
          self.list_item_trading_log = response.data.list_data_item.map(
            (item, index) => {
              return {
                ...item,
                index,
              };
            }
          );
          self.option_filter_mack = response.data.list_data_mack.map(
            (item, index) => {
              return {
                label: item.mack,
                value: item.mack,
              };
            }
          );
          self.option_filter_mack.unshift({
            label: "Tất cả",
            value: "*",
          });
          self.is_loading_table = false;
        })
        .catch(function (error) {
          console.error(error);
          self.is_loading_table = false;
        });
    },

    getInventoryVolume(mack, danh_muc) {
      let tong_khoi_luong_mua = 0;
      let tong_khoi_luong_ban = 0;
      for (const item of this.list_item_trading_log) {
        if (item.mack == mack && item.danh_muc == danh_muc) {
          if (item.loai_giao_dich == "mua")
            tong_khoi_luong_mua += item.khoi_luong;
          if (item.loai_giao_dich == "ban")
            tong_khoi_luong_ban += item.khoi_luong;
        }
      }
      return tong_khoi_luong_mua - tong_khoi_luong_ban;
    },
    mouseOver: function (event, nameCompany) {
      let self = this;
      document.getElementById("alertNameCompany").style.position = "absolute";
      self.nameCompany = nameCompany;
      document.getElementById("alertNameCompany").style.left =
        event.pageX + "px";
      document.getElementById("alertNameCompany").style.top =
        event.pageY + "px";
      self.activeCompany = true;
    },
    mouseleave: function () {
      let self = this;
      self.activeCompany = false;
    },
  },
  computed: {
    openSuggestion() {
      return (
        this.list_data_model_add.mack_trade !== "" &&
        this.suggestions.length != 0 &&
        this.open === true
      );
    },

    itemTradingLog() {
      let return_data = [];
      if (
        this.list_item_trading_log.length > 0 &&
        this.option_filter_category.length > 0 &&
        Object.keys(this.$store.state.list_mack_company).length > 0
      ) {
        let temp_data = [...this.list_item_trading_log];
        if (this.data_filter_mack != "*") {
          temp_data = temp_data.filter((item) => {
            return item.mack == this.data_filter_mack;
          });
        }
        if (this.data_filter_type_time == "theo_khoang_thoi_gian") {
          if (this.data_filter_time > 0) {
            temp_data = temp_data.filter((item) => {
              let count_day_compare = new Date(
                Date.now() - 24 * 60 * 60 * 1000 * 30 * this.data_filter_time
              );
              let item_date = new Date(
                Date.parse(item.ngay_giao_dich.substr(0, 10))
              );
              return item_date >= count_day_compare;
            });
          }
        } else if (this.data_filter_type_time == "tuy_chon") {
          temp_data = temp_data.filter((item) => {
            let time_from = new Date(
              Date.parse(this.data_filter_time_from.substr(0, 10))
            );
            let time_to = new Date(
              Date.parse(this.data_filter_time_to.substr(0, 10))
            );
            if (time_from > time_to) {
              this.$toast.clear();
              this.$toast.error(
                "Bạn cần nhập thời gian Từ ngày phải bé hơn Đến ngày"
              );
            }
            let item_date = new Date(
              Date.parse(item.ngay_giao_dich.substr(0, 10))
            );
            return time_from <= item_date && item_date <= time_to;
          });
        }
        if (temp_data.length == 0) return [];
        let dong_danh_muc = {};
        dong_danh_muc.danh_muc = temp_data[0].danh_muc;
        let ten_danh_muc = this.option_filter_category.find(
          (x) => x.value == dong_danh_muc.danh_muc
        ).label;
        dong_danh_muc.tieu_de = "Danh mục: " + ten_danh_muc;
        dong_danh_muc.loai_hien_thi = "tieu_de_danh_muc";

        let dong_tong_ket = {};
        dong_tong_ket.tieu_de = "Tổng kết";
        dong_tong_ket.loai_hien_thi = "tieu_de_tong_ket";
        dong_tong_ket.tong_ket = 0;
        return_data.push({ ...dong_danh_muc });
        temp_data.forEach((item) => {
          if (item.danh_muc != dong_danh_muc.danh_muc) {
            dong_danh_muc.danh_muc = item.danh_muc;
            ten_danh_muc = this.option_filter_category.find(
              (x) => x.value == dong_danh_muc.danh_muc
            ).label;
            dong_danh_muc.tieu_de = "Danh mục: " + ten_danh_muc;
            return_data.push({ ...dong_tong_ket });
            return_data.push({ ...dong_danh_muc });
            dong_tong_ket.tong_ket = 0;
          }
          dong_tong_ket.tong_ket += item.lai_lo_da_thuc_hien;
          item.loai_hien_thi = "giao_dich";
          item.ten_cong_ty = this.$store.state.list_mack_company.hasOwnProperty(item.mack) ? this.$store.state.list_mack_company[item.mack].ten_cong_ty : "",
          return_data.push(item);
        });
        return_data.push({ ...dong_tong_ket });
      }
      return_data = return_data.map((item, index) => {
        return {
          ...item,
          is_show_note: false,
          index_row: index,
        };
      });
      return return_data;
    },

    totalValueAll() {
      let total = 0;
      for (const item of this.itemTradingLog) {
        if (item.loai_hien_thi == "tieu_de_tong_ket") total += item.tong_ket;
      }
      return total;
    },
    fieldExportExcel() {
      let item_header = {
        "Mã CK": "mack",
        "Ngày giao dịch": "ngay_giao_dich",
        "Loại giao dịch": "loai_giao_dich",
        "Khối lượng": "khoi_luong",
        "Giá thực hiện": "gia_thuc_hien",
        Phí: "phi",
        "Danh mục": "danh_muc",
        "Lãi/lỗ đã thực hiện": "lai_lo_da_thuc_hien",
        "Ghi chú": "chu_thich",
      };
      return item_header;
    },
    itemExportExcel() {
      let return_data = [];
      if (
        this.itemTradingLog.length > 0 &&
        this.option_filter_category.length > 0 &&
        this.option_filter_type_trade.length > 0
      ) {
        return_data = this.itemTradingLog.map((item) => {
          if (item.loai_hien_thi == "tieu_de_danh_muc") {
            return { mack: item.tieu_de };
          } else if (item.loai_hien_thi == "tieu_de_tong_ket") {
            return {
              ...item,
              mack: item.tieu_de,
              lai_lo_da_thuc_hien: item.tong_ket,
            };
          } else if (item.loai_hien_thi == "giao_dich") {
            let temp_item = { ...item };
            temp_item.danh_muc = this.option_filter_category.find(
              (x) => x.value == temp_item.danh_muc
            ).label;
            temp_item.loai_giao_dich = this.option_filter_type_trade.find(
              (x) => x.value == temp_item.loai_giao_dich
            ).label;
            return temp_item;
          }
        });
        return_data.push({
          mack: "Tổng kết toàn bộ",
          lai_lo_da_thuc_hien: this.totalValueAll,
        });
      }
      return return_data;
    },
  },
  mounted() {
    let self = this;
    window.addEventListener("keyup", (event) => {
      if (event.keyCode === 13) {
        if (self.isShowDeleteModal) {
          document.getElementById("delteTradingLog").click();
        }
        if (self.isShowEditModal  && self.enter_form == true) {
          document.getElementById("editTradingLog").click();
        }
        if (self.list_data_model_add.mack_trade != "" && self.enter_form == true) {
          document.getElementById("addTradingLog").click();
        }
      }
    });
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
.margin-top-1-7rem {
  margin-top: 1.7rem;
}
</style>
