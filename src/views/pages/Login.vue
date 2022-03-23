<template>
<CContainer class="d-flex content-center min-vh-100">
    <div  class="body-login">
    <CRow>
        <CCol>
            <CCardGroup>
                <CCard class="p-4 body-login" >
                    <CCardBody>
                          
                            <CForm @submit.prevent="login" method="POST">
                               <div class="p-avatar">
                                   <a href="/">
                                <img
                                src="/img/Logo3.png"
                                class="p-avatar-img"
                                />
                                </a>
                                </div>
                                <h1 class="register-header">Đăng Nhập</h1>
                                <p class="text-notification">Hãy đăng nhập vào tài khoản của bạn</p>
                                <CInput v-model="email" 
                                        prependHtml="<i class='cui-user'></i>" 
                                        placeholder="Username" 
                                        autocomplete="username email" 
                                        class="modifi-input"
                                        type="email">
                                    <template #prepend-content>
                                        <CIcon name="cil-user" /></template>
                                </CInput>
                                <CAlert
                                    color="danger"
                                    closeButton
                                    :show.sync="showMessageEmail"
                                >
                                {{messageEmail}}
                                </CAlert>
                                <CInput v-model="password" prependHtml="<i class='cui-lock-locked'></i>" placeholder="Password" type="password" autocomplete="curent-password" class="modifi-input">
                                    <template #prepend-content>
                                        <CIcon name="cil-lock-locked" /></template>
                                </CInput>
                                <CAlert
                                    color="danger"
                                    closeButton
                                    :show.sync="showMessagePassword"
                                >
                                {{messagePassword}}
                                </CAlert>
                                <CAlert
                                    color="danger"
                                    closeButton
                                    :show.sync="showMessage"
                                >
                                {{message}}
                                </CAlert>
                                <div col="12" class="f-btn-login modifi-input form-group">
                                        <CButton type="submit" color="success" id="btn-login" class="px-3 sm-login">Đăng nhập</CButton>                      
                                </div>
                                <CRow>
                                    <CCol col="5" lg="5" sm="5" xs="5" class="text-left">
                                        <CInputCheckbox label="Duy trì đăng nhập" :checked.sync="persistLogin"/>
                                    </CCol>
                                    <CCol col="4" lg="4" sm="4" xs="4" class="text-left">
                                        <CButton color="link" href="/request-password" class="px-0 link-register">Quên mật khẩu?</CButton>
                                    </CCol>  
                                    
                                    <CCol col="3" lg="3" sm="3" xs="3" class="text-left">
                                        <CButton color="link" href="/register" class="px-0 link-register">Đăng ký</CButton>
                                    </CCol>                           
                                </CRow>
                            </CForm>
                    </CCardBody>
                </CCard>

            </CCardGroup>
        </CCol>
    </CRow>
    </div>
</CContainer>
</template>

<script>
import axios from "axios";

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            persistLogin: false,
            showMessage: false,
            showMessageEmail: false,
            showMessagePassword: false,
            message: '',
            messageEmail: '',
            messagePassword: '',
        }
    },
    beforeCreate: function() {
        document.body.className = 'login';
    },
    methods: {
        goRegister() {
            this.$router.push({
                path: 'register'
            });
        },
        login() {
            let self = this;
            axios.post(this.$apiAdress + '/api/login', {
                    email: self.email,
                    password: self.password,
                    persist_login: self.persistLogin,
                }).then(function (response) {
                    self.email = '';
                    self.password = '';
                    localStorage.setItem("api_token", response.data.access_token);
                    localStorage.setItem('roles', response.data.roles);
                    localStorage.setItem('user_name', response.data.user_name);
                    localStorage.setItem('user_id', response.data.user_id);
                    localStorage.setItem('clan', 2);
                    if (response.data.avatar && response.data.avatar != 'null' && response.data.avatar != ' '){
                        localStorage.setItem('avatar', response.data.avatar);
                    } else {
                        localStorage.setItem('avatar', "img/avatars/avatar_default.png");
                    }                    
                    localStorage.setItem('expires_in', Math.floor((new Date()).getTime() / 1000) + response.data.expires_in);
                    self.$router.push({
                        path: 'dashboard'
                    });
                    self.$store.state.is_show_alert_logout = true;
                })
                .catch(function (error) {
                    if(error.response){
                        if(error.response.data.errors){
                            if( error.response.data.errors.email ){
                                self.showMessageEmail = true;
                                self.messageEmail = error.response.data.errors.email[0];
                            
                            }
                            if( error.response.data.errors.password ){
                                self.showMessagePassword = true;
                                self.messagePassword = error.response.data.errors.password[0];
                            } 
                        }else{
                            self.showMessage = true;
                            self.message = 'Tài khoản hoặc mật khẩu không đúng. Mời quý khách kiểm tra lại. Cảm ơn.';
                        }
                    }else {
                    self.showMessage = true;
                     self.message = 'Tài khoản hoặc mật khẩu không đúng. Mời quý khách kiểm tra lại. Cảm ơn.';
                    }
                    setTimeout(function () {
                  self.showMessage = false;
                  self.showMessagePassword = false;
                  self.showMessageEmail = false;
              }, 10000);
                });
        }
    },
    mounted() {
    let self = this;
    window.addEventListener('keyup', event => {
      if (event.keyCode === 13) { 
          if(self.email != ''){
            document.getElementById("btn-login").click();
          }
      }
    })
  }
}
</script>
<style lang="scss" >
    body{
    -webkit-font-smoothing: antialiased;
    background-image: url(/img/Background-lg-rg.png),;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;

    } 
    .register-header{
      text-align: center;
       margin-bottom: 10px;
    }
    .p-avatar-img{
        width: 100%;
        max-width: 400px;
        height: auto;
    }
    .p-avatar{
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
    }
    .body-login{
      background-color: transparent;
      border: none;
      color:white;
    }
    .modifi-input input{
      background-color: rgba(255, 255, 255, 0.323);
      border:none;
      color: white;
    }
     .modifi-input span{
      background-color: rgba(255, 255, 255, 0.323);
      border:none;
      color: white;
    }
    .modifi-input input::placeholder{
      color: white;
    }
    .sm-login{
      color: white;
      background-color: transparent;
      border: none;
      font-weight: bold;
      width: 100%;
    }
    .link-register{
      color: white;
      text-decoration: underline;
    }
    .link-register:hover{
      color: rgb(51, 173, 20) !important;
    }
     .text-notification {
          color: rgb(51, 173, 20) !important;
     }
    .f-btn-login{
        margin-bottom: 5px !important;
        margin-top: 25px !important;
        padding: 0px;
        border: 2px solid white;
     }
    .form-check {
        margin-top: 8px;
    }
</style>
