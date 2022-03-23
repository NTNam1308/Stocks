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
              :items="items"
              :fields="fields"
              :noItemsView="{ noResults: '', noItems: 'Chưa giới thiệu' }"
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
      demos: [1,3,4,5,7,8],
      fields: [
        { key: "index", _style: "width:5%", label: "STT" },
        { key: "content", _style: "width:95%;  text-align: center;", label: "Lịch sử giới thiệu" },
      ],
      message: '',
      dismissSecs: 7,
      dismissCountDown: 0,
      showDismissibleAlert: false
    }
  },
  computed: {
  },
  methods: {
    getReferenceLog (){
      let self = this;
       axios
      .get(this.$apiAdress + "/api/users/" + localStorage.getItem("user_id")+ "/reference-log", {
        params: {
          token: localStorage.getItem("api_token"),
        },
      })
      .then(function (response) {
          let data = response.data.data;
          for(let i = 0; i < data.length; i++){
              let log = JSON.parse( data[i]['log']);
              self.items.push({index: (i+1), content: log.date + ": " + log.new_user + " đã được giới thiệu từ " + log.referencer});
          }
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
    goBack() {
      this.$router.go(-1)
    }
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