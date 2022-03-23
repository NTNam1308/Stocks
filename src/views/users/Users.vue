<template>
  <CRow>
    <CCol col="12" xl="12">
      <transition name="slide">
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol col="12" xl="2">
              <CSelect
                label="Loại user"
                :value.sync="filter_type_value"
                :options="options_filter_type"
              />
            </CCol>
            <CCol col="12" xl="2">
              <CSelect
                label="Trạng thái"
                :value.sync="filter_status_value"
                :options="options_filter_status"
              />
            </CCol>
            <CCol col="12" xl="1">
              <CSelect
                label="Gói cước"
                :value.sync="filter_period_value"
                :options="options_filter_period"
              />
            </CCol>
            <CCol col="12" xl="2">
              <CInput
                type="date"
                label="Ngày kích hoạt"
                v-model="today_form"
              />
            </CCol>
            <CCol col="12" xl="1">
              <CSelect
                label="Sắp hết hạn"
                :value.sync="filter_expiry_value"
                :options="options_filter_expiry"
              />
            </CCol>
            <CCol col="12" xl="1">
              <CSelect
                label="Quyền"
                :value.sync="filter_role_value"
                :options="options_filter_role"
              />
            </CCol>
            <CCol col="12" xl="1">
              <CCallout color="info">
                Số lượng user<br>
                <strong class="h4">{{ lengthUser }}</strong>
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
          <CRow>
            <CCol col="12" xl="2">
              <CInput
                label="Tìm kiếm"
                :value.sync="search_string"
              />
            </CCol>  
          </CRow>
        </CCardHeader>
        <CCardHeader>
          <CAlert
            :show.sync="dismissCountDown"
            color="primary"
            fade
          >
            ({{dismissCountDown}}) {{ message }}
          </CAlert>
          <CDataTable
            sorter
            hover
            striped
            :items="usersList"
            :fields="fields"
            :itemsPerPageSelect = "{ label: 'Số lượng:',  values: [5, 10, 20, 50, 100] }"
            :items-per-page="perPage"
            pagination
          >
          <template #status="{item}">
            <td>
              <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
            </td>
          </template>
          <template #show="{item}">
            <td>
              <CButton color="primary" @click="showUser( item.id )">Xem</CButton>
            </td>
          </template>
          <template #edit="{item}">
            <td>
              <CButton color="primary" @click="editUser( item.id )">Sửa</CButton>
            </td>
          </template>
          <template #changepassword="{item}">
            <td>
              <CButton color="primary" @click="changeUserPassword( item.id, item.name )">Đổi mật khẩu</CButton>
            </td>
          </template>
          <template #delete="{item}">
            <td>
              <CButton v-if="you!=item.id" color="danger" @click="showModelDelete(item.id)">Xóa</CButton>
            </td>
          </template>
        </CDataTable>
        </CCardHeader>
      </CCard>
      </transition>
    </CCol>
    <CModal 
    title="Xóa thành viên" 
    :centered="true"
    :show.sync="isShowDeleteModal" 
    size="sm">
      <template #footer>
        <CButton color="secondary" @click="isShowDeleteModal = false"
          >Đóng</CButton
        >
        <CButton color="danger" @click="deleteUser( userDelete )"
          ><CIcon name="cilTrash" /> Xóa
        </CButton>
      </template>
      <CRow>
        <CCol sm="12"> Bạn có chắc chắn không? </CCol>
      </CRow>
    </CModal>
  </CRow>
</template>

<script>
import axios from 'axios'
import JsonExcel from "vue-json-excel";
import moment from "moment";

