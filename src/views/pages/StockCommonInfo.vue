<template>
  <CRow class="mt-3">
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
    <CCol sm="6" v-if="!is_loading">
      <CCard>
        <CCardBody>
          <p class="text-center text-uppercase h5 title-block">
            <b>Thông tin doanh nghiệp </b>
            <span class="float-right">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-card-checklist"
                viewBox="0 0 16 16"
                @click="toggleDetails()"
                v-if="!is_edit_note"
              >
                <path
                  d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"
                />
                <path
                  d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"
                />
              </svg>
              <CButton
                color="success"
                size="sm"
                @click="handlerMackNote()"
                v-if="is_edit_note"
                class="mr-2"
              >
                Lưu
              </CButton>
              <CButton
                color="danger"
                size="sm"
                @click="closeNote()"
                v-if="is_edit_note"
              >
                Hủy
              </CButton>
            </span>
          </p>
          <!-- on off -->
          <span class="float-right">
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
          </span>
          <!-- edit -->
          <CCollapse :show="Boolean(is_show_note)" :duration="collapseDuration">
            <label class="font-weight-bold" for="">Ghi chú</label>
            <p style="white-space: pre" class="border rounded p-3">
              {{ mack_note.note }}
            </p>
          </CCollapse>
          <!-- content -->

          <CCollapse :show="Boolean(is_edit_note)" :duration="collapseDuration">
            <CCardBody>
              <label class="font-weight-bold" for="">Ghi chú</label>
              <CTextarea rows="9" v-model="mack_note.note" placeholder="Nhập ghi chú"></CTextarea>
            </CCardBody>
          </CCollapse>
          <!-- edit -->

          <CDataTable
            :items="cong_ty_tong_quan_items"
            :fields="cong_ty_tong_quan_fields"
            :header="false"
            small
            fixed
            class="bg-purple bg-ptdn"
            hover
            addTableClasses="table-border-white-non-left-right"
          >
            <template #no-items-view>
              <p class="text-center h5 mt-3">Không có dữ liệu</p>
            </template>
            <template #thong_tin="{ item }">
              <td class="font-weight-bold">{{ item.thong_tin }}</td>
            </template>
            <template #gia_tri="{ item }">
              <td class="text-center" v-if="item.thong_tin == 'Trang web'">
                <a :href="item.gia_tri" target="_blank">{{ item.gia_tri }}</a>
              </td>
              <td class="text-center" v-else>{{ item.gia_tri }}</td>
            </template>
          </CDataTable>
        </CCardBody>
      </CCard>
    </CCol>

    <CCol sm="6" v-if="!is_loading">
      <CCard>
        <CCardBody>
          <p class="text-center text-uppercase h5 title-block">
            <b>Ban lãnh đạo công ty</b>
          </p>
          <CDataTable
            :items="cong_ty_lanh_dao_items"
            :fields="cong_ty_lanh_dao_fields"
            small
            fixed
            class="bg-purple bg-ptdn"
            addTableClasses="thead-center table-border-white-non-left-right"
          >
            <template #no-items-view>
              <p class="text-center h5 mt-3">Không có dữ liệu</p>
            </template>
          </CDataTable>
        </CCardBody>
      </CCard>
      <CCard>
        <CRow>
          <CCol sm="6" class="bg-ccsh">
            <CustomEChart
              :option="options_co_cau_so_huu"
              style="height: 200px"
              v-if="!is_loading"
            />
          </CCol>
          <CCol sm="6">
            <CCardBody class="bg-ptdn">
              <p class="text-center text-uppercase h5 title-block">
                <b>Tỉ lệ sở hữu</b>
              </p>
              <CDataTable
                :items="co_cau_so_huu_items"
                :header="false"
                small
                fixed
                addTableClasses="thead-center"
              >
                <template #no-items-view>
                  <p class="text-center h5 mt-3">Không có dữ liệu</p>
                </template>
              </CDataTable>
            </CCardBody>
          </CCol>
        </CRow>
      </CCard>
    </CCol>

    <CCol sm="12" v-if="!is_loading">
      <CCard>
        <CCardBody>
          <p class="text-center text-uppercase h5 title-block">
            <b>Thông tin cổ đông</b>
          </p>
          <CDataTable
            :items="cong_ty_co_dong_items"
            :fields="cong_ty_co_dong_fields"
            small
            fixed
            class="bg-purple bg-ptdn"
            addTableClasses="thead-center table-border-white"
          >
            <template #no-items-view>
              <p class="text-center h5 mt-3">Không có dữ liệu</p>
            </template>
          </CDataTable>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol sm="12" v-if="!is_loading">
      <CCard>
        <CCardBody>
          <p class="text-center text-uppercase h5 title-block">
            <b>Thông tin giao dịch</b>
          </p>
          <CDataTable
            :items="cong_ty_giao_dich_items"
            :fields="cong_ty_giao_dich_fields"
            small
            fixed
            class="bg-purple bg-ptdn"
            addTableClasses="thead-center table-border-white"
          >
            <template #no-items-view>
              <p class="text-center h5 mt-3">Không có dữ liệu</p>
            </template>
          </CDataTable>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol sm="6" v-if="!is_loading">
      <CCard class="bg-purple bg-ptdn">
        <CCardBody>
          <p class="text-center text-uppercase h5 title-block">
            <b>Ngành nghề</b>
          </p>
          <read-more
            more-str="Xem thêm"
            :text="nganh_nghe"
            link="#"
            less-str="Đóng lại"
            :max-chars="200"
            class="pre-wrap"
          />
        </CCardBody>
      </CCard>
    </CCol>
    <CCol sm="6" v-if="!is_loading">
      <CCard class="bg-purple bg-ptdn">
        <CCardBody>
          <p class="text-center text-uppercase h5 title-block">
            <b>Lịch sử</b>
          </p>
          <read-more
            more-str="Xem thêm"
            :text="lich_su"
            link="#"
            less-str="Đóng lại"
            :max-chars="200"
            class="pre-wrap"
          />
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
<script>
import axios from "axios";
import CustomEChart from "@/views/charts/CustomEchart";

