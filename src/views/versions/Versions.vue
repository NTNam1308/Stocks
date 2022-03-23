<template>
<div>
  <CRow>
    <CCol col="12" xl="12">
      <transition name="slide">
      <CCard>
        <CCardBody>
            <h4>Quản lý Mobile Version</h4>
            <CRow class="d-flex align-items-center">
              <CCol sm="3">
                  <CInput label="App Version" type="text" placeholder="Nhập Version..." v-model="version" @keydown.enter="enter"></CInput>
              </CCol>
              <CCol sm="3" class="mt-3">
                <template v-if="action == 'add'">
                  <CButton color="success"  @click="store()"
                    ><CIcon name="cibAddthis" /> Thêm</CButton
                  >
                </template>
                <template v-if="action == 'edit'">
                  <CButton color="primary"  @click="saveEditAppVerSion()"
                    ><CIcon name="cilSave" /> Lưu
                  </CButton>
                  <CButton
                    class="ml-2"
                    color="secondary"
                    @click="handleButtonCancel"
                    >Hủy</CButton
                  >
                </template>
                </CCol>                   
            </CRow> 
                
            <CDataTable
              sorter
              hover
              striped
              :items="items"
              :fields="fields"
              :itemsPerPageSelect="{
                label: 'Số lượng:',
                values: [10, 20,],
              }"
              :tableFilter="{ label:'Tìm Kiếm', placeholder: ' ' }"
              :items-per-page="10"
              pagination
            >
           
            <template #version="{item}" >
              <td>
                {{ item.version }}
              </td>
            </template>          
            <template #edit="{item}">
              <td>
                <CButton color="primary" @click="handleButtonEdit(item)">Sửa</CButton>
              </td>
            </template>
            <template #delete="{item}">
              <td>
                <CButton color="danger" @click="handleModalDelete(item)">Xóa</CButton>
              </td>
            </template>
            </CDataTable>
            <CRow>
              <CModal
                title="Thông báo"
                color="warning"
                :centered="true"
                :show.sync="showDeleteModal"
                size="sm"
              >
                <template #footer>
                  <CButton color="danger" @click="deleteAppVersion(isDataDeleteModal.id)"
                    >Xóa</CButton
                  >
                  <CButton color="secondary" @click="showDeleteModal = false"
                    >Đóng</CButton
                  >
                </template>
                Bạn thực sự muốn xóa App Version này ?
              </CModal>
            </CRow>
        </CCardBody> 

      </CCard>
      </transition>
    </CCol>
  </CRow>
</div>
  
</template>

<script>
import axios from 'axios'

export default {
  name: 'Versions',
  data: () => {
    return {
      id: "",
      version: "",
      action: "add",
      items: [],
      fields: [
        {
          key: 'version',
          label: 'Version'
        },
        {
          key: 'edit',
          label: 'Sửa'
        },
        {
          key: 'delete',
          label: 'Xóa'
        }],
      message: '',
      showDismissibleAlert: false,
      showDeleteModal: false,
      isDataDeleteModal: '',

    }
  },
  computed: {
  },
  methods: {
    
    getMobileVersions (){
      let self = this;
       axios
      .get(this.$apiAdress + "/api/mobile-version", {
        params: {
          token: localStorage.getItem("api_token"),
        },
      })
      .then(function (response) {
        self.items = response.data;
      }).catch(function (error) {
        console.log(error);
      });
    },

    store(){
      if (this.version == "") {
        this.$toast.error("App Version không được để trống");
        return;
      }
      axios
      .post(this.$apiAdress + "/api/mobile-version/store",{
        version: this.version,
        token: localStorage.getItem("api_token"),
      })
      .then((response) => {
        this.status = response.data.status
        if(this.status == "success"){
          this.$toast.success("Đã thêm mới App Version");
        }
        this.getMobileVersions();
      })
      .catch((error) => {
        this.$toast.error("App Version này đã tồn tại");
      })
    },

    deleteAppVersion(id){
      axios
      .delete(this.$apiAdress + "/api/mobile-version/" + id,{
        params:{
          token: localStorage.getItem("api_token"),
        }
      })
      .then((response) => {
        this.$toast.success("Đã xóa App Version");
        this.getMobileVersions();
        this.showDeleteModal = false;
      })
      .catch((error) => {
        console.log(error);
      })
    },

    saveEditAppVerSion(){
      if(this.version == null){
        this.$toast.error("App Version không được để trống");
        return;
      }
      axios
      .post(this.$apiAdress + "/api/mobile-version/update", {
        id: this.id,
        version: this.version,
        token: localStorage.getItem("api_token"),
      })
      .then((response) => {
        this.$toast.success("Đã cập nhật App Version");
        this.getMobileVersions();
        this.action = "add";
        this.version = "";
      })
      .catch((error) =>{
        console.log(error)
        this.$toast.error("App Version đã tồn tại");
      })
    },

    handleButtonEdit(item) {
      let self = this;
      self.id = item.id;
      self.version = item.version;
      self.action = "edit";
    },  

    handleButtonCancel() {
      let self = this;
      self.id = -1;
      self.version = "";
      self.action = "add";
    },

    handleModalDelete(item){
      let self = this;
      self.showDeleteModal = true;
      self.isDataDeleteModal = item;
    },

    enter(){
      switch(this.action){
        case "add":
          this.store();
          break;
        case "edit":
          this.saveEditAppVerSion();
          break;  
      }
    }

  },

  mounted: function () {
    this.getMobileVersions();
  },

}
</script>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
</style>