export default {
  name: 'Users',
  components: {
    JsonExcel,
  },
  data: () => {
    return {
      filter_type_value: -1,
      options_filter_type: [
        { value: -1, label: "Tất Cả" },
        { value: 0, label: "Thường" },
        { value: 1, label: "Nội Bộ" },
        { value: 2, label: "Ngoại Giao" },
        { value: 3, label: "Test" },
      ],
      filter_status_value: "",
      options_filter_status: [
        {
          value: "",
          label: "Tất cả",
        },
        {
          value: "Active",
          label: "Active",
        },
        {
          value: "New",
          label: "New",
        },
        {
          value: "Pending",
          label: "Pending",
        },
        {
          value: "Inactive",
          label: "Inactive",
        },
        {
          value: "Banned",
          label: "Banned",
        },
      ],
      filter_role_value: "",
      options_filter_role: [
        { value: "", label: "Tất Cả" },
        { value: "user", label: "User thường" },
        { value: "user,coworker", label: "Coworker" },
      ],
      filter_period_value: 0,
      filter_expiry_value: 0,
      options_filter_period: [
        { value: 0, label: "Tất Cả" },
        { value: 1, label: "1 năm" },
        { value: 2, label: "2 năm" },
        { value: 5, label: "5 năm" },
      ],
      options_filter_expiry: [
        { value: 0, label: "Tất Cả" },
        { value: 1, label: "1 tuần" },
        { value: 2, label: "1 tháng" },
        { value: 3, label: "2 tháng" },
      ],
      search_string: '',
      userDelete: '',
      isShowDeleteModal: false,
      typies: [{value:-1 , label:"Tất Cả" },{value:0 , label:"Thường" }, {value:1, label:"Nội Bộ"}, {value:2, label:"Ngoại Giao"}, {value:3, label:"Test"}],
      type: -1,
      items: [],
      fields: [
        { key: "id", _style: "min-width:50px", label: "Id" },
        { key: "email", _style: "min-width:50px", label: "Email" },
        { key: "name", _style: "min-width:50px", label: "Tên" },
        { key: "phone", _style: "min-width:50px", label: "Số điện thoại" },
        { key: "registered", _style: "min-width:50px", label: "Ngày đăng ký" },
        { key: "expiry_date", _style: "min-width:50px", label: "Ngày hết hạn" },
        { key: "activate_date", _style: "min-width:50px", label: "Ngày kích hoạt" },
        { key: "roles", _style: "min-width:50px", label: "Quyền" },
        { key: "status", _style: "min-width:50px", label: "Trạng Thái" },
        { key: "show", _style: "min-width:50px", label: "Xem" },
        { key: "edit", _style: "min-width:50px", label: "Sửa" },
        { key: "changepassword", _style: "min-width:50px", label: "Đổi mật khẩu" },
      ],
      currentPage: 1,
      perPage: 20,
      totalRows: 0,
      you: null,
      message: '',
      showMessage: false,
      dismissSecs: 7,
      dismissCountDown: 0,
      lengthUser: 0,
      showDismissibleAlert: false,
      today: "Danh sách người dùng " + new Date().toLocaleDateString('en-CA'),
      today_form: "",

    }
  },
  paginationProps: {
    align: 'center',
    doubleArrows: false,
    previousButtonHtml: 'prev',
    nextButtonHtml: 'next'
  },
  methods: {
    showModelDelete(userId){
      let self = this;
      self.isShowDeleteModal = true;
      self.userDelete = userId;

    },
    getBadge (status) {
      return status === 'Active' ? 'success'
        : status === 'Inactive' ? 'secondary'
          : status === 'Pending' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    },
    userLink (id) {
      return `users/${id.toString()}`
    },
    editLink (id) {
      return `users/${id.toString()}/edit`
    },
    changeUserPasswordLink ( id, name ) {
      return `users/${id.toString()}/${name.toString()}/changepassword`
    },
    showUser ( id ) {
      const userLink = this.userLink( id );
      this.$router.push({path: userLink});
    },
    editUser ( id ) {
      const editLink = this.editLink( id );
      this.$router.push({path: editLink});
    },
    changeUserPassword (id, name) {
      const changeUserPasswordLink = this.changeUserPasswordLink( id, name );
      this.$router.push({path: changeUserPasswordLink});
    },
    deleteUser ( id ) {

      let self = this;
      let userId = id;
      self.isShowDeleteModal = false;
      axios.post(  this.$apiAdress + '/api/users/' + id + '?token=' + localStorage.getItem("api_token"), {
        _method: 'DELETE'
      })
      .then(function (response) {
          self.message = 'Successfully deleted user.';

          self.showAlert();
          self.getUsers();
          
      }).catch(function (error) {
        console.log(error);
        self.$router.push({ path: '/login' });
      });
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
    getUsers (){
      let self = this;
      axios.get(  this.$apiAdress + '/api/users?token=' + localStorage.getItem("api_token"))
      .then(function (response) {
        self.items = response.data.users.map(function(item) {
          if(item.expiry_date) {
            item.expiry_date = new Date(item.expiry_date).toLocaleDateString('en-CA');
          }
          if(item.activate_date) {
            item.activate_date = new Date(item.activate_date).toLocaleDateString('en-CA');
          }
          return item;
        });
        self.you = response.data.you;
        self.lengthUser = self.items.length;
      }).catch(function (error) {
        console.log(error);
        self.$router.push({ path: '/login' });
      });
    },
    getUsersByType (){
      let self = this;
      axios.get(  this.$apiAdress + '/api/users' ,{
          params: {
          type: self.type,
          token: localStorage.getItem("api_token"),
        },
      })
        .then(function (response) {
          self.items = response.data.users;
          self.you = response.data.you;
          self.lengthUser = self.items.length;
        }).catch(function (error) {
          console.log(error);
          self.$router.push({ path: '/login' });
        });
    },
    search(){
      let self = this;
      axios.get(  this.$apiAdress + '/api/users/search?token=' + localStorage.getItem("api_token"))
      .then(function (response) {
        self.items = response.data.users;
        self.you = response.data.you;
      }).catch(function (error) {
        console.log(error);
        self.$router.push({ path: '/login' });
      });
    }
  },
  computed: {
    fieldExportExcel() {
      return {
        "ID": "id",
        "Email": "email",
        "Tên": "name",
        "Số điện thoại": "phone",
        "Ngày đăng ký": "registered",
        "Ngày hết hạn": "expiry_date",
        "Ngày kích hoạt": "activate_date",
        "Quyền": "roles",
        "Trạng Thái": "status",
      };
    },
    itemExportExcel() {
      let return_data = [];
      if ( this.usersList.length > 0) {
        return_data = this.usersList.map((item) => {
          return {
            id: item.id,
            email: item.email,
            name: item.name,
            phone: item.phone,
            registered: item.registered,
            expiry_date: new Date(item.expiry_date).toLocaleDateString('en-CA'),
            activate_date: new Date(item.activate_date).toLocaleDateString('en-CA'),
            roles: item.roles,
            status: item.status
          }
        });
      }
      return return_data;
    },
    usersList() {
      let filtered_items = this.items;

      if (this.filter_status_value !== "") {
        filtered_items = filtered_items.filter(
          (item) => item.status == this.filter_status_value
        );
      }

      if (this.filter_type_value >= 0) {
        filtered_items = filtered_items.filter(
          (item) => item.type == this.filter_type_value
        );
      }

      if (this.filter_role_value !== "") {
        filtered_items = filtered_items.filter(
          (item) => item.roles == this.filter_role_value
        );
      }

      if (this.filter_period_value > 0) {
        filtered_items = filtered_items.filter(
          (item) => item.period == this.filter_period_value 
           );
      }

      // 1 week
      var today_one_week = new Date();
      today_one_week.setDate(today_one_week.getDate() + 7); // add 1 week
      var add_one_week = today_one_week.toLocaleDateString('en-CA');
      // 1 month
      var today_one_month = new Date();
      today_one_month.setMonth(today_one_month.getMonth() + 1); // add 1 month
      var add_one_month = today_one_month.toLocaleDateString('en-CA');
      // 2 month
      var today_two_month = new Date();
      today_two_month.setMonth(today_two_month.getMonth() + 2); // add 2 month
      var add_two_month = today_two_month.toLocaleDateString('en-CA');

      var today_check = new Date();
      var today_checks = today_check.toLocaleDateString('en-CA');

      if (this.filter_expiry_value > 0) {
        // 1 week
        if(this.filter_expiry_value == 1) {
          filtered_items = filtered_items.filter(
            (item) => item.expiry_date <= add_one_week && item.expiry_date > today_checks
          );
        }
        // 1 month
        if(this.filter_expiry_value == 2) {
          filtered_items = filtered_items.filter(
            (item) => item.expiry_date <= add_one_month && item.expiry_date > today_checks
          );
        }
        // 2 month
        if(this.filter_expiry_value == 3) {
          filtered_items = filtered_items.filter(
            (item) => item.expiry_date <= add_two_month && item.expiry_date > today_checks
          );
        }
      }

      // filter activate date
      if (this.today_form !== "") {
        filtered_items = filtered_items.filter(
          (item) => item.activate_date == this.today_form
        );
      }

      if(this.search_string !== ""){
        filtered_items = filtered_items.filter(
         (item) => item.id == this.search_string || item.name.includes(this.search_string) || item.phone.includes(this.search_string) || item.email.includes(this.search_string) 
        )
      }
      
      
      this.lengthUser = filtered_items.length;

      return filtered_items;
    },
  },
  mounted: function(){
    this.getUsers();
    let roles = localStorage.getItem("roles");
    if (roles != null) {
        roles = roles.split(',')
        let isAdmin = roles.indexOf('admin') >= 0 ? true : false;

        if (isAdmin === true) {
          if (!this.fields.find(o => o.key === 'delete'))
            this.fields.push({ key: "delete", _style: "min-width:50px", label: "Xóa" })
          
          this.options_filter_role = [
            { value: "", label: "Tất Cả" },
            { value: "user", label: "User thường" },
            { value: "user,coworker", label: "Coworker" },
            { value: "user,coworker,moderator", label: "Moderator" },
            { value: "user,coworker,moderator,admin", label: "Admin" },
          ]
        }
    }
  },
}
</script>
<style >
.length-user{
 margin-top: 40px;
}
</style>
