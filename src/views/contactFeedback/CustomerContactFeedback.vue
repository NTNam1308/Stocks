<template>
  <CRow>
     <CCol col="12" lg="2">
     </CCol>
    <CCol col="12" lg="8">
      <CCard no-header>
        <CCardHeader>
          <CForm>
            <CInput type="text" readonly label="Tên" placeholder="Tên" v-model="name"></CInput>
            <CInput type="text" readonly label="Email" placeholder="Email" v-model="email"></CInput>
            <CInput type="text" readonly label="Điện thoại" placeholder="Điện thoại" v-model="phone"></CInput>
            <CInput type="date" readonly label="Ngày liên hệ" placeholder="Ngày liên hệ" v-model="created_at"></CInput>
            <CInput type="text" readonly label="Trạng thái đăng ký" placeholder="Chưa đăng ký" v-model="registered"></CInput>
            <CSelect
              disabled
              label="Trạng thái liên hệ"
              :value.sync = "called"
              :options = "options_called"
            >
            </CSelect>
            <CTextarea rows="9" label="Liên Hệ & Phản Hồi" readonly placeholder="Chưa có phản hồi" v-model="content" ></CTextarea>
            <CTextarea rows="5" label="Ghi chú" readonly placeholder="Không ghi chú" v-model="notes" ></CTextarea>
            <CRow>
              <CCol col="12" class="btn-in-center">
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
  name: 'CustomerContactFeedback',
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
      options_called: [
        { value: "New", label: "Chưa liên hệ" },
        { value: "Contacted", label: "Đã liên hệ" },
        { value: "Pending", label: "Đang xử lý" },
      ],
    }
  },
  methods: {
    getCustomerContactFeedback(){
      let self = this;
      axios
      // .get('http://127.0.0.1:8000/api/contact-feedback/4/show',{
      //   params: {
      //     token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMDMuMy4yNDYuMjA2OjgwMDZcL2FwaVwvbG9naW4iLCJpYXQiOjE2NDQ3OTUzMzgsImV4cCI6MTY0NDg4MTczOCwibmJmIjoxNjQ0Nzk1MzM4LCJqdGkiOiI3a0hpUTFjbkU2b0kxQ0FBIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.7WOclyu1oTkzUaHa-brUWsRt6xYwarTH5OAO8RM3vj0',
      //   }
      // })
      .get(this.$apiAdress + "/api/contact-feedback/"  + self.$route.params.id +'/show'+ '?token=' + localStorage.getItem("api_token"))
      .then(function(response){
        let data = response.data.customer_contact;
        self.id = data.id;
        self.called = data.called;
        self.name = data.name;
        self.email = data.email;
        self.phone = data.phone;
        self.notes = data.notes;
        self.content = data.content;
        self.registered = (!data.registered) ? "Unregistered": data.registered;
        self.created_at = moment(data.created_at).format('YYYY-MM-DD');
      })
      .catch(function(error){
        console.log(error)
      })
    },

    goBack() {
      this.$router.go(-1)
    },
  },


  mounted: function(){
    this.getCustomerContactFeedback();
  }
}


</script>
<style scoped>
.btn-in-center{
  text-align: center;
}
</style>
