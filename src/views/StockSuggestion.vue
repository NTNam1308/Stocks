<template>
  <div>
    <CCard class="mb-1" v-if="isAdmin">
      <CCardHeader>
        <CRow>
          <CCol sm="2" class="pl-2 pr-0">
            <div
              style="position: relative"
              v-bind:class="{ show: openSuggestion }"
            >
              <CInput
                label="Mã CK"
                v-model="list_data_model_add.mack"
                placeholder="Mã CK"
                @keydown.enter="enter"
                @keydown.down="down"
                @keydown.up="up"
                @input="change"
                :addInputClasses="{
                  'is-invalid': !is_valid_form_add.mack,
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
          <CCol sm="2" class="pl-2 pr-0">
            <CInput
              label="Giá khuyến nghị"
              type="number"
              v-model="list_data_model_add.gia_khuyen_nghi"
              :addInputClasses="{
                'is-invalid': !is_valid_form_add.gia_khuyen_nghi,
              }"
            />
          </CCol>
          <CCol sm="2" class="pl-2 pr-0">
            <CInput
              type="date"
              label="Ngày khuyến nghị"
              v-model="list_data_model_add.ngay_khuyen_nghi"
            />
          </CCol>
          <CCol sm="2" class="pl-2 pr-0">
            <CInput
              label="Giá mục tiêu"
              type="number"
              v-model="list_data_model_add.gia_muc_tieu"
              :addInputClasses="{
                'is-invalid': !is_valid_form_add.gia_muc_tieu,
              }"
            />
          </CCol>
          <CCol sm="2" class="pl-2 pr-0">
            <CInput
              label="Giá cắt lỗ"
              type="number"
              v-model="list_data_model_add.gia_cat_lo"
              :addInputClasses="{ 'is-invalid': !is_valid_form_add.gia_cat_lo }"
            />
          </CCol>
          <CCol sm="1" class="margin-top-1-7rem">
            <CButton color="success" @click="addNewTrading()"
              ><CIcon name="cibAddthis" /> Thêm</CButton
            >
          </CCol>
        </CRow>
      </CCardHeader>
    </CCard>
    <CCard class="mb-1">
      <CCardHeader>
        <div class="d-flex justify-content-between">
          <p class="text-left h5">Danh sách các mã đang khuyến nghị</p>
          <p class="text-right">Đơn vị: nghìn đồng</p>
        </div>
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
        <CDataTable
          v-if="!is_loading_table"
          :items="itemStockSuggestionNotClosed"
          :fields="list_field_stock_suggestion_not_closed"
          hover
          sorter
          striped
          bordered
          :noItemsView="{
            noResults: 'Không có dữ liệu',
            noItems: 'Không có dữ liệu',
          }"
          class="cursor-pointer datatable-trading-log"
        >
          <template #mack="{ item }">
            <td @click="showModalTradingChart(item.mack)" class="text-center">
              <CLink
                data-toggle="tooltip"
                data-placement="bottom"
                :title="item.ten_cong_ty"
                ><b>{{ item.mack }}</b></CLink
              >
            </td>
          </template>
          <template #gia_khuyen_nghi="{ item }">
            <td class="text-right">
              {{ formatMoney(item.gia_khuyen_nghi, 0, 2) }}
            </td>
          </template>
          <template #ngay_khuyen_nghi="{ item }">
            <td class="text-center">
              {{
                formatDate(
                  item.ngay_khuyen_nghi.substr(0, 10),
                  "yyyy-MM-dd",
                  "-"
                )
              }}
            </td>
          </template>
          <template #gia_muc_tieu="{ item }">
            <td class="text-right">
              {{ formatMoney(item.gia_muc_tieu, 0, 2) }}
            </td>
          </template>
          <template #gia_cat_lo="{ item }">
            <td class="text-right">{{ formatMoney(item.gia_cat_lo, 0, 2) }}</td>
          </template>
          <template #gia_co_phieu_hien_tai="{ item }">
            <td class="text-right" style="white-space: nowrap">
              <transition
                :name="$function_global.getAnimationNameFromCL(item.cl)"
                mode="out-in"
              >
                <span :key="item.change">
                  {{ formatMoney(item.gia_co_phieu_hien_tai, 0, 2) }}
                  <CIcon
                    v-if="item.perchange != 0"
                    :name="
                      item.perchange > 0 ? 'cil-caret-top' : 'cil-caret-bottom'
                    "
                    class="mb-1"
                     :class="$function_global.getClassTextColorFromCL(item.cl)"
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
          </template>
          <template #muc_do_loi_lo_hien_tai="{ item }">
            <td class="text-right" style="white-space: nowrap">
              <transition
                :name="$function_global.getAnimationNameFromCL(item.cl)"
                mode="out-in"
              >
                <span
                  :key="item.change"
                  class="display-inline-flex"
                  v-html="
                    $function_global.getSpanColorByValue(
                      item.muc_do_loi_lo_hien_tai * 100,
                      0,
                      1,
                      '%'
                    )
                  "
                >
                </span>
              </transition>
            </td>
          </template>
          <template #id="{ item }">
            <td class="text-center">
              <CButton
                size="sm"
                color="info"
                class=""
                @click="showModalCloseSuggestion(item)"
              >
                Đóng KN
              </CButton>
              <CButton
                size="sm"
                color="info"
                class="ml-1"
                @click="showModalEditNotClosed(item)"
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
          </template>
        </CDataTable>
      </CCardHeader>
    </CCard>
    <CCard class="mb-1">
      <CCardHeader>
        <div class="d-flex justify-content-between">
          <p class="text-left h5">Danh sách các mã đã đóng khuyến nghị</p>
          <p class="text-right">Đơn vị: nghìn đồng</p>
        </div>
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
        <CDataTable
          v-if="!is_loading_table"
          :items="itemStockSuggestionClosed"
          :fields="list_field_stock_suggestion_closed"
          hover
          sorter
          striped
          bordered
          :noItemsView="{
            noResults: 'Không có dữ liệu',
            noItems: 'Không có dữ liệu',
          }"
          class="cursor-pointer datatable-trading-log"
        >
          <template #mack="{ item }">
            <td @click="showModalTradingChart(item.mack)" class="text-center">
              <CLink
                data-toggle="tooltip"
                data-placement="bottom"
                :title="item.ten_cong_ty"
                ><b>{{ item.mack }}</b></CLink
              >
            </td>
          </template>
          <template #gia_khuyen_nghi="{ item }">
            <td class="text-right">
              {{ formatMoney(item.gia_khuyen_nghi, 0, 2) }}
            </td>
          </template>
          <template #ngay_khuyen_nghi="{ item }">
            <td class="text-center">
              {{
                formatDate(
                  item.ngay_khuyen_nghi.substr(0, 10),
                  "yyyy-MM-dd",
                  "-"
                )
              }}
            </td>
          </template>
          <template #gia_muc_tieu="{ item }">
            <td class="text-right">
              {{ formatMoney(item.gia_muc_tieu, 0, 2) }}
            </td>
          </template>
          <template #gia_cat_lo="{ item }">
            <td class="text-right">{{ formatMoney(item.gia_cat_lo, 0, 2) }}</td>
          </template>
          <template #gia_co_phieu_hien_tai="{ item }">
            <td class="text-right" style="white-space: nowrap">
              <transition
                :name="$function_global.getAnimationNameFromCL(item.cl)"
                mode="out-in"
              >
                <span :key="item.change">
                  {{ formatMoney(item.gia_co_phieu_hien_tai, 0, 2) }}
                  <CIcon
                    v-if="item.perchange != 0"
                    :name="
                      item.perchange > 0 ? 'cil-caret-top' : 'cil-caret-bottom'
                    "
                    class="mb-1"
                    :class="$function_global.getClassTextColorFromCL(item.cl)"
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
          </template>
          <template #muc_do_loi_lo_hien_tai="{ item }">
            <td class="text-right" style="white-space: nowrap">
              <transition
                :name="$function_global.getAnimationNameFromCL(item.cl)"
                mode="out-in"
              >
                <span :key="item.change">
                  <span
                    class="display-inline-flex"
                    v-html="
                      $function_global.getSpanColorByValue(
                        item.muc_do_loi_lo_hien_tai * 100,
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
          <template #ngay_dong_khuyen_nghi="{ item }">
            <td class="text-center">
              {{
                formatDate(
                  item.ngay_dong_khuyen_nghi.substr(0, 10),
                  "yyyy-MM-dd",
                  "-"
                )
              }}
            </td>
          </template>
          <template #gia_dong_khuyen_nghi="{ item }">
            <td class="text-right">
              {{ formatMoney(item.gia_dong_khuyen_nghi, 0, 2) }}
            </td>
          </template>
          <template #muc_do_lai_lo_cua_deal="{ item }">
            <td class="text-right" style="white-space: nowrap">
              <span
                class="display-inline-flex"
                v-html="
                  $function_global.getSpanColorByValue(
                    item.muc_do_lai_lo_cua_deal * 100,
                    0,
                    1,
                    '%'
                  )
                "
              />
            </td>
          </template>
          <template #id="{ item }">
            <td class="text-center">
              <CButton
                size="sm"
                color="info"
                class=""
                @click="showModalEditClosed(item)"
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
          </template>
        </CDataTable>
      </CCardHeader>
    </CCard>
    <NewsRelated :mack="list_mack_unique_of_data_stock_suggestion_not_closed" />
    <CRow>
      <CCol class="footer-alert">
        Tuyên bố trách nhiệm/Disclaimer: Các thông tin, xếp hạng, chấm điểm,
        danh mục KungFuStocksPro trong KungFuStocksPro được đưa ra dựa trên cơ
        sở phân tích chi tiết và cẩn thận, theo đánh giá chủ quan của chúng tôi,
        là hợp lý trong thời điểm đưa ra, nhằm phục vụ mục đích giáo dục, hỗ trợ
        cho các độc giả, nhà đầu tư đọc sách của Happy Live. Các thông tin, xếp
        hạng, chấm điểm, danh mục KungFuStocksPro này không nên được diễn giải
        như một lời kêu gọi, đề nghị mua hay bán bất cứ một cổ phiếu nào.
        KungFuStocksPro sẽ không chịu trách nhiệm đối với tất cả hay bất kỳ
        thiệt hại nào hay sự kiện bị coi là thiệt hại đối với việc sử dụng toàn
        bộ hay bất kỳ thông tin, xếp hạng, chấm điểm, danh mục nào của
        KungFuStocksPro.
      </CCol>
    </CRow>
    <CModal title="Sửa dữ liệu" :show.sync="isShowEditModal" size="lg">
      <template #footer>
        <CButton color="secondary" @click="isShowEditModal = false"
          >Đóng</CButton
        >
        <CButton color="primary" @click="handleSaveEditButton"
          ><CIcon name="cilSave" /> Lưu
        </CButton>
      </template>
      <CRow>
        <CCol sm="3">
          <CInput
            label="Giá khuyến nghị"
            type="number"
            v-model="list_data_model_edit.gia_khuyen_nghi"
            :addInputClasses="{
              'is-invalid': !is_valid_form_edit.gia_khuyen_nghi,
            }"
          />
        </CCol>
        <CCol sm="3">
          <CInput
            type="date"
            label="Ngày khuyến nghị"
            v-model="list_data_model_edit.ngay_khuyen_nghi"
          />
        </CCol>
        <CCol sm="3">
          <CInput
            label="Giá mục tiêu"
            type="number"
            v-model="list_data_model_edit.gia_muc_tieu"
            :addInputClasses="{
              'is-invalid': !is_valid_form_edit.gia_muc_tieu,
            }"
          />
        </CCol>
        <CCol sm="3">
          <CInput
            label="Giá cắt lỗ"
            type="number"
            v-model="list_data_model_edit.gia_cat_lo"
            :addInputClasses="{ 'is-invalid': !is_valid_form_edit.gia_cat_lo }"
          />
        </CCol>
        <CCol sm="3" v-if="list_data_model_edit.type_edit == 'closed'">
          <CInput
            type="date"
            label="Ngày đóng khuyến nghị"
            v-model="list_data_model_edit.ngay_dong_khuyen_nghi"
          />
        </CCol>
        <CCol sm="3" v-if="list_data_model_edit.type_edit == 'closed'">
          <CInput
            label="Giá đóng khuyến nghị"
            type="number"
            v-model="list_data_model_edit.gia_dong_khuyen_nghi"
            :addInputClasses="{
              'is-invalid': !is_valid_form_edit.gia_dong_khuyen_nghi,
            }"
          />
        </CCol>
      </CRow>
    </CModal>
    <CModal title="Xóa dữ liệu" :show.sync="isShowDeleteModal" size="sm">
      <template #footer>
        <CButton color="secondary" @click="isShowDeleteModal = false"
          >Đóng</CButton
        >
        <CButton color="danger" @click="saveDeleteTrading"
          ><CIcon name="cilTrash" /> Xóa
        </CButton>
      </template>
      <CRow>
        <CCol sm="12"> Bạn có chắc chắn không? </CCol>
      </CRow>
    </CModal>
    <CModal
      title="Đóng khuyến nghị"
      :show.sync="isShowCloseSuggestionModal"
      size="sm"
    >
      <template #footer>
        <CButton color="secondary" @click="isShowCloseSuggestionModal = false"
          >Đóng</CButton
        >
        <CButton color="primary" @click="saveCloseSuggestion"
          ><CIcon name="cilSave" /> Lưu
        </CButton>
      </template>
      <CRow>
        <CCol sm="12">
          <CInput
            label="Giá đóng khuyến nghị"
            type="number"
            v-model="gia_dong_khuyen_nghi.value"
            :addInputClasses="{
              'is-invalid': !gia_dong_khuyen_nghi.is_valid,
            }"
          />
        </CCol>
      </CRow>
    </CModal>
    <div v-show="activeCompany" id="alertNameCompany">
      {{ nameCompany }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NewsRelated from "@/views/pages/NewsRelated";

export default {
  name: "StockSuggestion",
  components: {
    NewsRelated,
  },
  data() {
    return {
      is_loading_table: true,
      is_interval: true,
      isAdmin: false,
      activeCompany: false,
      nameCompany: "",
      temp_volume_update: 0,
      volume_mask: "0",
      open: false,
      current: 0,
      timer: 0,
      suggestions: [],
      list_data_model_add: {
        mack: "",
        gia_khuyen_nghi: 0,
        ngay_khuyen_nghi: new Date(Date.now()).toISOString().substr(0, 10),
        gia_muc_tieu: 0,
        gia_cat_lo: 0,
      },
      list_data_model_edit: {
        mack: "",
        gia_khuyen_nghi: 0,
        ngay_khuyen_nghi: new Date(Date.now()).toISOString().substr(0, 10),
        gia_muc_tieu: 0,
        gia_cat_lo: 0,
        ngay_dong_khuyen_nghi: new Date(Date.now()).toISOString().substr(0, 10),
        gia_dong_khuyen_nghi: 0,
        type_edit: "",
      },
      is_valid_form_add: {
        mack: true,
        gia_khuyen_nghi: true,
        gia_muc_tieu: true,
        gia_cat_lo: true,
      },
      is_valid_form_edit: {
        mack: true,
        gia_khuyen_nghi: true,
        gia_muc_tieu: true,
        gia_cat_lo: true,
        gia_dong_khuyen_nghi: true,
      },
      isShowEditModal: false,
      isShowDeleteModal: false,
      isShowCloseSuggestionModal: false,
      idItemTradingLogDelete: -1,
      list_item_stock_suggestion: [],
      gia_dong_khuyen_nghi: {
        value: 0,
        id: -1,
        is_valid: true,
      },
    };
  },
  created() {
    this.getAllItem();
    let roles = localStorage.getItem("roles");
    if (roles != null) {
      roles = roles.split(",");
    }
    if (roles.indexOf("admin") >= 0) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  },
  beforeDestroy() {
    this.is_interval = false;
    window.socket_send.emit(
      "leave",
      this.list_mack_unique_of_data_stock_suggestion
    );
  },
  methods: {
    formatMoney(number, min, max) {
      number = parseFloat(number);
      return number.toLocaleString("en", {
        minimumFractionDigits: min,
        maximumFractionDigits: max,
      });
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
    updateDataEOD() {
      let self = this;
      if (self.list_mack_unique_of_data_stock_suggestion.length == 0) return;
      axios
        // .get(self.$apiAdress + "/api/stocks/dashboard/get-data-eod-by-mack", {
        .get("https://ta.kungfustockspro.live:2083/getlive", {
          params: {
            mack: self.list_mack_unique_of_data_stock_suggestion,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          const rs = res.data;
          if (!rs) return;
          for (let i = 0; i < rs["stockcode"].length; i++) {
            const stockcode = rs["stockcode"][i];
            let item = {
              cl: rs["cl"][i],
              lastprice: rs["lastprice"][i],
              change:
                rs["cl"][i] == "d" || rs["cl"][i] == "f"
                  ? -rs["change"][i]
                  : rs["change"][i],
              perchange:
                rs["cl"][i] == "d" || rs["cl"][i] == "f"
                  ? -rs["perchange"][i]
                  : rs["perchange"][i],
              stockcode: rs["stockcode"][i],
              totalval: rs["totalval"][i],
              totalvol: rs["totalvol"][i],
            };
            self.$store.state.data_eod[stockcode] = item;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    enter() {
      if (this.openSuggestion) {
        this.list_data_model_add.mack = this.suggestions[this.current].mack;
        this.list_data_model_add.gia_khuyen_nghi =
          this.$store.state.data_eod.hasOwnProperty(
            this.list_data_model_add.mack
          )
            ? this.$store.state.data_eod[this.list_data_model_add.mack]
                .lastprice / 1000
            : 0;
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
      this.suggestions = this.searchMack(this.list_data_model_add.mack);
    },

    suggestionClick(index) {
      this.list_data_model_add.mack = this.suggestions[index].mack;
      this.list_data_model_add.gia_khuyen_nghi =
        this.$store.state.data_eod.hasOwnProperty(this.list_data_model_add.mack)
          ? this.$store.state.data_eod[this.list_data_model_add.mack]
              .lastprice / 1000
          : 0;
      this.open = false;
    },

    addNewTrading() {
      let self = this;
      self.is_valid_form_add.mack = !(
        self.list_data_model_add.mack == "" || !self.list_data_model_add.mack
      );
      self.is_valid_form_add.gia_khuyen_nghi = !(
        self.list_data_model_add.gia_khuyen_nghi == "" ||
        !self.list_data_model_add.gia_khuyen_nghi
      );
      self.is_valid_form_add.gia_muc_tieu = !(
        self.list_data_model_add.gia_muc_tieu == "" ||
        !self.list_data_model_add.gia_muc_tieu
      );
      self.is_valid_form_add.gia_cat_lo = !(
        self.list_data_model_add.gia_cat_lo == "" ||
        !self.list_data_model_add.gia_cat_lo
      );
      let check_valid = true;
      Object.keys(self.is_valid_form_add).forEach(function (key) {
        if (!self.is_valid_form_add[key]) check_valid = false;
      });
      if (
        !this.$store.state.data_eod.hasOwnProperty(
          self.list_data_model_add.mack.toUpperCase()
        )
      ) {
        self.$toast.error("Mã CK không hợp lệ!");
        return;
      }
      if (!check_valid) {
        self.$toast.error("Một số nội dung vừa nhập không hợp lệ!");
        return;
      }
      axios
        .post(this.$apiAdress + "/api/stocks/stock_suggestion/store", {
          mack: self.list_data_model_add.mack.toUpperCase(),
          gia_khuyen_nghi: self.list_data_model_add.gia_khuyen_nghi,
          ngay_khuyen_nghi: self.list_data_model_add.ngay_khuyen_nghi,
          gia_muc_tieu: self.list_data_model_add.gia_muc_tieu,
          gia_cat_lo: self.list_data_model_add.gia_cat_lo,
          token: localStorage.getItem("api_token"),
        })
        .then(function (response) {
          response.data._classes = "table-success";
          self.list_item_stock_suggestion.unshift(response.data);
          self.$toast.success("Thêm mới thành công");
          self.list_data_model_add = {
            mack: "",
            gia_khuyen_nghi: 0,
            ngay_khuyen_nghi: new Date(Date.now()).toISOString().substr(0, 10),
            gia_muc_tieu: 0,
            gia_cat_lo: 0,
            ngay_dong_khuyen_nghi: new Date(Date.now())
              .toISOString()
              .substr(0, 10),
            gia_dong_khuyen_nghi: 0,
          };
        })
        .catch(function (error) {
          console.error(error);
          self.$toast.error("Có lỗi xảy ra, vui lòng thử lại");
        });
    },

    showModalCloseSuggestion(item) {
      let self = this;
      self.isShowCloseSuggestionModal = true;
      self.gia_dong_khuyen_nghi.id = item.id;
      self.gia_dong_khuyen_nghi.value = 0;
    },

    saveCloseSuggestion() {
      let self = this;
      if (self.gia_dong_khuyen_nghi.value <= 0) {
        self.$toast.error("Giá đóng khuyến nghị phải lớn hơn 0!");
        self.gia_dong_khuyen_nghi.is_valid = false;
        return;
      }
      axios
        .post(
          this.$apiAdress + "/api/stocks/stock_suggestion/close-suggestion",
          {
            id: self.gia_dong_khuyen_nghi.id,
            gia_dong_khuyen_nghi: self.gia_dong_khuyen_nghi.value,
            token: localStorage.getItem("api_token"),
          }
        )
        .then(function (response) {
          response.data = response.data[0];
          response.data._classes = "table-info";
          self.list_item_stock_suggestion.forEach((item, i) => {
            if (item.id == response.data.id) {
              self.list_item_stock_suggestion.splice(i, 1);
            }
          });
          self.list_item_stock_suggestion.unshift(response.data);
          self.$toast.success("Đã đóng khuyến nghị thành công");
          self.isShowCloseSuggestionModal = false;
        })
        .catch(function (error) {
          console.error(error);
          self.isShowCloseSuggestionModal = false;
          self.$toast.error("Có lỗi xảy ra, vui lòng thử lại");
        });
    },

    showModalEditClosed(item) {
      let self = this;
      self.isShowEditModal = true;
      self.list_data_model_edit.id = item.id;
      self.list_data_model_edit.mack = item.mack;
      self.list_data_model_edit.gia_khuyen_nghi = item.gia_khuyen_nghi;
      self.list_data_model_edit.gia_muc_tieu = item.gia_muc_tieu;
      self.list_data_model_edit.gia_cat_lo = item.gia_cat_lo;
      self.list_data_model_edit.gia_dong_khuyen_nghi =
        item.gia_dong_khuyen_nghi;
      self.list_data_model_edit.type_edit = "closed";
      self.list_data_model_edit.ngay_khuyen_nghi = new Date(
        Date.parse(item.ngay_khuyen_nghi.substr(0, 10))
      )
        .toISOString()
        .substr(0, 10);
      self.list_data_model_edit.ngay_dong_khuyen_nghi = new Date(
        Date.parse(item.ngay_dong_khuyen_nghi.substr(0, 10))
      )
        .toISOString()
        .substr(0, 10);
    },

    saveEditTradingClosed() {
      let self = this;
      self.is_valid_form_edit.mack = !(
        self.list_data_model_edit.mack == "" || !self.list_data_model_edit.mack
      );
      self.is_valid_form_edit.gia_khuyen_nghi = !(
        self.list_data_model_edit.gia_khuyen_nghi == "" ||
        !self.list_data_model_edit.gia_khuyen_nghi
      );
      self.is_valid_form_edit.gia_muc_tieu = !(
        self.list_data_model_edit.gia_muc_tieu == "" ||
        !self.list_data_model_edit.gia_muc_tieu
      );
      self.is_valid_form_edit.gia_cat_lo = !(
        self.list_data_model_edit.gia_cat_lo == "" ||
        !self.list_data_model_edit.gia_cat_lo
      );
      self.is_valid_form_edit.gia_dong_khuyen_nghi = !(
        self.list_data_model_edit.gia_dong_khuyen_nghi == "" ||
        !self.list_data_model_edit.gia_dong_khuyen_nghi
      );
      let check_valid = true;
      Object.keys(self.list_data_model_edit).forEach(function (key) {
        if (!self.list_data_model_edit[key]) check_valid = false;
      });
      const ngay_khuyen_nghi = new Date(
        Date.parse(self.list_data_model_edit.ngay_khuyen_nghi)
      );
      const ngay_dong_khuyen_nghi = new Date(
        Date.parse(self.list_data_model_edit.ngay_dong_khuyen_nghi)
      );
      if (ngay_dong_khuyen_nghi <= ngay_khuyen_nghi) {
        self.$toast.error(
          "Ngày đóng khuyến nghị phải bé hơn ngày khuyến nghị!"
        );
        return;
      }
      if (
        !this.$store.state.data_eod.hasOwnProperty(
          self.list_data_model_edit.mack.toUpperCase()
        )
      ) {
        self.$toast.error("Mã CK không hợp lệ!");
        return;
      }
      if (!check_valid) {
        self.$toast.error("Một số nội dung vừa nhập không hợp lệ!");
        return;
      }
      axios
        .put(this.$apiAdress + "/api/stocks/stock_suggestion/update", {
          id: self.list_data_model_edit.id,
          mack: self.list_data_model_edit.mack.toUpperCase(),
          gia_khuyen_nghi: self.list_data_model_edit.gia_khuyen_nghi,
          ngay_khuyen_nghi: self.list_data_model_edit.ngay_khuyen_nghi,
          gia_muc_tieu: self.list_data_model_edit.gia_muc_tieu,
          gia_cat_lo: self.list_data_model_edit.gia_cat_lo,
          ngay_dong_khuyen_nghi:
            self.list_data_model_edit.ngay_dong_khuyen_nghi,
          gia_dong_khuyen_nghi: self.list_data_model_edit.gia_dong_khuyen_nghi,
          token: localStorage.getItem("api_token"),
        })
        .then(function (response) {
          response.data._classes = "table-info";
          self.list_item_stock_suggestion.forEach((item, i) => {
            if (item.id == response.data.id) {
              self.list_item_stock_suggestion.splice(i, 1);
            }
          });
          self.list_item_stock_suggestion.unshift(response.data);
          self.$toast.success("Đã cập nhật dữ liệu thành công");
          self.isShowEditModal = false;
        })
        .catch(function (error) {
          console.error(error);
          self.isShowEditModal = false;
          self.$toast.error("Có lỗi xảy ra, vui lòng thử lại");
        });
    },

    showModalEditNotClosed(item) {
      let self = this;
      self.isShowEditModal = true;
      self.list_data_model_edit.id = item.id;
      self.list_data_model_edit.mack = item.mack;
      self.list_data_model_edit.gia_khuyen_nghi = item.gia_khuyen_nghi;
      self.list_data_model_edit.gia_dong_khuyen_nghi = 1;
      self.list_data_model_edit.gia_muc_tieu = item.gia_muc_tieu;
      self.list_data_model_edit.gia_cat_lo = item.gia_cat_lo;
      self.list_data_model_edit.type_edit = "not_closed";
      self.list_data_model_edit.ngay_khuyen_nghi = new Date(
        Date.parse(item.ngay_khuyen_nghi.substr(0, 10))
      )
        .toISOString()
        .substr(0, 10);
    },

    saveEditTradingNotClosed() {
      let self = this;
      self.is_valid_form_edit.mack = !(
        self.list_data_model_edit.mack == "" || !self.list_data_model_edit.mack
      );
      self.is_valid_form_edit.gia_khuyen_nghi = !(
        self.list_data_model_edit.gia_khuyen_nghi == "" ||
        !self.list_data_model_edit.gia_khuyen_nghi
      );
      self.is_valid_form_edit.gia_muc_tieu = !(
        self.list_data_model_edit.gia_muc_tieu == "" ||
        !self.list_data_model_edit.gia_muc_tieu
      );
      self.is_valid_form_edit.gia_cat_lo = !(
        self.list_data_model_edit.gia_cat_lo == "" ||
        !self.list_data_model_edit.gia_cat_lo
      );
      let check_valid = true;
      Object.keys(self.list_data_model_edit).forEach(function (key) {
        if (!self.list_data_model_edit[key]) check_valid = false;
      });
      if (
        !this.$store.state.data_eod.hasOwnProperty(
          self.list_data_model_edit.mack.toUpperCase()
        )
      ) {
        self.$toast.error("Mã CK không hợp lệ!");
        return;
      }
      if (!check_valid) {
        self.$toast.error("Một số nội dung vừa nhập không hợp lệ!");
        return;
      }
      axios
        .put(this.$apiAdress + "/api/stocks/stock_suggestion/update", {
          id: self.list_data_model_edit.id,
          mack: self.list_data_model_edit.mack.toUpperCase(),
          gia_khuyen_nghi: self.list_data_model_edit.gia_khuyen_nghi,
          ngay_khuyen_nghi: self.list_data_model_edit.ngay_khuyen_nghi,
          gia_muc_tieu: self.list_data_model_edit.gia_muc_tieu,
          gia_cat_lo: self.list_data_model_edit.gia_cat_lo,
          token: localStorage.getItem("api_token"),
        })
        .then(function (response) {
          response.data._classes = "table-info";
          self.list_item_stock_suggestion.forEach((item, i) => {
            if (item.id == response.data.id) {
              self.list_item_stock_suggestion.splice(i, 1);
            }
          });
          self.list_item_stock_suggestion.unshift(response.data);
          self.$toast.success("Đã cập nhật dữ liệu thành công");
          self.isShowEditModal = false;
        })
        .catch(function (error) {
          console.error(error);
          self.isShowEditModal = false;
          self.$toast.error("Có lỗi xảy ra, vui lòng thử lại");
        });
    },

    handleSaveEditButton() {
      if (this.list_data_model_edit.type_edit == "closed") {
        this.saveEditTradingClosed();
      } else {
        this.saveEditTradingNotClosed();
      }
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
            "/api/stocks/stock_suggestion/" +
            self.idItemTradingLogDelete,
          {
            params: {
              token: localStorage.getItem("api_token"),
            },
          }
        )
        .then(function (response) {
          self.list_item_stock_suggestion.forEach((item, i) => {
            if (item.id == self.idItemTradingLogDelete) {
              self.list_item_stock_suggestion.splice(i, 1);
            }
          });
          self.$toast.success("Xóa dữ liệu thành công");
          self.isShowDeleteModal = false;
        })
        .catch(function (error) {
          console.error(error);
          self.isShowDeleteModal = false;
          self.$toast.error("Có lỗi xảy ra, vui lòng thử lại");
        });
    },

    getAllItem() {
      let self = this;
      self.is_loading_table = true;
      axios
        .get(this.$apiAdress + "/api/stocks/stock_suggestion/get-all", {
          params: {
            token: localStorage.getItem("api_token"),
          },
        })
        .then(function (response) {
          self.list_item_stock_suggestion = response.data;
          self.is_loading_table = false;
        })
        .catch(function (error) {
          self.is_loading_table = false;
          console.error(error);
        });
    },
  },
  computed: {
    openSuggestion() {
      return (
        this.list_data_model_add.mack !== "" &&
        this.suggestions.length != 0 &&
        this.open === true
      );
    },
    list_field_stock_suggestion_closed() {
      let return_data = [
        {
          key: "mack",
          label: "Mã CK",
          sorter: true,
          filter: true,
          _style: "text-align: center",
        },
        {
          key: "nganh",
          label: "Ngành",
          sorter: true,
          filter: true,
          _style: "width:15%; text-align: center",
        },
        {
          key: "gia_khuyen_nghi",
          label: "Giá khuyến nghị",
          sorter: true,
          filter: true,
          _style: "text-align: center",
        },
        {
          key: "ngay_khuyen_nghi",
          label: "Ngày khuyến nghị",
          sorter: true,
          filter: true,
          _style: "text-align: center",
        },
        {
          key: "gia_muc_tieu",
          label: "Giá mục tiêu",
          sorter: true,
          filter: true,
          _style: "text-align: center",
        },
        {
          key: "gia_cat_lo",
          label: "Giá cắt lỗ",
          sorter: true,
          filter: true,
          _style: "text-align: center",
        },
        {
          key: "gia_co_phieu_hien_tai",
          label: "Giá cổ phiếu hiện tại",
          sorter: true,
          filter: true,
          _style: "width:15%; text-align: center",
        },
        {
          key: "muc_do_loi_lo_hien_tai",
          label: "Mức độ lời/lỗ hiện tại",
          sorter: true,
          filter: true,
          _style: "text-align: center",
        },
        {
          key: "ngay_dong_khuyen_nghi",
          label: "Ngày đóng khuyến nghị",
          sorter: true,
          filter: true,
          _style: "text-align: center",
        },
        {
          key: "gia_dong_khuyen_nghi",
          label: "Giá đóng khuyến nghị",
          sorter: true,
          filter: true,
          _style: "text-align: center",
        },
        {
          key: "muc_do_lai_lo_cua_deal",
          label: "Mức độ lời/lỗ của Deal",
          sorter: true,
          filter: true,
          _style: "text-align: center",
        },
      ];
      if (this.isAdmin)
        return_data.push({
          key: "id",
          label: "",
          _style: "width:10%",
          sorter: false,
          filter: false,
        });
      return return_data;
    },
    list_field_stock_suggestion_not_closed() {
      let return_data = [
        {
          key: "mack",
          label: "Mã CK",
          sorter: true,
          filter: true,
          _style: "text-align: center",
        },
        {
          key: "nganh",
          label: "Ngành",
          sorter: true,
          filter: true,
          _style: "text-align: center",
        },
        {
          key: "gia_khuyen_nghi",
          label: "Giá khuyến nghị",
          sorter: true,
          filter: true,
          _style: "text-align: center",
        },
        {
          key: "ngay_khuyen_nghi",
          label: "Ngày khuyến nghị",
          sorter: true,
          filter: true,
          _style: "text-align: center",
        },
        {
          key: "gia_muc_tieu",
          label: "Giá mục tiêu",
          sorter: true,
          filter: true,
          _style: "text-align: center",
        },
        {
          key: "gia_cat_lo",
          label: "Giá cắt lỗ",
          sorter: true,
          filter: true,
          _style: "text-align: center",
        },
        {
          key: "gia_co_phieu_hien_tai",
          label: "Giá cổ phiếu hiện tại",
          sorter: true,
          filter: true,
          _style: "text-align: center",
        },
        {
          key: "muc_do_loi_lo_hien_tai",
          label: "Mức độ lời/lỗ hiện tại",
          sorter: true,
          filter: true,
          _style: "text-align: center",
        },
      ];
      if (this.isAdmin)
        return_data.push({
          key: "id",
          label: "",
          _style: "width:15%",
          sorter: false,
          filter: false,
        });
      return return_data;
    },
    itemStockSuggestionClosed() {
      let return_data = [];
      if (
        this.list_item_stock_suggestion.length > 0 &&
        this.$store.state.list_mack.length > 0 &&
        Object.keys(this.$store.state.data_eod).length > 0 &&
        Object.keys(this.$store.state.list_mack_company).length > 0
      ) {
        return_data = this.list_item_stock_suggestion
          .filter((item) => {
            return item.ngay_dong_khuyen_nghi && item.gia_dong_khuyen_nghi;
          })
          .map((item) => {
            return {
              ...item,
              nganh: this.$store.state.list_mack_company.hasOwnProperty(
                item.mack
              )
                ? this.$store.state.list_mack_company[item.mack].nganh
                : "",
              ten_cong_ty: this.$store.state.list_mack_company.hasOwnProperty(
                item.mack
              )
                ? this.$store.state.list_mack_company[item.mack].ten_cong_ty
                : "",
              gia_co_phieu_hien_tai: this.$store.state.data_eod.hasOwnProperty(
                item.mack
              )
                ? this.$store.state.data_eod[item.mack].lastprice / 1000
                : 0,
              change: this.$store.state.data_eod.hasOwnProperty(item.mack)
                ? this.$store.state.data_eod[item.mack].change
                : 0,
              perchange: this.$store.state.data_eod.hasOwnProperty(item.mack)
                ? this.$store.state.data_eod[item.mack].perchange
                : 0,
              cl: this.$store.state.data_eod.hasOwnProperty(item.mack)
                ? this.$store.state.data_eod[item.mack].cl
                : "",
              muc_do_loi_lo_hien_tai:
                (this.$store.state.data_eod.hasOwnProperty(item.mack)
                  ? parseFloat(
                      this.$store.state.data_eod[item.mack].lastprice / 1000
                    )
                  : 0) /
                  parseFloat(item.gia_khuyen_nghi) -
                1,
              muc_do_lai_lo_cua_deal:
                parseFloat(item.gia_dong_khuyen_nghi) /
                  parseFloat(item.gia_khuyen_nghi) -
                1,
            };
          });
      }
      return return_data;
    },
    itemStockSuggestionNotClosed() {
      let return_data = [];
      if (
        this.list_item_stock_suggestion.length > 0 &&
        this.$store.state.list_mack.length > 0 &&
        Object.keys(this.$store.state.data_eod).length > 0 &&
        Object.keys(this.$store.state.list_mack_company).length > 0
      ) {
        return_data = this.list_item_stock_suggestion
          .filter((item) => {
            return (
              item.ngay_dong_khuyen_nghi == null ||
              item.gia_dong_khuyen_nghi == null
            );
          })
          .map((item) => {
            return {
              ...item,
              nganh: this.$store.state.list_mack_company.hasOwnProperty(
                item.mack
              )
                ? this.$store.state.list_mack_company[item.mack].nganh
                : "",
              ten_cong_ty: this.$store.state.list_mack_company.hasOwnProperty(
                item.mack
              )
                ? this.$store.state.list_mack_company[item.mack].ten_cong_ty
                : "",
              gia_co_phieu_hien_tai: this.$store.state.data_eod.hasOwnProperty(
                item.mack
              )
                ? this.$store.state.data_eod[item.mack].lastprice / 1000
                : 0,
              change: this.$store.state.data_eod.hasOwnProperty(item.mack)
                ? this.$store.state.data_eod[item.mack].change
                : 0,
              perchange: this.$store.state.data_eod.hasOwnProperty(item.mack)
                ? this.$store.state.data_eod[item.mack].perchange
                : 0,
              cl: this.$store.state.data_eod.hasOwnProperty(item.mack)
                ? this.$store.state.data_eod[item.mack].cl
                : "",
              muc_do_loi_lo_hien_tai:
                (this.$store.state.data_eod.hasOwnProperty(item.mack)
                  ? parseFloat(
                      this.$store.state.data_eod[item.mack].lastprice / 1000
                    )
                  : 0) /
                  parseFloat(item.gia_khuyen_nghi) -
                1,
              muc_do_lai_lo_cua_deal:
                parseFloat(item.gia_dong_khuyen_nghi) /
                  parseFloat(item.gia_khuyen_nghi) -
                1,
            };
          });
      }
      return return_data;
    },
    list_mack_unique_of_data_stock_suggestion_not_closed() {
      let return_data = [];
      if (this.list_item_stock_suggestion.length > 0) {
        for (const item of this.list_item_stock_suggestion) {
          if (
            !return_data.includes(item.mack) &&
            item.gia_dong_khuyen_nghi == null
          ) {
            return_data.push(item.mack);
          }
        }
      }
      return return_data;
    },
    list_mack_unique_of_data_stock_suggestion() {
      let return_data = [];
      if (this.list_item_stock_suggestion.length > 0) {
        for (const item of this.list_item_stock_suggestion) {
          if (!return_data.includes(item.mack)) {
            return_data.push(item.mack);
          }
        }
      }
      return return_data;
    },
  },
  watch: {
    list_mack_unique_of_data_stock_suggestion: {
      handler(newVal, oldVal) {
        if (oldVal.length > 0) {
          window.socket_send.emit("leave", oldVal);
        }
        window.socket_send.emit("getlive", newVal, (res) => {
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
            this.$store.state.data_eod[stockcode] = item;
          }
        });
        window.socket_send.emit("join", newVal);
      },
    },
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
.c-dark-theme {
  .table-success {
    td {
      color: #fff !important;
    }
  }
  .table-info {
    td {
      color: #fff !important;
    }
  }
  tbody {
    tr {
      &:hover {
        td {
          &:first-child {
            background-color: #8c58b3 !important;
          }
          background-color: #8c58b3 !important;
          a {
            color: #fff;
          }
        }
      }
    }
  }
}
.margin-top-1-7rem {
  margin-top: 1.7rem;
}
.footer-alert {
  text-align: justify;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
