<template>
  <div>
    <CCard class="mb-1">
      <CCardHeader>
        <CRow>
          <CCol md="6" class="mb-2">
            <p class="h5">Phân bố vốn theo % cắt lỗ trên tài sản</p>
            <CRow class="border py-2 mt-4 mx-1">
              <CCol xl="5" class="mb-2 d-flex align-items-center">
                Danh mục
              </CCol>
              <CCol xl="7">
                <CSelect
                  :value.sync="data_filter_category"
                  :options="option_filter_category"
                  class="mb-2"
                >
                </CSelect>
              </CCol>
              <CCol xl="5" class="mb-2 d-flex align-items-center">
                Tổng tài sản
              </CCol>
              <CCol xl="7">
                <div role="group" class="mb-2 form-group">
                  <div class="input-group">
                    <input
                      v-money="money"
                      placeholder="Nhập giá trị."
                      v-model.lazy="tong_tai_san"
                      type="text"
                      class="form-control text-right"
                      :class="$v.tong_tai_san.$error && 'is-invalid'"
                      v-model="tong_tai_san"
                    />
                    <div class="input-group-append">
                      <span class="input-group-text">VNĐ</span>
                    </div>
                  </div>
                </div>
              </CCol>
              <CCol xl="5" class="mb-2 d-flex align-items-center">
                % Cắt lỗ tối đa trên tổng tài sản
              </CCol>
              <CCol xl="7">
                <div role="group" class="mb-2 form-group">
                  <div class="input-group">
                    <input
                      placeholder="Nhập giá trị."
                      v-model.lazy="phan_tram_cutloss_toi_da"
                      type="text"
                      class="form-control text-right"
                      :class="$v.phan_tram_cutloss_toi_da.$error && 'is-invalid'"
                      v-model="phan_tram_cutloss_toi_da"
                    />
                    <div class="input-group-append">
                      <span class="input-group-text" style="width: 55px"> % </span>
                    </div>
                  </div>
                </div>
              </CCol>
              <CCol xl="5" class="mb-2 d-flex align-items-center" style="white-space: no-wrap">
                Giá trị cắt lỗ tối đa trên tổng tài sản
              </CCol>
              <CCol xl="7">
                <CInput
                  class="align-items-center mb-2"
                  addInputClasses="text-right"
                  v-model="gia_tri_cutloss_toi_da"
                  disabled
                >
                  <template #append>
                    <span class="input-group-text"> VNĐ </span>
                  </template>
                </CInput>
              </CCol>
              <CCol xl="5" class="mb-2 d-flex align-items-center">
                % Cắt lỗ trên mỗi deal
              </CCol>
              <CCol xl="7">
                <div role="group" class="mb-2 form-group">
                  <div class="input-group">
                    <input
                      placeholder="Nhập giá trị."
                      v-model.lazy="phan_tram_muc_giam_gia_tu_mua"
                      type="text"
                      class="form-control text-right"
                      :class="$v.phan_tram_muc_giam_gia_tu_mua.$error && 'is-invalid'"
                      v-model="phan_tram_muc_giam_gia_tu_mua"
                    />
                    <div class="input-group-append">
                      <span class="input-group-text" style="width: 55px"> % </span>
                    </div>
                  </div>
                </div>
              </CCol>
              <CCol xl="5" class="d-flex align-items-center mt-3">
                Kết quả
              </CCol>
              <CCol xl="7"> </CCol>
              <CCol xl="5" class="mb-2 d-flex align-items-center">
                Phân bổ vốn cho 1 deal
              </CCol>
              <CCol xl="7">
                <CInput
                  class="align-items-center mb-2"
                  :addInputClasses="['text-right', check_phan_bo_von_vuot_qua_so_tien_kha_dung && 'is-invalid']"
                  v-model="phan_bo_von_cho_1_deal"
                  disabled
                >
                  <template #append>
                    <span class="input-group-text"> VNĐ </span>
                  </template>
                </CInput>
              </CCol>
            </CRow>
            <p
              v-if="check_phan_bo_von_vuot_qua_so_tien_kha_dung"
              class="mt-2 font-italic"
            >
              * Số tiền phân bố vốn vượt quá số tiền khả dụng. Bạn sẽ phải dùng
              margin với mức phân bố này
            </p>
          </CCol>
          <CCol md="6">
            <p class="h5">Thống kê tài sản</p>
            <CRow class="border py-2 mt-4 mx-1">
              <CCol
                sm="12"
                md="12"
                lg="12"
                xl="6"
                class="mb-2 d-flex align-items-center"
              >
                <div class="d-flex flex-column" style="width: 100%">
                  <div
                    class="d-flex justify-content-between border-bottom py-2"
                  >
                    <div>Giá vốn chứng khoán của danh mục</div>
                    <div class="ml-3" style="white-space: nowrap">
                      {{ formatMoney(gia_von_cua_chung_khoan, 0, 2) }} VNĐ
                    </div>
                  </div>
                  <div
                    class="d-flex justify-content-between border-bottom py-2"
                  >
                    <div>Số tiền khả dụng của danh mục</div>
                    <div class="ml-3" style="white-space: nowrap">
                      {{ formatMoney(so_tien_kha_dung_cua_danh_muc, 0, 2) }} VNĐ
                    </div>
                  </div>
                  <div
                    class="d-flex justify-content-between border-bottom py-2"
                  >
                    <div>Tổng tài sản của danh mục</div>
                    <div class="ml-3" style="white-space: nowrap">
                      {{ tong_tai_san }} VNĐ
                    </div>
                  </div>
                </div>
              </CCol>
              <CCol
                sm="6"
                md="12"
                lg="12"
                xl="6"
                class="mb-2 d-flex align-items-center"
              >
                <CustomEChart
                  v-if="is_show_chart"
                  :option="option_chart"
                  @syncChartInstance="getChartInstance"
                  style="height: 250px"
                />
              </CCol>
            </CRow>
          </CCol>
        </CRow>
      </CCardHeader>
    </CCard>
  </div>
