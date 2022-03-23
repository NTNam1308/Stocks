<template>
  <div>
    <CCard>
      <CCardHeader>
        <CForm @submit.prevent method="POST" @change="mackChange">
          <CRow>
            <CCol sm="4" lg="2">
              <AutoComplete :selection.sync="mack" :show_prepend_content="true">
              </AutoComplete>
            </CCol>
            <CCol sm="4" lg="2">
              <CSelect
                :value.sync="data_filter_time"
                :options="option_filter_time"
                class="mb-0"
                :disabled="![1, 2, 3, 4, 7].includes(activeTab)"
              >
                <template #prepend-content>
                  <CIcon name="cil-clock" />
                </template>
              </CSelect>
            </CCol>
            <CCol class="d-flex align-items-center">
              <div class="padding-top-05rem padding-bt-7">
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
                        @click="addNewWatchlist(mack)"
                      >
                        <CIcon name="cibAddthis" />
                        <span class="pl-4">Thêm</span>
                      </CDropdownItem>
                    </div>
                  </div>
                </CDropdown>
              </div>
            </CCol>
            <div class="pr-3 d-flex align-items-center">
              <p class="text-success pt-1" v-if="show_notify_quarter_new">
                <span
                  style="font-size: 16px !important"
                  class="pr-1 font-weight-bold"
                  >{{ sub_quarter }}</span
                >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="currentColor"
                  style="line-height: 10px !important"
                  class="bi bi-check-circle-fill mb-1"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
                  />
                </svg>
              </p>
            </div>
          </CRow>
        </CForm>
      </CCardHeader>
    </CCard>
    <!-- On rows -->
    <CTabs @update:activeTab="clickTab" :active-tab="activeTab">
      <CTab title="Thông tin chung" active>
        <stock-common-info :mack="mack" v-if="isActiveTab['thong-tin-chung']" />
      </CTab>
      <CTab title="Bảng cân đối kế toán">
        <CRow>
          <CCol sm="12">
            <CCard>
              <CElementCover
                :opacity="1"
                v-if="bs_items_is_loading"
                :style="
                  $store.state.darkMode
                    ? { 'background-color': 'fff' }
                    : { 'background-color': '000' }
                "
                ><CSpinner size="5xl" color="success" />
              </CElementCover>
              <CCardBody>
                <div class="float-sm-right mb-2">Đơn vị: triệu đồng</div>
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
                    <template #thead class="postion-sticky top-0">
                      <tr>
                        <th v-for="(item, index) in bs_fields" :key="index">
                          {{ item.label }}
                        </th>
                      </tr>
                    </template>
                    <template #tbody>
                      <template v-for="(item, index) in bs_items">
                        <template v-if="item.is_root">
                          <tr :key="index">
                            <td
                              v-for="(item1, index1) in bs_fields"
                              :key="index1"
                              :style="
                                item1.key == 'thong_tin' ? item['style'] : ''
                              "
                              :class="{
                                bghover:
                                  list_column_bs_contain_quarter.includes(
                                    item1.key
                                  ),
                              }"
                              @mouseover="current_quarter_bs = item1.label"
                              @mouseleave="current_quarter_bs = 'Q0 0000'"
                            >
                              <template v-if="item1.key == 'thong_tin'">
                                <div
                                  class="d-flex align-items-center"
                                  @click="
                                    bs_items[index].is_show_child =
                                      !bs_items[index].is_show_child
                                  "
                                  :class="{
                                    font_weight_bold: item['is_bold'],
                                    font_style_italic: item['is_italics'],
                                  }"
                                  style="cursor: pointer"
                                >
                                  <svg
                                    v-if="
                                      bs_items[index].is_show_child &&
                                      item.is_parent
                                    "
                                    width="14px"
                                    height="14px"
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="caret-down"
                                    class="svg-inline--fa fa-caret-down fa-w-10"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 320 512"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                                    ></path>
                                  </svg>
                                  <svg
                                    v-if="
                                      !bs_items[index].is_show_child &&
                                      item.is_parent
                                    "
                                    width="14px"
                                    height="14px"
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="caret-right"
                                    class="svg-inline--fa fa-caret-right fa-w-6"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 192 512"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"
                                    ></path>
                                  </svg>
                                  <span>
                                    {{ item[item1.key] }}
                                  </span>
                                </div>
                              </template>
                              <template v-else>
                                <p
                                  :class="{
                                    font_weight_bold: item['is_bold'],
                                    font_style_italic: item['is_italics'],
                                  }"
                                >
                                  {{ item[item1.key] }}
                                </p>
                              </template>
                            </td>
                          </tr>
                        </template>
                        <template v-else>
                          <tr
                            :key="index"
                            v-show="checkHideShow(bs_items, item.key_parent)"
                          >
                            <template v-if="item.is_parent">
                              <td
                                v-for="(item1, index1) in bs_fields"
                                :key="index1"
                                :style="
                                  item1.key == 'thong_tin' ? item['style'] : ''
                                "
                                :class="{
                                  bghover:
                                    list_column_bs_contain_quarter.includes(
                                      item1.key
                                    ),
                                }"
                                @mouseover="current_quarter_bs = item1.label"
                                @mouseleave="current_quarter_bs = 'Q0 0000'"
                              >
                                <template v-if="item1.key == 'thong_tin'">
                                  <div
                                    class="d-flex align-items-center"
                                    @click="
                                      bs_items[index].is_show_child =
                                        !bs_items[index].is_show_child
                                    "
                                    :class="{
                                      font_weight_bold: item['is_bold'],
                                      font_style_italic: item['is_italics'],
                                    }"
                                    style="cursor: pointer"
                                  >
                                    <svg
                                      v-if="bs_items[index].is_show_child"
                                      width="14px"
                                      height="14px"
                                      aria-hidden="true"
                                      focusable="false"
                                      data-prefix="fas"
                                      data-icon="caret-down"
                                      class="svg-inline--fa fa-caret-down fa-w-10"
                                      role="img"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 320 512"
                                    >
                                      <path
                                        fill="currentColor"
                                        d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                                      ></path>
                                    </svg>
                                    <svg
                                      v-else
                                      width="14px"
                                      height="14px"
                                      aria-hidden="true"
                                      focusable="false"
                                      data-prefix="fas"
                                      data-icon="caret-right"
                                      class="svg-inline--fa fa-caret-right fa-w-6"
                                      role="img"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 192 512"
                                    >
                                      <path
                                        fill="currentColor"
                                        d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"
                                      ></path>
                                    </svg>
                                    <span>{{ item[item1.key] }}</span>
                                  </div>
                                </template>
                                <template v-else>
                                  <p
                                    :class="{
                                      font_weight_bold: item['is_bold'],
                                      font_style_italic: item['is_italics'],
                                    }"
                                  >
                                    {{ item[item1.key] }}
                                  </p>
                                </template>
                              </td>
                            </template>
                            <template v-else>
                              <td
                                v-for="(item1, index1) in bs_fields"
                                :key="index1"
                                :style="
                                  item1.key == 'thong_tin' ? item['style'] : ''
                                "
                                :class="{
                                  bghover:
                                    list_column_bs_contain_quarter.includes(
                                      item1.key
                                    ),
                                }"
                                @mouseover="current_quarter_bs = item1.label"
                                @mouseleave="current_quarter_bs = 'Q0 0000'"
                              >
                                <template v-if="item1.key == 'thong_tin'">
                                  <p
                                    style="
                                      padding-left: 12px;
                                      margin-bottom: 0px;
                                    "
                                    :class="{
                                      font_weight_bold: item['is_bold'],
                                      font_style_italic: item['is_italics'],
                                    }"
                                  >
                                    {{ item[item1.key] }}
                                  </p>
                                </template>
                                <template v-else>
                                  <p
                                    :class="{
                                      font_weight_bold: item['is_bold'],
                                      font_style_italic: item['is_italics'],
                                    }"
                                  >
                                    {{ item[item1.key] }}
                                  </p>
                                </template>
                              </td>
                            </template>
                          </tr>
                        </template>
                      </template>
                    </template>
                  </table-scroll>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CTab>
      <CTab title="Báo cáo KQKD">
        <CRow>
          <CCol sm="12">
            <CCard>
              <CElementCover
                :opacity="1"
                v-if="is_items_is_loading"
                :style="
                  $store.state.darkMode
                    ? { 'background-color': 'fff' }
                    : { 'background-color': '000' }
                "
                ><CSpinner size="5xl" color="success" />
              </CElementCover>
              <CCardBody>
                <div class="float-sm-right mb-2">Đơn vị: triệu đồng</div>
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
                      <tr>
                        <th v-for="(item, index) in is_fields" :key="index">
                          {{ item.label }}
                        </th>
                      </tr>
                    </template>
                    <template #tbody>
                      <template v-for="(item, index) in is_items">
                        <template v-if="item.is_root">
                          <tr :key="index">
                            <td
                              v-for="(item1, index1) in is_fields"
                              :key="index1"
                              :class="{
                                bghover:
                                  list_column_is_contain_quarter.includes(
                                    item1.key
                                  ),
                              }"
                              @mouseover="current_quarter_is = item1.label"
                              @mouseleave="current_quarter_is = 'Q0 0000'"
                              :style="
                                item1.key == 'thong_tin' ? item['style'] : ''
                              "
                            >
                              <template v-if="item1.key == 'thong_tin'">
                                <div
                                  class="d-flex align-items-center"
                                  @click="
                                    is_items[index].is_show_child =
                                      !is_items[index].is_show_child
                                  "
                                  :class="{
                                    font_weight_bold: item['is_bold'],
                                    font_style_italic: item['is_italics'],
                                  }"
                                  style="cursor: pointer"
                                >
                                  <svg
                                    v-if="
                                      is_items[index].is_show_child &&
                                      item.is_parent
                                    "
                                    width="14px"
                                    height="14px"
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="caret-down"
                                    class="svg-inline--fa fa-caret-down fa-w-10"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 320 512"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                                    ></path>
                                  </svg>
                                  <svg
                                    v-if="
                                      !is_items[index].is_show_child &&
                                      item.is_parent
                                    "
                                    width="14px"
                                    height="14px"
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="caret-right"
                                    class="svg-inline--fa fa-caret-right fa-w-6"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 192 512"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"
                                    ></path>
                                  </svg>
                                  <span>
                                    {{ item[item1.key] }}
                                  </span>
                                </div>
                              </template>
                              <template v-else>
                                <p
                                  :class="{
                                    font_weight_bold: item['is_bold'],
                                    font_style_italic: item['is_italics'],
                                  }"
                                >
                                  {{ item[item1.key] }}
                                </p>
                              </template>
                            </td>
                          </tr>
                        </template>
                        <template v-else>
                          <tr
                            :key="index"
                            v-show="checkHideShow(is_items, item.key_parent)"
                          >
                            <template v-if="item.is_parent">
                              <td
                                v-for="(item1, index1) in is_fields"
                                :key="index1"
                                :style="
                                  item1.key == 'thong_tin' ? item['style'] : ''
                                "
                                @mouseover="current_quarter_is = item1.label"
                                @mouseleave="current_quarter_is = 'Q0 0000'"
                                :class="{
                                  bghover:
                                    list_column_is_contain_quarter.includes(
                                      item1.key
                                    ),
                                }"
                              >
                                <template v-if="item1.key == 'thong_tin'">
                                  <div
                                    class="d-flex align-items-center"
                                    @click="
                                      is_items[index].is_show_child =
                                        !is_items[index].is_show_child
                                    "
                                    :class="{
                                      font_weight_bold: item['is_bold'],
                                      font_style_italic: item['is_italics'],
                                    }"
                                    style="cursor: pointer"
                                  >
                                    <svg
                                      v-if="is_items[index].is_show_child"
                                      width="14px"
                                      height="14px"
                                      aria-hidden="true"
                                      focusable="false"
                                      data-prefix="fas"
                                      data-icon="caret-down"
                                      class="svg-inline--fa fa-caret-down fa-w-10"
                                      role="img"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 320 512"
                                    >
                                      <path
                                        fill="currentColor"
                                        d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                                      ></path>
                                    </svg>
                                    <svg
                                      v-else
                                      width="14px"
                                      height="14px"
                                      aria-hidden="true"
                                      focusable="false"
                                      data-prefix="fas"
                                      data-icon="caret-right"
                                      class="svg-inline--fa fa-caret-right fa-w-6"
                                      role="img"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 192 512"
                                    >
                                      <path
                                        fill="currentColor"
                                        d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"
                                      ></path>
                                    </svg>
                                    <span>{{ item[item1.key] }}</span>
                                  </div>
                                </template>
                                <template v-else>
                                  <p
                                    :class="{
                                      font_weight_bold: item['is_bold'],
                                      font_style_italic: item['is_italics'],
                                    }"
                                  >
                                    {{ item[item1.key] }}
                                  </p>
                                </template>
                              </td>
                            </template>
                            <template v-else>
                              <td
                                v-for="(item1, index1) in is_fields"
                                :key="index1"
                                :style="
                                  item1.key == 'thong_tin' ? item['style'] : ''
                                "
                                @mouseover="current_quarter_is = item1.label"
                                @mouseleave="current_quarter_is = 'Q0 0000'"
                                :class="{
                                  bghover:
                                    list_column_is_contain_quarter.includes(
                                      item1.key
                                    ),
                                }"
                              >
                                <template v-if="item1.key == 'thong_tin'">
                                  <p
                                    style="
                                      padding-left: 12px;
                                      margin-bottom: 0px;
                                    "
                                    :class="{
                                      font_weight_bold: item['is_bold'],
                                      font_style_italic: item['is_italics'],
                                    }"
                                  >
                                    {{ item[item1.key] }}
                                  </p>
                                </template>
                                <template v-else>
                                  <p
                                    :class="{
                                      font_weight_bold: item['is_bold'],
                                      font_style_italic: item['is_italics'],
                                    }"
                                  >
                                    {{ item[item1.key] }}
                                  </p>
                                </template>
                              </td>
                            </template>
                          </tr>
                        </template>
                      </template>
                    </template>
                  </table-scroll>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CTab>
      <CTab title="Dòng tiền">
        <CRow>
          <CCol sm="12">
            <CCard>
              <CElementCover
                :opacity="1"
                :style="
                  $store.state.darkMode
                    ? { 'background-color': 'fff' }
                    : { 'background-color': '000' }
                "
                v-if="cf_items_is_loading"
                ><CSpinner size="5xl" color="success" />
              </CElementCover>
              <CCardBody>
                <div class="float-sm-right mb-2">Đơn vị: triệu đồng</div>
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
                      <tr>
                        <th v-for="(item, index) in cf_fields" :key="index">
                          {{ item.label }}
                        </th>
                      </tr>
                    </template>
                    <template #tbody>
                      <template v-for="(item, index) in cf_items">
                        <template v-if="item.is_root">
                          <tr :key="index">
                            <td
                              v-for="(item1, index1) in cf_fields"
                              :key="index1"
                              :style="
                                item1.key == 'thong_tin' ? item['style'] : ''
                              "
                              :class="{
                                bghover:
                                  list_column_cf_contain_quarter.includes(
                                    item1.key
                                  ),
                              }"
                              @mouseover="current_quarter_cf = item1.label"
                              @mouseleave="current_quarter_cf = 'Q0 0000'"
                            >
                              <template v-if="item1.key == 'thong_tin'">
                                <div
                                  class="d-flex align-items-center"
                                  @click="
                                    cf_items[index].is_show_child =
                                      !cf_items[index].is_show_child
                                  "
                                  :class="{
                                    font_weight_bold: item['is_bold'],
                                    font_style_italic: item['is_italics'],
                                  }"
                                  style="cursor: pointer"
                                >
                                  <svg
                                    v-if="
                                      cf_items[index].is_show_child &&
                                      item.is_parent
                                    "
                                    width="14px"
                                    height="14px"
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="caret-down"
                                    class="svg-inline--fa fa-caret-down fa-w-10"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 320 512"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                                    ></path>
                                  </svg>
                                  <svg
                                    v-if="
                                      !cf_items[index].is_show_child &&
                                      item.is_parent
                                    "
                                    width="14px"
                                    height="14px"
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="caret-right"
                                    class="svg-inline--fa fa-caret-right fa-w-6"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 192 512"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"
                                    ></path>
                                  </svg>
                                  <span>
                                    {{ item[item1.key] }}
                                  </span>
                                </div>
                              </template>
                              <template v-else>
                                <p
                                  :class="{
                                    font_weight_bold: item['is_bold'],
                                    font_style_italic: item['is_italics'],
                                  }"
                                >
                                  {{ item[item1.key] }}
                                </p>
                              </template>
                            </td>
                          </tr>
                        </template>
                        <template v-else>
                          <tr
                            :key="index"
                            v-show="checkHideShow(cf_items, item.key_parent)"
                          >
                            <template v-if="item.is_parent">
                              <td
                                v-for="(item1, index1) in cf_fields"
                                :key="index1"
                                :style="
                                  item1.key == 'thong_tin' ? item['style'] : ''
                                "
                                :class="{
                                  bghover:
                                    list_column_cf_contain_quarter.includes(
                                      item1.key
                                    ),
                                }"
                                @mouseover="current_quarter_cf = item1.label"
                                @mouseleave="current_quarter_cf = 'Q0 0000'"
                              >
                                <template v-if="item1.key == 'thong_tin'">
                                  <div
                                    class="d-flex align-items-center"
                                    @click="
                                      cf_items[index].is_show_child =
                                        !cf_items[index].is_show_child
                                    "
                                    :class="{
                                      font_weight_bold: item['is_bold'],
                                      font_style_italic: item['is_italics'],
                                    }"
                                    style="cursor: pointer"
                                  >
                                    <svg
                                      v-if="cf_items[index].is_show_child"
                                      width="14px"
                                      height="14px"
                                      aria-hidden="true"
                                      focusable="false"
                                      data-prefix="fas"
                                      data-icon="caret-down"
                                      class="svg-inline--fa fa-caret-down fa-w-10"
                                      role="img"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 320 512"
                                    >
                                      <path
                                        fill="currentColor"
                                        d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                                      ></path>
                                    </svg>
                                    <svg
                                      v-else
                                      width="14px"
                                      height="14px"
                                      aria-hidden="true"
                                      focusable="false"
                                      data-prefix="fas"
                                      data-icon="caret-right"
                                      class="svg-inline--fa fa-caret-right fa-w-6"
                                      role="img"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 192 512"
                                    >
                                      <path
                                        fill="currentColor"
                                        d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"
                                      ></path>
                                    </svg>
                                    <span>{{ item[item1.key] }}</span>
                                  </div>
                                </template>
                                <template v-else>
                                  <p
                                    :class="{
                                      font_weight_bold: item['is_bold'],
                                      font_style_italic: item['is_italics'],
                                    }"
                                  >
                                    {{ item[item1.key] }}
                                  </p>
                                </template>
                              </td>
                            </template>
                            <template v-else>
                              <td
                                v-for="(item1, index1) in cf_fields"
                                :key="index1"
                                :style="
                                  item1.key == 'thong_tin' ? item['style'] : ''
                                "
                                :class="{
                                  bghover:
                                    list_column_cf_contain_quarter.includes(
                                      item1.key
                                    ),
                                }"
                                @mouseover="current_quarter_cf = item1.label"
                                @mouseleave="current_quarter_cf = 'Q0 0000'"
                              >
                                <template v-if="item1.key == 'thong_tin'">
                                  <p
                                    style="
                                      padding-left: 12px;
                                      margin-bottom: 0px;
                                    "
                                    :class="{
                                      font_weight_bold: item['is_bold'],
                                      font_style_italic: item['is_italics'],
                                    }"
                                  >
                                    {{ item[item1.key] }}
                                  </p>
                                </template>
                                <template v-else>
                                  <p
                                    :class="{
                                      font_weight_bold: item['is_bold'],
                                      font_style_italic: item['is_italics'],
                                    }"
                                  >
                                    {{ item[item1.key] }}
                                  </p>
                                </template>
                              </td>
                            </template>
                          </tr>
                        </template>
                      </template>
                    </template>
                  </table-scroll>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CTab>
      <CTab title="Thuyết minh" v-show="isAdmin || isCoworker">
        <CRow>
          <CCol sm="12">
            <CCard>
              <CElementCover
                :opacity="1"
                :style="
                  $store.state.darkMode
                    ? { 'background-color': 'fff' }
                    : { 'background-color': '000' }
                "
                v-if="tm_items_is_loading"
                ><CSpinner size="5xl" color="success" />
              </CElementCover>
              <CCardBody>
                <div class="float-sm-right mb-2">Đơn vị: triệu đồng</div>
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
                      <tr>
                        <th v-for="(item, index) in tm_fields" :key="index">
                          {{ item.label }}
                        </th>
                      </tr>
                    </template>
                    <template #tbody>
                      <tr v-for="(item, index) in tm_items" :key="index">
                        <template>
                          <td
                            v-for="(item1, index1) in tm_fields"
                            :key="index1"
                            :class="{
                              bghover: list_column_tm_contain_quarter.includes(
                                item1.key
                              ),
                            }"
                            @mouseover="current_quarter_tm = item1.label"
                            @mouseleave="current_quarter_tm = 'Q0 0000'"
                          >
                            {{ item[item1.key] }}
                          </td>
                        </template>
                      </tr>
                    </template>
                  </table-scroll>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CTab>
      <CTab title="4M & Canslim">
        <FourmAndCanslim :mack="mack" v-if="isActiveTab['4m-canslim']" />
      </CTab>
      <CTab title="Biểu đồ">
        <ChartByNonBank
          :mack="mack"
          v-if="isActiveTab['bieu-do'] && nhom_mack !== 'bank'"
        />
        <ChartByBank
          :mack="mack"
          v-if="isActiveTab['bieu-do'] && nhom_mack === 'bank'"
        />
      </CTab>
      <CTab title="Chỉ tiêu tài chính">
        <CRow>
          <CCol sm="12">
            <CCard>
              <CElementCover
                :opacity="1"
                v-if="financial_ratios_items_is_loading"
                :style="
                  $store.state.darkMode
                    ? { 'background-color': 'fff' }
                    : { 'background-color': '000' }
                "
                ><CSpinner size="5xl" color="success" />
              </CElementCover>
              <CCardBody>
                <div
                  class="table-scroll"
                  v-if="!financial_ratios_items_is_loading"
                >
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
                      <tr>
                        <th
                          v-for="(item, index) in financial_ratios_fields"
                          :key="index"
                          :class="
                            item.key === 'don_vi' ? 'column-chart-sticky' : ''
                          "
                        >
                          {{ item.label }}
                        </th>
                      </tr>
                    </template>
                    <template #tbody>
                      <tr
                        v-for="(item, index) in financial_ratios_items"
                        :key="index"
                      >
                        <template>
                          <td
                            v-for="(item1, index1) in financial_ratios_fields"
                            :key="index1"
                            :class="{
                              'column-chart-sticky': item1.key === 'don_vi',
                              bghover: list_column_fr_contain_quarter.includes(
                                item1.key
                              ),
                            }"
                            :style="[
                              item.color && index1 == 0
                                ? {
                                    color: `${item.color}`,
                                    'font-weight': '600',
                                  }
                                : {},
                            ]"
                            @mouseover="current_quarter_fr = item1.label"
                            @mouseleave="current_quarter_fr = 'Q0 0000'"
                          >
                            {{ item[item1.key] }}
                          </td>
                        </template>
                      </tr>
                    </template>
                  </table-scroll>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CTab>
      <CTab title="So sánh">
        <CompareStock v-if="isActiveTab['so-sanh']" />
      </CTab>
      <CTab title="Tin tức">
        <NewsTab v-if="isActiveTab['tin-tuc']" />
      </CTab>
      <CTab title="BCTC gốc">
        <Document v-if="isActiveTab['bctc']" />
      </CTab>
      <CTab title="Báo cáo phân tích">
        <ReportAnalysis v-if="isActiveTab['bcpt']" />
      </CTab>
    </CTabs>
  </div>
