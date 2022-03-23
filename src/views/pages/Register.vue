<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0 body-register">
            <CCardBody class="p-4 " >
             
              <CForm @submit.prevent="register" method="POST">
                 <div class="p-avatar">
                   <a href="/">
                                <img
                                src="/img/Logo3.png"
                                class="p-avatar-img"
                                />
                      </a>
                </div> 
                <h1 class="register-header">Đăng ký tài khoản</h1>              
                <CInput
                  placeholder="Họ tên"
                  prependHtml="<i class='cui-user'></i>"
                  autocomplete="username"
                  class="modifi-input"
                  v-model="name"
                >
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CAlert
                    color="danger"
                    closeButton
                    :show.sync="showMessageName"
                >
                  {{messageName}}
                </CAlert>
                <CInput
                  placeholder="Email"
                  prepend="@"
                  autocomplete="email"
                  v-model="email"
                  class="modifi-input"
                />
                <CAlert
                    color="danger"
                    closeButton
                    :show.sync="showMessageEmail"
                >
                  {{messageEmail}}
                </CAlert>
                <CInput
                  placeholder="Điện thoại"
                  prepend="@"
                  autocomplete="phone"
                  v-model="phone"
                  class="modifi-input"
                >
                  <template #prepend-content><CIcon name="cil-calculator"/></template>
                </CInput>
                <CAlert
                    color="danger"
                    closeButton
                    :show.sync="showMessagePhone"
                >
                  {{messagePhone}}
                </CAlert>
                <CInput
                  placeholder="Địa chỉ"
                  prependHtml="<i class='cui-location-pin'></i>"
                  autocomplete="address"
                  v-model="address"
                  class="modifi-input"
                >
                  <template #prepend-content><CIcon name="cil-location-pin"/></template>
                </CInput>
                <CAlert
                    color="danger"
                    closeButton
                    :show.sync="showMessageAddress"
                >
                  {{messageAddress}}
                </CAlert>
                <CInput
                  placeholder="Mật khẩu"
                  type="password"
                  prependHtml="<i class='cui-lock-locked'></i>"
                  autocomplete="new-password"
                  v-model="password"
                  class="modifi-input"
                >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <CAlert
                    color="danger"
                    closeButton
                    :show.sync="showMessagePassword"
                >
                  {{messagePassword}}
                </CAlert>
                <CInput
                  placeholder="Nhập lại mật khẩu"
                  type="password"
                  prependHtml="<i class='cui-lock-locked'></i>"
                  autocomplete="new-password"
                  class="mb-4 modifi-input"
                  v-model="password_confirmation"
                >                
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <CAlert
                    color="danger"
                    closeButton
                    :show.sync="showMessagePasswordCf"
                >
                  {{messagePasswordCf}}
                </CAlert>


                <div>
                 <CRow class="bt-f-register">
                    <CCol sm="12" md="6" lg="6"> 
                      <CSelect
                        prepend="Gói thuê bao"
                        :value.sync="service_plan"
                        :options="service_plans"
                        class="modifi-input"
                      />
                    </CCol>
                    <CCol sm="12" md="6" lg="6" class="text-right"
                      @mouseover = displayReferenceValue()
                     >
                    <CInput
                      placeholder="Nhập mã giới thiệu"
                      autocomplete="reference_code"
                      prepend="Mã giới thiệu"
                      type="text"
                      class="mb-4 modifi-input"
                      v-model="reference_code"
                    >             
                    </CInput>
                    </CCol> 
                                                   
                </CRow>
                 <CAlert
                        color="danger"
                        closeButton
                        :show.sync="showMessageRefCode"
                    >
                      {{messageRefCode}}
                </CAlert>
                </div>
                <p class="alertReferenceValue"
                >
                  Tặng thêm 1 tháng sử dụng cho người giới thiệu và người được giới thiệu khi đăng ký gói 1 năm và 2 tháng cho gói 2 năm 
                </p>
                <!-- <CAlert class="alertReferenceValue"
                :show.sync="showReferenceValue"
                >
                  Tặng thêm 1 tháng sử dụng cho người giới thiệu và người được giới thiệu khi đăng ký gói 1 năm và 2 tháng cho gói 2 năm 
                </CAlert> -->
                <CRow class="bt-f-register">
                  <CCol sm="12" md="6" lg="6"> 
                      <CSelect prepend="Thời gian" @change="changePrice($event)" :value.sync="period" :options="option_period" class="modifi-input"></CSelect>            
                      <template #prepend-content><CIcon name="cil-clock"/></template>
                      <CAlert
                          color="danger"
                          closeButton
                          :show.sync="showMessage"
                      >
                        {{message}}
                      </CAlert>
                  </CCol>
                  <CCol sm="12" md="6" lg="6" class="text-right">
                      <CInput
                        placeholder="Giá "
                        prepend="Giá"
                        autocomplete="price"
                        class="modifi-input"
                        v-model="price"
                        readonly
                      />
                  </CCol>                                
              </CRow>
              <CAlert
                  color="success"
                  closeButton
                  :show.sync="showMessageSuccess"
              >
                {{messageSuccess}}
              </CAlert>
                <CRow class="bt-f-register">
                    <CCol col="6">
                          <CButton type="submit" color="success" class="sm-register"  block>Gửi đăng ký</CButton>
                    </CCol>
                    <CCol col="4" class="text-right">
                        <CButton color="link" href="/login" class="px-0 link-login">Đã có tài khoản</CButton>
                    </CCol>                                
                </CRow>
              
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

  <script>
    import axios from 'axios'
    export default {
      data() {
        return {
          option_period : [{value:1 , label:"1 năm" }, {value:2, label:"2 năm"}],
          name: '',
          email: '',
          phone: '',
          price: '6.800.000 VNĐ',
          address: '',
          password: '',
          password_confirmation: '',
          reference_code: '',
          service_plan: null,
          showMessage: false,
          showMessageName: false,
          showMessagePhone: false,
          showMessageAddress: false,
          showMessageEmail: false,
          showMessagePassword: false,
          showMessagePasswordCf: false,
          showMessageSuccess: false,
          showMessageRefCode: false,
          messageName: '',
          messagePhone: '',
          messageAddress: '',
          messageEmail: '',
          messagePassword: '',
          messagePasswordCf: '',
          messageSuccess: '',
          message: '',
          messageRefCode: '',
          service_plans: [],
          success_message: null,
          period: 1,
          showPreferential: '',
          showReferenceValue: false,
        }
      },
      created () {
      },      
      methods: {
        register() {
          var self = this;
          axios.post(  this.$apiAdress + '/api/register', {
            name: self.name,
            email: self.email,
            phone: self.phone,
            address: self.address,
            password: self.password,
            password_confirmation: self.password_confirmation,
            service_plan: self.service_plan,
            period: self.period,
            reference_code: self.reference_code
          }).then(function (response) {
            self.showMessageSuccess = true;
            self.messageSuccess = 'Cảm ơn bạn đã đăng ký thành công. Vui lòng vào email để kích hoạt tài khoản.';
            setTimeout(function () {
                  self.showMessageSuccess = false;
              }, 3000);
          })
          .catch(function (error) {
            self.showMessage = true;
             if(error.response){
              if(error.response.data.errors.reference_code){
                  self.showMessageRefCode = true;
                  self.messageRefCode = "Mã giới thiệu không tồn tại ! Vui lòng thử lại";
                  self.message = 'Đăng ký thất bại.';
              }  
              if( error.response.data.errors.phone ){
                  self.showMessagePhone = true;
                  self.messagePhone = error.response.data.errors.phone[0];
                  self.message = 'Đăng ký thất bại.';
              }
              if( error.response.data.errors.name ){
                  self.showMessageName = true;
                  self.messageName = error.response.data.errors.name[0];
                  self.message = 'Đăng ký thất bại.';
              }
              if( error.response.data.errors.email ){
                  self.showMessageEmail = true;
                  self.messageEmail = error.response.data.errors.email[0];
                  self.message = 'Đăng ký thất bại.';
              }
              if( error.response.data.errors.password ){
                  self.showMessagePassword = true;
                  self.messagePassword = error.response.data.errors.password[0];
                  self.message = 'Đăng ký thất bại.';
              }
              if( error.response.data.errors.password_confirmation ){
                  self.showMessagePasswordCf = true;
                  self.messagePasswordCf = error.response.data.errors.password_confirmation[0];
                  self.message = 'Đăng ký thất bại.';
              }
              if( error.response.data.errors.address ){
                self.showMessageAddress = true;
                  self.messageAddress = error.response.data.errors.address[0];
                  self.message = 'Đăng ký thất bại.';
              }
            }else {
                 self.message = 'Đăng ký thất bại.';
            }
           
            setTimeout(function () {
                  self.showMessage = false;
              }, 3000);
            setTimeout(function () {
                  self.showMessagePhone = false;
                  self.showMessageAddress = false;
                  self.showMessagePasswordCf = false;
                  self.showMessagePassword = false;
                  self.showMessageEmail = false;
                  self.showMessageName = false;
                  self.showMessageRefCode = false;
              }, 10000);
          });
  
        },
        changePrice(event){
          let self = this;
          if(event.target.value == 1){
            self.price = '6.800.000 VNĐ'
          } else {
            self.price = '10.800.000 VNĐ'
          }
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
        hoverPreferential(){
          this.showPreferential = true;
        },
        displayReferenceValue(){
          this.showReferenceValue = true; 
        },
      },
      mounted(){
        this.getServicePlans();
        if(this.$store.state.time_plan > 0){
          this.period = this.$store.state.time_plan;
          if(this.period == 2){
            this.price = '10.800.000 VNĐ'
          }
        }
   
      }
    }
  
  </script>
  <style lang="scss" scope>
    body{
    -webkit-font-smoothing: antialiased;
    background-image: url(/img/Background-lg-rg.png);
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  
  box-shadow: 0px 8px 27px 0px rgba(0, 0, 0, 0.46);
    }
    .register-header{
      text-align: center;
       margin-bottom: 20px;
    }
    .p-avatar-img{
        width: 100%;
        max-width: 500px;
        height: auto;
    }
    .p-avatar{
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
    }
    .body-register{
      background-color: transparent;
      border: none;
      color:white;
    }
    .modifi-input input{
      background-color: rgba(255, 255, 255, 0.323);
      border:none;
      color: white;
    }
    .modifi-input select{
      background-color: rgba(255, 255, 255, 0.323);
      border:none;
      color: white;
    }
    .modifi-input input:read-only {
      background-color: rgba(255, 255, 255, 0.323);
    }
     .modifi-input span{
      background-color: rgba(255, 255, 255, 0.323);
      border:none;
      color: white;
    }
    .modifi-input input::placeholder{
      color: white;
    }
    .bt-f-register{
      color: white;
    }
    .sm-register{
      color: white;
      background-color: transparent;
      border: 2px solid white;
      font-weight: bold;
    }
    .link-login{
      color: white;
      font-weight: bold;
      text-decoration: underline;
    }
    .modifi-input .input-group-text
    {
      border-right: 1px white;
    }
    .alertReferenceValue{
      border-radius: 5px;
      background-color: rgba(255, 255, 255, 0.323);
      padding-bottom: 7px;
      padding-left: 14px;
      padding-right: 14px;
      padding-top: 7px;
      margin-bottom: 24px;
    }
</style>
