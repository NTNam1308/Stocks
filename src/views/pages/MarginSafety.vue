<template>
  <CCard>
    <CCardBody>
      <CRow>
        <CCol md="6" lg="4" xl="4">
          <div class="d-flex justify-content-between">
            <p class="h3">Nhập chỉ số</p>
          </div>
          <div class="d-flex justify-content-between">
            <div>Mã CK</div>
            <AutoComplete :selection.sync="mack" :text_right="true" />
          </div>
          <div class="d-flex justify-content-between">
            <div>EPS TTM (PV)</div>
            <CInput
              class="mb-1"
              :addInputClasses="{
                'text-right': true,
                'is-invalid': $v.input_eps_ttm.$error,
              }"
              invalidFeedback="Dữ liệu nhập vào phải là số, lớn hơn 0, không được để trống"
              v-model="input_eps_ttm"
            />
          </div>
          <div class="d-flex justify-content-between">
            <div>Tỷ lệ tăng trưởng tương lai</div>
            <CInput
              class="mb-1"
              :addInputClasses="{
                'text-right': true,
                'is-invalid': $v.input_ty_le_tang_truong_tuong_lai.$error,
              }"
              invalidFeedback="Dữ liệu nhập vào phải là số, lớn hơn 0, không được để trống"
              v-model="input_ty_le_tang_truong_tuong_lai"
            />
          </div>
          <div class="d-flex justify-content-between">
            <div>Thời gian đầu tư</div>
            <CInput
              class="mb-1"
              :addInputClasses="{
                'text-right': true,
                'is-invalid': $v.input_thoi_gian_dau_tu.$error,
              }"
              invalidFeedback="Dữ liệu nhập vào phải là số nguyên, lớn hơn 0, không được để trống"
              v-model="input_thoi_gian_dau_tu"
            />
          </div>
          <div class="d-flex justify-content-between">
            <div>EPS tương lai</div>
            <CInput
              class="mb-1"
              :addInputClasses="{
                'text-right': true,
              }"
              :placeholder="formatMoney(computed_eps_tuong_lai, 0, 0)"
              :readonly="true"
            />
          </div>
          <div class="d-flex justify-content-between">
            <div>P/E tương lai</div>
            <CInput
              class="mb-1"
              :addInputClasses="{
                'text-right': true,
                'is-invalid': $v.input_pe_tuong_lai.$error,
              }"
              invalidFeedback="Dữ liệu nhập vào phải là số, lớn hơn 0, không được để trống"
              v-model="input_pe_tuong_lai"
            />
          </div>
          <div class="d-flex justify-content-between">
            <div>Giá trị tương lai</div>
            <CInput
              class="mb-1"
              :addInputClasses="{
                'text-right': true,
              }"
              :placeholder="formatMoney(computed_gia_tri_tuong_lai, 0, 0)"
              :readonly="true"
            />
          </div>
          <div class="d-flex justify-content-between">
            <div>Tỷ lệ sinh lời tối thiểu</div>
            <CInput
              class="mb-1"
              :addInputClasses="{
                'text-right': true,
                'is-invalid': $v.input_ty_le_sinh_loi_toi_thieu.$error,
              }"
              invalidFeedback="Dữ liệu nhập vào phải là số, lớn hơn 0, không được để trống"
              v-model="input_ty_le_sinh_loi_toi_thieu"
            />
          </div>
          <div class="d-flex justify-content-between">
            <div>Tỷ lệ FCF</div>
            <CInput
              class="mb-1"
              :addInputClasses="{
                'text-right': true,
              }"
              :placeholder="formatMoney(computed_fcf_ratio, 0, 2)"
              :readonly="true"
            />
          </div>
          <div class="d-flex justify-content-between">
            <div>FCF/s</div>
            <CInput
              class="mb-1"
              :addInputClasses="{
                'text-right': true,
                'is-invalid': $v.input_fcf_tren_moi_co_phieu.$error,
              }"
              invalidFeedback="Dữ liệu nhập vào phải là số, lớn hơn 0, không được để trống"
              v-model="input_fcf_tren_moi_co_phieu"
            />
          </div>
          <div class="d-flex justify-content-between">
            <div>Số lượng cổ phiếu</div>
            <CInput
              class="mb-1"
              :addInputClasses="{
                'text-right': true,
              }"
              :placeholder="formatMoney(data_original.so_luong_co_phieu, 0, 0)"
              :readonly="true"
            />
          </div>
          <div class="d-flex justify-content-between">
            <div>FCF TTM</div>
            <CInput
              class="mb-1"
              :addInputClasses="{
                'text-right': true,
              }"
              :placeholder="formatMoney(data_original.fcf_ttm, 0, 0)"
              :readonly="true"
            />
          </div>
          <div class="d-flex justify-content-between">
            <div>OCF TTM</div>
            <CInput
              class="mb-1"
              :addInputClasses="{
                'text-right': true,
              }"
              :placeholder="formatMoney(data_original.ocf_ttm, 0, 0)"
              :readonly="true"
            />
          </div>
          <div class="d-flex justify-content-between">
            <div>CAPEX TTM</div>
            <CInput
              class="mb-1"
              :addInputClasses="{
                'text-right': true,
              }"
              :placeholder="formatMoney(data_original.capex_ttm, 0, 0)"
              :readonly="true"
            />
          </div>
          <div class="d-flex justify-content-between">
            <div>
              <CSelect
                label="Xác định Vùng An toàn theo:"
                :value.sync="data_filter_type_safe_zone"
                :options="option_filter_type_safe_zone"
                class="mb-0"
              >
              </CSelect>
            </div>
            <CInput
              v-if="data_filter_type_safe_zone == 'mos'"
              class="mb-1"
              label=" "
              :addInputClasses="{
                'text-right': true,
                'is-invalid': $v.input_bien_an_toan.$error,
              }"
              invalidFeedback="Dữ liệu nhập vào phải là số, lớn hơn 0, không được để trống"
              v-model="input_bien_an_toan"
            />
            <CInput
              v-if="data_filter_type_safe_zone == 'fcf'"
              class="mb-1"
              label=" "
              :addInputClasses="{
                'text-right': true,
                'is-invalid': $v.input_thoi_gian_muon_hoan_von_fcf.$error,
              }"
              invalidFeedback="Dữ liệu nhập vào phải là số nguyên, lớn hơn 0, không được để trống"
              v-model="input_thoi_gian_muon_hoan_von_fcf"
            />
            <CInput
              v-if="data_filter_type_safe_zone == 'eps'"
              class="mb-1"
              label=" "
              :addInputClasses="{
                'text-right': true,
                'is-invalid': $v.input_thoi_gian_muon_hoan_von_eps.$error,
              }"
              invalidFeedback="Dữ liệu nhập vào phải là số nguyên, lớn hơn 0, không được để trống"
              v-model="input_thoi_gian_muon_hoan_von_eps"
            />
          </div>
          <div class="d-flex justify-content-between mt-2">
            <div class=""></div>
            <div>
              <CButton color="info" class="mx-2" @click="handleButtonReset"
                ><CIcon name="cilReload" class="mt-0" /> Khôi phục</CButton
              >
              <CButton color="info" @click="handleButtonCalc"
                ><CIcon name="cilCalculator" class="mt-0" /> Tính</CButton
              >
            </div>
          </div>
          <div class="d-flex justify-content-between mt-2">
            <div class="mt-2">
              <CButton color="primary" class="" @click="handleSaveClick">
                <CIcon name="cilSave" />
                Lưu mẫu
              </CButton>
              <CButton
                color="primary"
                class="ml-2"
                @click="is_show_modal_list_data = true"
              >
                <CIcon name="cil-vertical-align-bottom" />
                Nạp mẫu
              </CButton>
            </div>
            <div
              class="align-items-center"
              v-if="selected_item.id != -1"
              style="width: calc(100% - 220px)"
            >
              <div>Đang chọn: {{ selected_item.label }}</div>
              <CLink class="" @click="deselectItem">bỏ chọn</CLink>
            </div>
          </div>
        </CCol>
        <CCol md="6" lg="8" xl="8">
          <p class="h3">Kết quả tính toán</p>
          <CustomEChart :option="option_chart" style="height: 450px" />
          <CRow class="mt-2">
            <CCol sm="6" class="border-right">
              <p class="h5 text-center">KẾT QUẢ</p>
              <div class="d-flex justify-content-between border-bottom">
                <div class="font-weight-bold">Giá trị hiện tại</div>
                <div class="font-weight-bold">
                  {{ formatMoney(result_data.gia_tri_hien_tai, 0, 2) }}
                </div>
              </div>
              <div class="d-flex justify-content-between border-bottom">
                <div class="font-weight-bold">
                  Giá biên an toàn {{ input_bien_an_toan }}%
                </div>
                <div class="font-weight-bold">
                  {{ formatMoney(result_data.gia_bien_an_toan, 0, 2) }}
                </div>
              </div>
              <div class="d-flex justify-content-between border-bottom">
                <div class="font-weight-bold">
                  Tỷ suất biên an toàn (MOS yield)
                </div>
                <div class="font-weight-bold">
                  {{ formatMoney(result_data.ty_suat_bien_an_toan, 0, 2) }}%
                </div>
              </div>
              <div class="d-flex justify-content-between border-bottom">
                <div class="font-weight-bold">
                  Thời gian hoàn vốn của FCF hiện tại
                </div>
                <div class="font-weight-bold">
                  {{ formatMoney(result_data.thoi_gian_hoan_von_fcf, 0, 2) }}
                  năm
                </div>
              </div>
              <div class="d-flex justify-content-between border-bottom">
                <div class="font-weight-bold">
                  Giá tại năm muốn hoàn vốn theo FCF/s
                </div>
                <div class="font-weight-bold">
                  {{
                    formatMoney(result_data.gia_tai_nam_muon_hoan_von_fcf, 0, 2)
                  }}
                </div>
              </div>
              <div class="d-flex justify-content-between border-bottom">
                <div class="font-weight-bold">
                  Thời gian hoàn vốn của EPS hiện tại
                </div>
                <div class="font-weight-bold">
                  {{ formatMoney(result_data.thoi_gian_hoan_von_eps, 0, 2) }}
                  năm
                </div>
              </div>
              <div class="d-flex justify-content-between">
                <div class="font-weight-bold">
                  Giá tại năm muốn hoàn vốn theo EPS
                </div>
                <div class="font-weight-bold">
                  {{
                    formatMoney(result_data.gia_tai_nam_muon_hoan_von_eps, 0, 2)
                  }}
                </div>
              </div>
            </CCol>
            <CCol sm="6">
              <p class="h5 text-center">THỐNG KÊ NHANH</p>
              <div class="d-flex justify-content-between border-bottom">
                <div class="font-weight-bold">Giá cổ phiếu hiện tại</div>
                <div class="font-weight-bold">
                  {{ formatMoney(price, 0, 2) }}
                </div>
              </div>
              <div class="d-flex justify-content-between border-bottom">
                <div class="font-weight-bold">P/E hiện tại</div>
                <div class="font-weight-bold">
                  {{ formatMoney(pe_hien_tai, 0, 2) }}
                </div>
              </div>
              <div class="d-flex justify-content-between border-bottom">
                <div class="font-weight-bold">P/E thấp nhất và cao nhất</div>
                <div class="font-weight-bold">
                  {{ formatMoney(data_original.pe_thap_nhat, 0, 2) }} -
                  {{ formatMoney(data_original.pe_cao_nhat, 0, 2) }}
                </div>
              </div>
              <div class="d-flex justify-content-between border-bottom">
                <div class="font-weight-bold">PEG</div>
                <div class="font-weight-bold">
                  {{ formatMoney(peg_hien_tai, 0, 2) }}
                </div>
              </div>
              <div class="d-flex justify-content-between border-bottom">
                <div class="font-weight-bold">BVPS</div>
                <div class="font-weight-bold">
                  {{ formatMoney(data_original.bvps, 0, 0) }}
                </div>
              </div>
              <div class="d-flex justify-content-between border-bottom">
                <div class="font-weight-bold">Tỷ lệ tăng trưởng BVPS</div>
                <div class="font-weight-bold">
                  {{ formatMoney(data_original.tang_truong_bvps, 0, 2) }}
                </div>
              </div>
              <div class="d-flex justify-content-between">
                <div class="font-weight-bold">P/B</div>
                <div class="font-weight-bold">{{ formatMoney(pb, 0, 2) }}</div>
              </div>
            </CCol>
            <CCol sm="6" class="border-right">
              <div
                class="d-flex justify-content-center mt-2"
                style="background-color: rgb(46, 184, 92)"
              >
                <div class="font-weight-bold p-2">
                  <p class="text-center h5" style="color: #fff">
                    Vùng an toàn (xanh)
                  </p>
                  <p class="text-center h1" style="color: #fff">
                    {{ formatMoney(result_data.vung_an_toan_xanh, 0, 2) }}
                  </p>
                </div>
              </div>
            </CCol>
            <CCol sm="6">
              <div
                class="d-flex justify-content-center mt-2"
                style="background-color: #ef5350"
              >
                <div class="font-weight-bold p-2">
                  <p class="text-center h5" style="color: #fff">
                    Vùng báo động (đỏ)
                  </p>
                  <p class="text-center h1" style="color: #fff">
                    {{ formatMoney(result_data.vung_bao_dong_do, 0, 2) }}
                  </p>
                </div>
              </div>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </CCardBody>
    <CModal
      title="Thông tin"
      :show.sync="is_show_modal_loading"
      :centered="true"
      :closeOnBackdrop="false"
    >
      <template #header>
        <p class="pl-2 h4 mb-0">Thông tin</p>
      </template>
      <template #footer>
        <p></p>
      </template>
      <p>Đang tải dữ liệu, vui lòng chờ</p>
      <CElementCover
        :opacity="1"
        v-if="true"
        :style="
          $store.state.darkMode
            ? { 'background-color': 'fff' }
            : { 'background-color': '000' }
        "
        ><CSpinner size="5xl" color="success" />
      </CElementCover>
    </CModal>
    <CModal
      title="Tuyên bố trách nhiệm/Disclaimer"
      :show.sync="is_show_modal_disclaimer"
      :centered="true"
      size="lg"
    >
      <template #footer>
        <CButton color="info" @click="is_show_modal_disclaimer = false">
          OK
        </CButton>
      </template>
      <p>
        Lưu ý riêng khi sử dụng công cụ định giá:<br />
        - Công cụ định giá được thiết kế sử dụng các dữ liệu mặc định có sẵn,
        nên được xem như một hướng dẫn nhập liệu với các con số hợp cho các lần
        định giá tiếp theo.<br />
        - Không nên định giá các doanh nghiệp có tính chu kỳ (ví dụ như ngân
        hàng, chứng khoán, bất động sản,...)<br />
      </p>
    </CModal>
    <CModal
      title="Danh sách đã lưu"
      :show.sync="is_show_modal_list_data"
      size="lg"
      :centered="true"
      v-if="is_show_modal_list_data"
    >
      <template #footer>
        <CButton color="secondary" @click="is_show_modal_list_data = false"
          >Đóng</CButton
        >
      </template>
      <CCard class="mb-0">
        <div class="overflow-auto" style="height: 70vh; overflow-x: hidden">
          <CCardBody class="mb-0">
            <CDataTable
              sorter
              hover
              striped
              :items="item_table"
              :fields="field_table"
              :tableFilter="{ label: 'Tìm Kiếm', placeholder: ' ' }"
              :items-per-page="5"
              pagination
            >
              <template #label="{ item }">
                <td>
                  <template v-if="current_id == item.id">
                    <CInput v-model="item.label" />
                    <CButton
                      size="sm"
                      color="primary"
                      class="ml-1"
                      @click="saveRowItem(item, 'save_name')"
                    >
                      Lưu 
                    </CButton>
                    <CButton
                      size="sm"
                      color="secondary"
                      class="ml-1"
                      @click="current_id = -1;item.label = current_label"
                    >
                      Đóng
                    </CButton>
                  </template>
                  <template v-else>
                    {{ item.label }}
                  </template>
                </td>
              </template>
              <template #manage="{ item }">
                <td>
                  <CButton
                    size="sm"
                    color="primary"
                    class=""
                    @click="loadItem(item)"
                  >
                    Nạp
                  </CButton>
                  <CButton
                    size="sm"
                    color="info"
                    class="ml-3"
                    @click="current_id = item.id; current_label=item.label"
                  >
                    Sửa
                  </CButton>
                  <CButton
                    size="sm"
                    color="danger"
                    class="ml-3"
                    @click="
                      id_delete = item.id;
                      is_show_modal_delete = true;
                    "
                  >
                    Xóa
                  </CButton>
                </td>
              </template>
              <template #no-items-view>
                <p class="text-center h5 mt-3">Không có dữ liệu</p>
              </template>
            </CDataTable>
          </CCardBody>
        </div>
      </CCard>
    </CModal>
    <CModal
      title="Thêm mẫu mới"
      :show.sync="is_show_modal_add_new"
      size="lg"
      :centered="true"
    >
      <template #footer>
        <CButton @click="addNewRow" color="success" class="ml-2">
          <CIcon name="cibAddthis" />
          Thêm mới
        </CButton>
        <CButton color="secondary" @click="is_show_modal_add_new = false"
          >Đóng</CButton
        >
      </template>
      <CCard class="mb-0">
        <CCardBody class="mb-0">
          <CInput
            label="Tên mẫu mới"
            placeholder="Nhập tên mẫu"
            v-model="value_add_new"
          >
          </CInput>
        </CCardBody>
      </CCard>
    </CModal>
    <CModal
      title="Thông báo"
      :show.sync="is_show_modal_delete"
      size="sm"
      :centered="true"
    >
      <template #footer>
        <CButton color="danger" @click="deleteRowItem">
          <CIcon name="cilTrash" />
          Xóa
        </CButton>
        <CButton color="secondary" @click="is_show_modal_delete = false"
          >Đóng</CButton
        >
      </template>
      <CCard class="mb-0">
        <CCardBody class="mb-0"> Bạn có muốn xóa không? </CCardBody>
      </CCard>
    </CModal>
  </CCard>
