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
   
              <div class="p-avatar">
                <img
                  :src="avatar"
                  class="p-avatar-img"
                />
              </div>
    
            <CInput type="text" readonly="true" label="Tên đăng nhập" placeholder="Tên đăng nhập" v-model="name"></CInput>
            <CInput type="text" readonly="true" label="Email" placeholder="Email" v-model="email"></CInput>
            <CInput type="text" readonly="true" label="Điện thoại" placeholder="Điện thoại" v-model="phone"></CInput>
            <CInput type="text" readonly="true" label="Địa chỉ" placeholder="Địa chỉ" v-model="address"></CInput>
            <CSelect disabled label="Trạng thái" placeholder="Trạng thái" :value.sync="status" :options="['New','Active','Pending','Inactive','Banned']"></CSelect>
            <CSelect
                  disabled
                  label="Gói cước"
                  :value.sync="plan"
                  :options="service_plans"
                   class="modifi-input"
                />
             <CSelect label="Thời gian"  :value.sync="period" @change="changeMonth($event)" :options='option_period' class="modifi-input"></CSelect>
                           <CSelect
                  disabled
                  label="Kungfu Clan"
                  :value.sync="clan"
                  :options="clans"
                   class="modifi-input"
                />
            <CRow>
              <CCol sm="6" >
                <CInput readonly="true" type="number"  label="Số tháng khuyến mãi" placeholder="Số tháng khuyến mãi" v-model="promotion_months"></CInput>
              </CCol>
              <CCol sm="6">
                <CInput readonly="true" type="number"  label="Số tháng thưởng giới thiệu"  v-model="reference_promotion_months"></CInput>
              </CCol>
            </CRow> 
            <CInput type="date" label="Ngày kích hoạt" readonly="true" placeholder="Ngày kích hoạt" v-model="activate_date"></CInput>
            <CInput type="date" label="Ngày hết hạn" readonly="true" placeholder="Ngày hết hạn" v-model="expiry_date"></CInput>
            <CInput type="text" label="Ghi Chú" readonly="true" placeholder="Ghi Chú" v-model="note"></CInput>
            <CRow>

              <CCol col="12" class="btn-edit-center">
                <CButton color="primary" @click="goBack">Trở Lại</CButton>
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
export default {
  name: 'Profile',
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
        clans: [{value:0 , label:"No Clan" }, {value:1, label:"Kungfu Clan"}],
        option_period : [{value:1 , label:"1 năm" }, {value:2, label:"2 năm"}, {value:5, label:"5 năm"}],
        name: '',
        period: 1,
        activate_date:'',
        email: '',
        phone: '',
        address: '',
        note: '',
        status: '',
        plan: 1,
        expiry_date: '',
        reference_promotion_months: '0',
        showMessage: false,
        message: '',
        dismissSecs: 7,
        dismissCountDown: 0,
        showDismissibleAlert: false,
        avatar: '',
        clan:'',
        promotion_months:'',
        service_plans: [],
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
    goBack() {
      this.$router.go(-1)
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
  },
  mounted: function(){
    let self = this;
    // let user_id = localStorage.getItem("user_id");
    this.getServicePlans();
    axios.get(  this.$apiAdress + '/api/users/' + self.$route.params.id + '/edit?token=' + localStorage.getItem("api_token"))
    .then(function (response) {
        var date_expiry = new Date(response.data.expiry_date);
        var date_active = new Date(response.data.activate_date);
        self.expiry_date = moment(date_expiry).format('YYYY-MM-DD');
        self.activate_date = moment(date_active).format('YYYY-MM-DD');
        self.avatar = response.data.avatar;
        self.name = response.data.name;
        self.email = response.data.email;
        self.phone = response.data.phone;
        self.address = response.data.address;
        self.status = response.data.status;
        self.clan = response.data.clan;
        self.note = response.data.note;
        self.period = response.data.period;
        self.promotion_months = response.data.promotion_months;
        self.reference_promotion_months = response.data.reference_promotion_months;
        if (response.data.plan){
            self.plan = response.data.plan;
        }
    }).catch(function (error) {
        console.log(error);
        self.$router.push({ path: '/login' });
    });
      this.$root.$on('Profile', () => {
    });
  }
}


</script>
<style scoped>
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
</style>
