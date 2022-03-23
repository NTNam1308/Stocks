<template>
  <CCard>
    <CCardBody>
      <CRow>
        <CElementCover
          :opacity="1"
          v-if="is_loading"
          :style="
            $store.state.darkMode
              ? { 'background-color': 'fff' }
              : { 'background-color': '000' }
          "
          ><CSpinner size="5xl" color="success" />
        </CElementCover>
        <CCol sm="12" v-if="!is_loading">
          <p class="font-weight-bold h4">Báo cáo phân tích</p>
          <CDataTable
            :items="list_document"
            :fields="list_document_fields"
            :items-per-page="15"
            pagination
            hover
          >
            <template #no-items-view>
              <p class="text-center h5"></p>
            </template>
            <template #link="{ item }">
              <td
                class="text-center cursor-pointer"
                @click="goto_link(item.link)"
              >
                <CIcon name="cil-vertical-align-bottom" class="pb-1" />Tải xuống
              </td>
            </template>
            <template #stockcode>
              <td class="text-left">
                {{ $store.state.mack }}
              </td>
            </template>
             <template #date="{ item }">
              <td class="text-center">
                {{ item.date }}
              </td>
            </template>
            <template #source="{ item }">
              <td class="text-center">
                {{ item.source }}
              </td>
            </template>
          </CDataTable>
        </CCol>
      </CRow>
    </CCardBody>
  </CCard>
</template>

<script>
import axios from "axios";

export default {
  name: "ReportAnalysis",
  created() {
    this.mackChange();
  },

  data() {
    return {
      is_loading: false,
      list_year: [],
      list_document: [],
      list_document_fields: [
        { key: "stockcode", _style: "max-width:10%", label: "Mã CK" },
        { key: "title", _style: "min-width:50px", label: "Tên báo cáo" },
        { key: "date", _style: "max-width:10%;text-align: center", label: "Ngày" },
        { key: "source", _style: "max-width:10%;text-align: center", label: "Nguồn" },
        {
          key: "link",
          _style: "max-width:10%;text-align:center",
          label: "Link tải",
        },
      ],
    };
  },
  methods: {
    getListDocument() {
      let self = this;
      self.is_loading = true;
      self.list_document = [];
      axios
        .get(self.$apiAdress + "/api/stocks/report_analysis/get-report", {
          params: {
            mack: self.$store.state.mack,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((response) => {
          self.list_document = response.data;
          self.is_loading = false;
        })
        .catch((err) => {
          self.is_loading = false;
          console.error(err);
          self.list_document = [];
        });
    },
    mackChange() {
      this.getListDocument();
    },
    goto_link(link) {
      var win = window.open(link, "_blank");
      if (win) {
        //Browser has allowed it to be opened
        win.focus();
      } else {
        //Browser has blocked it
        alert("Please allow popups for this website");
      }
      // window.location.href = link;
    },
  },
  computed: {},
  watch: {
    "$store.state.mack": function () {
      this.mackChange();
    },
    active_year: function () {
      this.mackChange();
    },
  },
};
</script>
<style lang="scss">
.custom-control {
  margin-bottom: 1rem;
}
.custom-control-input {
  cursor: pointer;
}
.custom-control-label {
  cursor: pointer;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
