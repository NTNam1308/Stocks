<template>
  <div>
    <p class="h1 text-center">Xếp hạng cổ phiếu</p>
    <CCard>
      <CCardBody>
        <CElementCover
          :opacity="1"
          v-if="is_loading_data"
          :style="
            $store.state.darkMode
              ? { 'background-color': 'fff' }
              : { 'background-color': '000' }
          "
          ><CSpinner size="5xl" color="success" />
        </CElementCover>
        <p class="text-center h3 mb-0">Bảng phân hạng</p>
        <CRow class="mt-3">
          <CCol sm="1">
            <CInput
              label="Mã CK"
              placeholder="Nhập mã"
              v-model="filter_mack_value"
            />
          </CCol>
          <CCol sm="2">
            <div
              style="position: relative"
              v-bind:class="{ show: openSuggestionDepartment }"
            >
              <CInput
                v-model="filter_department_value"
                label="Ngành nghề"
                prependHtml="<i class='cui-user'></i>"
                placeholder="Nhập ngành nghề"
                @keydown.enter="enterDepartment"
                @keydown.down="downDepartment"
                @keydown.up="upDepartment"
                @input="changeDepartment"
                @focus="focusInputDepartment"
                @blur="focusoutInputDepartment"
                class="mb-1"
              />
              <CListGroup
                v-if="openSuggestionDepartment"
                class="dropdown-menu pb-0 pt-0 overflow-auto"
                :class="{ show: openDepartment }"
                style="width: 150%; max-height: 400px; overflow-x: hidden"
              >
                <CListGroupItem
                  @mouseover="is_hover_dropdown = true"
                  @mouseleave="is_hover_dropdown = false"
                  href="#"
                  v-for="(item, index) in suggestionsDepartment"
                  :key="index"
                  @click="suggestionClickDepartment(index)"
                  :class="{ active: isActiveDepartment(index) }"
                  class="pt-2 pb-2 mb-0"
                  >{{ item }}
                </CListGroupItem>
              </CListGroup>
            </div>
          </CCol>
          <CCol sm="3">
            <CInput
              v-if="filter_expression_point_value != 'range'"
              :label="'Điểm ' + label_quarter_0"
              placeholder="Nhập điểm."
              v-model="filter_point_value"
            >
              <template #prepend>
                <CSelect
                  :value.sync="filter_expression_point_value"
                  :options="option_filter_expression"
                />
              </template>
            </CInput>
            <CInput
              v-else
              :label="'Điểm ' + label_quarter_0"
              placeholder="Nhập khoảng. VD: 0-100"
              v-model="filter_point_range"
            >
              <template #prepend>
                <CSelect
                  :value.sync="filter_expression_point_value"
                  :options="option_filter_expression"
                />
              </template>
            </CInput>
          </CCol>
          <CCol sm="3">
            <CInput
              v-if="filter_expression_delta_point_value != 'range'"
              :label="
                'Delta Điểm ' + label_quarter_0 + ' vs ' + label_quarter_1
              "
              placeholder="Nhập điểm."
              v-model="filter_delta_point_value"
            >
              <template #prepend>
                <CSelect
                  :value.sync="filter_expression_delta_point_value"
                  :options="option_filter_expression"
                />
              </template>
            </CInput>
            <CInput
              v-else
              :label="
                'Delta Điểm ' + label_quarter_0 + ' vs ' + label_quarter_1
              "
              placeholder="Nhập khoảng. VD: 0-100"
              v-model="filter_delta_point_range"
            >
              <template #prepend>
                <CSelect
                  :value.sync="filter_expression_delta_point_value"
                  :options="option_filter_expression"
                />
              </template>
            </CInput>
          </CCol>
          <CCol sm="3">
            <div
              role="group"
              class="form-group"
              v-if="filter_expression_total_vol_value != 'range'"
            >
              <label for="uid-ib2846w05zz" class="">
                KL TB 50 phiên gần nhất
              </label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <CSelect
                    :value.sync="filter_expression_total_vol_value"
                    :options="option_filter_expression"
                  />
                </div>
                <input
                  id="uid-ib2846w05zz"
                  @change="handleVolumeMaskChange()"
                  v-money="money"
                  placeholder="Nhập số lượng."
                  v-model="volume_mask"
                  class="form-control"
                />
              </div>
            </div>
            <CInput
              v-else
              label="KL TB 50 phiên gần nhất"
              placeholder="Nhập khoảng. VD: 0-100"
              v-model="filter_total_vol_range"
            >
              <template #prepend>
                <CSelect
                  :value.sync="filter_expression_total_vol_value"
                  :options="option_filter_expression"
                />
              </template>
            </CInput>
          </CCol>
        </CRow>
        <CDataTable
          v-if="!is_loading_data"
          :itemsPerPage="20"
          :items="item_table_main"
          hover
          sorter
          striped
          bordered
          small
          fixed
          :fields="fieldsTable"
          pagination
          class="table-nopadding"
        >
          <template #no-items-view>
            <p class="text-center h5 mt-3">Không có dữ liệu</p>
          </template>
          <template #avg-header>
            <div>
              <p style="white-space: nowrap; margin-bottom: 0">Khối lượng TB</p>
              <p style="white-space: nowrap">50 phiên gần nhất</p>
            </div>
          </template>
          <template #diem_0-header>
            <div>
              <p style="white-space: nowrap; margin-bottom: 0">Điểm</p>
              <p style="white-space: nowrap">{{ label_quarter_0 }}</p>
            </div>
          </template>
          <template #diem_1-header>
            <div>
              <p style="white-space: nowrap; margin-bottom: 0">Điểm</p>
              <p style="white-space: nowrap">{{label_quarter_1}}</p>
            </div>
          </template>
          <template #diem_2-header>
            <div>
              <p style="white-space: nowrap; margin-bottom: 0">Điểm</p>
              <p style="white-space: nowrap">{{label_quarter_2}}</p>
            </div>
          </template>
          <template #rank_0-header>
            <div>
              <p style="white-space: nowrap; margin-bottom: 0">Rank</p>
              <p style="white-space: nowrap">{{label_quarter_0}}</p>
            </div>
          </template>
          <template #rank_1-header>
            <div>
              <p style="white-space: nowrap; margin-bottom: 0">Rank</p>
              <p style="white-space: nowrap">{{label_quarter_1}}</p>
            </div>
          </template>
          <template #rank_2-header>
            <div>
              <p style="white-space: nowrap; margin-bottom: 0">Rank</p>
              <p style="white-space: nowrap">{{label_quarter_2}}</p>
            </div>
          </template>
          <template #deltarank_1-header>
            <div>
              <p style="white-space: nowrap; margin-bottom: 0">Δ Rank</p>
              <p style="white-space: nowrap">{{label_quarter_0}} vs {{label_quarter_1}}</p>
            </div>
          </template>
          <template #deltarank_2-header>
            <div>
              <p style="white-space: nowrap; margin-bottom: 0">Δ Rank</p>
              <p style="white-space: nowrap">{{label_quarter_1}} vs {{label_quarter_2}}</p>
            </div>
          </template>
          <template #deltadiem_1-header>
            <div>
              <p style="white-space: nowrap; margin-bottom: 0">Δ Điểm</p>
              <p style="white-space: nowrap">{{label_quarter_0}} vs {{label_quarter_1}}</p>
            </div>
          </template>
          <template #deltadiem_2-header>
            <div>
              <p style="white-space: nowrap; margin-bottom: 0">Δ Điểm</p>
              <p style="white-space: nowrap">{{label_quarter_1}} vs {{label_quarter_2}}</p>
            </div>
          </template>
          <template #mack="{ item }">
            <td class="py-1">
              <div class="d-flex justify-content-between">
                <CLink
                  @click="getInfo(item.mack)"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  :title="item.ten_cong_ty"
                  class="pl-3"
                  ><b>{{ item.mack }}</b></CLink
                >
                <CDropdown
                  placement="bottom-start"
                  add-menu-classes="pt-0 pb-2"
                >
                  <template #toggler>
                    <div class="tooltip-add">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="bi bi-file-earmark-plus"
                        :style="
                          $store.state.darkMode
                            ? { color: '#7267d3' }
                            : { color: '#321fdb' }
                        "
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z"
                        />
                        <path
                          d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"
                        />
                      </svg>
                      <span class="tooltiptext-add">Thêm vào Watchlist</span>
                    </div>
                  </template>
                  <CSelect
                    class="px-1 m-0 pt-2"
                    :options="option_filter_category"
                    :value.sync="list_data_model_add.current_my_watchlist_id"
                  >
                  </CSelect>
                  <div class="px-1">
                    <div class="bg-success border-radius-3">
                      <CDropdownItem
                        class="mt-1 py-2 hover-button-mack text-white"
                        @click="addNewWatchlist(item.mack)"
                      >
                        <CIcon name="cibAddthis" />
                        <span class="pl-4">Thêm</span>
                      </CDropdownItem>
                    </div>
                  </div>
                </CDropdown>
              </div>
            </td>
          </template>
          <template #avg="{ item }">
            <td class="py-1 border-left text-center">
              {{
                parseFloat(item.avg).toLocaleString("en", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })
              }}
            </td>
          </template>
          <template #rank_0="{ item }">
            <td
              @mouseover="current_position = 0"
              @mouseleave="current_position = -1"
              class="border-left"
              :class="{
                bghover: current_position == 0,
              }"
            >
              {{ item.rank_0 }}
            </td>
          </template>
          <template #rank_1="{ item }">
            <td
              @mouseover="current_position = 1"
              @mouseleave="current_position = -1"
              :class="{
                bghover: current_position == 1,
              }"
            >
              {{ item.rank_1 }}
            </td>
          </template>
          <template #rank_2="{ item }">
            <td
              @mouseover="current_position = 2"
              @mouseleave="current_position = -1"
              :class="{
                bghover: current_position == 2,
              }"
            >
              {{ item.rank_2 }}
            </td>
          </template>
          <template #diem_0="{ item }">
            <td
              @mouseover="current_position = 0"
              @mouseleave="current_position = -1"
              class="border-left"
              :class="{
                bghover: current_position == 0,
              }"
            >
              {{ item.diem_0 }}
            </td>
          </template>
          <template #diem_1="{ item }">
            <td
              @mouseover="current_position = 1"
              @mouseleave="current_position = -1"
              :class="{
                bghover: current_position == 1,
              }"
            >
              {{ item.diem_1 }}
            </td>
          </template>
          <template #diem_2="{ item }">
            <td
              @mouseover="current_position = 2"
              @mouseleave="current_position = -1"
              :class="{
                bghover: current_position == 2,
              }"
            >
              {{ item.diem_2 }}
            </td>
          </template>
          <template #deltarank_1="{ item }">
            <td
              @mouseover="current_position = 0"
              @mouseleave="current_position = -1"
              class="border-left"
              :class="{
                bghover: current_position == 0,
              }"
            >
              {{ item.deltarank_1 }}
            </td>
          </template>
          <template #deltarank_2="{ item }">
            <td
              @mouseover="current_position = 1"
              @mouseleave="current_position = -1"
              :class="{
                bghover: current_position == 1,
              }"
            >
              {{ item.deltarank_2 }}
            </td>
          </template>
          <template #deltadiem_1="{ item }">
            <td
              @mouseover="current_position = 0"
              @mouseleave="current_position = -1"
              :class="{
                bghover: current_position == 0,
              }"
            >
              {{ item.deltadiem_1 }}
            </td>
          </template>
          <template #deltadiem_2="{ item }">
            <td
              @mouseover="current_position = 1"
              @mouseleave="current_position = -1"
              :class="{
                bghover: current_position == 1,
              }"
            >
              {{ item.deltadiem_2 }}
            </td>
          </template>
        </CDataTable>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardBody>
        <CElementCover
          :opacity="1"
          v-if="is_loading_data"
          :style="
            $store.state.darkMode
              ? { 'background-color': 'fff' }
              : { 'background-color': '000' }
          "
          ><CSpinner size="5xl" color="success" />
        </CElementCover>
        <p class="text-center h3 mb-0">Biểu đồ</p>
        <CRow>
          <CCol sm="12">
            <CButton
              @click="is_show_modal = true"
              class="float-right"
              color="primary"
              ><CIcon name="cilFilter" /> Chọn mã</CButton
            >
          </CCol>
          <CCol sm="5">
            <p class="mb-3 text-center font-weight-bold h4">Bảng Δ điểm</p>
            <CDataTable
              v-if="!is_loading_data"
              :itemsPerPage="6"
              :items="items_table_delta"
              hover
              sorter
              striped
              bordered
              small
              fixed
              :fields="fields_table_chart"
              pagination
              class="table-nopadding"
            >
              <template #no-items-view>
                <p class="text-center h5 mt-3">Không có dữ liệu</p>
              </template>
              <template #mack="{ item }">
                <td class="py-1">
                  <div class="d-flex justify-content-between">
                    <CLink
                      @click="getInfo(item.mack)"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      :title="item.ten_cong_ty"
                      class="pl-3"
                      ><b>{{ item.mack }}</b></CLink
                    >
                    <CDropdown
                      placement="bottom-start"
                      add-menu-classes="pt-0 pb-2"
                    >
                      <template #toggler>
                        <div class="tooltip-add">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-file-earmark-plus"
                            :style="
                              $store.state.darkMode
                                ? { color: '#7267d3' }
                                : { color: '#321fdb' }
                            "
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z"
                            />
                            <path
                              d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"
                            />
                          </svg>
                          <span class="tooltiptext-add"
                            >Thêm vào Watchlist</span
                          >
                        </div>
                      </template>
                      <CSelect
                        class="px-1 m-0 pt-2"
                        :options="option_filter_category"
                        :value.sync="
                          list_data_model_add.current_my_watchlist_id
                        "
                      >
                      </CSelect>
                      <div class="px-1">
                        <div class="bg-success border-radius-3">
                          <CDropdownItem
                            class="mt-1 py-2 hover-button-mack text-white"
                            @click="addNewWatchlist(item.mack)"
                          >
                            <CIcon name="cibAddthis" />
                            <span class="pl-4">Thêm</span>
                          </CDropdownItem>
                        </div>
                      </div>
                    </CDropdown>
                  </div>
                </td>
              </template>
              <template #time_0="{ item }">
                <td
                  @mouseover="current_position_delta_point = 0"
                  @mouseleave="current_position_delta_point = -1"
                  :class="{
                    bghover: current_position_delta_point == 0,
                  }"
                >
                  {{ item.time_0 }}
                </td>
              </template>
              <template #time_1="{ item }">
                <td
                  @mouseover="current_position_delta_point = 1"
                  @mouseleave="current_position_delta_point = -1"
                  :class="{
                    bghover: current_position_delta_point == 1,
                  }"
                >
                  {{ item.time_1 }}
                </td>
              </template>
              <template #time_2="{ item }">
                <td
                  @mouseover="current_position_delta_point = 2"
                  @mouseleave="current_position_delta_point = -1"
                  :class="{
                    bghover: current_position_delta_point == 2,
                  }"
                >
                  {{ item.time_2 }}
                </td>
              </template>
              <template #time_3="{ item }">
                <td
                  @mouseover="current_position_delta_point = 3"
                  @mouseleave="current_position_delta_point = -1"
                  :class="{
                    bghover: current_position_delta_point == 3,
                  }"
                >
                  {{ item.time_3 }}
                </td>
              </template>
              <template #time_4="{ item }">
                <td
                  @mouseover="current_position_delta_point = 0"
                  @mouseleave="current_position_delta_point = -1"
                  :class="{
                    bghover: current_position_delta_point == 0,
                  }"
                >
                  {{ item.time_4 }}
                </td>
              </template>
              <template #time_5="{ item }">
                <td
                  @mouseover="current_position_delta_point = 1"
                  @mouseleave="current_position_delta_point = -1"
                  :class="{
                    bghover: current_position_delta_point == 1,
                  }"
                >
                  {{ item.time_5 }}
                </td>
              </template>
              <template #time_6="{ item }">
                <td
                  @mouseover="current_position_delta_point = 2"
                  @mouseleave="current_position_delta_point = -1"
                  :class="{
                    bghover: current_position_delta_point == 2,
                  }"
                >
                  {{ item.time_6 }}
                </td>
              </template>
              <template #time_7="{ item }">
                <td
                  @mouseover="current_position_delta_point = 3"
                  @mouseleave="current_position_delta_point = -1"
                  :class="{
                    bghover: current_position_delta_point == 3,
                  }"
                >
                  {{ item.time_7 }}
                </td>
              </template>
            </CDataTable>
          </CCol>
          <CCol sm="7">
            <CustomEChart :option="option_chart_delta" style="height: 350px" />
          </CCol>
        </CRow>
        <CRow class="mt-2 pt-2">
          <CCol sm="5">
            <p class="mb-3 text-center font-weight-bold h4">Bảng điểm</p>
            <CDataTable
              v-if="!is_loading_data"
              :itemsPerPage="6"
              :items="items_table_point"
              hover
              sorter
              striped
              bordered
              small
              fixed
              :fields="fields_table_chart"
              pagination
              class="table-nopadding"
            >
              <template #no-items-view>
                <p class="text-center h5 mt-3">Không có dữ liệu</p>
              </template>
              <template #mack="{ item }">
                <td class="py-1">
                  <div class="d-flex justify-content-between">
                    <CLink
                      @click="getInfo(item.mack)"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      :title="item.ten_cong_ty"
                      class="pl-3"
                      ><b>{{ item.mack }}</b></CLink
                    >
                    <CDropdown
                      placement="bottom-start"
                      add-menu-classes="pt-0 pb-2"
                    >
                      <template #toggler>
                        <div class="tooltip-add">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-file-earmark-plus"
                            :style="
                              $store.state.darkMode
                                ? { color: '#7267d3' }
                                : { color: '#321fdb' }
                            "
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z"
                            />
                            <path
                              d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"
                            />
                          </svg>
                          <span class="tooltiptext-add"
                            >Thêm vào Watchlist</span
                          >
                        </div>
                      </template>
                      <CSelect
                        class="px-1 m-0 pt-2"
                        :options="option_filter_category"
                        :value.sync="
                          list_data_model_add.current_my_watchlist_id
                        "
                      >
                      </CSelect>
                      <div class="px-1">
                        <div class="bg-success border-radius-3">
                          <CDropdownItem
                            class="mt-1 py-2 hover-button-mack text-white"
                            @click="addNewWatchlist(item.mack)"
                          >
                            <CIcon name="cibAddthis" />
                            <span class="pl-4">Thêm</span>
                          </CDropdownItem>
                        </div>
                      </div>
                    </CDropdown>
                  </div>
                </td>
              </template>
              <template #time_0="{ item }">
                <td
                  @mouseover="current_position_point = 0"
                  @mouseleave="current_position_point = -1"
                  :class="{
                    bghover: current_position_point == 0,
                  }"
                >
                  {{ item.time_0 }}
                </td>
              </template>
              <template #time_1="{ item }">
                <td
                  @mouseover="current_position_point = 1"
                  @mouseleave="current_position_point = -1"
                  :class="{
                    bghover: current_position_point == 1,
                  }"
                >
                  {{ item.time_1 }}
                </td>
              </template>
              <template #time_2="{ item }">
                <td
                  @mouseover="current_position_point = 2"
                  @mouseleave="current_position_point = -1"
                  :class="{
                    bghover: current_position_point == 2,
                  }"
                >
                  {{ item.time_2 }}
                </td>
              </template>
              <template #time_3="{ item }">
                <td
                  @mouseover="current_position_point = 3"
                  @mouseleave="current_position_point = -1"
                  :class="{
                    bghover: current_position_point == 3,
                  }"
                >
                  {{ item.time_3 }}
                </td>
              </template>
              <template #time_4="{ item }">
                <td
                  @mouseover="current_position_point = 0"
                  @mouseleave="current_position_point = -1"
                  :class="{
                    bghover: current_position_point == 0,
                  }"
                >
                  {{ item.time_4 }}
                </td>
              </template>
              <template #time_5="{ item }">
                <td
                  @mouseover="current_position_point = 1"
                  @mouseleave="current_position_point = -1"
                  :class="{
                    bghover: current_position_point == 1,
                  }"
                >
                  {{ item.time_5 }}
                </td>
              </template>
              <template #time_6="{ item }">
                <td
                  @mouseover="current_position_point = 2"
                  @mouseleave="current_position_point = -1"
                  :class="{
                    bghover: current_position_point == 2,
                  }"
                >
                  {{ item.time_6 }}
                </td>
              </template>
              <template #time_7="{ item }">
                <td
                  @mouseover="current_position_point = 3"
                  @mouseleave="current_position_point = -1"
                  :class="{
                    bghover: current_position_point == 3,
                  }"
                >
                  {{ item.time_7 }}
                </td>
              </template>
            </CDataTable>
          </CCol>
          <CCol sm="7">
            <CustomEChart :option="option_chart_point" style="height: 350px" />
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
    <CModal title="Nhập dữ liệu" :show.sync="is_show_modal" size="lg">
      <template #footer>
        <CButton color="secondary" @click="is_show_modal = false">Đóng</CButton>
        <CButton color="primary" @click="getDataChart"
          ><CIcon name="cilSave" /> Lưu
        </CButton>
      </template>
      <CRow>
        <CCol sm="4">
          <CInput
            placeholder="Thêm mã vào danh sách"
            label="Mã mack"
            v-model="mack_insert"
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
              class="px-0"
              v-for="(item, index) in suggestions"
              :key="index"
              @click="suggestionClick(index)"
              :class="{ active: isActive(index) }"
            >
              <table style="width: 100%">
                <tr>
                  <td class="font-weight-bold pl-2" style="width: 20%">
                    {{ item.mack }}
                  </td>
                  <td class="pr-2">{{ item.ten_cong_ty }}</td>
                </tr>
              </table>
            </CListGroupItem>
          </CListGroup>
        </CCol>
      </CRow>
      <p>Danh sách mã</p>
      <CListGroup>
        <draggable
          v-model="list_mack_selected"
          @start="drag = true"
          @end="drag = false"
        >
          <CListGroupItem
            href="#"
            v-for="(mack, index) in list_mack_selected"
            :key="index"
            class="px-0"
          >
            <table style="width: 100%">
              <tr>
                <td class="font-weight-bold pl-2 py-2" style="width: 10%">
                  <CIcon name="cilMove" class="handle" />
                </td>
                <td class="font-weight-bold" style="width: 30%">
                  {{ mack }}
                </td>
                <td>
                  {{
                    $store.state.list_mack_company.hasOwnProperty(mack)
                      ? $store.state.list_mack_company[mack].ten_cong_ty
                      : ""
                  }}
                </td>
                <td
                  class="font-weight-bold pr-2"
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
  </div>