</template>

<script>
import TableScroll from "@/views/base/TableScroll.vue";
import ChartByBank from "@/views/pages/ChartByBank.vue";
import ChartByNonBank from "@/views/pages/ChartByNonBank.vue";
import StockCommonInfo from "@/views/pages/StockCommonInfo.vue";
import FourmAndCanslim from "@/views/pages/FourmAndCanslim";
import CompareStock from "@/views/pages/CompareStock";
import Document from "@/views/pages/Document.vue";
import ReportAnalysis from "@/views/pages/ReportAnalysis.vue";
import NewsTab from "@/views/pages/NewsTab.vue";
import axios from "axios";
import financialRatiosJson from "@/assets/jsons/financial_ratios.json";
import isJson from "@/assets/jsons/is.json";
import bsJson from "@/assets/jsons/bs.json";
import cfJson from "@/assets/jsons/cf.json";
import tmJson from "@/assets/jsons/tm.json";
import AutoComplete from "@/views/base/AutoComplete";
import moment from "moment";

export default {
  // ONLOAD
  props: ["macks"],
  created() {
    this.checkQuarter();
    this.getMyWatchlist();
    if (this.macks) {// take mack in prop
      this.mack = this.macks;
      this.$store.state.mack = this.macks;
    }
    if (this.$route.query.mack) { // take mack in query
      this.mack = this.$route.query.mack;
      this.$store.state.mack = this.$route.query.mack;
    }

    if (this.$store.state.mack) {
      this.mack = this.$store.state.mack;
      let roles = localStorage.getItem("roles");
      if (roles != null) {
        roles = roles.split(",");
      }
      if (roles.indexOf("admin") >= 0) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
      if (roles.indexOf("coworker") >= 0) {
        this.isCoworker = true;
      } else {
        this.isCoworker = false;
      }
    }
    if (this.$route.query.tab) {
      const tab = this.$route.query.tab;
      switch (tab) {
        case "thong-tin-chung":
          this.activeTab = 0;
          break;
        case "cdkt":
          this.activeTab = 1;
          break;
        case "bckqkd":
          this.activeTab = 2;
          break;
        case "dt":
          this.activeTab = 3;
          break;
        case "tm":
          this.activeTab = 4;
          break;
        case "4m-canslim":
          this.activeTab = 5;
          break;
        case "bieu-do":
          this.activeTab = 6;
          break;
        case "cttc":
          this.activeTab = 7;
          break;
        case "so-sanh":
          this.activeTab = 8;
          break;
        case "tin-tuc":
          this.activeTab = 9;
          break;
        case "bctc":
          this.activeTab = 10;
          break;
        case "bcpt":
          this.activeTab = 11;
          break;
        default:
          break;
      }
    }
    this.loadTabLazy();
  },
  name: "Fourm",
  components: {
    TableScroll,
    ChartByBank,
    StockCommonInfo,
    AutoComplete,
    ChartByNonBank,
    FourmAndCanslim,
    CompareStock,
    Document,
    NewsTab,
    ReportAnalysis,
  },
  data() {
    return {
      mack: "GAS",
      thoigian: "Q1 2019",
      data_filter_time: "quarter",
      activeTab: 0,
      scrollVertical: false,
      scrollHorizontal: true,
      syncHeaderScroll: true,
      syncFooterScroll: true,
      includeFooter: true,
      deadAreaColor: "#DDDDDD",
      maxRows: 100,
      freezeFirstColumn: true,
      isAdmin: false,
      isCoworker: false,
      option_filter_time: [
        {
          value: "quarter",
          label: "Quý",
        },
        {
          value: "year",
          label: "Năm",
        },
      ],
      default_fields: [
        {
          key: "thong_tin",
          label: "Thông tin",
        },
      ],
      bs_items: [],
      bs_items_is_loading: true,
      bs_fields: [],
      current_quarter_bs: "Q0 0000",
      is_items: [],
      is_items_is_loading: true,
      is_fields: [],
      current_quarter_is: "Q0 0000",
      cf_items: [],
      cf_items_is_loading: true,
      cf_fields: [],
      current_quarter_cf: "Q0 0000",
      tm_items: [],
      tm_items_is_loading: true,
      tm_fields: [],
      current_quarter_tm: "Q0 0000",
      financial_ratios_items: [],
      financial_ratios_items_is_loading: true,
      financial_ratios_fields: [],
      key_financial_items: [],
      key_finalcial_fields: [],
      current_quarter_fr: "Q0 0000",
      roles: localStorage.getItem("roles"),
      isActiveTab: {
        "thong-tin-chung": false,
        cdkt: false,
        bckqkd: false,
        dt: false,
        tm: false,
        "4m-canslim": false,
        "bieu-do": false,
        cttc: false,
        "so-sanh": false,
        "tin-tuc": false,
        bctc: false,
        bcpt: false,
      },
      option_filter_category: [],
      list_data_model_add: {
        current_my_watchlist_id: null,
        mack: "",
      },
      show_notify_quarter_new: false,
      sub_quarter: moment().subtract(1, "Q").format("[Q]Q Y"),
    };
  },

  methods: {
    checkHideShow(data, list_key) {
      let check = true;
      const arr_key = list_key.split(".");
      for (const key of arr_key) {
        if (!data[key].is_show_child) {
          check = false;
        }
      }
      return check;
    },
    checkQuarter() {
      let self = this;
      self.show_notify_quarter_new = false;
      // CĐKT, KQKD, Dòng tiền
      axios
        .get(self.$apiAdress + "/api/stocks/check-quarter", {
          params: {
            mack: self.$store.state.mack,
            thoigian: self.data_filter_time,
            token: localStorage.getItem("api_token"),
          },
        })
        .then(function (res_1) {
          var check_1 = 0;
          if (res_1.data == 1) {
            check_1 = 1;
          }

          // Chỉ tiêu tài chính
          axios
            .get(self.$apiAdress + "/api/stocks/financial-ratios", {
              params: {
                mack: self.$store.state.mack,
                thoigian: self.data_filter_time,
                token: localStorage.getItem("api_token"),
              },
            })
            .then(function (res_2) {
              let position_last = res_2.data[1].length - 1;

              let checkQuarterLatest = res_2.data[1][position_last].slice(0, 2);
              let checkYearLatest = res_2.data[1][position_last].slice(3, 7);
              let subQuarterGetQuarter =
                "Q" + moment().subtract(1, "Q").format("Q"); // current time sub quarter, get quarter
              let subQuarterGetYear = moment().subtract(1, "Q").format("Y"); // current time sub quarter, get year

              let check_2 = 0;
              if (
                checkQuarterLatest == subQuarterGetQuarter &&
                checkYearLatest == subQuarterGetYear
              ) {
                check_2 = 1;
              }

              if (check_1 == 1 || check_2 == 1) {
                // result
                self.show_notify_quarter_new = true;
              }
            })
            .catch(function (error) {
              self.show_notify_quarter_new = false;
            });
        })
        .catch(function (error) {
          self.show_notify_quarter_new = false;
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
    current_quarter(d) {
      d = d || new Date();
      var m = Math.floor(d.getMonth() / 3) + 1;
      m -= m > 4 ? 4 : 0;
      var y = d.getFullYear();
      return "Q" + m + " " + y;
    },
    clickTab(event) {
      this.scrollRight();
      this.createScrollBarTopTable();
      this.activeTab = event;
      this.loadTabLazy();
    },
    loadTabLazy() {
      if (this.activeTab == 7) {
        //cttc
        this.option_filter_time = [
          {
            value: "quarter",
            label: "Quý",
          },
          {
            value: "year",
            label: "Năm",
          },
          {
            value: "ttm",
            label: "TTM",
          },
        ];
      } else {
        if (this.data_filter_time == "ttm") {
          this.data_filter_time = "quarter";
        }
        this.option_filter_time = [
          {
            value: "quarter",
            label: "Quý",
          },
          {
            value: "year",
            label: "Năm",
          },
        ];
      }
      switch (this.activeTab) {
        case 0:
          this.isActiveTab["thong-tin-chung"] = true;
          break;
        case 1:
          if ( !this.isActiveTab["cdkt"] && this.data_filter_time != "ttm") {
            this.bs_update();
          }
          this.isActiveTab["cdkt"] = true;
          break;
        case 2:
          if ( !this.isActiveTab["bckqkd"] && this.data_filter_time != "ttm") {
            this.is_update();
          } 
          this.isActiveTab["bckqkd"] = true;
          break;
        case 3:
          if ( !this.isActiveTab["dt"] && this.data_filter_time != "ttm") {
            this.cf_update();
          }
          this.isActiveTab["dt"] = true;
          break;
        case 4:
          if ( !this.isActiveTab["tm"] && this.data_filter_time != "ttm") {
            this.tm_update();
          }
          this.isActiveTab["tm"] = true;
          break;
        case 5:
          this.isActiveTab["4m-canslim"] = true;
          break;
        case 6:
          this.isActiveTab["bieu-do"] = true;
          break;
        case 7:
          if ( !this.isActiveTab["cttc"]) {
            this.financial_ratios_update();
          }
          this.isActiveTab["cttc"] = true;
          break;
        case 8:
          this.isActiveTab["so-sanh"] = true;
          break;
        case 9:
          this.isActiveTab["tin-tuc"] = true;
          break;
        case 10:
          this.isActiveTab["bctc"] = true;
          break;
        case 11:
          this.isActiveTab["bcpt"] = true;
          break;
        default:
          break;
      }
    },
    scrollRight() {
      // setTimeout(() => {
      // var x = document.querySelectorAll(".table-scroll .scrollbar-top");
      // for (let i = 0; i < x.length; i++) {
      //   x[i].scrollLeft = 2000000;
      // }
      // var y = document.querySelectorAll(".table-scroll .scrollbar-top");
      // for (let i = 0; i < y.length; i++) {
      //   y[i].scrollLeft = 2000000;
      // }
      // }, 500);
    },
    mackChange(event) {
      for (let key in this.isActiveTab) {
        this.isActiveTab[key] = false;
      }
      this.loadTabLazy();
      this.scrollRight();
      this.createScrollBarTopTable();
    },

    financial_ratios_update() {
      let self = this;
      this.financial_ratios_items_is_loading = true;
      axios
        .get(this.$apiAdress + "/api/stocks/financial-ratios", {
          params: {
            mack: self.mack,
            thoigian: self.data_filter_time,
            token: localStorage.getItem("api_token"),
          },
        })
        .then(function (response) {
          self.financial_ratios_items_is_loading = false;
          if (response.data.length === 0) {
            self.financial_ratios_fields = [];
            self.financial_ratios_items = [];
            return;
          }
          let d = response.data[1];
          self.financial_ratios_fields = JSON.parse(
            JSON.stringify(self.default_fields)
          );
          self.financial_ratios_fields.push({
            key: "don_vi",
            label: "Đơn vị",
          });
          if (response.data[0] === "nonbank") {
            if (self.data_filter_time == "quarter") {
              self.financial_ratios_items =
                financialRatiosJson.nonbank.items.quarter;
            } else if (self.data_filter_time == "ttm") {
              self.financial_ratios_items =
                financialRatiosJson.nonbank.items.ttm;
            } else {
              self.financial_ratios_items =
                financialRatiosJson.nonbank.items.year;
            }
          } else if (response.data[0] === "bank") {
            if (self.data_filter_time == "quarter") {
              self.financial_ratios_items =
                financialRatiosJson.bank.items.quarter;
            } else if (self.data_filter_time == "ttm") {
              self.financial_ratios_items = financialRatiosJson.bank.items.ttm;
            } else {
              self.financial_ratios_items = financialRatiosJson.bank.items.year;
            }
          } else if (response.data[0] === "stock") {
            if (self.data_filter_time == "quarter") {
              self.financial_ratios_items =
                financialRatiosJson.stock.items.quarter;
            } else if (self.data_filter_time == "ttm") {
              self.financial_ratios_items = financialRatiosJson.stock.items.ttm;
            } else {
              self.financial_ratios_items =
                financialRatiosJson.stock.items.year;
            }
          } else if (
            response.data[0] === "insurance_TT" ||
            response.data[0] === "insurance_GT"
          ) {
            if (response.data[0] === "insurance_TT") {
              if (self.data_filter_time == "quarter") {
                self.financial_ratios_items =
                  financialRatiosJson.insurance.items.TT.quarter;
              } else if (self.data_filter_time == "ttm") {
                self.financial_ratios_items =
                  financialRatiosJson.insurance.items.TT.ttm;
              } else {
                self.financial_ratios_items =
                  financialRatiosJson.insurance.items.TT.year;
              }
            } else if (response.data[0] === "insurance_GT") {
              if (self.data_filter_time == "quarter") {
                self.financial_ratios_items =
                  financialRatiosJson.insurance.items.GT.quarter;
              } else if (self.data_filter_time == "ttm") {
                self.financial_ratios_items =
                  financialRatiosJson.insurance.items.GT.ttm;
              } else {
                self.financial_ratios_items =
                  financialRatiosJson.insurance.items.GT.year;
              }
            }
          }
          d.map((item, index) => {
            self.financial_ratios_fields.push({
              key: "gia_tri_" + index,
              label: item,
            });
          });
          let indexplus = 3;
          self.financial_ratios_items.forEach((item, index) => {
            if (item.color === "red") {
              d.map((itemd, indexd) => {
                item["gia_tri_" + indexd] = "";
              });
            } else {
              d.map((itemd, indexd) => {
                if (response.data[indexplus][indexd]) {
                  if (item["type"] === "money") {
                    item["gia_tri_" + indexd] = (
                      response.data[indexplus][indexd] / 1000
                    ).toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    });
                  } else if (item["type"] === "percent") {
                    item["gia_tri_" + indexd] = (
                      response.data[indexplus][indexd] * 100
                    ).toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 1,
                    });
                  } else {
                    item["gia_tri_" + indexd] = response.data[indexplus][
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
          self.scrollRight();
          self.createScrollBarTopTable();
        })
        .catch(function (error) {
          console.error(error);
          self.financial_ratios_items_is_loading = false;
          self.financial_ratios_fields = [];
          self.financial_ratios_items = [];
        });
    },

    is_update() {
      //income statement update
      let self = this;
      if (self.$store.state.mack) {
        self.mack = self.$store.state.mack;
      }
      this.is_items_is_loading = true;
      axios
        .get(this.$apiAdress + "/api/stocks", {
          params: {
            type: "is",
            mack: self.mack,
            thoigian: self.data_filter_time,
            token: localStorage.getItem("api_token"),
          },
        })
        .then(function (response) {
          self.is_items_is_loading = false;
          if (response.data.length === 0) {
            self.is_fields = [];
            self.is_items = [];
            return;
          }
          let d = response.data[1];
          self.is_fields = JSON.parse(JSON.stringify(self.default_fields));
          if (response.data[0] === "nonbank")
            self.is_items = isJson.nonbank.items;
          else if (response.data[0] === "bank")
            self.is_items = isJson.bank.items;
          else if (response.data[0] === "stock")
            self.is_items = isJson.stock.items;
          else if (response.data[0] === "insurance")
            self.is_items = isJson.insurance.items;
          d.map((item, index) => {
            self.is_fields.push({ key: "gia_tri_" + index, label: item });
          });
          let indexplus = 3;
          self.is_items.forEach((item, index) => {
            if (item.is_header) {
              d.map((itemd, indexd) => {
                item["gia_tri_" + indexd] = "";
              });
            } else {
              d.map((itemd, indexd) => {
                if (response.data[indexplus][indexd]) {
                  if (response.data[indexplus][indexd] == "-1")
                    item["gia_tri_" + indexd] = "";
                  else
                    item["gia_tri_" + indexd] = response.data[indexplus][
                      indexd
                    ].toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    });
                } else item["gia_tri_" + indexd] = 0;
              });
              indexplus++;
            }
          });
          self.scrollRight();
          self.createScrollBarTopTable();
        })
        .catch(function (error) {
          self.is_items_is_loading = false;
          self.is_fields = [];
          self.is_items = [];
        });
    },

    bs_update() {
      let self = this;
      if (self.$store.state.mack) {
        self.mack = self.$store.state.mack;
      }
      this.bs_items_is_loading = true;
      self.bs_items = [];
      axios
        .get(this.$apiAdress + "/api/stocks", {
          params: {
            type: "bs",
            mack: self.mack,
            thoigian: self.data_filter_time,
            token: localStorage.getItem("api_token"),
          },
        })
        .then(function (response) {
          self.bs_items_is_loading = false;

          if (response.data.length === 0) {
            self.bs_fields = [];
            self.bs_items = [];
            return;
          }
          let d = response.data[1];
          self.bs_fields = JSON.parse(JSON.stringify(self.default_fields));
          if (response.data[0] === "nonbank")
            self.bs_items = bsJson.nonbank.items;
          else if (response.data[0] === "bank")
            self.bs_items = bsJson.bank.items;
          else if (response.data[0] === "stock")
            self.bs_items = bsJson.stock.items;
          else if (response.data[0] === "insurance")
            self.bs_items = bsJson.insurance.items;
          d.map((item, index) => {
            self.bs_fields.push({ key: "gia_tri_" + index, label: item });
          });
          let indexplus = 3;
          self.bs_items.forEach((item, index) => {
            if (item.is_header) {
              d.map((itemd, indexd) => {
                item["gia_tri_" + indexd] = "";
              });
            } else {
              d.map((itemd, indexd) => {
                if (response.data[indexplus][indexd]) {
                  if (response.data[indexplus][indexd] == "-1")
                    item["gia_tri_" + indexd] = "";
                  else
                    item["gia_tri_" + indexd] = response.data[indexplus][
                      indexd
                    ].toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    });
                } else item["gia_tri_" + indexd] = 0;
              });
              indexplus++;
            }
          });
          self.scrollRight();
          self.createScrollBarTopTable();
        })
        .catch(function (error) {
          self.bs_items_is_loading = false;
          self.bs_items = [];
          self.bs_fields = [];
        });
    },
    cf_update() {
      let self = this;
      if (self.$store.state.mack) {
        self.mack = self.$store.state.mack;
      }
      this.cf_items_is_loading = true;
      self.cf_items = [];

      axios
        .get(this.$apiAdress + "/api/stocks", {
          params: {
            type: "cf",
            mack: self.mack,
            thoigian: self.data_filter_time,
            token: localStorage.getItem("api_token"),
          },
        })
        .then(function (response) {
          self.cf_items_is_loading = false;
          if (response.data.length === 0) {
            self.cf_fields = [];
            self.cf_items = [];
            return;
          }
          let d = response.data[1];
          self.cf_fields = JSON.parse(JSON.stringify(self.default_fields));
          if (response.data[0] === "nonbank")
            self.cf_items = cfJson.nonbank.items;
          else if (response.data[0] === "bank")
            self.cf_items = cfJson.bank.items;
          else if (response.data[0] === "stock")
            self.cf_items = cfJson.stock.items;
          else if (response.data[0] === "insurance")
            self.cf_items = cfJson.insurance.items;
          d.map((item, index) => {
            self.cf_fields.push({ key: "gia_tri_" + index, label: item });
          });
          let indexplus = 3;
          self.cf_items.forEach((item, index) => {
            if (item.is_header) {
              d.map((itemd, indexd) => {
                item["gia_tri_" + indexd] = "";
              });
            } else {
              d.map((itemd, indexd) => {
                if (response.data[indexplus][indexd]) {
                  if (response.data[indexplus][indexd] == "-1")
                    item["gia_tri_" + indexd] = "";
                  else
                    item["gia_tri_" + indexd] = response.data[indexplus][
                      indexd
                    ].toLocaleString("en", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    });
                } else item["gia_tri_" + indexd] = 0;
              });
              indexplus++;
            }
          });
          self.scrollRight();
          self.createScrollBarTopTable();
        })
        .catch(function (error) {
          self.cf_items_is_loading = false;
          self.cf_fields = [];
          self.cf_items = [];
        });
    },

    tm_update() {
      //income statement update
      let self = this;
      this.tm_items_is_loading = true;
      axios
        .get(this.$apiAdress + "/api/stocks", {
          params: {
            type: "tm",
            mack: self.mack,
            thoigian: self.data_filter_time,
            token: localStorage.getItem("api_token"),
          },
        })
        .then(function (response) {
          self.tm_items_is_loading = false;
          if (response.data.length === 0) {
            self.tm_fields = [];
            self.tm_items = [];
            return;
          }
          let d = response.data[1];
          self.tm_fields = JSON.parse(JSON.stringify(self.default_fields));
          if (response.data[0] === "nonbank")
            self.tm_items = tmJson.nonbank.items;
          else if (response.data[0] === "bank")
            self.tm_items = tmJson.bank.items;
          else if (response.data[0] === "stock")
            self.tm_items = tmJson.stock.items;
          else if (response.data[0] === "insurance")
            self.tm_items = tmJson.insurance.items;
          d.map((item, index) => {
            self.tm_fields.push({ key: "gia_tri_" + index, label: item });
          });
          let indexplus = 3;
          self.tm_items.forEach((item, index) => {
            if (item.tm_header) {
              d.map((itemd, indexd) => {
                item["gia_tri_" + indexd] = "";
              });
            } else {
              d.map((itemd, indexd) => {
                if (response.data[indexplus][indexd])
                  item["gia_tri_" + indexd] = response.data[indexplus][
                    indexd
                  ].toLocaleString("en", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  });
                else item["gia_tri_" + indexd] = 0;
              });
              indexplus++;
            }
          });
          self.scrollRight();
          self.createScrollBarTopTable();
        })
        .catch(function (error) {
          console.error(error);
          self.tm_items_is_loading = false;
          self.tm_fields = [];
          self.tm_items = [];
        });
    },
  },
  computed: {
    list_column_bs_contain_quarter() {
      let quarter = this.current_quarter_bs.split(" ");
      quarter = quarter[0];
      let return_data = [];
      if (this.data_filter_time == "quarter" && quarter[0] == "Q") {
        for (const item of this.bs_fields) {
          const arr = item.label.split(" ");
          if (quarter == arr[0]) {
            return_data.push(item.key);
          }
        }
      }
      return return_data;
    },
    list_column_is_contain_quarter() {
      let quarter = this.current_quarter_is.split(" ");
      quarter = quarter[0];
      let return_data = [];
      if (this.data_filter_time == "quarter" && quarter[0] == "Q") {
        for (const item of this.is_fields) {
          const arr = item.label.split(" ");
          if (quarter == arr[0]) {
            return_data.push(item.key);
          }
        }
      }
      return return_data;
    },
    list_column_cf_contain_quarter() {
      let quarter = this.current_quarter_cf.split(" ");
      quarter = quarter[0];
      let return_data = [];
      if (this.data_filter_time == "quarter" && quarter[0] == "Q") {
        for (const item of this.cf_fields) {
          const arr = item.label.split(" ");
          if (quarter == arr[0]) {
            return_data.push(item.key);
          }
        }
      }
      return return_data;
    },
    list_column_tm_contain_quarter() {
      let quarter = this.current_quarter_tm.split(" ");
      quarter = quarter[0];
      let return_data = [];
      if (this.data_filter_time == "quarter" && quarter[0] == "Q") {
        for (const item of this.tm_fields) {
          const arr = item.label.split(" ");
          if (quarter == arr[0]) {
            return_data.push(item.key);
          }
        }
      }
      return return_data;
    },
    list_column_fr_contain_quarter() {
      let quarter = this.current_quarter_fr.split(" ");
      quarter = quarter[0];
      let return_data = [];
      if (this.data_filter_time == "quarter" && quarter[0] == "Q") {
        for (const item of this.financial_ratios_fields) {
          const arr = item.label.split(" ");
          if (quarter == arr[0]) {
            return_data.push(item.key);
          }
        }
      }
      return return_data;
    },
    nhom_mack() {
      return this.$store.state.list_mack_company.hasOwnProperty(this.$store.state.mack)
        ? this.$store.state.list_mack_company[this.$store.state.mack].nhom
        : "";
    },
  },
  watch: {
    "$route.query.mack": {
      handler() {
        this.mack = this.$route.query.mack;
        this.$store.state.mack = this.$route.query.mack;
      },
    },
    data_filter_time: {
      handler() {
        this.checkQuarter();
      },
    },
    "$store.state.mack": {
      handler() {
        this.checkQuarter();
        this.mackChange();
      },
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
  border: 1px solid rgb(160, 160, 160);
  visibility: hidden;
  width: 135px;
  background-color: rgb(255, 255, 255);
  color: rgb(37, 37, 37);
  text-align: center;
  padding: 2px 0;
  font-size: 14px;
  border-radius: 1px;
  top: -4px;
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
.c-dark-theme {
  .tr {
    background-color: #270d34;
  }
}
.table {
  td {
    padding: 0;
    white-space: pre-wrap;
  }
}
.text-red {
  color: red;
  font-weight: 800;
}
.text-blue {
  color: blue;
  font-weight: 800;
}
.c-dark-theme {
  table {
    tbody {
      tr {
        &:hover {
          td {
            &:first-child {
              background-color: #8c58b3 !important;
            }
            background-color: #8c58b3 !important;
          }
        }
      }
    }
  }
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
.scrollbar-top {
  position: sticky;
  position: -webkit-sticky;
  top: 56px;
  z-index: 9;
}
.font_weight_bold {
  font-weight: bold;
}
.font_style_italic {
  font-style: italic;
}
.padding-bt-7 {
  padding-bottom: 7px !important;
}
@media screen and (max-width: 768px) {
  .padding-top-05rem {
    padding-top: 0.5rem;
    padding-left: 0.05rem;
  }
}
</style>
