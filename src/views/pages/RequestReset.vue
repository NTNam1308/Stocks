<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="4">
          <CCard class="mx-4 mb-0 body-register">
            <CCardBody class="p-4 " >
             
              <CForm @submit.prevent="requestreset" method="POST">
                 <div class="p-avatar">
                                <img
                                src="/img/Logo3.png"
                                class="p-avatar-img"
                                />
                            </div>
                <h1 class="register-header">Yêu cầu đặt lại mật khẩu</h1>
                <p>Nhập email yêu cầu thay đặt lại mật khẩu</p>        
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
                    <CCol col="6">
                          <CButton type="submit" color="success" class="sm-register"  block>Gửi yêu cầu</CButton>
                    </CCol>     
                    <CCol col="6" class="text-right">
                        <CButton color="link" href="/" class="sm-register" block>Quay lại trang chủ</CButton>
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
          email: '',
          messageEmail: '',
          message: '',
          showMessageEmail: false,
          showMessage: false,
          showMessageSuccess: false,
        }
      },    
      methods: {
        requestreset() {
          var self = this;
          if (this.email == '') {
            this.showMessageEmail = true;
            this.messageEmail = "Vui lòng nhập email";
            return;
          }
          axios.post(  this.$apiAdress + '/api/password/request', {
            email: self.email
          }).then(function (response) {
            self.showMessageSuccess = true;
            self.messageSuccess = 'Yêu cầu đặt lại mật khẩu thành công. Vui lòng kiểm tra email để xác nhận đặt lại mật khẩu';
            setTimeout(function () {
                  self.showMessageSuccess = false;
            }, 10000);
          })
          .catch(function (error) {
            self.showMessage = true;
            self.message = 'Email không tồn tại hoặc lỗi không thể yêu cầu thay đổi mật khẩu.';
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
