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
                  :src="url"
                  class="p-avatar-img"
                />
              </div>
    
            <CInputFile
                label="Thay đổi ảnh đại diện "
                type="file"
                v-on:change="uploadAvatar"
              />
            <CInput type="text" readonly label="Tên đăng nhập" placeholder="Tên đăng nhập" v-model="name" ></CInput>
            <CInput type="text" readonly label="Email" placeholder="Email" v-model="email"></CInput>
            <CInput type="text"  label="Điện thoại" placeholder="Điện thoại" v-model="phone"></CInput>
            <CAlert
                  color="danger"
                  closeButton
                  :show.sync="showMessagePhone"
              >
                {{messagePhone}}
              </CAlert>
            <CInput type="text"  label="Địa chỉ" placeholder="Địa chỉ" v-model="address"></CInput>
            <CAlert
                  color="danger"
                  closeButton
                  :show.sync="showMessageAddress"
              >
                {{messageAddress}}
              </CAlert>
              <CRow>
              <CCol sm="6" >
                <CSelect
                  disabled
                  label="Kungfu Clan"
                  :value.sync="clan"
                  :options="clans"
                   class="modifi-input"
                />
              </CCol>
              <CCol sm="6" >
                <CInput type="text" readonly label="Mã giới thiệu của bạn "  v-model="personal_reference_code" ></CInput>
              </CCol>
              </CRow>
            <CRow class="btn-profile">
              <CCol  lg="4"/>
              <CCol col="6" xs="6" sm="6" md="6" lg="2" class="btn-edit-center">
                <CButton color="primary" @click="goBack">Trở Lại</CButton>
              </CCol>
              <CCol col="6" xs="6" sm="6" md="6" lg="2" class="btn-edit-center">
                <CButton color="primary" id="saveProfileUser" @click="update()">Lưu Lại</CButton>
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
          <div class="show-modal-reflog">
          <CModal
            title="Thông báo"
            color="warning"
            :centered="true"
            :show.sync="isShowRefLogModalMC"
            class="a"
          >
            <template #footer>
              <CButton color="secondary" @click="isShowRefLogModalMC = false"
                >Đóng</CButton
              >
            </template>
            <template #body-wrapper>
              <div class="modal-body" :class="is_show_more && 'profile-modal-content-scroll' ">
                <div class="px-2">
                  <template 
                  v-for="logContent,index in logContents"
                  >
                    <CRow :key="index" v-if="(!is_show_more && index < 3) || is_show_more">
                      {{logContent}}
                    </CRow>
                  </template >  
                  <CRow class="showMore" v-if="log_length_default">
                    <p @click="is_show_more = !is_show_more">{{!is_show_more ? "Xem thêm..." : "Đóng lại"}}</p>
                  </CRow>  
                </div>
              </div>
            </template>
          </CModal>
          </div>
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
        clan: 0,
        student: 0,
        forever: 0,
        limited: 0,
        type: 0,
        name: '',
        email: '',
        phone: '',
        address: '',
        status: '',
        plan_name: '',
        promotion_months: '',
        reference_promotion_months: '',
        plan: 1,
        expiry_date: "",
        activate_date: "",
        period: "",
        personal_reference_code: "",
        showMessage: false,
        showMessagePhone: false,
        showMessageAddress: false,
        showMessageError: false,
        message: '',
        messageError: '',
        messagePhone: '',
        messageAddress: '',
        dismissSecs: 7,
        dismissCountDown: 0,
        showDismissibleAlert: false,
        url: localStorage.getItem("avatar"),
        avatar_url: localStorage.getItem("avatar"),
        user_log_reference: '',
        logContents: [],
        show_user_log_reference: false,
        isShowRefLogModalMC: false,
        is_show_more: false,
        log_length_default: false,
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
    uploadAvatar(files, event){
        let self = this;
        let formData = new FormData();
        formData.append('file', files[0]);
        axios.post( this.$apiAdress + '/api/users/' + localStorage.getItem("user_id") + '/chavatar?token=' + localStorage.getItem("api_token"),
            formData,
            { headers: {
                'Content-Type': 'multipart/form-data'
            }}
        ).then(response => {
            localStorage.setItem('avatar', response.data.storedPath);
            this.$root.$emit('TheHeaderDropdownAccnt');
            this.$root.$emit('Profile');
        })
        .catch(function(error){
            console.log(error);
        });
    },
    update_avatar() {
      this.avatar_url = localStorage.getItem("avatar");
    },
    update() {     
        let self = this;
        axios.post(  this.$apiAdress + '/api/users/' + localStorage.getItem("user_id") + '?token=' + localStorage.getItem("api_token"),
        {
            _method: 'PUT',
            name: self.name,
            email: self.email,
            phone: self.phone,
            clan: self.clan,
            limited: self.limited,
            student: self.student,
            forever: self.forever,
            address: self.address,
            expiry_date: self.expiry_date,
            service_plan: self.plan,
            student: self.student,
            status: self.status,
            period: self.period,
            type: self.type,
            promotion_months: self.promotion_months,
            activate_date: self.activate_date,
        })
        .then(function (response) {
            self.showMessage = true;
            self.message = 'Cập nhật thành công.';
            setTimeout(function () {
                  self.showMessage = false;
              }, 3000);
        }).catch(function (error) {
          self.showMessageError = true;
            if(error.response){
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
    showReferenceLog(){
      let self = this;
      let log_res = [];
      axios.get( this.$apiAdress + '/api/user-logs/reference?token=' + localStorage.getItem("api_token"))
      .then(response =>{
          for(let i=0; i < response.data.log.length; i++){
              if(response.data.log[i]['status'] == 'New' ){
                log_res.push(response.data.log[i]);
              }
          }
          if(log_res != null){
            self.renderContentUserRefLogModal(log_res);
          }
      })
      .catch(function(error){
        console.log(error)
        self.$router.push({ path: '/login' });
      })
    },
    showModalUserRefLog(logContents){
      let self = this;
      if(logContents.length >= 3){
        self.log_length_default = true;
      }
      self.logContents = logContents;
      self.isShowRefLogModalMC = true;
      self.disableReferenceLog();
    },
    disableReferenceLog(){
      axios.get( this.$apiAdress + '/api/user-logs/alert-reference?token=' + localStorage.getItem("api_token"))
      .then(response =>{
      })
      .catch(function(error){
        console.log(error);
        this.$router.push({ path: '/login' });
      })
    },
    renderContentUserRefLogModal(log_res){
      let self = this;
      if(log_res.length != 0){
        for(let i = 0; i < log_res.length; i++){
        let log = JSON.parse(log_res[i]['log']);
        if(log_res[i]['log_type'] == 'reference_success' && log_res[i]['status'] == 'New'){
          let reference_success =  log.date +" : Bạn đã giới thiệu thành công thành viên " +  log.new_user + " tham gia KungFuStocksPro và nhận thêm "+log.discount +" tháng sử dụng ";
          self.logContents.push(reference_success);
        }else if(log_res[i]['log_type'] == 'active_reference_success' && log_res[i]['status'] == 'New'){
          let active_reference_success = log.date +" : Bạn đã tham gia KungFuStocksPro cùng thành viên "+log.referencer + " và nhận thêm  "+log.discount +" tháng sử dụng";
          self.logContents.push(active_reference_success);
        }
      }
      self.showModalUserRefLog(self.logContents);
      }
    },
  },
  mounted: function(){
    let self = this;
    let user_id = localStorage.getItem("user_id");
    window.addEventListener('keyup', event => {
      if (event.keyCode === 13) { 
        if(self.phone != '' ){
          document.getElementById("saveProfileUser").click();
        }
      }
    });
    axios.get(  this.$apiAdress + '/api/users/' + user_id + '/edit?token=' + localStorage.getItem("api_token"))
    .then(function (response) {
      console.log(response);
        var date_expiry = new Date(response.data.expiry_date);
        var date_active = new Date(response.data.activate_date);
        self.expiry_date = moment(date_expiry).format('YYYY-MM-DD');
        self.name = response.data.name;
        self.type = response.data.type;
        self.email = response.data.email;
        self.phone = response.data.phone;
        self.address = response.data.address;
        self.status = response.data.status;
        self.activate_date = moment(date_active).format('YYYY-MM-DD');
        self.period = response.data.period;
        self.plan_name = response.data.plan_name;
        self.clan = response.data.clan;
        self.promotion_months = response.data.promotion_months;
        self.student = response.data.student;
        self.forever = response.data.forever;
        self.personal_reference_code = response.data.personal_reference_code;
        self.reference_promotion_months = response.data.reference_promotion_months;
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
  created(){
    this.showReferenceLog();
  }
}


</script>

<style>
.profile-modal-content-scroll{
  height: 70vh !important;
  overflow-y: auto !important;
  max-width: 700px !important;
}
.modal-dialog-centered{
  max-width: 700px !important;
}
</style>

<style scoped>
.btn-profile{
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
.showMore{
  color: #7267d3 ;
  cursor: pointer;
}

</style>
 