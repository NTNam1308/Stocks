<template>
  <div>
    <CForm @submit.prevent method="POST" @change="mackChange">
      <CInput
        v-model="mack"
        prependHtml="<i class='cui-user'></i>"
        placeholder="Mã CK"
      >
        <template #prepend-content>
          <CIcon name="cil-laptop" />
        </template>
      </CInput>
    </CForm>

    <CRow>
      <CCol sm="6">
        <CustomChart
          :chartdata="chartdata_doanh_thu_loi_nhuan_quy"
          :options="options_doanh_thu_loi_nhuan_quy"
          v-if="arrayPagePagination[0]"
        />
      </CCol>
      <CCol sm="6">
        <CustomChart
          :chartdata="chartdata_doanh_thu_loi_nhuan_ttm"
          :options="options_doanh_thu_loi_nhuan_ttm"
          v-if="arrayPagePagination[1]"
        />
      </CCol>
      <CCol sm="6">
        <CustomChart
          :chartdata="chartdata_tai_san_quy"
          :options="options_tai_san_quy"
          v-if="arrayPagePagination[2]"
        />
      </CCol>
      <CCol sm="6">
        <CustomChart
          :chartdata="chartdata_tai_san_ttm"
          :options="options_tai_san_ttm"
          v-if="arrayPagePagination[3]"
        />
      </CCol>
      <CCol sm="6">
        <CustomChart
          :chartdata="chartdata_nguon_von_quy"
          :options="options_nguon_von_quy"
          v-if="arrayPagePagination[4]"
        />
      </CCol>
      <CCol sm="6">
        <CustomChart
          :chartdata="chartdata_nguon_von_ttm"
          :options="options_nguon_von_ttm"
          v-if="arrayPagePagination[5]"
        />
      </CCol>
      <CCol sm="6">
        <CustomChart
          :chartdata="chartdata_luu_chuyen_tien_quy"
          :options="options_luu_chuyen_tien_quy"
          v-if="arrayPagePagination[6]"
        />
      </CCol>
      <CCol sm="6">
        <CustomChart
          :chartdata="chartdata_luu_chuyen_tien_ttm"
          :options="options_luu_chuyen_tien_ttm"
          v-if="arrayPagePagination[7]"
        />
      </CCol>
      <CCol sm="6">
        <CustomChart
          :chartdata="chartdata_kha_nang_thanh_toan_quy"
          :options="options_kha_nang_thanh_toan_quy"
          v-if="arrayPagePagination[8]"
        />
      </CCol>
      <CCol sm="6">
        <CustomChart
          :chartdata="chartdata_kha_nang_thanh_toan_ttm"
          :options="options_kha_nang_thanh_toan_ttm"
          v-if="arrayPagePagination[9]"
        />
      </CCol>
      <CCol sm="6">
        <CustomChart
          :chartdata="chartdata_bien_lai_quy"
          :options="options_bien_lai_quy"
          v-if="arrayPagePagination[10]"
        />
      </CCol>
      <CCol sm="6">
        <CustomChart
          :chartdata="chartdata_bien_lai_ttm"
          :options="options_bien_lai_ttm"
          v-if="arrayPagePagination[11]"
        />
      </CCol>
      <CCol sm="6">
        <CustomChart
          :chartdata="chartdata_hieu_suat_hoat_dong_quy"
          :options="options_hieu_suat_hoat_dong_quy"
          v-if="arrayPagePagination[12]"
        />
      </CCol>
      <CCol sm="6">
        <CustomChart
          :chartdata="chartdata_hieu_suat_hoat_dong_ttm"
          :options="options_hieu_suat_hoat_dong_ttm"
          v-if="arrayPagePagination[13]"
        />
      </CCol>
    </CRow>

    <CPagination
      :activePage.sync="activePagePagination"
      :pages="Math.ceil(arrayPagePagination.length / itemPerPagePagination)"
      align="center"
    />
  </div>
</template>

<script>
import CTableWrapper from "@/views/base/Table.vue";
import CustomChart from "@/views/charts/CustomChart";
import axios from "axios";

