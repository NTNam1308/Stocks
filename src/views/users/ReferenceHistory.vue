<template>
<div>
  <CRow>
    <CCol col="12" lg="2">
    </CCol>
    <CCol col="12" lg="8">
      <transition name="slide">
      <CCard>
        <CCardBody :class="{'set-height': referenceHistoryLenght <= '9'}">
            <CDataTable
              sorter
              hover
              striped
              :noItemsView="{ noResults: '', noItems: 'Chưa giới thiệu' }"
              :items="items"
              :fields="fields"
              :itemsPerPageSelect="{
                label: 'Số lượng:',
                values: [10, 20, 50, 100],
              }"
              :tableFilter="{ label:'Tìm Kiếm', placeholder: ' ' }"
              :items-per-page="10"
              pagination
            >
             <template #index="{ item }">
                <td>
                  {{ item.index }}
                </td>
              </template>
              <template #content="{ item }">
                <td>
                  {{ item.content }}
                </td>
              </template>
            </CDataTable>
        </CCardBody> 
      </CCard>
      </transition>
    </CCol>
    <CCol col="12" lg="2">
    </CCol>
  </CRow>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ManagerReferenceCode',
  data: () => {
    return {
      items: [],
      fields: [
        { key: "index", _style: "width:5%", label: "STT" },
        { key: "content", _style: "width:95%;  text-align: center;", label: "Lịch sử giới thiệu" },
      ],
      message: '',
      dismissSecs: 7,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      referenceHistoryLenght: '',
    }
  },
  computed: {
  },
  methods: {
    getReferenceLog (){
      let self = this;
       axios
      .get(this.$apiAdress + "/api/user-logs/reference", {
        params: {
          token: localStorage.getItem("api_token"),
        },
      })
      .then(function (response) {
          let data = response.data.log;
          for(let i = 0; i < data.length; i++){
              let log_res = JSON.parse( data[i]['log']);
              if(data[i]['log_type'] == 'reference_success'){
                let reference_success =  log_res.date +" : Bạn đã giới thiệu thành công thành viên " +  log_res.new_user + " tham gia KungFuStocksPro và nhận thêm "+log_res.discount +" tháng sử dụng ";
              self.items.push({index: (i+1), content: reference_success});
              }else if(data[i]['log_type'] == 'active_reference_success'){
                let active_reference_success = log_res.date +" : Bạn đã tham gia KungFuStocksPro cùng thành viên "+log_res.referencer + " và nhận thêm  "+log_res.discount +" tháng sử dụng";
                self.items.push({index: (i+1), content: active_reference_success});
              }
          }
          self.referenceHistoryLenght = data.length
      }).catch(function (error) {
        console.log(error);
      });
    },
    countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
    },
    showAlert() {
        this.dismissCountDown = this.dismissSecs
    },
  },

  created(){
      this.getReferenceLog();
  },

}
</script>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
.set-height{
  height: 600px;
}
</style>