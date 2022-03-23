<template>
  <div>
    <CRow>
      <CCol sm="12">
        <CCard class="mb-1">
          <CCardHeader>
            <div class="d-flex justify-content-between align-items-end">
              <CSelect
                label="Chọn danh mục"
                :value.sync="data_filter_category"
                :options="option_filter_category"
                class="mb-1"
                v-if="false"
              />
              <div class="mb-1">
                <label>Lọc danh mục</label>
                <multiselect
                  v-model="list_category_selected"
                  selectLabel="Chọn"
                  deselectLabel="Xóa"
                  selectedLabel="Đã chọn"
                  placeholder="Nhập tên danh mục"
                  label="label"
                  track-by="label"
                  :options="option_filter_category"
                  :multiple="true"
                  :taggable="true"
                  @tag="addTag"
                ></multiselect>
              </div>
              <p class="text-right">Đơn vị: nghìn đồng</p>
            </div>
            <div class="datatable-profit">
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
              <!---->
              <div
                class="position-relative table-responsive"
                v-if="!is_loading_table"
              >
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th rowspan="2" class="text-center">Mã CK</th>
                      <th rowspan="2" class="text-center">Khối lượng tồn</th>
                      <th rowspan="2" class="text-center">Giá trung bình</th>
                      <th rowspan="2" class="text-center">Giá hiện tại</th>
                      <th rowspan="2" class="text-center">
                        Tổng giá trị đầu tư
                      </th>
                      <th rowspan="2" class="text-center">
                        Tổng giá trị hiện tại
                      </th>
                      <th rowspan="2" class="text-center">Lãi/Lỗ hôm nay</th>
                      <th colspan="2" class="text-center">Lãi/Lỗ lũy kế</th>
                    </tr>
                    <tr>
                      <th>(nghìn đồng)</th>
                      <th>(tính %)</th>
                    </tr>
                    <!---->
                  </thead>
                  <tbody class="position-relative">
                    <tr
                      v-for="(item, index) in itemTradingLog"
                      :key="index"
                      :class="
                        item.loai_hien_thi == 'tieu_de_tong_ket'
                          ? 'border-bottom-spacing'
                          : ''
                      "
                    >
                      <template v-if="item.loai_hien_thi == 'giao_dich'">
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
                        <td class="text-right">
                          {{ item.khoi_luong_ton }}
                        </td>
                        <td class="text-right">
                          {{ item.gia_trung_binh }}
                        </td>
                        <td class="text-right">
                          <transition
                            :name="
                              $function_global.getAnimationNameFromCL(item.cl)
                            "
                            mode="out-in"
                          >
                            <span :key="item.change">
                              {{ item.gia_hien_tai }}
                              <CIcon
                                v-if="item.perchange != 0"
                                :name="
                                  item.perchange > 0
                                    ? 'cil-caret-top'
                                    : 'cil-caret-bottom'
                                "
                                class="mb-1"
                                :class="
                                  $function_global.getClassTextColorFromCL(
                                    item.cl
                                  )
                                "
                              />
                              <span
                                class="display-inline-flex"
                                v-html="
                                  $function_global.getSpanColorByPerchange(
                                    item.change,
                                    item.perchange,
                                    item.cl
                                  )
                                "
                              />
                            </span>
                          </transition>
                        </td>
                        <td class="text-right">
                          {{ item.tong_gia_tri_dau_tu }}
                        </td>
                        <td class="text-right">
                          {{ item.tong_gia_tri_hien_tai }}
                        </td>
                        <td class="text-right">
                          <transition
                            :name="
                              $function_global.getAnimationNameFromChange(
                                item.change
                              )
                            "
                            mode="out-in"
                          >
                            <span :key="item.change">
                              <span
                                class="display-inline-flex"
                                v-html="
                                  $function_global.getSpanColorByValue(
                                    item.lai_lo_hom_nay,
                                    0,
                                    0
                                  )
                                "
                              />
                            </span>
                          </transition>
                        </td>
                        <td class="text-right">
                          <transition
                            :name="
                              $function_global.getAnimationNameFromChange(
                                item.change
                              )
                            "
                            mode="out-in"
                          >
                            <span :key="item.change">
                              <span
                                class="display-inline-flex"
                                v-html="
                                  $function_global.getSpanColorByValue(
                                    item.lai_lo_luy_ke_tien,
                                    0,
                                    0
                                  )
                                "
                              />
                            </span>
                          </transition>
                        </td>
                        <td class="text-right">
                          <transition
                            :name="
                              $function_global.getAnimationNameFromChange(
                                item.change
                              )
                            "
                            mode="out-in"
                          >
                            <span :key="item.change">
                              <span
                                class="display-inline-flex"
                                v-html="
                                  $function_global.getSpanColorByValue(
                                    item.lai_lo_luy_ke_phan_tram,
                                    0,
                                    1,
                                    '%'
                                  )
                                "
                              />
                            </span>
                          </transition>
                        </td>
                      </template>
                      <template v-if="item.loai_hien_thi == 'tieu_de_danh_muc'">
                        <td colspan="9">
                          <b>{{ item.tieu_de }}</b>
                        </td>
                      </template>
                      <template v-if="item.loai_hien_thi == 'tieu_de_tong_ket'">
                        <td colspan="4">
                          <b>{{ item.tieu_de }}</b>
                        </td>
                        <td class="text-right">
                          <b>
                            {{
                              formatMoney(
                                item.tong_ket_tong_gia_tri_dau_tu,
                                0,
                                0
                              )
                            }}</b
                          >
                        </td>
                        <td class="text-right">
                          <b>
                            {{
                              formatMoney(
                                item.tong_ket_tong_gia_tri_hien_tai,
                                0,
                                0
                              )
                            }}</b
                          >
                        </td>
                        <td class="text-right">
                          <b>
                            <span
                              class="display-inline-flex"
                              v-html="
                                $function_global.getSpanColorByValue(
                                  item.tong_ket_lai_lo_hom_nay,
                                  0,
                                  0
                                )
                              "
                          /></b>
                        </td>
                        <td class="text-right">
                          <b>
                            <span
                              class="display-inline-flex"
                              v-html="
                                $function_global.getSpanColorByValue(
                                  item.tong_ket_lai_lo_luy_ke_tien,
                                  0,
                                  0
                                )
                              "
                          /></b>
                        </td>
                        <td class="text-right">
                          <b>
                            <span
                              class="display-inline-flex"
                              v-html="
                                $function_global.getSpanColorByValue(
                                  (item.tong_ket_lai_lo_luy_ke_tien /
                                    item.tong_ket_tong_gia_tri_dau_tu) *
                                    100,
                                  0,
                                  1,
                                  '%'
                                )
                              "
                          /></b>
                        </td>
                      </template>
                    </tr>
                    <tr v-if="itemTradingLog.length > 0">
                      <td colspan="4">
                        <b>Tổng kết toàn bộ</b>
                      </td>
                      <td class="text-right">
                        <b>
                          {{
                            formatMoney(
                              totalValueAll.tong_ket_tong_gia_tri_dau_tu,
                              0,
                              0
                            )
                          }}</b
                        >
                      </td>
                      <td class="text-right">
                        <b>
                          {{
                            formatMoney(
                              totalValueAll.tong_ket_tong_gia_tri_hien_tai,
                              0,
                              0
                            )
                          }}</b
                        >
                      </td>
                      <td class="text-right">
                        <b>
                          <span
                            class="display-inline-flex"
                            v-html="
                              $function_global.getSpanColorByValue(
                                totalValueAll.tong_ket_lai_lo_hom_nay,
                                0,
                                0
                              )
                            "
                        /></b>
                      </td>
                      <td class="text-right">
                        <b>
                          <span
                            class="display-inline-flex"
                            v-html="
                              $function_global.getSpanColorByValue(
                                totalValueAll.tong_ket_lai_lo_luy_ke_tien,
                                0,
                                0
                              )
                            "
                        /></b>
                      </td>
                      <td class="text-right">
                        <b>
                          <span
                            class="display-inline-flex"
                            v-html="
                              $function_global.getSpanColorByValue(
                                (totalValueAll.tong_ket_lai_lo_luy_ke_tien /
                                  totalValueAll.tong_ket_tong_gia_tri_dau_tu) *
                                  100,
                                0,
                                1,
                                '%'
                              )
                            "
                        /></b>
                      </td>
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
              </div>
            </div>
            <CRow>
              <CCol sm="10"></CCol>
              <CCol sm="2">
                <JsonExcel
                  :data="itemExportExcel"
                  :fields="fieldExportExcel"
                  name="Lãi/lỗ Nhật ký giao dịch"
                  class="float-right"
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
            </CRow>
          </CCardHeader>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import axios from "axios";