</template>

<script>
import axios from "axios";
import CustomEChart from "@/views/charts/CustomEchart";
import { required, decimal, numeric, maxValue } from "vuelidate/lib/validators";
const greaterThanZero = (value) => {
  value = parseFloat(value.replaceAll(",", ""));
  if(!isNaN(value) && value > 0){
    return true;
  }
  return false;
};

export default {
  name: "CapitalAllocation",
  components: {
    CustomEChart,
  },
  data() {
    let data_return = {
      money: {
        decimal: ".",
        thousands: ",",
        prefix: "",
        suffix: "",
        precision: 0,
        masked: false /* doesn't work with directive */,
      },
      tong_tai_san: "0",
      phan_tram_cutloss_toi_da: "0",
      phan_tram_muc_giam_gia_tu_mua: "0",
      data_filter_category: "*",
      data_filter_type_trade: "*",
      option_filter_category: [],
      data_filter_category: "",
      chart_instance: null,
      currentIndex: -1,
      is_valid_interval: true,
    };
    return data_return;
  },
  validations: {
    tong_tai_san: {
      required,
      maxValue: greaterThanZero,
    },
    phan_tram_cutloss_toi_da: {
      required,
      maxValue: (value) => !isNaN(parseFloat(value)) && value > 0,
    },
    phan_tram_muc_giam_gia_tu_mua: {
      required,
      maxValue: (value) => !isNaN(parseFloat(value)) && value > 0,
    },
  },
  created() {
    this.getDataCategory();
  },
  methods: {
    getDataCategory() {
      axios
        .get(this.$apiAdress + "/api/stocks/category/get-all", {
          params: {
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          for (let item of res.data) {
            this.option_filter_category.push({
              value: item.id,
              label: item.name,
            });
          }
          this.data_filter_category = this.option_filter_category[0].value;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getChartInstance(instance) {
      this.chart_instance = instance;
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
    gia_tri_cutloss_toi_da() {
      const tong_tai_san_temp = parseFloat(
        this.tong_tai_san.replaceAll(",", "")
      );
      const phan_tram_cutloss_toi_da_temp = parseFloat(
        this.phan_tram_cutloss_toi_da.replaceAll(",", "")
      );
      let rs = 0;
      if (!isNaN(tong_tai_san_temp) && !isNaN(phan_tram_cutloss_toi_da_temp)) {
        rs = tong_tai_san_temp / 100 * phan_tram_cutloss_toi_da_temp;
      }
      return this.$function_global.formatMoney(rs, 0, 2);
    },
    phan_bo_von_cho_1_deal() {
      const phan_tram_muc_giam_gia_tu_mua_temp = parseFloat(
        this.phan_tram_muc_giam_gia_tu_mua.trim().replaceAll(",", "")
      );
      const gia_tri_cutloss_toi_da_temp = parseFloat(
        this.gia_tri_cutloss_toi_da.trim().replaceAll(",", "")
      );
      let rs = 0;
      if (
        !isNaN(phan_tram_muc_giam_gia_tu_mua_temp) &&
        !isNaN(gia_tri_cutloss_toi_da_temp) &&
        phan_tram_muc_giam_gia_tu_mua_temp != 0
      ) {
        rs =
          (gia_tri_cutloss_toi_da_temp / phan_tram_muc_giam_gia_tu_mua_temp) *
          100;
      }
      return this.$function_global.formatMoney(rs, 0, 2);
    },
    gia_von_cua_chung_khoan() {
      if (this.itemTradingLog.length > 2) {
        return (
          this.itemTradingLog[this.itemTradingLog.length - 1]
            .tong_ket_tong_gia_tri_dau_tu * 1000
        );
      }
      return 0;
    },
    so_tien_kha_dung_cua_danh_muc() {
      const tong_tai_san_temp = parseFloat(
        this.tong_tai_san.replaceAll(",", "")
      );
      if (
        !isNaN(tong_tai_san_temp) &&
        !isNaN(this.gia_von_cua_chung_khoan) &&
        tong_tai_san_temp != 0
      ) {
        return tong_tai_san_temp - this.gia_von_cua_chung_khoan;
      }
      return 0;
    },
    check_phan_bo_von_vuot_qua_so_tien_kha_dung() {
      const phan_bo_von_cho_1_deal_temp = parseFloat(
        this.phan_bo_von_cho_1_deal.replaceAll(",", "")
      );
      if (
        phan_bo_von_cho_1_deal_temp > this.so_tien_kha_dung_cua_danh_muc &&
        phan_bo_von_cho_1_deal_temp != 0
      ) {
        return true;
      }
      return false;
    },
    data_trading_log() {
      let data_return = [];
      if (
        this.$store.state.data_trading_log.length > 0 &&
        Object.keys(this.$store.state.data_eod).length > 0
      ) {
        let data_trading_temp = [...this.$store.state.data_trading_log];
        data_trading_temp = data_trading_temp.filter(
          (item) => this.data_filter_category == item.danh_muc
        );
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
    list_data_in_chart() {
      let return_data = [];
      if(this.itemTradingLog.length > 2){
        let tong_tai_san_temp = parseFloat(
          this.tong_tai_san.replaceAll(",", "")
        );
        if(isNaN(tong_tai_san_temp)){
          tong_tai_san_temp = 0;
        }
        for (const item of this.itemTradingLog) {
          if(item.loai_hien_thi == "giao_dich"){
            const tong_gia_tri_dau_tu_temp = parseFloat(
              item.tong_gia_tri_dau_tu.replaceAll(",", "")
            );
            return_data.push({
              name: item.mack,
              value: tong_tai_san_temp != 0 ? parseFloat(tong_gia_tri_dau_tu_temp) * 100000 / tong_tai_san_temp : 0,
            })
          }
        }
        return_data.push({
          name: "Tiền",
          value: tong_tai_san_temp != 0 ? parseFloat(this.so_tien_kha_dung_cua_danh_muc) / tong_tai_san_temp * 100 : 0,
        })
        return_data = return_data.map(item => {
          return {
            ...item,
            value: this.formatMoney(item.value, 0, 2)
          }
        })
      }
      return return_data;
    },
    is_show_chart() {
      let tong_tai_san_temp = parseFloat(
        this.tong_tai_san.replaceAll(",", "")
      );
      if(isNaN(tong_tai_san_temp)){
        tong_tai_san_temp = 0;
      }
      if(this.list_data_in_chart.length > 0 && tong_tai_san_temp != 0 && this.so_tien_kha_dung_cua_danh_muc > 0){
        return true;
      }
      return false;
    },
    option_chart() {
      let return_data = {
        series: [
          {
            type: "pie",
            center: ["50%", "50%"],
            data: [],
          },
        ],
      };
      if(this.is_show_chart){
        return_data = {
          tooltip: {
            trigger: "item",
            formatter: "{b}: {c}%",
          },
          series: [
            {
              type: "pie",
              center: ["50%", "50%"],
              data: this.list_data_in_chart,
            },
            {
              type: "pie",
              center: ["50%", "50%"],
              label: {
                formatter: "{c}%",
                color: this.$store.state.darkMode ? "#fff" : "#000",
                position: "inside",
              },
              data: this.list_data_in_chart,
            },
          ],
        };
      }
      return return_data;
    },
  },
  mounted() {
    // setInterval(() => {
    //   if (this.chart_instance && this.is_valid_interval && this.is_show_chart) {
    //     this.chart_instance.dispatchAction({
    //       type: "downplay",
    //       seriesIndex: 0,
    //       dataIndex: this.currentIndex,
    //     });
    //     this.currentIndex =
    //       (this.currentIndex + 1) % this.option_chart.series[0].data.length;
    //     this.chart_instance.dispatchAction({
    //       type: "highlight",
    //       seriesIndex: 0,
    //       dataIndex: this.currentIndex,
    //     });
    //     this.chart_instance.dispatchAction({
    //       type: "showTip",
    //       seriesIndex: 0,
    //       dataIndex: this.currentIndex,
    //     });
    //   }
    // }, 1000);
  },
  beforeDestroy(){
    this.is_valid_interval = false;
  },
  watch: {
    tong_tai_san() {
      this.$v.tong_tai_san.$touch();
    },
    phan_tram_cutloss_toi_da() {
      this.$v.phan_tram_cutloss_toi_da.$touch();
    },
    phan_tram_muc_giam_gia_tu_mua() {
      this.$v.phan_tram_muc_giam_gia_tu_mua.$touch();
    },
  },
};
</script>
<style lang="scss"></style>
