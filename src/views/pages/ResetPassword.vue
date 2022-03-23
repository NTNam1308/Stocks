<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="4">
          <CCard class="mx-4 mb-0 body-register">
            <CCardBody class="p-4 " >
             
              <CForm @submit.prevent="reset" method="POST">
                 <div class="p-avatar">
                                <img
                                src="/img/Logo3.png"
                                class="p-avatar-img"
                                />
                            </div>
                <h1 class="register-header">Đổi mật khẩu mới</h1>              
                <CInput
                placeholder="Mật khẩu mới"
                type="password"
                v-model="new_password"
              >
                <template #prepend-content><CIcon name="cil-shield-alt"/></template>
              </CInput>
              <CInput
                placeholder="Nhập lại mật khẩu mới"
                type="password"
                v-model="new_password_second"
              >
                <template #prepend-content><CIcon name="cil-shield-alt"/></template>
              </CInput>
                <CAlert
                  color="danger"
                  closeButton
                  :show.sync="showMessage"
              >
                {{message}}
              </CAlert>
              <CAlert
                  color="success"
                  closeButton
                  :show.sync="showMessageSuccess"
              >
                {{messageSuccess}}
              </CAlert>
                <CRow class="bt-f-register">
                    <CCol col="5">
                          <CButton type="submit" color="success" class="sm-register"  block>Đổi mật khẩu</CButton>
                    </CCol>     
                    <CCol col="7" class="text-right">
                        <CButton color="link" href="/login" class="sm-register" block>Về trang đăng nhập</CButton>
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
          new_password: '',
          new_password_second: '',
          message: '',
          messageSuccess: '',
          showMessage: false,
          showMessageSuccess: false,
        }
      },    
      methods: {
        reset() {
          var self = this;
          if (this.new_password == '' || this.new_password_second == '') {
            this.showMessage = true;
            this.message = "Vui lòng nhập mật khẩu.";
            return;
          }
          if (this.new_password !== this.new_password_second) {
            this.showMessage = true;
            this.message = "Mật khẩu và mật khẩu nhắc lại không giống nhau";
            return;
          }
          axios.post(  this.$apiAdress + '/api/password/reset', {
            email: this.$route.query.email,
            password: self.new_password,
            token: this.$route.query.token
          }).then(function (response) {
            self.showMessageSuccess = true;
            self.messageSuccess = 'Đặt lại mật khẩu mới thành công.';
            setTimeout(function () {
                  self.showMessageSuccess = false;
            }, 10000);
          })
          .catch(function (error) {
            self.showMessage = true;

            if (error.response.data.errors) {
              if (error.response.data.errors.password) {
                self.message = error.response.data.errors.password[0];
              }
            } else if (error.response.data.message) {
              self.message = error.response.data.message;
            }
            if (self.message == '') {
              self.message = 'Yêu cầu không hợp lệ hoặc đã quá thời hạn.';
            }
          });
        },
      },
      mounted(){}
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
</style>
