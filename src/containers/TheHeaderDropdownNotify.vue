<template>
      <CDropdown :show.sync="is_show_dropdown">
        <template #toggler>
          <CHeaderNavLink>
            <CHeaderNavLink>
              <CIcon name="cil-bell" @click="readAllNotify" />
            </CHeaderNavLink>
            <template v-if="total_notify_lates">
              <span class="badge badge-pill badge-danger">{{ total_notify_lates }}</span>
            </template>
          </CHeaderNavLink>
        </template>
        <template v-if="list_group_notify_finance.length > 0">
            <div class="d-flex flex-column width_vw_sm width_vw_xl px-2" style="height: 92vh !important">
              <div class="d-flex flex-row item_notify_hover px-1" @click="toggleFinance()" >
                <p class="mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wallet-fill" viewBox="0 0 16 16">
                    <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v2h6a.5.5 0 0 1 .5.5c0 .253.08.644.306.958.207.288.557.542 1.194.542.637 0 .987-.254 1.194-.542.226-.314.306-.705.306-.958a.5.5 0 0 1 .5-.5h6v-2A1.5 1.5 0 0 0 14.5 2h-13z"/>
                    <path d="M16 6.5h-5.551a2.678 2.678 0 0 1-.443 1.042C9.613 8.088 8.963 8.5 8 8.5c-.963 0-1.613-.412-2.006-.958A2.679 2.679 0 0 1 5.551 6.5H0v6A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-6z"/>
                  </svg>
                </p>
                <p class="pl-2" style="padding-top: 2px; font-weight: bold"></p>
                <p class="pl-1 h5" style="padding-top: 2px" >Thông báo</p>
              </div>

              <CCollapse :show="Boolean(true)" :duration="collapseDuration" style="height: 90vh !important; overflow: auto;" class="custom_scrollbar">
                  <div  v-for="(item, index) in list_group_notify_finance " :key="index" class=" pb-1 d-flex " style=" border-bottom: 0.5px solid #dfdfdf !important"
                    @click="toggleDetailsGroupFinance(item.index_row)"
                    :class="[{'item_notify_hover_dark': $store.state.darkMode}, {'item_notify_hover_light': !$store.state.darkMode}]"
                  >
                    <span class="py-1 pl-1" style="width: 15px !important; " ><CIcon name="cil-bell" /> </span>
                    <!-- /. left, bell -->
                      <div class="flex-grow-1 pt-1 px-1 ">
                        <span style=" padding-left: 5px" class="h6">
                          <span v-if="item.total_is_new > 0" class="badge badge-secondary" style="font-size: 12px; !important;" :class="{ 'badge-light': $store.state.darkMode }">{{ item.total_is_new }}</span>
                          Đã có báo cáo tài chính quý {{" " + JSON.parse(item.list_data[0].data).finance.quarter + " năm " +  JSON.parse(item.list_data[0].data).finance.year}}
                          của <span style="font-weight: 900">{{ item.list_data.length }}</span> mã:
                          <span class="pl-2"  style="font-weight: 700">{{ take3Item(item.list_data) }}</span>
                        </span>
                        <div class=" text-muted pl-2">{{ formatMoment(item.list_data[0].created_at) }}</div>
                          <CCollapse :show="Boolean(item.is_show)" :duration="collapseDuration" 
                            :style="{ height: heightItem(item.list_data.length) + 'vh' }" style="overflow: auto;" class="custom_scrollbar pt-2 "
                          >
                            <div v-for="(item_noitfy, index_notify) in item.list_data " :key="index_notify"
                              @click="goToOverview(JSON.parse(item_noitfy.data).finance.stockcode, item_noitfy.id)"
                              class=" item_notify_hover_info_light py-1 px-1 height_item_notify notify_item " 
                              :class="{'item_notify_hover_info_dark': $store.state.darkMode}"
                            >
                              <div class="notify__stock">{{ JSON.parse(item_noitfy.data).finance.stockcode }}</div>
                              <div class="text-muted notify__company" >{{ JSON.parse(item_noitfy.data).finance.company_name }}</div>
                              <div class="notify__read_at">
                                <svg v-if="item_noitfy.read_at == null"  viewBox="0 0 31 31" width="16" height="16" style="position: relative; right: -4">
                                  <circle class="circle" cx="9" cy="9" r="9"/>
                                </svg>
                              </div>
                            </div>
                            
                          </CCollapse>
                        </div>
                      <div>
                    </div>
                    <!-- /. right, title-->
                  </div>
              </CCollapse>
              <!-- /.CCollapse group finance -->
            </div>
            <!-- /. d-flex flex-column -->
        </template>
        <template v-else>
            <div style="width: 250px !important" class="p-4"> Hiện không có thông báo nào </div>
        </template>
      </CDropdown>
