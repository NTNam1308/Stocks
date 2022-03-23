<template>
  <CRow>
    <CCol col="12" lg="2">
     </CCol>
    <CCol col="12" lg="8">
        <CCard>
          <CCardHeader>
            Đổi mật khẩu
          </CCardHeader>
          <CCardHeader>
            <CForm>
              <CInput
                placeholder="Mật khẩu hiện tại"
                type="password"
                v-model="old_password"
              >
                <template #prepend-content><CIcon name="cil-shield-alt"/></template>
              </CInput>
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
              <div class="form-group form-actions bt-change-pw">
                <CButton color="primary" id="saveChangePass" @click="update()" size="sm">
                  Đổi mật khẩu
                </CButton>
              </div>
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
export default {
  name: 'ChangePassword',
  props: {
  },
  data: () => {
    return {
      old_password: '',
      new_password: '',
      new_password_second: '',
      message: null,
      messageError: null,
      showMessage: false,
      showMessageError: false,
    }
  },
  methods:{
    update(){
        let self = this;
        if (self.old_password == '' || self.new_password == '' || self.new_password_second == '') {
            self.showMessageError = true;
            self.messageError = 'Vui lòng nhập mật khẩu';
            setTimeout(function () {
                  self.showMessageError = false;
              }, 3000)
            return;
        }

        if (self.new_password != self.new_password_second) {
            self.showMessageError = true;
            self.messageError = 'Mật khẩu không khớp';
            setTimeout(function () {
                  self.showMessageError = false;
              }, 3000)
            return;
        }

        axios.post(  this.$apiAdress + '/api/users/' + localStorage.getItem("user_id") + '/passwd?token=' + localStorage.getItem("api_token"),
        {
            _method: 'POST',
            old_password: self.old_password,
            new_password: self.new_password
        })
        .then(function (response) {
          self.showMessage = true;
            self.message = 'Thay đổi mật khẩu thành công.';
            setTimeout(function () {
                  self.showMessage = false;
                  self.old_password = '';
                  self.new_password = '';
                  self.new_password_second = '';
              }, 3000);
        }).catch(function (error) {
          self.showMessageError = true;
            self.messageError = 'Lỗi. Không thể thay đổi mật khẩu';
            setTimeout(function () {
                  self.showMessageError = false;
              }, 3000);
        });
    }
  },
  mounted: function(){
    let self = this;
    window.addEventListener('keyup', event => {
      if (event.keyCode === 13) { 
        if(self.old_password != '' ){
          document.getElementById("saveChangePass").click();
        }
      }
    });
  }
}

</script>

<style lang="scss">
.bt-change-pw{
  text-align: center;
}
</style>
