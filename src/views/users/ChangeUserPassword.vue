<template>
  <CRow>
    <CCol col="12" lg="2">
     </CCol>
    <CCol col="12" lg="8">
        <CCard>
          <CCardHeader>
            Đổi mật khẩu thành viên: {{name}}
          </CCardHeader>
          <CCardHeader>
            <CForm>
              <CInput
                placeholder="Mật khẩu mới"
                type="password"
                v-model="new_password"
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
                <CButton color="primary" id="saveChangePassUser" @click="update()" size="sm">
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
  name: 'ChangeUserPassword',
  props: {
  },
  data: () => {
    return {
      new_password: '',
      name: "",
      message: null,
      messageError: null,
      showMessage: false,
      showMessageError: false,
    }
  },
  methods:{
    update(){
        let self = this;
        if (self.new_password == '') {
            self.showMessageError = true;
            self.messageError = 'Vui lòng nhập mật khẩu';
            setTimeout(function () {
                  self.showMessageError = false;
              }, 3000)
            return;
        }

        axios.post(  this.$apiAdress + '/api/users/' + self.$route.params.id + '/passwd?token=' + localStorage.getItem("api_token"),
        {
            _method: 'POST',
            new_password: self.new_password
        })
        .then(function (response) {
          self.showMessage = true;
            self.message = 'Thay đổi mật khẩu thành công.';
            setTimeout(function () {
                  self.showMessage = false;
                  self.new_password = '';
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
    this.name = this.$route.params.name ? this.$route.params.name : "";
    let self = this;
    window.addEventListener('keyup', event => {
      if (event.keyCode === 13) { 
        if(self.new_password != '' ){
          document.getElementById("saveChangePassUser").click();
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
