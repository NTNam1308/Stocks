<template>
   <CRow>
     <CCol col="12" lg="2">
     </CCol>
    <CCol col="12" lg="8">
      <CCard no-header>
        <CCardHeader>
          <CForm>
            <CRow >
               <CCol col="12">
                <h4>Thông Tin Khách Hàng</h4>
                  <CRow>
                      <CCol col="12" lg="6">
                        <CInput type="text" disabled label="Họ và tên" placeholder="Tên khách hàng" v-model="name"></CInput>
                      </CCol>
                      <CCol col="12" lg="6">
                        <CInput type="text" disabled label="Điện thoại" placeholder="Số điện thoại" v-model="phone"></CInput>
                      </CCol>        
                  </CRow>
                  <CRow>
                      <CCol col="12" lg="6">
                        <CInput type="text"  disabled label="Email" placeholder="Email" v-model="email"></CInput>
                      </CCol>
                      <CCol col="12" lg="6">  
                        <CInput type="date" disabled label="Ngày" placeholder="Ngày" v-model="created_at"></CInput>
                      </CCol>        
                  </CRow>
                   <CRow>
                      <CCol col="12" lg="6">
                        <CInput type="text" disabled label="Trạng thái tài khoản"  v-model="registered"></CInput>
                      </CCol>
                      <CCol col="12" lg="6">  
                        <CSelect
                          label="Trạng thái liên hệ"
                          :value.sync="called"
                          :options = "options_called"
                        />
                      </CCol>        
                  </CRow>
                </CCol>
            </CRow>
             <CRow >
               <CCol col="12">
                  <h4>Yêu cầu </h4>
                   <CRow>
                    <CCol col="12">
                      <CRow >
                        <CCol>
                          <CTextarea rows="9" readonly v-model="content" ></CTextarea>
                        </CCol>
                      </CRow>
                    </CCol>
                 </CRow>
               </CCol>
              </CRow>
            <CRow >
              <CCol col="12">
                <h4>Ghi Chú </h4>
                <CRow>
                  <CCol col="12">
                    <CTextarea rows="6" placeholder="Chưa có ghi chú" v-model="notes" ></CTextarea>
                  </CCol>
              </CRow>
             </CCol>
            </CRow>
            <CRow>
              <CCol  lg="4"/>
                <CCol col="6" xs="6" sm="6" md="6" lg="2" >
                    <CButton color="primary" @click="goBack()">Trở Lại</CButton>
                </CCol>
                <CCol col="6" xs="6" sm="6" md="6" lg="2" >
                    <CButton color="primary" @click="update()">
                    Lưu Lại
                    </CButton>
              </CCol>
            </CRow>
            <CRow>
              <CCol col="12">
                  <CAlert
                      color="success"
                      closeButton
                      :show.sync="isShowEditMessage"
                  >
                    {{isEditMessage}}
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
export default {
  name: 'EditCustomerContactFeedback',
  data: () => {
    return {
      id: '',
      email: '',
      phone: '',
      name: '',
      content: '',
      called: '',
      registered: '',
      notes: '',
      created_at: '',
      updated_at: '',
      isEditMessage: '',
      isShowEditMessage: false,
      options_called: [
        { value: "New", label: "L1" },
        { value: "Pending", label: "L2" },
        { value: "Contacted", label: "L3" },
      ],
    }
  },
  methods: {
    
    editCustomerContactFeedback(){
        let self = this;
      axios
        // .get('http://127.0.0.1:8000/api/contact-feedback/4/edit',{
        //     params: {
        //         token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMDMuMy4yNDYuMjA2OjgwMDZcL2FwaVwvbG9naW4iLCJpYXQiOjE2NDQ3OTUzMzgsImV4cCI6MTY0NDg4MTczOCwibmJmIjoxNjQ0Nzk1MzM4LCJqdGkiOiI3a0hpUTFjbkU2b0kxQ0FBIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.7WOclyu1oTkzUaHa-brUWsRt6xYwarTH5OAO8RM3vj0',
        //     }
        // })
        .get(this.$apiAdress + "/api/contact-feedback/"  + self.$route.params.id +'/edit'+ '?token=' + localStorage.getItem("api_token"))
        .then(function(response){
            let data = response.data.customer_contact;
            self.id = data.id;
            self.name = data.name;
            self.email = data.email;
            self.phone = data.phone;
            self.created_at = moment(data.created_at).format('YYYY-MM-DD');
            self.content = data.content;
            self.called = data.called;
            self.notes = data.notes;
            self.registered = (data.registered == null) ? "Not available" : data.registered;
        })
    },

    update(){
        let self = this
        axios
        .post(this.$apiAdress + "/api/contact-feedback/update",{
                token: localStorage.getItem("api_token"),
                id: self.id,
                notes: self.notes,
                called: self.called
        })
        // .post("http://127.0.0.1:8000/api/contact-feedback/update",{
        //         token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMDMuMy4yNDYuMjA2OjgwMDZcL2FwaVwvbG9naW4iLCJpYXQiOjE2NDQ4MTIwMjMsImV4cCI6MTY0NDg5ODQyMywibmJmIjoxNjQ0ODEyMDIzLCJqdGkiOiJvalFMdzdObmV6RlpOUDFZIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.q9BpCarpc2vyVL7z7zABzLNxAED2o6zmWARzI5is-Dg',
        //         id: self.id,
        //         notes: self.notes,
        //         called: self.called
        // })
        .then(function(response){
            self.isEditMessage = "Cập nhật thành công";
            self.ShowEditMessage();
            setTimeout(function () {
                  self.isShowEditMessage = false;
              }, 5000);
        })
        .catch(function(error){
            console.log(error)
        })
    },

    ShowEditMessage(){
        this.isShowEditMessage = true;
    },

    goBack() {
      this.$router.go(-1)
    },
  },
  mounted: function(){
      this.editCustomerContactFeedback();
  }
}
</script>

<style>

</style>