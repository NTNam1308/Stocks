<template>
<div>
  <CRow>
    <CCol col="12" xl="12">
      <transition name="slide">
      <CCard>
        <CCardHeader>
           <h4>Quản lý liên hệ</h4><br>
          <CRow class="filter_bar">
            <CCol col="12" xl="2">
              <CSelect
                label="Trạng thái liên hệ"
                :value.sync="filter_called_value"
                :options="options_filter_called"
              />
            </CCol>
            <CCol col="12" xl="2">
              <CSelect
                label="Trạng thái tài khoản"
                :value.sync="filter_registered_value"
                :options="options_filter_registered"
              />
            </CCol>
            <CCol col="12" xl="2">
              <CInput
                type="date"
                label="Ngày"
                v-model="today_form"
              />
            </CCol>
            <CCol col="12" xl="2">
              <CCallout color="info">
                Yêu cầu<br>
                <strong class="h4">{{ lengthContactFeedbacks }}</strong>
              </CCallout> 
            </CCol>
            <CCol col="12" xl="2" >
              <JsonExcel
              :data="itemExportExcel"
              :fields="fieldExportExcel"
              :name="today"
              class="float-right"
              style=" padding-top: 28px;"
            >
              <CButton color="success">
                <svg
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  width="20px"
                  height="20px"
                >
                  <path
                    d="M 28.875 0 C 28.855469 0.0078125 28.832031 0.0195313 28.8125 0.03125 L 0.8125 5.34375 C 0.335938 5.433594 -0.0078125 5.855469 0 6.34375 L 0 43.65625 C -0.0078125 44.144531 0.335938 44.566406 0.8125 44.65625 L 28.8125 49.96875 C 29.101563 50.023438 29.402344 49.949219 29.632813 49.761719 C 29.859375 49.574219 29.996094 49.296875 30 49 L 30 44 L 47 44 C 48.09375 44 49 43.09375 49 42 L 49 8 C 49 6.90625 48.09375 6 47 6 L 30 6 L 30 1 C 30.003906 0.710938 29.878906 0.4375 29.664063 0.246094 C 29.449219 0.0546875 29.160156 -0.0351563 28.875 0 Z M 28 2.1875 L 28 6.53125 C 27.867188 6.808594 27.867188 7.128906 28 7.40625 L 28 42.8125 C 27.972656 42.945313 27.972656 43.085938 28 43.21875 L 28 47.8125 L 2 42.84375 L 2 7.15625 Z M 30 8 L 47 8 L 47 42 L 30 42 L 30 37 L 34 37 L 34 35 L 30 35 L 30 29 L 34 29 L 34 27 L 30 27 L 30 22 L 34 22 L 34 20 L 30 20 L 30 15 L 34 15 L 34 13 L 30 13 Z M 36 13 L 36 15 L 44 15 L 44 13 Z M 6.6875 15.6875 L 12.15625 25.03125 L 6.1875 34.375 L 11.1875 34.375 L 14.4375 28.34375 C 14.664063 27.761719 14.8125 27.316406 14.875 27.03125 L 14.90625 27.03125 C 15.035156 27.640625 15.160156 28.054688 15.28125 28.28125 L 18.53125 34.375 L 23.5 34.375 L 17.75 24.9375 L 23.34375 15.6875 L 18.65625 15.6875 L 15.6875 21.21875 C 15.402344 21.941406 15.199219 22.511719 15.09375 22.875 L 15.0625 22.875 C 14.898438 22.265625 14.710938 21.722656 14.5 21.28125 L 11.8125 15.6875 Z M 36 20 L 36 22 L 44 22 L 44 20 Z M 36 27 L 36 29 L 44 29 L 44 27 Z M 36 35 L 36 37 L 44 37 L 44 35 Z"
                  />
                </svg>
                Xuất File Excel
              </CButton>
            </JsonExcel>
            </CCol>
           
          </CRow>
        </CCardHeader>
        <CCardHeader>
          <CCardBody>
              <CDataTable
                sorter
                hover
                striped
                :items="customerContactFeedbackList"
                :fields="fields"
                :itemsPerPageSelect="{
                  label: 'Số lượng:',
                  values: [10, 20, 50, 100],
                }"
                :tableFilter="{ label:'Tìm Kiếm', placeholder: ' ' }"
                :items-per-page="10"
                pagination
              >
                <template #id="{ item }">
                    <td> {{item.id}}</td>
                </template>
                <template #email="{ item }">
                    <td class="none-white-space"> {{item.email}}</td>
                </template>
                <template #phone="{ item }">
                    <td class="none-white-space"> {{item.phone}}</td>
                </template>
                <template #name="{ item }">
                    <td class="none-white-space"> {{item.name}}</td>
                </template>
                <template #created_at="{ item }">
                    <td class="none-white-space"> {{(item.created_at == null) ? "Không xác định" : item.created_at }}</td>
                </template>
                <template #content="{ item }">
                    <td class="none-white-space">
                      <div class="d-inline-block text-truncate" style="max-width: 150px;">
                        {{item.content}}
                      </div>
                    </td>
                </template>
                <template #called="{ item }">
                    <td class="none-white-space"> {{ item.called }}</td>
                </template>
                <template #registered="{ item }">
                    <td class="none-white-space">
                      <CBadge :color="getBadge(item.registered)">{{ item.registered }}</CBadge>
                    </td>
                </template>
                <template #notes="{ item }">
                    <td class="none-white-space">
                       <div class="d-inline-block text-truncate" style="max-width: 150px;">
                          {{(item.notes == null )? "Không ghi chú" : item.notes}}
                       </div>
                    </td>
                </template>
                <template #edit=" {item} ">
                    <td>
                      <CButton color="primary" @click="editCustomerContact(item.id)"> Sửa </CButton>
                    </td>
                </template>
        
              </CDataTable>
          </CCardBody>
        </CCardHeader> 
      </CCard>
      </transition>
    </CCol>
  </CRow>
