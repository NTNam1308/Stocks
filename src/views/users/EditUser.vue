<template>
  <CRow>
     <CCol col="12" lg="2">
     </CCol>
    <CCol col="12" lg="8">
      <CCard no-header>
        <CCardHeader>
          <CForm>
           
            <CAlert
              :show.sync="dismissCountDown"
              color="primary"
              fade
            >
              ({{dismissCountDown}}) {{ message }}
            </CAlert>
            <CRow >
               <CCol col="12">
                <h4>Thông Tin Cơ Bản</h4>
                  <CRow class="info-user-base">
                      <CCol col="12" lg="6">
                            <CInput type="text" readonly label="Tên đăng nhập" placeholder="Tên đăng nhập" v-model="name"></CInput>
                      </CCol>
                      <CCol col="12" lg="6">
                        <CInput type="text" readonly label="Email" placeholder="Email" v-model="email"></CInput>
                      </CCol>        
                  </CRow>
                  <CRow class="info-user-base">
                      <CCol col="12" lg="6">
                        <CInput type="text"  label="Điện thoại" placeholder="Điện thoại" v-model="phone"></CInput>
                        <CAlert
                              color="danger"
                              closeButton
                              :show.sync="showMessagePhone"
                          >
                            {{messagePhone}}
                          </CAlert>
                      </CCol>
                      <CCol col="12" lg="6">  
                        <CInput type="text"  label="Địa chỉ" placeholder="Địa chỉ" v-model="address"></CInput>
                        <CAlert
                              color="danger"
                              closeButton
                              :show.sync="showMessageAddress"
                          >
                            {{messageAddress}}
                          </CAlert>
                      </CCol>        
                  </CRow>
                </CCol>
            </CRow>
            <CRow >
               <CCol col="12">
                  <h4>Thông Tin Dịch Vụ</h4>
                  <CRow class="info-user-base">
                      <CCol col="12" lg="6">
                          <CSelect
                          label="Gói cước"
                          :value.sync="plan"
                          :options="service_plans"
                          class="modifi-input"
                        />
                      </CCol>
                      <CCol col="12" lg="6">
                            <CSelect label="Thời gian"  :value.sync="period" @change="changeMonth($event)" :options='option_period' class="modifi-input"></CSelect>  
                      </CCol>        
                  </CRow>
                  <CRow class="info-user-base">
                      <CCol col="12" lg="6">
                       <CSelect  label="Trạng thái" placeholder="Trạng thái" :value.sync="status" :options="['New','Active','Pending','Inactive','Banned']"></CSelect>
                      </CCol>
                      <CCol col="12" lg="6">
                              <CInput
                                label="Ngày kích hoạt"
                                type="date"
                                v-model="activate_date"
                              />
                      </CCol>        
                  </CRow>
                  <CRow class="info-user-base">
                    <CCol col="12" lg="6">
                      <CSelect
                        label="Kungfu Clan"
                        :value.sync="clan"
                        :options="clans"
                        class="modifi-input"
                      />
                    </CCol> 
                    <CCol col="12" lg="6">
                      <CInput 
                        label="Ngày hết hạn"
                        type="date"
                        v-model="expiry_date"
                      />
                   </CCol> 
                  </CRow>
                </CCol>
            </CRow>
             <CRow >
               <CCol col="12">
                  <h4>Thông Tin Khuyến Mãi</h4>
                   <CRow class="info-user-base">
                      <CCol col="12">
                      <CRow >
                        <CCol>
                          <input type="checkbox" value="2" v-model="promotionStudent" @change="checkStudent($event)"> Học Viên
                        </CCol>
                      </CRow>
                      <CRow >
                        <CCol>
                          <input type="checkbox" v-model="promotionShow" @change="check($event)"> Khuyến Mãi
                          <CInput v-if="promotionShow" type="number" @change="changeMonthPromotion()" label="Số tháng khuyến mãi" placeholder="Số tháng khuyến mãi" v-model="promotion_months"></CInput>
                          <CAlert
                              color="danger"
                              closeButton
                              :show.sync="showMessagePromotionMonths"
                          >
                            {{messagePromotionMonths}}
                          </CAlert>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol>
                          <CInput  type="number"  readonly label="Số tháng thưởng giới thiệu" placeholder="0" v-model="reference_promotion_months"></CInput>
                        </CCol>
                      </CRow>
                    </CCol>
                 </CRow>
               </CCol>
              </CRow>
            <CRow v-if="isAdmin">
              <CCol col="12">
                  <h4>Thông Tin Thêm </h4>
              <CRow class="info-user-base">
                  <CCol col="12">
                  
                     <CRow >
                      <CCol>
                        <input type="checkbox" value="2" v-model="promotionLimited" @change="checkLimited($event)"> Không giới hạn phiên đăng nhập
                      </CCol>
                    </CRow>
                    <CRow >
                      <CCol>
                        <input type="checkbox" value="2" v-model="promotionForever" @change="checkForever($event)"> Vĩnh Viễn
                      </CCol>
                    </CRow>
                    <CRow >
                      <CCol>
                          <CSelect  label="Loại User" placeholder="Loại User" :value.sync="type" :options="typies"></CSelect>
                      </CCol>
                    </CRow>
                    
                  </CCol>
              </CRow>
              </CCol>
            </CRow>
            <CRow >
              <CCol col="12">
                <h4>Ghi Chú </h4>
                <CRow class="info-user-base">
                  <CCol col="12">
                    <CInput type="text"  placeholder="Ghi Chú" v-model="note"></CInput>
                  </CCol>
              </CRow>
             </CCol>
            </CRow>
            <CRow v-if="isAdmin || isModerator">
              <CCol col="12">
                <h4>Quyền</h4>
                <CRow class="info-user-base">
                  <CCol col="12">
                    <CSelect label="Quyền"  :value.sync="role" :options='roles' class="modifi-input"></CSelect>
                  </CCol>
              </CRow>
             </CCol>
            </CRow>
            <CRow class="btn-edit-ad">

              <CCol  lg="4"/>
              <CCol col="6" xs="6" sm="6" md="6" lg="2" class="btn-edit-center">
                <CButton color="primary" @click="goBack">Trở Lại</CButton>
              </CCol>
              <CCol col="6" xs="6" sm="6" md="6" lg="2" class="btn-edit-center">
                <CButton color="primary" id="saveEditUser" @click="update()"
                  :disabled="save_update"
                >
                <span 
                  class="btn_cons"
                  :class="{ 'spinner-border':save_update, 'spinner-border-sm':save_update }"  role="status" aria-hidden="true">
                </span>
                  Lưu Lại
                </CButton>
              </CCol>
              <CCol  lg="4"/>
    
            </CRow>
            <CRow>
              <CCol col="12">
                  <CAlert
                      color="success"
                      closeButton
                      :show.sync="showMessage"
                  >
                    {{message}}
                  </CAlert>
                  <CAlert
                      color="danger"
                      closeButton
                      :show.sync="showMessageError"
                  >
                    {{messageError}}
                  </CAlert>
                  </CCol>
            </CRow>
          </CForm>
        </CCardHeader>
      </CCard>
    </CCol>
    <CCol col="12" lg="2">
     </CCol>
  </CRow>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import ChangeAvatar from "@/views/users/ChangeAvatar.vue";
