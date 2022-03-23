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

        <CCol sm="2" class="border-right">
          <p class="font-weight-bold h4">Chọn năm</p>
          <CInputRadioGroup
            :options="option_year"
            :checked.sync="active_year"
            custom
          />
        </CCol>
        <CCol sm="10" v-if="!is_loading">
          <p class="font-weight-bold h4">Tài liệu</p>
          <CDataTable
            :items="list_document_computed"
            :fields="list_document_fields"
            :items-per-page="15"
            pagination
            hover
            
          >
            <template #no-items-view>
              <p class="text-center h5"></p>
            </template>
            <template #link_download="{ item }">
              <td
                class="text-center cursor-pointer"
                @click="goto_link(item.link_download)"
              >
                <CIcon name="cil-vertical-align-bottom" class="pb-1" />Tải xuống
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
  name: "Document",
  created() {
    this.mackChange();
  },

  data() {
    return {
      is_loading: false,
      list_year: [],
      list_document: [],
      list_document_fields: [
        { key: "mack", _style: "max-width:10%", label: "Mã CK" },
        { key: "fullname", _style: "min-width:50px", label: "Tên tài liệu" },
        {
          key: "link_download",
          _style: "max-width:10%;text-align:center",
          label: "Link tải",
        },
      ],
      active_year: "*",
    };
  },
  methods: {
    getListYear() {
      let self = this;
      axios
        .get(self.$apiAdress + "/api/stocks/document/get-year", {
          params: {
            mack: self.$store.state.mack,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((response) => {
          self.list_year = response.data;
        })
        .catch((err) => {
          console.error(err);
          self.list_year = [];
        });
    },
    getListDocument() {
      let self = this;
      self.is_loading = true;
      axios
        .get(self.$apiAdress + "/api/stocks/document/get-document", {
          params: {
            mack: self.$store.state.mack,
            year: self.active_year,
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
      this.getListYear();
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
  computed: {
    option_year() {
      let return_data = this.list_year.map((item) => {
        return {
          value: item,
          label: item,
        };
      });
      return_data.unshift({
        value: "*",
        label: "Tất cả",
      });
      return return_data;
    },
    list_document_computed() {

      var data = [];
      for (let i = 0; i < this.list_document.length; i++) {
        let current_quarter = "";

        if(this.list_document[i].fullname.includes("quý 1")) current_quarter = "1";
        if(this.list_document[i].fullname.includes("quý 2")) current_quarter = "2";
        if(this.list_document[i].fullname.includes("quý 3")) current_quarter = "3";
        if(this.list_document[i].fullname.includes("quý 4")) current_quarter = "4";
        data.push(
          {
            mack:this.list_document[i].mack,
            fullname:this.list_document[i].fullname,
            link_download:this.list_document[i].link,
            quarter: current_quarter,
            year: this.list_document[i].year,
          }
        );
      }
      function quarterYear(a, b) {
        if (a.year < b.year) return 1;
        if (a.year > b.year) return -1;
        if (a.quarter < b.quarter) return 1;
        if (a.quarter > b.quarter) return -1;
        return 0;
      }
      return [...data].sort(quarterYear);
    },

  },
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
