<template>
  <CRow>
    <CCol sm="12">
      <div class="mt-3">
        <template v-if="$store.state.darkMode">
          <div class="p-logo-slim">
            <img src="/img/logo-stocks.png" class="p-logo-img-slim" />
          </div>
        </template>
        <template v-else>
          <div class="p-logo-slim">
            <img src="/img/logo-stocks-dark.png" class="p-logo-img-slim" />
          </div>
        </template>
      </div>
    </CCol>
    <CElementCover
      :opacity="1"
      v-if="options_bank_is_loading"
      :style="
        $store.state.darkMode
          ? { 'background-color': 'fff' }
          : { 'background-color': '000' }
      "
      ><CSpinner size="5xl" color="success" />
    </CElementCover>
    <CCol sm="12" class="mb-2" v-if="!options_bank_is_loading">
      <CButton @click="warningModal = true" class="float-right" color="primary"
        ><CIcon name="cibAddthis" /> Thêm mã</CButton
      >
    </CCol>
    <CCol xl="4" lg="6" class="mb-3 pl-2 pr-2">
      <CCard>
        <CustomEChart
          :option="options_bank['radar']"
          v-if="!options_bank_is_loading"
        />
      </CCard>
    </CCol>
    <CCol
      xl="4"
      lg="6"
      class="mb-3 pl-2 pr-2"
      v-if="options_bank['tsq'].series.length > 0"
    >
      <CCard>
        <CustomEChart
          :option="options_bank['tsq']"
          v-if="!options_bank_is_loading"
        />
      </CCard>
    </CCol>
    <CCol
      xl="4"
      lg="6"
      class="mb-3 pl-2 pr-2"
      v-if="options_bank['ldrq'].series.length > 0"
    >
      <CCard>
        <CustomEChart
          :option="options_bank['ldrq']"
          v-if="!options_bank_is_loading"
        />
      </CCard>
    </CCol>
    <CCol xl="4" lg="6" class="mb-3 pl-2 pr-2">
      <CCard>
        <CustomEChart
          :option="options_bank['bar']"
          v-if="!options_bank_is_loading"
        />
      </CCard>
    </CCol>
    <CCol
      xl="4"
      lg="6"
      class="mb-3 pl-2 pr-2"
      v-if="options_bank['hqttm'].series.length > 0"
    >
      <CCard>
        <CustomEChart
          :option="options_bank['hqttm']"
          v-if="!options_bank_is_loading"
        />
      </CCard>
    </CCol>
    <CCol
      xl="4"
      lg="6"
      class="mb-3 pl-2 pr-2"
      v-if="options_bank['tnttm'].series.length > 0"
    >
      <CCard>
        <CustomEChart
          :option="options_bank['tnttm']"
          v-if="!options_bank_is_loading"
        />
      </CCard>
    </CCol>
    <CCol xl="4" lg="6" class="mb-3 pl-2 pr-2">
      <CCard>
        <CRow class="d-flex justify-content-center">
          <CCol sm="4" class="pt-3" v-if="!options_bank_is_loading">
            <CSelect
              class="mb-0"
              :value.sync="value_filter_scatter_chart"
              :options="option_filter_scatter_chart"
              @change="getChartScatter"
            >
            </CSelect>
          </CCol>
        </CRow>
        <CustomEChart
          :option="option_heatmap"
          style="height: 450px"
          v-if="!options_bank_is_loading"
        />
      </CCard>
    </CCol>
    <CCol xl="4" lg="6" class="mb-3 pl-2 pr-2">
      <CCard>
        <CRow class="d-flex justify-content-center">
        </CRow>
        <CustomEChart
          :option="options_bank['nxn_nhom_345']"
          style="height: 500px"
          v-if="!options_bank_is_loading"
        />
      </CCard>
    </CCol>
    <CCol xl="4" lg="6" class="mb-3 pl-2 pr-2">
      <CCard>
        <CRow class="d-flex justify-content-center">
          <CCol sm="4" class="pt-3" v-if="!options_bank_is_loading">
            <CSelect
              class="mb-0"
              :value.sync="value_filter_nxtnh_chart"
              :options="option_filter_nxtnh_chart"
            >
            </CSelect>
          </CCol>
        </CRow>
        <CustomEChart
          :option="options_bank['nxtnh_nhom_3']"
          style="height: 450px"
          v-if="
            !options_bank_is_loading && value_filter_nxtnh_chart == 'no_nhom_3'
          "
        />
        <CustomEChart
          :option="options_bank['nxtnh_nhom_4']"
          style="height: 450px"
          v-if="
            !options_bank_is_loading && value_filter_nxtnh_chart == 'no_nhom_4'
          "
        />
        <CustomEChart
          :option="options_bank['nxtnh_nhom_5']"
          style="height: 450px"
          v-if="
            !options_bank_is_loading && value_filter_nxtnh_chart == 'no_nhom_5'
          "
        />
        <CustomEChart
          :option="options_bank['nxtnh_nhom_345']"
          style="height: 450px"
          v-if="
            !options_bank_is_loading &&
            value_filter_nxtnh_chart == 'no_nhom_345'
          "
        />
      </CCard>
    </CCol>
    <CModal title="Nhập dữ liệu" :show.sync="warningModal" size="lg">
      <template #footer>
        <CButton color="secondary" @click="warningModal = false">Đóng</CButton>
        <CButton color="primary" @click="getAllChartBank"
          ><CIcon name="cilSave" /> Lưu
        </CButton>
      </template>
      <CRow>
        <CCol sm="4">
          <CInput
            placeholder="Thêm mã vào danh sách"
            label="Mã mack"
            v-model="mackInsert"
            @keydown.enter="enter"
            @keydown.down="down"
            @keydown.up="up"
            @input="change"
            class="mb-1"
          />
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
        </CCol>
        <CCol sm="4">
          <CSelect :value.sync="quarter" :options="[1, 2, 3, 4]" label="Quý">
            <template #prepend-content>
              <CIcon name="cil-clock" />
            </template>
          </CSelect>
        </CCol>
        <CCol sm="4">
          <CInput placeholder="Nhập năm" label="Năm" v-model="year" />
        </CCol>
      </CRow>
      <p>Danh sách mã</p>
      <CListGroup>
        <CListGroupItem href="#">
          <table style="width: 100%">
            <tr>
              <td class="font-weight-bold pt-2 pb-2" style="width: 10%">
                <CIcon name="cilMove" class="handle" />
              </td>
              <td class="font-weight-bold" style="width: 30%">
                {{ $store.state.mack.toUpperCase() }}
              </td>
              <td>{{ $store.state.description_mack }}</td>
              <td class="font-weight-bold" style="width: 1%"></td>
            </tr>
          </table>
        </CListGroupItem>
        <draggable v-model="myArray" @start="drag = true" @end="drag = false">
          <CListGroupItem
            href="#"
            v-for="(element, index) in myArray"
            :key="index"
          >
            <table style="width: 100%">
              <tr>
                <td class="font-weight-bold pt-2 pb-2" style="width: 10%">
                  <CIcon name="cilMove" class="handle" />
                </td>
                <td class="font-weight-bold" style="width: 30%">
                  {{ element.mack }}
                </td>
                <td>{{ element.ten_cong_ty }}</td>
                <td
                  class="font-weight-bold"
                  style="width: 1%"
                  @click="removeAt(index)"
                >
                  <CIcon name="cilXCircle" class="handle" />
                </td>
              </tr>
            </table>
          </CListGroupItem>
        </draggable>
      </CListGroup>
    </CModal>
  </CRow>
