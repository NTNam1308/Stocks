<template>
  <div>
    <CTabs>
      <CTab title="Danh sách" class="mt-1">
        <CCard class="mb-1">
          <CCardHeader>
            <CRow>
              <CCol sm="2" class="pl-2 pr-0">
                <div

                  style="position: relative"
                  v-bind:class="{ show: openSuggestion }"
                >
                  <CInput
                    v-model="list_data_model_add.mack"
                    placeholder="Mã CK"
                    @keyup.enter="addNewWatchlist()"
                    @keydown.down="down"
                    @keydown.up="up"
                    @input="change"
                    :addInputClasses="{
                      'is-invalid': !is_valid_form_add.mack || mack_trade,
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
                <CSelect
                  :options="option_filter_category"
                  :value.sync="list_data_model_add.current_my_watchlist_id"
                >
                </CSelect>
              </CCol>
              <CCol sm="1">
                <CButton
                  color="success"
                  class="btn-add-wl"
                  @click="addNewWatchlist()"
                  ><CIcon name="cibAddthis" /> Thêm</CButton
                >
              </CCol>
              <CCol sm="7">
              </CCol>

            </CRow>
          </CCardHeader>
        </CCard>
        <CCard class="mb-1">
          <CCardHeader>
            <div class="d-flex justify-content-between">
              <p class="text-left h5">Danh sách các mã trong Watchlist</p>
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
              :noItemsView="{
                noResults: 'Không có dữ liệu',
                noItems: 'Không có dữ liệu',
              }"
              :items="itemStockSuggestionNotClosed"
              :fields="list_field_stock_suggestion_not_closed"
              hover
              sorter
              striped
              bordered
              class="cursor-pointer datatable-trading-log "
            >
              <template #mack="{ item }">
                <td
                  @click="showModalTradingChart(item.mack)"
                  class="text-center"
                >
                  <CLink
                    data-toggle="tooltip"
                    data-placement="bottom"
                    :title="item.ten_cong_ty"
                    ><b>{{ item.mack }}</b></CLink
                  >
                </td>
              </template>
              <template #nganh="{ item }">
                <td class="text-center">
                  {{ item.nganh }}
                </td>
              </template>
              <template #gia_co_phieu_hien_tai="{ item }">
                <td class="text-center" style="white-space: nowrap">
                  <transition
                    :name="$function_global.getAnimationNameFromCL(item.cl)"
                    mode="out-in"
                  >
                    <span :key="item.change">
                      {{ formatMoney(item.gia_co_phieu_hien_tai, 0, 2) }}
                      <CIcon
                        v-if="item.perchange != 0"
                        :name="
                          item.perchange > 0
                            ? 'cil-caret-top'
                            : 'cil-caret-bottom'
                        "
                        class="mb-1"
                        :class="$function_global.getClassTextColorFromCL(item.cl)"
                      />
                      <span
                        class="display-inline-flex"
                        v-html="
                          $function_global.getSpanColorByPerchange(item.change, item.perchange, item.cl)
                        "
                      />
                    </span>
                  </transition>
                </td>
              </template>
              <template #diem_canslim="{ item }">
                <td class="text-center">
                  {{ item.diem_canslim }}
                </td>
              </template>
              <template #diem_4m="{ item }">
                <td class="text-center">
                  {{ item.diem_4m }}
                </td>
              </template>
              <template #avg50="{ item }">
                <td class="text-center">
                  {{
                    parseFloat(item.avg50).toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })
                  }}
                </td>
              </template>
              <template #capital="{ item }" >
                <td class="text-center">
                  {{
                    parseFloat(item.capital).toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })
                  }}
                </td>
              </template>
              <template #eod_week="{ item }" >
                <td class="text-center text-success" :class="{ 'text-danger': item.eod_week < 0 }">
                  {{
                    
                    parseFloat(item.eod_week).toLocaleString("en", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) + " %"
                  }}
                </td>
              </template>
              <template #eod_month="{ item }" >
                <td class="text-center text-success" :class="{ 'text-danger': item.eod_month < 0 }">
                  {{
                    
                    parseFloat(item.eod_month).toLocaleString("en", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) + " %"
                  }}
                </td>
   
              </template>
              <template #note="{ item }" style="">
                <td class="text-center " style="position: relative !important;  " >
                  <button class="btn btn-info"
                    @click="demo(item)"
                  >
                  <span>Xem</span>
                  </button>
                  <div :style="{height:  300 + 'px'}" ></div>
                  <div class=" d-flex " :class="{'justify-content-between': is_show_note || is_edit_note,' justify-content-end': is_show_note == false }"  style="margin-left: 32px;
                      margin-top: 0px; position: absolute !important; left: -90vw !important; top: 37px; width: 97vw; height: auto ; borde-color: rgba(255, 255, 255, 0.075); ">
                     <CCollapse :show="Boolean(is_show_note)" v-if="is_show_note" class="" style="width: 88vw;">
                      <label class="font-weight-bold" style="position:absolute; left:34px" for="">Ghi chú</label>
                     <p style=" padding: 2rem !important; text-align:start" class="border rounded">
                    {{test_data}}
                    </p>
                    </CCollapse>
                    <!-- /. text -->
                    <CCollapse :show="Boolean(is_edit_note)" v-if="is_edit_note" style="width: 88vw;" >
                      <label class="font-weight-bold" style="position:absolute; left:34px" for="">Ghi chú</label>
                      <CTextarea rows="5" columns="1000" v-model="test_data" style="white-space: pre;padding: 2rem !important; " class="border rounded p-3 ">
                      </CTextarea> 
                    </CCollapse>
                    <!-- /. text edit -->

                    <!-- <div>

                      <button class="btn btn-info"  @click="demo()">save</button>
                      <button  class="btn btn-danger"  >close</button>
                    </div> -->
                    <div style="margin-right:34px">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="27"
                          height="27"
                          fill="currentColor"
                          class="bi bi-pencil-square"
                          viewBox="0 0 16 16"
                          @click="toggleEdit()"
                          v-if="is_show_note"
                        >
                          <path
                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                          />
                          <path
                            fill-rule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                          />
                        </svg>
                        <CButton
                          class="btn btn-success"
                          style="padding:8px"
                          @click="handlerMackNote()"
                           v-if="is_edit_note"
                        >
                          Lưu
                        </CButton>
                        <CButton
                          class="btn btn-danger"
                          style="padding:7px ;margin-start:25px"
                          @click ="closeNote()"
                           v-if="is_edit_note"
                        >
                          Hủy
                        </CButton>
                    </div>
                  </div>
                </td>
              </template>
              
              <template #id="{ item }">
                <td class="text-center"  >
                  <button class="btn btn-danger"
                    @click="showModalDelete(item)"
                  >
                  <span>Xóa</span>
                  </button>
                </td>
              </template>
            </CDataTable>
          </CCardHeader>
        </CCard>
        <NewsRelated :mack="list_mack_unique_of_data_stock_suggestion" />
        <CRow>
          <CCol class="footer-alert">
            Tuyên bố trách nhiệm/Disclaimer: Các thông tin, xếp hạng, chấm điểm,
            danh mục KungFuStocksPro trong KungFuStocksPro được đưa ra dựa trên
            cơ sở phân tích chi tiết và cẩn thận, theo đánh giá chủ quan của
            chúng tôi, là hợp lý trong thời điểm đưa ra, nhằm phục vụ mục đích
            giáo dục, hỗ trợ cho các độc giả, nhà đầu tư đọc sách của Happy
            Live. Các thông tin, xếp hạng, chấm điểm, danh mục KungFuStocksPro
            này không nên được diễn giải như một lời kêu gọi, đề nghị mua hay
            bán bất cứ một cổ phiếu nào. KungFuStocksPro sẽ không chịu trách
            nhiệm đối với tất cả hay bất kỳ thiệt hại nào hay sự kiện bị coi là
            thiệt hại đối với việc sử dụng toàn bộ hay bất kỳ thông tin, xếp
            hạng, chấm điểm, danh mục nào của KungFuStocksPro.
          </CCol>
        </CRow>
      </CTab>
      <CTab title="Quản lý Watchlist" class="mt-1">
        <ManageWatchlist
          @updateListMyWatchlist="handleIntervalListMyWatchlistUpdated"
        />
      </CTab>
    </CTabs>

    <CModal title="Xóa dữ liệu" :show.sync="isShowDeleteModal" size="sm">
      <template #footer>
        <CButton color="secondary" @click="isShowDeleteModal = false"
          >Đóng</CButton
        >
        <CButton
          color="danger"
          @click="saveDeleteTrading"
          @keyup.enter="saveDeleteTrading"
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
import NewsRelated from "@/views/pages/NewsRelated";
import ManageWatchlist from "@/views/ManageWatchlist.vue";

