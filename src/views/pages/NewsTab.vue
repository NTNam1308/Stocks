<template>
  <div>
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
            <p class="font-weight-bold h4">Chọn thời gian</p>
            <CInput type="date" label="Từ ngày" v-model="from_date" />
            <CInput type="date" label="Đến ngày" v-model="to_date" />
            <CButton @click="filterByDate" class="float-right" color="primary"
              >Tìm kiếm</CButton
            >
          </CCol>
          <CCol sm="10" v-if="!is_loading">
            <p class="font-weight-bold h4">Tin tức</p>
            <CDataTable
              :items="list_news"
              :fields="list_news_fields"
              :items-per-page="15"
              hover
            >
              <template #no-items-view>
                <p class="text-center h5">Không có dữ liệu</p>
              </template>
              <template #title="{ item }">
                <td @click="openPopupNews(item.id)" class="cursor-pointer">
                  {{ item.title }}
                  <CBadge v-if="item.compare_date <= 2" color="info">
                  Tin mới
                  </CBadge>
                </td>
              </template>
            </CDataTable>
            <template v-if="list_news.length > 0">
              <CPagination
                :activePage.sync="current_page"
                :pages="count_page"
                align="start"
              />
            </template>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
    <CModal
      title="Chi tiết tin tức"
      :centered="true"
      :show.sync="isShowModal"
      size="lg"
      class="modal-hide-header-footer"
    >
    <div class="overflow-auto" style="height: 70vh">
      <div v-html="content_news" class="pl-4 pr-4"></div>
    </div>
    </CModal>
  </div>
</template>

<script>
import axios from "axios";
import moment from 'moment'

export default {
  name: "NewsTab",
  created() {
    this.getCountPage();
    this.getListNews();
  },

  data() {
    let return_data = {
      is_loading: false,
      list_news: [],
      list_news_fields: [
        { key: "date", _style: "min-width:50px", label: "Thời gian" },
        { key: "title", _style: "min-width:50px", label: "Tiêu đề" },
      ],
      current_page: 1,
      from_date: new Date(Date.now()).toISOString().substr(0, 10),
      to_date: new Date(Date.now()).toISOString().substr(0, 10),
      count_page: 0,
      is_filter_by_date: false,
      isShowModal: false,
      content_news: null,
    };
    return return_data;
  },
  methods: {
    getCountPage(from_date = "", to_date = "") {
      let self = this;
      axios
        .get(self.$apiAdress + "/api/stocks/news/get-count-page-news", {
          params: {
            mack: self.$store.state.mack,
            from_date: from_date,
            to_date: to_date,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((response) => {
          self.count_page = Math.ceil(response.data / 20);
        })
        .catch((err) => {
          console.error(err);
          self.count_page = 0;
        });
    },
    getListNews(from_date = "", to_date = "") {
      let self = this;
      self.list_news = [];
      self.is_loading = true;
      axios
        .get(self.$apiAdress + "/api/stocks/news/get-list-news", {
          params: {
            mack: self.$store.state.mack,
            from_date: from_date,
            to_date: to_date,
            page: self.current_page,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((response) => {
          for (let item of response.data) {

            // convert hour to 12:00:00
            const date_news = moment(item.date).utcOffset(0); // item.date
            date_news.set({hour:12,minute:0,second:0,millisecond:0})
            date_news.toISOString()
            date_news.format()

            // convert hour to 12:00:00
            var current_date = moment().utcOffset(0); // today
            current_date.set({hour:12,minute:0,second:0,millisecond:0})
            current_date.toISOString()
            current_date.format()

            const diff = current_date - date_news;
            var result = Math.round(diff / 8.64e7)
            
            self.list_news.push({
              ...item,
              compare_date: result,
            });
          }
          self.is_loading = false;
        })
        .catch((err) => {
          console.error(err);
          self.list_news = [];
          self.is_loading = false;
        });
    },
    filterByDate() {
      this.current_page = 1;
      this.getCountPage(this.from_date, this.to_date);
      this.getListNews(this.from_date, this.to_date);
      this.is_filter_by_date = true;
    },
    getContentNews(id) {
      let self = this;
      self.is_loading = true;
      axios
        .get(self.$apiAdress + "/api/stocks/news/get-content-news", {
          params: {
            mack: self.$store.state.mack,
            id: id,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((response) => {
          self.content_news = response.data;
          self.is_loading = false;
        })
        .catch((err) => {
          console.error(err);
          self.content_news = null;
          self.is_loading = false;
          self.list_document = [];
        });
    },
    openPopupNews(id) {
      this.isShowModal = true;
      this.getContentNews(id);
    },
  },
  computed: {
  },
  watch: {
    "$store.state.mack": function () {
      this.getCountPage();
      this.getListNews();
    },
    current_page: function () {
      if (this.is_filter_by_date) {
        this.getListNews(this.from_date, this.to_date);
      } else {
        this.getListNews();
      }
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
.table {
  td {
    padding: 0;
    white-space: pre-wrap;
  }
}
.modal-hide-header-footer {
  .modal-content {
    .modal-header {
      padding: 0.5rem;
    }
    .modal-body {
      padding: 0;
    }
    .modal-footer {
      display: none;
    }
  }
}
.pTitle {
  font-size: 1.6rem;
  padding-top: 0.5rem;
  font-weight: bold;
  line-height: 1.6rem;
}
#ctl00_ContentPlaceHolder1_ChiTietTin1_NewsContent1_ucStockNewsDetail1_divImage {
  display: none;
}
</style>