</template>

<script>
import CustomEChart from "@/views/charts/CustomEchart";
import draggable from "vuedraggable";
import axios from "axios";

export default {
  name: "ChartByBank",
  created() {
    // let m = Math.floor(new Date().getMonth() / 4) + 1;
    // if (m == 1) {
    //   this.quarter = 4;
    //   this.year = new Date().getFullYear() - 1;
    // } else this.quarter = m - 1;
    this.mackChange();
  },
  components: {
    CustomEChart,
    draggable,
  },

  data() {
    return {
      open: false,
      current: 0,
      options_bank: {
        hqttm: {
          series: [],
        },
        ldrq: {
          series: [],
        },
        tnttm: {
          series: [],
        },
        tsq: {
          series: [],
        },
      },
      options_bank_is_loading: true,
      warningModal: false,
      myArray: [],
      timer: 0,
      // quarter: Math.floor(new Date().getMonth() / 4) + 1,
      quarter: 0,
      year: 0,
      mackInsert: "",
      suggestions: [],
      option_filter_scatter_chart: [
        {
          value: "huy_dong_von",
          label: "HUY ĐỘNG VỐN",
        },
        {
          value: "tong_tai_san",
          label: "TỔNG TÀI SẢN",
        },
        {
          value: "du_no_cho_vay",
          label: "DƯ NỢ CHO VAY",
        },
        {
          value: "von_dieu_le",
          label: "VỐN ĐIỀU LỆ",
        },
        {
          value: "thu_nhap_theo_lai_thuan",
          label: "THU NHẬP THEO LÃI THUẦN",
        },
        {
          value: "loi_nhuan_sau_thue",
          label: "LỢI NHUẬN SAU THUẾ",
        },
        {
          value: "no_nhom_3",
          label: "NỢ NHÓM 3",
        },
        {
          value: "no_nhom_4",
          label: "NỢ NHÓM 4",
        },
        {
          value: "no_nhom_5",
          label: "NỢ NHÓM 5",
        },
        {
          value: "no_nhom_345",
          label: "TỔNG NỢ XẤU",
        },
      ],
      value_filter_scatter_chart: "huy_dong_von",
      option_filter_nxtnh_chart: [
        {
          value: "no_nhom_3",
          label: "NỢ NHÓM 3",
        },
        {
          value: "no_nhom_4",
          label: "NỢ NHÓM 4",
        },
        {
          value: "no_nhom_5",
          label: "NỢ NHÓM 5",
        },
        {
          value: "no_nhom_345",
          label: "TỔNG NỢ XẤU",
        },
      ],
      value_filter_nxtnh_chart: "no_nhom_345",
      data_scatter_chart: [],
    };
  },
  methods: {
    getAllChartBank() {
      let self = this;
      self.options_bank_is_loading = true;
      let arrMack = [];
      self.myArray.forEach((item) => {
        arrMack.push(item.mack);
      });
      arrMack.unshift(self.$store.state.mack);
      self.warningModal = false;
      axios
        .get(self.$apiAdress + "/api/stocks/chart/bank", {
          params: {
            quarter: self.quarter,
            year: self.year,
            mack: arrMack,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          self.options_bank = res.data;
          if (this.quarter == 0 && this.year == 0) {
            this.quarter = res.data.quarter;
            this.year = res.data.year;
          }
          self.options_bank["radar"].tooltip.formatter = (params) => {
            let text = "";
            text += "<b>" + params.name + "</b><br/>";
            let arr_label = [
              "CIR",
              "ROA",
              "ROE",
              "NIM",
              "Lãi đầu tư",
              "Lãi thu phí",
              "Lãi dự thu",
              "Dự phòng",
              "CAR",
              "NPL",
              "CASA",
            ];
            params.value.forEach((item, index) => {
              text +=
                arr_label[index] +
                ": <b>" +
                item.toLocaleString("en", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 1,
                }) +
                "</b> đ <br/>";
            });
            return text;
          };
          self.options_bank["bar"].tooltip.formatter = (params) => {
            return (
              params.name +
              ": " +
              "<b>" +
              params.data.toLocaleString("en", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 1,
              }) +
              "</b>"
            );
          };
          for (const key in self.options_bank) {
            console.log("key", key);
            if (["quarter", "year", "radar", "bar"].includes(key)) {
              continue;
            } else {
              if (self.options_bank[key].series.length > 0) {
                self.options_bank[key].tooltip.position = function (
                  pos,
                  params,
                  dom,
                  rect,
                  size
                ) {
                  const width_chart = size.viewSize[0];
                  if (pos[0] < width_chart / 2) {
                    if (size.contentSize[0] + pos[0] > width_chart)
                      return {
                        left: 0,
                        top: pos[1] - size.contentSize[1],
                      };
                    return {
                      left: pos[0],
                      top: pos[1] - size.contentSize[1],
                    };
                  } else {
                    if (
                      size.contentSize[0] + (width_chart - pos[0]) >
                      width_chart
                    )
                      return {
                        right: 0,
                        top: pos[1] - size.contentSize[1],
                      };
                    return {
                      right: width_chart - pos[0],
                      top: pos[1] - size.contentSize[1],
                    };
                  }
                };
                self.options_bank[key].tooltip.formatter = (params) => {
                  let yAxis = self.options_bank[key].yAxis;
                  let series = self.options_bank[key].series;
                  let text = "";
                  text += "<b>" + params[0].axisValueLabel + "</b><br/>";
                  params.forEach((item) => {
                    let position = series[item.seriesIndex].yAxisIndex
                      ? series[item.seriesIndex].yAxisIndex
                      : 0;
                    let post_text = yAxis[position].name;
                    switch (post_text) {
                      case "Phần trăm":
                        post_text = "%";
                        break;
                      default:
                        break;
                    }
                    text += item.seriesName;
                    text += ": <b>";
                    text += item.value.toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 1,
                    });
                    text += "</b> ";
                    text += post_text;
                    text += "<br/>";
                  });
                  return text;
                };
                self.options_bank[key].yAxis[0].axisLabel.formatter = (
                  value
                ) => {
                  return (value / 1000).toLocaleString("en", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 1,
                  });
                };
                self.options_bank[key].toolbox = {
                  show: true,
                  feature: {
                    dataView: {
                      readOnly: true,
                      title: "Bảng dữ liệu",
                      lang: ["Bảng dữ liệu", "Đóng", "Tải lại"],
                    },
                    magicType: {
                      type: ["line", "bar", "stack"],
                      title: {
                        line: "Biểu đồ đường",
                        bar: "Biểu đồ cột",
                        stack: "Biểu đồ chồng",
                      },
                    },
                    restore: {
                      title: "Khôi phục",
                    },
                  },
                };
              }
            }
          }
          self.options_bank_is_loading = false;
        })
        .catch((err) => {
          console.error(err);
          self.options_bank = {};
          self.options_bank_is_loading = false;
        });
    },
    getChartScatter() {
      let self = this;
      self.options_nonbank_is_loading = true;
      axios
        .get(self.$apiAdress + "/api/stocks/chart/bank/scatter", {
          params: {
            quarter: self.quarter,
            year: self.year,
            mack: self.$store.state.mack,
            type_data: self.value_filter_scatter_chart,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          self.options_bank_is_loading = false;
          self.data_scatter_chart = res.data;
        })
        .catch((err) => {
          self.data_scatter_chart = [];
          self.options_bank_is_loading = false;
          console.error(err);
        });
    },
    mackChange() {
      this.getAllChartBank();
      this.getChartScatter();
    },
    removeAt(idx) {
      this.myArray.splice(idx, 1);
    },
    enter() {
      let resultSearch = false;
      if (
        this.suggestions[this.current].mack.toUpperCase() ==
        this.$store.state.mack.toUpperCase()
      )
        resultSearch = true;
      this.myArray.find((item) => {
        if (
          item.mack.toUpperCase() ==
          this.suggestions[this.current].mack.toUpperCase()
        ) {
          resultSearch = true;
          return true;
        }
      });
      if (!resultSearch && this.suggestions.length > 0) {
        this.myArray.push({
          mack: this.suggestions[this.current].mack,
          ten_cong_ty: this.suggestions[this.current].ten_cong_ty,
        });
      }
      this.mackInsert = "";
      this.open = false;
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

    searchMack(mack) {
      mack = mack.toUpperCase();
      let return_data = [];
      const limit = 5;
      if (this.$store.state.list_mack.length > 0 && mack != "") {
        const type_mack = this.$store.state.list_mack_company.hasOwnProperty(
          this.$store.state.mack
        )
          ? this.$store.state.list_mack_company[this.$store.state.mack].nhom
          : "";
        console.log("type_mack", type_mack);
        for (let i = 0; i < this.$store.state.list_mack.length; i++) {
          if (this.$store.state.list_mack[i].mack.includes(mack)) {
            if (this.$store.state.list_mack[i].nhom == type_mack) {
              return_data.push(this.$store.state.list_mack[i]);
            }
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
      this.suggestions = this.searchMack(this.mackInsert);
    },

    suggestionClick(index) {
      this.open = false;
      let resultSearch = false;
      if (
        this.suggestions[index].mack.toUpperCase() ===
        this.$store.state.mack.toUpperCase()
      )
        resultSearch = true;
      this.myArray.find((item) => {
        if (
          item.mack.toUpperCase() === this.suggestions[index].mack.toUpperCase()
        ) {
          resultSearch = true;
          return true;
        }
      });
      if (!resultSearch && this.suggestions.length > 0) {
        this.myArray.push({
          mack: this.suggestions[index].mack,
          ten_cong_ty: this.suggestions[index].ten_cong_ty,
        });
      }
      this.mackInsert = "";
      this.open = false;
    },
  },
  computed: {
    openSuggestion() {
      return (
        this.mack !== "" && this.suggestions.length != 0 && this.open === true
      );
    },
    option_heatmap() {
      let max =
        this.data_scatter_chart.length == 0 ? 0 : this.data_scatter_chart[0][2];
      if (this.data_scatter_chart.length != 0) {
        for (let i = 0; i < this.data_scatter_chart.length; i++) {
          if (this.data_scatter_chart[i][2] > max)
            max = this.data_scatter_chart[i][2];
        }
      }
      let option = {
        tooltip: {
          show: true,
          formatter: (params) => {
            return (
              params.value[3] +
              ": " +
              "<b>" +
              params.value[2].toLocaleString("en", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 1,
              }) +
              "</b> tỷ VNĐ"
            );
          },
        },
        legend: {
          show: false,
        },
        xAxis: {
          scale: true,
        },
        yAxis: {
          type: "value",
          scale: true,
          axisLabel: {
            formatter: (value) => {
              return (value / 1000).toLocaleString("en", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 1,
              });
            },
          },
        },
        series: [
          {
            data: this.data_scatter_chart.slice(
              1,
              this.data_scatter_chart.length
            ),
            type: "scatter",
            emphasis: {
              focus: "series",
              label: {
                show: true,
                position: "top",
              },
            },
            label: {
              show: true,
              formatter: "{@[3]}",
            },
            symbolSize: function (data) {
              return data[2] / (max / 60);
            },
          },
          {
            data: this.data_scatter_chart.slice(0, 1),
            type: "scatter",
            emphasis: {
              focus: "series",
              label: {
                show: true,
                position: "top",
              },
            },
            label: {
              show: true,
              formatter: "{@[3]}",
            },
            symbolSize: function (data) {
              return data[2] / (max / 60);
            },
            itemStyle: {
              color: "#ef1cc9",
            },
          },
        ],
      };
      return option;
    },
  },
  watch: {
    "$store.state.mack": function () {
      this.myArray = [];
      this.mackChange();
    },
  },
};
</script>
<style lang="scss" scoped>
.card {
  margin-bottom: 0.5rem;
}
.p-logo-slim {
  text-align: center;
}
.p-logo-img-slim {
  max-width: 200px;
  width: 100%;
  height: auto;
}
</style>