</div>
</template>

<script>
import axios from 'axios'
import JsonExcel from "vue-json-excel";

export default {
  name: 'CustomerContactFeedbacks',
   components: {
    JsonExcel,
  },
  data: () => {
    return {
      customerContactFeedbacks: [],
      fields: [
        { key: "id", _style: "min-width:50px", label: "STT" },
        { key: "created_at", _style: "min-width:100px", label: "Ngày"},
        { key: "name", _style: "min-width:200px", label: "Họ và tên" },
        { key: "phone", _style: "min-width:50px", label: "Số điện thoại"},
        { key: "email", _style: "min-width:50px", label: "Email" },
        { key: "registered", _style: "min-width:50px", label: "Trạng thái tài khoản" },
        { key: "called", _style: "min-width:50px", label: "Trạng thái liên hệ" },
        { key: "content", _style: "min-width:200px", label: "Yêu cầu"},
        { key: "notes", _style: "min-width:200px", label: "Ghi chú" },
        { key: "edit", _style: "min-width:50px", label: "Sửa" },
      ],
      today: "Liên hệ & Phản hồi khách hàng ",
      options_filter_called : [
        { value: "", label: "Tất Cả" },
        { value: "L1", label: "L1"},
        { value: "L2", label: "L2"},
        { value: "L3", label: "L3"},
      ],
      options_filter_registered :[
        { value: '', label: "Tất cả"},
        { value: 'Not available', label: "Not available"},
        { value: 'New', label: "New"},
        { value: 'Active', label: "Active"},
        { value: 'Pending', label: "Pending"},
      ],
      lengthContactFeedbacks: 0,
      today_form: '',
      filter_called_value: '',
      filter_registered_value: '',
    }
  },
  computed: {
  },
  methods: {
    getCustomerContactFeedbacks (){
      let self = this;
      axios
      .get(this.$apiAdress + "/api/contact-feedback/", {
        params: {
          token: localStorage.getItem("api_token"),
        },
      })
      .then(function (response) {
          let data = response.data.data;
          self.lengthContactFeedbacks = data.length;
          self.customerContactFeedbacks = data.map(function(item) {
          if(item.created_at) {
            item.created_at = new Date(item.created_at).toLocaleDateString('en-CA');
          }
          if(item.called) {
            switch(item.called){
              case 'New':
                item.called = "L1";
                break;
              case 'Contacted':
                item.called = "L3";
                break;
              case 'Pending':
                item.called = "L2";
                break;    
            }
          }
          if(!item.registered){
            item.registered = "Not available";
          }
          
          return item;
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    calling(item){
        axios
        .put(this.$apiAdress + "/api/contact-feedback/call", {
            token: localStorage.getItem("api_token"),
            id: item.id,
        })
        .then(function (response){
        })
        .catch(function(error){
            console.log(error);
        });
    },

    showCustomerContact(id){
      const showLink = this.showLink(id);
      this.$router.push({path: showLink});
    },

    editCustomerContact(id){
      const editLink = this.editLink(id);
      this.$router.push({path: editLink});
    },

    editLink(id){
      return `contact-feedback/${id.toString()}/edit`
    },

    showLink(id){
      return `contact-feedback/${id.toString()}/show`
    },

    refreshFilter(){
      this.filter_called_value = '';
      this.filter_resgitered_value = '';
      this.today_form = '';
    },

    getBadge (registered) {
      return registered === 'Active' ? 'success'
        : registered === 'New' ? 'primary'
          : registered === 'Pending' ? 'warning'
            : registered === 'Not available' ? 'danger' : 'primary'
    },

  },

  computed:{
    fieldExportExcel() {
      return {
        "STT" : "id",
        "Ngày": "created_at",
        "Họ và tên": "name",
        "Số điện thoại": "phone",
        "Email": "email",
        "Trạng thái tài khoản": "registered",
        "Trạng thái liên hệ": "called",
        "Yêu cầu": "content",
        "Ghi chú": "notes",
      };
    },
    itemExportExcel() {
      let return_data = [];
      if ( this.customerContactFeedbackList.length > 0) {
        return_data = this.customerContactFeedbackList.map((item) => {
          switch(item.called){
            case "New":
              item.called = "L1";
              break;
            case "Contacted":
              item.called = "L3";
              break;
            case "Pending":
              item.called = "L2";
              break;
          }
          return {
            id: item.id,
            email: item.email,
            name: item.name,
            phone: item.phone,
            content: item.content,
            created_at: (item.created_at == null) ? "" : item.created_at,
            registered: (item.registered == null) ? "Not available" : item.registered,
            called: item.called,
            notes: (item.notes == null) ? "" : item.notes,
            
          }
        });
      }
      return return_data;
    },

    customerContactFeedbackList(){
      let list_data_filter = this.customerContactFeedbacks;
      if (this.today_form !== "") {
        console.log(this.today_form);
        list_data_filter = list_data_filter.filter(
          (item) => item.created_at == this.today_form
        );
      }
      
      if(this.filter_called_value !== ""){
        list_data_filter = list_data_filter.filter(
          (item) => item.called == this.filter_called_value
        );
      }

      if(this.filter_registered_value !== ""){
        list_data_filter = list_data_filter.filter(
          (item) => item.registered == this.filter_registered_value
        );
      }
      this.lengthContactFeedbacks = list_data_filter.length;
      return list_data_filter;
    },

  },

  mounted: function(){
    this.getCustomerContactFeedbacks();
  }

  

}
</script>

<style scoped>

.none-white-space{
  white-space: normal;
}
.filter_bar{
  float:right;
    width:100%;
}

</style>