export default {
  name: "Watchlist",
  components: {
    NewsRelated,
    ManageWatchlist,
  },
  data() {
    return {
      is_loading_4mcanslim: true,
      is_loading_data: true,
      value_change: "",
      is_interval: true,
      isAdmin: false,
      temp_volume_update: 0,
      volume_mask: "0",
      open: false,
      items_canslim_fourm: [],
      activeCompany: false,
      nameCompany: "",
      current: 0,
      timer: 0,
      suggestions: [],
      list_data_model_add: {
        current_my_watchlist_id: null,
        mack: "",
      },
      option_filter_category: [],
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
        user_id: true,
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
      isShowDeleteModal1: false,
      isShowCloseSuggestionModal: false,
      idItemTradingLogDelete: -1,
      list_item_canslim_fourm: [],
      list_item_stock_scanslim_fourm: [],
      gia_dong_khuyen_nghi: {
        value: 0,
        id: -1,
        is_valid: true,
      },
      data_eod_avg: {},
      data_count_stock: {},
      checkFirstLoad: true,
      
      data_eod_today: {},
      data_eod_by_week: {},
      data_eod_by_month: {},
      mack_trade: false,
      is_show_note: false,
      is_edit_note: false,
      test_data: `Tuyên bố trách nhiệm/Disclaimer: Các thông tin, xếp hạng, chấm điểm,danh mục KungFuStocksPro trong KungFuStocksPro được đưa ra dựa trênTuyên bố trách nhiệm/Disclaimer: Các thông tin, xếp hạng, chấm điểm,danh mục KungFuStocksPro trong KungFuStocksPro được đưa ra dựa trêncơ sở phân tích chi tiết và cẩn thận, theo đánh giá chủ quan củathiệt hại đối với việc sử dụng toàn bộ hay bất kỳ thông tin, xếphạng, chấm điểm, danh mục nào của KungFuStocksPro.
   .`
    };
  },
  created() {
    this.getAllEOD();
    var test1 = Number(255).toString(2);
    var test2 = Number(test1);
    console.log(test2);
    this.info_update();
    this.getMackNote();
  },
  mounted: function () {
    this.checkFirstLoad = true;
  },
  beforeDestroy() {
    this.is_interval = false;
    window.socket_send.emit(
      "leave",
      this.list_mack_unique_of_data_stock_suggestion
    );
  },
  methods: {
    demo (item) {
      console.log(item);
      let seft = this;
      seft.is_edit_note = false;
      seft.is_show_note = !seft.is_show_note;
      // seft.list_item_canslim_fourm.forEach((item, i) => {
      //     if (item.id == seft.id) {
      //       self.list_item_canslim_fourm.splice(i, 1);
      //     }
      //   });
    },
    toggleEdit() {
      this.is_show_note = false;
      this.is_edit_note = !this.is_edit_note;
    },
    getMackNote() {
      let self = this;
      self.mack_note.id = null;
      self.mack_note.mack = "";
      self.mack_note.note = "";
      self.mack_note.note_old = "";

      self.is_edit_note = false;
      self.is_show_note = false;
      // axios
      //   .get(this.$apiAdress + "/api/user-mack-note", {
      //     params: {
      //       mack: self.mack,
      //       token: localStorage.getItem("api_token"),
      //     },
      //   })
      //   .then((res) => {
      //     if (res.data.length != 0) {
      //       self.mack_note.id = res.data[0].id;
      //       self.mack_note.mack = res.data[0].mack;
      //       self.mack_note.note_old = res.data[0].note;
      //       self.mack_note.note = res.data[0].note;
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
    handlerMackNote() {
      if (this.mack_note.mack == "") {
        this.createMackNote();
      } else {
        this.updateMackNote();
      }
    },
    closeNote() {
      this.is_edit_note = false;
      this.is_show_note = true;
      this.mack_note.note = this.mack_note.note_old;
    },
    createMackNote() {
      axios
        .post(this.$apiAdress + "/api/user-mack-note", {
          mack: this.mack,
          note: this.mack_note.note,
          token: localStorage.getItem("api_token"),
        })
        .then((res) => {
          this.is_edit_note = false;
          this.is_show_note = true;
          this.mack_note.id = res.data.id;
          this.mack_note.mack = res.data.mack;
          this.mack_note.note_old = res.data.note;
          this.mack_note.note = res.data.note;
          this.$toast.success("Thêm ghi chú thành công");
        })
        .catch((err) => {
          this.$toast.error("Có lỗi xảy ra, vui lòng thử lại");
          console.log(err);
        });
    },
    updateMackNote() {
      axios
        .put(this.$apiAdress + "/api/user-mack-note/" + this.mack_note.id, {
          id: this.mack_note.id,
          note: this.mack_note.note,
          token: localStorage.getItem("api_token"),
        })
        .then((res) => {
          this.is_edit_note = false;
          this.is_show_note = true;
          this.mack_note.note = res.data.note;
          this.mack_note.note_old = res.data.note;
          this.$toast.success("Cập nhật ghi chú thành công");
        })
        .catch((err) => {
          this.$toast.error("Có lỗi xảy ra, vui lòng thử lại");
          console.log(err);
        });
    },
    getCanslimFourm() {
      if (this.checkFirstLoad == true) {
        this.is_loading_4mcanslim = true;
      } else {
        this.is_loading_4mcanslim = false;
      }
      var mackArr = [];
      mackArr.length = 0;
      for (var item of this.list_item_canslim_fourm) {
          mackArr.push(
          item.mack
        );
      }

      if(this.list_item_canslim_fourm.length == 0) {
        this.is_loading_4mcanslim = false;
        return;
      }
      axios
      .get(this.$apiAdress + "/api/stocks/canslim-fourm/by-mack", {
        params: {
          mack: mackArr,
          token: localStorage.getItem("api_token"),
        },
      })
      .then((res) => {
        this.items_canslim_fourm = res.data;

        var toDay = new Date().toLocaleDateString('en-CA');
        // eod by week
        window.socket_send.emit("gethistoryeod", mackArr, '7', toDay, (data_eod_week) => {
            if (!data_eod_week) return;
            let eod_week = {};
            for(let i = 0; i < data_eod_week.stockcode.length; i ++) {
                const stockcode_name = data_eod_week.stockcode[i];
                eod_week[stockcode_name] = {
                  eod_week: data_eod_week.eod[i],
                };
            }
            this.data_eod_by_week = eod_week;
        });
        // eod by month
        window.socket_send.emit("gethistoryeod", mackArr, '30', toDay, (data_eod_month) => {
            if (!data_eod_month) return;
            let eod_month = {};
            for(let i = 0; i < data_eod_month.stockcode.length; i ++) {
                const stockcode_name = data_eod_month.stockcode[i];
                eod_month[stockcode_name] = {
                  eod_month: data_eod_month.eod[i],
                };
            }
            this.data_eod_by_month = eod_month;
        });

        this.is_loading_4mcanslim = false;
        this.checkFirstLoad = false;
      })
      .catch((err) => {
        console.log(err);
        this.is_loading_4mcanslim = false;
      });
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
    getAllCountStock() {
      this.is_loading_count_stock = false;
      var mackArr = [];
      mackArr.length = 0;
      for (var item of this.list_item_canslim_fourm) {
          mackArr.push(
          item.mack
        );
      }
      if(this.list_item_canslim_fourm.length == 0) {
        this.is_loading_4mcanslim = false;
        return;
      }
      axios
        .get(this.$apiAdress + "/api/stocks/canslim-fourm/count-stock-by-mack", {
          params: {
            mack: mackArr,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          this.data_count_stock = res.data;
          this.is_loading_count_stock = false;
        })
        .catch((err) => {
          console.log(err);
          this.is_loading_count_stock = false;
        });
    },
    getAllEOD() {
      window.socket_send.emit("geteod", [], (res) => {
        if (!res) return;
        let temp_data = {};
        for (let i = 0; i < res.stockcode.length; i++) {
          const stockcode = res.stockcode[i];
          temp_data[stockcode] = {
            eod: res.eod[i],
            avgvol50: res.avgvol50[i],
          };
        }
        this.data_eod_avg = temp_data;
      });
    },
    handleIntervalListMyWatchlistUpdated(data, action) {
      let self = this;
      if (action == "all") {
        data.reverse();
         for (let item of data) {
            self.option_filter_category.push({
              value: item.id,
              label: item.name,
            });
          }
        self.list_data_model_add.current_my_watchlist_id =
        self.option_filter_category[0].value;
      }
      if (action == "create") {
        self.option_filter_category.unshift({
          value: data.id,
          label: data.name,
        });
        self.list_data_model_add.current_my_watchlist_id =
        self.option_filter_category[0].value;
      }
      if (action == "edit") {
        self.option_filter_category.forEach((item, index) => {
          if (item.value == data.id) {
            self.option_filter_category[index].label = data.name;
          }
        });
        self.list_data_model_add.current_my_watchlist_id =
        self.option_filter_category[0].value;
      }
      if (action == "delete") {
        self.option_filter_category.forEach((item, index) => {
          if (item.value == data) {
            self.option_filter_category.splice(index, 1);
          }
        });
        self.list_data_model_add.current_my_watchlist_id =
        self.option_filter_category[0].value;
      }
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
        this.list_data_model_add.mack = this.suggestions[this.current].mack;
        this.list_data_model_add.gia_khuyen_nghi = this.$store.state.data_eod.hasOwnProperty(
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

      let list_key = /[\s~`!@#$%\^&*()+=\-\[\]\\';,/{}|\\":<>\?]/;
      if(list_key.test(this.list_data_model_add.mack)) {
          this.mack_trade = true;
      } else {
        this.mack_trade = false;
      }
      this.suggestions = this.searchMack(this.list_data_model_add.mack);
    },

    suggestionClick(index) {
      this.list_data_model_add.mack = this.suggestions[index].mack;
      this.list_data_model_add.gia_khuyen_nghi = this.$store.state.data_eod.hasOwnProperty(
        this.list_data_model_add.mack
      )
        ? this.$store.state.data_eod[this.list_data_model_add.mack].lastprice /
          1000
        : 0;
      this.open = false;
    },

    addNewWatchlist() {
      let self = this;
      self.is_valid_form_add.mack = !(
        self.list_data_model_add.mack == "" || !self.list_data_model_add.mack
      );
      if (
        !this.$store.state.data_eod.hasOwnProperty(
          self.list_data_model_add.mack.toUpperCase()
        )
      ) {
        self.$toast.error("Mã CK không hợp lệ!");
        return;
      }
      axios
        .post(this.$apiAdress + "/api/watchlist", {
          mack: self.list_data_model_add.mack.toUpperCase(),
          my_watchlist_id: self.list_data_model_add.current_my_watchlist_id,
          token: localStorage.getItem("api_token"),
        })
        .then(function(response) {
          response.data._classes = "table-success";
          self.list_item_canslim_fourm.push(response.data);
          self.$toast.success("Thêm vào watchlist thành công");
          self.list_data_model_add.mack = "";
        })
        .catch(function(error) {
          console.error(error);
          self.$toast.error(
            "Mã chứng khoán đã có trong Wacthlist, vui lòng thử lại"
          );
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
          this.$apiAdress + "/api/watchlist/" + self.idItemTradingLogDelete,
          {
            params: {
              token: localStorage.getItem("api_token"),
            },
          }
        )
        .then(function(response) {
          self.list_item_canslim_fourm.forEach((item, i) => {
            if (item.id == self.idItemTradingLogDelete) {
              self.list_item_canslim_fourm.splice(i, 1);
            }
          });
          self.$toast.success("Xóa dữ liệu thành công");
          self.isShowDeleteModal = false;
        })
        .catch(function(error) {
          console.error(error);
          self.isShowDeleteModal = false;
          self.$toast.error("Có lỗi xảy ra, vui lòng thử lại");
        });
    },
    getAllItem() {
      let self = this;
      this.is_loading_data = true;
      axios
        .get(
          this.$apiAdress +
            "/api/mack-by-my-watchlist/" +
            self.list_data_model_add.current_my_watchlist_id,
          {
            params: {
              token: localStorage.getItem("api_token"),
              user_id: localStorage.getItem("user_id"),
            },
          }
        )
        .then(function(response) {
          self.list_item_canslim_fourm = response.data;
          self.is_loading_data = false;
        })
        .catch(function(error) {
          console.error(error);
          self.is_loading_data = false;
        });
    },
    getAllItemDelete() {
      let self = this;
      self.is_loading_data = true;
      axios
        .get(this.$apiAdress + "/api/watchlist/get-all-delete", {
          params: {
            token: localStorage.getItem("api_token"),
            user_id: localStorage.getItem("user_id"),
          },
        })
        .then(function(response) {
          self.list_item_stock_scanslim_fourm = response.data;
          self.is_loading_data = false;
        })
        .catch(function(error) {
          console.error(error);
          self.is_loading_data = false;
        });
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
    is_loading_table() {
      if (!this.is_loading_4mcanslim && !this.is_loading_data) return false;
      return true;
    },
    openSuggestion() {
      return (
        this.list_data_model_add.mack !== "" &&
        this.suggestions.length != 0 &&
        this.open === true
      );
    },

    list_field_stock_suggestion_not_closed() {
      let return_data = [
        {
          key: "mack",
          label: "Mã CK",
          sorter: true,
          filter: true,
          _style: "width:10%; text-align: center",
        },
        {
          key: "nganh",
          label: "Ngành",
          sorter: true,
          filter: true,
          _style: "width:10%; text-align: center",
        },
        {
          key: "gia_co_phieu_hien_tai",
          label: "Giá cổ phiếu hiện tại",
          sorter: true,
          filter: true,
          _style: "width:20%; text-align: center",
        },
        {
          key: "diem_canslim",
          label: "Điểm Canslim",
          _style: "width:10%; text-align: center",
          type: Number,
        },
        {
          key: "diem_4m",
          label: "Điểm 4M",
          _style: "width:10%; text-align: center",
          type: Number,
        },
        {
          key: "avg50",
          label: "Khối lượng TB 50 phiên",
          _style: "width:10%; text-align: center",
          type: Number,
        },
        {
          key: "capital",
          label: "Vốn hóa (tỷ đồng)",
          _style: "width:7%; text-align: center;",
          type: Number,
        },
        {
          key: "eod_week",
          label: "Biến động giá (Tuần)",
          _style: "width:10%; text-align: center;",
          type: Number,
        },
        {
          key: "eod_month",
          label: "Biến động giá (Tháng)",
          _style: "width:10%; text-align: center;",
          type: Number,
        },
        {
          key: "note",
          label: "Ghi chú",
          _style: "width:10%; text-align: center;",
          type: String,
        },

      ];
      return_data.push({
        key: "id",
        label: "",
        _style: "text-align: center",
        sorter: false,
        filter: false,
      });
      return return_data;
    },

    itemStockSuggestionNotClosed() {
      let return_data = [];
      if (
        this.items_canslim_fourm.length > 0 &&
        this.list_item_canslim_fourm.length > 0 &&
        Object.keys(this.$store.state.list_mack_company).length > 0 &&
        Object.keys(this.$store.state.data_eod).length > 0
      ) {
        let temp_list_canslim = {};
        this.items_canslim_fourm.map((item) => {
          temp_list_canslim[item.mack] = item;
          return item;
        });
        return_data = this.list_item_canslim_fourm.map((item) => {
          return {
            ...item,
            nganh: this.$store.state.list_mack_company.hasOwnProperty(item.mack)
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
              : 0,
            avg50: temp_list_canslim.hasOwnProperty(item.mack)
              ? parseFloat(temp_list_canslim[item.mack].avg50)
              : 0,
            diem_4m: temp_list_canslim.hasOwnProperty(item.mack)
              ? parseFloat(temp_list_canslim[item.mack].diem_4m)
              : 0,
            diem_canslim: temp_list_canslim.hasOwnProperty(item.mack)
              ? parseFloat(temp_list_canslim[item.mack].diem_canslim)
              : 0,
            capital:
              this.data_eod_avg.hasOwnProperty(item.mack) &&
              this.data_count_stock.hasOwnProperty(item.mack)
                ? (parseFloat(this.data_eod_avg[item.mack].eod) *
                    parseFloat(this.data_count_stock[item.mack])) /
                  1000000000
                : 0,
            eod_week: this.data_eod_by_week.hasOwnProperty(item.mack)
              ? parseFloat(this.$store.state.data_eod[item.mack].lastprice / this.data_eod_by_week[item.mack].eod_week -1)
              * 100
              : 0,
            eod_month: this.data_eod_by_month.hasOwnProperty(item.mack)
              ? parseFloat(this.$store.state.data_eod[item.mack].lastprice / this.data_eod_by_month[item.mack].eod_month -1)
              * 100
              : 0, 
            is_show_note: false
          };
          
        });
        for (let index = 0; index < return_data.length; index++) {
          return_data[index].diem_canslim = parseFloat(
            return_data[index].diem_canslim.toFixed(2)
          );
          if (return_data[index].diem_canslim < 0)
            return_data[index].diem_canslim = 0;
          return_data[index].diem_4m = parseFloat(
            return_data[index].diem_4m.toFixed(2)
          );
          if (return_data[index].diem_4m < 0) return_data[index].diem_4m = 0;
          // return_data[index].san =
          //   parseFloat(this.$store.state.data_eod[return_data[index].mack].totalvol);
        }
      }
      
      return return_data;
    },
    list_mack_unique_of_data_stock_suggestion() {
      let return_data = [];
      if (this.list_item_canslim_fourm.length > 0) {
        for (const item of this.list_item_canslim_fourm) {
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
          if (!res.hasOwnProperty("stockcode")) {
            return;
          }
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
    "list_data_model_add.current_my_watchlist_id": function() {
      this.getAllItem();
    },
    list_item_canslim_fourm: function() {
      this.open = false; 
      this.getCanslimFourm();
      this.getAllCountStock();
    }, 
  },
};
</script>
<style lang="scss" scoped>
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