</template>

<script>
import axios from "axios";
import CustomEChart from "@/views/charts/CustomEchart";
import moment from "moment";
import AutoComplete from "@/views/base/AutoComplete";

import { required, decimal, numeric, maxValue } from "vuelidate/lib/validators";
const greaterThanZero = (value) => value > 0;
export default {
  name: "MarginSafety",
  created() {
    this.mackChange();
    this.getList();
  },
  components: {
    CustomEChart,
    AutoComplete,
  },
  data() {
    return {
      mack: "GAS",
      data_original: {
        eps_ttm: 0,
        ty_le_tang_truong_tuong_lai: 0,
        so_luong_co_phieu: 0,
        fcf_ttm: 0,
        ocf_ttm: 0,
        capex_ttm: 0,
        bvps: 0,
        tang_truong_bvps: 0,
        pe_cao_nhat: 0,
        pe_thap_nhat: 0,
      },
      option_filter_type_safe_zone: [
        {
          value: "mos",
          label: "MOS",
        },
        {
          value: "fcf",
          label: "FCF",
        },
        {
          value: "eps",
          label: "EPS",
        },
      ],
      data_filter_type_safe_zone: "mos",
      result_data: {
        gia_tri_hien_tai: 0,
        gia_bien_an_toan: 0,
        ty_suat_bien_an_toan: 0,
        thoi_gian_hoan_von_fcf: 0,
        gia_tai_nam_muon_hoan_von_fcf: 0,
        thoi_gian_hoan_von_eps: 0,
        gia_tai_nam_muon_hoan_von_eps: 0,
        vung_an_toan_xanh: 0,
        vung_bao_dong_do: 0,
        is_calculated: false,
      },
      is_show_modal_disclaimer: false,
      is_show_modal_loading: true,
      input_eps_ttm: "0",
      input_ty_le_tang_truong_tuong_lai: "0",
      input_thoi_gian_dau_tu: 10,
      input_pe_tuong_lai: "0",
      input_ty_le_sinh_loi_toi_thieu: 15,
      input_bien_an_toan: 50,
      input_fcf_tren_moi_co_phieu: "0",
      input_fcf_ttm: "0",
      input_thoi_gian_muon_hoan_von_fcf: "8",
      input_thoi_gian_muon_hoan_von_eps: "8",
      data_o: [],
      data_h: [],
      data_l: [],
      data_c: [],
      data_t: [],
      data_eod: [],
      is_show_modal_list_data: false,
      is_show_modal_add_new: false,
      field_table: [
        { key: "label", _style: "min-width:50px", label: "Tên" },
        {
          key: "manage",
          _style: "min-width:200px",
          label: "Quản lý",
          sorter: false,
        },
      ],
      item_table: [],
      current_id: -1,
      current_label: "",
      id_delete: -1,
      is_show_modal_delete: false,
      is_loading_saved: false,
      value_add_new: "",
      selected_item: {
        id: -1,
        label: "",
        content: {},
      },
    };
  },
  validations: {
    input_eps_ttm: {
      required,
      decimal,
      maxValue: greaterThanZero,
    },
    input_ty_le_tang_truong_tuong_lai: {
      required,
      decimal,
      maxValue: greaterThanZero,
    },
    input_thoi_gian_dau_tu: {
      required,
      numeric,
    },
    input_pe_tuong_lai: {
      required,
      decimal,
      maxValue: greaterThanZero,
    },
    input_ty_le_sinh_loi_toi_thieu: {
      required,
      decimal,
      maxValue: greaterThanZero,
    },
    input_bien_an_toan: {
      required,
      decimal,
      maxValue: greaterThanZero,
    },
    input_fcf_tren_moi_co_phieu: {
      required,
      decimal,
    },
    input_fcf_ttm: {
      required,
      decimal,
      maxValue: greaterThanZero,
    },
    input_thoi_gian_muon_hoan_von_fcf: {
      required,
      numeric,
      maxValue: greaterThanZero,
    },
    input_thoi_gian_muon_hoan_von_eps: {
      required,
      numeric,
      maxValue: greaterThanZero,
    },
  },
  methods: {
    mackChange() {
      this.data_original = {
        eps_ttm: 0,
        ty_le_tang_truong_tuong_lai: 0,
        so_luong_co_phieu: 0,
        fcf_ttm: 0,
        ocf_ttm: 0,
        capex_ttm: 0,
        bvps: 0,
        tang_truong_bvps: 0,
        pe_cao_nhat: 0,
        pe_thap_nhat: 0,
      };
      this.result_data = {
        gia_tri_hien_tai: 0,
        gia_bien_an_toan: 0,
        ty_suat_bien_an_toan: 0,
        thoi_gian_hoan_von_fcf: 0,
        gia_tai_nam_muon_hoan_von_fcf: 0,
        thoi_gian_hoan_von_eps: 0,
        gia_tai_nam_muon_hoan_von_eps: 0,
        vung_an_toan_xanh: 0,
        vung_bao_dong_do: 0,
        is_calculated: false,
      };
      this.is_show_modal_disclaimer = false;
      if (!this.is_loading_saved) {
        this.input_eps_ttm = "0";
        this.input_ty_le_tang_truong_tuong_lai = "0";
        this.input_thoi_gian_dau_tu = "10";
        this.input_pe_tuong_lai = "0";
        this.input_ty_le_sinh_loi_toi_thieu = "15";
        this.input_bien_an_toan = "50";
        this.input_fcf_tren_moi_co_phieu = "0";
        this.input_thoi_gian_muon_hoan_von_fcf = "8";
        this.input_thoi_gian_muon_hoan_von_eps = "8";
        this.data_filter_type_safe_zone = "mos";
      }
      this.getLivePrice();
      this.getAllClosePrice();
      this.getDataDefault();
    },
    pv(rate, nper, pmt, fv) {
      rate = parseFloat(rate);
      nper = parseFloat(nper);
      pmt = parseFloat(pmt);
      fv = parseFloat(fv);
      let pv_value = 0;
      if (nper == 0) {
        return 0;
      }
      if (rate == 0) {
        // Interest rate is 0
        pv_value = -(fv + pmt * nper);
      } else {
        let x = Math.pow(1 + rate, -nper);
        let y = Math.pow(1 + rate, nper);
        pv_value = -(x * (fv * rate - pmt + y * pmt)) / rate;
      }
      return pv_value;
    },
    fv(rate, nper, pmt, pv) {
      rate = parseFloat(rate);
      nper = parseFloat(nper);
      pmt = parseFloat(pmt);
      pv = parseFloat(pv);
      let fv_value = 0;
      if (nper == 0) {
        return 0;
      }
      if (rate == 0) {
        // Interest rate is 0
        fv_value = -(pv + pmt * nper);
      } else {
        let x = Math.pow(1 + rate, nper);
        fv_value = -(-pmt + x * pmt + rate * x * pv) / rate;
      }
      return fv_value;
    },
    calculateMA(dayCount, data) {
      let result = [];
      for (let i = 0, len = data.length; i < len; i++) {
        if (i < dayCount) {
          result.push("-");
          continue;
        }
        let sum = 0;
        for (let j = 0; j < dayCount; j++) {
          sum += +data[i - j][1];
        }
        result.push((sum / dayCount).toFixed(2));
      }
      return result;
    },
    getAllClosePrice() {
      window.socket_send.emit(
        "geteodbydate",
        this.$store.state.mack,
        [],
        (res) => {
          if (!res) return;
          if (Object.keys(res).length == 0) return;
          if (
            res.tradingdate.length > 0 &&
            this.$store.state.mack == res.stockcode
          ) {
            this.data_t = res.tradingdate;
            this.data_eod = res.eod;
          }
        }
      );
    },
    resetDataInput() {
      this.input_eps_ttm = this.data_original.eps_ttm;
      this.input_ty_le_tang_truong_tuong_lai =
        this.data_original.ty_le_tang_truong_tuong_lai;
      this.input_thoi_gian_dau_tu = 10;
      this.input_pe_tuong_lai = (
        this.data_original.ty_le_tang_truong_tuong_lai * 1.5
      ).toFixed(2);
      this.input_ty_le_sinh_loi_toi_thieu = 15;
      this.input_bien_an_toan = 50;

      this.input_fcf_tren_moi_co_phieu = (
        this.data_original.fcf_ttm / this.data_original.so_luong_co_phieu
      ).toFixed(2);
      this.input_fcf_ttm = this.data_original.fcf_ttm;
    },
    getDataDefault() {
      this.is_show_modal_loading = true;
      axios
        .get(this.$apiAdress + "/api/stocks/margin_safety", {
          params: {
            mack: this.$store.state.mack,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          if (res.data.mack == this.$store.state.mack) {
            this.data_original.eps_ttm = res.data.eps_ttm;
            this.data_original.ty_le_tang_truong_tuong_lai =
              res.data.ty_le_tang_truong_tuong_lai;
            this.data_original.so_luong_co_phieu = res.data.so_luong_co_phieu;
            this.data_original.fcf_ttm = res.data.ocf_ttm + res.data.capex_ttm;
            this.data_original.ocf_ttm = res.data.ocf_ttm;
            this.data_original.capex_ttm = res.data.capex_ttm;
            this.data_original.bvps = res.data.bvps;
            this.data_original.tang_truong_bvps = res.data.tang_truong_bvps;
            this.data_original.pe_cao_nhat = res.data.pe_cao_nhat;
            this.data_original.pe_thap_nhat = res.data.pe_thap_nhat;
            if (this.is_loading_saved) {
              this.is_loading_saved = false;
            } else {
              this.resetDataInput();
            }
            // this.resetDataInput();
            this.calcData();
            this.is_show_modal_loading = false;
          }
        })
        .catch((err) => {
          console.error(err);
          this.is_show_modal_loading = false;
        });
    },
    f_thoi_gian_hoan_von_fcf() {
      let nam = 0;
      let fcf = this.input_fcf_tren_moi_co_phieu;
      let cong_don = this.input_fcf_tren_moi_co_phieu;
      if (this.input_ty_le_tang_truong_tuong_lai > 0) {
        while (true) {
          if (cong_don > this.price) {
            return nam;
          }
          if (nam > 100) {
            return 0;
          }
          nam++;
          fcf = fcf * (1 + this.input_ty_le_tang_truong_tuong_lai / 100);
          cong_don = parseFloat(cong_don) + parseFloat(fcf);
        }
      }
      return 0;
    },
    f_gia_tai_nam_muon_hoan_von_fcf() {
      let nam = 0;
      let fcf = this.input_fcf_tren_moi_co_phieu;
      let cong_don = 0;
      if (this.input_ty_le_tang_truong_tuong_lai > 0) {
        while (true) {
          if (nam == this.input_thoi_gian_muon_hoan_von_fcf) {
            return cong_don;
          }
          if (nam > 100) {
            return 0;
          }
          nam++;
          fcf = fcf * (1 + this.input_ty_le_tang_truong_tuong_lai / 100);
          cong_don = parseFloat(cong_don) + parseFloat(fcf);
        }
      }
      return 0;
    },
    f_thoi_gian_hoan_von_eps() {
      let nam = 0;
      let eps = this.input_eps_ttm;
      let cong_don = this.input_eps_ttm;
      if (this.input_ty_le_tang_truong_tuong_lai > 0) {
        while (true) {
          if (cong_don > this.price) {
            return nam;
          }
          if (nam > 100) {
            return 0;
          }
          nam++;
          eps = eps * (1 + this.input_ty_le_tang_truong_tuong_lai / 100);
          cong_don = parseFloat(cong_don) + parseFloat(eps);
        }
      }
      return 0;
    },
    f_gia_tai_nam_muon_hoan_von_eps() {
      let nam = 0;
      let eps = this.input_eps_ttm;
      let cong_don = 0;
      if (this.input_ty_le_tang_truong_tuong_lai > 0) {
        while (true) {
          if (nam == this.input_thoi_gian_muon_hoan_von_eps) {
            return cong_don;
          }
          if (nam > 100) {
            return 0;
          }
          nam++;
          eps = eps * (1 + this.input_ty_le_tang_truong_tuong_lai / 100);
          cong_don = parseFloat(cong_don) + parseFloat(eps);
        }
      }
      return 0;
    },
    calcData() {
      this.result_data.gia_tri_hien_tai =
        this.input_ty_le_tang_truong_tuong_lai < 0
          ? 0
          : this.pv(
              this.input_ty_le_sinh_loi_toi_thieu / 100,
              this.input_thoi_gian_dau_tu,
              0,
              -this.computed_gia_tri_tuong_lai,
              0
            );
      this.result_data.gia_bien_an_toan =
        this.result_data.gia_tri_hien_tai * (1 - this.input_bien_an_toan / 100);
      this.result_data.ty_suat_bien_an_toan =
        this.result_data.gia_bien_an_toan != 0
          ? (this.input_eps_ttm / this.result_data.gia_bien_an_toan) * 100
          : 0;
      this.result_data.thoi_gian_hoan_von_fcf = this.f_thoi_gian_hoan_von_fcf();
      this.result_data.gia_tai_nam_muon_hoan_von_fcf =
        this.f_gia_tai_nam_muon_hoan_von_fcf();
      this.result_data.thoi_gian_hoan_von_eps = this.f_thoi_gian_hoan_von_eps();
      this.result_data.gia_tai_nam_muon_hoan_von_eps =
        this.f_gia_tai_nam_muon_hoan_von_eps();
      switch (this.data_filter_type_safe_zone) {
        case "mos":
          this.result_data.vung_an_toan_xanh =
            this.result_data.gia_bien_an_toan;
          break;
        case "eps":
          this.result_data.vung_an_toan_xanh =
            this.result_data.gia_tai_nam_muon_hoan_von_eps;
          break;
        case "fcf":
          this.result_data.vung_an_toan_xanh =
            this.result_data.gia_tai_nam_muon_hoan_von_fcf;
          break;
        default:
          this.result_data.vung_an_toan_xanh =
            this.result_data.gia_bien_an_toan;
          break;
      }
      this.result_data.vung_bao_dong_do =
        this.result_data.gia_tri_hien_tai * 1.2;
      this.result_data.is_calculated = true;
    },
    handleButtonCalc() {
      this.is_show_modal_disclaimer = true;
      this.calcData();
    },
    handleButtonReset() {
      this.resetDataInput();
      this.calcData();
    },
    getDataOHLC() {
      this.data_o = [];
      this.data_h = [];
      this.data_l = [];
      this.data_c = [];
      this.data_t = [];
      const current_mack = this.$store.state.mack;
      const rangeStartDate = 1262332138;
      const rangeEndDate = Math.floor(Date.now() / 1000); // 1 tháng 1 năm 2010
      window.socket_send.emit(
        "gethistory",
        current_mack,
        "1D",
        rangeStartDate,
        rangeEndDate,
        (res) => {
          if (!res) return;
          if (Object.keys(res).length == 0) return;
          if (res.t.length > 0 && current_mack == this.$store.state.mack) {
            this.data_o = res.o;
            this.data_h = res.h;
            this.data_l = res.l;
            this.data_c = res.c;
            this.data_t = res.t;
          }
        }
      );
    },
    formatMoney(number, min, max) {
      let num_check = parseFloat(number);
      if (isNaN(num_check)) return number;
      return number.toLocaleString("en", {
        minimumFractionDigits: min,
        maximumFractionDigits: max,
      });
    },
    getLivePrice() {
      window.socket_send.emit("getlive", [this.$store.state.mack], (res) => {
        if (!res) return;
        if (Object.keys(res).length == 0) return;
        for (let i = 0; i < res["stockcode"].length; i++) {
          const stockcode = res["stockcode"][i];
          if (!this.$store.state.data_eod.hasOwnProperty(stockcode)) {
            this.$store.state.data_eod[stockcode] = {
              cl: "e",
              lastprice: 0,
              change: 0,
              perchange: 0,
              stockcode: stockcode,
              totalval: 0,
              totalvol: 0,
            };
          }
          this.$store.state.data_eod[stockcode].cl = res["cl"][i];
          this.$store.state.data_eod[stockcode].lastprice = res["lastprice"][i];
          this.$store.state.data_eod[stockcode].change =
            res["cl"][i] == "d" || res["cl"][i] == "f"
              ? -res["change"][i]
              : res["change"][i];
          this.$store.state.data_eod[stockcode].perchange =
            res["cl"][i] == "d" || res["cl"][i] == "f"
              ? -res["perchange"][i]
              : res["perchange"][i];
          this.$store.state.data_eod[stockcode].stockcode = res["stockcode"][i];
          this.$store.state.data_eod[stockcode].totalvol = res["totalvol"][i];
        }
      });
      window.socket_send.emit("join", [this.$store.state.mack]);
    },
    getList() {
      axios
        .get(this.$apiAdress + "/api/stocks/margin_safety/get-all", {
          params: {
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          this.item_table = res.data;
        })
        .catch((error) => {
          console.error(error);
          this.$toast.error("Có lỗi xảy ra, vui lòng thử lại");
        });
    },
    addNewRow() {
      for (const item of this.item_table) {
        if(item.label == this.value_add_new){
          this.$toast.error("Tên mẫu đã tồn tại");
          return;
        }
      }
      if (this.value_add_new == "") {
        this.$toast.error("Bạn cần nhập nội dung");
        return;
      } else if(!this.is_valid_data){
        this.$toast.error("Một số trường vừa nhập không hợp lệ");
        return;
      }
      else {
        axios
          .post(this.$apiAdress + "/api/stocks/margin_safety/store", {
            label: this.value_add_new,
            content: JSON.stringify(this.data_input),
            token: localStorage.getItem("api_token"),
          })
          .then((res) => {
            this.item_table.unshift({
              ...res.data,
              content: JSON.stringify(this.data_input),
            });
            this.selected_item = JSON.parse(JSON.stringify(this.item_table[0]));
            this.value_add_new = "";
            this.is_show_modal_add_new = false;
            this.$toast.success("Thêm mẫu mới thành công");
          })
          .catch((error) => {
            console.error(error);
            this.$toast.error("Có lỗi xảy ra, vui lòng thử lại");
          });
      }
    },
    saveRowItem(row, type = "save_content") {
      if (row.label == "") {
        this.$toast.error("Bạn cần nhập nội dung");
        return;
      }
      if(type == "save_name") {
        for (const item of this.item_table) {
          if(item.id != row.id){
            if(item.label == row.label){
              this.$toast.error("Tên mẫu đã tồn tại");
              return;
            }
          }else {
            if(item.label == this.current_label){
              this.$toast.error("Tên mẫu đã tồn tại");
              return;
            }
          }
        }
      }else{
        if(!this.is_valid_data){
          this.$toast.error("Một số trường vừa nhập không hợp lệ");
          return;
        }
      }
      axios
        .put(this.$apiAdress + "/api/stocks/margin_safety/update", {
          id: row.id,
          label: row.label,
          content: row.content,
          token: localStorage.getItem("api_token"),
        })
        .then((res) => {
          this.item_table.forEach((item, i) => {
            if (item.id == res.data.id) {
              this.item_table.splice(i, 1);
            }
          });
          if (row.id == this.selected_item.id) {
            this.selected_item = JSON.parse(JSON.stringify(row));
          }
          this.item_table.unshift({
            ...res.data,
            content: JSON.stringify(res.data.content),
          });
          this.current_id = -1;
          this.$toast.success("Cập nhật dữ liệu thành công");
        })
        .catch((error) => {
          console.error(error);
          this.$toast.error("Có lỗi xảy ra, vui lòng thử lại");
        });
    },
    deleteRowItem() {
      axios
        .delete(
          this.$apiAdress + "/api/stocks/margin_safety/" + this.id_delete,
          {
            params: {
              token: localStorage.getItem("api_token"),
            },
          }
        )
        .then(() => {
          this.item_table.forEach((item, i) => {
            if (this.id_delete == item.id) {
              this.item_table.splice(i, 1);
            }
          });
          if (this.id_delete == this.selected_item.id) {
            this.selected_item = {
              id: -1,
              label: "",
              content: {},
            };
          }
          this.is_show_modal_delete = false;
          this.$toast.success("Đã xóa thành công");
        })
        .catch((error) => {
          console.error(error);
          this.is_show_modal_delete = false;
          this.$toast.error("Có lỗi xảy ra, vui lòng thử lại");
        });
    },
    loadItem(item) {
      this.selected_item = item;
      item = JSON.parse(item.content);
      this.is_show_modal_list_data = false;
      this.input_eps_ttm = item.input_eps_ttm;
      this.input_ty_le_tang_truong_tuong_lai =
        item.input_ty_le_tang_truong_tuong_lai;
      this.input_thoi_gian_dau_tu = item.input_thoi_gian_dau_tu;
      this.input_pe_tuong_lai = item.input_pe_tuong_lai;
      this.input_ty_le_sinh_loi_toi_thieu = item.input_ty_le_sinh_loi_toi_thieu;
      this.input_bien_an_toan = item.input_bien_an_toan;
      this.input_fcf_tren_moi_co_phieu = item.input_fcf_tren_moi_co_phieu;
      this.input_fcf_ttm = item.input_fcf_ttm;
      this.input_thoi_gian_muon_hoan_von_fcf =
        item.input_thoi_gian_muon_hoan_von_fcf;
      this.input_thoi_gian_muon_hoan_von_eps =
        item.input_thoi_gian_muon_hoan_von_eps;
      this.data_filter_type_safe_zone = item.data_filter_type_safe_zone;
      this.is_loading_saved = true;
      this.$store.state.mack = item.mack;
    },
    handleSaveClick() {
      if (this.selected_item.id != -1) {
        const item = {
          ...this.selected_item,
          content: this.data_input,
        };
        this.saveRowItem(item);
      } else {
        this.is_show_modal_add_new = true;
      }
    },
    deselectItem() {
      this.selected_item = {
        id: -1,
        label: "",
        content: {},
      };
    },
  },
  computed: {
    price() {
      return this.$store.state.data_eod.hasOwnProperty(this.$store.state.mack)
        ? parseFloat(
            this.$store.state.data_eod[this.$store.state.mack].lastprice
          )
        : 0;
    },
    computed_eps_tuong_lai() {
      return this.fv(
        this.input_ty_le_tang_truong_tuong_lai / 100,
        this.input_thoi_gian_dau_tu,
        0,
        -this.input_eps_ttm,
        0
      );
    },
    computed_gia_tri_tuong_lai() {
      return this.computed_eps_tuong_lai * this.input_pe_tuong_lai;
    },
    computed_fcf_ratio() {
      return this.input_eps_ttm != 0
        ? this.input_fcf_tren_moi_co_phieu / this.input_eps_ttm
        : 0;
    },
    pe_hien_tai() {
      return this.input_eps_ttm != 0 ? this.price / this.input_eps_ttm : 0;
    },
    peg_hien_tai() {
      return this.input_ty_le_tang_truong_tuong_lai != 0
        ? this.pe_hien_tai / this.input_ty_le_tang_truong_tuong_lai
        : 0;
    },
    pb() {
      return this.data_original.bvps != 0
        ? this.price / this.data_original.bvps
        : 0;
    },
    option_chart() {
      let list_date = [];
      let data_line = [];
      let data_ohlc = [];
      let data_markline = {};
      if (this.data_t.length > 0 && this.result_data.is_calculated) {
        for (let i = 0; i < this.data_t.length; i++) {
          // let date = parseInt(this.data_t[i]);
          // date = new Date((date + 7 * 3600) * 1000);
          // let time = date.toISOString().slice(0, 19).replace("T", " ");
          list_date.push(this.data_t[i]);
          // data_ohlc.push([
          //   this.data_o[i],
          //   this.data_c[i],
          //   this.data_h[i],
          //   this.data_l[i],
          // ]);
          data_line.push([this.data_t[i], parseFloat(this.data_eod[i])]);
        }
        const last_date = Date.parse(this.data_t[this.data_t.length - 1]);
        for (let i = 1; i <= 500; i++) {
          list_date.push(moment(last_date).add("days", i).format("YYYY-MM-DD"));
        }
        data_markline = {
          data: [
            {
              itemStyle: {
                color: "#be00be",
              },
              yAxis: this.result_data.gia_tri_hien_tai,
            },
          ],
          lineStyle: {
            type: "solid",
            width: 2,
          },
          label: {
            position: "insideEndTop",
            formatter: (params) => {
              return this.formatMoney(params.value, 0, 2);
            },
          },
        };
      }
      return {
        title: {
          show: false,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            animation: false,
            type: "cross",
            lineStyle: {
              opacity: 1,
            },
          },
        },
        grid: {
          top: "10%",
          bottom: "5%",
          left: "10px",
          right: "80px",
        },
        dataZoom: [
          {
            show: false,
            type: "inside",
          },
        ],
        xAxis: {
          data: list_date,
          type: "category",
          axisLabel: {
            formatter: function (value) {
              return value.slice(0, 7);
            },
          },
        },
        yAxis: [
          {
            scale: true,
            splitArea: {
              show: false,
              areaStyle: {
                color: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"],
              },
            },
            splitLine: {
              lineStyle: {
                type: "dashed",
                color: "rgba(100, 100, 100, 0.2)",
                width: 1,
              },
              show: true,
            },
            axisTick: {
              show: false,
              inside: false,
              length: 5,
              lineStyle: { width: 1 },
            },
            axisLine: {
              show: false,
              onZero: true,
              onZeroAxisIndex: null,
              lineStyle: { color: "#333", width: 1, type: "solid" },
              symbol: ["none", "none"],
              symbolSize: [10, 15],
            },
            boundaryGap: [0, 0],
            splitNumber: 5,
            minorTick: {
              show: false,
              splitNumber: 5,
              length: 3,
              lineStyle: {},
            },
            minorSplitLine: {
              show: false,
              lineStyle: { color: "#eee", width: 1 },
            },
            show: true,
            zlevel: 0,
            z: 0,
            inverse: false,
            position: "right",
            name: "",
            nameLocation: "end",
            nameRotate: null,
            nameTruncate: { maxWidth: null, ellipsis: "...", placeholder: "." },
            nameTextStyle: {},
            nameGap: 15,
            silent: false,
            triggerEvent: false,
            tooltip: { show: true },
            axisPointer: {},
            axisLabel: {
              show: true,
              inside: false,
              rotate: 0,
              showMinLabel: null,
              showMaxLabel: null,
              fontSize: 12,
              formatter: function (value) {
                return value / 1000;
              },
            },
            offset: 0,
            type: "value",
            rangeEnd: null,
            rangeStart: null,
          },
        ],
        series: [
          {
            type: "line",
            smooth: false,
            symbol: "none",
            markArea: {
              data: [
                [
                  {
                    itemStyle: {
                      color: "#EF5350",
                      opacity: 0.3,
                    },
                    yAxis: this.result_data.vung_bao_dong_do,
                  },
                  {
                    itemStyle: {
                      color: "#EF5350",
                      opacity: 0.3,
                    },
                    yAxis: this.result_data.vung_bao_dong_do * 1000000,
                  },
                ],
                [
                  {
                    itemStyle: {
                      color: "rgb(46, 184, 92)",
                      opacity: 0.3,
                    },
                    yAxis: 0,
                  },
                  {
                    itemStyle: {
                      color: "rgb(46, 184, 92)",
                      opacity: 0.3,
                    },
                    yAxis: this.result_data.vung_an_toan_xanh,
                  },
                ],
              ],
            },
            markLine: data_markline,
            data: data_line,
          },
          // {
          //   type: "candlestick",
          //   data: data_ohlc,
          //   silent: true,
          //   legendHoverLink: false,
          //   hoverAnimation: false,
          //   itemStyle: {
          //     color: "#EF5350",
          //     color0: "#26A69A",
          //     borderColor: "#EF5350",
          //     borderColor0: "#26A69A",
          //     borderWidth: 1,
          //   },
          //   markLine: {
          //     symbol: ["none", "none"],
          //     silent: true,
          //     data: [],
          //     label: {},
          //     emphasis: { label: {} },
          //   },
          //   markArea: {
          //     data: [
          //       [
          //         {
          //           itemStyle: {
          //             color: "#EF5350",
          //             opacity: 0.3,
          //           },
          //           yAxis: 52,
          //         },
          //         {
          //           itemStyle: {
          //             color: "#EF5350",
          //             opacity: 0.3,
          //           },
          //           yAxis: 57,
          //         },
          //       ],
          //       [
          //         {
          //           itemStyle: {
          //             color: "#26A69A",
          //             opacity: 0.3,
          //           },
          //           yAxis: 45,
          //         },
          //         {
          //           itemStyle: {
          //             color: "#26A69A",
          //             opacity: 0.3,
          //           },
          //           yAxis: 48,
          //         },
          //       ],
          //     ],
          //   },
          //   zlevel: 0,
          //   z: 2,
          //   coordinateSystem: "cartesian2d",
          //   layout: "horizontal",
          //   clip: true,
          //   emphasis: { itemStyle: { borderWidth: 2 }, label: {} },
          //   barMaxWidth: null,
          //   barMinWidth: null,
          //   barWidth: null,
          //   large: true,
          //   largeThreshold: 600,
          //   progressive: 3000,
          //   progressiveThreshold: 10000,
          //   progressiveChunkMode: "mod",
          //   animationUpdate: false,
          //   animationEasing: "linear",
          //   animationDuration: 300,
          //   label: {},
          // },
        ],
      };
    },
    data_input() {
      return {
        mack: this.$store.state.mack,
        input_eps_ttm: this.input_eps_ttm,
        input_ty_le_tang_truong_tuong_lai:
          this.input_ty_le_tang_truong_tuong_lai,
        input_thoi_gian_dau_tu: this.input_thoi_gian_dau_tu,
        input_pe_tuong_lai: this.input_pe_tuong_lai,
        input_ty_le_sinh_loi_toi_thieu: this.input_ty_le_sinh_loi_toi_thieu,
        input_bien_an_toan: this.input_bien_an_toan,
        input_fcf_tren_moi_co_phieu: this.input_fcf_tren_moi_co_phieu,
        input_fcf_ttm: this.input_fcf_ttm,
        input_thoi_gian_muon_hoan_von_fcf:
          this.input_thoi_gian_muon_hoan_von_fcf,
        input_thoi_gian_muon_hoan_von_eps:
          this.input_thoi_gian_muon_hoan_von_eps,
        data_filter_type_safe_zone: this.data_filter_type_safe_zone,
      };
    },
    is_valid_data() {
      if (!this.$store.state.data_eod.hasOwnProperty(this.mack)) {
        return false;
      }
      if (
        this.$v.input_eps_ttm.$error ||
        this.$v.input_ty_le_tang_truong_tuong_lai.$error ||
        this.$v.input_thoi_gian_dau_tu.$error ||
        this.$v.input_pe_tuong_lai.$error ||
        this.$v.input_ty_le_sinh_loi_toi_thieu.$error ||
        this.$v.input_fcf_tren_moi_co_phieu.$error
      ) {
        return false;
      }
      switch (this.data_filter_type_safe_zone) {
        case "mos":
          if(this.$v.input_bien_an_toan.$error){
            return false;
          }
          break;
        case "fcf":
          if(this.$v.input_thoi_gian_muon_hoan_von_fcf.$error){
            return false;
          }
          break;
        case "eps":
          if(this.$v.input_thoi_gian_muon_hoan_von_eps.$error){
            return false;
          }
          break;
        default:
          break;
      }
      return true;
    },
  },
  watch: {
    "$store.state.mack": function () {
      this.mackChange();
    },
    input_eps_ttm() {
      this.$v.input_eps_ttm.$touch();
    },
    input_ty_le_tang_truong_tuong_lai() {
      this.$v.input_ty_le_tang_truong_tuong_lai.$touch();
    },
    input_thoi_gian_dau_tu() {
      this.$v.input_thoi_gian_dau_tu.$touch();
    },
    input_pe_tuong_lai() {
      this.$v.input_pe_tuong_lai.$touch();
    },
    input_ty_le_sinh_loi_toi_thieu() {
      this.$v.input_ty_le_sinh_loi_toi_thieu.$touch();
    },
    input_bien_an_toan() {
      this.$v.input_bien_an_toan.$touch();
    },
    input_fcf_tren_moi_co_phieu() {
      this.$v.input_fcf_tren_moi_co_phieu.$touch();
    },
    input_thoi_gian_muon_hoan_von_fcf() {
      this.$v.input_thoi_gian_muon_hoan_von_fcf.$touch();
    },
    input_thoi_gian_muon_hoan_von_eps() {
      this.$v.input_thoi_gian_muon_hoan_von_eps.$touch();
    },
  },
};
</script>
<style lang="scss">
.custom-control {
  margin-bottom: 1rem;
}
.custom-control-input {
  cursor: pointer;
}
.custom-control-label {
  cursor: pointer;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