</template>
<script>
import axios from "axios";
import CustomEChart from "@/views/charts/CustomEchart";
import draggable from "vuedraggable";

export default {
  name: "Top400Stock",
  data() {
    return {
      mack_insert: "",
      list_mack_selected: [],
      fieldsTable: [
        {
          key: "mack",
          label: "Mã CK",
          _style: "text-align: center",
        },
        {
          key: "nganh",
          label: "Ngành",
          _style: "text-align: center",
        },
        {
          key: "rank_0",
          label: "Rank Q3 2021",
          _style: "text-align: center",
          _classes: "border-left",
          type: Number,
        },
        {
          key: "rank_1",
          label: "Rank Q2 2021",
          _style: "text-align: center",
          type: Number,
        },
        {
          key: "rank_2",
          label: "Rank Q1 2021",
          _style: "text-align: center",
          type: Number,
        },
        {
          key: "diem_0",
          label: "Điểm Q3 2021",
          _style: "text-align: center",
          _classes: "border-left",
          type: Number,
        },
        {
          key: "diem_1",
          label: "Điểm Q2 2021",
          _style: "text-align: center",
          type: Number,
        },
        {
          key: "diem_2",
          label: "Điểm Q1 2021",
          _style: "text-align: center",
          type: Number,
        },
        {
          key: "deltarank_1",
          label: "Δ Rank Q3 2021 vs Q2 2021",
          _style: "text-align: center",
          _classes: "border-left",
          type: Number,
        },
        {
          key: "deltarank_2",
          label: "Δ Rank Q2 2021 vs Q1 2021",
          _style: "text-align: center",
          type: Number,
        },
        {
          key: "deltadiem_1",
          label: "Δ Điểm Q3 2021 vs Q2 2021",
          _style: "text-align: center",
          type: Number,
        },
        {
          key: "deltadiem_2",
          label: "Δ Điểm Q2 2021 vs Q1 2021",
          _style: "text-align: center",
          type: Number,
        },
        {
          key: "avg",
          label: "Khối lượng TB 50 phiên gần nhất",
          _style: "text-align: center",
          _classes: "border-left",
          type: Number,
        },
      ],
      filter_point_value: "",
      filter_point_range: "",
      filter_expression_point_value: "above",
      filter_delta_point_value: "",
      filter_delta_point_range: "",
      filter_expression_delta_point_value: "above",
      option_filter_expression: [
        {
          value: "above",
          label: "Lớn hơn",
        },
        {
          value: "below",
          label: "Bé hơn",
        },
        {
          value: "range",
          label: "Khoảng",
        },
      ],
      item_table: [],
      is_show_modal: false,
      is_loading_data: false,
      is_loading_data_chart: false,
      open: false,
      current: 0,
      option_filter_category: [],
      list_data_model_add: {
        current_my_watchlist_id: null,
        mack: "",
      },
      suggestions: [],
      data_chart: [],
      openDepartment: false,
      currentDepartment: 0,
      suggestionsDepartment: [],
      filter_mack_value: "",
      filter_department_value: "",
      current_position: -1,
      current_position_point: -1,
      current_position_delta_point: -1,
      money: {
        decimal: ".",
        thousands: ",",
        prefix: "",
        suffix: "",
        precision: 0,
        masked: false /* doesn't work with directive */,
      },
      data_eod_avg: {},
      filter_expression_total_vol_value: "above",
      filter_total_vol_value: "",
      filter_total_vol_range: "",
      volume_mask: "0",
      label_quarter_0: "",
      label_quarter_1: "",
      label_quarter_2: "",
    };
  },
  components: {
    CustomEChart,
    draggable,
  },
  props: {
    itemsPerPage: {
      type: Number,
    },
  },
  created() {
    this.getAllItem();
    this.getDataChart();
    this.getAllEOD();
    this.getMyWatchlist();
  },
  methods: {
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
    getAllItem() {
      this.is_loading_data = true;
      axios
        .get(this.$apiAdress + "/api/stocks/top400stock/index", {
          params: {
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          this.item_table = res.data;
          this.item_table.sort(function (a, b) {
            return a.rank_0 - b.rank_0;
          });
          this.is_loading_data = false;
        })
        .catch((err) => {
          console.log(err);
          this.is_loading_data = false;
        });
    },
    addNewWatchlist(mack_name) {
      let self = this;
      if (!this.$store.state.data_eod.hasOwnProperty(mack_name.toUpperCase())) {
        self.$toast.error("Mã CK không hợp lệ!");
        return;
      }
      axios
        .post(this.$apiAdress + "/api/watchlist", {
          mack: mack_name.toUpperCase(),
          my_watchlist_id: self.list_data_model_add.current_my_watchlist_id,
          token: localStorage.getItem("api_token"),
        })
        .then(function (response) {
          response.data._classes = "table-success";
          self.$toast.success("Thêm vào watchlist thành công");
        })
        .catch(function (error) {
          console.error(error);
          self.$toast.error(
            "Mã chứng khoán đã có trong Wacthlist, vui lòng thử lại"
          );
        });
    },
    getMyWatchlist() {
      let self = this;
      axios
        .get(self.$apiAdress + "/api/my-watchlist", {
          params: {
            token: localStorage.getItem("api_token"),
          },
        })
        .then(function (res) {
          let reverseData = res.data.reverse();
          for (let item of reverseData) {
            self.option_filter_category.push({
              value: item.id,
              label: item.name,
            });
          }
          self.list_data_model_add.current_my_watchlist_id =
            self.option_filter_category[0].value;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    getInfo(mack) {
      this.$store.state.mackTradingChart = mack;
      this.$store.state.isShowModalTradingChart = true;
    },
    getDataChart() {
      this.is_loading_data_chart = true;
      axios
        .get(this.$apiAdress + "/api/stocks/top400stock/chart", {
          params: {
            mack: this.list_mack_selected,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          this.data_chart = res.data;
          const list_time = res.data[0].thoigian;
          this.label_quarter_0 = list_time[list_time.length - 1];
          this.label_quarter_1 = list_time[list_time.length - 2];
          this.label_quarter_2 = list_time[list_time.length - 3];
          this.list_mack_selected = res.data.map((item) => item.mack);
          this.is_show_modal = false;
          this.is_loading_data_chart = false;
        })
        .catch((err) => {
          console.log(err);
          this.is_show_modal = false;
          this.is_loading_data_chart = false;
        });
    },
    removeAt(idx) {
      this.list_mack_selected.splice(idx, 1);
    },
    enter() {
      let resultSearch = false;
      this.mack_insert = "";
      this.open = false;
      if (this.list_mack_selected.length == 6) {
        this.$toast.clear();
        this.$toast.info("Chỉ được chọn tối đa 6 mã");
        return;
      }
      this.list_mack_selected.find((item) => {
        if (
          item.toUpperCase() ==
          this.suggestions[this.current].mack.toUpperCase()
        ) {
          resultSearch = true;
          return true;
        }
      });
      if (!resultSearch && this.suggestions.length > 0) {
        this.list_mack_selected.push(this.suggestions[this.current].mack);
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
      const limit = 6;
      if (this.item_table.length > 0 && mack != "") {
        for (let item of this.item_table) {
          if (item.mack.includes(mack)) {
            return_data.push({
              mack: item.mack,
              ten_cong_ty: this.$store.state.list_mack_company.hasOwnProperty(
                item.mack
              )
                ? this.$store.state.list_mack_company[item.mack].ten_cong_ty
                : "",
            });
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
      this.suggestions = this.searchMack(this.mack_insert);
    },

    suggestionClick(index) {
      this.open = false;
      this.mack_insert = "";
      let resultSearch = false;
      if (this.list_mack_selected.length == 6) {
        this.$toast.clear();
        this.$toast.info("Chỉ được chọn tối đa 6 mã");
        return;
      }
      this.list_mack_selected.find((item) => {
        if (item.toUpperCase() === this.suggestions[index].mack.toUpperCase()) {
          resultSearch = true;
          return true;
        }
      });
      if (!resultSearch && this.suggestions.length > 0) {
        this.list_mack_selected.push(this.suggestions[this.current].mack);
      }
    },
    changeTextSpecial(text) {
      text = text.trim().toLowerCase();
      text = text.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
      text = text.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
      text = text.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
      text = text.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
      text = text.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
      text = text.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
      text = text.replace(/đ/gi, "d");
      return text.toUpperCase();
    },
    handleVolumeMaskChange() {
      this.filter_total_vol_value = this.volume_mask.split(",").join("");
    },
    enterDepartment() {
      if (this.openSuggestionDepartment) {
        this.filter_department_value =
          this.suggestionsDepartment[this.currentDepartment];
        this.openDepartment = false;
      }
    },

    upDepartment() {
      if (this.currentDepartment > 0) this.currentDepartment--;
    },

    downDepartment() {
      if (this.currentDepartment < this.suggestionsDepartment.length - 1)
        this.currentDepartment++;
    },

    isActiveDepartment(index) {
      return index === this.currentDepartment;
    },

    searchMackDepartment(department) {
      department = department.toUpperCase();
      let return_data = [];
      const limit = 5;
      if (this.list_unique_department.length > 0) {
        for (const item of this.list_unique_department) {
          if (
            this.changeTextSpecial(item).includes(
              this.changeTextSpecial(department)
            )
          ) {
            return_data.push(item);
          }
        }
      }
      return return_data;
    },
    focusInputDepartment() {
      this.openDepartment = true;
      this.currentDepartment = 0;
      this.suggestionsDepartment = this.searchMackDepartment(
        this.filter_department_value
      );
    },
    focusoutInputDepartment() {
      if (!this.is_hover_dropdown) {
        this.openDepartment = false;
        this.currentDepartment = 0;
      }
    },
    changeDepartment() {
      if (!this.openDepartment) {
        this.openDepartment = true;
        this.currentDepartment = 0;
      }
      this.suggestionsDepartment = this.searchMackDepartment(
        this.filter_department_value
      );
    },

    suggestionClickDepartment(index) {
      this.filter_department_value = this.suggestionsDepartment[index];
      this.openDepartment = false;
    },
  },
  computed: {
    openSuggestion() {
      return (
        this.mack !== "" && this.suggestions.length != 0 && this.open === true
      );
    },
    list_unique_department() {
      let return_data = [];
      for (const item of Object.values(this.$store.state.list_mack_company)) {
        if (!return_data.includes(item.nganh) && item.nganh != "") {
          return_data.push(item.nganh);
        }
      }
      return return_data;
    },
    openSuggestionDepartment() {
      return (
        this.suggestionsDepartment.length != 0 && this.openDepartment === true
      );
    },
    fields_table_chart() {
      let data_return = [];
      if (this.data_chart.length > 0) {
        data_return.push({
          key: "mack",
          label: "Mã CK",
          _style: "text-align: center",
        });
        let list_time = this.data_chart[0].thoigian;
        for (let i = 0; i < list_time.length; i++) {
          const item = list_time[i];
          data_return.push({
            key: "time_" + i,
            label: item,
            _style: "text-align: center",
          });
        }
      }
      return data_return;
    },
    item_table_main() {
      if (
        this.item_table.length > 0 &&
        Object.keys(this.$store.state.list_mack).length > 0
      ) {
        let return_data = this.item_table.map((item) => {
          return {
            ...item,
            san: this.$store.state.list_mack_company.hasOwnProperty(item.mack)
              ? this.$store.state.list_mack_company[item.mack].san
              : "",
            ten_cong_ty: this.$store.state.list_mack_company.hasOwnProperty(
              item.mack
            )
              ? this.$store.state.list_mack_company[item.mack].ten_cong_ty
              : "",
            nganh: this.$store.state.list_mack_company.hasOwnProperty(item.mack)
              ? this.$store.state.list_mack_company[item.mack].nganh
              : "",
            avg: this.data_eod_avg.hasOwnProperty(item.mack)
              ? parseFloat(this.data_eod_avg[item.mack].avgvol50)
              : 0,
          };
        });
        if (this.filter_mack_value !== "") {
          return_data = return_data.filter((item) =>
            item.mack.includes(this.filter_mack_value.toUpperCase())
          );
        }
        if (this.filter_department_value !== "") {
          return_data = return_data.filter((item) =>
            this.changeTextSpecial(item.nganh).includes(
              this.changeTextSpecial(this.filter_department_value.toUpperCase())
            )
          );
        }
        if (
          this.filter_point_value !== "" &&
          this.filter_expression_point_value != "range"
        ) {
          switch (this.filter_expression_point_value) {
            case "above":
              return_data = return_data.filter(
                (item) => item.diem_0 > this.filter_point_value
              );
              break;
            case "below":
              return_data = return_data.filter(
                (item) => item.diem_0 < this.filter_point_value
              );
              break;
            default:
              break;
          }
        }
        if (
          this.filter_point_range !== "" &&
          this.filter_expression_point_value == "range"
        ) {
          const regex = /\d+-{1}\d+$/;
          let arr_point_range = this.filter_point_range;
          arr_point_range = arr_point_range.replace(/ /g, "");
          if (regex.test(arr_point_range)) {
            arr_point_range = arr_point_range.split("-");
            return_data = return_data.filter(
              (item) =>
                item.diem_0 >= arr_point_range[0] &&
                item.diem_0 <= arr_point_range[1]
            );
          }
        }
        if (
          this.filter_delta_point_value !== "" &&
          this.filter_expression_delta_point_value != "range"
        ) {
          switch (this.filter_expression_delta_point_value) {
            case "above":
              return_data = return_data.filter(
                (item) => item.deltadiem_1 > this.filter_delta_point_value
              );
              break;
            case "below":
              return_data = return_data.filter(
                (item) => item.deltadiem_1 < this.filter_delta_point_value
              );
              break;
            default:
              break;
          }
        }
        if (
          this.filter_delta_point_range !== "" &&
          this.filter_expression_delta_point_value == "range"
        ) {
          const regex = /\d+-{1}\d+$/;
          let arr_point_range = this.filter_delta_point_range;
          arr_point_range = arr_point_range.replace(/ /g, "");
          if (regex.test(arr_point_range)) {
            arr_point_range = arr_point_range.split("-");
            return_data = return_data.filter(
              (item) =>
                item.deltadiem_1 >= arr_point_range[0] &&
                item.deltadiem_1 <= arr_point_range[1]
            );
          }
        }
        if (
          this.filter_total_vol_value !== "" &&
          this.filter_expression_total_vol_value != "range"
        ) {
          switch (this.filter_expression_total_vol_value) {
            case "above":
              return_data = return_data.filter(
                (item) => item.avg >= this.filter_total_vol_value
              );
              break;
            case "below":
              return_data = return_data.filter(
                (item) => item.avg <= this.filter_total_vol_value
              );
              break;
            default:
              break;
          }
        }
        if (
          this.filter_total_vol_range !== "" &&
          this.filter_expression_total_vol_value == "range"
        ) {
          const regex = /\d+-{1}\d+$/;
          let arr_point_range = this.filter_total_vol_range;
          arr_point_range = arr_point_range.replace(/ /g, "");
          if (regex.test(arr_point_range)) {
            arr_point_range = arr_point_range.split("-");
            return_data = return_data.filter(
              (item) =>
                item.avg >= arr_point_range[0] && item.avg <= arr_point_range[1]
            );
          }
        }
        return return_data;
      }
      return [];
    },
    items_table_delta() {
      let data_return = [];
      if (this.data_chart.length > 0) {
        let list_time = this.data_chart[0].thoigian;
        for (const item of this.data_chart) {
          let row = {};
          row["mack"] = item.mack;
          for (let i = 0; i < list_time.length; i++) {
            row["time_" + i] = item.delta[i];
          }
          data_return.push(row);
        }
      }
      return data_return;
    },
    items_table_point() {
      let data_return = [];
      if (this.data_chart.length > 0) {
        let list_time = this.data_chart[0].thoigian;
        for (const item of this.data_chart) {
          let row = {};
          row["mack"] = item.mack;
          for (let i = 0; i < list_time.length; i++) {
            row["time_" + i] = item.diem_xep_hang[i];
          }
          data_return.push(row);
        }
      }
      return data_return;
    },
    option_chart_point() {
      let list_mack = [];
      let list_time = [];
      let list_series = [];
      if (this.data_chart.length > 0) {
        list_time = this.data_chart[0].thoigian;
        for (const item of this.data_chart) {
          list_mack.push(item.mack);
          list_series.push({
            name: item.mack,
            data: item.diem_xep_hang,
            type: "line",
            smooth: true,
          });
        }
      }
      return {
        title: {
          text: "Biểu đồ điểm",
          left: "center",
          align: "auto",
          top: "2%",
          textStyle: {
            fontFamily: "Tahoma",
          },
        },
        tooltip: {
          trigger: "axis",
        },
        toolbox: {
          show: true,
          feature: {
            magicType: {
              type: ["line", "bar", "stack"],
              title: {
                line: "Biểu đồ đường",
                bar: "Biểu đồ cột",
                stack: "Biểu đồ chồng",
              },
            },
          },
          right: "5%",
        },
        grid: {
          top: "20%",
          bottom: "5%",
          left: "5%",
          right: "5%",
        },
        legend: {
          data: list_mack,
          top: "10%",
          show: true,
        },
        xAxis: {
          type: "category",
          data: list_time,
        },
        yAxis: {},
        series: list_series,
      };
    },
    option_chart_delta() {
      let list_mack = [];
      let list_time = [];
      let list_series = [];
      if (this.data_chart.length > 0) {
        list_time = this.data_chart[0].thoigian;
        for (const item of this.data_chart) {
          list_mack.push(item.mack);
          list_series.push({
            name: item.mack,
            data: item.delta,
            type: "line",
            smooth: true,
          });
        }
      }
      return {
        title: {
          text: "Biểu đồ Δ điểm",
          left: "center",
          align: "auto",
          top: "2%",
          textStyle: {
            fontFamily: "Tahoma",
          },
        },
        tooltip: {
          trigger: "axis",
        },
        toolbox: {
          show: true,
          feature: {
            magicType: {
              type: ["line", "bar", "stack"],
              title: {
                line: "Biểu đồ đường",
                bar: "Biểu đồ cột",
                stack: "Biểu đồ chồng",
              },
            },
          },
          right: "5%",
        },
        grid: {
          top: "20%",
          bottom: "5%",
          left: "5%",
          right: "5%",
        },
        legend: {
          data: list_mack,
          top: "10%",
          show: true,
        },
        xAxis: {
          type: "category",
          data: list_time,
        },
        yAxis: {},
        series: list_series,
      };
    },
  },
};
</script>
<style lang="scss">
.tooltip-add {
  position: relative;
  display: inline-block;
}
.tooltip-add .tooltiptext-add {
  border: 1px solid rgb(130, 130, 130);
  visibility: hidden;
  width: 135px;
  // background-color: rgb(255, 255, 255);
  background-color: #8c58b3;
  text-align: center;
  padding: 2px 0;
  font-size: 14px;
  border-radius: 1px;
  top: 10px;
  left: 22px;
  position: absolute;
  z-index: 1;
}
.tooltip-add:hover .tooltiptext-add {
  visibility: visible;
}
.bghover {
  background-color: #8c58b3 !important;
  color: #fff;
}
.c-dark-theme {
  .bghover {
    background-color: #8c58b3 !important;
    color: #fff;
  }
}
.table-nopadding {
  td {
    padding: 0.3rem !important;
    text-align: center;
  }
}
.cursor-pointer {
  cursor: pointer;
}
.modal-hide-header-footer {
  .modal-content {
    .modal-header {
      padding: 0.5rem;
    }
    .modal-body {
      padding: 0;
    }
    .modal-footer {
      display: none;
    }
  }
}
</style>
