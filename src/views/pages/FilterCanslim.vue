<template>
  <div>
    <CRow>
      <CCol sm="2" />
      <CCol sm="8">
        <h1 class="title-canslim">Điểm Canslim & 4M</h1>
      </CCol>
      <CCol sm="2">
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
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="1">
        <CInput
          label="Mã CK"
          placeholder="Nhập mã"
          v-model="filter_mack_value"
          @focus="key_filter_hover = 'mack'"
          @blur="key_filter_hover = ''"
          :addInputClasses="{
            'is-invalid': check_key,
          }"
        />
      </CCol>
      <CCol sm="2">
        <div style="position: relative" v-bind:class="{ show: openSuggestion }">
          <CInput
            v-model.lazy="filter_department_value"
            label="Ngành nghề"
            prependHtml="<i class='cui-user'></i>"
            placeholder="Nhập ngành nghề"
            @keydown.enter="enter"
            @keydown.down="down"
            @keydown.up="up"
            @input="change"
            @focus="focusInputDepartment"
            @blur="focusoutInputDepartment"
            class="mb-1"
          />
          <CListGroup
            v-if="openSuggestion"
            class="dropdown-menu pb-0 pt-0 overflow-auto"
            :class="{ show: open }"
            style="width: 150%; max-height: 400px; overflow-x: hidden"
          >
            <CListGroupItem
              @mouseover="is_hover_dropdown = true"
              @mouseleave="is_hover_dropdown = false"
              href="#"
              v-for="(item, index) in suggestions"
              :key="index"
              @click="suggestionClick(index)"
              :class="{ active: isActive(index) }"
              class="pt-2 pb-2 mb-0"
              >{{ item }}
            </CListGroupItem>
          </CListGroup>
        </div>
      </CCol>
      <CCol sm="1">
        <CSelect
          label="Chọn sàn"
          :value.sync="filter_expression_board_value"
          :options="option_filter_board"
          @focus="key_filter_hover = 'san'"
          @blur="key_filter_hover = ''"
        />
      </CCol>
      <CCol sm="2">
        <CInput
          v-if="filter_expression_canslim_value != 'range'"
          label="Điểm Canslim"
          placeholder="Nhập điểm."
          v-model="filter_canslim_point_value"
          @focus="key_filter_hover = 'diem_canslim'"
          @blur="key_filter_hover = ''"
        >
          <template #prepend>
            <CSelect
              :value.sync="filter_expression_canslim_value"
              :options="option_filter_expression"
              @focus="key_filter_hover = 'diem_canslim'"
              @blur="key_filter_hover = ''"
            />
          </template>
        </CInput>
        <CInput
          v-else
          label="Điểm Canslim"
          placeholder="Nhập khoảng. VD: 0-100"
          v-model="filter_canslim_point_range"
          @focus="key_filter_hover = 'diem_canslim'"
          @blur="key_filter_hover = ''"
        >
          <template #prepend>
            <CSelect
              :value.sync="filter_expression_canslim_value"
              :options="option_filter_expression"
              @focus="key_filter_hover = 'diem_canslim'"
              @blur="key_filter_hover = ''"
            />
          </template>
        </CInput>
      </CCol>
      <CCol sm="2">
        <CInput
          v-if="filter_expression_4m_value != 'range'"
          label="Điểm 4M"
          placeholder="Nhập điểm."
          v-model="filter_4m_point_value"
          @focus="key_filter_hover = 'diem_4m'"
          @blur="key_filter_hover = ''"
        >
          <template #prepend>
            <CSelect
              :value.sync="filter_expression_4m_value"
              :options="option_filter_expression"
              @focus="key_filter_hover = 'diem_4m'"
              @blur="key_filter_hover = ''"
            />
          </template>
        </CInput>
        <CInput
          v-else
          label="Điểm 4M"
          placeholder="Nhập khoảng. VD: 0-100"
          v-model="filter_4m_point_range"
          @focus="key_filter_hover = 'diem_4m'"
          @blur="key_filter_hover = ''"
        >
          <template #prepend>
            <CSelect
              :value.sync="filter_expression_4m_value"
              :options="option_filter_expression"
              @focus="key_filter_hover = 'diem_4m'"
              @blur="key_filter_hover = ''"
            />
          </template>
        </CInput>
      </CCol>
      <CCol sm="2">
        <div
          role="group"
          class="form-group"
          v-if="filter_expression_total_vol_value != 'range'"
        >
          <label for="uid-ib2846w05z" class=""> KL TB 50 phiên gần nhất </label>
          <div class="input-group">
            <div class="input-group-prepend">
              <CSelect
                :value.sync="filter_expression_total_vol_value"
                :options="option_filter_expression"
                @focus="key_filter_hover = 'avg'"
                @blur="key_filter_hover = ''"
              />
            </div>
            <input
              id="uid-ib2846w05z"
              @change="handleVolumeMaskChange()"
              v-money="money"
              placeholder="Nhập số lượng."
              v-model="volume_mask"
              class="form-control"
              @focus="key_filter_hover = 'avg'"
              @blur="key_filter_hover = ''"
            />
          </div>
        </div>
        <CInput
          v-else
          label="KL TB 50 phiên gần nhất"
          placeholder="Nhập khoảng. VD: 0-100"
          v-model="filter_total_vol_range"
          @focus="key_filter_hover = 'avg'"
          @blur="key_filter_hover = ''"
        >
          <template #prepend>
            <CSelect
              :value.sync="filter_expression_total_vol_value"
              :options="option_filter_expression"
              @focus="key_filter_hover = 'avg'"
              @blur="key_filter_hover = ''"
            />
          </template>
        </CInput>
      </CCol>
      <CCol sm="2">
        <div
          role="group"
          class="form-group"
          v-if="filter_expression_capital_value != 'range'"
        >
          <label for="uid-ib2846w05z2" class=""> Vốn hóa </label>
          <div class="input-group">
            <div class="input-group-prepend">
              <CSelect
                :value.sync="filter_expression_capital_value"
                :options="option_filter_expression"
                @focus="key_filter_hover = 'capital'"
                @blur="key_filter_hover = ''"
              />
            </div>
            <input
              id="uid-ib2846w05z2"
              @change="handleCapitalMaskChange()"
              v-money="money"
              placeholder="Nhập số lượng."
              v-model="capital_mask"
              class="form-control"
              @focus="key_filter_hover = 'capital'"
              @blur="key_filter_hover = ''"
            />
          </div>
        </div>
        <CInput
          v-else
          label="Vốn hóa"
          placeholder="Nhập khoảng. VD: 0-100"
          v-model="filter_capital_range"
          @focus="key_filter_hover = 'capital'"
          @blur="key_filter_hover = ''"
        >
          <template #prepend>
            <CSelect
              :value.sync="filter_expression_capital_value"
              :options="option_filter_expression"
              @focus="key_filter_hover = 'capital'"
              @blur="key_filter_hover = ''"
            />
          </template>
        </CInput>
      </CCol>
      <CCol sm="12" class="mb-2" v-if="!is_loading_4mcanslim">
        <CButton
          @click="collapse_advanced_filter = !collapse_advanced_filter"
          class="float-right"
          color="primary"
          ><CIcon name="cilFilter" /> Bộ lọc nâng cao</CButton
        >
      </CCol>
      <CCol sm="12">
        <CCollapse :show="collapse_advanced_filter">
          <CCard class="mb-1">
            <CCardBody>
              <CRow>
                <CCol xl="7">
                  <CRow>
                    <CCol lg="3" class="mt-2">
                      <div class="d-flex">
                        <p class="font-weight-bold">Bộ lọc đã lưu</p>
                        <div
                          @click="
                            type_action = 'add_filter_group';
                            value_filter_action = '';
                          "
                          class="cursor-pointer mx-2"
                          v-c-tooltip="{
                            content: 'Thêm mới bộ lọc',
                            placement: 'right',
                          }"
                        >
                          <CIcon name="cibAddthis" class="text-upchange" />
                        </div>
                      </div>
                      <div
                        class="group-search-child p-2 border"
                        style="flex: 1"
                        v-if="list_filter_group.length > 0"
                      >
                        <div
                          class="
                            group-search-child__item
                            py-1
                            flex-grow-1
                            px-2
                            mt-2
                            cursor-pointer
                            d-flex
                            justify-content-between
                            border
                          "
                          v-for="(item, i) in list_filter_group"
                          :class="
                            item.id == item_filter_group_active.id && 'bghover'
                          "
                          :key="i"
                          style="flex: 1"
                          @click="handleClickItemFilterGroup(item)"
                        >
                          <div>{{ item.label }}</div>
                          <div class="d-flex">
                            <div
                              class="mx-2 d-flex align-items-center"
                              @click="type_action = 'edit_filter_group'"
                              v-c-tooltip="{
                                content: 'Sửa tên bộ lọc',
                                placement: 'right',
                              }"
                            >
                              <CIcon name="cilPencil" />
                            </div>
                            <div
                              @click="
                                is_show_modal_delete_filter_group = true;
                                data_delete_filter = item;
                              "
                              class="d-flex align-items-center"
                              v-c-tooltip="{
                                content: 'Xóa bộ lọc này',
                                placement: 'right',
                              }"
                            >
                              <CIcon name="cilTrash" class="text-downchange" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="
                          group-search-child
                          p-2
                          border
                          d-flex
                          flex-column
                          justify-content-center
                          align-items-center
                        "
                        style="flex: 1"
                        v-else
                      >
                        <p class="mb-0">Hiện chưa có bộ lọc nào</p>
                        <CLink
                          class="text-upchange"
                          @click="
                            type_action = 'add_filter_group';
                            value_filter_action = '';
                          "
                        >
                          Thêm mới
                        </CLink>
                      </div>
                    </CCol>
                    <CCol lg="4" class="mt-2">
                      <CSelect
                        label="Nhóm cổ phiếu"
                        :value.sync="filter_expression_type_stock_value"
                        :options="option_filter_type_stock"
                        addLabelClasses="font-weight-bold"
                        class="px-2"
                      />
                      <p class="font-weight-bold">Nhóm tiêu chí</p>
                      <div
                        class="group-search p-2 border"
                        style="height: calc(30vh - 65px)"
                      >
                        <div
                          class="
                            group-search__item
                            py-1
                            px-2
                            border
                            cursor-pointer
                          "
                          v-for="(item, i) in list_item_filter"
                          :key="i"
                          @click="key_filter_active = item.key"
                          :class="item.key == key_filter_active && 'bghover'"
                        >
                          {{ item.label }}
                        </div>
                      </div>
                    </CCol>
                    <CCol lg="5" class="mt-2">
                      <p class="font-weight-bold">Tiêu chí</p>
                      <div
                        class="group-search-child p-2 border"
                        style="flex: 1"
                      >
                        <div
                          class="
                            group-search-child__item
                            py-1
                            flex-grow-1
                            px-2
                            mt-2
                            cursor-pointer
                            d-flex
                            justify-content-between
                            border
                          "
                          v-for="(item, i) in child_item_filter"
                          :key="i"
                          style="flex: 1"
                          :class="
                            list_key_advanced_filter.includes(
                              item.key_mapping_data
                            ) && 'bghover'
                          "
                          @click="addNewFilter(item)"
                        >
                          <div>{{ item.thong_tin }}</div>
                          <div
                            v-if="
                              list_key_advanced_filter.includes(
                                item.key_mapping_data
                              )
                            "
                            class="d-flex align-items-center"
                          >
                            <CIcon name="cilCheckAlt" style="color: #8c58b3" />
                          </div>
                          <div v-else class="d-flex align-items-center">
                            <CIcon
                              name="cilArrowRight"
                              style="color: #8c58b3"
                            />
                          </div>
                        </div>
                      </div>
                    </CCol>
                  </CRow>
                </CCol>
                <CCol xl="5" class="mt-2">
                  <p class="font-weight-bold">Danh sách lọc</p>
                  <draggable
                    v-if="list_filter.length > 0"
                    v-model="list_filter"
                    @start="drag = true"
                    @end="drag = false"
                    v-bind="dragOptions"
                    :force-fallback="true"
                    class="form-list-filter border"
                    handle=".handle"
                  >
                    <transition-group
                      type="transition"
                      :name="!drag ? 'flip-list' : null"
                    >
                      <div
                        class="d-flex flex-row py-2 my-2 mx-2"
                        v-for="(item, index) in list_filter"
                        :key="index"
                        style="border: 1px solid #8c58b3"
                      >
                        <div
                          class="px-2"
                          style="
                            justify-content: center;
                            align-items: center;
                            display: flex;
                            cursor: pointer;
                          "
                        >
                          <CIcon name="cilMove" class="handle" />
                        </div>
                        <div class="d-flex flex-column" style="flex: 1">
                          <div class="pr-2 d-flex align-items-center">
                            <span class="font-weight-bold mb-1">
                              {{ item.label }}
                            </span>
                          </div>
                          <div
                            role="group"
                            class="form-group"
                            v-if="item.type_filter != 'range'"
                            style="flex: 1"
                          >
                            <div class="input-group">
                              <div class="input-group-prepend">
                                <CSelect
                                  :value.sync="item.type_filter"
                                  :options="option_filter_expression"
                                  @focus="key_filter_hover = item.key"
                                  @blur="key_filter_hover = ''"
                                />
                              </div>
                              <input
                                v-money="money"
                                placeholder="Nhập giá trị."
                                v-model.lazy="item.value_filter"
                                class="form-control"
                                @focus="key_filter_hover = item.key"
                                @blur="key_filter_hover = ''"
                              />
                              <div class="input-group-append">
                                <div class="pl-2 d-flex align-items-center">
                                  <span>
                                    {{ item.don_vi }}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- <CInput
                            v-if="item.type_filter != 'range'"
                            placeholder="Nhập giá trị."
                            style="flex: 1"
                            v-model="item.value_filter"
                            @focus="key_filter_hover = item.key"
                            @blur="key_filter_hover = ''"
                          >
                            <template #prepend>
                              <CSelect
                                :value.sync="item.type_filter"
                                :options="option_filter_expression"
                                @focus="key_filter_hover = item.key"
                                @blur="key_filter_hover = ''"
                              />
                            </template>
                            <template #append>
                              <div class="pl-2 d-flex align-items-center">
                                <span>
                                  {{ item.don_vi }}
                                </span>
                              </div>
                            </template>
                          </CInput> -->
                          <CInput
                            v-else
                            style="flex: 1"
                            placeholder="Nhập khoảng. VD: 0-100"
                            v-model="item.range_filter"
                            @focus="key_filter_hover = item.key"
                            @blur="key_filter_hover = ''"
                          >
                            <template #prepend>
                              <CSelect
                                :value.sync="item.type_filter"
                                :options="option_filter_expression"
                                @focus="key_filter_hover = item.key"
                                @blur="key_filter_hover = ''"
                              />
                            </template>
                            <template #append>
                              <div class="pl-2 d-flex align-items-center">
                                <span>
                                  {{ item.don_vi }}
                                </span>
                              </div>
                            </template>
                          </CInput>
                        </div>
                        <div
                          @click="list_filter.splice(index, 1)"
                          class="px-2"
                          style="
                            justify-content: center;
                            align-items: center;
                            display: flex;
                            cursor: pointer;
                          "
                        >
                          <CIcon name="cilXCircle" class="text-downchange" />
                        </div>
                      </div>
                    </transition-group>
                  </draggable>
                  <div
                    v-else
                    class="
                      form-list-filter
                      d-flex
                      justify-content-center
                      h3
                      align-items-center
                    "
                  >
                    Hãy thêm chỉ tiêu ở bên trái để lọc dữ liệu
                  </div>
                </CCol>
                <CCol xl="6" class="mt-2">
                  <div class="d-flex" v-if="type_action != ''">
                    <CInput
                      placeholder="Nhập tên bộ lọc"
                      v-model="value_filter_action"
                    >
                    </CInput>
                    <CButton
                      @click="addNewFilterGroup"
                      color="success"
                      class="ml-2"
                      v-if="type_action == 'add_filter_group'"
                    >
                      <CIcon name="cibAddthis" />
                      Thêm mới
                    </CButton>
                    <CButton
                      @click="saveFilterGroup"
                      color="primary"
                      class="ml-2"
                      v-if="type_action == 'edit_filter_group'"
                    >
                      <CIcon name="cilSave" />
                      Lưu
                    </CButton>
                    <CButton
                      @click="
                        type_action = '';
                        value_filter_action = '';
                      "
                      color="secondary"
                      class="ml-2"
                    >
                      Đóng
                    </CButton>
                  </div>
                </CCol>
                <CCol xl="6" class="mt-2">
                  <div class="d-flex justify-content-end">
                    <p
                      style="
                        line-height: 35px;
                        margin-bottom: 0px;
                        font-weight: bold;
                      "
                      v-if="item_filter_group_active.id != -1"
                    >
                      Bộ lọc:
                    </p>
                    <p
                      style="
                        line-height: 35px;
                        margin-bottom: 0px;
                        padding-left: 5px;
                      "
                      v-if="item_filter_group_active.id != -1"
                    >
                      {{ item_filter_group_active.label }}
                    </p>
                    <CButton
                      @click="restoreFilterGroup"
                      color="secondary"
                      class="ml-2"
                      v-if="
                        item_filter_group_active.id != -1 &&
                        JSON.stringify(
                          item_filter_group_active.content.list_filter
                        ) != JSON.stringify(list_filter)
                      "
                    >
                      <CIcon name="cilReload" />
                      Khôi phục
                    </CButton>
                    <CButton
                      @click="list_filter = []"
                      color="danger"
                      class="ml-2"
                      v-if="list_filter.length > 0"
                    >
                      <CIcon name="cilTrash" />
                      Xóa tất cả
                    </CButton>
                    <CButton
                      @click="saveContentFilterGroup"
                      color="primary"
                      class="ml-2"
                      v-if="
                        item_filter_group_active.id != -1 &&
                        JSON.stringify(
                          item_filter_group_active.content.list_filter
                        ) != JSON.stringify(list_filter) &&
                        list_filter.length > 0
                      "
                    >
                      <CIcon name="cilSave" />
                      Lưu bộ lọc
                    </CButton>
                    <CButton
                      @click="is_show_modal_add_filter_group = true"
                      color="primary"
                      class="ml-2"
                      v-if="
                        item_filter_group_active.id == -1 &&
                        list_filter.length > 0
                      "
                    >
                      <CIcon name="cilSave" />
                      Lưu bộ lọc
                    </CButton>
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCollapse>
      </CCol>
    </CRow>
    <CCard>
      <CCardBody>
        <CElementCover
          :opacity="1"
          v-if="is_loading_4mcanslim"
          :style="
            $store.state.darkMode
              ? { 'background-color': 'fff' }
              : { 'background-color': '000' }
          "
          ><CSpinner size="5xl" color="success" />
        </CElementCover>
        <div
          class="d-flex align-item-center mb-1"
          v-if="!is_loading_4mcanslim && list_mack_selected.length > 0"
        >
          <CCallout color="info">
            <small class="text-muted">Số mã đã chọn</small><br />
            <strong class="h4">{{ list_mack_selected.length }} mã</strong>
          </CCallout>
          <div class="mt-4">
            <CButton
              @click="is_show_modal_add_to_watchlist = true"
              color="primary"
            >
              Thêm {{ list_mack_selected.length }} mã vào watchlist
            </CButton>
          </div>
        </div>
        <CDataTable
          v-if="!is_loading_4mcanslim"
          :itemsPerPage="20"
          :items="itemTable"
          hover
          sorter
          striped
          border
          small
          fixed
          :fields="fieldsTable"
          pagination
          class="cursor-pointer table-add-watclist"
        >
          <template v-for="(row, i) in fieldsTable" v-slot:[row.key]="item">
            <td
              class="py-1"
              :key="i"
              :class="key_filter_hover == row.key && 'bghover'"
            >
              <span
                class="d-flex justify-content-end"
                :class="getColorText(item.item[row.key], '')"
                v-if="row.type_number == 'money'"
              >
                {{
                  parseFloat(item.item[row.key] / 1000).toLocaleString("en", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 1,
                  })
                }}
              </span>
              <span
                class="d-flex justify-content-end"
                :class="getColorText(item.item[row.key], '')"
                v-else
              >
                {{
                  parseFloat(item.item[row.key]).toLocaleString("en", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 1,
                  })
                }}
              </span>
            </td>
          </template>
          <template #no-items-view>
            <p class="text-center h5 mt-3">Không có dữ liệu</p>
          </template>
          <template #mack="{ item }">
            <td class="py-1" :class="key_filter_hover == 'mack' && 'bghover'">
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
          <template #nganh="{ item }">
            <td class="py-1" :class="key_filter_hover == 'nganh' && 'bghover'">
              <span class="d-flex justify-content-center text-center">
                {{ item.nganh }}
              </span>
            </td>
          </template>
          <template #diem_canslim="{ item }">
            <td
              class="py-1"
              :class="key_filter_hover == 'diem_canslim' && 'bghover'"
            >
              <span
                class="d-flex justify-content-center"
                :class="getColorText(item.diem_canslim, 'color_50')"
              >
                {{ item.diem_canslim }}
              </span>
            </td>
          </template>
          <template #diem_4m="{ item }">
            <td
              class="py-1"
              :class="key_filter_hover == 'diem_4m' && 'bghover'"
            >
              <span
                class="d-flex justify-content-center"
                :class="getColorText(item.diem_4m, 'color_50')"
              >
                {{ item.diem_4m }}
              </span>
            </td>
          </template>
          <template #rss="{ item }">
            <td class="py-1" :class="key_filter_hover == 'rss' && 'bghover'">
              <span
                class="d-flex justify-content-center"
                :class="getColorText(item.rss, 'color_50')"
              >
                {{ item.rss }}
              </span>
            </td>
          </template>
          <template #rsm="{ item }">
            <td class="py-1" :class="key_filter_hover == 'rsm' && 'bghover'">
              <span
                class="d-flex justify-content-center"
                :class="getColorText(item.rsm, 'color_50')"
              >
                {{ item.rsm }}
              </span>
            </td>
          </template>
          <template #rsl="{ item }">
            <td class="py-1" :class="key_filter_hover == 'rsl' && 'bghover'">
              <span
                class="d-flex justify-content-center"
                :class="getColorText(item.rsl, 'color_50')"
              >
                {{ item.rsl }}
              </span>
            </td>
          </template>
          <template #san="{ item }">
            <td class="py-1" :class="key_filter_hover == 'san' && 'bghover'">
              <span class="d-flex justify-content-center">
                {{ item.san.toUpperCase() }}
              </span>
            </td>
          </template>
          <template #avg="{ item }">
            <td class="py-1" :class="key_filter_hover == 'avg' && 'bghover'">
              <span
                class="d-flex justify-content-end"
                :class="getColorText(item.avg, '')"
              >
                {{
                  parseFloat(item.avg).toLocaleString("en", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })
                }}
              </span>
            </td>
          </template>
          <template #capital="{ item }">
            <td
              class="py-1"
              :class="key_filter_hover == 'capital' && 'bghover'"
            >
              <span
                class="d-flex justify-content-end"
                :class="getColorText(item.capital, '')"
              >
                {{
                  parseFloat(item.capital).toLocaleString("en", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })
                }}
              </span>
            </td>
          </template>
          <template #is_checkbox="{ item }">
            <td
              class="py-1"
              @click="
                items_data[item.index].is_checkbox =
                  !items_data[item.index].is_checkbox
              "
            >
              <span class="d-flex justify-content-center">
                <CInputCheckbox
                  :checked.sync="items_data[item.index].is_checkbox"
                  class="cursor-pointer m-0"
                />
              </span>
            </td>
          </template>
          <template #is_checkbox-header>
            <div
              @click="is_checkbox_all = !is_checkbox_all"
              class="d-flex justify-content-center"
              style="margin-left: 5px"
            >
              <input type="checkbox" />
            </div>
          </template>
        </CDataTable>
      </CCardBody>
    </CCard>
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
    <CModal
      title="Thêm danh sách các mã đã chọn vào watchlist"
      :show.sync="is_show_modal_add_to_watchlist"
      size="lg"
      :centered="true"
    >
      <template #footer>
        <CButton
          color="secondary"
          @click="is_show_modal_add_to_watchlist = false"
          >Đóng</CButton
        >
      </template>
      <CCard class="mb-0">
        <CCardBody class="mb-0">
          <div class="d-flex">
            <p class="font-weight-bold">Chọn Watchlist</p>
            <div
              @click="is_show_form_add_category_watchlist = true"
              class="cursor-pointer mx-2"
              v-c-tooltip="{
                content: 'Thêm mới Watchlist',
                placement: 'right',
              }"
            >
              <CIcon name="cibAddthis" class="text-upchange" />
            </div>
          </div>
          <CSelect
            :value.sync="list_data_model_add.current_my_watchlist_id"
            :options="option_filter_category"
          />
          <div class="d-flex mt-2" v-if="is_show_form_add_category_watchlist">
            <CInput
              placeholder="Nhập tên Watchlist"
              v-model="value_category_watchlist"
            >
            </CInput>
            <CButton @click="addCategoryWatchlist" color="success" class="ml-2">
              <CIcon name="cibAddthis" />
              Thêm mới
            </CButton>
            <CButton
              @click="is_show_form_add_category_watchlist = false"
              color="secondary"
              class="ml-2"
            >
              Đóng
            </CButton>
          </div>
          <div class="d-flex justify-content-end">
            <CButton
              @click="addManyMackToWatchlist"
              color="success"
              class="mt-2"
            >
              <CIcon name="cibAddthis" />
              Thêm vào watchlist
            </CButton>
          </div>
        </CCardBody>
      </CCard>
    </CModal>
    <CModal
      title="Thông báo"
      :show.sync="is_show_modal_delete_filter_group"
      size="sm"
      :centered="true"
    >
      <template #footer>
        <CButton color="danger" @click="handleDeleteItemFilterGroup">
          <CIcon name="cilTrash" />
          Xóa
        </CButton>
        <CButton
          color="secondary"
          @click="is_show_modal_delete_filter_group = false"
          >Đóng</CButton
        >
      </template>
      <CCard class="mb-0">
        <CCardBody class="mb-0">
          Bạn có muốn xóa bộ lọc
          <strong>{{ data_delete_filter.label }}</strong> không?
        </CCardBody>
      </CCard>
    </CModal>
    <CModal
      title="Thêm mới bộ lọc"
      :show.sync="is_show_modal_add_filter_group"
      size="lg"
      :centered="true"
    >
      <template #footer>
        <CButton
          @click="addNewFilterGroupWithContent"
          color="success"
          class="ml-2"
        >
          <CIcon name="cibAddthis" />
          Thêm mới
        </CButton>
        <CButton
          color="secondary"
          @click="is_show_modal_add_filter_group = false"
          >Đóng</CButton
        >
      </template>
      <CCard class="mb-0">
        <CCardBody class="mb-0">
          <CInput
            label="Tên bộ lọc mới"
            placeholder="Nhập tên bộ lọc"
            v-model="value_filter_action"
          >
          </CInput>
        </CCardBody>
      </CCard>
    </CModal>
  </div>
