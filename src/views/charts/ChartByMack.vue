<template>
  <CRow class="mt-3">
    <CCol sm="4" class="mb-3 pl-2 pr-2">
      <CCard>
        <CElementCover
          :opacity="1"
          v-if="chartdata_doanh_thu_loi_nhuan_quy_is_loading"
          :style="
            $store.state.darkMode
              ? { 'background-color': 'fff' }
              : { 'background-color': '000' }
          "
          ><CSpinner size="5xl" color="success" />
        </CElementCover>
        <CustomChart
          :chartdata="chartdata_doanh_thu_loi_nhuan_quy"
          :options="options_doanh_thu_loi_nhuan_quy"
          :style="{ height: '350px' }"
        />
      </CCard>
    </CCol>
    <CCol sm="4" class="mb-3 pl-2 pr-2">
      <CCard>
        <CElementCover
          :opacity="1"
          v-if="chartdata_bien_lai_quy_is_loading"
          :style="
            $store.state.darkMode
              ? { 'background-color': 'fff' }
              : { 'background-color': '000' }
          "
          ><CSpinner size="5xl" color="success" />
        </CElementCover>
        <CustomChart
          :chartdata="chartdata_bien_lai_quy"
          :options="options_bien_lai_quy"
          :style="{ height: '350px' }"
        />
      </CCard>
    </CCol>
    <CCol sm="4" class="mb-3 pl-2 pr-2">
      <CCard>
        <CElementCover
          :opacity="1"
          v-if="chartdata_hieu_suat_hoat_dong_ttm_is_loading"
          :style="
            $store.state.darkMode
              ? { 'background-color': 'fff' }
              : { 'background-color': '000' }
          "
          ><CSpinner size="5xl" color="success" />
        </CElementCover>
        <CustomChart
          :chartdata="chartdata_hieu_suat_hoat_dong_ttm"
          :options="options_hieu_suat_hoat_dong_ttm"
          :style="{ height: '350px' }"
        />
      </CCard>
    </CCol>
    <CCol sm="4" class="mb-3 pl-2 pr-2">
      <CCard>
        <CElementCover
          :opacity="1"
          v-if="chartdata_kha_nang_thanh_toan_ttm_is_loading"
          :style="
            $store.state.darkMode
              ? { 'background-color': 'fff' }
              : { 'background-color': '000' }
          "
          ><CSpinner size="5xl" color="success" />
        </CElementCover>
        <CustomChart
          :chartdata="chartdata_kha_nang_thanh_toan_ttm"
          :options="options_kha_nang_thanh_toan_ttm"
          :style="{ height: '350px' }"
        />
      </CCard>
    </CCol>
    <CCol sm="4" class="mb-3 pl-2 pr-2">
      <CCard>
        <CElementCover
          :opacity="1"
          v-if="chartdata_luu_chuyen_tien_quy_is_loading"
          :style="
            $store.state.darkMode
              ? { 'background-color': 'fff' }
              : { 'background-color': '000' }
          "
          ><CSpinner size="5xl" color="success" />
        </CElementCover>
        <CustomChart
          :chartdata="chartdata_luu_chuyen_tien_quy"
          :options="options_luu_chuyen_tien_quy"
          :style="{ height: '350px' }"
        />
      </CCard>
    </CCol>
    <CCol sm="4" class="mb-3 pl-2 pr-2">
      <CCard>
        <CElementCover
          :opacity="1"
          v-if="chartdata_phan_ra_roa_ttm_is_loading"
          :style="
            $store.state.darkMode
              ? { 'background-color': 'fff' }
              : { 'background-color': '000' }
          "
          ><CSpinner size="5xl" color="success" />
        </CElementCover>
        <CustomChart
          :chartdata="chartdata_phan_ra_roa_ttm"
          :options="options_phan_ra_roa_ttm"
          :style="{ height: '350px' }"
        />
      </CCard>
    </CCol>
    <CCol sm="4" class="mb-3 pl-2 pr-2">
      <CCard>
        <CElementCover
          :opacity="1"
          v-if="chartdata_phan_ra_roe_ttm_is_loading"
          :style="
            $store.state.darkMode
              ? { 'background-color': 'fff' }
              : { 'background-color': '000' }
          "
          ><CSpinner size="5xl" color="success" />
        </CElementCover>
        <CustomChart
          :chartdata="chartdata_phan_ra_roe_ttm"
          :options="options_phan_ra_roe_ttm"
          :style="{ height: '350px' }"
        />
      </CCard>
    </CCol>
    <CCol sm="4" class="mb-3 pl-2 pr-2">
      <CCard>
        <CElementCover
          :opacity="1"
          v-if="chartdata_tai_san_quy_is_loading"
          :style="
            $store.state.darkMode
              ? { 'background-color': 'fff' }
              : { 'background-color': '000' }
          "
          ><CSpinner size="5xl" color="success" />
        </CElementCover>
        <CustomChart
          :chartdata="chartdata_tai_san_quy"
          :options="options_tai_san_quy"
          :style="{ height: '350px' }"
        />
      </CCard>
    </CCol>
    <CCol sm="4" class="mb-3 pl-2 pr-2">
      <CCard>
        <CElementCover
          :opacity="1"
          v-if="chartdata_nguon_von_quy_is_loading"
          :style="
            $store.state.darkMode
              ? { 'background-color': 'fff' }
              : { 'background-color': '000' }
          "
          ><CSpinner size="5xl" color="success" />
        </CElementCover>
        <CustomChart
          :chartdata="chartdata_nguon_von_quy"
          :options="options_nguon_von_quy"
          :style="{ height: '350px' }"
        />
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import CTableWrapper from "@/views/base/Table.vue";
import CustomChart from "@/views/charts/CustomChart";
import axios from "axios";