</template>

<script>
import axios from "axios";
import moment from 'moment'
import 'moment/locale/vi'  // without this line it didn't work
const envJSON = require("../../env.json");

export default {
  name: "TheHeaderDropdownNotify",
  data() {
    return {
      status_dropdown: false,
      list_mack_mark: [],
      textText: '',
      is_show_finance: false,
      collapseDuration: 0,
      list_group_notify_finance: [],
      total_notify_finance: 0,
      list_group_is_new: [],
      total_notify_lates: 0,
      is_show_dropdown: false,
      show_item_group_finance: false,
      sub_quarter_get_time: moment().subtract(1, 'Q').format('[Quý] Q') + moment().subtract(1, 'Q').format('[ năm] Y'),
      current_group_is_show: 0,
    };
  },
  methods: {
    updateFcmToken () {
      let self = this;
      if ("serviceWorker" in navigator) 
      {
        navigator.serviceWorker
          .register(`${process.env.BASE_URL}firebase-messaging-sw.js`, {scope: "firebase-cloud-messaging-push-scope"})
          .then(function(registration) {
                self.$messaging.getToken({vapidKey: envJSON.vapidKey }).then((currentToken) => {
                    if (currentToken) {
                      axios
                        .post(self.$apiAdress + "/api/update-fcm-token", {
                          isApp: false,
                          fcm_token: currentToken,
                          token: localStorage.getItem("api_token"),
                        })
                        .then(function () { console.log('update fcm success'); })
                        .catch( function (error) {console.error(error); });
                    } else {
                        console.error('Không có mã thông báo ID phiên bản nào. Yêu cầu quyền để tạo một.');
                    }
                }).catch((err) => {
                    console.error('Đã xảy ra lỗi khi truy xuất mã thông báo. ', err);
                });
            })
            .catch(function(err) {
              console.error("Đăng ký nhân viên dịch vụ không thành công, lỗi:"  , err );
          }); 
      }

      self.$messaging.onMessage((payload) => {
        let status = JSON.parse(payload.data.body).status 
        if(status == 'off') {
          this.$store.state.maintenance = 'off';
          localStorage.setItem('maintenance', 'off');
        } else if(status == 'on') {
          this.$store.state.maintenance = 'on';
          localStorage.setItem('maintenance', 'on');
        }
      });

    },
    checkStatusMaintenance() {
      axios
        .get(this.$apiAdress + "/api/check-maintenance", { params: { token: localStorage.getItem("api_token") } })
        .then((res) => {
          let resMaintenance = res.data[0].status;
          let localMaintenance = window.localStorage.getItem('maintenance');

          if(resMaintenance == 'on' && localMaintenance != 'on') {
            localStorage.setItem('maintenance', resMaintenance);
            this.$store.state.maintenance = resMaintenance;
          }
          else if (resMaintenance == 'off') {
            if(localMaintenance != '' && localMaintenance !='off') {
              localStorage.setItem('maintenance', resMaintenance);
              this.$store.state.maintenance = resMaintenance;
            }
          }
        })
        .catch(function(error) { console.error(error); });
    },
    
    take3Item(items) {
      let listItem = [];
      for(let i = 0; i < items.length; i ++) {
        if(i==8) {  break; }
        listItem.push( JSON.parse(items[i].data).finance.stockcode )
      }
      if(items.length > 8) { return listItem.join(', ') + ' ...'; }
      return listItem.join(', ');
    },
    
    heightItem(lengthItem) {
      if( lengthItem > 20 ) {
        return 57;
      } else {
        return lengthItem * 3.5;
      }
    },
    
    toggleFinance() {
      this.is_show_finance = !this.is_show_finance;
      this.total_notify_lates = 0;
      this.total_notify_finance = 0;
      this.collapseDuration = 100;

      this.$nextTick(() => {
        this.collapseDuration = 0;
      });

    },
    formatMoment(time) {
      return moment(time).fromNow();
    },
    toggleDetailsGroupFinance(index) {
      this.list_group_notify_finance[index].is_show = !this.list_group_notify_finance[index].is_show;
      if( this.list_group_notify_finance[index].is_show == true) {
        this.current_group_is_show = this.list_group_notify_finance[index].group;
      } else {
        this.current_group_is_show = null;
      }

      for( let i = 0; i < this.list_group_notify_finance.length; i ++ ) { // set all is_show = false, except index
        if( this.list_group_notify_finance[i].index_row != index ) {  this.list_group_notify_finance[i].is_show = false; }
      }
        
      this.collapseDuration = 100;
      this.$nextTick(() => { this.collapseDuration = 0; });
    },

    getNotify() {
      let self = this;
      axios
        .get(self.$apiAdress + "/api/get-notify-finance", { params: { token: localStorage.getItem("api_token") } })
        .then(function(res) {
          
          let listGroupIsNew_0 = res.data.map(function(e) { if( e.is_new == 0 ) { return e.group; } }).filter((value) => value); // lấy id group trong thông báo
          let uniqueIdGroupNew = [...new Set(listGroupIsNew_0)] ; // lấy id group không trùng lặp
          self.list_group_is_new = uniqueIdGroupNew;
          self.total_notify_lates = uniqueIdGroupNew.length;

          let allNameGroup = res.data.map(function(e) { return e.group; }).filter((value) => value); // lấy tên group trong thông báo
          let uniqueNameGroup = [...new Set(allNameGroup)] ; // lấy tên group không trùng lặp

          let groupNotify = [];
          for( let i = 0; i < uniqueNameGroup.length; i ++ ) { // gộp các thông báo theo group
            let listNotifyByGroup = res.data.map(function(e) { if( e.group == uniqueNameGroup[i] ) { return e } }).filter((value) => value);
            groupNotify.push(listNotifyByGroup);
          }

          self.list_group_notify_finance =  groupNotify.map((item_group, index) => { 
            var count_total_is_new = 0;
            for( const item_notify in  item_group ) { // đếm số tin mới trong group
              if ( item_group[item_notify].read_at == null ) { count_total_is_new ++ }
            }
            return { // add index, add is_show
                total_is_new: count_total_is_new, 
                list_data: item_group, 
                index_row: index, 
                group : item_group[0].group,
                is_show: self.current_group_is_show == item_group[0].group ? true : false
              }; 
          });
  
        })
        .catch(function(error) { console.error(error); });
    },

    goToOverview(mack, id) {
      this.is_show_dropdown = false;
      const path = `/phan-tich-doanh-nghiep`;
      if (this.$route.path == path && this.$route.query.mack == mack) { return } 
      else {
        this.userCallBackIsRead(id);
        this.$router.push({path: 'phan-tich-doanh-nghiep', query: {mack: mack} });
      }
    },

    userCallBackIsRead(id) {
      axios
        .get(this.$apiAdress + "/api/user-is-read", { params: {  id_notify: [id], token: localStorage.getItem("api_token") } })
        .then(() => { this.getNotify(); })
        .catch(function(error) { console.error(error); });
    },

    userCallBackIsNew() {
        this.total_notify_lates = 0;
        if( this.list_group_is_new.length > 0 ) {
          axios
            .get(this.$apiAdress + "/api/user-is-new", {
                params: {  group: this.list_group_is_new, token: localStorage.getItem("api_token") },
            })
            .then(function() { this.list_group_is_new.length = 0; this.getNotify(); })
            .catch(function(error) { console.error(error); });
        }
    },
    
    goto_page(link) {
      let self = this;
      self.$router.push({ path: link });
    },
    formatMoney(number, min, max) {
      number = parseFloat(number);
      return number.toLocaleString("en", {
        minimumFractionDigits: min,
        maximumFractionDigits: max,
      });
    },
    readAllNotify(){
      // for (const item of this.data_notify_profit_loss) {
      //   this.list_mack_mark.push(item.title);
      // }
    }
  },
  created() {
    window.addEventListener('storage', () => {
      let currentMaintenance = window.localStorage.getItem('maintenance');
      this.$store.state.maintenance = currentMaintenance;
    });
    // this.updateFcmToken();
    // this.checkStatusMaintenance();
    moment.locale('vi');
    this.getNotify();
    setInterval(() => {
      this.getNotify();
    }, 600000)
  },
  computed: {
    
    option_filter_category() {
      let return_data = [];
      if (Object.keys(this.$store.state.data_category).length > 0) {
        for (let item of this.$store.state.data_category) {
          return_data.push({
            value: item.id,
            label: item.name,
          });
        }
      }
      return return_data;
    },

    data_trading_log() {
      let data_return = [];
      if (
        this.$store.state.data_trading_log.length > 0 &&
        Object.keys(this.$store.state.data_eod).length > 0
      ) {
        let data_trading_temp = [...this.$store.state.data_trading_log];
        let data_trading_temp_filtered = [];
        let data_trading_temp_filtered_item = { ...data_trading_temp[0] };
        for (let item of data_trading_temp) {
          if (data_trading_temp_filtered_item.danh_muc != item.danh_muc) {
            let temp_table_filter_by_time_mack = [];
            let mack_filter_time = data_trading_temp_filtered[0].mack;
            for (let item of data_trading_temp_filtered) {
              if (item.mack != mack_filter_time) {
                let tong_khoi_luong_mua = 0;
                let tong_khoi_luong_ban = 0;
                let tong_gia_tri_dau_tu = 0;
                let tong_khoi_luong = 0;
                let gia_trung_binh = 0;
                for (let item of temp_table_filter_by_time_mack) {
                  if (item.loai_giao_dich == "mua") {
                    tong_khoi_luong_mua += parseFloat(item.khoi_luong);
                    tong_khoi_luong += parseFloat(item.khoi_luong);
                    tong_gia_tri_dau_tu +=
                      item.khoi_luong *
                      item.gia_thuc_hien *
                      (1 + item.phi / 100);
                    gia_trung_binh =
                      tong_khoi_luong != 0
                        ? tong_gia_tri_dau_tu / tong_khoi_luong
                        : 0;
                  }
                  if (item.loai_giao_dich == "ban") {
                    tong_khoi_luong_ban += parseFloat(item.khoi_luong);
                    tong_khoi_luong -= parseFloat(item.khoi_luong);
                    tong_gia_tri_dau_tu = gia_trung_binh * tong_khoi_luong;
                    gia_trung_binh =
                      tong_khoi_luong != 0
                        ? tong_gia_tri_dau_tu / tong_khoi_luong
                        : 0;
                  }
                }
                data_return.push({
                  change: this.$store.state.data_eod[mack_filter_time].change,
                  danh_muc: temp_table_filter_by_time_mack[0].danh_muc,
                  lastprice:
                    this.$store.state.data_eod[mack_filter_time].lastprice,
                  mack: temp_table_filter_by_time_mack[0].mack,
                  perchange:
                    this.$store.state.data_eod[mack_filter_time].perchange,
                  tong_khoi_luong: tong_khoi_luong,
                  tong_gia_tri_dau_tu: tong_gia_tri_dau_tu,
                  tong_khoi_luong_ban: tong_khoi_luong_ban,
                  tong_khoi_luong_mua: tong_khoi_luong_mua,
                  gia_trung_binh: gia_trung_binh,
                });

                mack_filter_time = item.mack;
                temp_table_filter_by_time_mack = [];
              }
              temp_table_filter_by_time_mack.push(item);
            }
            let tong_khoi_luong_mua = 0;
            let tong_khoi_luong_ban = 0;
            let tong_gia_tri_dau_tu = 0;
            let tong_khoi_luong = 0;
            let gia_trung_binh = 0;
            for (let item of temp_table_filter_by_time_mack) {
              if (item.loai_giao_dich == "mua") {
                tong_khoi_luong_mua += parseFloat(item.khoi_luong);
                tong_khoi_luong += parseFloat(item.khoi_luong);
                tong_gia_tri_dau_tu +=
                  item.khoi_luong * item.gia_thuc_hien * (1 + item.phi / 100);
                gia_trung_binh =
                  tong_khoi_luong != 0
                    ? tong_gia_tri_dau_tu / tong_khoi_luong
                    : 0;
              }
              if (item.loai_giao_dich == "ban") {
                tong_khoi_luong_ban += parseFloat(item.khoi_luong);
                tong_khoi_luong -= parseFloat(item.khoi_luong);
                tong_gia_tri_dau_tu = gia_trung_binh * tong_khoi_luong;
                gia_trung_binh =
                  tong_khoi_luong != 0
                    ? tong_gia_tri_dau_tu / tong_khoi_luong
                    : 0;
              }
            }
            data_return.push({
              change: this.$store.state.data_eod[mack_filter_time].change,
              danh_muc: temp_table_filter_by_time_mack[0].danh_muc,
              lastprice: this.$store.state.data_eod[mack_filter_time].lastprice,
              mack: temp_table_filter_by_time_mack[0].mack,
              perchange: this.$store.state.data_eod[mack_filter_time].perchange,
              tong_khoi_luong: tong_khoi_luong,
              tong_gia_tri_dau_tu: tong_gia_tri_dau_tu,
              tong_khoi_luong_ban: tong_khoi_luong_ban,
              tong_khoi_luong_mua: tong_khoi_luong_mua,
              gia_trung_binh: gia_trung_binh,
            });
            data_trading_temp_filtered = [];
          }
          data_trading_temp_filtered_item = item;
          data_trading_temp_filtered.push({
            ...data_trading_temp_filtered_item,
          });
        }
        let temp_table_filter_by_time_mack = [];
        let mack_filter_time = data_trading_temp_filtered[0].mack;
        for (let item of data_trading_temp_filtered) {
          if (item.mack != mack_filter_time) {
            let tong_khoi_luong_mua = 0;
            let tong_khoi_luong_ban = 0;
            let tong_gia_tri_dau_tu = 0;
            let tong_khoi_luong = 0;
            let gia_trung_binh = 0;
            for (let item of temp_table_filter_by_time_mack) {
              if (item.loai_giao_dich == "mua") {
                tong_khoi_luong_mua += parseFloat(item.khoi_luong);
                tong_khoi_luong += parseFloat(item.khoi_luong);
                tong_gia_tri_dau_tu +=
                  item.khoi_luong * item.gia_thuc_hien * (1 + item.phi / 100);
                gia_trung_binh =
                  tong_khoi_luong != 0
                    ? tong_gia_tri_dau_tu / tong_khoi_luong
                    : 0;
              }
              if (item.loai_giao_dich == "ban") {
                tong_khoi_luong_ban += parseFloat(item.khoi_luong);
                tong_khoi_luong -= parseFloat(item.khoi_luong);
                tong_gia_tri_dau_tu = gia_trung_binh * tong_khoi_luong;
                gia_trung_binh =
                  tong_khoi_luong != 0
                    ? tong_gia_tri_dau_tu / tong_khoi_luong
                    : 0;
              }
            }
            data_return.push({
              change: this.$store.state.data_eod[mack_filter_time].change,
              danh_muc: temp_table_filter_by_time_mack[0].danh_muc,
              lastprice: this.$store.state.data_eod[mack_filter_time].lastprice,
              mack: temp_table_filter_by_time_mack[0].mack,
              perchange: this.$store.state.data_eod[mack_filter_time].perchange,
              tong_khoi_luong: tong_khoi_luong,
              tong_gia_tri_dau_tu: tong_gia_tri_dau_tu,
              tong_khoi_luong_ban: tong_khoi_luong_ban,
              tong_khoi_luong_mua: tong_khoi_luong_mua,
              gia_trung_binh: gia_trung_binh,
            });

            mack_filter_time = item.mack;
            temp_table_filter_by_time_mack = [];
          }
          temp_table_filter_by_time_mack.push(item);
        }
        let tong_khoi_luong_mua = 0;
        let tong_khoi_luong_ban = 0;
        let tong_gia_tri_dau_tu = 0;
        let tong_khoi_luong = 0;
        let gia_trung_binh = 0;
        for (let item of temp_table_filter_by_time_mack) {
          if (item.loai_giao_dich == "mua") {
            tong_khoi_luong_mua += parseFloat(item.khoi_luong);
            tong_khoi_luong += parseFloat(item.khoi_luong);
            tong_gia_tri_dau_tu +=
              item.khoi_luong * item.gia_thuc_hien * (1 + item.phi / 100);
            gia_trung_binh =
              tong_khoi_luong != 0 ? tong_gia_tri_dau_tu / tong_khoi_luong : 0;
          }
          if (item.loai_giao_dich == "ban") {
            tong_khoi_luong_ban += parseFloat(item.khoi_luong);
            tong_khoi_luong -= parseFloat(item.khoi_luong);
            tong_gia_tri_dau_tu = gia_trung_binh * tong_khoi_luong;
            gia_trung_binh =
              tong_khoi_luong != 0 ? tong_gia_tri_dau_tu / tong_khoi_luong : 0;
          }
        }
        data_return.push({
          change: this.$store.state.data_eod[mack_filter_time].change,
          danh_muc: temp_table_filter_by_time_mack[0].danh_muc,
          lastprice: this.$store.state.data_eod[mack_filter_time].lastprice,
          mack: temp_table_filter_by_time_mack[0].mack,
          perchange: this.$store.state.data_eod[mack_filter_time].perchange,
          tong_khoi_luong: tong_khoi_luong,
          tong_gia_tri_dau_tu: tong_gia_tri_dau_tu,
          tong_khoi_luong_ban: tong_khoi_luong_ban,
          tong_khoi_luong_mua: tong_khoi_luong_mua,
          gia_trung_binh: gia_trung_binh,
        });
      }
      return data_return;
    },
    itemTradingLog() {
      let ret = [];
      if (
        this.data_trading_log.length > 0 &&
        this.option_filter_category.length > 0
      ) {
        let temp_list_item_trading_log = [...this.data_trading_log];
        let dong_danh_muc = {};
        dong_danh_muc.danh_muc = temp_list_item_trading_log[0].danh_muc;
        let ten_danh_muc = this.option_filter_category.find(
          (x) => x.value == dong_danh_muc.danh_muc
        ).label;
        dong_danh_muc.tieu_de = "Danh mục: " + ten_danh_muc;
        dong_danh_muc.loai_hien_thi = "tieu_de_danh_muc";

        let dong_tong_ket = {};
        dong_tong_ket.tieu_de = "Tổng kết";
        dong_tong_ket.loai_hien_thi = "tieu_de_tong_ket";
        dong_tong_ket.tong_ket_khoi_luong_ton = 0;
        dong_tong_ket.tong_ket_tong_gia_tri_dau_tu = 0;
        dong_tong_ket.tong_ket_tong_gia_tri_hien_tai = 0;
        dong_tong_ket.tong_ket_lai_lo_hom_nay = 0;
        dong_tong_ket.tong_ket_lai_lo_luy_ke_tien = 0;
        dong_tong_ket.tong_ket_lai_lo_luy_ke_phan_tram = 0;
        ret.push({ ...dong_danh_muc });
        for (
          let index = 0;
          index < temp_list_item_trading_log.length;
          index++
        ) {
          const item = temp_list_item_trading_log[index];
          if (item.danh_muc != dong_danh_muc.danh_muc) {
            dong_danh_muc.danh_muc = item.danh_muc;
            ten_danh_muc = this.option_filter_category.find(
              (x) => x.value == dong_danh_muc.danh_muc
            ).label;
            dong_danh_muc.tieu_de = "Danh mục: " + ten_danh_muc;
            if (dong_tong_ket.tong_ket_tong_gia_tri_dau_tu > 0) {
              ret.push({ ...dong_tong_ket });
            } else {
              ret.splice(-1);
            }
            ret.push({ ...dong_danh_muc });
            dong_tong_ket.tong_ket_khoi_luong_ton = 0;
            dong_tong_ket.tong_ket_tong_gia_tri_dau_tu = 0;
            dong_tong_ket.tong_ket_tong_gia_tri_hien_tai = 0;
            dong_tong_ket.tong_ket_lai_lo_hom_nay = 0;
            dong_tong_ket.tong_ket_lai_lo_luy_ke_tien = 0;
            dong_tong_ket.tong_ket_lai_lo_luy_ke_phan_tram = 0;
          }
          const tong_khoi_luong_mua = parseFloat(
            temp_list_item_trading_log[index]["tong_khoi_luong_mua"]
          );
          const tong_khoi_luong_ban = parseFloat(
            temp_list_item_trading_log[index]["tong_khoi_luong_ban"]
          );
          const khoi_luong_ton = parseFloat(
            temp_list_item_trading_log[index]["tong_khoi_luong"]
          );
          let tong_gia_tri_dau_tu = parseFloat(
            temp_list_item_trading_log[index]["tong_gia_tri_dau_tu"]
          );
          let gia_trung_binh = parseFloat(
            temp_list_item_trading_log[index]["gia_trung_binh"]
          );
          const gia_hien_tai = parseFloat(
            temp_list_item_trading_log[index]["lastprice"] / 1000
          );
          const tong_gia_tri_hien_tai = gia_hien_tai * khoi_luong_ton;
          const lai_lo_hom_nay =
            parseFloat(temp_list_item_trading_log[index]["change"]) *
            khoi_luong_ton;
          let lai_lo_luy_ke_tien =
            (gia_hien_tai - gia_trung_binh) * khoi_luong_ton;
          let lai_lo_luy_ke_phan_tram =
            (gia_hien_tai / gia_trung_binh - 1) * 100;
          dong_tong_ket.tong_ket_khoi_luong_ton += khoi_luong_ton;
          dong_tong_ket.tong_ket_tong_gia_tri_dau_tu += tong_gia_tri_dau_tu;
          dong_tong_ket.tong_ket_tong_gia_tri_hien_tai += tong_gia_tri_hien_tai;
          dong_tong_ket.tong_ket_lai_lo_hom_nay += lai_lo_hom_nay;
          dong_tong_ket.tong_ket_lai_lo_luy_ke_tien += lai_lo_luy_ke_tien;
          dong_tong_ket.tong_ket_lai_lo_luy_ke_phan_tram +=
            lai_lo_luy_ke_phan_tram;
          // if (lai_lo_luy_ke_phan_tram < 7) {
          //   this.$toast.warning(
          //     "Mã " +
          //       temp_list_item_trading_log[index]["mack"] +
          //       " đang có tỉ lệ lãi/lỗ là " +
          //       lai_lo_luy_ke_phan_tram.toLocaleString("en", {
          //         minimumFractionDigits: 0,
          //         maximumFractionDigits: 2,
          //       })
          //   );
          // }
          if (khoi_luong_ton > 0) {
            ret.push({
              mack: temp_list_item_trading_log[index]["mack"],
              ten_danh_muc: ten_danh_muc,
              khoi_luong_ton: this.formatMoney(khoi_luong_ton, 0, 0),
              gia_trung_binh: this.formatMoney(gia_trung_binh, 0, 2),
              tong_gia_tri_dau_tu: this.formatMoney(tong_gia_tri_dau_tu, 0, 0),
              gia_hien_tai: this.formatMoney(gia_hien_tai, 2, 2),
              tong_gia_tri_hien_tai: this.formatMoney(
                tong_gia_tri_hien_tai,
                0,
                2
              ),
              lai_lo_hom_nay: lai_lo_hom_nay,
              change: temp_list_item_trading_log[index]["change"],
              perchange: temp_list_item_trading_log[index]["perchange"],
              lai_lo_luy_ke_tien: lai_lo_luy_ke_tien,
              lai_lo_luy_ke_phan_tram: lai_lo_luy_ke_phan_tram,
              loai_hien_thi: "giao_dich",
          })
          }
        }
        if (dong_tong_ket.tong_ket_khoi_luong_ton > 0) {
          ret.push({ ...dong_tong_ket });
        } else {
          ret.splice(-1);
        }
      }
      return ret;
    },
    data_notify_profit_loss() {
      let data_return = [];
      if(this.itemTradingLog.length > 0){
        for(const item of this.itemTradingLog){
          if(item.loai_hien_thi == "giao_dich"){
            if (item.lai_lo_luy_ke_phan_tram > 7){
              data_return.push({
                title: item["mack"],
                type_notify: "Thông báo lãi/lỗ",
                message: `Mã ${
                  item["mack"]
                } thuộc danh mục ${item.ten_danh_muc} đang có tỉ lệ lãi/lỗ là ${parseFloat(
                  item.lai_lo_luy_ke_phan_tram
                ).toLocaleString("en", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}%`,
                link: "/nhat-ky-giao-dich",
              });
            }
          }
        }
      }
      return data_return;
    },
    count_notify() {
      return this.data_notify_profit_loss.length;
    },  
  },
  watch: {
    data_notify_profit_loss: {
      deep: true,
      handler: function(newVal,oldVal){
        // console.log("old val: ",oldVal);
        // console.log("new val: ",newVal);
      }
    },
    status_dropdown: {
      handler: function(){
        // this.readAllNotify();
      }

    },
    is_show_dropdown: {
      handler: function(){
        this.userCallBackIsNew();
      }
    }
  }
};
</script>
<style scoped>

