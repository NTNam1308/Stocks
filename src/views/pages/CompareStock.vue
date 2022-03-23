<template>
  <CRow>
    <CElementCover
      :opacity="1"
      v-if="is_loading"
      :style="
        $store.state.darkMode
          ? { 'background-color': 'fff' }
          : { 'background-color': '000' }
      "
      ><CSpinner size="5xl" color="success" />
    </CElementCover>
    <CCol sm="12" class="mb-2 mt-2" v-if="!is_loading">
      <CButton @click="warningModal = true" class="float-right" color="primary"
        ><CIcon name="cibAddthis" /> Thêm mã</CButton
      >
    </CCol>
    <CCol sm="12" v-if="!is_loading">
      <CCard>
        <CCardBody>
          <div class="table-scroll">
            <table-scroll
              :scroll-horizontal="scrollHorizontal"
              :scroll-vertical="scrollVertical"
              :sync-header-scroll="syncHeaderScroll"
              :sync-footer-scroll="syncFooterScroll"
              :include-footer="includeFooter"
              :dead-area-color="deadAreaColor"
              :class="{ freezeFirstColumn: freezeFirstColumn }"
            >
              <template #thead>
                <tr class="width-100">
                  <th
                    class="width-inherit"
                    v-for="(item, index) in fields_table"
                    :key="index"
                    :class="item.key === 'chart' ? 'column-chart-sticky' : ''"
                  >
                    <p  v-if="item.key == 'thong_tin' || item.key == 'chart' || item.key == 'don_vi'">{{ item.label }}</p>

                    <p class="cursor-pointer text-decoration-underline" v-else

                     @click="showModalTradingChart(item.label)"
                     :style="
                      $store.state.darkMode
                        ? { 'color': '#9389ef' }
                        : { 'color': '#321fdb' }
                      "
                    >
                    {{ item.label }}
                    </p>
                  </th>
                </tr>
              </template>
              <template #tbody>
                <tr
                  class="width-100"
                  v-for="(item, index) in items_table"
                  :key="index"
                >
                  <td
                    class="width-inherit"
                    v-for="(item1, index1) in fields_table"
                    :key="index1"
                    :style="[item.style ? item.style : {}]"
                    :class="item1.key === 'chart' ? 'column-chart-sticky' : ''"
                  >
                    <template v-if="item1.key === 'chart'">
                      <EchartInTable
                        :databar="item"
                        v-if="item['containChart']"
                        class="float-right"
                      />
                    </template>
                    <template v-else>
                      {{ item[item1.key] }}
                    </template>
                  </td>
                </tr>
              </template>
            </table-scroll>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
    <CModal title="Nhập dữ liệu" :show.sync="warningModal" size="lg">
      <template #footer>
        <CButton color="secondary" @click="warningModal = false">Đóng</CButton>
        <CButton color="primary" @click="getAll"
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
import TableScroll from "@/views/base/TableScroll.vue";
import compareJson from "@/assets/jsons/compare.json";
import draggable from "vuedraggable";
import axios from "axios";
import EchartInTable from "@/views/base/EchartInTable";

