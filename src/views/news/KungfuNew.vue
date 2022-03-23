<template>
  <CRow>
    <CCol col="12" xl="12">
      <transition name="slide">
      <CCard>
        <CCardHeader>
            <CRow>
                <CCol col="6" xl="6">
                    Tin Tức
                </CCol>
                 <CCol col="6" xl="6">
                    <CButton color="success" @click="createNew(  )">Tạo</CButton>
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
            hover
            striped
            :items="items"
            :fields="fields"
            :items-per-page="perPage"
            pagination
          >
          <template #show="{item}">
            <td>
              <CButton color="primary" @click="showNew( item.id )">Xem</CButton>
            </td>
          </template>
          <template #thumbnail="{item}">
            <template v-if="$store.state.darkMode">
            <td>
              <div class="bg-thumbnai-kfn">
                <img :src="urlbe + item.thumbnail" class="img-kungfu-news"/>
              </div>
            </td>
             </template>
            <template v-else>
              <td>
              <div class="bg-thumbnai-kfn-w">
                <img :src="urlbe + item.thumbnail" class="img-kungfu-news"/>
              </div>
            </td>
            </template>
          </template>
          <template #mack="{item}">
            <td>
              {{ formatMack(item.mack) }}
            </td>
          </template>
          <template #edit="{item}">
            <td>
              <CButton color="primary" @click="editNew( item.id )">Sửa</CButton>
            </td>
          </template>
          <template #delete="{item}">
            <td>
              <CButton v-if="you!=item.id" color="danger" @click="deleteNew( item.id )">Xóa</CButton>
            </td>
          </template>
        </CDataTable>
        </CCardHeader>
      </CCard>
      </transition>
    </CCol>
  </CRow>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Users',
  data: () => {
    return {
      items: [],
      fields: [
        { key: "id", _style: "min-width:50px", label: "Id" },
        { key: "title", _style: "min-width:50px", label: "Tiêu Đề" },
        { key: "mack", _style: "min-width:50px", label: "Mã CK" },
        { key: "thumbnail", _style: "min-width:50px", label: "Ảnh Thumbnail" },
        { key: "date", _style: "min-width:50px", label: "Ngày Tạo" },
        { key: "show", _style: "min-width:50px", label: "Xem" },
        { key: "edit", _style: "min-width:50px", label: "Sửa" },
        { key: "delete", _style: "min-width:50px", label: "Xóa" },
      ],
      currentPage: 1,
      perPage: 20,
      totalRows: 0,
      you: null,
      message: '',
      urlbe: '',
      showMessage: false,
      dismissSecs: 7,
      dismissCountDown: 0,
      showDismissibleAlert: false
    }
  },
  paginationProps: {
    align: 'center',
    doubleArrows: false,
    previousButtonHtml: 'prev',
    nextButtonHtml: 'next'
  },
  methods: {
    newLink (id) {
      return `tin-tuc/${id.toString()}`
    },
    editLink (id) {
      return `tin-tuc/${id.toString()}/edit`
    },
    showNew ( id ) {
      const newLink = this.newLink( id );
      this.$router.push({path: newLink});
    },
    editNew ( id ) {
      const editLink = this.editLink( id );
      this.$router.push({path: editLink});
    },
    createNew ( ) {
      this.$router.push('/tin-tuc/create');
    },
    formatMack(mack){
      if(mack == null || mack == '')
      {
        return 'Chưa Có';
      }
      return mack;
    },
    deleteNew ( id ) {
      let self = this;
      axios.post(  this.$apiAdress + '/api/kungfu-news/' + id + '?token=' + localStorage.getItem("api_token"), {
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
      axios.get(  this.$apiAdress + '/api/kungfu-news?token=' + localStorage.getItem("api_token"))
      .then(function (response) {
        self.items = response.data.kungfu_news;
      }).catch(function (error) {
        console.log(error);
        self.$router.push({ path: '/login' });
      });
    }
  },
  mounted: function(){
    this.getUsers();
    this.urlbe = this.$apiAdress ;
  }
}
</script>
<style >
.img-kungfu-news{
  width: 80px;
  height: 60px;
}
.bg-thumbnai-kfn{
  width: 80px;
  height: 60px;
  text-align: center;
  background: white;
}
.bg-thumbnai-kfn-w{
  width: 80px;
  height: 60px;
  text-align: center;
  background: black;
}
</style>
