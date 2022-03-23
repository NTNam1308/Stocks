<template>
  <div>
    <div class="pt-2 d-flex justify-content-between">
      <p class="h6 text-truncate pl-2">{{ mack }} - {{ company_name }}</p>
      <transition
        :name="$function_global.getAnimationNameFromCL(cl)"
        mode="out-in"
      >
        <p
          class="h6 pl-2"
          :key="price"
          :class="
            $function_global.getClassTextColorFromPrice(
              price,
              price_eod_yesterday,
              board
            )
          "
        >
          {{ formatMoney(price, 2, 2) }}
        </p>
      </transition>
    </div>
    <div class="d-flex justify-content-between mb-2">
      <p class="h6 pl-2">
        {{ board }}
      </p>
      <transition
        :name="$function_global.getAnimationNameFromCL(cl)"
        mode="out-in"
      >
        <p
          class="h6"
          v-html="
            $function_global.getSpanColorByPerchange(change, perchange, cl)
          "
          :key="change"
        ></p>
      </transition>
    </div>
    <CTabs
      :active-tab="activeTab"
      :justified="true"
      addNavClasses="custom-padding-tab-item"
    >
      <CTab title="Tổng quan">
        <div class="common-scrollbar">
          <p class="font-weight-bold mt-2 text-center">Biểu đồ</p>
          <CustomEChart :option="option_chart_price_vol" style="height: 140px">
          </CustomEChart>
          <p class="font-weight-bold mt-2 text-center">Tổng quan</p>
          <div class="position-relative table-responsive">
            <div>
              <div class="d-flex flex-column">
                <div class="d-flex justify-content-between bg-hover border-top" v-if="mack.length == 3">
                  <div
                    class="pt-1 pb-1 pl-2 text-left"
                    style="white-space: nowrap"
                  >
                    Trần - Sàn - TC
                  </div>
                  <div
                    class="pt-1 pb-1 px-2 text-right font-weight-bold"
                    style="white-space: nowrap"
                  >
                    <transition name="ceilchange" mode="out-in">
                      <span :key="ceil_price" class="text-ceilchange">
                        {{ formatMoney(ceil_price, 2, 2) }}
                      </span>
                    </transition>
                    -
                    <transition name="floorchange" mode="out-in">
                      <span :key="floor_price" class="text-floorchange">
                        {{ formatMoney(floor_price, 2, 2) }}
                      </span>
                    </transition>
                    -
                    <transition name="nochange" mode="out-in">
                      <span :key="price_eod_yesterday" class="text-nochange">
                        {{ formatMoney(price_eod_yesterday, 2, 2) }}
                      </span>
                    </transition>
                  </div>
                </div>
                <div v-else class="d-flex justify-content-between bg-hover border-top">
                  <div class="pt-1 pb-1 pl-2 text-left">Tham chiếu</div>
                  <div
                    class="
                      pt-1
                      pb-1
                      px-2
                      text-right
                      font-weight-bold
                      text-nochange
                    "
                  >
                    <transition name="nochange" mode="out-in">
                      <span :key="price_eod_yesterday">
                        {{ formatMoney(price_eod_yesterday, 2, 2) }}
                      </span>
                    </transition>
                  </div>
                </div>
                <div class="d-flex justify-content-between bg-hover border-top">
                  <div class="pt-1 pb-1 pl-2 text-left">Mở cửa</div>
                  <div
                    class="pt-1 pb-1 px-2 text-right font-weight-bold"
                    :class="
                      $function_global.getClassTextColorFromPrice(
                        open_price,
                        price_eod_yesterday,
                        board
                      )
                    "
                  >
                    <transition name="nochange" mode="out-in">
                      <span :key="open_price">
                        {{ formatMoney(open_price, 2, 2) }}
                      </span>
                    </transition>
                  </div>
                </div>
                <div class="d-flex justify-content-between bg-hover border-top">
                  <div class="pt-1 pb-1 pl-2 text-left">Thấp cao</div>
                  <div class="pt-1 pb-1 px-2 text-right font-weight-bold">
                    <transition name="downchange" mode="out-in">
                      <span
                        :key="lowest_price"
                        :class="
                          $function_global.getClassTextColorFromPrice(
                            lowest_price,
                            price_eod_yesterday,
                            board
                          )
                        "
                      >
                        {{ formatMoney(lowest_price, 2, 2) }}
                      </span>
                    </transition>
                    -
                    <transition name="upchange" mode="out-in">
                      <span
                        :key="highest_price"
                        :class="
                          $function_global.getClassTextColorFromPrice(
                            highest_price,
                            price_eod_yesterday,
                            board
                          )
                        "
                      >
                        {{ formatMoney(highest_price, 2, 2) }}
                      </span>
                    </transition>
                  </div>
                </div>
                <div class="d-flex justify-content-between bg-hover border-top">
                  <div class="pt-1 pb-1 pl-2 text-left">Khối lượng</div>
                  <div class="pt-1 pb-1 px-2 text-right font-weight-bold">
                    <transition name="nochange" mode="out-in">
                      <span :key="vol">
                        {{ formatMoney(vol, 0, 0) }}
                      </span>
                    </transition>
                  </div>
                </div>
                <div class="d-flex justify-content-between bg-hover border-top">
                  <div class="pt-1 pb-1 pl-2 text-left">Giá trị</div>
                  <div class="pt-1 pb-1 px-2 text-right font-weight-bold">
                    <transition name="nochange" mode="out-in">
                      <span :key="val"> {{ formatMoney(val, 2, 2) }} tỷ </span>
                    </transition>
                  </div>
                </div>
                <div class="d-flex justify-content-between bg-hover border-top" v-if="mack.length == 3">
                  <div class="pt-1 pb-1 pl-2 text-left">Số lượng cổ phiếu</div>
                  <div class="pt-1 pb-1 px-2 text-right font-weight-bold">
                    <transition name="nochange" mode="out-in">
                      <span :key="so_luong_co_phieu">
                        {{ formatMoney(so_luong_co_phieu, 0, 0) }}
                      </span>
                    </transition>
                  </div>
                </div>
                <div class="d-flex justify-content-between bg-hover border-top" v-if="mack.length == 3">
                  <div class="pt-1 pb-1 pl-2 text-left">Vốn hóa</div>
                  <div class="pt-1 pb-1 px-2 text-right font-weight-bold">
                    <transition name="nochange" mode="out-in">
                      <span :key="von_hoa">
                        {{ formatMoney(von_hoa, 0, 0) }} tỷ VNĐ
                      </span>
                    </transition>
                  </div>
                </div>
                <div class="d-flex justify-content-between bg-hover border-top" v-if="mack.length == 3">
                  <div class="pt-1 pb-1 pl-2 text-left">EPS</div>
                  <div class="pt-1 pb-1 px-2 text-right font-weight-bold">
                    <transition name="nochange" mode="out-in">
                      <span :key="eps">
                        {{ formatMoney(eps, 0, 0) }} VNĐ
                      </span>
                    </transition>
                  </div>
                </div>
                <div class="d-flex justify-content-between bg-hover border-top" v-if="mack.length == 3">
                  <div class="pt-1 pb-1 pl-2 text-left">BVPS</div>
                  <div class="pt-1 pb-1 px-2 text-right font-weight-bold">
                    <transition name="nochange" mode="out-in">
                      <span :key="bvps">
                        {{ formatMoney(bvps, 0, 0) }} VNĐ
                      </span>
                    </transition>
                  </div>
                </div>
                <div class="d-flex justify-content-between bg-hover border-top" v-if="mack.length == 3">
                  <div class="pt-1 pb-1 pl-2 text-left">P/E</div>
                  <div class="pt-1 pb-1 px-2 text-right font-weight-bold">
                    <transition name="nochange" mode="out-in">
                      <span :key="pe">
                        {{ formatMoney(pe, 0, 1) }} lần
                      </span>
                    </transition>
                  </div>
                </div>
                <div class="d-flex justify-content-between bg-hover border-top" v-if="mack.length == 3">
                  <div class="pt-1 pb-1 pl-2 text-left">P/B</div>
                  <div class="pt-1 pb-1 px-2 text-right font-weight-bold">
                    <transition name="nochange" mode="out-in">
                      <span :key="pb">
                        {{ formatMoney(pb, 0, 1) }} lần
                      </span>
                    </transition>
                  </div>
                </div>
                <template v-if="mack.length == 3">
                  <div v-for="(item, index) in data_common_info" :key="index"  class="d-flex justify-content-between border-top bg-hover align-items-center">
                    <div
                      class="pt-1 pb-1 pl-2 text-left"
                      style="white-space: nowrap"
                    >
                      {{item.prefix}}
                    </div>
                    <div
                      class="pt-1 pb-1 px-2 text-right font-weight-bold"
                      style=""
                    >
                      <transition name="nochange" mode="out-in">
                        <span :key="item.value" class="">
                          {{ formatMoney(item.value, 0, 0) }} {{item.subfix}}
                        </span>
                      </transition>
                    </div>
                  </div>
                </template>
              </div>
            </div>
            <!---->
          </div>
        </div>
      </CTab>
      <CTab title="Sổ lệnh">
        <div style="display: flex; flex-direction: column">
          <div
            class="border-bottom"
            style="
              display: flex;
              flex-direction: row;
              flex: 1 1 0%;
              -webkit-box-align: center;
              align-items: center;
              width: 100%;
            "
          >
            <div
              style="
                justify-content: flex-end;
                display: flex;
                flex-direction: row;
                flex: 1 1 0%;
                padding: 8px;
                font-weight: bold;
              "
            >
              Đặt mua
            </div>
            <div
              style="
                justify-content: flex-start;
                display: flex;
                flex-direction: row;
                flex: 1 1 0%;
                padding: 8px;
                font-weight: bold;
              "
            >
              Đặt bán
            </div>
          </div>
          <div class="row-column-step border-bottom">
            <div class="row-column-step-wrap">
              <div class="column-step-vol1">
                <transition
                  :name="
                    $function_global.getAnimationNameFromChange(
                      parseFloat(data_buy.price1) -
                        parseFloat(price_eod_yesterday)
                    )
                  "
                  mode="out-in"
                >
                  <span v-if="data_buy.vol1 != 0" :key="data_buy.vol1" style="padding: 4px">
                    {{ formatMoney(data_buy.vol1, 0, 2) }}
                  </span>
                </transition>
              </div>
              <div class="column-step-price1">
                <transition
                  :name="
                    $function_global.getAnimationNameFromChange(
                      parseFloat(data_buy.price1) -
                        parseFloat(price_eod_yesterday)
                    )
                  "
                  mode="out-in"
                >
                  <span
                    style="padding: 4px"
                    v-if="data_buy.price1 != 0"
                    :key="data_buy.price1"
                    :class="
                      $function_global.getClassTextColorFromPrice(
                        data_buy.price1,
                        price_eod_yesterday,
                        board
                      )
                    "
                  >
                    {{ formatMoney(data_buy.price1, 2, 2) }}
                  </span>
                </transition>
              </div>
            </div>
            <div class="row-column-step-wrap">
              <div class="column-step-price2">
                <transition
                  :name="
                    $function_global.getAnimationNameFromChange(
                      parseFloat(data_sell.price1) -
                        parseFloat(price_eod_yesterday)
                    )
                  "
                  mode="out-in"
                >
                  <span
                    style="padding: 4px"
                    v-if="data_sell.price1 != 0"
                    :key="data_sell.price1"
                    :class="
                      $function_global.getClassTextColorFromPrice(
                        data_sell.price1,
                        price_eod_yesterday,
                        board
                      )
                    "
                  >
                    {{ formatMoney(data_sell.price1, 2, 2) }}
                  </span>
                </transition>
              </div>
              <div class="column-step-vol2">
                <transition
                  :name="
                    $function_global.getAnimationNameFromChange(
                      parseFloat(data_sell.price1) -
                        parseFloat(price_eod_yesterday)
                    )
                  "
                  mode="out-in"
                >
                  <span v-if="data_sell.vol1 != 0" :key="data_sell.vol1" style="padding: 4px"
                    >{{ formatMoney(data_sell.vol1, 0, 2) }}
                  </span>
                </transition>
              </div>
            </div>
          </div>
          <div class="row-column-step border-bottom">
            <div class="row-column-step-wrap">
              <div class="column-step-vol1">
                <transition
                  :name="
                    $function_global.getAnimationNameFromChange(
                      parseFloat(data_buy.price2) -
                        parseFloat(price_eod_yesterday)
                    )
                  "
                  mode="out-in"
                >
                  <span v-if="data_buy.vol2 != 0" :key="data_buy.vol2" style="padding: 4px">
                    {{ formatMoney(data_buy.vol2, 0, 2) }}</span
                  >
                </transition>
              </div>
              <div class="column-step-price1">
                <transition
                  :name="
                    $function_global.getAnimationNameFromChange(
                      parseFloat(data_buy.price2) -
                        parseFloat(price_eod_yesterday)
                    )
                  "
                  mode="out-in"
                >
                  <span
                    style="padding: 4px"
                    v-if="data_buy.price2 != 0"
                    :key="data_buy.price2"
                    :class="
                      $function_global.getClassTextColorFromPrice(
                        data_buy.price2,
                        price_eod_yesterday,
                        board
                      )
                    "
                  >
                    {{ formatMoney(data_buy.price2, 2, 2) }}
                  </span>
                </transition>
              </div>
            </div>
            <div class="row-column-step-wrap">
              <div class="column-step-price2">
                <transition
                  :name="
                    $function_global.getAnimationNameFromChange(
                      parseFloat(data_sell.price2) -
                        parseFloat(price_eod_yesterday)
                    )
                  "
                  mode="out-in"
                >
                  <span
                    style="padding: 4px"
                    v-if="data_sell.price2 != 0"
                    :key="data_sell.price2"
                    :class="
                      $function_global.getClassTextColorFromPrice(
                        data_sell.price2,
                        price_eod_yesterday,
                        board
                      )
                    "
                  >
                    {{ formatMoney(data_sell.price2, 2, 2) }}
                  </span>
                </transition>
              </div>
              <div class="column-step-vol2">
                <transition
                  :name="
                    $function_global.getAnimationNameFromChange(
                      parseFloat(data_sell.price2) -
                        parseFloat(price_eod_yesterday)
                    )
                  "
                  mode="out-in"
                >
                  <span v-if="data_sell.vol2 != 0" :key="data_sell.vol2" style="padding: 4px"
                    >{{ formatMoney(data_sell.vol2, 0, 2) }}
                  </span>
                </transition>
              </div>
            </div>
          </div>
          <div class="row-column-step border-bottom">
            <div class="row-column-step-wrap">
              <div class="column-step-vol1">
                <transition
                  :name="
                    $function_global.getAnimationNameFromChange(
                      parseFloat(data_buy.price3) -
                        parseFloat(price_eod_yesterday)
                    )
                  "
                  mode="out-in"
                >
                  <span v-if="data_buy.vol3 != 0" :key="data_buy.vol3" style="padding: 4px">
                    {{ formatMoney(data_buy.vol3, 0, 2) }}</span
                  >
                </transition>
              </div>
              <div class="column-step-price1">
                <transition
                  :name="
                    $function_global.getAnimationNameFromChange(
                      parseFloat(data_buy.price3) -
                        parseFloat(price_eod_yesterday)
                    )
                  "
                  mode="out-in"
                >
                  <span
                    style="padding: 4px"
                    v-if="data_buy.price3 != 0"
                    :key="data_buy.price3"
                    :class="
                      $function_global.getClassTextColorFromPrice(
                        data_buy.price3,
                        price_eod_yesterday,
                        board
                      )
                    "
                  >
                    {{ formatMoney(data_buy.price3, 2, 2) }}
                  </span>
                </transition>
              </div>
            </div>
            <div class="row-column-step-wrap">
              <div class="column-step-price2">
                <transition
                  :name="
                    $function_global.getAnimationNameFromChange(
                      parseFloat(data_sell.price3) -
                        parseFloat(price_eod_yesterday)
                    )
                  "
                  mode="out-in"
                >
                  <span
                    style="padding: 4px"
                     v-if="data_sell.price3 != 0"
                    :key="data_sell.price3"
                    :class="
                      $function_global.getClassTextColorFromPrice(
                        data_sell.price3,
                        price_eod_yesterday,
                        board
                      )
                    "
                  >
                    {{ formatMoney(data_sell.price3, 2, 2) }}
                  </span>
                </transition>
              </div>
              <div class="column-step-vol2">
                <transition
                  :name="
                    $function_global.getAnimationNameFromChange(
                      parseFloat(data_sell.price3) -
                        parseFloat(price_eod_yesterday)
                    )
                  "
                  mode="out-in"
                >
                  <span v-if="data_sell.vol3 != 0" :key="data_sell.vol3" style="padding: 4px"
                    >{{ formatMoney(data_sell.vol3, 0, 2) }}
                  </span>
                </transition>
              </div>
            </div>
          </div>
        </div>
        <div
          style="
            display: flex;
            flex-direction: row;
            flex: 1 1 0%;
            align-items: center;
            padding: 8px;
          "
          class="border-top border-bottom"
        >
          <div style="display: flex; flex-direction: row; flex: 2 1 0%">
            <strong>Khớp</strong>
          </div>
          <div
            style="
              display: flex;
              flex-direction: row;
              justify-content: flex-end;
              flex: 2 1 0%;
            "
          >
            <strong>Giá</strong>
          </div>
          <div
            style="
              display: flex;
              flex-direction: row;
              justify-content: flex-end;
              flex: 2 1 0%;
            "
          >
            <strong>+/-</strong>
          </div>
          <div
            style="
              display: flex;
              flex-direction: row;
              justify-content: flex-end;
              flex: 2 1 0%;
            "
          >
            <strong>KL</strong>
          </div>
          <div
            style="
              display: flex;
              flex-direction: row;
              width: 35px;
              justify-content: flex-end;
            "
          >
            <strong>M/B</strong>
          </div>
        </div>
        <virtual-list
          ref="list_item_order"
          class="list-infinite scroll-touch"
          :data-key="'tradingdate'"
          :data-sources="data_order_board"
          :data-component="itemComponent"
          :estimate-size="70"
          v-on:scroll="onScroll"
          :item-class="'list-item-infinite'"
          :footer-class="'loader-wrapper'"
          v-on:totop="onScrollToTop"
          v-on:tobottom="onScrollToBottom"
          :extra-props="{ price_eod_yesterday, board }"
        >
        </virtual-list>
        <div class="row-total border-bottom border-top">
          <div class="row-total__header">Tổng KL khớp</div>
          <div class="row-total__value font-weight-bold">
            <transition name="nochange" mode="out-in">
              <span :key="totalvol.all">
                {{ formatMoney(totalvol.all, 0, 2) }}
              </span>
            </transition>
          </div>
          <div class="row-total__side"></div>
        </div>
        <div class="row-total border-bottom">
          <div class="row-total__header">KL Mua chủ động</div>
          <div class="row-total__value font-weight-bold text-upchange">
            <transition name="nochange" mode="out-in">
              <span :key="totalvol.buy">
                {{ formatMoney(totalvol.buy, 0, 2) }}
              </span>
            </transition>
          </div>
          <div class="row-total__side font-weight-bold text-upchange">M</div>
        </div>
        <div class="row-total">
          <div class="row-total__header">KL Bán chủ động</div>
          <div class="row-total__value font-weight-bold text-downchange">
            <transition name="nochange" mode="out-in">
              <span :key="totalvol.sell">
                {{ formatMoney(totalvol.all - totalvol.buy, 0, 2) }}
              </span>
            </transition>
          </div>
          <div class="row-total__side text-downchange font-weight-bold">B</div>
        </div>
        <div class="position-relative table-responsive" v-if="false">
          <table class="table table-hover">
            <tbody class="position-relative">
              <tr>
                <td class="pt-1 pb-1 text-left">Tổng KL khớp</td>
                <td class="pt-1 pb-1 text-right font-weight-bold">
                  <transition name="nochange" mode="out-in">
                    <span :key="totalvol.all">
                      {{ formatMoney(totalvol.all, 0, 2) }}
                    </span>
                  </transition>
                </td>
                <td class="pt-1 pb-1 text-right"></td>
              </tr>
              <tr>
                <td class="pt-1 pb-1 text-left">KL MUA chủ động</td>
                <td class="pt-1 pb-1 text-right font-weight-bold text-upchange">
                  <transition name="nochange" mode="out-in">
                    <span :key="totalvol.buy">
                      {{ formatMoney(totalvol.buy, 0, 2) }}
                    </span>
                  </transition>
                </td>
                <td class="pt-1 pb-1 text-right font-weight-bold text-upchange">
                  M
                </td>
              </tr>
              <tr>
                <td class="pt-1 pb-1 text-left">KL BÁN chủ động</td>
                <td
                  class="pt-1 pb-1 text-right font-weight-bold text-downchange"
                >
                  <transition name="nochange" mode="out-in">
                    <span :key="totalvol.sell">
                      {{ formatMoney(totalvol.sell, 0, 2) }}
                    </span>
                  </transition>
                </td>
                <td
                  class="pt-1 pb-1 text-right font-weight-bold text-downchange"
                >
                  B
                </td>
              </tr>
            </tbody>
          </table>
          <!---->
        </div>
      </CTab>
      <CTab title="Mức giá">
        <p class="text-center h5 pt-2">Thống kê khối lượng theo giá</p>
        <CustomEChart
          :option="option_chart_totalvol_by_price"
          style="height: calc(100vh - 250px)"
        >
        </CustomEChart>
      </CTab>
      <CTab title="Nước ngoài">
        <p class="h5 my-3 text-center">GIAO DỊCH NƯỚC NGOÀI</p>
        <div class="border-top border-bottom">
          <div style="display: flex; padding: 5px">
            <div style="flex: 33%">KL Mua</div>
            <div style="flex: 33%">KL Bán</div>
            <div style="flex: 33%">KL Mua ròng</div>
          </div>
        </div>
        <div class="border-bottom">
          <div style="display: flex; padding: 5px">
            <div style="flex: 33%" class="font-weight-bold text-upchange">
              {{ formatMoney(fbvol, 0, 2) }}
            </div>
            <div style="flex: 33%" class="font-weight-bold text-downchange">
              {{ formatMoney(fsvol, 0, 2) }}
            </div>
            <div
              style="flex: 33%"
              class="font-weight-bold"
              :class="getClassColorByChange(fbvol - fsvol)"
            >
              {{ formatMoney(fbvol - fsvol, 0, 2) }}
            </div>
          </div>
        </div>
        <div class="border-bottom">
          <div style="display: flex; padding: 5px">
            <div style="flex: 33%">GT Mua</div>
            <div style="flex: 33%">GT Bán</div>
            <div style="flex: 33%">GT Mua ròng</div>
          </div>
        </div>
        <div class="border-bottom">
          <div style="display: flex; padding: 5px">
            <div style="flex: 33%" class="font-weight-bold text-upchange">
              {{ formatMoney(fbuy, 0, 2) }} tỷ
            </div>
            <div style="flex: 33%" class="font-weight-bold text-downchange">
              {{ formatMoney(fsell, 0, 2) }} tỷ
            </div>
            <div
              style="flex: 33%"
              class="font-weight-bold"
              :class="getClassColorByChange(fbuy - fsell)"
            >
              {{ formatMoney(fbuy - fsell, 0, 2) }} tỷ
            </div>
          </div>
        </div>
      </CTab>
    </CTabs>
  </div>