export default {
  name: "CompareStock",
  created() {
    let m = Math.floor(new Date().getMonth() / 4) + 1;
    if (m == 1) {
      this.quarter = 4;
      this.year = new Date().getFullYear() - 1;
    } else this.quarter = m - 1;
    this.getAll();
  },
  components: {
    TableScroll,
    draggable,
    EchartInTable,
  },

  data() {
    let return_data = {
      open: false,
      current: 0,
      is_loading: true,
      warningModal: false,
      myArray: [],
      timer: 0,
      quarter: 4,
      year: new Date().getFullYear(),
      scrollVertical: false,
      scrollHorizontal: true,
      syncHeaderScroll: true,
      syncFooterScroll: true,
      includeFooter: true,
      deadAreaColor: "#DDDDDD",
      maxRows: 100,
      freezeFirstColumn: true,
      mackInsert: "",
      suggestions: [],
      list_items: [],
      default_fields: [
        {
          key: "thong_tin",
          label: "Thông tin",
        },
        {
          key: "don_vi",
          label: "Đơn vị",
        },
        {
          key: "chart",
          label: "Biểu đồ",
        },
      ],
    };
    return return_data;
  },
  methods: {
    showModalTradingChart(mack) {
      this.$store.state.mackTradingChart = mack;
      this.$store.state.isShowModalTradingChart = true;
    },
    getAll() {
      let self = this;
      self.is_loading = true;
      let arrMack = [];
      self.myArray.forEach((item) => {
        arrMack.push(item.mack);
      });
      arrMack.unshift(self.$store.state.mack);
      self.warningModal = false;
      const type = self.$store.state.list_mack_company.hasOwnProperty(self.$store.state.mack)
        ? self.$store.state.list_mack_company[self.$store.state.mack].nhom
        : "";
      const department = self.$store.state.list_mack_company.hasOwnProperty(self.$store.state.mack)
        ? self.$store.state.list_mack_company[self.$store.state.mack].nganh
        : "";
      self.$store.state.type_mack = type;
      self.$store.state.department = department;
      axios
        .get(self.$apiAdress + "/api/stocks/compare", {
          params: {
            mack: arrMack,
            type: self.$store.state.type_mack,
            department: self.$store.state.department,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((response) => {
          self.is_loading = false;
          if (response.data.length === 0) {
            return;
          }
          if (self.myArray.length === 0) {
            self.myArray = response.data.danh_sach_ma;
          }
          self.list_items = response.data.list_items;
          let arr_mack = [];
          arr_mack.push(this.$store.state.mack);
          for (let i = 0; i < this.myArray.length; i++) {
            const element = this.myArray[i];
            arr_mack.push(element.mack);
          }
          self.scrollRight();
          self.createScrollBarTopTable();
        })
        .catch((err) => {
          console.error(err);
          self.is_loading = false;
        });
    },
    mackChange() {
      this.getAll();
    },
    removeAt(idx) {
      if (this.myArray.length > 1) this.myArray.splice(idx, 1);
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
        for (let i = 0; i < this.$store.state.list_mack.length; i++) {
          if (this.$store.state.list_mack[i].mack.includes(mack)) {
            if (
              this.$store.state.list_mack[i].nhom == this.$store.state.type_mack
            ) {
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

    scrollRight() {
      // setTimeout(() => {
      //   var x = document.querySelectorAll(".table-scroll thead");
      //   for (let i = 0; i < x.length; i++) {
      //     x[i].scrollLeft = 2000000;
      //   }
      //   var y = document.querySelectorAll(".table-scroll tbody");
      //   for (let i = 0; i < y.length; i++) {
      //     y[i].scrollLeft = 2000000;
      //   }
      // }, 500);
    },
    createScrollBarTopTable() {
      setTimeout(() => {
        let list = document.querySelectorAll(".table-scroll table tbody");
        for (let item of list) {
          let element = item;
          let scrollbar = document.createElement("div");
          scrollbar.appendChild(document.createElement("div"));
          scrollbar.style.overflow = "auto";
          scrollbar.style.overflowY = "hidden";
          scrollbar.firstChild.style.width = element.scrollWidth + "px";
          scrollbar.firstChild.style.paddingTop = "1px";
          scrollbar.classList.add("scrollbar-top");
          let running = false;
          scrollbar.onscroll = function () {
            if (running) {
              running = false;
              return;
            }
            running = true;
            element.scrollLeft = scrollbar.scrollLeft;
          };
          element.onscroll = function () {
            if (running) {
              running = false;
              return;
            }
            running = true;
            scrollbar.scrollLeft = element.scrollLeft;
          };
          let ea = element.parentNode;
          let check_node_exists = ea.parentNode.querySelector(".scrollbar-top");
          if (check_node_exists) {
            check_node_exists.remove();
          }
          ea.parentNode.insertBefore(scrollbar, ea);
        }
        let x = document.querySelectorAll(".table-scroll .scrollbar-top");
        for (let i = 0; i < x.length; i++) {
          x[i].scrollLeft = 2000000;
        }
      }, 500);
    },
  },
  computed: {
    openSuggestion() {
      return (
        this.mack !== "" && this.suggestions.length != 0 && this.open === true
      );
    },
    fields_table() {
      let fields = [];
      if (this.list_items.length > 0) {
        fields = JSON.parse(JSON.stringify(this.default_fields));
        this.list_items[0].map((item, index) => {
          fields.push({
            key: "gia_tri_" + index,
            label: item,
          });
        });
      }
      return fields;
    },
    items_table() {
      let items = [];
      if (
        this.list_items.length > 0 &&
        Object.keys(this.$store.state.data_eod).length > 0
      ) {
        let temp_list_item = JSON.parse(JSON.stringify(this.list_items));
        if (this.$store.state.type_mack === "nonbank")
          items = JSON.parse(JSON.stringify(compareJson.nonbank.items));
        else if (this.$store.state.type_mack === "bank")
          items = JSON.parse(JSON.stringify(compareJson.bank.items));
        else if (this.$store.state.type_mack === "stock")
          items = JSON.parse(JSON.stringify(compareJson.stock.items));
        else if (this.$store.state.type_mack === "insurance")
          items = JSON.parse(JSON.stringify(compareJson.insurance.items));
        let indexplus = 1;
        let mack = [];
        let price = [];
        let von_hoa = [];
        let von_dieu_le = [];
        let pe = [];
        let pb = [];
        let gia_tri_doanh_nghiep = [];

        items.forEach((item, index) => {
          if (item.isTitle) {
            temp_list_item[0].map((itemd, indexd) => {
              item["gia_tri_" + indexd] = "";
            });
          } else {
            temp_list_item[0].map((itemd, indexd) => {
              // if (this.$store.state.type_mack === "nonbank") {
              //   mack[indexd] = temp_list_item[0][indexd];
              //   price[indexd] = parseFloat(
              //     this.$store.state.data_eod[mack[indexd]].lastprice
              //   );
              //   if (item.key_calculate == "gia_thi_truong") {
              //     temp_list_item[indexplus][indexd] = price[indexd];
              //   }
              //   if (item.key_calculate == "von_hoa") {
              //     von_hoa[indexd] = temp_list_item[indexplus][indexd] =
              //       (parseFloat(price[indexd]) *
              //         parseFloat(temp_list_item[indexplus][indexd])) /
              //       1000;
              //   }
              //   if (item.key_calculate == "gia_tri_doanh_nghiep") {
              //     gia_tri_doanh_nghiep[indexd] = temp_list_item[indexplus][
              //       indexd
              //     ] =
              //       parseFloat(von_hoa[indexd]) +
              //       parseFloat(temp_list_item[indexplus][indexd]) / 1000;
              //   }
              //   if (item.key_calculate == "pe") {
              //     pe[indexd] = temp_list_item[indexplus][indexd] =
              //       parseFloat(price[indexd]) /
              //       parseFloat(temp_list_item[indexplus][indexd]);
              //   }
              //   if (item.key_calculate == "peg") {
              //     temp_list_item[indexplus][indexd] =
              //       parseFloat(pe[indexd]) /
              //       parseFloat(temp_list_item[indexplus][indexd]) /
              //       100;
              //   }
              //   if (item.key_calculate == "pb") {
              //     temp_list_item[indexplus][indexd] =
              //       parseFloat(price[indexd]) /
              //       parseFloat(temp_list_item[indexplus][indexd]);
              //   }
              //   if (item.key_calculate == "ev_ebit") {
              //     temp_list_item[indexplus][indexd] =
              //       (parseFloat(gia_tri_doanh_nghiep[indexd]) * 1000) /
              //       parseFloat(temp_list_item[indexplus][indexd]);
              //   }
              //   if (item.key_calculate == "ev_ebitda") {
              //     temp_list_item[indexplus][indexd] =
              //       (parseFloat(gia_tri_doanh_nghiep[indexd]) * 1000) /
              //       parseFloat(temp_list_item[indexplus][indexd]);
              //   }
              // } else if (this.$store.state.type_mack === "bank") {
              //   mack[indexd] = temp_list_item[0][indexd];
              //   price[indexd] = parseFloat(
              //     this.$store.state.data_eod[mack[indexd]].lastprice
              //   );
              //   if (item.key_calculate == "gia_thi_truong") {
              //     temp_list_item[indexplus][indexd] = price[indexd];
              //   }
              //   if (item.key_calculate == "von_hoa") {
              //     von_dieu_le[indexd] =
              //       parseFloat(temp_list_item[indexplus][indexd]) / 10000;
              //     von_hoa[indexd] = temp_list_item[indexplus][indexd] =
              //       (parseFloat(price[indexd]) *
              //         parseFloat(temp_list_item[indexplus][indexd])) /
              //       10000;
              //   }
              //   if (item.key_calculate == "gia_tri_so_sach") {
              //     gia_tri_doanh_nghiep[indexd] = temp_list_item[indexplus][
              //       indexd
              //     ] =
              //       parseFloat(temp_list_item[indexplus][indexd]) /
              //       parseFloat(von_dieu_le[indexd]);
              //   }
              //   if (item.key_calculate == "pe") {
              //     pe[indexd] = temp_list_item[indexplus][indexd] =
              //       parseFloat(price[indexd]) /
              //       parseFloat(temp_list_item[indexplus][indexd]);
              //   }
              //   if (item.key_calculate == "peg") {
              //     temp_list_item[indexplus][indexd] =
              //       parseFloat(pe[indexd]) /
              //       parseFloat(temp_list_item[indexplus][indexd]) /
              //       100;
              //   }
              //   if (item.key_calculate == "pb") {
              //     temp_list_item[indexplus][indexd] =
              //       parseFloat(price[indexd]) /
              //       parseFloat(gia_tri_doanh_nghiep[indexd]);
              //   }
              // } else if (this.$store.state.type_mack === "stock") {
              //   mack[indexd] = temp_list_item[0][indexd];
              //   price[indexd] = parseFloat(
              //     this.$store.state.data_eod[mack[indexd]].lastprice
              //   );
              //   if (item.key_calculate == "gia_thi_truong") {
              //     temp_list_item[indexplus][indexd] = price[indexd];
              //   }
              //   if (item.key_calculate == "von_hoa") {
              //     von_hoa[indexd] = temp_list_item[indexplus][indexd] =
              //       (parseFloat(price[indexd]) *
              //         parseFloat(temp_list_item[indexplus][indexd])) /
              //       1000;
              //   }
              //   if (item.key_calculate == "gia_tri_doanh_nghiep") {
              //     gia_tri_doanh_nghiep[indexd] = temp_list_item[indexplus][
              //       indexd
              //     ] =
              //       parseFloat(von_hoa[indexd]) +
              //       parseFloat(temp_list_item[indexplus][indexd]) / 1000;
              //   }
              //   if (item.key_calculate == "pe") {
              //     pe[indexd] = temp_list_item[indexplus][indexd] =
              //       parseFloat(price[indexd]) /
              //       parseFloat(temp_list_item[indexplus][indexd]);
              //   }
              //   if (item.key_calculate == "peg") {
              //     temp_list_item[indexplus][indexd] =
              //       parseFloat(pe[indexd]) /
              //       parseFloat(temp_list_item[indexplus][indexd]) /
              //       100;
              //   }
              //   if (item.key_calculate == "pb") {
              //     temp_list_item[indexplus][indexd] =
              //       parseFloat(price[indexd]) /
              //       parseFloat(temp_list_item[indexplus][indexd]);
              //   }
              //   if (item.key_calculate == "ev_ebit") {
              //     temp_list_item[indexplus][indexd] =
              //       (parseFloat(gia_tri_doanh_nghiep[indexd]) * 1000) /
              //       parseFloat(temp_list_item[indexplus][indexd]);
              //   }
              //   if (item.key_calculate == "ev_ebitda") {
              //     temp_list_item[indexplus][indexd] =
              //       (parseFloat(gia_tri_doanh_nghiep[indexd]) * 1000) /
              //       parseFloat(temp_list_item[indexplus][indexd]);
              //   }
              // } else if (this.$store.state.type_mack === "insurance") {
              //   mack[indexd] = temp_list_item[0][indexd];
              //   price[indexd] = parseFloat(
              //     this.$store.state.data_eod[mack[indexd]].lastprice
              //   );
              //   if (item.key_calculate == "gia_thi_truong") {
              //     temp_list_item[indexplus][indexd] = price[indexd];
              //   }
              //   if (item.key_calculate == "von_hoa") {
              //     von_hoa[indexd] = temp_list_item[indexplus][indexd] =
              //       (parseFloat(price[indexd]) *
              //         parseFloat(temp_list_item[indexplus][indexd])) /
              //       10000000;
              //   }
              //   if (item.key_calculate == "gia_tri_doanh_nghiep") {
              //     gia_tri_doanh_nghiep[indexd] = temp_list_item[indexplus][
              //       indexd
              //     ] =
              //       parseFloat(von_hoa[indexd]) +
              //       parseFloat(temp_list_item[indexplus][indexd]) / 1000;
              //   }
              //   if (item.key_calculate == "pe") {
              //     pe[indexd] = temp_list_item[indexplus][indexd] =
              //       parseFloat(price[indexd]) /
              //       parseFloat(temp_list_item[indexplus][indexd]);
              //   }
              //   if (item.key_calculate == "peg") {
              //     temp_list_item[indexplus][indexd] =
              //       parseFloat(pe[indexd]) /
              //       parseFloat(temp_list_item[indexplus][indexd]) /
              //       100;
              //   }
              //   if (item.key_calculate == "pb") {
              //     temp_list_item[indexplus][indexd] =
              //       parseFloat(price[indexd]) /
              //       parseFloat(temp_list_item[indexplus][indexd]);
              //   }
              //   if (item.key_calculate == "ev_ebit") {
              //     temp_list_item[indexplus][indexd] =
              //       (parseFloat(gia_tri_doanh_nghiep[indexd]) * 1000) /
              //       parseFloat(temp_list_item[indexplus][indexd]);
              //   }
              //   if (item.key_calculate == "ev_ebitda") {
              //     temp_list_item[indexplus][indexd] =
              //       (parseFloat(gia_tri_doanh_nghiep[indexd]) * 1000) /
              //       parseFloat(temp_list_item[indexplus][indexd]);
              //   }
              // }
              if (temp_list_item[indexplus][indexd]) {
                if (item["type"] === "money") {
                  temp_list_item[indexplus][indexd] =
                    temp_list_item[indexplus][indexd] / 1000;
                }
                if (item["isGetDataDirective"]) {
                  item["gia_tri_" + indexd] = temp_list_item[indexplus][
                    indexd
                  ].toLocaleString("en", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  });
                } else {
                  item["gia_tri_" + indexd] = temp_list_item[indexplus][
                    indexd
                  ].toLocaleString("en", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 1,
                  });
                }
                if (item["prefixText"]) {
                  item["gia_tri_" + indexd] =
                    item["prefixText"] + item["gia_tri_" + indexd];
                }
                if (item["postText"]) {
                  item["gia_tri_" + indexd] =
                    item["gia_tri_" + indexd] + item["postText"];
                }
              } else item["gia_tri_" + indexd] = 0;
            });
            indexplus++;
          }
        });
      }
      return items;
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
@media only screen and (min-width: 1024px) {
  th {
    &.width-inherit {
      &:nth-child(2) {
        padding-right: 70px  !important;
      }
    }
  }
  td {
    &.width-inherit {
      &:nth-child(2) {
        padding-right: 70px  !important;
      }
    }
  }
}
.width-100 {
  width: 100% !important;
}
.width-inherit {
  width: inherit !important;
}
.disale-scroll-vertical {
  height: inherit !important;
}
.text-decoration-underline:hover {
  text-decoration: underline !important;
}
</style>