export default {
  name: "StockCommonInfo",
  props: {
    mack: {
      type: String,
      default: "VNM",
    },
  },
  components: {
    CustomEChart,
  },
  data() {
    return {
      is_show_note: false,
      is_edit_note: false,
      collapseDuration: 0,
      is_loading: true,
      cong_ty_co_dong_items: [],
      cong_ty_giao_dich_items: [],
      cong_ty_lanh_dao_items: [],
      cong_ty_tong_quan_items: [],
      cong_ty_co_dong_fields: [
        {
          key: "ten",
          label: "Tên",
        },
        {
          key: "so_luong_co_phieu",
          label: "Số lượng cổ phiếu",
        },
        {
          key: "ty_le_so_huu",
          label: "Tỷ lệ sở hữu",
        },
        {
          key: "ngay_cap_nhat",
          label: "Ngày cập nhật",
        },
      ],
      cong_ty_giao_dich_fields: [
        {
          key: "ngay",
          label: "Ngày",
        },
        {
          key: "ten",
          label: "Tên",
        },
        {
          key: "vi_tri",
          label: "Vị trí",
        },
        {
          key: "loai_giao_dich",
          label: "Loại giao dịch",
        },
        {
          key: "so_luong_co_phieu",
          label: "Số lượng cổ phiếu",
        },
      ],
      cong_ty_lanh_dao_fields: [
        {
          key: "ten",
          label: "Tên",
        },
        {
          key: "vi_tri",
          label: "Vị trí",
        },
      ],
      cong_ty_tong_quan_fields: [
        {
          key: "thong_tin",
          label: "Thông tin",
        },
        {
          key: "gia_tri",
          label: "Giá trị",
        },
      ],
      co_cau_so_huu_items: [],
      lich_su: "",
      nganh_nghe: "",
      chartdata_co_cau_so_huu: [],
      reload: true,
      mack_note: {
        id: null,
        mack: "",
        note: "",
        note_old: "",
      },
    };
  },
  created() {
    this.info_update();
    this.getMackNote();
  },
  methods: {
    getMackNote() {
      let self = this;
      self.mack_note.id = null;
      self.mack_note.mack = "";
      self.mack_note.note = "";
      self.mack_note.note_old = "";

      self.is_edit_note = false;
      self.is_show_note = false;
      axios
        .get(this.$apiAdress + "/api/user-mack-note", {
          params: {
            mack: self.mack,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          if (res.data.length != 0) {
            self.mack_note.id = res.data[0].id;
            self.mack_note.mack = res.data[0].mack;
            self.mack_note.note_old = res.data[0].note;
            self.mack_note.note = res.data[0].note;
          }
        })
        .catch((err) => {
          console.log(err);
        });
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

    toggleDetails() {
      this.is_edit_note = false;
      this.is_show_note = !this.is_show_note;
      this.collapseDuration = 300;
      this.$nextTick(() => {
        this.collapseDuration = 0;
      });
    },
    toggleEdit() {
      this.is_show_note = false;
      this.is_edit_note = !this.is_edit_note;
      this.collapseDuration = 300;
      this.$nextTick(() => {
        this.collapseDuration = 0;
      });
    },
    info_update() {
      this.is_loading = true;
      let self = this;
      axios
        .get(this.$apiAdress + "/api/stocks/common-info", {
          params: {
            mack: self.mack,
            token: localStorage.getItem("api_token"),
          },
        })
        .then(function (response) {
          self.cong_ty_co_dong_items = response.data["cong_ty_co_dong"].map(
            (item) => {
              let ngay_cap_nhat = item.ngay_cap_nhat;
              // let ngay_cap_nhat = "2021-06-30T00:00:00";
              ngay_cap_nhat = ngay_cap_nhat.substring(0, 7);
              ngay_cap_nhat = ngay_cap_nhat.split("-");
              ngay_cap_nhat = ngay_cap_nhat.reverse().join("-");
              return {
                ...item,
                ngay_cap_nhat: ngay_cap_nhat,
              };
            }
          );
          self.cong_ty_giao_dich_items = response.data["cong_ty_giao_dich"];
          self.cong_ty_lanh_dao_items = response.data["cong_ty_lanh_dao"];
          let d = response.data["cong_ty_tong_quan"];

          self.cong_ty_co_dong_items.forEach((item) => {
            item.so_luong_co_phieu = parseFloat(
              item.so_luong_co_phieu
            ).toLocaleString("en", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 1,
            });
            item.ty_le_so_huu =
              (parseFloat(item.ty_le_so_huu) * 100).toLocaleString("en", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              }) + "%";
          });
          self.cong_ty_giao_dich_items.forEach((item) => {
            item.so_luong_co_phieu = parseFloat(
              item.so_luong_co_phieu
            ).toLocaleString("en", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 1,
            });
          });
          switch (response.data["type_bank"]) {
            case "nonbank":
              self.cong_ty_tong_quan_items = [
                {
                  thong_tin: "Mã ",
                  gia_tri: d.mack,
                },
                {
                  thong_tin: "Tên công ty",
                  gia_tri: d.ten_cong_ty,
                },
                {
                  thong_tin: "Trang web",
                  gia_tri: self.checkURL(d.website),
                },
                {
                  thong_tin: "Sàn niêm yết",
                  gia_tri: self.$store.state.list_mack_company.hasOwnProperty(
                    d.mack
                  )
                    ? self.$store.state.list_mack_company[d.mack].san
                    : "",
                },
                {
                  thong_tin: "Địa chỉ trụ sở",
                  gia_tri: d.dia_chi_tru_so,
                },
                {
                  thong_tin: "Vốn điều lệ",
                  gia_tri: self.format_money(d.von_dieu_le),
                },
                {
                  thong_tin: "Vốn hóa thị trường",
                  gia_tri: self.format_money(d.von_hoa_thi_truong),
                },
                {
                  thong_tin: "Số lượng nhân sự",
                  gia_tri: parseFloat(d.so_luong_nhan_su).toLocaleString("en", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }),
                },
                {
                  thong_tin: "Mã ngành ICB",
                  gia_tri: d.ma_nganh_icb,
                },
                {
                  thong_tin: "Tên ngành ICB",
                  gia_tri: d.ten_nganh_icb,
                },
                {
                  thong_tin: "Cấp ngành ICB",
                  gia_tri: d.cap_nganh_icb,
                },
                {
                  thong_tin: "Số lượng cổ phiếu",
                  gia_tri: d.so_luong_co_phieu.toLocaleString("en", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }),
                },
                {
                  thong_tin: "EPS",
                  gia_tri:
                    parseFloat(d.eps).toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }) + " VNĐ",
                },
                {
                  thong_tin: "BVPS",
                  gia_tri:
                    parseFloat(d.bvps).toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }) + " VNĐ",
                },
                {
                  thong_tin: "P/B",
                  gia_tri:
                    parseFloat(d.pb).toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 1,
                    }) + " lần",
                },
                {
                  thong_tin: "P/E",
                  gia_tri:
                    parseFloat(d.pe).toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 1,
                    }) + " lần",
                },
                {
                  thong_tin: "ROA",
                  gia_tri:
                    d.roa.toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 1,
                    }) + " %",
                },
                {
                  thong_tin: "ROE",
                  gia_tri:
                    d.roe.toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 1,
                    }) + " %",
                },
                {
                  thong_tin: "ROIC",
                  gia_tri:
                    parseFloat(d.roic).toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 1,
                    }) + " %",
                },
                {
                  thong_tin: "Tổng nợ quý gần nhất",
                  gia_tri: self.format_money(d.tong_no_quy_gan_nhat),
                },
                {
                  thong_tin: "Tổng nợ ngắn hạn quý gần nhất",
                  gia_tri: self.format_money(d.tong_no_ngan_han_quy_gan_nhat),
                },
                {
                  thong_tin: "Tổng nợ dài hạn quý gần nhất",
                  gia_tri: self.format_money(d.tong_no_dai_han_quy_gan_nhat),
                },
                {
                  thong_tin: "Vốn chủ sở hữu quý gần nhất",
                  gia_tri: self.format_money(d.von_chu_so_huu_quy_gan_nhat),
                },
                {
                  thong_tin: "Tổng tài sản quý gần nhất",
                  gia_tri: self.format_money(d.tong_tai_san_quy_gan_nhat),
                },
                {
                  thong_tin: "Tổng hàng tồn kho quý gần nhất",
                  gia_tri: self.format_money(d.tong_hang_ton_kho_quy_gan_nhat),
                },
                {
                  thong_tin: "Doanh thu thuần TTM",
                  gia_tri: self.format_money(d.doanh_thu_thuan_ttm),
                },
                {
                  thong_tin: "Lợi nhuận gộp TTM",
                  gia_tri: self.format_money(d.loi_nhuan_gop_ttm),
                },
                {
                  thong_tin: "Lợi nhuận từ HDTC TTM",
                  gia_tri: self.format_money(d.loi_nhuan_tu_hdtc_ttm),
                },
                {
                  thong_tin: "Lợi nhuận khác TTM",
                  gia_tri: self.format_money(d.loi_nhuan_khac_ttm),
                },
                {
                  thong_tin: "Lợi nhuận trước thuế TTM",
                  gia_tri: self.format_money(d.loi_nhuan_truoc_thue_ttm),
                },
                {
                  thong_tin: "Lợi nhuận sau thuế TTM",
                  gia_tri: self.format_money(d.loi_nhuan_sau_thue_ttm),
                },
              ];
              break;
            case "bank":
              self.cong_ty_tong_quan_items = [
                {
                  thong_tin: "Mã ",
                  gia_tri: d.mack,
                },
                {
                  thong_tin: "Tên công ty",
                  gia_tri: d.ten_cong_ty,
                },
                {
                  thong_tin: "Trang web",
                  gia_tri: self.checkURL(d.website),
                },
                {
                  thong_tin: "Sàn niêm yết",
                  gia_tri: self.$store.state.list_mack_company.hasOwnProperty(
                    d.mack
                  )
                    ? self.$store.state.list_mack_company[d.mack].san
                    : "",
                },
                {
                  thong_tin: "Địa chỉ trụ sở",
                  gia_tri: d.dia_chi_tru_so,
                },
                {
                  thong_tin: "Vốn điều lệ",
                  gia_tri: self.format_money(d.von_dieu_le),
                },
                {
                  thong_tin: "Vốn hóa thị trường",
                  gia_tri: self.format_money(d.von_hoa_thi_truong),
                },
                {
                  thong_tin: "Số lượng nhân sự",
                  gia_tri: parseFloat(d.so_luong_nhan_su).toLocaleString("en", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 1,
                  }),
                },
                {
                  thong_tin: "Mã ngành ICB",
                  gia_tri: d.ma_nganh_icb,
                },
                {
                  thong_tin: "Tên ngành ICB",
                  gia_tri: d.ten_nganh_icb,
                },
                {
                  thong_tin: "Cấp ngành ICB",
                  gia_tri: d.cap_nganh_icb,
                },
                {
                  thong_tin: "Số lượng cổ phiếu",
                  gia_tri: d.so_luong_co_phieu.toLocaleString("en", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }),
                },
                {
                  thong_tin: "EPS",
                  gia_tri:
                    parseFloat(d.eps).toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }) + " VNĐ",
                },
                {
                  thong_tin: "BVPS",
                  gia_tri:
                    parseFloat(d.bvps).toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }) + " VNĐ",
                },
                {
                  thong_tin: "P/B",
                  gia_tri:
                    parseFloat(d.pb).toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }) + " lần",
                },
                {
                  thong_tin: "P/E",
                  gia_tri:
                    parseFloat(d.pe).toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }) + " lần",
                },
                {
                  thong_tin: "ROAA",
                  gia_tri:
                    parseFloat(d.roaa).toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 1,
                    }) + " %",
                },
                {
                  thong_tin: "ROEA",
                  gia_tri:
                    parseFloat(d.roea).toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 1,
                    }) + " %",
                },
                {
                  thong_tin: "NIM",
                  gia_tri:
                    d.nim.toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 1,
                    }) + " %",
                },
                {
                  thong_tin: "Tổng nợ quý gần nhất",
                  gia_tri: self.format_money(d.tong_no_quy_gan_nhat),
                },
                {
                  thong_tin: "Tổng tiền gửi khách hàng quý gần nhất",
                  gia_tri: self.format_money(
                    d.tong_tien_gui_khach_hang_quy_gan_nhat
                  ),
                },
                {
                  thong_tin: "Vốn chủ sở hữu quý gần nhất",
                  gia_tri: self.format_money(d.vcsh_quy_gan_nhat),
                },
                {
                  thong_tin: "Tổng dư nợ cho vay quý gần nhất",
                  gia_tri: self.format_money(d.tong_du_no_cho_vay_quy_gan_nhat),
                },
                {
                  thong_tin: "Tổng tài sản quý gần nhất",
                  gia_tri: self.format_money(d.tong_tai_san_quy_gan_nhat),
                },
                {
                  thong_tin: "Tổng tài sản có sinh lãi quý gần nhất",
                  gia_tri: self.format_money(
                    d.tong_tai_san_co_sinh_lai_quy_gan_nhat
                  ),
                },
                {
                  thong_tin: "Doanh thu hoạt động TTM",
                  gia_tri: self.format_money(d.doanh_thu_hoat_dong_ttm),
                },
                {
                  thong_tin: "Lợi nhuận hoạt động TTM",
                  gia_tri: self.format_money(d.loi_nhuan_hoat_dong_ttm),
                },
                {
                  thong_tin: "Lợi nhuận trước thuế TTM",
                  gia_tri: self.format_money(d.loi_nhuan_truoc_thue_ttm),
                },
                {
                  thong_tin: "Lợi nhuận sau thuế TTM",
                  gia_tri: self.format_money(d.loi_nhuan_sau_thue_ttm),
                },
              ];
              break;
            case "stock":
              self.cong_ty_tong_quan_items = [
                {
                  thong_tin: "Mã ",
                  gia_tri: d.mack,
                },
                {
                  thong_tin: "Tên công ty",
                  gia_tri: d.ten_cong_ty,
                },
                {
                  thong_tin: "Trang web",
                  gia_tri: self.checkURL(d.website),
                },
                {
                  thong_tin: "Sàn niêm yết",
                  gia_tri: self.$store.state.list_mack_company.hasOwnProperty(
                    d.mack
                  )
                    ? self.$store.state.list_mack_company[d.mack].san
                    : "",
                },
                {
                  thong_tin: "Địa chỉ trụ sở",
                  gia_tri: d.dia_chi_tru_so,
                },
                {
                  thong_tin: "Vốn điều lệ",
                  gia_tri: self.format_money(d.von_dieu_le),
                },
                {
                  thong_tin: "Vốn hóa thị trường",
                  gia_tri: self.format_money(d.von_hoa_thi_truong),
                },
                {
                  thong_tin: "Số lượng nhân sự",
                  gia_tri: parseFloat(d.so_luong_nhan_su).toLocaleString("en", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }),
                },
                {
                  thong_tin: "Mã ngành ICB",
                  gia_tri: d.ma_nganh_icb,
                },
                {
                  thong_tin: "Tên ngành ICB",
                  gia_tri: d.ten_nganh_icb,
                },
                {
                  thong_tin: "Cấp ngành ICB",
                  gia_tri: d.cap_nganh_icb,
                },
                {
                  thong_tin: "Số lượng cổ phiếu",
                  gia_tri: d.so_luong_co_phieu.toLocaleString("en", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }),
                },
                {
                  thong_tin: "EPS",
                  gia_tri:
                    parseFloat(d.eps).toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }) + " VNĐ",
                },
                {
                  thong_tin: "BVPS",
                  gia_tri:
                    parseFloat(d.bvps).toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }) + " VNĐ",
                },
                {
                  thong_tin: "P/B",
                  gia_tri:
                    parseFloat(d.pb).toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }) + " lần",
                },
                {
                  thong_tin: "P/E",
                  gia_tri:
                    parseFloat(d.pe).toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }) + " lần",
                },
                {
                  thong_tin: "ROAA",
                  gia_tri:
                    parseFloat(d.roaa).toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 1,
                    }) + " %",
                },
                {
                  thong_tin: "ROEA",
                  gia_tri:
                    parseFloat(d.roea).toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 1,
                    }) + " %",
                },
                {
                  thong_tin: "Tổng nợ quý gần nhất",
                  gia_tri: self.format_money(d.tong_no_quy_gan_nhat),
                },
                {
                  thong_tin: "Tổng nợ ngắn hạn quý gần nhất",
                  gia_tri: self.format_money(d.tong_no_ngan_han_quy_gan_nhat),
                },
                {
                  thong_tin: "Tổng nợ dài hạn quý gần nhất",
                  gia_tri: self.format_money(d.tong_no_dai_han_quy_gan_nhat),
                },
                {
                  thong_tin: "Vốn chủ sở hữu quý gần nhất",
                  gia_tri: self.format_money(d.von_chu_so_huu_quy_gan_nhat),
                },
                {
                  thong_tin: "Tổng tài sản quý gần nhất",
                  gia_tri: self.format_money(d.tong_tai_san_quy_gan_nhat),
                },
                {
                  thong_tin: "Tổng tài sản tài chính quý gần nhất",
                  gia_tri: self.format_money(
                    d.tong_tai_san_tai_chinh_quy_gan_nhat
                  ),
                },
                {
                  thong_tin: "Cộng doanh thu hoạt động TTM",
                  gia_tri: self.format_money(d.cong_doanh_thu_hoat_dong_ttm),
                },
                {
                  thong_tin: "Lợi nhuận gộp TTM",
                  gia_tri: self.format_money(d.loi_nhuan_gop_ttm),
                },
                {
                  thong_tin: "Lợi nhuận từ HĐTC TTM",
                  gia_tri: self.format_money(d.loi_nhuan_tu_hdtc_ttm),
                },
                {
                  thong_tin: "Lợi nhuận khác TTM",
                  gia_tri: self.format_money(d.loi_nhuan_khac_ttm),
                },
                {
                  thong_tin: "Lợi nhuận trước thuế TTM",
                  gia_tri: self.format_money(d.loi_nhuan_truoc_thue_ttm),
                },
                {
                  thong_tin: "Lợi nhuận sau thuế TTM",
                  gia_tri: self.format_money(d.loi_nhuan_sau_thue_ttm),
                },
              ];
              break;
            case "insurance":
              self.cong_ty_tong_quan_items = [
                {
                  thong_tin: "Mã ",
                  gia_tri: d.mack,
                },
                {
                  thong_tin: "Tên công ty",
                  gia_tri: d.ten_cong_ty,
                },
                {
                  thong_tin: "Trang web",
                  gia_tri: self.checkURL(d.website),
                },
                {
                  thong_tin: "Sàn niêm yết",
                  gia_tri: self.$store.state.list_mack_company.hasOwnProperty(
                    d.mack
                  )
                    ? self.$store.state.list_mack_company[d.mack].san
                    : "",
                },
                {
                  thong_tin: "Địa chỉ trụ sở",
                  gia_tri: d.dia_chi_tru_so,
                },
                {
                  thong_tin: "Vốn điều lệ",
                  gia_tri: self.format_money(d.von_dieu_le),
                },
                {
                  thong_tin: "Vốn hóa thị trường",
                  gia_tri: self.format_money(d.von_hoa_thi_truong),
                },
                {
                  thong_tin: "Số lượng nhân sự",
                  gia_tri: parseFloat(d.so_luong_nhan_su).toLocaleString("en", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 1,
                  }),
                },
                {
                  thong_tin: "Mã ngành ICB",
                  gia_tri: d.ma_nganh_icb,
                },
                {
                  thong_tin: "Tên ngành ICB",
                  gia_tri: d.ten_nganh_icb,
                },
                {
                  thong_tin: "Cấp ngành ICB",
                  gia_tri: d.cap_nganh_icb,
                },
                {
                  thong_tin: "Số lượng cổ phiếu",
                  gia_tri: d.so_luong_co_phieu.toLocaleString("en", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }),
                },
                {
                  thong_tin: "EPS",
                  gia_tri:
                    parseFloat(d.eps).toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }) + " VNĐ",
                },
                {
                  thong_tin: "BVPS",
                  gia_tri:
                    parseFloat(d.bvps).toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }) + " VNĐ",
                },
                {
                  thong_tin: "P/B",
                  gia_tri:
                    parseFloat(d.pb).toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }) + " lần",
                },
                {
                  thong_tin: "P/E",
                  gia_tri:
                    parseFloat(d.pe).toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }) + " lần",
                },
                {
                  thong_tin: "ROAA",
                  gia_tri:
                    parseFloat(d.roaa).toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 1,
                    }) + " %",
                },
                {
                  thong_tin: "ROEA",
                  gia_tri:
                    parseFloat(d.roea).toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 1,
                    }) + " %",
                },
                {
                  thong_tin: "ROIC",
                  gia_tri:
                    parseFloat(d.roic).toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 1,
                    }) + " %",
                },
                {
                  thong_tin: "Tổng nợ quý gần nhất",
                  gia_tri: self.format_money(d.tong_no_quy_gan_nhat),
                },
                {
                  thong_tin: "Tổng nợ ngắn hạn quý gần nhất",
                  gia_tri: self.format_money(d.tong_no_ngan_han_quy_gan_nhat),
                },
                {
                  thong_tin: "Tổng nợ dài hạn quý gần nhất",
                  gia_tri: self.format_money(d.tong_no_dai_han_quy_gan_nhat),
                },
                {
                  thong_tin: "Dự phòng nghiệp vụ quý gần nhất",
                  gia_tri: self.format_money(d.du_phong_nghiep_vu_quy_gan_nhat),
                },
                {
                  thong_tin: "Vốn chủ sở hữu quý gần nhất",
                  gia_tri: self.format_money(d.von_chu_so_huu_quy_gan_nhat),
                },
                {
                  thong_tin: "Tổng tài sản quý gần nhất",
                  gia_tri: self.format_money(d.tong_tai_san_quy_gan_nhat),
                },
                {
                  thong_tin: "Đầu tư tài chính ngắn hạn",
                  gia_tri: self.format_money(d.dau_tu_tai_chinh_ngan_han),
                },
                {
                  thong_tin: "Đầu tư tài chính dài hạn",
                  gia_tri: self.format_money(d.dau_tu_tai_chinh_dai_han),
                },
                {
                  thong_tin: "Doanh thu thuần TTM",
                  gia_tri: self.format_money(d.doanh_thu_thuan_ttm),
                },
                {
                  thong_tin: "Lợi nhuận gộp TTM",
                  gia_tri: self.format_money(d.loi_nhuan_gop_ttm),
                },
                {
                  thong_tin: "Lợi nhuận từ Hoạt động tài chính TTM",
                  gia_tri: self.format_money(
                    d.loi_nhuan_hoat_dong_tai_chinh_ttm
                  ),
                },
                {
                  thong_tin: "Lợi nhuận khác TTM",
                  gia_tri: self.format_money(d.loi_nhuan_khac_ttm),
                },
                {
                  thong_tin: "Lợi nhuận trước thuế TTM",
                  gia_tri: self.format_money(d.loi_nhuan_truoc_thue_ttm),
                },
                {
                  thong_tin: "Lợi nhuận sau thuế TTM",
                  gia_tri: self.format_money(d.loi_nhuan_sau_thue_ttm),
                },
              ];
              break;
            default:
              break;
          }
          self.cong_ty_tong_quan_items.forEach((item) => {
            item._cellClasses = {
              thong_tin: "font-weight-bold",
              gia_tri: "text-center",
            };
          });
          self.cong_ty_lanh_dao_items.forEach((item) => {
            item._cellClasses = {
              ten: "font-weight-bold text-center",
              vi_tri: "text-center ",
            };
          });
          self.cong_ty_co_dong_items.forEach((item) => {
            item._cellClasses = {
              ten: "font-weight-bold text-center",
              vi_tri: "text-center ",
              so_luong_co_phieu: "text-center",
              ty_le_so_huu: "text-center",
              ngay_cap_nhat: "text-center",
              loai: "text-center",
              xuat_xu: "text-center",
            };
          });
          self.cong_ty_giao_dich_items.forEach((item) => {
            item._cellClasses = {
              ngay: "text-center",
              ten: "text-center",
              vi_tri: "text-center ",
              loai_giao_dich: "text-center",
              so_luong_co_phieu: "text-center",
            };
          });
          self.lich_su = d.lich_su.replace(/^\s+|\s+$/g, "");
          self.nganh_nghe = d.nganh_nghe.replace(/^\s+|\s+$/g, "");
          self.chartdata_co_cau_so_huu = [
            { value: (d.so_huu_nha_nuoc * 100).toFixed(1), name: "Nhà nước" },
            {
              value: (d.so_huu_nuoc_ngoai * 100).toFixed(1),
              name: "Nước ngoài",
            },
            { value: (d.so_huu_khac * 100).toFixed(1), name: "Khác" },
          ];
          self.reload = !self.reload;
          self.co_cau_so_huu_items = [
            {
              thong_tin: "Tỉ lệ sở hữu của nhà nước",
              gia_tri:
                (d.so_huu_nha_nuoc * 100).toLocaleString("en", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                }) + " %",
              _cellClasses: {
                thong_tin: "font-weight-bold",
                gia_tri: "text-right",
              },
            },
            {
              thong_tin: "Tỉ lệ sở hữu của nước ngoài",
              gia_tri:
                (d.so_huu_nuoc_ngoai * 100).toLocaleString("en", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                }) + " %",
              _cellClasses: {
                thong_tin: "font-weight-bold",
                gia_tri: "text-right",
              },
            },
            {
              thong_tin: "Tỉ lệ sở hữu khác",
              gia_tri:
                (d.so_huu_khac * 100).toLocaleString("en", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                }) + " %",
              _cellClasses: {
                thong_tin: "font-weight-bold",
                gia_tri: "text-right",
              },
            },
          ];
          self.$store.state.description_mack = d.ten_cong_ty;
          self.is_loading = false;
        })
        .catch(function (error) {
          console.error(error);
          self.is_loading = false;
          self.cong_ty_co_dong_items = [];
          self.cong_ty_giao_dich_items = [];
          self.cong_ty_lanh_dao_items = [];
          self.cong_ty_tong_quan_items = [];
          self.co_cau_so_huu_items = [];
          self.lich_su = "";
          self.nganh_nghe = "";
          self.chartdata_co_cau_so_huu = [
            { value: 0, name: "Nhà nước" },
            { value: 0, name: "Nước ngoài" },
            { value: 0, name: "Khác" },
          ];
          self.reload = !self.reload;
        });
    },
    format_money(money) {
      money = money * 1000000;
      if (money >= 1000000000 || money <= -1000000000)
        return (
          (money / 1000000000).toLocaleString("en", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }) + " tỷ VNĐ"
        );
      if (money >= 1000000 || money <= -1000000)
        return (
          (money / 1000000).toLocaleString("en", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }) + " triệu VNĐ"
        );
      if (money >= 1000 || money <= -1000)
        return (
          (money / 1000).toLocaleString("en", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }) + " ngàn VNĐ"
        );
      else return money + " VNĐ";
    },
    format_CP(money) {
      money = money * 1000000;
      if (money >= 1000000000 || money <= -1000000000)
        return (
          (money / 1000000000).toLocaleString("en", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }) + " tỷ CP"
        );
      if (money >= 1000000 || money <= -1000000)
        return (
          (money / 1000000).toLocaleString("en", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }) + " triệu CP"
        );
      if (money >= 1000 || money <= -1000)
        return (
          (money / 1000).toLocaleString("en", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }) + " ngàn CP"
        );
      else return money + " CP";
    },
    checkURL(url){
      if(url == "0" || url == null){
        return "";
      }
      if(!url.includes("://")){
        return "http://"+url;
      }
      return url;
    }
  },
  watch: {
    "$store.state.mack": {
      deep: true,
      handler: function () {
        this.is_show_note = false;
        this.mack = this.$store.state.mack;
        this.info_update();
        this.getMackNote();
      },
    },
  },
  computed: {
    options_co_cau_so_huu() {
      return {
        title: {
          text: "Cơ cấu sở hữu",
          left: "center",
          align: "auto",
          top: "2%",
          textStyle: {
            fontFamily: "Tahoma",
          },
        },
        tooltip: {
          trigger: "item",
          formatter: function (trigger) {
            return `
              <span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${trigger.color};"></span>
              <span style="font-size:14px;color:#666;font-weight:400;margin-left:2px">${trigger.name}</span>
              <span style="float:right;margin-left:20px;font-size:14px;color:#666;font-weight:900">${trigger.value} %</span>
              <div style="clear:both"></div>`;
          },
        },
        legend: {
          bottom: "0",
        },
        series: [
          {
            name: "Cơ cấu sở hữu",
            type: "pie",
            radius: "50%",
            data: this.chartdata_co_cau_so_huu,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
    },
  },
};
</script>
<style lang="scss" >
.pre-wrap {
  white-space: pre-wrap;
}
.thead-center {
  thead {
    th {
      text-align: center;
    }
  }
}
.c-dark-theme {
  .bg-ptdn table {
    background: #282933;
  }
  .bg-ptdn th {
    background: #282933;
  }
  .bg-ptdn td {
    border: none;
  }
  .c-body {
    background-color: #270d34;
  }
  .card {
    background-color: #282933 !important;
  }
  .bg-purple {
    background-color: #282933 !important;
  }
  .table-border-white-non-left-right {
    thead {
      th {
        border: 1px solid #fff !important;
        &:first-child {
          border-left: 0 !important;
        }
        &:last-child {
          border-right: 0 !important;
        }
      }
    }
    tbody {
      tr {
        background: #282933;
        &:first-child {
          td {
            border-top: 1px solid #fff !important;
          }
        }
        td {
          &:first-child {
            border-left: 0 !important;
          }
          &:last-child {
            border-right: 0 !important;
          }
          border-left: 1px solid #fff !important;
          border-right: 1px solid #fff !important;
        }
      }
    }
  }
  .border-left-white {
    border-left: 2px solid #fff;
  }
  .table-border-white {
    thead {
      th {
        border: 1px solid #fff !important;
      }
    }
    tbody {
      border: 1px solid #fff !important;
      tr {
        background: #282933;
        &:first-child {
          td {
            border-top: 1px solid #fff !important;
          }
        }
        td {
          border-left: 1px solid #fff !important;
          border-right: 1px solid #fff !important;
        }
      }
    }
  }
}
</style>