import { number } from 'echarts/core';
export default {
  name: 'EditUser',
  components: {
    ChangeAvatar,
  },
  props: {
    caption: {
      type: String,
      default: 'User id'
    },
  },
  data: () => {
    return {
        isAdmin: false,
        isModerator: false,
        limited: 1,
        forever: 1,
        student: 1,
        option_period : [{value:1 , label:"1 năm" }, {value:2, label:"2 năm"}, {value:5, label:"5 năm"}],
        clans: [{value:0 , label:"No Clan" }, {value:1, label:"Kungfu Clan"}],
        typies: [{value:0 , label:"Thường" }, {value:1, label:"Nội Bộ"}, {value:2, label:"Ngoại Giao"}, {value:3, label:"Test"}],
        role: 'user',
        roles: [
          {value: 'user', label: 'Thành viên thường'},
          {value: 'user,coworker', label: 'Coworker'}
        ],
        promotion_months: '',
        promotion_months_tmp: '',
        promotion_months_original: '',
        times :new Date(),
        timesExpiry : new Date(),
        timesNow : new Date(),
        note:'',
        clan: 0,
        type: 0,
        name: '',
        email: '',
        phone: '',
        address: '',
        status: '',
        plan: 1,
        expiry_date: "",
        activate_date: "",
        activate_date_tmp: "",
        period:"",
        period_tmp:"",
        promotionShow: false,
        promotionStudent: false,
        promotionLimited: false,
        promotionForever: false,
        showMessage: false,
        promotion: false,
        showMessagePhone: false,
        showMessageAddress: false,
        showMessageError: false,
        showMessagePromotionMonths: false,
        message: '',
        messagePromotionMonths: '',
        messageError: '',
        messagePhone: '',
        messageAddress: '',
        service_plans: [],
        dismissSecs: 7,
        dismissCountDown: 0,
        showDismissibleAlert: false,
        url: localStorage.getItem("avatar"),
        avatar_url: localStorage.getItem("avatar"),
        save_update: false,
        reference_promotion_months: '',
    }
  },
  watch: {
    avatar_url: function () {
      this.url = this.avatar_url;
    },
  },
  computed: {
    avatar: {
      get: function () {
        return localStorage.getItem("avatar");
      },
      set: function (value) {
        return localStorage.getItem("avatar");
      }
    },
  },
  methods: {
    checkStudent(event){
      let self = this;
      self.promotionShow = true;
      var studentDiscount = 0;
      if(self.promotionStudent){
        self.student = 2;
        self.expiry_date = moment(this.expiry_date).add(Number(studentDiscount), 'months').format('YYYY-MM-DD');
      } else {
        self.student = 1;
        self.expiry_date = moment(this.expiry_date).subtract(Number(studentDiscount), 'months').format('YYYY-MM-DD');
      }
     
    },
    checkLimited(event){
      let self = this;
      if(self.promotionLimited){
          self.limited = 2;
        } else {
          self.limited = 1;
        }
      
    },
    checkForever(event){
      let self = this;
      if(self.promotionForever){
          self.forever = 2;
        } else {
          self.forever = 1;
        }
    },

    changeMonth(event){
        this.period = event.target.value;
    },

  changeMonthPromotion(){
        if(this.promotion_months_tmp == null){
          this.expiry_date = moment(this.expiry_date).add(Number(this.promotion_months), 'months').format('YYYY-MM-DD');
          this.promotion_months_tmp = this.promotion_months;
        }else{
          this.expiry_date = moment(this.expiry_date).add(Number(-1*this.promotion_months_tmp) + Number(this.promotion_months), 'months').format('YYYY-MM-DD'); 
          this.promotion_months_tmp = this.promotion_months;
        }
    },
  
    goBack() {
      this.$router.go(-1)
    },

    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },

    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },

    check: function(e) {
      let self = this;
      console.log(self.promotionShow);
      if(self.promotionShow == false){
        self.promotion_months = 0;
        self.changeMonthPromotion()
        self.promotion_months_tmp = self.promotion_months_original;
      }else{
        self.promotion_months = self.promotion_months_tmp;
        self.promotion_months_tmp = 0;
        self.changeMonthPromotion();
        self.promotion_months = self.promotion_months_original;
      }
    },
    
    update() {
        let self = this;
        self.save_update = true;
        axios.post(  this.$apiAdress + '/api/users/' + self.$route.params.id + '?token=' + localStorage.getItem("api_token"),
        {
            _method: 'PUT',
            name: self.name,
            email: self.email,
            phone: self.phone,
            address: self.address,
            expiry_date: self.expiry_date,
            service_plan: self.plan,
            status: self.status,
            period: self.period,
            activate_date: self.activate_date,
            clan: self.clan,
            note: self.note,
            type: self.type,
            promotion_months: self.promotion_months,
            limited: self.limited,
            student: self.student,
            forever: self.forever,
            role: self.role
        })
        .then(function (response) {
            self.save_update = false;
            self.showMessage = true;
            self.message = 'Cập nhật thành công.';
            setTimeout(function () {
                  self.showMessage = false;
              }, 3000);
        }).catch(function (error) {
            self.save_update = false;
            self.showMessageError = true;
            if(error.response){
              if( error.response.data.errors.promotion_months ){
                  self.showMessagePromotionMonths = true;
                  self.messagePromotionMonths = error.response.data.errors.promotion_months[0];
                  self.messageError = 'Cập nhật thất bại.';
              }
              if( error.response.data.errors.phone ){
                  self.showMessagePhone = true;
                  self.messagePhone = error.response.data.errors.phone[0];
                  self.messageError = 'Cập nhật thất bại.';
              }
              if( error.response.data.errors.address ){
                self.showMessageAddress = true;
                  self.messageAddress = error.response.data.errors.address[0];
                  self.messageError = 'Cập nhật thất bại.';
              } 
            }else {
                 self.messageError = 'Cập nhật thất bại.';
            }
           
            setTimeout(function () {
                  self.showMessageError = false;
              }, 3000);
            setTimeout(function () {
                  self.showMessagePhone = false;
                  self.showMessageAddress = false;
              }, 10000);
            
        });
    },
    getServicePlans() {
      let self = this;
      axios.get(  this.$apiAdress + '/api/plans' )
      .then(function (response) {
        self.service_plans = [];
        for (var key in response.data) {
          self.service_plans.push({value: response.data[key].id, label: response.data[key].name});
        } 
        if (self.service_plans.length > 0) {
          self.service_plan = response.data[0].id
        }
      }).catch(function (error) {
        console.log(error);
      });
    },

  },
  mounted: function(){
    let roles = localStorage.getItem("roles");
    if (roles != null) {
        roles = roles.split(',')
        this.isAdmin = roles.indexOf('admin') >= 0 ? true : false;
        this.isModerator = roles.indexOf('moderator') >= 0 ? true : false;

        if (this.isAdmin === true) {
          this.roles = [
            {value: 'user', label: 'Thành viên thường'},
            {value: 'user,coworker', label: 'Coworker'},
            {value: 'user,coworker,moderator', label: 'Moderator'},
            {value: 'user,coworker,moderator,admin', label: 'Admin'}
          ];
        }
    }

    this.getServicePlans();
    let self = this;
     window.addEventListener('keyup', event => {
      if (event.keyCode === 13) { 
        if(self.phone != '' ){
          document.getElementById("saveEditUser").click();
        }
      }
    });
    let user_id = localStorage.getItem("user_id");
    axios.get(  this.$apiAdress + '/api/users/' + self.$route.params.id + '/edit?token=' + localStorage.getItem("api_token"))
    .then(function (response) {
        self.name = response.data.name;
        self.email = response.data.email;
        self.phone = response.data.phone;
        self.address = response.data.address;
        self.status = response.data.status;
        self.period = response.data.period;
        self.period_tmp = response.data.period;
        self.clan = response.data.clan;
        self.promotion_months = response.data.promotion_months;
        self.promotion_months_tmp = response.data.promotion_months;
        self.promotion_months_original = response.data.promotion_months;
        self.note = response.data.note;
        self.type = response.data.type;
        self.role = response.data.roles;
        self.reference_promotion_months = response.data.reference_promotion_months;
        if (response.data.promotion_months > 0){
          self.promotionShow = true;
          self.promotion_months = response.data.promotion_months;
        } else {
          self.promotion_months = 0;
        }
        if(response.data.expiry_date){
          self.expiry_date = moment(response.data.expiry_date).format('YYYY-MM-DD');
        } else {
          self.expiry_date = moment(self.timesExpiry).add(Number(12*self.period), 'months').format('YYYY-MM-DD');
        }
        if(response.data.activate_date){
            self.activate_date_tmp = moment(response.data.activate_date).format('YYYY-MM-DD'); 
            self.activate_date = moment(self.activate_date_tmp).format('YYYY-MM-DD');  
          } else {
            self.activate_date = moment(self.times).format('YYYY-MM-DD');
            self.activate_date_tmp = moment(self.times).format('YYYY-MM-DD');
          }
        self.timesExpiry.setMonth(self.timesExpiry.getMonth()+12*response.data.period + Number(self.promotion_months));
       
        if (response.data.forever == 2){
          self.promotionForever = true;
          self.forever = 2;
        } 
        if (response.data.limited == 2){
          self.promotionLimited = true;
          self.limited = 2;
        } 
        if (response.data.student == 2){
          self.promotionStudent = true;
          self.student = 2;
        } 
        if (response.data.plan){
            self.plan = response.data.plan;
        }
    }).catch(function (error) {
        console.log(error);
        self.$router.push({ path: '/login' });
    });
      this.$root.$on('Profile', () => {
      this.update_avatar();
    });
  },

  watch: {

    activate_date: {
      handler(){
        let activate_date_tmp = String(this.activate_date_tmp);
        let activate_date = String(this.activate_date);
        let other_date = moment(activate_date).diff(activate_date_tmp, 'day', true);
        this.expiry_date = moment(this.expiry_date).add(Number(other_date), 'days').format('YYYY-MM-DD');
        this.activate_date_tmp = this.activate_date;
      }
    },

    period: {
      handler(){
        this.expiry_date = moment(this.expiry_date).add(12*Number(this.period - this.period_tmp), 'months').format('YYYY-MM-DD');
        this.period_tmp = this.period;
      }
    },

  }

  

}


</script>
<style scoped>
.btn-edit-ad{
  margin-bottom: 15px;
}
.p-avatar{
  margin-bottom:20px;
}
.p-avatar-img{
  width: 120px;
  height: auto;
  border-radius: 10px;
}
.btn-edit-center{
  text-align: center;
}
.info-user-base {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