@media screen and (min-width: 480px ) {
  .width_vw_sm {
    width: 21vw !important;
  }
  .height_item_notify {
    min-height: 32px !important; 
  }
}
@media screen and (max-width: 1024px  ) {
  .width_vw_xl {
    width: 75vw !important;
    font-size: 11px !important;
  }
  .height_item_notify {
    min-height: 20px !important; 
  }
}

.hinh_tron {
  width: 20px;
  height: 20px;
  background-color: #ff0080;
  border-radius: 50%;
  -moz-border-radius:50%;
  -webkit-border-radius: 50%;
}

.custom_scrollbar::-webkit-scrollbar {
  width: 7px;
}
.item_notify_hover_light:hover {
  background-color: #EBEDEF;
  cursor: default;
}
.item_notify_hover_dark:hover {
  background-color: #414344;
  cursor: default;
}

.item_notify_hover_info_light:hover {
  background-color: rgb(215, 219, 224);
  cursor: default;
}
.item_notify_hover_info_dark:hover {
  background-color: rgb(80, 79, 79);
  cursor: default;
}
.circle {
  fill: #2374e1;
  stroke: #2374e1;
  stroke-width: 0em;
}
.c-icon {
  margin-right: 0.3rem;
}
.width-400 {
  width: 400px;
}
.cursor-pointer {
  cursor: pointer;
}
.border-radius-0 {
  border-radius: 0px;
}
.notify_item {
  display: flex;
  border-radius: 5px;
  margin-left: -14px !important;
}
.notify__stock {
  padding-left: 4px;
  text-align: start;
  font-weight: 400;
  max-width: 40px;
  min-width: 40px;
}
.notify__company {
  flex-grow: 1;
}
.notify__read_at {
  text-align: end;
  max-width: 25px;
  min-width: 25px;
}
</style>