export default {
  name: "ChartByMack",
  props: {
    mack: {
      type: String,
      default: "HPG",
    },
  },
  // ONLOAD
  created() {
    this.mackChange();
  },
  components: {
    CTableWrapper,
    CustomChart,
  },

  data() {
    let colorFontByDarkMode = this.$store.state.darkMode ? "#fff" : "#000";
    let return_data = {
      chartdata_doanh_thu_loi_nhuan_quy: {
        labels: [],
        datasets: [],
      },
      chartdata_doanh_thu_loi_nhuan_quy_is_loading: true,
      chartdata_tai_san_quy: {
        labels: [],
        datasets: [],
      },
      chartdata_tai_san_quy_is_loading: true,
      chartdata_nguon_von_quy: {
        labels: [],
        datasets: [],
      },
      chartdata_nguon_von_quy_is_loading: true,
      chartdata_luu_chuyen_tien_quy: {
        labels: [],
        datasets: [],
      },
      chartdata_luu_chuyen_tien_quy_is_loading: true,
      chartdata_kha_nang_thanh_toan_quy: {
        labels: [],
        datasets: [],
      },
      chartdata_kha_nang_thanh_toan_ttm: {
        labels: [],
        datasets: [],
      },
      chartdata_kha_nang_thanh_toan_ttm_is_loading: true,
      chartdata_bien_lai_quy: {
        labels: [],
        datasets: [],
      },
      chartdata_bien_lai_quy_is_loading: true,
      chartdata_hieu_suat_hoat_dong_ttm: {
        labels: [],
        datasets: [],
      },
      chartdata_hieu_suat_hoat_dong_ttm_is_loading: true,
      chartdata_phan_ra_roa_ttm: {
        labels: [],
        datasets: [],
      },
      chartdata_phan_ra_roa_ttm_is_loading: true,
      chartdata_phan_ra_roe_ttm: {
        labels: [],
        datasets: [],
      },
      chartdata_phan_ra_roe_ttm_is_loading: true,
    };
    return return_data;
  },
  methods: {
    doanhThuLoiNhuanQuy() {
      let self = this;
      let doanh_thu_thuan = {
        label: "Doanh thu thuần",
        data: [],
        backgroundColor: this.color("blue"),
        borderColor: this.color("blue"),
        fill: false,
        borderWidth: 1,
        yAxisID: "A",
      };
      let loi_nhuan_sau_thue_tndn = {
        label: "Lợi nhuận sau thuế (YoY)",
        data: [],
        backgroundColor: this.color("orange"),
        borderColor: this.color("orange"),
        fill: false,
        type: "line",
        borderWidth: 1,
        yAxisID: "B",
      };
      let loi_nhuan_sau_thue_cua_co_dong_cua_cong_ty_me = {
        label: "Lợi nhuận sau thuế của công ty mẹ",
        data: [],
        backgroundColor: this.color("red"),
        borderColor: this.color("red"),
        fill: false,
        borderWidth: 1,
        yAxisID: "A",
      };
      let cong_doanh_thu_hoat_dong = {
        label: "Doanh thu thuần",
        data: [],
        backgroundColor: this.color("blue"),
        borderColor: this.color("blue"),
        fill: false,
        borderWidth: 1,
        yAxisID: "A",
        order: 2,
      };
      let loi_nhuan_ke_toan_sau_thue_tndn = {
        label: "Lợi nhuận sau thuế",
        data: [],
        backgroundColor: this.color("orange"),
        borderColor: this.color("orange"),
        fill: false,
        borderWidth: 1,
        yAxisID: "A",
        order: 2,
      };
      let tang_truong_lnst = {
        label: "Tăng trưởng LNST so với quý cùng kỳ",
        data: [],
        backgroundColor: this.color("red"),
        borderColor: this.color("red"),
        fill: false,
        borderWidth: 1,
        yAxisID: "B",
        type: "line",
        order: 1,
      };
      this.chartdata_doanh_thu_loi_nhuan_quy_is_loading = true;
      axios
        .get(this.$apiAdress + "/api/stocks/chart/doanh-thu-loi-nhuan-quy", {
          params: {
            mack: self.mack,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          self.chartdata_doanh_thu_loi_nhuan_quy.labels = [];
          let typeBank = res.data[0];
          res.data.forEach((item, index) => {
            if (index === 0) {
              return;
            }
            self.chartdata_doanh_thu_loi_nhuan_quy.labels.unshift(
              item.thoigian.slice(0, 2) + "/" + item.thoigian.slice(-2)
            );
            if (typeBank === "nonbank") {
              doanh_thu_thuan.data.unshift(item.doanh_thu_thuan);
              loi_nhuan_sau_thue_tndn.data.unshift(
                item.loi_nhuan_sau_thue_tndn
              );
              loi_nhuan_sau_thue_cua_co_dong_cua_cong_ty_me.data.unshift(
                item.loi_nhuan_sau_thue_cua_co_dong_cua_cong_ty_me
              );
            } else if (typeBank === "stock") {
              cong_doanh_thu_hoat_dong.data.unshift(
                item.cong_doanh_thu_hoat_dong
              );
              loi_nhuan_ke_toan_sau_thue_tndn.data.unshift(
                item.loi_nhuan_ke_toan_sau_thue_tndn
              );
              tang_truong_lnst.data.unshift(item.tang_truong_lnst);
            }
          });
          this.chartdata_doanh_thu_loi_nhuan_quy.datasets = [];
          if (typeBank === "nonbank") {
            this.chartdata_doanh_thu_loi_nhuan_quy.datasets.push(
              doanh_thu_thuan
            );
            this.chartdata_doanh_thu_loi_nhuan_quy.datasets.push(
              loi_nhuan_sau_thue_tndn
            );
            this.chartdata_doanh_thu_loi_nhuan_quy.datasets.push(
              loi_nhuan_sau_thue_cua_co_dong_cua_cong_ty_me
            );
          } else if (typeBank === "stock") {
            this.chartdata_doanh_thu_loi_nhuan_quy.datasets.push(
              cong_doanh_thu_hoat_dong
            );
            this.chartdata_doanh_thu_loi_nhuan_quy.datasets.push(
              loi_nhuan_ke_toan_sau_thue_tndn
            );
            this.chartdata_doanh_thu_loi_nhuan_quy.datasets.push(
              tang_truong_lnst
            );
          }
          this.chartdata_doanh_thu_loi_nhuan_quy_is_loading = false;
        })
        .catch((err) => {
          self.chartdata_doanh_thu_loi_nhuan_quy.datasets = [];
          this.chartdata_doanh_thu_loi_nhuan_quy_is_loading = false;
        });
    },
    taiSanQuy() {
      let self = this;
      let tien_va_cac_khoan_tuong_duong_tien = {
        label: "Tiền và tương đương tiền",
        data: [],
        backgroundColor: this.color("blue"),
        borderColor: this.color("blue"),
        fill: false,
        borderWidth: 1,
      };
      let cac_khoan_dau_tu_tai_chinh_ngan_han = {
        label: "Đầu tư tài chính ngắn hạn",
        data: [],
        backgroundColor: this.color("orange"),
        borderColor: this.color("orange"),
        fill: false,
        borderWidth: 1,
      };
      let tong_hang_ton_kho = {
        label: "Tổng hàng tồn kho",
        data: [],
        backgroundColor: this.color("yellow"),
        borderColor: this.color("yellow"),
        fill: false,
        borderWidth: 1,
      };
      let tai_san_ngan_han_khac = {
        label: "Tài sản ngắn hạn khác",
        data: [],
        backgroundColor: this.color("purple"),
        borderColor: this.color("purple"),
        fill: false,
        borderWidth: 1,
      };
      let tai_san_co_dinh = {
        label: "Tài sản cố định",
        data: [],
        backgroundColor: this.color("grey"),
        borderColor: this.color("grey"),
        fill: false,
        borderWidth: 1,
      };
      let cac_khoan_phai_thu = {
        label: "Các khoản phải thu",
        data: [],
        backgroundColor: this.color("green"),
        borderColor: this.color("green"),
        fill: false,
        borderWidth: 1,
      };
      let bat_dong_san_dau_tu = {
        label: "Bất động sản đầu tư",
        data: [],
        backgroundColor: this.color("red"),
        borderColor: this.color("red"),
        fill: false,
        borderWidth: 1,
      };
      let tai_san_do_dang_dai_han = {
        label: "Tài sản dở dang dài hạn",
        data: [],
        backgroundColor: "#21a45f",
        borderColor: "#21a45f",
        fill: false,
        borderWidth: 1,
      };
      let cac_khoan_dau_tu_tai_chinh_dai_han = {
        label: "Đầu tư tài chính dài hạn",
        data: [],
        backgroundColor: "#900808",
        borderColor: "#900808",
        fill: false,
        borderWidth: 1,
      };
      let tai_san_dai_han_khac = {
        label: "Tài sản dài hạn khác",
        data: [],
        backgroundColor: "#b99904",
        borderColor: "#b99904",
        fill: false,
        borderWidth: 1,
      };
      this.chartdata_tai_san_quy_is_loading = true;
      axios
        .get(this.$apiAdress + "/api/stocks/chart/tai-san-quy", {
          params: {
            mack: self.mack,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          self.chartdata_tai_san_quy.labels = [];
          res.data.forEach((item) => {
            self.chartdata_tai_san_quy.labels.unshift(
              item.thoigian.slice(0, 2) + "/" + item.thoigian.slice(-2)
            );
            tien_va_cac_khoan_tuong_duong_tien.data.unshift(
              item.tien_va_cac_khoan_tuong_duong_tien
            );
            cac_khoan_dau_tu_tai_chinh_ngan_han.data.unshift(
              item.cac_khoan_dau_tu_tai_chinh_ngan_han
            );
            cac_khoan_phai_thu.data.unshift(item.cac_khoan_phai_thu);
            tong_hang_ton_kho.data.unshift(item.tong_hang_ton_kho);
            tai_san_ngan_han_khac.data.unshift(item.tai_san_ngan_han_khac);
            tai_san_co_dinh.data.unshift(item.tai_san_co_dinh);
            bat_dong_san_dau_tu.data.unshift(item.bat_dong_san_dau_tu);
            tai_san_do_dang_dai_han.data.unshift(item.tai_san_do_dang_dai_han);
            cac_khoan_dau_tu_tai_chinh_dai_han.data.unshift(
              item.cac_khoan_dau_tu_tai_chinh_dai_han
            );
            tai_san_dai_han_khac.data.unshift(item.tai_san_dai_han_khac);
          });
          this.chartdata_tai_san_quy.datasets = [];
          this.chartdata_tai_san_quy.datasets.push(
            tien_va_cac_khoan_tuong_duong_tien
          );
          this.chartdata_tai_san_quy.datasets.push(
            cac_khoan_dau_tu_tai_chinh_ngan_han
          );
          this.chartdata_tai_san_quy.datasets.push(tong_hang_ton_kho);
          this.chartdata_tai_san_quy.datasets.push(tai_san_ngan_han_khac);
          this.chartdata_tai_san_quy.datasets.push(cac_khoan_phai_thu);
          this.chartdata_tai_san_quy.datasets.push(tai_san_co_dinh);
          this.chartdata_tai_san_quy.datasets.push(bat_dong_san_dau_tu);
          this.chartdata_tai_san_quy.datasets.push(tai_san_do_dang_dai_han);
          this.chartdata_tai_san_quy.datasets.push(
            cac_khoan_dau_tu_tai_chinh_dai_han
          );
          this.chartdata_tai_san_quy.datasets.push(tai_san_dai_han_khac);
          this.chartdata_tai_san_quy_is_loading = false;
        })
        .catch((err) => {
          self.chartdata_tai_san_quy.datasets = [];
          this.chartdata_tai_san_quy_is_loading = false;
        });
    },
    nguonVonQuy() {
      let self = this;
      let vay_va_no_thue_tai_chinh_ngan_han = {
        label: "Vay và nợ thuê tài chính ngắn hạn",
        data: [],
        backgroundColor: this.color("blue"),
        borderColor: this.color("blue"),
        fill: false,
        borderWidth: 1,
      };
      let vay_va_no_thue_tai_chinh_dai_han = {
        label: "Vay và nợ thuê tài chính dài hạn",
        data: [],
        backgroundColor: this.color("orange"),
        borderColor: this.color("orange"),
        fill: false,
        borderWidth: 1,
      };
      let phai_tra_nguoi_ban = {
        label: "Phải trả người bán",
        data: [],
        backgroundColor: this.color("green"),
        borderColor: this.color("green"),
        fill: false,
        borderWidth: 1,
      };
      let nguoi_mua_tra_tien_truoc = {
        label: "Người mua trả tiền trước",
        data: [],
        backgroundColor: this.color("purple"),
        borderColor: this.color("purple"),
        fill: false,
        borderWidth: 1,
      };
      let loi_nhuan_sau_thue_chua_phan_phoi = {
        label: "Lợi nhuận sau thuế chưa phân phối",
        data: [],
        backgroundColor: this.color("grey"),
        borderColor: this.color("grey"),
        fill: false,
        borderWidth: 1,
      };
      let thang_du_gop_co_phan = {
        label: "Thặng dư vốn cổ phần",
        data: [],
        backgroundColor: "#b99904",
        borderColor: "#b99904",
        fill: false,
        borderWidth: 1,
      };
      let von_dau_tu_cua_chu_so_huu = {
        label: "Vốn đầu tư của chủ sở hữu",
        data: [],
        backgroundColor: "#21a45f",
        borderColor: "#21a45f",
        fill: false,
        borderWidth: 1,
      };
      let vay_no_khac = {
        label: "Vay nợ khác",
        data: [],
        backgroundColor: this.color("red"),
        borderColor: this.color("red"),
        fill: false,
        borderWidth: 1,
      };
      let von_chu_so_huu_khac = {
        label: "Vốn chủ sở hữu khác",
        data: [],
        backgroundColor: "#e3dd27",
        borderColor: "#e3dd27",
        fill: false,
        borderWidth: 1,
      };
      this.chartdata_nguon_von_quy_is_loading = true;
      axios
        .get(this.$apiAdress + "/api/stocks/chart/nguon-von-quy", {
          params: {
            mack: self.mack,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          self.chartdata_nguon_von_quy.labels = [];
          res.data.forEach((item) => {
            self.chartdata_nguon_von_quy.labels.unshift(
              item.thoigian.slice(0, 2) + "/" + item.thoigian.slice(-2)
            );
            vay_va_no_thue_tai_chinh_ngan_han.data.unshift(
              item.vay_va_no_thue_tai_chinh_ngan_han
            );
            vay_va_no_thue_tai_chinh_dai_han.data.unshift(
              item.vay_va_no_thue_tai_chinh_dai_han
            );
            phai_tra_nguoi_ban.data.unshift(item.phai_tra_nguoi_ban);
            nguoi_mua_tra_tien_truoc.data.unshift(
              item.nguoi_mua_tra_tien_truoc
            );
            loi_nhuan_sau_thue_chua_phan_phoi.data.unshift(
              item.loi_nhuan_sau_thue_chua_phan_phoi
            );
            thang_du_gop_co_phan.data.unshift(item.thang_du_gop_co_phan);
            von_dau_tu_cua_chu_so_huu.data.unshift(
              item.von_dau_tu_cua_chu_so_huu
            );
            vay_no_khac.data.unshift(item.vay_no_khac);
            von_chu_so_huu_khac.data.unshift(item.von_chu_so_huu_khac);
          });
          this.chartdata_nguon_von_quy.datasets = [];
          this.chartdata_nguon_von_quy.datasets.push(
            vay_va_no_thue_tai_chinh_ngan_han
          );
          this.chartdata_nguon_von_quy.datasets.push(
            vay_va_no_thue_tai_chinh_dai_han
          );
          this.chartdata_nguon_von_quy.datasets.push(phai_tra_nguoi_ban);
          this.chartdata_nguon_von_quy.datasets.push(nguoi_mua_tra_tien_truoc);
          this.chartdata_nguon_von_quy.datasets.push(
            loi_nhuan_sau_thue_chua_phan_phoi
          );
          this.chartdata_nguon_von_quy.datasets.push(thang_du_gop_co_phan);
          this.chartdata_nguon_von_quy.datasets.push(von_dau_tu_cua_chu_so_huu);
          //this.chartdata_nguon_von_quy.datasets.push(vay_no_khac);
          //this.chartdata_nguon_von_quy.datasets.push(von_chu_so_huu_khac);
          this.chartdata_nguon_von_quy_is_loading = false;
        })
        .catch((err) => {
          self.chartdata_nguon_von_quy.datasets = [];
          this.chartdata_nguon_von_quy_is_loading = false;
        });
    },
    luuChuyenTienQuy() {
      let self = this;
      let luu_chuyen_tien_thuan_tu_hoat_dong_kinh_doanh = {
        label: "LCTT từ hoạt động kinh doanh",
        data: [],
        backgroundColor: this.color("blue"),
        borderColor: this.color("blue"),
        fill: false,
        borderWidth: 1,
        order: 2,
      };
      let luu_chuyen_tien_thuan_tu_hoat_dong_dau_tu = {
        label: "LCTT từ hoạt động đầu tư",
        data: [],
        backgroundColor: this.color("orange"),
        borderColor: this.color("orange"),
        fill: false,
        borderWidth: 1,
        order: 2,
      };
      let luu_chuyen_tien_thuan_tu_hoat_dong_tai_chinh = {
        label: "LCTT từ hoạt động tài chính",
        data: [],
        backgroundColor: this.color("grey"),
        borderColor: this.color("grey"),
        fill: false,
        borderWidth: 1,
        order: 2,
      };
      let luu_chuyen_tien_thuan_trong_ky = {
        label: "LCTT trong kỳ",
        data: [],
        backgroundColor: this.color("red"),
        borderColor: this.color("red"),
        fill: false,
        type: "line",
        borderWidth: 1,
        order: 1,
      };
      this.chartdata_luu_chuyen_tien_quy_is_loading = true;
      axios
        .get(this.$apiAdress + "/api/stocks/chart/luu-chuyen-tien-quy", {
          params: {
            mack: self.mack,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          self.chartdata_luu_chuyen_tien_quy.labels = [];
          res.data.forEach((item) => {
            self.chartdata_luu_chuyen_tien_quy.labels.unshift(
              item.thoigian.slice(0, 2) + "/" + item.thoigian.slice(-2)
            );
            luu_chuyen_tien_thuan_tu_hoat_dong_kinh_doanh.data.unshift(
              item.luu_chuyen_tien_thuan_tu_hoat_dong_kinh_doanh
            );
            luu_chuyen_tien_thuan_tu_hoat_dong_dau_tu.data.unshift(
              item.luu_chuyen_tien_thuan_tu_hoat_dong_dau_tu
            );
            luu_chuyen_tien_thuan_tu_hoat_dong_tai_chinh.data.unshift(
              item.luu_chuyen_tien_thuan_tu_hoat_dong_tai_chinh
            );
            luu_chuyen_tien_thuan_trong_ky.data.unshift(
              item.luu_chuyen_tien_thuan_trong_ky
            );
          });
          this.chartdata_luu_chuyen_tien_quy.datasets = [];
          this.chartdata_luu_chuyen_tien_quy.datasets.push(
            luu_chuyen_tien_thuan_tu_hoat_dong_kinh_doanh
          );
          this.chartdata_luu_chuyen_tien_quy.datasets.push(
            luu_chuyen_tien_thuan_tu_hoat_dong_dau_tu
          );
          this.chartdata_luu_chuyen_tien_quy.datasets.push(
            luu_chuyen_tien_thuan_tu_hoat_dong_tai_chinh
          );
          this.chartdata_luu_chuyen_tien_quy.datasets.push(
            luu_chuyen_tien_thuan_trong_ky
          );
          this.chartdata_luu_chuyen_tien_quy_is_loading = false;
        })
        .catch((err) => {
          self.chartdata_luu_chuyen_tien_quy.datasets = [];
          this.chartdata_luu_chuyen_tien_quy_is_loading = false;
        });
    },
    khaNangThanhToanTTM() {
      let self = this;
      let nonbank_no_vay_dai_han = {
        label: "Nợ vay dài hạn",
        data: [],
        backgroundColor: this.color("blue"),
        borderColor: this.color("blue"),
        fill: false,
        borderWidth: 1,
        order: 2,
        yAxisID: "B",
      };
      let nonbank_fcf = {
        label: "FCF",
        data: [],
        backgroundColor: this.color("red"),
        borderColor: this.color("red"),
        fill: false,
        borderWidth: 1,
        order: 1,
        yAxisID: "B",
      };
      let nonbank_ocf = {
        label: "OCF",
        data: [],
        backgroundColor: "#21a45f",
        borderColor: "#21a45f",
        fill: false,
        borderWidth: 1,
        order: 1,
        yAxisID: "B",
      };
      let nonbank_thanh_toan_hien_hanh = {
        label: "Thanh toán hiện hành",
        data: [],
        backgroundColor: this.color("grey"),
        borderColor: this.color("grey"),
        fill: false,
        borderWidth: 1,
        order: 2,
        type: "line",
        yAxisID: "A",
      };
      let nonbank_thanh_toan_nhanh = {
        label: "Thanh toán nhanh",
        data: [],
        backgroundColor: this.color("orange"),
        borderColor: this.color("orange"),
        fill: false,
        borderWidth: 1,
        order: 2,
        type: "line",
        yAxisID: "A",
      };
      let stock_no_vay_dai_han = {
        label: "Nợ vay dài hạn",
        data: [],
        backgroundColor: this.color("blue"),
        borderColor: this.color("blue"),
        fill: false,
        borderWidth: 1,
        order: 2,
        yAxisID: "B",
      };
      let stock_fcf = {
        label: "FCF",
        data: [],
        backgroundColor: this.color("red"),
        borderColor: this.color("red"),
        fill: false,
        borderWidth: 1,
        order: 1,
        yAxisID: "B",
      };
      let stock_ocf = {
        label: "OCF",
        data: [],
        backgroundColor: "#21a45f",
        borderColor: "#21a45f",
        fill: false,
        borderWidth: 1,
        order: 1,
        yAxisID: "B",
      };
      let stock_thanh_toan_hien_hanh = {
        label: "Thanh toán hiện hành",
        data: [],
        backgroundColor: this.color("grey"),
        borderColor: this.color("grey"),
        fill: false,
        borderWidth: 1,
        order: 2,
        type: "line",
        yAxisID: "A",
      };
      let stock_thanh_toan_nhanh = {
        label: "Thanh toán nhanh",
        data: [],
        backgroundColor: this.color("orange"),
        borderColor: this.color("orange"),
        fill: false,
        borderWidth: 1,
        order: 2,
        type: "line",
        yAxisID: "A",
      };
      this.chartdata_kha_nang_thanh_toan_ttm_is_loading = true;
      axios
        .get(this.$apiAdress + "/api/stocks/chart/kha-nang-thanh-toan-ttm", {
          params: {
            mack: self.mack,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          self.chartdata_kha_nang_thanh_toan_ttm.labels = [];
          let typeBank = res.data[0];
          res.data.forEach((item, index) => {
            if (index === 0) {
              return;
            }
            self.chartdata_kha_nang_thanh_toan_ttm.labels.unshift(
              item.thoigian.slice(0, 2) + "/" + item.thoigian.slice(-2)
            );
            if (typeBank === "nonbank") {
              nonbank_thanh_toan_hien_hanh.data.unshift(
                item.thanh_toan_hien_hanh
              );
              nonbank_thanh_toan_nhanh.data.unshift(item.thanh_toan_nhanh);
              nonbank_no_vay_dai_han.data.unshift(item.no_vay_dai_han);
              nonbank_fcf.data.unshift(item.fcf);
              nonbank_ocf.data.unshift(item.ocf);
            } else if (typeBank === "stock") {
              stock_thanh_toan_hien_hanh.data.unshift(
                item.thanh_toan_hien_hanh
              );
              stock_thanh_toan_nhanh.data.unshift(item.thanh_toan_nhanh);
              stock_no_vay_dai_han.data.unshift(item.no_vay_dai_han);
              stock_fcf.data.unshift(item.fcf);
              stock_ocf.data.unshift(item.ocf);
            }
          });
          this.chartdata_kha_nang_thanh_toan_ttm.datasets = [];
          if (typeBank === "nonbank") {
            this.chartdata_kha_nang_thanh_toan_ttm.datasets.push(
              nonbank_thanh_toan_hien_hanh
            );
            this.chartdata_kha_nang_thanh_toan_ttm.datasets.push(
              nonbank_thanh_toan_nhanh
            );
            this.chartdata_kha_nang_thanh_toan_ttm.datasets.push(
              nonbank_no_vay_dai_han
            );
            this.chartdata_kha_nang_thanh_toan_ttm.datasets.push(nonbank_fcf);
            this.chartdata_kha_nang_thanh_toan_ttm.datasets.push(nonbank_ocf);
          } else if (typeBank === "stock") {
            this.chartdata_kha_nang_thanh_toan_ttm.datasets.push(
              stock_thanh_toan_hien_hanh
            );
            this.chartdata_kha_nang_thanh_toan_ttm.datasets.push(
              stock_thanh_toan_nhanh
            );
            this.chartdata_kha_nang_thanh_toan_ttm.datasets.push(
              stock_no_vay_dai_han
            );
            this.chartdata_kha_nang_thanh_toan_ttm.datasets.push(stock_fcf);
            this.chartdata_kha_nang_thanh_toan_ttm.datasets.push(stock_ocf);
          }
          this.chartdata_kha_nang_thanh_toan_ttm_is_loading = false;
        })
        .catch((err) => {
          self.chartdata_kha_nang_thanh_toan_ttm.datasets = [];
          this.chartdata_kha_nang_thanh_toan_ttm_is_loading = false;
        });
    },
    bienLaiQuy() {
      let self = this;
      let bien_loi_nhuan_rong = {
        label: "Biên lợi nhuận ròng",
        data: [],
        backgroundColor: this.color("blue"),
        borderColor: this.color("blue"),
        fill: false,
        borderWidth: 1,
        order: 2,
        type: "line",
      };
      let bien_loi_nhuan_gop = {
        label: "Biên lợi nhuận gộp",
        data: [],
        backgroundColor: this.color("orange"),
        borderColor: this.color("orange"),
        fill: false,
        borderWidth: 1,
        order: 2,
        type: "line",
        pointStyle: "rect",
      };
      let bien_loi_nhuan_truoc_thue = {
        label: "Biên lợi nhuận trước thuế",
        data: [],
        backgroundColor: this.color("grey"),
        borderColor: this.color("grey"),
        fill: false,
        borderWidth: 1,
        order: 2,
        type: "line",
        pointStyle: "triangle",
      };
      this.chartdata_bien_lai_quy_is_loading = true;
      axios
        .get(this.$apiAdress + "/api/stocks/chart/bien-lai-quy", {
          params: {
            mack: self.mack,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          self.chartdata_bien_lai_quy.labels = [];
          res.data.forEach((item, index) => {
            if (index === 0) {
              return;
            }
            self.chartdata_bien_lai_quy.labels.unshift(
              item.thoigian.slice(0, 2) + "/" + item.thoigian.slice(-2)
            );
            bien_loi_nhuan_rong.data.unshift(item.bien_loi_nhuan_rong * 100);
            bien_loi_nhuan_gop.data.unshift(item.bien_loi_nhuan_gop * 100);
            bien_loi_nhuan_truoc_thue.data.unshift(
              item.bien_loi_nhuan_truoc_thue * 100
            );
          });
          this.chartdata_bien_lai_quy.datasets = [];
          this.chartdata_bien_lai_quy.datasets.push(bien_loi_nhuan_rong);
          this.chartdata_bien_lai_quy.datasets.push(bien_loi_nhuan_gop);
          this.chartdata_bien_lai_quy.datasets.push(bien_loi_nhuan_truoc_thue);
          this.chartdata_bien_lai_quy_is_loading = false;
        })
        .catch((err) => {
          self.chartdata_bien_lai_quy.datasets = [];
          this.chartdata_bien_lai_quy_is_loading = false;
        });
    },
    hieuSuatHoatDongTTM() {
      let self = this;
      let nonbank_vong_quay_khoan_phai_tra = {
        label: "Vòng quay khoản phải trả",
        data: [],
        backgroundColor: this.color("blue"),
        borderColor: this.color("blue"),
        fill: false,
        borderWidth: 1,
        order: 2,
        type: "line",
        yAxisID: "A",
      };
      let nonbank_vong_quay_hang_ton_kho = {
        label: "Vòng quay hàng tồn kho",
        data: [],
        backgroundColor: this.color("orange"),
        borderColor: this.color("orange"),
        fill: false,
        borderWidth: 1,
        order: 2,
        type: "line",
        pointStyle: "rect",
        yAxisID: "A",
      };
      let nonbank_vong_quay_khoan_phai_thu = {
        label: "Vòng quay các khoản phải thu",
        data: [],
        backgroundColor: this.color("grey"),
        borderColor: this.color("grey"),
        fill: false,
        borderWidth: 1,
        order: 2,
        type: "line",
        yAxisID: "A",
      };
      let nonbank_so_ngay_ton_kho = {
        label: "Số ngày tồn kho",
        data: [],
        backgroundColor: "#1aad3c",
        borderColor: "#1aad3c",
        fill: false,
        borderWidth: 1,
        order: 2,
        type: "line",
        pointStyle: "triangle",
        yAxisID: "B",
      };
      let nonbank_so_ngay_phai_thu = {
        label: "Số ngày phải thu",
        data: [],
        backgroundColor: "#ad241a",
        borderColor: "#ad241a",
        fill: false,
        borderWidth: 1,
        order: 2,
        type: "line",
        pointStyle: "triangle",
        yAxisID: "B",
      };
      let nonbank_so_ngay_phai_tra = {
        label: "Số ngày phải trả",
        data: [],
        backgroundColor: "#ebe423",
        borderColor: "#ebe423",
        fill: false,
        borderWidth: 1,
        order: 2,
        type: "line",
        pointStyle: "triangle",
        yAxisID: "B",
      };
      let stock_vong_quay_khoan_phai_tra = {
        label: "Vòng quay khoản phải trả",
        data: [],
        backgroundColor: this.color("blue"),
        borderColor: this.color("blue"),
        fill: false,
        borderWidth: 1,
        order: 2,
        type: "line",
        yAxisID: "A",
      };
      let stock_vong_quay_khoan_phai_thu = {
        label: "Vòng quay các khoản phải thu",
        data: [],
        backgroundColor: this.color("orange"),
        borderColor: this.color("orange"),
        fill: false,
        borderWidth: 1,
        order: 2,
        type: "line",
        yAxisID: "A",
      };
      let stock_so_ngay_phai_thu = {
        label: "Số ngày phải thu",
        data: [],
        backgroundColor: this.color("orange"),
        borderColor: this.color("orange"),
        fill: false,
        borderWidth: 1,
        order: 2,
        pointStyle: "triangle",
        yAxisID: "B",
      };
      let stock_so_ngay_phai_tra = {
        label: "Số ngày phải trả",
        data: [],
        backgroundColor: this.color("blue"),
        borderColor: this.color("blue"),
        fill: false,
        borderWidth: 1,
        order: 2,
        pointStyle: "triangle",
        yAxisID: "B",
      };
      this.chartdata_hieu_suat_hoat_dong_ttm_is_loading = true;
      axios
        .get(this.$apiAdress + "/api/stocks/chart/hieu-suat-hoat-dong-ttm", {
          params: {
            mack: self.mack,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          self.chartdata_hieu_suat_hoat_dong_ttm.labels = [];
          let typeBank = res.data[0];
          res.data.forEach((item, index) => {
            if (index === 0) {
              return;
            }
            self.chartdata_hieu_suat_hoat_dong_ttm.labels.unshift(
              item.thoigian.slice(0, 2) + "/" + item.thoigian.slice(-2)
            );
            if (typeBank === "nonbank") {
              nonbank_vong_quay_khoan_phai_tra.data.unshift(
                item.vong_quay_khoan_phai_tra
              );
              nonbank_vong_quay_hang_ton_kho.data.unshift(
                item.vong_quay_hang_ton_kho
              );
              nonbank_vong_quay_khoan_phai_thu.data.unshift(
                item.vong_quay_khoan_phai_thu
              );
              nonbank_so_ngay_ton_kho.data.unshift(item.so_ngay_ton_kho);
              nonbank_so_ngay_phai_thu.data.unshift(item.so_ngay_phai_thu);
              nonbank_so_ngay_phai_tra.data.unshift(item.so_ngay_phai_tra);
            } else if (typeBank === "stock") {
              stock_vong_quay_khoan_phai_tra.data.unshift(
                item.vong_quay_khoan_phai_tra
              );
              stock_vong_quay_khoan_phai_thu.data.unshift(
                item.vong_quay_khoan_phai_thu
              );
              stock_so_ngay_phai_thu.data.unshift(item.so_ngay_phai_thu);
              stock_so_ngay_phai_tra.data.unshift(item.so_ngay_phai_tra);
            }
          });
          this.chartdata_hieu_suat_hoat_dong_ttm.datasets = [];
          if (typeBank === "nonbank") {
            this.chartdata_hieu_suat_hoat_dong_ttm.datasets.push(
              nonbank_vong_quay_khoan_phai_tra
            );
            this.chartdata_hieu_suat_hoat_dong_ttm.datasets.push(
              nonbank_vong_quay_hang_ton_kho
            );
            this.chartdata_hieu_suat_hoat_dong_ttm.datasets.push(
              nonbank_vong_quay_khoan_phai_thu
            );
            this.chartdata_hieu_suat_hoat_dong_ttm.datasets.push(
              nonbank_so_ngay_ton_kho
            );
            this.chartdata_hieu_suat_hoat_dong_ttm.datasets.push(
              nonbank_so_ngay_phai_thu
            );
            this.chartdata_hieu_suat_hoat_dong_ttm.datasets.push(
              nonbank_so_ngay_phai_tra
            );
          } else if (typeBank === "stock") {
            this.chartdata_hieu_suat_hoat_dong_ttm.datasets.push(
              stock_vong_quay_khoan_phai_tra
            );
            this.chartdata_hieu_suat_hoat_dong_ttm.datasets.push(
              stock_vong_quay_khoan_phai_thu
            );
            this.chartdata_hieu_suat_hoat_dong_ttm.datasets.push(
              stock_so_ngay_phai_thu
            );
            this.chartdata_hieu_suat_hoat_dong_ttm.datasets.push(
              stock_so_ngay_phai_tra
            );
          }
          this.chartdata_hieu_suat_hoat_dong_ttm_is_loading = false;
        })
        .catch((err) => {
          self.chartdata_hieu_suat_hoat_dong_ttm.datasets = [];
          this.chartdata_hieu_suat_hoat_dong_ttm_is_loading = false;
        });
    },
    phanRaROATTM() {
      let self = this;
      let nonbank_roa_ttm = {
        label: "ROA TTM",
        data: [],
        backgroundColor: this.color("blue"),
        borderColor: this.color("blue"),
        fill: false,
        borderWidth: 1,
        order: 2,
        type: "bar",
        yAxisID: "B",
      };
      let nonbank_vong_quay_tai_san = {
        label: "Vòng quay tài sản",
        data: [],
        backgroundColor: this.color("orange"),
        borderColor: this.color("orange"),
        fill: false,
        borderWidth: 1,
        order: 1,
        type: "line",
        yAxisID: "A",
      };
      let nonbank_ty_suat_loi_nhuan = {
        label: "Tỷ suất lợi nhuận",
        data: [],
        backgroundColor: this.color("grey"),
        borderColor: this.color("grey"),
        fill: false,
        borderWidth: 1,
        order: 1,
        type: "line",
        yAxisID: "A",
      };
      let stock_roa_ttm = {
        label: "ROA TTM",
        data: [],
        backgroundColor: this.color("blue"),
        borderColor: this.color("blue"),
        fill: false,
        borderWidth: 1,
        order: 2,
        type: "bar",
        yAxisID: "B",
      };
      let stock_vong_quay_tai_san = {
        label: "Vòng quay tài sản",
        data: [],
        backgroundColor: this.color("orange"),
        borderColor: this.color("orange"),
        fill: false,
        borderWidth: 1,
        order: 1,
        type: "line",
        yAxisID: "A",
      };
      let stock_ty_suat_loi_nhuan = {
        label: "Tỷ suất lợi nhuận",
        data: [],
        backgroundColor: this.color("grey"),
        borderColor: this.color("grey"),
        fill: false,
        borderWidth: 1,
        order: 1,
        type: "line",
        yAxisID: "A",
      };
      this.chartdata_phan_ra_roa_ttm_is_loading = true;
      axios
        .get(this.$apiAdress + "/api/stocks/chart/phan-ra-roa-ttm", {
          params: {
            mack: self.mack,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          self.chartdata_phan_ra_roa_ttm.labels = [];
          let typeBank = res.data[0];
          res.data.forEach((item, index) => {
            if (index === 0) {
              return;
            }
            self.chartdata_phan_ra_roa_ttm.labels.unshift(
              item.thoigian.slice(0, 2) + "/" + item.thoigian.slice(-2)
            );
            if (typeBank === "nonbank") {
              nonbank_roa_ttm.data.unshift(item.roa_ttm * 100);
              nonbank_vong_quay_tai_san.data.unshift(item.vong_quay_tai_san * 100);
              nonbank_ty_suat_loi_nhuan.data.unshift(item.ty_suat_loi_nhuan * 100);
            } else if (typeBank === "stock") {
              stock_roa_ttm.data.unshift(item.roa_ttm * 100);
              stock_vong_quay_tai_san.data.unshift(item.vong_quay_tai_san * 100);
              stock_ty_suat_loi_nhuan.data.unshift(item.ty_suat_loi_nhuan * 100);
            }
          });
          this.chartdata_phan_ra_roa_ttm.datasets = [];
          if (typeBank === "nonbank") {
            this.chartdata_phan_ra_roa_ttm.datasets.push(nonbank_roa_ttm);
            this.chartdata_phan_ra_roa_ttm.datasets.push(nonbank_vong_quay_tai_san);
            this.chartdata_phan_ra_roa_ttm.datasets.push(nonbank_ty_suat_loi_nhuan);
          }
          else if (typeBank === "stock") {
            this.chartdata_phan_ra_roa_ttm.datasets.push(stock_roa_ttm);
            this.chartdata_phan_ra_roa_ttm.datasets.push(stock_vong_quay_tai_san);
            this.chartdata_phan_ra_roa_ttm.datasets.push(stock_ty_suat_loi_nhuan);
          }
          this.chartdata_phan_ra_roa_ttm_is_loading = false;
        })
        .catch((err) => {
          self.chartdata_phan_ra_roa_ttm.datasets = [];
          this.chartdata_phan_ra_roa_ttm_is_loading = false;
        });
    },
    phanRaROETTM() {
      let self = this;
      let roe_ttm = {
        label: "ROE TTM",
        data: [],
        backgroundColor: this.color("blue"),
        borderColor: this.color("blue"),
        fill: false,
        borderWidth: 1,
        order: 2,
        type: "bar",
        yAxisID: "B",
      };
      let don_bay_tai_chinh = {
        label: "Đòn bẩy tài chính",
        data: [],
        backgroundColor: this.color("orange"),
        borderColor: this.color("orange"),
        fill: false,
        borderWidth: 1,
        order: 1,
        type: "line",
        yAxisID: "A",
      };
      let vong_quay_tai_san = {
        label: "Vòng quay tài sản",
        data: [],
        backgroundColor: this.color("grey"),
        borderColor: this.color("grey"),
        fill: false,
        borderWidth: 1,
        order: 1,
        type: "line",
        yAxisID: "A",
        pointStyle: "triangle",
      };
      let bien_ebit = {
        label: "Biên EBIT",
        data: [],
        backgroundColor: "#21a45f",
        borderColor: "#21a45f",
        fill: false,
        borderWidth: 1,
        order: 1,
        type: "line",
        yAxisID: "A",
        pointStyle: "rect",
      };
      let ganh_nang_lai_suat = {
        label: "Gánh nặng lãi suất",
        data: [],
        backgroundColor: this.color("red"),
        borderColor: this.color("red"),
        fill: false,
        borderWidth: 1,
        order: 1,
        type: "line",
        yAxisID: "A",
        pointStyle: "triangle",
      };
      let ganh_nang_thue = {
        label: "Gánh nặng thuế",
        data: [],
        backgroundColor: "#900808",
        borderColor: "#900808",
        fill: false,
        borderWidth: 1,
        order: 1,
        type: "line",
        yAxisID: "A",
        pointStyle: "rect",
      };
      this.chartdata_phan_ra_roe_ttm_is_loading = true;
      axios
        .get(this.$apiAdress + "/api/stocks/chart/phan-ra-roe-ttm", {
          params: {
            mack: self.mack,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          self.chartdata_phan_ra_roe_ttm.labels = [];
          res.data.forEach((item) => {
            self.chartdata_phan_ra_roe_ttm.labels.unshift(
              item.thoigian.slice(0, 2) + "/" + item.thoigian.slice(-2)
            );
            roe_ttm.data.unshift(item.roe_ttm * 100);
            don_bay_tai_chinh.data.unshift(item.don_bay_tai_chinh * 100);
            vong_quay_tai_san.data.unshift(item.vong_quay_tai_san * 100);
            bien_ebit.data.unshift(item.bien_ebit * 100);
            ganh_nang_lai_suat.data.unshift(item.ganh_nang_lai_suat * 100);
            ganh_nang_thue.data.unshift(item.ganh_nang_thue * 100);
          });
          this.chartdata_phan_ra_roe_ttm.datasets = [];
          this.chartdata_phan_ra_roe_ttm.datasets.push(roe_ttm);
          this.chartdata_phan_ra_roe_ttm.datasets.push(don_bay_tai_chinh);
          this.chartdata_phan_ra_roe_ttm.datasets.push(vong_quay_tai_san);
          this.chartdata_phan_ra_roe_ttm.datasets.push(bien_ebit);
          this.chartdata_phan_ra_roe_ttm.datasets.push(ganh_nang_lai_suat);
          this.chartdata_phan_ra_roe_ttm.datasets.push(ganh_nang_thue);
          this.chartdata_phan_ra_roe_ttm_is_loading = false;
        })
        .catch((err) => {
          self.chartdata_phan_ra_roe_ttm.datasets = [];
          this.chartdata_phan_ra_roe_ttm_is_loading = false;
        });
    },
    mackChange() {
      this.doanhThuLoiNhuanQuy();
      this.taiSanQuy();
      this.nguonVonQuy();
      this.luuChuyenTienQuy();
      this.khaNangThanhToanTTM();
      this.bienLaiQuy();
      this.hieuSuatHoatDongTTM();
      this.phanRaROATTM();
      this.phanRaROETTM();
    },
    color(color) {
      var COLORS = {
        red: "rgb(255, 99, 132)",
        orange: "rgb(255, 159, 64)",
        yellow: "rgb(255, 205, 86)",
        green: "rgb(75, 192, 192)",
        blue: "rgb(54, 162, 235)",
        purple: "rgb(153, 102, 255)",
        grey: "rgb(201, 203, 207)",
      };
      return COLORS[color];
    },
    getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    format_money(money) {
      if (money >= 1000000000000 || money <= 1000000000000)
        return (
          (money / 1000000000000).toFixed(1).toLocaleString() + " nghìn tỷ VNĐ"
        );
      if (money >= 1000000000 || money <= 1000000000)
        return (money / 1000000000).toFixed(1).toLocaleString() + " tỷ VNĐ";
      if (money >= 1000000 || money <= 1000000)
        return (money / 1000000).toFixed(1).toLocaleString() + " triệu VNĐ";
      if (money >= 1000 || money <= 1000)
        return (money / 1000).toFixed(1).toLocaleString() + " ngàn VNĐ";
      else return money + " VNĐ";
    },
  },
  computed: {
    options_doanh_thu_loi_nhuan_quy() {
      let colorFontByDarkMode = this.$store.state.darkMode ? "#fff" : "#000";
      let options = {
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              if (data.datasets[tooltipItem.datasetIndex].type === "line") {
                var label = data.datasets[tooltipItem.datasetIndex].label || "";
                if (label) {
                  label += ": ";
                }
                label += tooltipItem.yLabel.toFixed(1);
                label += " %";
                return label;
              }
              var label = data.datasets[tooltipItem.datasetIndex].label || "";
              if (label) {
                label += ": ";
              }
              var text = tooltipItem.yLabel / 1000;
              label += text.toLocaleString("en", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 1,
              });
              label += " tỷ VNĐ";
              return label;
            },
          },
        },
        title: {
          display: true,
          text: "Doanh thu lợi nhuận - Quý",
          fontSize: 16,
          fontColor: colorFontByDarkMode,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: colorFontByDarkMode,
              },
            },
          ],
          yAxes: [
            {
              id: "A",
              type: "linear",
              position: "left",
              ticks: {
                fontColor: colorFontByDarkMode,
                beginAtZero: true,
                callback: function (value) {
                  return value / 1000;
                },
              },
            },
            {
              id: "B",
              type: "linear",
              position: "right",
              ticks: {
                fontColor: colorFontByDarkMode,
                beginAtZero: true,
                callback: function (value) {
                  return value + "%";
                },
              },
            },
          ],
        },
        legend: {
          display: true,
          position: "top",
          align: "start",
          labels: {
            padding: 5,
            fontColor: colorFontByDarkMode,
          },
        },
      };
      return options;
    },
    options_doanh_thu_loi_nhuan_ttm() {
      let colorFontByDarkMode = this.$store.state.darkMode ? "#fff" : "#000";
      let options = {
        legend: {
          display: true,
          position: "top",
          align: "start",
          labels: {
            padding: 5,
            fontColor: colorFontByDarkMode,
          },
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              if (data.datasets[tooltipItem.datasetIndex].type === "line") {
                var label = data.datasets[tooltipItem.datasetIndex].label || "";
                if (label) {
                  label += ": ";
                }
                label += tooltipItem.yLabel.toFixed(1);
                label += " %";
                return label;
              }
              var label = data.datasets[tooltipItem.datasetIndex].label || "";
              if (label) {
                label += ": ";
              }
              var text = tooltipItem.yLabel / 1000;
              label += text.toLocaleString("en", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 1,
              });
              label += " tỷ VNĐ";
              return label;
            },
          },
        },
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: true,
          text: "Doanh thu lợi nhuận - TTM",
          fontSize: 16,
          fontColor: colorFontByDarkMode,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: colorFontByDarkMode,
              },
            },
          ],
          yAxes: [
            {
              id: "A",
              type: "linear",
              position: "left",
              ticks: {
                fontColor: colorFontByDarkMode,
                beginAtZero: true,
                callback: function (value) {
                  return value / 1000;
                },
              },
            },
            {
              id: "B",
              type: "linear",
              position: "right",
              ticks: {
                fontColor: colorFontByDarkMode,
                callback: function (value) {
                  return value + "%";
                },
              },
            },
          ],
        },
      };
      return options;
    },
    options_nguon_von_quy() {
      let colorFontByDarkMode = this.$store.state.darkMode ? "#fff" : "#000";
      let options = {
        legend: {
          display: true,
          position: "top",
          align: "start",
          labels: {
            fontColor: colorFontByDarkMode,
            padding: 5,
          },
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              if (data.datasets[tooltipItem.datasetIndex].type === "line") {
                var label = data.datasets[tooltipItem.datasetIndex].label || "";
                if (label) {
                  label += ": ";
                }
                label += tooltipItem.yLabel.toFixed(1);
                label += " %";
                return label;
              }
              var label = data.datasets[tooltipItem.datasetIndex].label || "";
              if (label) {
                label += ": ";
              }
              var text = tooltipItem.yLabel / 1000;
              label += text.toLocaleString("en", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 1,
              });
              label += " tỷ VNĐ";
              return label;
            },
          },
        },
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: true,
          text: "Nguồn vốn - Quý",
          fontSize: 16,
          fontColor: colorFontByDarkMode,
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              ticks: {
                fontColor: colorFontByDarkMode,
              },
            },
          ],
          yAxes: [
            {
              stacked: true,
              ticks: {
                fontColor: colorFontByDarkMode,
                beginAtZero: true,
                callback: function (value) {
                  return value / 1000;
                },
              },
            },
          ],
        },
      };
      return options;
    },
    options_bien_lai_quy() {
      let colorFontByDarkMode = this.$store.state.darkMode ? "#fff" : "#000";
      let options = {
        legend: {
          display: true,
          position: "top",
          align: "start",
          labels: {
            padding: 5,
            fontColor: colorFontByDarkMode,
          },
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              if (data.datasets[tooltipItem.datasetIndex].type === "line") {
                var label = data.datasets[tooltipItem.datasetIndex].label || "";
                if (label) {
                  label += ": ";
                }
                label += tooltipItem.yLabel.toFixed(1);
                label += " %";
                return label;
              }
              var label = data.datasets[tooltipItem.datasetIndex].label || "";
              if (label) {
                label += ": ";
              }
              var text = tooltipItem.yLabel / 1000;
              label += text.toLocaleString("en", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 1,
              });
              label += " tỷ VNĐ";
              return label;
            },
          },
        },
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: true,
          text: "Biên lợi nhuận - Quý",
          fontSize: 16,
          fontColor: colorFontByDarkMode,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: colorFontByDarkMode,
              },
            },
          ],
          yAxes: [
            {
              id: "A",
              type: "linear",
              position: "right",
              ticks: {
                fontColor: colorFontByDarkMode,
                callback: function (value) {
                  return value + "%";
                },
              },
            },
          ],
        },
      };
      return options;
    },
    options_tai_san_quy() {
      let colorFontByDarkMode = this.$store.state.darkMode ? "#fff" : "#000";
      let options = {
        legend: {
          fontColor: colorFontByDarkMode,
          display: true,
          position: "top",
          align: "start",
          labels: {
            padding: 5,
            fontColor: colorFontByDarkMode,
          },
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              if (data.datasets[tooltipItem.datasetIndex].type === "line") {
                var label = data.datasets[tooltipItem.datasetIndex].label || "";
                if (label) {
                  label += ": ";
                }
                label += tooltipItem.yLabel.toFixed(1);
                label += " %";
                return label;
              }
              var label = data.datasets[tooltipItem.datasetIndex].label || "";
              if (label) {
                label += ": ";
              }
              var text = tooltipItem.yLabel / 1000;
              label += text.toLocaleString("en", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 1,
              });
              label += " tỷ VNĐ";
              return label;
            },
          },
        },
        maintainAspectRatio: false,
        responsive: true,
        title: {
          fontColor: colorFontByDarkMode,
          display: true,
          text: "Tài sản - Quý",
          fontSize: 16,
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              ticks: {
                fontColor: colorFontByDarkMode,
              },
            },
          ],
          yAxes: [
            {
              stacked: true,
              ticks: {
                fontColor: colorFontByDarkMode,
                beginAtZero: true,
                callback: function (value) {
                  return value / 1000;
                },
              },
            },
          ],
        },
      };
      return options;
    },
    options_luu_chuyen_tien_quy() {
      let colorFontByDarkMode = this.$store.state.darkMode ? "#fff" : "#000";
      let options = {
        legend: {
          display: true,
          position: "top",
          align: "start",
          labels: {
            padding: 5,
            fontColor: colorFontByDarkMode,
          },
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              var label = data.datasets[tooltipItem.datasetIndex].label || "";
              if (label) {
                label += ": ";
              }
              var text = tooltipItem.yLabel / 1000;
              label += text.toLocaleString("en", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 1,
              });
              label += " tỷ VNĐ";
              return label;
            },
          },
        },
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: true,
          text: "Lưu chuyển tiền - Quý",
          fontSize: 16,
          fontColor: colorFontByDarkMode,
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              ticks: {
                fontColor: colorFontByDarkMode,
              },
            },
          ],
          yAxes: [
            {
              stacked: true,
              ticks: {
                fontColor: colorFontByDarkMode,
                beginAtZero: true,
                callback: function (value) {
                  return value / 1000;
                },
              },
            },
          ],
        },
      };
      return options;
    },
    options_kha_nang_thanh_toan_ttm() {
      let colorFontByDarkMode = this.$store.state.darkMode ? "#fff" : "#000";
      let options = {
        legend: {
          display: true,
          position: "top",
          align: "start",
          labels: {
            padding: 5,
            fontColor: colorFontByDarkMode,
          },
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              if (data.datasets[tooltipItem.datasetIndex].type === "line") {
                var label = data.datasets[tooltipItem.datasetIndex].label || "";
                if (label) {
                  label += ": ";
                }
                label += tooltipItem.yLabel.toFixed(1);
                label += " %";
                return label;
              }
              var label = data.datasets[tooltipItem.datasetIndex].label || "";
              if (label) {
                label += ": ";
              }
              var text = tooltipItem.yLabel;
              label += text.toLocaleString("en", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 1,
              });
              label += " triệu đồng";
              return label;
            },
          },
        },
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: true,
          text: "Khả năng thanh toán - TTM",
          fontSize: 16,
          fontColor: colorFontByDarkMode,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: colorFontByDarkMode,
              },
            },
          ],
          yAxes: [
            {
              id: "A",
              type: "linear",
              position: "right",
              ticks: {
                fontColor: colorFontByDarkMode,
                callback: function (value) {
                  return value + "%";
                },
              },
            },
            {
              id: "B",
              type: "linear",
              position: "left",
              ticks: {
                fontColor: colorFontByDarkMode,
                callback: function (value) {
                  return value / 1000;
                },
              },
            },
          ],
        },
      };
      return options;
    },
    options_hieu_suat_hoat_dong_ttm() {
      let colorFontByDarkMode = this.$store.state.darkMode ? "#fff" : "#000";
      let options = {
        legend: {
          display: true,
          position: "top",
          maxHeight: 30,
          align: "start",
          labels: {
            padding: 5,
            fontColor: colorFontByDarkMode,
          },
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              if (
                tooltipItem.datasetIndex === 3 ||
                tooltipItem.datasetIndex === 4 ||
                tooltipItem.datasetIndex === 5
              ) {
                var label = data.datasets[tooltipItem.datasetIndex].label || "";
                if (label) {
                  label += ": ";
                }
                label += tooltipItem.yLabel.toFixed(1);
                label += " ngày";
                return label;
              } else {
                var label = data.datasets[tooltipItem.datasetIndex].label || "";
                if (label) {
                  label += ": ";
                }
                label += tooltipItem.yLabel.toFixed(1);
                label += " lần";
                return label;
              }
              return label;
            },
          },
        },
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: true,
          text: "Hiệu suất hoạt động - TTM",
          fontSize: 16,
          fontColor: colorFontByDarkMode,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: colorFontByDarkMode,
              },
            },
          ],
          yAxes: [
            {
              id: "A",
              type: "linear",
              position: "right",
              ticks: {
                fontColor: colorFontByDarkMode,
              },
            },
            {
              id: "B",
              type: "linear",
              position: "left",
              ticks: {
                fontColor: colorFontByDarkMode,
              },
            },
          ],
        },
      };
      return options;
    },
    options_phan_ra_roa_ttm() {
      let colorFontByDarkMode = this.$store.state.darkMode ? "#fff" : "#000";
      let options = {
        legend: {
          display: true,
          position: "top",
          align: "start",
          labels: {
            padding: 5,
            fontColor: colorFontByDarkMode,
          },
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              var label = data.datasets[tooltipItem.datasetIndex].label || "";
              if (label) {
                label += ": ";
              }
              var text = tooltipItem.yLabel;
              label += text.toLocaleString("en", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 1,
              });
              label += " %";
              return label;
            },
          },
        },
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: true,
          text: "Phân rã ROA - TTM",
          fontSize: 16,
          fontColor: colorFontByDarkMode,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: colorFontByDarkMode,
              },
            },
          ],
          yAxes: [
            {
              id: "A",
              type: "linear",
              position: "right",
              ticks: {
                fontColor: colorFontByDarkMode,
                callback: function (value) {
                  return value + "%";
                },
              },
            },
            {
              id: "B",
              type: "linear",
              position: "left",
              ticks: {
                fontColor: colorFontByDarkMode,
                callback: function (value) {
                  return value + "%";
                },
              },
            },
          ],
        },
      };
      return options;
    },
    options_phan_ra_roe_ttm() {
      let colorFontByDarkMode = this.$store.state.darkMode ? "#fff" : "#000";
      let options = {
        legend: {
          display: true,
          position: "top",
          align: "start",
          labels: {
            padding: 5,
            fontColor: colorFontByDarkMode,
          },
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              var label = data.datasets[tooltipItem.datasetIndex].label || "";
              if (label) {
                label += ": ";
              }
              var text = tooltipItem.yLabel;
              label += text.toLocaleString("en", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 1,
              });
              label += " %";
              return label;
            },
          },
        },
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: true,
          text: "Phân rã ROE - TTM",
          fontSize: 16,
          fontColor: colorFontByDarkMode,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: colorFontByDarkMode,
              },
            },
          ],
          yAxes: [
            {
              id: "A",
              type: "linear",
              position: "right",
              ticks: {
                fontColor: colorFontByDarkMode,
                callback: function (value) {
                  return value + "%";
                },
              },
            },
            {
              id: "B",
              type: "linear",
              position: "left",
              ticks: {
                fontColor: colorFontByDarkMode,
                callback: function (value) {
                  return value + "%";
                },
              },
            },
          ],
        },
      };
      return options;
    },
  },
  watch: {
    "$store.state.mack": function () {
      this.mackChange();
    },
  },
};
</script>
<style lang="scss" scoped>
.card {
  margin-bottom: 0.5rem;
}
</style>
