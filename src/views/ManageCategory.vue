<template>
  <div>
    <CCard class="mb-1">
      <CCardHeader>
        <CRow>
          <CCol sm="2">
            <CInput
              label="Tên danh mục"
              v-model="name"
              :addInputClasses="{
                'is-invalid': !is_valid_name,
              }"
            />
          </CCol>
          <CCol sm="2" class="margin-top-1-7rem">
            <template v-if="action == 'add'">
              <CButton color="success" id="addManageCategory" @click="addNewTrading()"
                ><CIcon name="cibAddthis" /> Thêm</CButton
              >
            </template>
            <template v-if="action == 'edit'">
              <CButton color="primary" id="saveEditCategory" @click="saveEditTradingMC"
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
          <CCol sm="8"> </CCol>
          <CCol sm="12">
            <div class="datatable-profit">
              <div class="position-relative table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th
                        class=""
                        style="vertical-align: middle; overflow: hidden"
                      >
                        <div>Tên danh mục hiện có</div>
                      </th>
                      <th
                        class=""
                        style="vertical-align: middle; overflow: hidden"
                      >
                        <div></div>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="position-relative">
                    <tr v-for="(item, index) in list_item_category" :key="index">
                      <td class="">{{item.name}}</td>
                      <td class="text-center">
                        <CButton
                          size="sm"
                          color="info"
                          class=""
                          @click="handleButtonEdit(item)"
                        >
                          Sửa
                        </CButton>
                        <CButton
                          size="sm"
                          color="danger"
                          class="ml-1"
                          @click="showModalDelete(item)"
                        >
                          Xóa
                        </CButton>
                      </td>
                    </tr>
                     <tr v-if="list_item_category.length == 0">
                      <td colspan="9">
                        <div class="text-center my-5">
                          <h2>Chưa có danh mục nào</h2>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CCol>
        </CRow>
      </CCardHeader>
    </CCard>
    <CModal title="Xóa dữ liệu" :show.sync="isShowDeleteModalMC" size="sm">
      <template #footer>
        <CButton color="secondary" @click="isShowDeleteModalMC = false"
          >Đóng</CButton
        >
        <CButton color="danger" id="deleteCategory" @click="saveDeleteTradingMC"
          ><CIcon name="cilTrash" /> Xóa
        </CButton>
      </template>
      <CRow>
        <CCol sm="12"
          >Những giao dịch thuộc danh mục này sẽ bị xóa hết. Bạn có chắc chắn
          không?
        </CCol>
      </CRow>
    </CModal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ManageCategory",
  data() {
    let data_return = {
      name: "",
      id: "",
      action: "add",
      is_valid_name: true,
      isShowDeleteModalMC: false,
      list_item_category: [],
      list_field_category: [
        {
          key: "name",
          label: "Tên danh mục hiện có",
          sorter: true,
          filter: true,
        },
        {
          key: "id",
          label: "",
          sorter: false,
          filter: false,
        },
      ],
    };
    return data_return;
  },
  created() {
    this.getAllItemCategory();
  },
  methods: {
    addNewTrading() {
      let self = this;
      self.is_valid_name = self.name != "";
      if (self.name == "") {
        self.$toast.error("Tên danh mục không được để trống");
        return;
      }
      axios
        .post(this.$apiAdress + "/api/stocks/category/store", {
          name: self.name,
          token: localStorage.getItem("api_token"),
        })
        .then(function (response) {
          response.data._classes = "table-success";
          self.list_item_category.unshift(response.data);
          self.$toast.success("Đã thêm mới danh mục");
          self.name = "";
          self.is_valid_name = true;
          self.$store.state.data_category = self.list_item_category;
        })
        .catch(function (error) {
          console.error(error);
          self.$toast.error("Có lỗi xảy ra, vui lòng thử lại");
        });
    },

    handleButtonEdit(item) {
      let self = this;
      self.id = item.id;
      self.name = item.name;
      self.action = "edit";
    },

    handleButtonCancel() {
      let self = this;
      self.id = -1;
      self.name = "";
      self.action = "add";
      self.is_valid_name = true;
    },

    saveEditTradingMC() {
      let self = this;
      self.is_valid_name = self.name != "";
      if (self.name == "") {
        self.$toast.error("Tên danh mục không được để trống");
        return;
      }
      axios
        .put(this.$apiAdress + "/api/stocks/category/update", {
          id: self.id,
          name: self.name,
          token: localStorage.getItem("api_token"),
        })
        .then(function (response) {
          response.data._classes = "table-info";
          self.list_item_category.forEach((item, i) => {
            if (item.id == response.data.id) {
              self.list_item_category.splice(i, 1);
            }
          });
          self.list_item_category.unshift(response.data);
          self.$toast.success("Đã cập nhật giao dịch");
          self.handleButtonCancel();
          self.is_valid_name = true;
          self.$store.state.data_category = self.list_item_category;
        })
        .catch(function (error) {
          console.error(error);
          self.$toast.error("Có lỗi xảy ra, vui lòng thử lại");
        });
    },

    showModalDelete(item) {
      let self = this;
      self.id = item.id;
      self.isShowDeleteModalMC = true;
    },

    saveDeleteTradingMC() {
      let self = this;
      axios
        .delete(this.$apiAdress + "/api/stocks/category/" + self.id, {
          params: {
            token: localStorage.getItem("api_token"),
          },
        })
        .then(function () {
          self.list_item_category.forEach((item, i) => {
            if (item.id == self.id) {
              self.list_item_category.splice(i, 1);
            }
          });
          self.$toast.success("Đã xóa danh mục thành công");
          self.isShowDeleteModalMC = false;
          self.$store.state.data_category = self.list_item_category;
          let temp_data = [];
          for (const item of self.$store.state.data_trading_log) {
            if (item.danh_muc != self.id) {
              temp_data.push(item);
            }
          }
          self.$store.state.data_trading_log = temp_data;
        })
        .catch(function (error) {
          console.error(error);
          self.isShowDeleteModalMC = false;
          self.$toast.error("Có lỗi xảy ra, vui lòng thử lại");
        });
    },

    getAllItemCategory() {
      let self = this;
      axios
        .get(this.$apiAdress + "/api/stocks/category/get-all", {
          params: {
            token: localStorage.getItem("api_token"),
          },
        })
        .then(function (response) {
          self.list_item_category = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
  mounted() {
    let self = this;
    window.addEventListener('keyup', event => {
      if (event.keyCode === 13) { 
        if(self.isShowDeleteModalMC){
          document.getElementById("deleteCategory").click();
        }
        if(self.action == "edit"){
          document.getElementById("saveEditCategory").click();
        }
        if(self.name != '' && self.action != "edit" ){
           document.getElementById("addManageCategory").click();
        }
      }
    })
  }
};
</script>
<style lang="scss">
.datatable-trading-log {
  .table {
    td {
      padding: 0.15rem 0.75rem !important;
    }
  }
}
.margin-top-1-7rem {
  margin-top: 1.7rem;
}
</style>