export default {
  // ONLOAD
  created() {
    if (this.$store.state.mack) {
      this.mack = this.$store.state.mack;
    }
    //this.$store.commit("set", ["sidebarMinimize", true]);
    this.mackChange();
  },
  components: {
    CTableWrapper,
    CustomChart,
  },

  data() {
    return {
      mack: "HPG",
      arrayPagePagination: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],
      activePagePagination: 1,
      itemPerPagePagination: 2,
      chartdata_doanh_thu_loi_nhuan_quy: {
        labels: [],
        datasets: [],
      },
      options_doanh_thu_loi_nhuan_quy: {
        responsive: true,
        title: {
          display: true,
          text: "Doanh thu lợi nhuận - Quý",
        },
        scales: {
          yAxes: [
            {
              id: "A",
              type: "linear",
              position: "left",
            },
            {
              id: "B",
              type: "linear",
              position: "right",
              ticks: {
                callback: function (value) {
                  return value + "%";
                },
              },
            },
          ],
        },
        legend: {
          display: true,
          labels: {
            setPointStyle: true,
            pointStyle: "triangle",
          },
        },
      },
      chartdata_doanh_thu_loi_nhuan_ttm: {
        labels: [],
        datasets: [],
      },
      options_doanh_thu_loi_nhuan_ttm: {
        legend: {},
        responsive: true,
        title: {
          display: true,
          text: "Doanh thu lợi nhuận - TTM",
        },
        scales: {
          yAxes: [
            {
              id: "A",
              type: "linear",
              position: "left",
            },
            {
              id: "B",
              type: "linear",
              position: "right",
              ticks: {
                callback: function (value) {
                  return value + "%";
                },
              },
            },
          ],
        },
      },
      chartdata_tai_san_quy: {
        labels: [],
        datasets: [],
      },
      options_tai_san_quy: {
        legend: {},
        responsive: true,
        title: {
          display: true,
          text: "Tài sản - Quý",
        },
        scales: {
          xAxes: [
            {
              stacked: true,
            },
          ],
          yAxes: [
            {
              stacked: true,
            },
          ],
        },
      },
      chartdata_tai_san_ttm: {
        labels: [],
        datasets: [],
      },
      options_tai_san_ttm: {
        legend: {},
        responsive: true,
        title: {
          display: true,
          text: "Tài sản - TTM",
        },
        scales: {
          xAxes: [
            {
              stacked: true,
            },
          ],
          yAxes: [
            {
              stacked: true,
            },
          ],
        },
      },
      chartdata_nguon_von_quy: {
        labels: [],
        datasets: [],
      },
      options_nguon_von_quy: {
        legend: {},
        responsive: true,
        title: {
          display: true,
          text: "Nguồn vốn - Quý",
        },
        scales: {
          xAxes: [
            {
              stacked: true,
            },
          ],
          yAxes: [
            {
              stacked: true,
            },
          ],
        },
      },
      chartdata_nguon_von_ttm: {
        labels: [],
        datasets: [],
      },
      options_nguon_von_ttm: {
        legend: {},
        responsive: true,
        title: {
          display: true,
          text: "Nguồn vốn - TTM",
        },
        scales: {
          xAxes: [
            {
              stacked: true,
            },
          ],
          yAxes: [
            {
              stacked: true,
            },
          ],
        },
      },
      chartdata_luu_chuyen_tien_quy: {
        labels: [],
        datasets: [],
      },
      options_luu_chuyen_tien_quy: {
        legend: {},
        responsive: true,
        title: {
          display: true,
          text: "Lưu chuyển tiền - Quý",
        },
        scales: {
          xAxes: [
            {
              stacked: true,
            },
          ],
          yAxes: [
            {
              stacked: true,
            },
          ],
        },
      },
      chartdata_luu_chuyen_tien_ttm: {
        labels: [],
        datasets: [],
      },
      options_luu_chuyen_tien_ttm: {
        legend: {},
        responsive: true,
        title: {
          display: true,
          text: "Lưu chuyển tiền - TTM",
        },
        scales: {
          xAxes: [
            {
              stacked: true,
            },
          ],
          yAxes: [
            {
              stacked: true,
            },
          ],
        },
      },
      chartdata_kha_nang_thanh_toan_quy: {
        labels: [],
        datasets: [],
      },
      options_kha_nang_thanh_toan_quy: {
        responsive: true,
        title: {
          display: true,
          text: "Khả năng thanh toán - Qúy",
        },
        scales: {
          yAxes: [
            {
              id: "A",
              type: "linear",
              position: "right",
              ticks: {
                callback: function (value) {
                  return value + "%";
                },
              },
            },
            {
              id: "B",
              type: "linear",
              position: "right",
              ticks: {
                callback: function (value) {
                  return value + "x";
                },
              },
            },
          ],
        },
      },
      chartdata_kha_nang_thanh_toan_ttm: {
        labels: [],
        datasets: [],
      },
      options_kha_nang_thanh_toan_ttm: {
        responsive: true,
        title: {
          display: true,
          text: "Khả năng thanh toán - TTM",
        },
        scales: {
          yAxes: [
            {
              id: "A",
              type: "linear",
              position: "right",
              ticks: {
                callback: function (value) {
                  return value + "%";
                },
              },
            },
            {
              id: "B",
              type: "linear",
              position: "right",
              ticks: {
                callback: function (value) {
                  return value + "x";
                },
              },
            },
          ],
        },
      },
      chartdata_bien_lai_quy: {
        labels: [],
        datasets: [],
      },
      options_bien_lai_quy: {
        responsive: true,
        title: {
          display: true,
          text: "Biên lãi - Quý",
        },
        scales: {
          yAxes: [
            {
              id: "A",
              type: "linear",
              position: "right",
              ticks: {
                callback: function (value) {
                  return value + "%";
                },
              },
            },
          ],
        },
      },
      chartdata_bien_lai_ttm: {
        labels: [],
        datasets: [],
      },
      options_bien_lai_ttm: {
        responsive: true,
        title: {
          display: true,
          text: "Biên lãi - TTM",
        },
        scales: {
          yAxes: [
            {
              id: "A",
              type: "linear",
              position: "right",
              ticks: {
                callback: function (value) {
                  return value + "%";
                },
              },
            },
          ],
        },
      },
      chartdata_hieu_suat_hoat_dong_quy: {
        labels: [],
        datasets: [],
      },
      options_hieu_suat_hoat_dong_quy: {
        responsive: true,
        title: {
          display: true,
          text: "Hiệu suất hoạt động - Quý",
        },
        scales: {
          yAxes: [
            {
              id: "A",
              type: "linear",
              position: "right",
              ticks: {
                callback: function (value) {
                  return value + "%";
                },
              },
            },
          ],
        },
      },
      chartdata_hieu_suat_hoat_dong_ttm: {
        labels: [],
        datasets: [],
      },
      options_hieu_suat_hoat_dong_ttm: {
        responsive: true,
        title: {
          display: true,
          text: "Hiệu suất hoạt động - TTM",
        },
        scales: {
          yAxes: [
            {
              id: "A",
              type: "linear",
              position: "right",
              ticks: {
                callback: function (value) {
                  return value + "%";
                },
              },
            },
          ],
        },
      },
    };
  },
  methods: {
    mackChange() {
      this.paginatePage();
    },
    doanhThuLoiNhuanQuy() {
      let self = this;
      let doanh_thu_thuan = {
        label: "Doanh thu thuần",
        data: [],
        backgroundColor: this.color("blue"),
        borderColor: this.color("blue"),
        fill: false,
        borderWidth: 1,
        yAxesGroup: "A",
      };
      let loi_nhuan_sau_thue_tndn = {
        label: "Lợi nhuận sau thuế",
        data: [],
        backgroundColor: this.color("orange"),
        borderColor: this.color("orange"),
        fill: false,
        type: "line",
        borderWidth: 1,
        yAxesGroup: "B",
      };
      let loi_nhuan_sau_thue_cua_co_dong_cua_cong_ty_me = {
        label: "Lợi nhuận sau thuế của công ty mẹ",
        data: [],
        backgroundColor: this.color("red"),
        borderColor: this.color("red"),
        fill: false,
        borderWidth: 1,
        yAxesGroup: "A",
      };
      axios
        .get(this.$apiAdress + "/api/stocks/chart/doanh-thu-loi-nhuan-quy", {
          params: {
            mack: self.mack,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          self.chartdata_doanh_thu_loi_nhuan_quy.labels = [];
          res.data.forEach((item) => {
            self.chartdata_doanh_thu_loi_nhuan_quy.labels.unshift(
              item.thoigian
            );
            doanh_thu_thuan.data.unshift(item.doanh_thu_thuan);
            loi_nhuan_sau_thue_tndn.data.unshift(item.loi_nhuan_sau_thue_tndn);
            loi_nhuan_sau_thue_cua_co_dong_cua_cong_ty_me.data.unshift(
              item.loi_nhuan_sau_thue_cua_co_dong_cua_cong_ty_me
            );
          });
          this.chartdata_doanh_thu_loi_nhuan_quy.datasets = [];
          this.chartdata_doanh_thu_loi_nhuan_quy.datasets.push(doanh_thu_thuan);
          this.chartdata_doanh_thu_loi_nhuan_quy.datasets.push(
            loi_nhuan_sau_thue_tndn
          );
          this.chartdata_doanh_thu_loi_nhuan_quy.datasets.push(
            loi_nhuan_sau_thue_cua_co_dong_cua_cong_ty_me
          );
        });
    },
    doanhThuLoiNhuanTTM() {
      let self = this;
      let doanh_thu_thuan = {
        label: "Doanh thu thuần",
        data: [],
        backgroundColor: this.color("blue"),
        borderColor: this.color("blue"),
        fill: false,
        borderWidth: 1,
        yAxesGroup: "A",
      };
      let loi_nhuan_sau_thue_tndn = {
        label: "Lợi nhuận sau thuế",
        data: [],
        backgroundColor: this.color("orange"),
        borderColor: this.color("orange"),
        fill: false,
        borderWidth: 1,
        type: "line",
        yAxesGroup: "B",
      };
      let loi_nhuan_sau_thue_cua_co_dong_cua_cong_ty_me = {
        label: "Lợi nhuận sau thuế của công ty mẹ",
        data: [],
        backgroundColor: this.color("red"),
        borderColor: this.color("red"),
        fill: false,
        borderWidth: 1,
        yAxesGroup: "A",
      };
      axios
        .get(this.$apiAdress + "/api/stocks/chart/doanh-thu-loi-nhuan-ttm", {
          params: {
            mack: self.mack,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          self.chartdata_doanh_thu_loi_nhuan_ttm.labels = [];
          res.data.forEach((item) => {
            self.chartdata_doanh_thu_loi_nhuan_ttm.labels.unshift(
              item.thoigian
            );
            doanh_thu_thuan.data.unshift(item.doanh_thu_thuan);
            loi_nhuan_sau_thue_tndn.data.unshift(item.loi_nhuan_sau_thue_tndn);
            loi_nhuan_sau_thue_cua_co_dong_cua_cong_ty_me.data.unshift(
              item.loi_nhuan_sau_thue_cua_co_dong_cua_cong_ty_me
            );
          });
          this.chartdata_doanh_thu_loi_nhuan_ttm.datasets = [];
          this.chartdata_doanh_thu_loi_nhuan_ttm.datasets.push(doanh_thu_thuan);
          this.chartdata_doanh_thu_loi_nhuan_ttm.datasets.push(
            loi_nhuan_sau_thue_tndn
          );
          this.chartdata_doanh_thu_loi_nhuan_ttm.datasets.push(
            loi_nhuan_sau_thue_cua_co_dong_cua_cong_ty_me
          );
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
      let cac_khoan_phai_thu_ngan_han = {
        label: "Các khoản phải thu ngắn hạn",
        data: [],
        backgroundColor: this.color("red"),
        borderColor: this.color("red"),
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
      let cac_khoan_phai_thu_dai_han = {
        label: "Các khoản phải thu dài hạn ",
        data: [],
        backgroundColor: this.color("green"),
        borderColor: this.color("green"),
        fill: false,
        borderWidth: 1,
      };
      let bat_dong_san_dau_tu = {
        label: "Bất động sản đầu tư",
        data: [],
        backgroundColor: this.color("yellow"),
        borderColor: this.color("yellow"),
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
        label: "Các khoản đầu tư tài chính dài hạn",
        data: [],
        backgroundColor: "#900808",
        borderColor: "#900808",
        fill: false,
        borderWidth: 1,
      };
      let tong_tai_san_dai_han_khac = {
        label: "Tổng tài sản dài hạn khác",
        data: [],
        backgroundColor: "#b99904",
        borderColor: "#b99904",
        fill: false,
        borderWidth: 1,
      };
      let loi_thue_thuong_mai = {
        label: "Lợi thế thương mại",
        data: [],
        backgroundColor: "#040cb9",
        borderColor: "#040cb9",
        fill: false,
        borderWidth: 1,
      };

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
            self.chartdata_tai_san_quy.labels.unshift(item.thoigian);
            tien_va_cac_khoan_tuong_duong_tien.data.unshift(
              item.tien_va_cac_khoan_tuong_duong_tien
            );
            cac_khoan_dau_tu_tai_chinh_ngan_han.data.unshift(
              item.cac_khoan_dau_tu_tai_chinh_ngan_han
            );
            cac_khoan_phai_thu_ngan_han.data.unshift(
              item.cac_khoan_phai_thu_ngan_han
            );
            tong_hang_ton_kho.data.unshift(item.tong_hang_ton_kho);
            tai_san_ngan_han_khac.data.unshift(item.tai_san_ngan_han_khac);
            cac_khoan_phai_thu_dai_han.data.unshift(
              item.cac_khoan_phai_thu_dai_han
            );
            tai_san_co_dinh.data.unshift(item.tai_san_co_dinh);
            bat_dong_san_dau_tu.data.unshift(item.bat_dong_san_dau_tu);
            tai_san_do_dang_dai_han.data.unshift(item.tai_san_do_dang_dai_han);
            cac_khoan_dau_tu_tai_chinh_dai_han.data.unshift(
              item.cac_khoan_dau_tu_tai_chinh_dai_han
            );
            tong_tai_san_dai_han_khac.data.unshift(
              item.tong_tai_san_dai_han_khac
            );
            loi_thue_thuong_mai.data.unshift(item.loi_thue_thuong_mai);
          });
          this.chartdata_tai_san_quy.datasets = [];
          this.chartdata_tai_san_quy.datasets.push(
            tien_va_cac_khoan_tuong_duong_tien
          );
          this.chartdata_tai_san_quy.datasets.push(
            cac_khoan_dau_tu_tai_chinh_ngan_han
          );
          this.chartdata_tai_san_quy.datasets.push(cac_khoan_phai_thu_ngan_han);
          this.chartdata_tai_san_quy.datasets.push(tong_hang_ton_kho);
          this.chartdata_tai_san_quy.datasets.push(tai_san_ngan_han_khac);
          this.chartdata_tai_san_quy.datasets.push(cac_khoan_phai_thu_dai_han);
          this.chartdata_tai_san_quy.datasets.push(tai_san_co_dinh);
          this.chartdata_tai_san_quy.datasets.push(bat_dong_san_dau_tu);
          this.chartdata_tai_san_quy.datasets.push(tai_san_do_dang_dai_han);
          this.chartdata_tai_san_quy.datasets.push(
            cac_khoan_dau_tu_tai_chinh_dai_han
          );
          this.chartdata_tai_san_quy.datasets.push(tong_tai_san_dai_han_khac);
          this.chartdata_tai_san_quy.datasets.push(loi_thue_thuong_mai);
        });
    },
    taiSanTTM() {
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
      let cac_khoan_phai_thu_ngan_han = {
        label: "Các khoản phải thu ngắn hạn",
        data: [],
        backgroundColor: this.color("red"),
        borderColor: this.color("red"),
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
      let cac_khoan_phai_thu_dai_han = {
        label: "Các khoản phải thu dài hạn ",
        data: [],
        backgroundColor: this.color("green"),
        borderColor: this.color("green"),
        fill: false,
        borderWidth: 1,
      };
      let bat_dong_san_dau_tu = {
        label: "Bất động sản đầu tư",
        data: [],
        backgroundColor: this.color("yellow"),
        borderColor: this.color("yellow"),
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
        label: "Các khoản đầu tư tài chính dài hạn",
        data: [],
        backgroundColor: "#900808",
        borderColor: "#900808",
        fill: false,
        borderWidth: 1,
      };
      let tong_tai_san_dai_han_khac = {
        label: "Tổng tài sản dài hạn khác",
        data: [],
        backgroundColor: "#b99904",
        borderColor: "#b99904",
        fill: false,
        borderWidth: 1,
      };
      let loi_thue_thuong_mai = {
        label: "Lợi thế thương mại",
        data: [],
        backgroundColor: "#040cb9",
        borderColor: "#040cb9",
        fill: false,
        borderWidth: 1,
      };

      axios
        .get(this.$apiAdress + "/api/stocks/chart/tai-san-ttm", {
          params: {
            mack: self.mack,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          self.chartdata_tai_san_ttm.labels = [];
          res.data.forEach((item) => {
            self.chartdata_tai_san_ttm.labels.unshift(item.thoigian);
            tien_va_cac_khoan_tuong_duong_tien.data.unshift(
              item.tien_va_cac_khoan_tuong_duong_tien
            );
            cac_khoan_dau_tu_tai_chinh_ngan_han.data.unshift(
              item.cac_khoan_dau_tu_tai_chinh_ngan_han
            );
            cac_khoan_phai_thu_ngan_han.data.unshift(
              item.cac_khoan_phai_thu_ngan_han
            );
            tong_hang_ton_kho.data.unshift(item.tong_hang_ton_kho);
            tai_san_ngan_han_khac.data.unshift(item.tai_san_ngan_han_khac);
            cac_khoan_phai_thu_dai_han.data.unshift(
              item.cac_khoan_phai_thu_dai_han
            );
            tai_san_co_dinh.data.unshift(item.tai_san_co_dinh);
            bat_dong_san_dau_tu.data.unshift(item.bat_dong_san_dau_tu);
            tai_san_do_dang_dai_han.data.unshift(item.tai_san_do_dang_dai_han);
            cac_khoan_dau_tu_tai_chinh_dai_han.data.unshift(
              item.cac_khoan_dau_tu_tai_chinh_dai_han
            );
            tong_tai_san_dai_han_khac.data.unshift(
              item.tong_tai_san_dai_han_khac
            );
            loi_thue_thuong_mai.data.unshift(item.loi_thue_thuong_mai);
          });
          this.chartdata_tai_san_ttm.datasets = [];
          this.chartdata_tai_san_ttm.datasets.push(
            tien_va_cac_khoan_tuong_duong_tien
          );
          this.chartdata_tai_san_ttm.datasets.push(
            cac_khoan_dau_tu_tai_chinh_ngan_han
          );
          this.chartdata_tai_san_ttm.datasets.push(cac_khoan_phai_thu_ngan_han);
          this.chartdata_tai_san_ttm.datasets.push(tong_hang_ton_kho);
          this.chartdata_tai_san_ttm.datasets.push(tai_san_ngan_han_khac);
          this.chartdata_tai_san_ttm.datasets.push(cac_khoan_phai_thu_dai_han);
          this.chartdata_tai_san_ttm.datasets.push(tai_san_co_dinh);
          this.chartdata_tai_san_ttm.datasets.push(bat_dong_san_dau_tu);
          this.chartdata_tai_san_ttm.datasets.push(tai_san_do_dang_dai_han);
          this.chartdata_tai_san_ttm.datasets.push(
            cac_khoan_dau_tu_tai_chinh_dai_han
          );
          this.chartdata_tai_san_ttm.datasets.push(tong_tai_san_dai_han_khac);
          this.chartdata_tai_san_ttm.datasets.push(loi_thue_thuong_mai);
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
      let phai_tra_nguoi_ban_dai_han = {
        label: "Phải trả người bán dài hạn",
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
            self.chartdata_nguon_von_quy.labels.unshift(item.thoigian);
            vay_va_no_thue_tai_chinh_ngan_han.data.unshift(
              item.vay_va_no_thue_tai_chinh_ngan_han
            );
            vay_va_no_thue_tai_chinh_dai_han.data.unshift(
              item.vay_va_no_thue_tai_chinh_dai_han
            );
            phai_tra_nguoi_ban_dai_han.data.unshift(
              item.phai_tra_nguoi_ban_dai_han
            );
            nguoi_mua_tra_tien_truoc.data.unshift(
              item.nguoi_mua_tra_tien_truoc
            );
          });
          this.chartdata_nguon_von_quy.datasets = [];
          this.chartdata_nguon_von_quy.datasets.push(
            vay_va_no_thue_tai_chinh_ngan_han
          );
          this.chartdata_nguon_von_quy.datasets.push(
            vay_va_no_thue_tai_chinh_dai_han
          );
          this.chartdata_nguon_von_quy.datasets.push(
            phai_tra_nguoi_ban_dai_han
          );
          this.chartdata_nguon_von_quy.datasets.push(nguoi_mua_tra_tien_truoc);
        });
    },
    nguonVonTTM() {
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
      let phai_tra_nguoi_ban_dai_han = {
        label: "Phải trả người bán dài hạn",
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

      axios
        .get(this.$apiAdress + "/api/stocks/chart/nguon-von-ttm", {
          params: {
            mack: self.mack,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          self.chartdata_nguon_von_ttm.labels = [];
          res.data.forEach((item) => {
            self.chartdata_nguon_von_ttm.labels.unshift(item.thoigian);
            vay_va_no_thue_tai_chinh_ngan_han.data.unshift(
              item.vay_va_no_thue_tai_chinh_ngan_han
            );
            vay_va_no_thue_tai_chinh_dai_han.data.unshift(
              item.vay_va_no_thue_tai_chinh_dai_han
            );
            phai_tra_nguoi_ban_dai_han.data.unshift(
              item.phai_tra_nguoi_ban_dai_han
            );
            nguoi_mua_tra_tien_truoc.data.unshift(
              item.nguoi_mua_tra_tien_truoc
            );
          });
          this.chartdata_nguon_von_ttm.datasets = [];
          this.chartdata_nguon_von_ttm.datasets.push(
            vay_va_no_thue_tai_chinh_ngan_han
          );
          this.chartdata_nguon_von_ttm.datasets.push(
            vay_va_no_thue_tai_chinh_dai_han
          );
          this.chartdata_nguon_von_ttm.datasets.push(
            phai_tra_nguoi_ban_dai_han
          );
          this.chartdata_nguon_von_ttm.datasets.push(nguoi_mua_tra_tien_truoc);
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
            self.chartdata_luu_chuyen_tien_quy.labels.unshift(item.thoigian);
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
        });
    },
    luuChuyenTienTTM() {
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
      axios
        .get(this.$apiAdress + "/api/stocks/chart/luu-chuyen-tien-ttm", {
          params: {
            mack: self.mack,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          self.chartdata_luu_chuyen_tien_ttm.labels = [];
          res.data.forEach((item) => {
            self.chartdata_luu_chuyen_tien_ttm.labels.unshift(item.thoigian);
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
          this.chartdata_luu_chuyen_tien_ttm.datasets = [];
          this.chartdata_luu_chuyen_tien_ttm.datasets.push(
            luu_chuyen_tien_thuan_tu_hoat_dong_kinh_doanh
          );
          this.chartdata_luu_chuyen_tien_ttm.datasets.push(
            luu_chuyen_tien_thuan_tu_hoat_dong_dau_tu
          );
          this.chartdata_luu_chuyen_tien_ttm.datasets.push(
            luu_chuyen_tien_thuan_tu_hoat_dong_tai_chinh
          );
          this.chartdata_luu_chuyen_tien_ttm.datasets.push(
            luu_chuyen_tien_thuan_trong_ky
          );
        });
    },
    khaNangThanhToanQuy() {
      let self = this;
      let thanh_toan_hien_hanh = {
        label: "Thanh toán hiện hành",
        data: [],
        backgroundColor: this.color("blue"),
        borderColor: this.color("blue"),
        fill: false,
        borderWidth: 1,
        order: 2,
        yAxisID: "B",
      };
      let thanh_toan_nhanh = {
        label: "Thanh toán nhanh",
        data: [],
        backgroundColor: this.color("red"),
        borderColor: this.color("red"),
        fill: false,
        borderWidth: 1,
        order: 1,
        yAxisID: "B",
      };
      let ebit_lai_vay = {
        label: "EBIT/Lãi vay",
        data: [],
        backgroundColor: this.color("grey"),
        borderColor: this.color("grey"),
        fill: false,
        borderWidth: 1,
        order: 2,
        type: "line",
        yAxisID: "A",
      };
      let no_vay_ebitda = {
        label: "Nợ vay/EBITDA",
        data: [],
        backgroundColor: this.color("orange"),
        borderColor: this.color("orange"),
        fill: false,
        borderWidth: 1,
        order: 2,
        type: "line",
        yAxisID: "A",
      };
      axios
        .get(this.$apiAdress + "/api/stocks/chart/kha-nang-thanh-toan-quy", {
          params: {
            mack: self.mack,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          self.chartdata_kha_nang_thanh_toan_quy.labels = [];
          res.data.forEach((item) => {
            self.chartdata_kha_nang_thanh_toan_quy.labels.unshift(
              item.thoigian
            );
            ebit_lai_vay.data.unshift(item.ebit_lai_vay);
            no_vay_ebitda.data.unshift(item.no_vay_ebitda);
            thanh_toan_hien_hanh.data.unshift(item.thanh_toan_hien_hanh);
            thanh_toan_nhanh.data.unshift(item.thanh_toan_nhanh);
          });
          this.chartdata_kha_nang_thanh_toan_quy.datasets = [];
          this.chartdata_kha_nang_thanh_toan_quy.datasets.push(ebit_lai_vay);
          this.chartdata_kha_nang_thanh_toan_quy.datasets.push(no_vay_ebitda);
          this.chartdata_kha_nang_thanh_toan_quy.datasets.push(
            thanh_toan_hien_hanh
          );
          this.chartdata_kha_nang_thanh_toan_quy.datasets.push(
            thanh_toan_nhanh
          );
        });
    },
    khaNangThanhToanTTM() {
      let self = this;
      let thanh_toan_hien_hanh = {
        label: "Thanh toán hiện hành",
        data: [],
        backgroundColor: this.color("blue"),
        borderColor: this.color("blue"),
        fill: false,
        borderWidth: 1,
        order: 2,
        yAxisID: "B",
      };
      let thanh_toan_nhanh = {
        label: "Thanh toán nhanh",
        data: [],
        backgroundColor: this.color("red"),
        borderColor: this.color("red"),
        fill: false,
        borderWidth: 1,
        order: 1,
        yAxisID: "B",
      };
      let ebit_lai_vay = {
        label: "EBIT/Lãi vay",
        data: [],
        backgroundColor: this.color("grey"),
        borderColor: this.color("grey"),
        fill: false,
        borderWidth: 1,
        order: 2,
        type: "line",
        yAxisID: "A",
      };
      let no_vay_ebitda = {
        label: "Nợ vay/EBITDA",
        data: [],
        backgroundColor: this.color("orange"),
        borderColor: this.color("orange"),
        fill: false,
        borderWidth: 1,
        order: 2,
        type: "line",
        yAxisID: "A",
      };
      axios
        .get(this.$apiAdress + "/api/stocks/chart/kha-nang-thanh-toan-ttm", {
          params: {
            mack: self.mack,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          self.chartdata_kha_nang_thanh_toan_ttm.labels = [];
          res.data.forEach((item) => {
            self.chartdata_kha_nang_thanh_toan_ttm.labels.unshift(
              item.thoigian
            );
            ebit_lai_vay.data.unshift(item.ebit_lai_vay);
            no_vay_ebitda.data.unshift(item.no_vay_ebitda);
            thanh_toan_hien_hanh.data.unshift(item.thanh_toan_hien_hanh);
            thanh_toan_nhanh.data.unshift(item.thanh_toan_nhanh);
          });
          this.chartdata_kha_nang_thanh_toan_ttm.datasets = [];
          this.chartdata_kha_nang_thanh_toan_ttm.datasets.push(ebit_lai_vay);
          this.chartdata_kha_nang_thanh_toan_ttm.datasets.push(no_vay_ebitda);
          this.chartdata_kha_nang_thanh_toan_ttm.datasets.push(
            thanh_toan_hien_hanh
          );
          this.chartdata_kha_nang_thanh_toan_ttm.datasets.push(
            thanh_toan_nhanh
          );
        });
    },
    bienLaiQuy() {
      let self = this;
      let bien_loi_nhuan_sau_thue = {
        label: "Biên lợi nhuận sau thuế",
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
      let bien_loi_nhuan_ebit = {
        label: "Biên lợi nhuận EBIT",
        data: [],
        backgroundColor: this.color("grey"),
        borderColor: this.color("grey"),
        fill: false,
        borderWidth: 1,
        order: 2,
        type: "line",
        pointStyle: "triangle",
      };
      let bien_loi_nhuan_ebitda = {
        label: "Biên lợi nhuận EBITDA",
        data: [],
        backgroundColor: this.color("red"),
        borderColor: this.color("red"),
        fill: false,
        type: "line",
        borderWidth: 1,
        order: 1,
        pointStyle: "rectRot",
      };
      axios
        .get(this.$apiAdress + "/api/stocks/chart/bien-lai-quy", {
          params: {
            mack: self.mack,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          self.chartdata_bien_lai_quy.labels = [];
          res.data.forEach((item) => {
            self.chartdata_bien_lai_quy.labels.unshift(item.thoigian);
            bien_loi_nhuan_sau_thue.data.unshift(
              item.bien_loi_nhuan_sau_thue * 100
            );
            bien_loi_nhuan_gop.data.unshift(item.bien_loi_nhuan_gop * 100);
            bien_loi_nhuan_ebit.data.unshift(item.bien_loi_nhuan_ebit * 100);
            bien_loi_nhuan_ebitda.data.unshift(
              item.bien_loi_nhuan_ebitda * 100
            );
          });
          this.chartdata_bien_lai_quy.datasets = [];
          this.chartdata_bien_lai_quy.datasets.push(bien_loi_nhuan_sau_thue);
          this.chartdata_bien_lai_quy.datasets.push(bien_loi_nhuan_gop);
          this.chartdata_bien_lai_quy.datasets.push(bien_loi_nhuan_ebit);
          this.chartdata_bien_lai_quy.datasets.push(bien_loi_nhuan_ebitda);
        });
    },
    bienLaiTTM() {
      let self = this;
      let bien_loi_nhuan_sau_thue = {
        label: "Biên lợi nhuận sau thuế",
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
      let bien_loi_nhuan_ebit = {
        label: "Biên lợi nhuận EBIT",
        data: [],
        backgroundColor: this.color("grey"),
        borderColor: this.color("grey"),
        fill: false,
        borderWidth: 1,
        order: 2,
        type: "line",
        pointStyle: "triangle",
      };
      let bien_loi_nhuan_ebitda = {
        label: "Biên lợi nhuận EBITDA",
        data: [],
        backgroundColor: this.color("red"),
        borderColor: this.color("red"),
        fill: false,
        type: "line",
        borderWidth: 1,
        order: 1,
        pointStyle: "rectRot",
      };
      axios
        .get(this.$apiAdress + "/api/stocks/chart/bien-lai-ttm", {
          params: {
            mack: self.mack,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          self.chartdata_bien_lai_ttm.labels = [];
          res.data.forEach((item) => {
            self.chartdata_bien_lai_ttm.labels.unshift(item.thoigian);
            bien_loi_nhuan_sau_thue.data.unshift(
              item.bien_loi_nhuan_sau_thue * 100
            );
            bien_loi_nhuan_gop.data.unshift(item.bien_loi_nhuan_gop * 100);
            bien_loi_nhuan_ebit.data.unshift(item.bien_loi_nhuan_ebit * 100);
            bien_loi_nhuan_ebitda.data.unshift(
              item.bien_loi_nhuan_ebitda * 100
            );
          });
          this.chartdata_bien_lai_ttm.datasets = [];
          this.chartdata_bien_lai_ttm.datasets.push(bien_loi_nhuan_sau_thue);
          this.chartdata_bien_lai_ttm.datasets.push(bien_loi_nhuan_gop);
          this.chartdata_bien_lai_ttm.datasets.push(bien_loi_nhuan_ebit);
          this.chartdata_bien_lai_ttm.datasets.push(bien_loi_nhuan_ebitda);
        });
    },
    hieuSuatHoatDongQuy() {
      let self = this;
      let vong_quay_tong_ts = {
        label: "Vòng quay tổng tài sản",
        data: [],
        backgroundColor: this.color("blue"),
        borderColor: this.color("blue"),
        fill: false,
        borderWidth: 1,
        order: 2,
        type: "line",
      };
      let vong_quay_htk = {
        label: "Vòng quay hàng tồn kho",
        data: [],
        backgroundColor: this.color("orange"),
        borderColor: this.color("orange"),
        fill: false,
        borderWidth: 1,
        order: 2,
        type: "line",
        pointStyle: "rect",
      };
      let vong_quay_cac_khoan_phai_thu = {
        label: "Vòng quay các khoản phải thu",
        data: [],
        backgroundColor: this.color("grey"),
        borderColor: this.color("grey"),
        fill: false,
        borderWidth: 1,
        order: 2,
        type: "line",
        pointStyle: "triangle",
      };
      axios
        .get(this.$apiAdress + "/api/stocks/chart/hieu-suat-hoat-dong-quy", {
          params: {
            mack: self.mack,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          self.chartdata_hieu_suat_hoat_dong_quy.labels = [];
          res.data.forEach((item) => {
            self.chartdata_hieu_suat_hoat_dong_quy.labels.unshift(
              item.thoigian
            );
            vong_quay_tong_ts.data.unshift(item.vong_quay_tong_ts * 100);
            vong_quay_htk.data.unshift(item.vong_quay_htk * 100);
            vong_quay_cac_khoan_phai_thu.data.unshift(
              item.vong_quay_cac_khoan_phai_thu * 100
            );
          });
          this.chartdata_hieu_suat_hoat_dong_quy.datasets = [];
          this.chartdata_hieu_suat_hoat_dong_quy.datasets.push(
            vong_quay_tong_ts
          );
          this.chartdata_hieu_suat_hoat_dong_quy.datasets.push(vong_quay_htk);
          this.chartdata_hieu_suat_hoat_dong_quy.datasets.push(
            vong_quay_cac_khoan_phai_thu
          );
        });
    },
    hieuSuatHoatDongTTM() {
      let self = this;
      let vong_quay_tong_ts = {
        label: "Vòng quay tổng tài sản",
        data: [],
        backgroundColor: this.color("blue"),
        borderColor: this.color("blue"),
        fill: false,
        borderWidth: 1,
        order: 2,
        type: "line",
      };
      let vong_quay_htk = {
        label: "Vòng quay hàng tồn kho",
        data: [],
        backgroundColor: this.color("orange"),
        borderColor: this.color("orange"),
        fill: false,
        borderWidth: 1,
        order: 2,
        type: "line",
        pointStyle: "rect",
      };
      let vong_quay_cac_khoan_phai_thu = {
        label: "Vòng quay các khoản phải thu",
        data: [],
        backgroundColor: this.color("grey"),
        borderColor: this.color("grey"),
        fill: false,
        borderWidth: 1,
        order: 2,
        type: "line",
        pointStyle: "triangle",
      };
      axios
        .get(this.$apiAdress + "/api/stocks/chart/hieu-suat-hoat-dong-ttm", {
          params: {
            mack: self.mack,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          self.chartdata_hieu_suat_hoat_dong_ttm.labels = [];
          res.data.forEach((item) => {
            self.chartdata_hieu_suat_hoat_dong_ttm.labels.unshift(
              item.thoigian
            );
            vong_quay_tong_ts.data.unshift(item.vong_quay_tong_ts * 100);
            vong_quay_htk.data.unshift(item.vong_quay_htk * 100);
            vong_quay_cac_khoan_phai_thu.data.unshift(
              item.vong_quay_cac_khoan_phai_thu * 100
            );
          });
          this.chartdata_hieu_suat_hoat_dong_ttm.datasets = [];
          this.chartdata_hieu_suat_hoat_dong_ttm.datasets.push(
            vong_quay_tong_ts
          );
          this.chartdata_hieu_suat_hoat_dong_ttm.datasets.push(vong_quay_htk);
          this.chartdata_hieu_suat_hoat_dong_ttm.datasets.push(
            vong_quay_cac_khoan_phai_thu
          );
        });
    },
    paginatePage() {
      for (let i = 0; i < this.arrayPagePagination.length; i++) {
        if (
          i >= (this.activePagePagination - 1) * this.itemPerPagePagination &&
          i < this.activePagePagination * this.itemPerPagePagination
        )
          this.arrayPagePagination[i] = true;
        else this.arrayPagePagination[i] = false;
      }
      if (this.arrayPagePagination[0]) this.doanhThuLoiNhuanQuy();

      if (this.arrayPagePagination[1]) this.doanhThuLoiNhuanTTM();

      if (this.arrayPagePagination[2]) this.taiSanQuy();

      if (this.arrayPagePagination[3]) this.taiSanTTM();

      if (this.arrayPagePagination[4]) this.nguonVonQuy();

      if (this.arrayPagePagination[5]) this.nguonVonTTM();

      if (this.arrayPagePagination[6]) this.luuChuyenTienQuy();

      if (this.arrayPagePagination[7]) this.luuChuyenTienTTM();

      if (this.arrayPagePagination[8]) this.khaNangThanhToanQuy();

      if (this.arrayPagePagination[9]) this.khaNangThanhToanTTM();

      if (this.arrayPagePagination[10]) this.bienLaiQuy();

      if (this.arrayPagePagination[11]) this.bienLaiTTM();

      if (this.arrayPagePagination[12]) this.hieuSuatHoatDongQuy();

      if (this.arrayPagePagination[13]) this.hieuSuatHoatDongTTM();
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
  },
  watch: {
    activePagePagination: {
      deep: true,
      handler: function () {
        this.paginatePage();
      },
    },
    arrayPagePagination: {
      deep: true,
      handler: function () {
        this.paginatePage();
      },
    },
  },
};
</script>

<style lang="scss">
.table {
  td {
    padding: 0;
    white-space: pre-wrap;
  }
}

.big-text {
  font-size: 10rem;
}
</style>