</template>

<script>
import CustomEChart from "@/views/charts/CustomEchart";
import Item from "./Item";
import VirtualList from "vue-virtual-scroll-list";
import axios from "axios";

export default {
  name: "OrderBoard",
  components: {
    CustomEChart,
    VirtualList,
  },
  data() {
    return {
      itemComponent: Item,
      data_order_board: [],
      data_order_board_update: [],
      activeTab: 0,
      data_buy: {
        price1: 0,
        price2: 0,
        price3: 0,
        vol1: 0,
        vol2: 0,
        vol3: 0,
      },
      data_sell: {
        price1: 0,
        price2: 0,
        price3: 0,
        vol1: 0,
        vol2: 0,
        vol3: 0,
      },
      data_common_info: [],
      data_common_raw: {
        eps: 0,
        von_hoa: 0,
        bvps: 0
      },
      totalvol: {
        all: 0,
        buy: 0,
        sell: 0,
      },
      lowest_price: 0,
      highest_price: 0,
      open_price: 0,
      data_intraday: {},
      is_no_data: false,
      price_eod_yesterday: 0,
      totalvol_by_price: {},
      is_head: true,
      fbvol: 0,
      fsvol: 0,
      fbuy: 0,
      fsell: 0,
      fnetbuy: 0,
      fnetsell: 0,
    };
  },
  props: {
    mack: {
      type: String,
    },
  },
  created() {
    // window.socket_send.emit("getlive", ["HQC"], (res) => {
    //   console.log(res);
    // });
    this.getDataInit();
    window.socket_send.on("updatelive", (data) => {
      if (data.stockcode == this.mack) {
        let side = "";
        if (data.side == "S") side = "B";
        else if (data.side == "B") side = "M";
        const item = {
          price: parseFloat(data.price) / 1000,
          side: side,
          tradingdate: data.time,
          vol: parseFloat(data.vol),
        };
        if (this.is_head) {
          this.data_order_board.unshift(item);
        } else {
          this.data_order_board_update.push(item);
        }
        const price = parseFloat(data.price) / 1000;
        if (this.totalvol_by_price.hasOwnProperty(price)) {
          this.totalvol_by_price[price] += parseFloat(data.vol);
        } else {
          this.totalvol_by_price[price] = parseFloat(data.vol);
        }
        this.totalvol.all += parseFloat(data.vol);
        if (data.side == "S") this.totalvol.sell += parseFloat(data.vol);
        else if (data.side == "B") this.totalvol.buy += parseFloat(data.vol);
      }
    });
    window.socket_send.on("updatestepprice", (res) => {
      if (res.stockcode == this.mack) {
        if (res.side == "B") {
          this.data_buy.price1 = res.p1;
          this.data_buy.price2 = res.p2;
          this.data_buy.price3 = res.p3;
          this.data_buy.vol1 = res.v1 ? parseFloat(res.v1) * 10 : 0;
          this.data_buy.vol2 = res.v2 ? parseFloat(res.v2) * 10 : 0;
          this.data_buy.vol3 = res.v3 ? parseFloat(res.v3) * 10 : 0;
        } else if (res.side == "S") {
          this.data_sell.price1 = res.p1;
          this.data_sell.price2 = res.p2;
          this.data_sell.price3 = res.p3;
          this.data_sell.vol1 = res.v1 ? parseFloat(res.v1) * 10 : 0;
          this.data_sell.vol2 = res.v2 ? parseFloat(res.v2) * 10 : 0;
          this.data_sell.vol3 = res.v3 ? parseFloat(res.v3) * 10 : 0;
        }
      }
    });
    window.socket_send.on("connect", () => {
      window.socket_send.emit("join", [this.mack]);
      window.socket_send.emit("join", ["STEP_" + this.mack]);
    });
  },
  methods: {
    onScrollToTop() {
      this.is_head = true;
      const temp_data = JSON.parse(
        JSON.stringify(this.data_order_board_update)
      );
      this.data_order_board_update = [];
      for (let i = 0; i < temp_data.length; i++) {
        const element = temp_data[i];
        this.data_order_board.unshift(element);
      }
    },
    onScroll() {
      this.is_head = false;
    },
    onScrollToBottom() {
      const last_date =
        this.data_order_board[this.data_order_board.length - 1].tradingdate;
      if (this.is_no_data) return;
      console.log(last_date);
      window.socket_send.emit(
        "getintraday",
        this.mack,
        "",
        "(" + last_date,
        500,
        "desc",
        (res) => {
          console.log(res["tradingdate"].length);
          const rs = res;
          if (!rs) {
            return;
          }
          if (res.stockcode == this.mack) {
            if (rs["side"].length > 499) {
              for (let i = 0; i < rs["side"].length; i++) {
                if (
                  rs["tradingdate"][i] !=
                  rs["tradingdate"][rs["tradingdate"].length - 1]
                ) {
                  let side = "";
                  if (rs["side"][i] == "S") side = "B";
                  else if (rs["side"][i] == "B") side = "M";
                  let item = {
                    price: parseFloat(rs["price"][i]) / 1000,
                    side: side,
                    tradingdate: rs["tradingdate"][i],
                    vol: parseFloat(rs["vol"][i]),
                  };
                  this.data_order_board.push(item);
                }
              }
            } else {
              for (let i = 0; i < rs["side"].length; i++) {
                let side = "";
                if (rs["side"][i] == "S") side = "B";
                else if (rs["side"][i] == "B") side = "M";
                let item = {
                  price: parseFloat(rs["price"][i]) / 1000,
                  side: side,
                  tradingdate: rs["tradingdate"][i],
                  vol: parseFloat(rs["vol"][i]),
                };
                this.data_order_board.push(item);
              }
              this.is_no_data = true;
            }
          }
        }
      );
    },
    getDataInit() {
      if (this.mack.length == "") return;
      window.socket_send.emit("getliveohlc", this.mack, (res) => {
        if (!res) return;
        if (Object.keys(res).length == 0) return;
        if (res.stockcode.length > 0) {
          if (res.stockcode[0] == this.mack) {
            this.open_price = parseFloat(res.o[0]) / 1000;
            this.highest_price = parseFloat(res.h[0]) / 1000;
            this.lowest_price = parseFloat(res.l[0]) / 1000;
          }
        }
      });
      window.socket_send.emit("getforeign", this.mack, (res) => {
        if (!res) return;
        if (Object.keys(res).length == 0) return;
        if (res.stockcode.length > 0) {
          if (res.stockcode[0] == this.mack) {
            this.fbvol = parseFloat(res.fbvol[0]);
            this.fsvol = parseFloat(res.fsvol[0]);
            this.fnetbuy = parseFloat(res.fnetbuy[0]);
            this.fbuy = parseFloat(res.fbuy[0]) / 1000000000;
            this.fsell = parseFloat(res.fsell[0]) / 1000000000;
            this.fnetsell = parseFloat(res.fnetsell[0]) / 1000000000;
          }
        }
      });
      axios
        .get(this.$apiAdress + "/api/stocks/orderboard", {
          params: {
            mack: this.mack,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          if (res.data.mack == this.mack) {
            this.data_common_raw.eps = res.data.value.eps;
            this.data_common_raw.bvps = res.data.value.bvps;
            this.data_common_raw.von_hoa = res.data.value.von_hoa;
            this.data_common_info = Object.keys(res.data.label).map(key => {
              return {
                prefix: res.data.label[key].prefix,
                value: res.data.value[key],
                subfix: res.data.label[key].subfix,
              }
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
      window.socket_send.emit("getintradayohlc", this.mack, 1, (res) => {
        let time = null;
        if (res) {
          if (res.t.length > 0) {
            const date = new Date((res.t[0] + 7 * 3600) * 1000); //GMT + 7
            time = date.toISOString().slice(0, 19).replace("T", " ");
            time = time.slice(0, 10);
          } else {
            time = new Date(new Date().getTime()).toISOString().substr(0, 10);
          }
        } else {
          time = new Date(new Date().getTime()).toISOString().substr(0, 10);
        }
        window.socket_send.emit("getlasteod", [this.mack], time, (res1) => {
          if (!res1) return;
          if (res1.stockcode.length > 0) {
            if (res1.stockcode[0] == this.mack) {
              this.price_eod_yesterday = parseFloat(res1.eod[0]) / 1000;
            }
          }
        });
        if (res) {
          if (res.stockcode == this.mack) {
            res.o = res.o.map((item) => parseFloat(item) / 1000);
            res.h = res.h.map((item) => parseFloat(item) / 1000);
            res.l = res.l.map((item) => parseFloat(item) / 1000);
            res.c = res.c.map((item) => parseFloat(item) / 1000);
            this.data_intraday = res;
            // this.highest_price = Math.max(...res.h);
            // this.lowest_price = Math.min(...res.l);
          }
        }
      });
      window.socket_send.emit("getstatprice", this.mack, (res) => {
        const rs = res;
        if (!rs) return;
        let temp_data = {};
        if (rs.stockcode == this.mack) {
          for (let i = 0; i < rs.price.length; i++) {
            const price = parseFloat(rs.price[i]) / 1000;
            temp_data[price] = parseFloat(rs.vol[i]);
          }
          this.totalvol_by_price = temp_data;
        }
      });
      window.socket_send.emit("getintradaysummary", this.mack, (res) => {
        if (!res) return;
        if (Object.keys(res).length == 0) return;
        if (res.totalvol.length > 0) {
          if (res.stockcode == this.mack) {
            this.totalvol.all = parseFloat(res.totalvol[0]);
            this.totalvol.buy = parseFloat(res.totalbuy[0]);
            this.totalvol.sell = parseFloat(res.totalsell[0]);
            this.$store.state.data_eod[res.stockcode].totalval = parseFloat(
              res.totalval[0]
            );
          }
        }
      });

      window.socket_send.emit(
        "getintraday",
        this.mack,
        "",
        "",
        300,
        "desc",
        (res) => {
          const rs = res;
          let time = null;
          if (rs) {
            if (rs.tradingdate.length > 0) {
              time = rs.tradingdate[0].slice(0, 10);
            } else {
              time = new Date(new Date().getTime()).toISOString().substr(0, 10);
            }
          } else {
            time = new Date(new Date().getTime()).toISOString().substr(0, 10);
          }
          window.socket_send.emit("getlasteod", [this.mack], time, (res1) => {
            if (!res1) return;
            if (res1.stockcode.length > 0) {
              if (res1.stockcode[0] == this.mack) {
                this.price_eod_yesterday = parseFloat(res1.eod[0]) / 1000;
              }
            }
          });
          if (rs) {
            if (rs.tradingdate.length > 0) {
              if (rs.stockcode == this.mack) {
                if (rs["side"].length > 298) {
                  for (let i = 0; i < rs["side"].length; i++) {
                    if (
                      rs["tradingdate"][i] !=
                      rs["tradingdate"][rs["tradingdate"].length - 1]
                    ) {
                      let side = "";
                      if (rs["side"][i] == "S") side = "B";
                      else if (rs["side"][i] == "B") side = "M";
                      let item = {
                        price: parseFloat(rs["price"][i]) / 1000,
                        side: side,
                        tradingdate: rs["tradingdate"][i],
                        vol: parseFloat(rs["vol"][i]),
                      };
                      this.data_order_board.push(item);
                    }
                  }
                } else {
                  for (let i = 0; i < rs["side"].length; i++) {
                    let side = "";
                    if (rs["side"][i] == "S") side = "B";
                    else if (rs["side"][i] == "B") side = "M";
                    let item = {
                      price: parseFloat(rs["price"][i]) / 1000,
                      side: side,
                      tradingdate: rs["tradingdate"][i],
                      vol: parseFloat(rs["vol"][i]),
                    };
                    this.data_order_board.push(item);
                  }
                }
              }
            }
          }
        }
      );
      window.socket_send.emit("getstepprice", [this.mack], (res) => {
        if (!res) return;
        if (Object.keys(res).length == 0) return;
        if (res.b1.length > 0) {
          if (res.stockcode[0] == this.mack) {
            this.data_buy.price1 = res.b1[0];
            this.data_buy.price2 = res.b2[0];
            this.data_buy.price3 = res.b3[0];
            this.data_buy.vol1 = res.vb1[0] ? parseFloat(res.vb1[0]) * 10 : 0;
            this.data_buy.vol2 = res.vb2[0] ? parseFloat(res.vb2[0]) * 10 : 0;
            this.data_buy.vol3 = res.vb3[0] ? parseFloat(res.vb3[0]) * 10 : 0;

            this.data_sell.price1 = res.s1[0];
            this.data_sell.price2 = res.s2[0];
            this.data_sell.price3 = res.s3[0];
            this.data_sell.vol1 = res.vs1[0] ? parseFloat(res.vs1[0]) * 10 : 0;
            this.data_sell.vol2 = res.vs2[0] ? parseFloat(res.vs2[0]) * 10 : 0;
            this.data_sell.vol3 = res.vs3[0] ? parseFloat(res.vs3[0]) * 10 : 0;
          }
        }
      });
      window.socket_send.emit("getlive", [this.mack], (res) => {
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
          // this.$store.state.data_eod[stockcode].totalval = res["totalvol"][i]*res["lastprice"][i];
        }
      });
      window.socket_send.emit("join", [this.mack]);
      window.socket_send.emit("join", ["STEP_" + this.mack]);
    },
    formatMoney(number, min, max) {
      let num_check = parseFloat(number);
      if (isNaN(num_check)) return number;
      return number.toLocaleString("en", {
        minimumFractionDigits: min,
        maximumFractionDigits: max,
      });
    },
    getClassColorByChange(change) {
      change = parseFloat(change);
      if (change > 0) {
        return "text-upchange";
      } else if (change == 0) {
        return "text-nochange";
      } else {
        return "text-downchange";
      }
    },
  },
  computed: {
    list_order_board() {
      let data_return = [];
      return data_return;
    },
    list_totalvol_by_price() {
      let data_return = [];
      if (this.data_order_board.length > 0) {
        let temp_data_order_board = JSON.parse(
          JSON.stringify(this.data_order_board)
        );
        temp_data_order_board.sort(function (a, b) {
          return parseFloat(a.price) - parseFloat(b.price);
        });
        let price = temp_data_order_board[0].price;
        let vol = 0;
        for (const item of temp_data_order_board) {
          if (price == item.price) {
            vol += parseFloat(item.vol);
          } else {
            data_return.push({
              price: price,
              vol: vol,
            });
            price = item.price;
            vol = 0;
          }
        }
        data_return.push({
          price: price,
          vol: vol,
        });
      }
      return data_return;
    },
    option_chart_totalvol_by_price() {
      let list_price = [];
      let list_vol = [];
      let temp_data = [];
      if (Object.keys(this.totalvol_by_price).length > 0) {
        for (const key of Object.keys(this.totalvol_by_price)) {
          temp_data.push({
            price: key,
            vol: this.totalvol_by_price[key],
          });
        }
      }
      temp_data.sort(function (a, b) {
        return parseFloat(b.price) - parseFloat(a.price);
      });
      for (const item of temp_data) {
        list_price.push(item.price);
        list_vol.push({
          value: item.vol,
          price: parseFloat(item.price),
        });
      }
      return {
        backgroundColor: "transparent",
        title: { show: false },
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
          formatter: function (params) {
            let text = "";
            text +=
              "<b>Giá: </b>" +
              parseFloat(params[0].name).toLocaleString("en", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              }) +
              "<br/>";
            text +=
              "<b>Khối lượng: </b>" +
              parseFloat(params[0].data.value).toLocaleString("en", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              }) +
              "<br/>";
            return text;
          },
        },
        grid: { top: 0, bottom: 10, left: 55 },
        xAxis: {
          type: "value",
          position: "top",
          show: false,
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { lineStyle: { type: "dashed" } },
          axisLabel: {},
        },
        yAxis: {
          type: "category",
          axisLine: { show: false },
          axisLabel: { show: true },
          axisTick: { show: false },
          splitLine: { show: false },
          data: list_price,
        },
        series: [
          {
            name: "",
            barMinWidth: 10,
            barMaxWidth: 35,
            type: "bar",
            data: list_vol.map((item) => {
              let color = "";
              if (item.price >= this.ceil_price) color = "#da06f7";
              else if (item.price > this.price_eod_yesterday)
                color = "rgb(46, 184, 92)";
              else if (item.price <= this.floor_price)
                color = "rgb(23, 194, 206)";
              else if (item.price < this.price_eod_yesterday)
                color = "rgb(229, 83, 83)";
              else color = "#cb8920";
              return { value: item.value, itemStyle: { color: color } };
            }),
          },
        ],
      };
    },
    company_name() {
      return this.$store.state.list_mack_company.hasOwnProperty(this.mack)
        ? this.$store.state.list_mack_company[this.mack].ten_cong_ty
        : "";
    },
    board() {
      return this.$store.state.list_mack_company.hasOwnProperty(this.mack)
        ? this.$store.state.list_mack_company[this.mack].san
        : "";
    },
    von_hoa() {
      return this.price * this.data_common_raw.von_hoa;
    },
    eps() {
      return this.data_common_raw.eps;
    },
    bvps() {
      return this.data_common_raw.bvps;
    },
    pe() {
      return this.data_common_raw.eps != 0
        ? (this.price * 1000) / this.data_common_raw.eps
        : 0;
    },
    pb() {
      return this.data_common_raw.eps != 0
        ? (this.price * 1000) / this.data_common_raw.bvps
        : 0;
    },
    so_luong_co_phieu() {
      return this.data_common_raw.von_hoa * 1000000;
    },
    price() {
      return this.$store.state.data_eod.hasOwnProperty(this.mack)
        ? parseFloat(this.$store.state.data_eod[this.mack].lastprice) / 1000
        : 0;
    },
    change() {
      return this.$store.state.data_eod.hasOwnProperty(this.mack)
        ? parseFloat(this.$store.state.data_eod[this.mack].change)
        : 0;
    },
    perchange() {
      return this.$store.state.data_eod.hasOwnProperty(this.mack)
        ? parseFloat(this.$store.state.data_eod[this.mack].perchange)
        : 0;
    },
    cl() {
      return this.$store.state.data_eod.hasOwnProperty(this.mack)
        ? this.$store.state.data_eod[this.mack].cl
        : "";
    },
    vol() {
      return this.$store.state.data_eod.hasOwnProperty(this.mack)
        ? parseFloat(this.$store.state.data_eod[this.mack].totalvol)
        : 0;
    },
    val() {
      if (this.board.toUpperCase() == "PS") {
        return this.$store.state.data_eod.hasOwnProperty(this.mack)
          ? parseFloat(this.$store.state.data_eod[this.mack].totalval) /
              10000000
          : 0;
      } else {
        return this.$store.state.data_eod.hasOwnProperty(this.mack)
          ? parseFloat(this.$store.state.data_eod[this.mack].totalval) /
              1000000000
          : 0;
      }
    },
    // open_price() {
    //   let return_data = 0;
    //   if (Object.keys(this.data_intraday).length > 0) {
    //     if (this.data_intraday.o.length > 0) {
    //       return_data = parseFloat(this.data_intraday.o[0]);
    //     }
    //   }
    //   return return_data;
    // },
    ceil_price() {
      return this.$function_global.calcCeilPrice(
        this.price_eod_yesterday,
        this.board
      );
    },
    floor_price() {
      return this.$function_global.calcFloorPrice(
        this.price_eod_yesterday,
        this.board
      );
    },
    option_chart_price_vol() {
      if (
        Object.keys(this.data_intraday).length > 0 &&
        this.price_eod_yesterday > 0
      ) {
        let line_data = [];
        let bar_data = [];
        if (parseFloat(this.price_eod_yesterday) > 1) {
          const date1 = new Date(
            (this.data_intraday.t[0] - 60 + 7 * 3600) * 1000
          ); //GMT + 7
          const date_string1 = date1
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
          line_data.push([date_string1, parseFloat(this.price_eod_yesterday)]);
          bar_data.push([date_string1, 0]);
        }
        for (let index = 0; index < this.data_intraday.o.length; index++) {
          const date = new Date(
            (this.data_intraday.t[index] + 7 * 3600) * 1000
          ); //GMT + 7
          const date_string = date.toISOString().slice(0, 19).replace("T", " ");
          line_data.push([
            date_string,
            parseFloat(this.data_intraday.o[index]),
          ]);
          bar_data.push([date_string, parseFloat(this.data_intraday.v[index])]);
        }
        return {
          title: { show: false },
          tooltip: {
            trigger: "axis",
            axisPointer: { type: "line" },
            formatter: (params) => {
              return `Thời gian: ${
                params[0].axisValueLabel.split(" ")[1]
              }<br/>Giá: ${params[0].value[1].toLocaleString()} <br/> Khối lượng: ${params[1].value[1].toLocaleString()}`;
            },
          },
          grid: { top: 0, bottom: 0, left: 14, right: 10, containLabel: true },
          visualMap: [
            {
              show: false,
              seriesIndex: 0,
              pieces: [
                { gte: this.price_eod_yesterday, color: "#00aa00" },
                { lt: this.price_eod_yesterday, gt: 0, color: "#ee5442" },
              ],
            },
          ],
          xAxis: {
            type: "time",
            axisLabel: {
              formatter: (params) => {
                const date = new Date(params);
                const hours = date.getHours();
                const minutes = date.getMinutes();
                if (
                  minutes == 0 ||
                  minutes == 15 ||
                  minutes == 30 ||
                  minutes == 45
                )
                  return minutes != 0
                    ? hours + ":" + minutes
                    : hours + ":0" + minutes;
                return "";
              },
            },
          },
          yAxis: [
            {
              type: "value",
              position: "right",
              scale: true,
              axisLine: { show: false },
              axisTick: { show: false },
              splitLine: { lineStyle: { type: "dashed" } },
              axisPointer: { snap: true },
              show: false,
              axisLabel: { show: false },
            },
            {
              type: "value",
              position: "left",
              show: false,
              scale: false,
              axisLabel: { show: false },
              axisLine: { show: false },
              axisTick: { show: false },
              splitLine: { lineStyle: { type: "dashed" } },
              axisPointer: { snap: true },
            },
          ],
          series: [
            {
              type: "line",
              smooth: false,
              symbol: "none",
              data: line_data,
              markLine: {
                silent: true,
                data: [
                  {
                    yAxis: this.price_eod_yesterday,
                    lineStyle: { color: "#ccaa00" },
                    label: {
                      normal: { position: "insideMiddleTop", formatter: "" },
                    },
                  },
                ],
              },
              markPoint: {
                data: [
                  {
                    symbol: "circle",
                    symbolSize: 10,
                    coord: [240, line_data[line_data.length - 1][1]],
                    itemStyle: { color: "rgb(239, 83, 80)" },
                  },
                ],
              },
            },
            {
              type: "bar",
              smooth: false,
              xAxisIndex: 0,
              yAxisIndex: 1,
              data: bar_data,
              itemStyle: { color: "#ccaa00" },
              markLine: { silent: true, data: [] },
              markPoint: { data: [] },
            },
          ],
        };
      } else {
        return {
          series: [
            {
              data: [],
            },
            {
              data: [],
            },
          ],
        };
      }
    },
  },
  watch: {
    mack: {
      handler(newVal, oldVal) {
        this.$refs.list_item_order.scrollToIndex(0);
        this.data_order_board = [];
        this.data_order_board_update = [];
        this.totalvol_by_price = {};
        (this.data_intraday = {}), (this.totalvol.all = 0);
        this.totalvol.buy = 0;
        this.totalvol.sell = 0;
        this.data_buy.price1 = 0;
        this.data_buy.price2 = 0;
        this.data_buy.price3 = 0;
        this.data_buy.vol1 = 0;
        this.data_buy.vol2 = 0;
        this.data_buy.vol3 = 0;
        this.data_sell.price1 = 0;
        this.data_sell.price2 = 0;
        this.data_sell.price3 = 0;
        this.data_sell.vol1 = 0;
        this.data_sell.vol2 = 0;
        this.data_sell.vol3 = 0;
        this.data_sell.price_eod_yesterday = 0;
        this.data_common_info = [];
        this.data_common_raw = {
          eps: 0,
          von_hoa: 0,
          bvps: 0
        };
        this.lowest_price = 0;
        this.highest_price = 0;
        this.open_price = 0;
        this.fbuy = 0;
        this.fbvol = 0;
        this.fnetbuy = 0;
        this.fnetsell = 0;
        this.fsell = 0;
        this.fsvol = 0;
        this.is_no_data = false;
        this.price_eod_yesterday = 0;
        // window.socket_send.emit("leave", [oldVal]);
        window.socket_send.emit("leave", ["STEP_" + oldVal]);
        this.getDataInit();
      },
    },
  },
  beforeDestroy() {
    window.socket_send.emit("leave", ["STEP_" + this.mack]);
    // window.socket_send.emit("leave", [this.mack]);
  },
};
</script>
<style lang="scss">
.table-orderboard {
  height: calc(100vh - 455px);
  max-height: calc(100vh - 455px);
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
  table {
    thead {
      position: sticky;
      position: -webkit-sticky;
      top: -1px;
      z-index: 2;
      tr {
        background-color: #fff;
        th {
          background-color: #fff;
        }
      }
    }
  }
}
.common-scrollbar {
  height: calc(100vh - 200px);
  max-height: calc(100vh - 200px);
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
.bg-hover {
  &:hover {
    color: white;
    background-color: #8c58b3;
    cursor: pointer;
    span {
      color: white !important;
    }
  }
}
.result {
  margin-bottom: 1em;
}
.c-dark-theme {
  .list-infinite {
    .loader:after {
      background-color: #282933;
    }
    .list-item-infinite {
      border-bottom: 1px solid rgba(255, 255, 255, 0.075);
    }
  }
}
.list-infinite {
  width: 100%;
  height: calc(100vh - 465px);
  border-radius: 3px;
  overflow-y: auto;
  cursor: pointer;
  position: relative;
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
  .list-item-infinite {
    display: flex;
    align-items: center;
    padding: 0.4em;
    border-bottom: 1px solid #d8dbe0;
    &:hover {
      color: #fff !important;
      background-color: #8c58b3;
      span,div {
        color: #fff !important;
      }
    }
  }
  .loader-wrapper {
    padding: 1em;
  }
  .loader {
    font-size: 10px;
    margin: 0px auto;
    text-indent: -9999em;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #ffffff;
    background: linear-gradient(
      to right,
      #9b4dca 10%,
      rgba(255, 255, 255, 0) 42%
    );
    position: relative;
    animation: load3 1.4s infinite linear;
    transform: translateZ(0);
  }
  .loader:before {
    width: 50%;
    height: 50%;
    background: #9b4dca;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
  }
  .loader:after {
    background-color: #fff;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: "";
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  @-webkit-keyframes load3 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes load3 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
.row-column-step {
  display: flex;
  flex-direction: row;
  flex: 1 1 0%;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  cursor: pointer;
  .row-column-step-wrap {
    display: flex;
    flex-direction: row;
    flex: 1 1 0%;
    position: relative;
    .column-step-vol1 {
      display: flex;
      flex-direction: row;
      flex: 1 1 0%;
      position: relative;
      z-index: 10;
    }
    .column-step-vol2 {
      justify-content: flex-end;
      display: flex;
      flex-direction: row;
      position: relative;
      z-index: 10;
    }
    .column-step-price1 {
      justify-content: flex-end;
      padding-right: 4px;
      font-weight: bold;
      display: flex;
      flex-direction: row;
      position: relative;
      z-index: 10;
    }
    .column-step-price2 {
      padding-left: 4px;
      font-weight: bold;
      display: flex;
      flex-direction: row;
      flex: 1 1 0%;
      position: relative;
      z-index: 10;
    }
  }
  &:hover {
    color: #fff !important;
    background-color: #8c58b3;
    span,div {
      color: #fff !important;
    }
  }
}
.row-total {
  display: flex;
  flex-direction: row;
  flex: 1 1 0%;
  align-items: center;
  padding: 4px;
  &__title {
    display: flex;
    flex-direction: row;
    flex: 4 1 0%;
    padding: 4px;
  }
  &__value {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    flex: 2 1 0%;
  }
  &__side {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 50px;
  }
  &:hover {
    color: #fff !important;
    background-color: #8c58b3;
    span,div {
      color: #fff !important;
    }
  }
}
.custom-padding-tab-item {
  li {
    a {
      padding-left: 0px;
      padding-right: 0px;
    }
  }
}
</style>
