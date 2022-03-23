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
            <CSelect
                  disabled
                  label="Gói cước"
                  :value.sync="plan"
                  :options="service_plans"
                   class="modifi-input"
                />
            <CSelect disabled label="Thời gian"  :value.sync="period"  :options='option_period' class="modifi-input"></CSelect>
            <CInput readonly="true" type="number"  label="Số tháng khuyến mãi" placeholder="Số tháng khuyến mãi" v-model="promotion_months"></CInput>
            <CInput readonly="true" type="number"  label="Số tháng thưởng giới thiệu" placeholder="0" v-model="reference_promotion_months"></CInput>
            <CInput disabled
                label="Ngày kích hoạt"
                type="date"
                v-model="activate_date"
              />
            <CInput
              disabled
                label="Ngày hết hạn"
                type="date"
                v-model="expiry_date"
              />
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
export default {
  name: 'Plan',
  components: {
  },
  props: {
    caption: {
      type: String,
      default: 'User id'
    },
  },
  data: () => {
    return {
       option_period : [{value:1 , label:"1 năm" }, {value:2, label:"2 năm"}, {value:5, label:"5 năm"}],
        period: 1,
        name: '',
        email: '',
        phone: '',
        address: '',
        status: '',
        plan: 1,
        expiry_date: "",
        activate_date: "",
        showMessage: false,
        message: '',
        dismissSecs: 7,
        dismissCountDown: 0,
        showDismissibleAlert: false,
        promotion_months: '',
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
    goBack() {
      this.$router.go(-1)
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
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
        }
  },
  mounted: function(){
    this.getServicePlans();
    let self = this;
    let user_id = localStorage.getItem("user_id");
    axios.get(  this.$apiAdress + '/api/users/' + user_id + '/edit?token=' + localStorage.getItem("api_token"))
    .then(function (response) {
      var date_expiry = new Date(response.data.expiry_date);
      var date_active = new Date(response.data.activate_date);
        self.name = response.data.name;
        self.email = response.data.email;
        self.phone = response.data.phone;
        self.address = response.data.address;
        self.status = response.data.status;
        self.period = response.data.period;
        self.promotion_months = response.data.promotion_months;
        self.reference_promotion_months = response.data.reference_promotion_months;
        self.activate_date = moment(date_active).format('YYYY-MM-DD');
         self.expiry_date = moment(date_expiry).format('YYYY-MM-DD');
         if (response.data.plan){
            self.plan = response.data.plan;
        }
    }).catch(function (error) {
        console.log(error);
        self.$router.push({ path: '/login' });
    });
  }
}


</script>
<style scoped>
.btn-edit-center{
  text-align: center;
}
</style>