import Multiselect from "vue-multiselect";
import JsonExcel from "vue-json-excel";
export default {
  name: "ProfitLoss",
  components: {
    JsonExcel,
    Multiselect,
  },
  data() {
    return {
      is_loading_table: true,
      list_item_trading_log: [],
      activeCompany: false,
      nameCompany: "",
      list_price_trading_log: [],
      list_category_selected: [],
      list_field_trading_log: [
        {
          key: "mack",
          label: "Mã CK",
          sorter: true,
          filter: true,
        },
        {
          key: "khoi_luong_ton",
          label: "Khối lượng tồn",
          sorter: true,
          filter: true,
        },
        {
          key: "gia_trung_binh",
          label: "Giá trung bình",
          sorter: true,
          filter: true,
        },
        {
          key: "gia_hien_tai",
          label: "Giá hiện tại",
          sorter: true,
          filter: true,
        },
        {
          key: "tong_gia_tri_dau_tu",
          label: "Tổng giá trị đầu tư",
          sorter: true,
          filter: true,
        },
        {
          key: "tong_gia_tri_hien_tai",
          label: "Tổng giá trị hiện tại",
          sorter: true,
          filter: true,
        },
        {
          key: "lai_lo_hom_nay",
          label: "Lãi/Lỗ hôm nay",
          sorter: true,
          filter: true,
        },
        {
          key: "lai_lo_luy_ke_tien",
          label: "Lãi/Lỗ lũy kế nghìn đồng",
          sorter: true,
          filter: true,
        },
        {
          key: "lai_lo_luy_ke_phan_tram",
          label: "Lãi/Lỗ lũy kế phần trăm",
          sorter: true,
          filter: true,
        },
      ],
      list_data_mack: [],
      data_filter_category: -1,
    };
  },
  created() {
    this.getDataTradingLog();
    this.getDataCategory();
  },
  methods: {
    addTag(tag) {
      return;
    },
    getDataTradingLog() {
      let self = this;
      self.is_loading_table = true;
      axios
        .get(self.$apiAdress + "/api/stocks/trading_log/getAll", {
          params: {
            token: localStorage.getItem("api_token"),
          },
        })
        .then(function (res) {
          self.$store.state.data_trading_log = res.data.list_data_item;
          self.list_data_mack = res.data.list_data_mack.map(
            (item) => item.mack
          );
          window.socket_send.emit("getlive", self.list_data_mack, (res) => {
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
              self.$store.state.data_eod[stockcode] = item;
            }
          });
          window.socket_send.emit("join", self.list_data_mack);
          self.is_loading_table = false;
        })
        .catch(function (error) {
          self.is_loading_table = false;
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
  },
  computed: {
    data_trading_log() {
      let data_return = [];
      if (
        this.$store.state.data_trading_log.length > 0 &&
        Object.keys(this.$store.state.data_eod).length > 0
      ) {
        let data_trading_temp = [...this.$store.state.data_trading_log];
        if (this.list_category_selected.length > 0) {
          let list_category_selected_temp = this.list_category_selected.map(
            (item) => item.value
          );
          console.log(list_category_selected_temp);
          data_trading_temp = data_trading_temp.filter((item) =>
            list_category_selected_temp.includes(parseInt(item.danh_muc))
          );
        }
        if (data_trading_temp.length > 0) {
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
                    change: this.$store.state.data_eod.hasOwnProperty(
                      mack_filter_time
                    )
                      ? this.$store.state.data_eod[mack_filter_time].change
                      : 0,
                    danh_muc: temp_table_filter_by_time_mack[0].danh_muc,
                    lastprice: this.$store.state.data_eod.hasOwnProperty(
                      mack_filter_time
                    )
                      ? this.$store.state.data_eod[mack_filter_time].lastprice
                      : 0,
                    mack: temp_table_filter_by_time_mack[0].mack,
                    perchange: this.$store.state.data_eod.hasOwnProperty(
                      mack_filter_time
                    )
                      ? this.$store.state.data_eod[mack_filter_time].perchange
                      : 0,
                    cl: this.$store.state.data_eod.hasOwnProperty(
                      mack_filter_time
                    )
                      ? this.$store.state.data_eod[mack_filter_time].cl
                      : "",
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
                change: this.$store.state.data_eod.hasOwnProperty(
                  mack_filter_time
                )
                  ? this.$store.state.data_eod[mack_filter_time].change
                  : 0,
                danh_muc: temp_table_filter_by_time_mack[0].danh_muc,
                lastprice: this.$store.state.data_eod.hasOwnProperty(
                  mack_filter_time
                )
                  ? this.$store.state.data_eod[mack_filter_time].lastprice
                  : 0,
                mack: temp_table_filter_by_time_mack[0].mack,
                perchange: this.$store.state.data_eod.hasOwnProperty(
                  mack_filter_time
                )
                  ? this.$store.state.data_eod[mack_filter_time].perchange
                  : 0,
                cl: this.$store.state.data_eod.hasOwnProperty(mack_filter_time)
                  ? this.$store.state.data_eod[mack_filter_time].cl
                  : "",
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
                change: this.$store.state.data_eod.hasOwnProperty(
                  mack_filter_time
                )
                  ? this.$store.state.data_eod[mack_filter_time].change
                  : 0,
                danh_muc: temp_table_filter_by_time_mack[0].danh_muc,
                lastprice: this.$store.state.data_eod.hasOwnProperty(
                  mack_filter_time
                )
                  ? this.$store.state.data_eod[mack_filter_time].lastprice
                  : 0,
                mack: temp_table_filter_by_time_mack[0].mack,
                perchange: this.$store.state.data_eod.hasOwnProperty(
                  mack_filter_time
                )
                  ? this.$store.state.data_eod[mack_filter_time].perchange
                  : 0,
                cl: this.$store.state.data_eod.hasOwnProperty(mack_filter_time)
                  ? this.$store.state.data_eod[mack_filter_time].cl
                  : "",
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
            change: this.$store.state.data_eod.hasOwnProperty(mack_filter_time)
              ? this.$store.state.data_eod[mack_filter_time].change
              : 0,
            danh_muc: temp_table_filter_by_time_mack[0].danh_muc,
            lastprice: this.$store.state.data_eod.hasOwnProperty(
              mack_filter_time
            )
              ? this.$store.state.data_eod[mack_filter_time].lastprice
              : 0,
            mack: temp_table_filter_by_time_mack[0].mack,
            perchange: this.$store.state.data_eod.hasOwnProperty(
              mack_filter_time
            )
              ? this.$store.state.data_eod[mack_filter_time].perchange
              : 0,
            cl: this.$store.state.data_eod.hasOwnProperty(mack_filter_time)
              ? this.$store.state.data_eod[mack_filter_time].cl
              : "",
            tong_khoi_luong: tong_khoi_luong,
            tong_gia_tri_dau_tu: tong_gia_tri_dau_tu,
            tong_khoi_luong_ban: tong_khoi_luong_ban,
            tong_khoi_luong_mua: tong_khoi_luong_mua,
            gia_trung_binh: gia_trung_binh,
          });
        }
      }
      return data_return;
    },

    option_filter_category() {
      let return_data = [];
      if (Object.keys(this.$store.state.data_category).length > 0) {
        for (let item of this.$store.state.data_category) {
          return_data.push({
            value: item.id,
            label: item.name,
          });
        }
      }
      return return_data;
    },

    itemTradingLog() {
      let ret = [];
      if (
        this.data_trading_log.length > 0 &&
        this.option_filter_category.length > 0 &&
        Object.values(this.$store.state.list_mack_company).length > 0
      ) {
        let temp_list_item_trading_log = [...this.data_trading_log];
        let dong_danh_muc = {};
        dong_danh_muc.danh_muc = temp_list_item_trading_log[0].danh_muc;
        let ten_danh_muc = this.option_filter_category.find(
          (x) => x.value == dong_danh_muc.danh_muc
        ).label;
        dong_danh_muc.tieu_de = "Danh mục: " + ten_danh_muc;
        dong_danh_muc.loai_hien_thi = "tieu_de_danh_muc";

        let dong_tong_ket = {};
        dong_tong_ket.tieu_de = "Tổng kết";
        dong_tong_ket.loai_hien_thi = "tieu_de_tong_ket";
        dong_tong_ket.tong_ket_khoi_luong_ton = 0;
        dong_tong_ket.tong_ket_tong_gia_tri_dau_tu = 0;
        dong_tong_ket.tong_ket_tong_gia_tri_hien_tai = 0;
        dong_tong_ket.tong_ket_lai_lo_hom_nay = 0;
        dong_tong_ket.tong_ket_lai_lo_luy_ke_tien = 0;
        dong_tong_ket.tong_ket_lai_lo_luy_ke_phan_tram = 0;
        ret.push({ ...dong_danh_muc });
        for (
          let index = 0;
          index < temp_list_item_trading_log.length;
          index++
        ) {
          const item = temp_list_item_trading_log[index];
          if (item.danh_muc != dong_danh_muc.danh_muc) {
            dong_danh_muc.danh_muc = item.danh_muc;
            ten_danh_muc = this.option_filter_category.find(
              (x) => x.value == dong_danh_muc.danh_muc
            ).label;
            dong_danh_muc.tieu_de = "Danh mục: " + ten_danh_muc;
            if (dong_tong_ket.tong_ket_tong_gia_tri_dau_tu > 0) {
              ret.push({ ...dong_tong_ket });
            } else {
              ret.splice(-1);
            }
            ret.push({ ...dong_danh_muc });
            dong_tong_ket.tong_ket_khoi_luong_ton = 0;
            dong_tong_ket.tong_ket_tong_gia_tri_dau_tu = 0;
            dong_tong_ket.tong_ket_tong_gia_tri_hien_tai = 0;
            dong_tong_ket.tong_ket_lai_lo_hom_nay = 0;
            dong_tong_ket.tong_ket_lai_lo_luy_ke_tien = 0;
            dong_tong_ket.tong_ket_lai_lo_luy_ke_phan_tram = 0;
          }
          const tong_khoi_luong_mua = parseFloat(
            temp_list_item_trading_log[index]["tong_khoi_luong_mua"]
          );
          const tong_khoi_luong_ban = parseFloat(
            temp_list_item_trading_log[index]["tong_khoi_luong_ban"]
          );
          const khoi_luong_ton = parseFloat(
            temp_list_item_trading_log[index]["tong_khoi_luong"]
          );
          let tong_gia_tri_dau_tu = parseFloat(
            temp_list_item_trading_log[index]["tong_gia_tri_dau_tu"]
          );
          let gia_trung_binh = parseFloat(
            temp_list_item_trading_log[index]["gia_trung_binh"]
          );
          const gia_hien_tai = parseFloat(
            temp_list_item_trading_log[index]["lastprice"] / 1000
          );
          const tong_gia_tri_hien_tai = gia_hien_tai * khoi_luong_ton;
          const ten_cong_ty =
            this.$store.state.list_mack_company.hasOwnProperty(item.mack)
              ? this.$store.state.list_mack_company[item.mack].ten_cong_ty
              : "";
          const lai_lo_hom_nay =
            parseFloat(temp_list_item_trading_log[index]["change"]) *
            khoi_luong_ton;
          let lai_lo_luy_ke_tien =
            (gia_hien_tai - gia_trung_binh) * khoi_luong_ton;
          let lai_lo_luy_ke_phan_tram =
            (gia_hien_tai / gia_trung_binh - 1) * 100;
          dong_tong_ket.tong_ket_khoi_luong_ton += khoi_luong_ton;
          dong_tong_ket.tong_ket_tong_gia_tri_dau_tu += tong_gia_tri_dau_tu;
          dong_tong_ket.tong_ket_tong_gia_tri_hien_tai += tong_gia_tri_hien_tai;
          dong_tong_ket.tong_ket_lai_lo_hom_nay += lai_lo_hom_nay;
          dong_tong_ket.tong_ket_lai_lo_luy_ke_tien += lai_lo_luy_ke_tien;
          dong_tong_ket.tong_ket_lai_lo_luy_ke_phan_tram +=
            lai_lo_luy_ke_phan_tram;
          // if (lai_lo_luy_ke_phan_tram < 7) {
          //   this.$toast.warning(
          //     "Mã " +
          //       temp_list_item_trading_log[index]["mack"] +
          //       " đang có tỉ lệ lãi/lỗ là " +
          //       lai_lo_luy_ke_phan_tram.toLocaleString("en", {
          //         minimumFractionDigits: 0,
          //         maximumFractionDigits: 2,
          //       })
          //   );
          // }
          if (khoi_luong_ton > 0) {
            ret.push({
              mack: temp_list_item_trading_log[index]["mack"],
              ten_cong_ty: ten_cong_ty,
              khoi_luong_ton: this.formatMoney(khoi_luong_ton, 0, 0),
              gia_trung_binh: this.formatMoney(gia_trung_binh, 0, 2),
              tong_gia_tri_dau_tu: this.formatMoney(tong_gia_tri_dau_tu, 0, 0),
              gia_hien_tai: this.formatMoney(gia_hien_tai, 2, 2),
              tong_gia_tri_hien_tai: this.formatMoney(
                tong_gia_tri_hien_tai,
                0,
                2
              ),
              lai_lo_hom_nay: lai_lo_hom_nay,
              change: temp_list_item_trading_log[index]["change"],
              perchange: temp_list_item_trading_log[index]["perchange"],
              cl: temp_list_item_trading_log[index]["cl"],
              lai_lo_luy_ke_tien: lai_lo_luy_ke_tien,
              lai_lo_luy_ke_phan_tram: lai_lo_luy_ke_phan_tram,
              loai_hien_thi: "giao_dich",
            });
          }
        }
        if (dong_tong_ket.tong_ket_khoi_luong_ton > 0) {
          ret.push({ ...dong_tong_ket });
        } else {
          ret.splice(-1);
        }
      }
      return ret;
    },

    totalValueAll() {
      let total = {};
      total.tong_ket_tong_gia_tri_dau_tu = 0;
      total.tong_ket_tong_gia_tri_hien_tai = 0;
      total.tong_ket_lai_lo_hom_nay = 0;
      total.tong_ket_lai_lo_luy_ke_tien = 0;
      total.tong_ket_lai_lo_luy_ke_phan_tram = 0;
      for (const item of this.itemTradingLog) {
        if (item.loai_hien_thi == "tieu_de_tong_ket") {
          total.tong_ket_tong_gia_tri_dau_tu +=
            item.tong_ket_tong_gia_tri_dau_tu;
          total.tong_ket_tong_gia_tri_hien_tai +=
            item.tong_ket_tong_gia_tri_hien_tai;
          total.tong_ket_lai_lo_hom_nay += item.tong_ket_lai_lo_hom_nay;
          total.tong_ket_lai_lo_luy_ke_tien += item.tong_ket_lai_lo_luy_ke_tien;
          total.tong_ket_lai_lo_luy_ke_phan_tram +=
            item.tong_ket_lai_lo_luy_ke_phan_tram;
        }
      }
      return total;
    },

    fieldExportExcel() {
      return {
        "Mã CK": "mack",
        "Khối lượng tồn": "khoi_luong_ton",
        "Giá trung bình": "gia_trung_binh",
        "Giá hiện tại": "gia_hien_tai",
        "Tổng giá trị đầu tư": "tong_gia_tri_dau_tu",
        "Tổng giá trị hiện tại": "tong_gia_tri_hien_tai",
        "Lãi/Lỗ hôm nay": "lai_lo_hom_nay",
        "Lãi/Lỗ lũy kế nghìn đồng": "lai_lo_luy_ke_tien",
        "Lãi/Lỗ lũy kế phần trăm": "lai_lo_luy_ke_phan_tram",
      };
    },
    itemExportExcel() {
      let return_data = [];
      if (
        this.itemTradingLog.length > 0 &&
        this.option_filter_category.length > 0
      ) {
        return_data = this.itemTradingLog.map((item) => {
          if (item.loai_hien_thi == "tieu_de_danh_muc") {
            return { mack: item.tieu_de };
          } else if (item.loai_hien_thi == "tieu_de_tong_ket") {
            return {
              ...item,
              mack: item.tieu_de,
              lai_lo_hom_nay: item.tong_ket_lai_lo_hom_nay,
              lai_lo_luy_ke_phan_tram:
                (item.tong_ket_lai_lo_luy_ke_tien /
                  item.tong_ket_tong_gia_tri_dau_tu) *
                100,
              lai_lo_luy_ke_tien: item.tong_ket_lai_lo_luy_ke_tien,
              tong_gia_tri_dau_tu: item.tong_ket_tong_gia_tri_dau_tu,
              tong_gia_tri_hien_tai: item.tong_ket_tong_gia_tri_hien_tai,
            };
          } else if (item.loai_hien_thi == "giao_dich") {
            let temp_item = { ...item };
            return temp_item;
          }
        });
        return_data.push({
          mack: "Tổng kết toàn bộ",
          lai_lo_hom_nay: this.totalValueAll.tong_ket_lai_lo_hom_nay,
          lai_lo_luy_ke_phan_tram:
            (this.totalValueAll.tong_ket_lai_lo_luy_ke_tien /
              this.totalValueAll.tong_ket_tong_gia_tri_dau_tu) *
            100,
          lai_lo_luy_ke_tien: this.totalValueAll.tong_ket_lai_lo_luy_ke_tien,
          tong_gia_tri_dau_tu: this.totalValueAll.tong_ket_tong_gia_tri_dau_tu,
          tong_gia_tri_hien_tai:
            this.totalValueAll.tong_ket_tong_gia_tri_hien_tai,
        });
      }
      return return_data;
    },
  },
  beforeDestroy() {
    window.socket_send.emit("leave", this.list_data_mack);
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
.datatable-profit {
  .display-inline-flex {
    display: inline-flex;
  }
  .table {
    th {
      vertical-align: middle;
      padding: 0.15rem 0.75rem !important;
    }
    td {
      padding: 0.15rem 0.75rem !important;
    }
    .border-bottom-spacing {
      border-bottom: 3px solid #5b2e81;
    }
  }
}
.margin-top-1-7rem {
  margin-top: 1.7rem;
}
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