</template>
<script>
import axios from "axios";
import compareJson from "@/assets/jsons/compare.json";
import draggable from "vuedraggable";

export default {
  name: "FilterCanslim",
  data() {
    return {
      drag: false,
      mackTradingChart: "HPG",
      volume_mask: "0",
      capital_mask: "0",
      isShowModal: false,
      activeCompany: false,
      nameCompany: "",
      items_data: [],
      data_rss: {},
      data_rsm: {},
      data_rsl: {},
      fields: [
        {
          key: "is_checkbox",
          label: "Chọn",
          _style: "width: 10px",
        },
        {
          key: "mack",
          label: "Mã CK",
        },
        {
          key: "nganh",
          label: "Ngành nghề",
          _style: "text-align: center",
        },
        {
          key: "san",
          label: "Sàn giao dịch",
          _style: "text-align: center",
          type: Number,
        },
        {
          key: "diem_canslim",
          label: "Điểm Canslim",
          _style: "text-align: center",
          type: Number,
        },
        {
          key: "diem_4m",
          label: "Điểm 4M",
          _style: "text-align: center",
          type: Number,
        },
        {
          key: "avg",
          label: "Khối lượng TB 50 phiên gần nhất",
          _style: "text-align: center;width: 18%",
          type: Number,
        },
        {
          key: "capital",
          label: "Vốn hóa (tỷ đồng)",
          _style: "text-align: center;",
          type: Number,
        },
      ],
      filter_mack_value: "",
      filter_department_value: "",
      filter_canslim_point_value: "",
      filter_canslim_point_range: "",
      filter_4m_point_value: "",
      filter_4m_point_range: "",
      filter_total_vol_value: "",
      filter_total_vol_range: "",
      filter_capital_value: "",
      filter_capital_range: "",
      filter_expression_board_value: "",
      filter_expression_capital_value: "above",
      filter_expression_canslim_value: "above",
      filter_expression_4m_value: "above",
      filter_expression_total_vol_value: "above",
      selected: { name: "", id: "" },
      money: {
        decimal: ".",
        thousands: ",",
        prefix: "",
        suffix: "",
        precision: 0,
        masked: false /* doesn't work with directive */,
      },
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
      option_filter_board: [
        {
          value: "",
          label: "Tất cả",
        },
        {
          value: "HOSE",
          label: "HOSE",
        },
        {
          value: "HNX",
          label: "HNX",
        },
        {
          value: "UPCOM",
          label: "UPCOM",
        },
      ],
      option_departments: [],
      option_filter_category: [],
      list_data_model_add: {
        current_my_watchlist_id: null,
        mack: "",
      },
      open: false,
      current: 0,
      suggestions: [],
      is_loading_4mcanslim: true,
      is_loading_count_stock: true,
      data_eod_avg: {},
      data_count_stock: {},
      check_key: false,
      is_hover_dropdown: false,
      is_interval: true,
      list_mack_join: [],
      isModerator: false,
      list_filter: [],
      filter_expression_type_stock_value: "",
      option_filter_type_stock: [
        {
          value: "",
          label: "Tất cả",
        },
        {
          value: "nonbank",
          label: "Phổ thông",
        },
        {
          value: "bank",
          label: "Ngân hàng",
        },
        {
          value: "stock",
          label: "Chứng khoán",
        },
        {
          value: "insurance",
          label: "Bảo hiểm",
        },
      ],
      collapse_advanced_filter: false,
      is_show_modal_add_to_watchlist: false,
      key_filter_active: "common_filter",
      data_compare_all: {
        common: {},
        nonbank: {},
        bank: {},
        stock: {},
        insurance: {},
      },
      list_filter_group: [],
      key_filter_hover: "",
      type_action: "",
      value_filter_action: "",
      item_filter_group_active: {
        id: -1,
        label: "",
        content: {
          list_filter: [],
          type_stock: "",
        },
      },
      is_checkbox_all: false,
      value_category_watchlist: "",
      is_show_form_add_category_watchlist: false,
      is_show_modal_delete_filter_group: false,
      is_show_modal_add_filter_group: false,
      data_delete_filter: {},
    };
  },
  components: {
    draggable,
  },
  props: {
    itemsPerPage: {
      type: Number,
    },
  },
  created() {
    this.getDataRS();
    this.getListFilterGroup();
    setInterval(() => {
      if (this.is_interval) {
        this.getDataRS();
      }
    }, 30000);
    this.getMyWatchlist();
    this.getAllEOD();
    this.getAllItem4MCanslim();
    this.getAllCountStock();
    let roles = localStorage.getItem("roles");
    if (roles != null) {
      roles = roles.split(",");
      this.isModerator = roles.indexOf("moderator") >= 0 ? true : false;
    }
  },
  methods: {
    getDataRS() {
      window.socket_send.emit("getrs", 10, (res) => {
        if (!res) return;
        if (Object.keys(res).length == 0) return;
        let temp_data_rss = {};
        if (res.stockcode.length > 0) {
          for (let i = 0; i < res.stockcode.length; i++) {
            temp_data_rss[res.stockcode[i]] = res.point[i];
          }
        }
        this.data_rss = temp_data_rss;
      });
      window.socket_send.emit("getrs", 20, (res) => {
        if (!res) return;
        if (Object.keys(res).length == 0) return;
        let temp_data_rsm = {};
        if (res.stockcode.length > 0) {
          for (let i = 0; i < res.stockcode.length; i++) {
            temp_data_rsm[res.stockcode[i]] = res.point[i];
          }
        }
        this.data_rsm = temp_data_rsm;
      });
      window.socket_send.emit("getrs", 50, (res) => {
        if (!res) return;
        if (Object.keys(res).length == 0) return;
        let temp_data_rsl = {};
        if (res.stockcode.length > 0) {
          for (let i = 0; i < res.stockcode.length; i++) {
            temp_data_rsl[res.stockcode[i]] = res.point[i];
          }
        }
        this.data_rsl = temp_data_rsl;
      });
    },
    getMyWatchlist() {
      let self = this;
      self.is_loading_data = true;
      axios
        .get(self.$apiAdress + "/api/my-watchlist", {
          params: {
            token: localStorage.getItem("api_token"),
          },
        })
        .then(function (res) {
          self.is_loading_data = false;
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
          self.is_loading_data = false;
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
        this.getDataCompareAll();
      });
    },
    getAllItem4MCanslim() {
      this.is_loading_4mcanslim = true;
      axios
        .get(this.$apiAdress + "/api/stocks/canslim-fourm/all", {
          params: {
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          this.items_data = res.data.map((item) => {
            return {
              ...item,
              is_checkbox: false,
            };
          });
          var option_departments_defaut = [];
          for (var key in res.data) {
            if (!option_departments_defaut.includes(res.data[key].nganh)) {
              option_departments_defaut.push(res.data[key].nganh);
              this.option_departments.push({
                id: res.data[key].nganh,
                name: res.data[key].nganh,
              });
            }
          }
          if (this.option_departments.length > 0) {
            this.option_department = res.data[0].id;
          }
          this.is_loading_4mcanslim = false;
        })
        .catch((err) => {
          console.log(err);
          this.is_loading_4mcanslim = false;
        });
    },
    getDataCompareAll() {
      axios
        .get(
          this.$apiAdress + "/api/stocks/canslim-fourm/get-data-compare-all",
          {
            params: {
              token: localStorage.getItem("api_token"),
            },
          }
        )
        .then((res) => {
          for (let i = 0; i < res.data.nonbank.mack.length; i++) {
            const mack = res.data.nonbank.mack[i];
            let item = {};
            for (const key in res.data.nonbank) {
              item[key] = res.data.nonbank[key][i];
            }
            const price =
              (this.data_eod_avg[mack] && this.data_eod_avg[mack].eod) || 0;
            item["gia_thi_truong"] = price;
            item["von_hoa"] = (price * item["von_hoa"]) / 1000;
            item["gia_tri_doanh_nghiep"] =
              item["von_hoa"] + item["gia_tri_doanh_nghiep"];
            item["pe"] = item["pe"] != 0 ? price / item["pe"] : 0;
            item["pb"] = item["pb"] != 0 ? price / item["pb"] : 0;
            item["evebit"] =
              item["evebit"] != 0
                ? item["gia_tri_doanh_nghiep"] / item["evebit"]
                : 0;
            item["evebitda"] =
              item["evebitda"] != 0
                ? item["gia_tri_doanh_nghiep"] / item["evebitda"]
                : 0;
            item["peg"] = item["peg"] != 0 ? item["pe"] / item["peg"] : 0;
            this.data_compare_all.nonbank[mack] = item;
            this.data_compare_all.common[mack] = item;
          }
          for (let i = 0; i < res.data.bank.mack.length; i++) {
            const mack = res.data.bank.mack[i];
            let item = {};
            for (const key in res.data.bank) {
              item[key] = res.data.bank[key][i];
            }
            const price =
              (this.data_eod_avg[mack] && this.data_eod_avg[mack].eod) || 0;
            item["gia_thi_truong"] = price;
            item["pe"] = item["pe"] != 0 ? price / item["pe"] : 0;
            item["peg"] = item["peg"] != 0 ? item["pe"] / item["peg"] : 0;
            item["bvps"] = item["gia_tri_so_sach"] =
              item["von_hoa"] != 0
                ? item["gia_tri_so_sach"] / item["von_hoa"]
                : 0;
            item["pb"] =
              item["gia_tri_so_sach"] != 0
                ? price / item["gia_tri_so_sach"]
                : 0;
            item["von_hoa"] = (price * item["von_hoa"]) / 1000;
            this.data_compare_all.bank[mack] = item;
            this.data_compare_all.common[mack] = item;
          }
          for (let i = 0; i < res.data.stock.mack.length; i++) {
            const mack = res.data.stock.mack[i];
            let item = {};
            for (const key in res.data.stock) {
              item[key] = res.data.stock[key][i];
            }
            const price =
              (this.data_eod_avg[mack] && this.data_eod_avg[mack].eod) || 0;
            item["gia_thi_truong"] = price;
            item["von_hoa"] = (price * item["von_hoa"]) / 1000;
            item["gia_tri_doanh_nghiep"] =
              item["von_hoa"] + item["gia_tri_doanh_nghiep"];
            item["pe"] = item["pe"] != 0 ? price / item["pe"] : 0;
            item["pb"] = item["pb"] != 0 ? price / item["pb"] : 0;
            item["ev_ebit"] =
              item["ev_ebit"] != 0
                ? item["gia_tri_doanh_nghiep"] / item["ev_ebit"]
                : 0;
            item["peg"] = item["peg"] != 0 ? item["pe"] / item["peg"] : 0;
            this.data_compare_all.stock[mack] = item;
            this.data_compare_all.common[mack] = item;
          }
          for (let i = 0; i < res.data.insurance.mack.length; i++) {
            const mack = res.data.insurance.mack[i];
            let item = {};
            for (const key in res.data.insurance) {
              item[key] = res.data.insurance[key][i];
            }
            const price =
              (this.data_eod_avg[mack] && this.data_eod_avg[mack].eod) || 0;
            item["gia_thi_truong"] = price;
            item["von_hoa"] = price * item["von_hoa"];
            item["gia_tri_doanh_nghiep"] =
              item["von_hoa"] + item["gia_tri_doanh_nghiep"];
            item["pe"] = item["pe"] != 0 ? price / item["pe"] : 0;
            item["pb"] = item["pb"] != 0 ? price / item["pb"] : 0;
            item["evebit"] =
              item["evebit"] != 0
                ? item["gia_tri_doanh_nghiep"] / (item["evebit"] / 1000)
                : 0;
            item["evebitda"] =
              item["evebitda"] != 0
                ? item["gia_tri_doanh_nghiep"] / (item["evebitda"] / 1000)
                : 0;
            item["peg"] =
              item["peg"] != 0 ? item["pe"] / item["peg"] / 10000 : 0;
            this.data_compare_all.insurance[mack] = item;
            this.data_compare_all.common[mack] = item;
          }
          // this.filter_expression_type_stock_value =
          //   localStorage.getItem(
          //     "filter_point_filter_expression_type_stock_value"
          //   ) || "";
          // let list_filter_temp = localStorage.getItem(
          //   "filter_point_list_filter"
          // );
          // if (list_filter_temp != null) {
          //   setTimeout(() => {
          //     this.list_filter = JSON.parse(list_filter_temp);
          //   }, 100);
          // }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getAllCountStock() {
      this.is_loading_count_stock = true;
      axios
        .get(this.$apiAdress + "/api/stocks/canslim-fourm/count-stock", {
          params: {
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
    validateSelection(selection) {
      this.selected = selection;
      if (this.selected.name) {
        this.filter_department_value = this.selected.name;
      }
    },
    getInfo(mack) {
      if (!this.list_mack_join.includes(mack)) {
        this.list_mack_join.push(mack);
      }
      this.$store.state.mackTradingChart = mack;
      this.$store.state.isShowModalTradingChart = true;
    },
    handleVolumeMaskChange() {
      this.filter_total_vol_value = this.volume_mask.split(",").join("");
    },
    handleCapitalMaskChange() {
      this.filter_capital_value = this.capital_mask.split(",").join("");
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
    slug_key(text) {
      text = text.trim().toLowerCase();
      text = text.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
      text = text.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
      text = text.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
      text = text.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
      text = text.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
      text = text.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
      text = text.replace(/đ/gi, "d");
      text = text.replace(/ /gi, "_");
      return text;
    },
    enter() {
      if (this.openSuggestion) {
        this.filter_department_value = this.suggestions[this.current];
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

    searchMack(department) {
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
      this.open = true;
      this.current = 0;
      this.suggestions = this.searchMack(this.filter_department_value);
      this.key_filter_hover = "nganh";
    },
    focusoutInputDepartment() {
      if (!this.is_hover_dropdown) {
        this.open = false;
        this.current = 0;
      }
      this.key_filter_hover = "";
    },
    change() {
      if (!this.open) {
        this.open = true;
        this.current = 0;
      }
      this.suggestions = this.searchMack(this.filter_department_value);
    },

    suggestionClick(index) {
      this.filter_department_value = this.suggestions[index];
      this.open = false;
    },

    addNewFilter(item) {
      if (!this.list_key_advanced_filter.includes(item.key_mapping_data)) {
        this.list_filter.push({
          ...item,
          key: item.key_mapping_data,
          label: item.thong_tin,
          is_show: false,
          type_filter: "above",
          value_filter: "",
          range_filter: "",
        });
      }
    },
    getListFilterGroup() {
      axios
        .get(
          this.$apiAdress +
            "/api/stocks/canslim-fourm/save_filter_group/get-all",
          {
            params: {
              token: localStorage.getItem("api_token"),
            },
          }
        )
        .then((res) => {
          this.list_filter_group = res.data.map((item) => {
            return {
              ...item,
              content: JSON.parse(item.content) || {
                list_filter: [],
                type_stock: "",
              },
            };
          });
          // if (this.list_filter_group.length > 0) {
          //   this.item_filter_group_active = JSON.parse(
          //     JSON.stringify(this.list_filter_group[0])
          //   );
          //   this.filter_expression_type_stock_value =
          //     this.list_filter_group[0].content.type_stock || "";
          //   setTimeout(() => {
          //     this.list_filter =
          //       JSON.parse(JSON.stringify(this.list_filter_group[0].content.list_filter)) || [];
          //   }, 100);
          // }
        })
        .catch((error) => {
          console.error(error);
          this.$toast.error("Có lỗi xảy ra, vui lòng thử lại");
        });
    },

    addNewFilterGroup() {
      if (this.value_filter_action == "") {
        this.$toast.error("Bạn cần nhập nội dung");
      } else {
        const content = {
          list_filter: [],
          type_stock: "",
        };
        axios
          .post(
            this.$apiAdress +
              "/api/stocks/canslim-fourm/save_filter_group/store",
            {
              label: this.value_filter_action,
              content: JSON.stringify(content),
              token: localStorage.getItem("api_token"),
            }
          )
          .then((res) => {
            this.list_filter_group.unshift({
              ...res.data,
              content: content,
            });
            if (this.list_filter_group.length == 1) {
              this.item_filter_group_active = JSON.parse(
                JSON.stringify(this.list_filter_group[0])
              );
            }
            this.value_filter_action = "";
            this.type_action = "";
            this.$toast.success("Thêm mới bộ lọc thành công");
          })
          .catch((error) => {
            console.error(error);
            this.$toast.error("Có lỗi xảy ra, vui lòng thử lại");
          });
      }
    },
    addNewFilterGroupWithContent() {
      if (this.value_filter_action == "") {
        this.$toast.error("Bạn cần nhập nội dung");
      } else {
        const content = {
          type_stock: this.filter_expression_type_stock_value,
          list_filter: this.list_filter,
        };
        axios
          .post(
            this.$apiAdress +
              "/api/stocks/canslim-fourm/save_filter_group/store",
            {
              label: this.value_filter_action,
              content: JSON.stringify(content),
              token: localStorage.getItem("api_token"),
            }
          )
          .then((res) => {
            this.list_filter_group.unshift({
              ...res.data,
              content: content,
            });
            this.item_filter_group_active = JSON.parse(
              JSON.stringify(this.list_filter_group[0])
            );
            this.value_filter_action = "";
            this.is_show_modal_add_filter_group = false;
            this.$toast.success("Thêm mới bộ lọc thành công");
          })
          .catch((error) => {
            console.error(error);
            this.is_show_modal_add_filter_group = false;
            this.$toast.error("Có lỗi xảy ra, vui lòng thử lại");
          });
      }
    },
    saveFilterGroup() {
      if (this.value_filter_action == "") {
        this.$toast.error("Bạn cần nhập nội dung");
      } else {
        axios
          .put(
            this.$apiAdress +
              "/api/stocks/canslim-fourm/save_filter_group/update",
            {
              id: this.item_filter_group_active.id,
              label: this.value_filter_action,
              content: this.item_filter_group_active.content,
              token: localStorage.getItem("api_token"),
            }
          )
          .then((res) => {
            this.list_filter_group.forEach((item, i) => {
              if (item.id == res.data.id) {
                this.list_filter_group[i].label = this.value_filter_action;
              }
            });
            if (this.item_filter_group_active.id == res.data.id) {
              this.item_filter_group_active.label = this.value_filter_action;
            }
            this.value_filter_action = "";
            this.type_action = "";
            this.$toast.success("Cập nhật dữ liệu thành công");
          })
          .catch((error) => {
            console.error(error);
            this.$toast.error("Có lỗi xảy ra, vui lòng thử lại");
          });
      }
    },
    handleClickItemFilterGroup(item) {
      if (item.id == this.item_filter_group_active.id) {
        this.item_filter_group_active = {
          id: -1,
          label: "",
          content: {
            list_filter: [],
            type_stock: "",
          },
        };
      } else {
        this.item_filter_group_active = item;
        this.value_filter_action = item.label;
        this.filter_expression_type_stock_value = item.content.type_stock || "";
        setTimeout(() => {
          this.list_filter =
            JSON.parse(JSON.stringify(item.content.list_filter)) || [];
        }, 100);
      }
    },
    restoreFilterGroup() {
      this.filter_expression_type_stock_value =
        this.item_filter_group_active.content.type_stock || "";
      setTimeout(() => {
        this.list_filter =
          JSON.parse(
            JSON.stringify(this.item_filter_group_active.content.list_filter)
          ) || [];
      }, 100);
    },
    handleDeleteItemFilterGroup() {
      axios
        .delete(
          this.$apiAdress +
            "/api/stocks/canslim-fourm/save_filter_group/" +
            this.data_delete_filter.id,
          {
            params: {
              token: localStorage.getItem("api_token"),
            },
          }
        )
        .then(() => {
          this.list_filter_group.forEach((item, i) => {
            if (this.data_delete_filter.id == item.id) {
              this.list_filter_group.splice(i, 1);
            }
          });
          if (this.data_delete_filter.id == this.item_filter_group_active.id) {
            this.item_filter_group_active = {
              id: -1,
              label: "",
              content: {
                list_filter: [],
                type_stock: "",
              },
            };
          }
          this.is_show_modal_delete_filter_group = false;
          this.$toast.success("Đã xóa bộ lọc thành công");
        })
        .catch((error) => {
          console.error(error);
          this.is_show_modal_delete_filter_group = false;
          this.$toast.error("Có lỗi xảy ra, vui lòng thử lại");
        });
    },
    saveContentFilterGroup() {
      const content = {
        type_stock: this.filter_expression_type_stock_value,
        list_filter: this.list_filter,
      };
      axios
        .put(
          this.$apiAdress +
            "/api/stocks/canslim-fourm/save_filter_group/update",
          {
            id: this.item_filter_group_active.id,
            label: this.item_filter_group_active.label,
            content: JSON.stringify(content),
            token: localStorage.getItem("api_token"),
          }
        )
        .then((res) => {
          this.list_filter_group.forEach((item, i) => {
            if (item.id == res.data.id) {
              this.list_filter_group[i].content = JSON.parse(
                JSON.stringify(content)
              );
            }
          });
          this.item_filter_group_active.content = JSON.parse(
            JSON.stringify(content)
          );
          this.$toast.success("Đã lưu lại bộ lọc");
        })
        .catch((error) => {
          console.error(error);
          this.$toast.error("Có lỗi xảy ra, vui lòng thử lại");
        });
    },
    checkAllItem() {
      for (const item of this.items_data) {
        item.is_checkbox = !this.is_checkbox_all;
      }
      this.is_checkbox_all = !this.is_checkbox_all;
    },
    addManyMackToWatchlist() {
      if (this.list_mack_selected.length > 50) {
        this.$toast.info("Bạn chỉ được thêm tối đa 50 mã");
      } else {
        axios
          .post(this.$apiAdress + "/api/watchlist/add-many-item", {
            mack: this.list_mack_selected,
            my_watchlist_id: this.list_data_model_add.current_my_watchlist_id,
            token: localStorage.getItem("api_token"),
          })
          .then((res) => {
            this.$toast.success(
              "Đã thêm " + this.list_mack_selected.length + " mã vào watchlist"
            );
            this.is_show_modal_add_to_watchlist = false;
          })
          .catch((error) => {
            this.is_show_modal_add_to_watchlist = false;
            if (
              error.response.data.error_code &&
              error.response.data.error_code == "watch_list_mack_exist"
            ) {
              this.$toast.error("Danh sách này đã có ở trong watchlist");
            } else {
              this.$toast.error("Có lỗi xảy ra, vui lòng thử lại");
            }
          });
      }
    },
    addCategoryWatchlist() {
      if (this.value_category_watchlist == "") {
        this.$toast.error("Tên Watchlist không được để trống");
        return;
      }
      axios
        .post(this.$apiAdress + "/api/my-watchlist", {
          name: this.value_category_watchlist,
          token: localStorage.getItem("api_token"),
        })
        .then((response) => {
          this.option_filter_category.unshift({
            value: response.data.id,
            label: response.data.name,
          });
          this.list_data_model_add.current_my_watchlist_id = response.data.id;
          this.$toast.success("Đã thêm mới Watchlist");
          this.value_category_watchlist = "";
          this.is_show_form_add_category_watchlist = false;
        })
        .catch((error) => {
          console.error(error);
          this.$toast.error("Có lỗi xảy ra, vui lòng thử lại");
        });
    },
    getColorText(value, type) {
      if (type == "color_50") {
        if (value == 0) {
          return "text-inactive";
        } else {
          return value >= 50 ? "text-upchange" : "text-downchange";
        }
      } else {
        if (value == 0) {
          return "text-inactive";
        } else {
          return "";
        }
      }
    },
  },
  beforeDestroy() {
    this.is_interval = false;
    window.socket_send.emit("leave", this.list_mack_join);
  },
  computed: {
    dragOptions() {
      return {
        animation: 350,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
    is_valid_interval() {
      const offset = 7;
      let date = new Date(new Date().getTime() + offset * 3600 * 1000);
      let hour = date.getUTCHours();
      let day = date.getDay();
      let minute = date.getUTCMinutes();
      if (day <= 5 && hour >= 8 && hour <= 15) {
        if (hour == 8 || hour == 11 || hour == 12 || hour == 15) {
          if (hour == 8) {
            if (minute >= 55) {
              if (this.is_interval) {
                return true;
              }
            }
          } else if (hour == 11) {
            if (minute <= 35) {
              if (this.is_interval) {
                return true;
              }
            }
          } else if (hour == 12) {
            if (minute >= 55) {
              if (this.is_interval) {
                return true;
              }
            }
          } else if (hour == 15) {
            if (minute <= 5) {
              if (this.is_interval) {
                return true;
              }
            }
          }
        } else {
          if (this.is_interval) {
            return true;
          }
        }
      }
      return false;
    },
    openSuggestion() {
      return this.suggestions.length != 0 && this.open === true;
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
    itemTable() {
      if (
        this.items_data &&
        Object.keys(this.$store.state.list_mack).length > 0
      ) {
        let return_data = this.items_data.map((item, index) => {
          // for (const it of this.list_filter) {
          //   item[it.key] = 0;
          // }
          let temp_item = {};
          if (this.filter_expression_type_stock_value != "") {
            temp_item =
              this.data_compare_all[this.filter_expression_type_stock_value][
                item.mack
              ] || {};
          } else {
            temp_item = this.data_compare_all["common"][item.mack] || {};
          }
          for (const it of this.list_filter) {
            item[it.key] = parseFloat(temp_item[it.key]) || 0;
          }
          return {
            ...item,
            index: index,
            san: this.$store.state.list_mack_company.hasOwnProperty(item.mack)
              ? this.$store.state.list_mack_company[item.mack].san
              : "",
            ten_cong_ty: this.$store.state.list_mack_company.hasOwnProperty(
              item.mack
            )
              ? this.$store.state.list_mack_company[item.mack].ten_cong_ty
              : "",
            nhom: this.$store.state.list_mack_company.hasOwnProperty(item.mack)
              ? this.$store.state.list_mack_company[item.mack].nhom
              : "",
            nganh: this.$store.state.list_mack_company.hasOwnProperty(item.mack)
              ? this.$store.state.list_mack_company[item.mack].nganh
              : "",
            avg: this.data_eod_avg.hasOwnProperty(item.mack)
              ? parseFloat(this.data_eod_avg[item.mack].avgvol50)
              : 0,
            capital:
              this.data_eod_avg.hasOwnProperty(item.mack) &&
              this.data_count_stock.hasOwnProperty(item.mack)
                ? (parseFloat(this.data_eod_avg[item.mack].eod) *
                    parseFloat(this.data_count_stock[item.mack])) /
                  1000000000
                : 0,
            rss: this.data_rss.hasOwnProperty(item.mack)
              ? this.data_rss[item.mack]
              : 0,
            rsm: this.data_rsm.hasOwnProperty(item.mack)
              ? this.data_rsm[item.mack]
              : 0,
            rsl: this.data_rsl.hasOwnProperty(item.mack)
              ? this.data_rsl[item.mack]
              : 0,
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
        if (this.filter_mack_value !== "") {
          return_data = return_data.filter((item) =>
            item.mack.includes(this.filter_mack_value.toUpperCase())
          );
        }
        if (this.filter_expression_type_stock_value != "") {
          return_data = return_data.filter(
            (item) => item.nhom == this.filter_expression_type_stock_value
          );
        }
        if (this.filter_department_value !== "") {
          if (this.open) {
            return_data = return_data.filter((item) =>
              this.changeTextSpecial(item.nganh).includes(
                this.changeTextSpecial(
                  this.filter_department_value.toUpperCase()
                )
              )
            );
          } else {
            return_data = return_data.filter(
              (item) =>
                item.nganh.toUpperCase() ==
                this.filter_department_value.toUpperCase()
            );
          }
        }
        if (
          this.filter_canslim_point_value !== "" &&
          this.filter_expression_canslim_value != "range"
        ) {
          switch (this.filter_expression_canslim_value) {
            case "above":
              return_data = return_data.filter(
                (item) => item.diem_canslim > this.filter_canslim_point_value
              );
              break;
            case "below":
              return_data = return_data.filter(
                (item) => item.diem_canslim < this.filter_canslim_point_value
              );
              break;
            default:
              break;
          }
        }
        if (
          this.filter_canslim_point_range !== "" &&
          this.filter_expression_canslim_value == "range"
        ) {
          const regex = /\d+-{1}\d+$/;
          let arr_point_range = this.filter_canslim_point_range;
          arr_point_range = arr_point_range.replace(/ /g, "");
          if (regex.test(arr_point_range)) {
            arr_point_range = arr_point_range.split("-");
            return_data = return_data.filter(
              (item) =>
                item.diem_canslim >= arr_point_range[0] &&
                item.diem_canslim <= arr_point_range[1]
            );
          }
        }
        if (
          this.filter_4m_point_value !== "" &&
          this.filter_expression_4m_value != "range"
        ) {
          switch (this.filter_expression_4m_value) {
            case "above":
              return_data = return_data.filter(
                (item) => item.diem_4m > this.filter_4m_point_value
              );
              break;
            case "below":
              return_data = return_data.filter(
                (item) => item.diem_4m < this.filter_4m_point_value
              );
              break;
            default:
              break;
          }
        }
        if (
          this.filter_4m_point_range !== "" &&
          this.filter_expression_4m_value == "range"
        ) {
          const regex = /\d+-{1}\d+$/;
          let arr_point_range = this.filter_4m_point_range;
          arr_point_range = arr_point_range.replace(/ /g, "");
          if (regex.test(arr_point_range)) {
            arr_point_range = arr_point_range.split("-");
            return_data = return_data.filter(
              (item) =>
                item.diem_4m >= arr_point_range[0] &&
                item.diem_4m <= arr_point_range[1]
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
        if (
          this.filter_capital_value !== "" &&
          this.filter_expression_capital_value != "range"
        ) {
          switch (this.filter_expression_capital_value) {
            case "above":
              return_data = return_data.filter(
                (item) => item.capital >= this.filter_capital_value
              );
              break;
            case "below":
              return_data = return_data.filter(
                (item) => item.capital <= this.filter_capital_value
              );
              break;
            default:
              break;
          }
        }
        if (
          this.filter_capital_range !== "" &&
          this.filter_expression_capital_value == "range"
        ) {
          const regex = /\d+-{1}\d+$/;
          let arr_point_range = this.filter_capital_range;
          arr_point_range = arr_point_range.replace(/ /g, "");
          if (regex.test(arr_point_range)) {
            arr_point_range = arr_point_range.split("-");
            return_data = return_data.filter(
              (item) =>
                item.capital >= arr_point_range[0] &&
                item.capital <= arr_point_range[1]
            );
          }
        }
        for (const it of this.list_filter) {
          if (
            it.value_filter != null &&
            it.value_filter != "" &&
            it.type_filter != "range"
          ) {
            let value_filter = it.value_filter || "0";
            value_filter = value_filter.replace(/ /g, "");
            value_filter = value_filter.replace(/,/g, "");
            value_filter =
              it.type == "money"
                ? parseFloat(value_filter) * 1000
                : parseFloat(value_filter);
            switch (it.type_filter) {
              case "above":
                return_data = return_data.filter(
                  (item) => parseFloat(item[it.key]) >= value_filter
                );
                break;
              case "below":
                return_data = return_data.filter(
                  (item) => parseFloat(item[it.key]) <= value_filter
                );
                break;
              default:
                break;
            }
          }
          if (
            it.range_filter != null &&
            it.range_filter != "" &&
            it.type_filter == "range"
          ) {
            const regex = /\d+-{1}\d+$/;
            let arr_point_range = it.range_filter || "";
            arr_point_range = arr_point_range.replace(/ /g, "");
            if (regex.test(arr_point_range)) {
              arr_point_range = arr_point_range.split("-");
              const v0 =
                it.type == "money"
                  ? parseFloat(arr_point_range[0]) * 1000
                  : parseFloat(arr_point_range[0]);
              const v1 =
                it.type == "money"
                  ? parseFloat(arr_point_range[1]) * 1000
                  : parseFloat(arr_point_range[1]);
              return_data = return_data.filter(
                (item) =>
                  parseFloat(item[it.key]) >= v0 &&
                  parseFloat(item[it.key]) <= v1
              );
            }
          }
        }
        if (this.filter_expression_board_value !== "") {
          return_data = return_data.filter(
            (item) => item.san == this.filter_expression_board_value
          );
        }
        return return_data;
      }
      return [];
    },
    fieldsTable() {
      let return_data = [
        {
          key: "is_checkbox",
          label: "Chọn",
          sorter: false,
          _style: "width: 10px",
        },
        {
          key: "mack",
          label: "Mã CK",
        },
        {
          key: "nganh",
          label: "Ngành nghề",
          _style: "text-align: center",
        },
        {
          key: "san",
          label: "Sàn giao dịch",
          _style: "text-align: center",
          type: Number,
        },
        {
          key: "diem_canslim",
          label: "Điểm Canslim",
          _style: "text-align: center",
          type: Number,
        },
        {
          key: "diem_4m",
          label: "Điểm 4M",
          _style: "text-align: center",
          type: Number,
        },
        {
          key: "rss",
          label: "Điểm RSs",
          _style: "text-align: center",
          type: Number,
        },
        {
          key: "rsm",
          label: "Điểm RSm",
          _style: "text-align: center",
          type: Number,
        },
        {
          key: "rsl",
          label: "Điểm RSl",
          _style: "text-align: center",
          type: Number,
        },
        {
          key: "avg",
          label: "Khối lượng TB 50 phiên gần nhất",
          _style: "text-align: center;",
          type: Number,
        },
        {
          key: "capital",
          label: "Vốn hóa (tỷ đồng)",
          _style: "text-align: center;",
          type: Number,
        },
      ];
      if (this.isModerator) {
        return_data = [
          {
            key: "is_checkbox",
            label: "Chọn",
            sorter: false,
            _style: "width: 10px",
          },
          {
            key: "mack",
            label: "Mã CK",
          },
          {
            key: "nganh",
            label: "Ngành nghề",
            _style: "text-align: center",
          },
          {
            key: "san",
            label: "Sàn giao dịch",
            _style: "text-align: center",
            type: Number,
          },
          {
            key: "diem_canslim",
            label: "Điểm Canslim",
            _style: "text-align: center",
            type: Number,
          },
          {
            key: "diem_4m",
            label: "Điểm 4M",
            _style: "text-align: center",
            type: Number,
          },
          {
            key: "rss",
            label: "Điểm RSs",
            _style: "text-align: center",
            type: Number,
          },
          {
            key: "rsm",
            label: "Điểm RSm",
            _style: "text-align: center",
            type: Number,
          },
          {
            key: "rsl",
            label: "Điểm RSl",
            _style: "text-align: center",
            type: Number,
          },
          {
            key: "avg",
            label: "Khối lượng TB 50 phiên gần nhất",
            _style: "text-align: center;",
            type: Number,
          },
          {
            key: "capital",
            label: "Vốn hóa (tỷ đồng)",
            _style: "text-align: center;",
            type: Number,
          },
        ];
      }
      for (const item of this.list_filter) {
        return_data.push({
          ...item,
          key: item.key,
          type_number: item.type,
          label: item.label,
          _style: "text-align: center",
          type: Number,
        });
      }
      return return_data;
    },
    list_key_advanced_filter() {
      return this.list_filter.map((item) => item.key);
    },
    list_item_filter() {
      let data_return = {};
      let items_original = [];
      if (this.filter_expression_type_stock_value == "") {
        const child_item_common = [
          {
            don_vi: "VND",
            key_mapping_data: "gia_thi_truong",
            postText: "",
            prefixText: "",
            thong_tin: "Giá thị trường (D)",
            type: "",
          },
          {
            don_vi: "VND",
            key_mapping_data: "eps",
            prefixText: "",
            thong_tin: "EPS (TTM)",
            type: "percent",
          },
          {
            thong_tin: "Tăng trưởng EPS(TTM)",
            don_vi: "%",
            containChart: true,
            type: "percent",
            key_mapping_data: "tang_truong_eps",
          },
          {
            thong_tin: "BVPS (TTM)",
            don_vi: "VND",
            containChart: true,
            key_mapping_data: "bvps",
          },
          {
            thong_tin: "Tăng trưởng BVPS(TTM)",
            don_vi: "%",
            containChart: true,
            type: "percent",
            key_mapping_data: "tang_truong_bvps",
          },
          {
            thong_tin: "PE (D)",
            don_vi: "LẦN",
            containChart: true,
            key_calculate: "pe",
            key_mapping_data: "pe",
          },
        ];
        data_return["common_filter"] = {
          key: "common_filter",
          label: "Bộ lọc chung",
          child_item: child_item_common,
        };
      } else {
        switch (this.filter_expression_type_stock_value) {
          case "nonbank":
            items_original = JSON.parse(
              JSON.stringify(compareJson.nonbank.items)
            );
            break;
          case "bank":
            items_original = JSON.parse(JSON.stringify(compareJson.bank.items));
            break;
          case "stock":
            items_original = JSON.parse(
              JSON.stringify(compareJson.stock.items)
            );
            break;
          case "insurance":
            items_original = JSON.parse(
              JSON.stringify(compareJson.insurance.items)
            );
            break;
          default:
            break;
        }
        let current_key_title = "";
        let arr_key_item = [];
        for (const item of items_original) {
          if (item.thong_tin == "Cập nhật đến") {
            continue;
          }
          if (item.isTitle) {
            if (current_key_title != "" && arr_key_item.length > 0) {
              const key = this.slug_key(current_key_title);
              data_return[key] = {
                key: key,
                label: current_key_title,
                child_item: arr_key_item,
              };
            }
            current_key_title = item.thong_tin;
            arr_key_item = [];
          } else {
            arr_key_item.push(item);
          }
        }
        if (current_key_title != "" && arr_key_item.length > 0) {
          const key = this.slug_key(current_key_title);
          data_return[key] = {
            key: key,
            label: current_key_title,
            child_item: arr_key_item,
          };
        }
      }
      return data_return;
    },
    child_item_filter() {
      let data_return = [];
      if (
        this.key_filter_active != "" &&
        this.list_item_filter.hasOwnProperty(this.key_filter_active)
      ) {
        data_return = JSON.parse(
          JSON.stringify(
            this.list_item_filter[this.key_filter_active].child_item
          )
        );
      }
      return data_return;
    },
    list_mack_selected() {
      return this.itemTable
        .filter((item) => item.is_checkbox)
        .map((item) => item.mack);
    },
  },
  watch: {
    filter_expression_type_stock_value: {
      deep: true,
      handler(newVal, oldVal) {
        if (newVal == "") {
          this.key_filter_active = "common_filter";
        } else {
          this.key_filter_active = "dinh_gia";
        }
        this.list_filter = [];
        localStorage.setItem(
          "filter_point_filter_expression_type_stock_value",
          this.filter_expression_type_stock_value
        );
      },
    },
    list_filter: {
      deep: true,
      handler() {
        localStorage.setItem(
          "filter_point_list_filter",
          JSON.stringify(this.list_filter)
        );
      },
    },
    is_checkbox_all: {
      deep: true,
      handler() {
        for (const item of this.items_data) {
          item.is_checkbox = this.is_checkbox_all;
        }
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.form-group {
  margin-bottom: 0;
}
.active-tab-key {
  border-left: 3px solid #8c58b3 !important;
}
.bghover {
  background-color: #8c58b3 !important;
  color: #fff;
  a,
  svg,
  span {
    color: #fff !important;
  }
}
.group-search-child,
.form-list-filter,
.group-search {
  height: 30vh;
  overflow: auto;
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
    cursor: pointer;
  }

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: #f5f5f5;
    cursor: pointer;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
    cursor: pointer;
  }
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0;
}
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
.border-radius-3 {
  border-radius: 3px;
}
.hover-button-mack:hover {
  color: rgb(240, 240, 240) !important;
  background-color: #2eb85c !important;
  border-radius: 3px;
}
.table {
  font-size: 12px;
  td {
    padding: 0;
    white-space: pre-wrap;
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
.title-canslim {
  text-align: center;
  border-radius: 5px;
}
.p-logo-slim {
  text-align: center;
}
.p-logo-img-slim {
  max-width: 150px;
  width: 100%;
  height: auto;
}
.dropdown .dropdown-input {
  color: rgba(255, 255, 255, 0.87);
  background-color: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.09);
  display: block;
  min-width: 100px !important;
  width: 100% !important;
  height: auto !important;
  padding: 0.375rem 0.75rem !important;
  font-size: 0.875rem !important;
  font-weight: 400 !important;
  line-height: 1.5 !important;
  background-clip: padding-box;
  &::-webkit-input-placeholder,
  &::-moz-placeholder,
  &:-ms-input-placeholder,
  &::-ms-input-placeholder,
  &::placeholder {
    color: #0a0a0a9c;
    opacity: 1;
  }
}
.dropdown .dropdown-content .dropdown-item {
  font-size: 0.875rem !important;
}
.text-inactive {
  color: #9d8787;
}
.c-dark-theme {
  .text-inactive {
    color: #9d8787;
  }
  .bghover {
    background-color: #8c58b3 !important;
    color: #fff;
    a,
    svg,
    span {
      color: #fff !important;
    }
  }
  table {
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
  .dropdown .dropdown-input {
    color: rgba(255, 255, 255, 0.87) !important;
    background-color: rgba(255, 255, 255, 0.05) !important;
    border-color: rgba(255, 255, 255, 0.09) !important;
    display: block;
    &::-webkit-input-placeholder,
    &::-moz-placeholder,
    &:-ms-input-placeholder,
    &::-ms-input-placeholder,
    &::placeholder {
      color: #f1f3f5b4 !important;
      opacity: 1;
    }
  }
  .dropdown .dropdown-input:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
  .dropdown .dropdown-content .dropdown-item:hover {
    background-color: #4799eb;
  }
  .dropdown .dropdown-content {
    color: rgb(255, 255, 255);
    background-color: #282933;
  }
  .dropdown .dropdown-content .dropdown-item {
    color: rgb(255, 255, 255);
    font-size: 0.875rem;
  }
}
.footer-alert {
  text-align: justify;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
