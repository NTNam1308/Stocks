<template>
  <div>
    <CCard>
      <CCardBody>
        <CRow>
          <CCol>
            <p class="font-weight-bold h4">Tin tức liên quan</p>
            <div class="position-relative table-responsive news-hover">
              <table class="table mb-0">
                <thead>
                  <tr>
                    <th class="text-center">Mã CK</th>
                    <th class="pl-5">Tin tức</th>
                  </tr>
                </thead>
                <tbody class="position-relative news-hover-tr ">
                  <tr v-for="(item, index) in list_news_item" :key="index" class=" news-hover-tr2">
                    <td
                      class="text-center-center"
                      @click="showModalTradingChart(item.mack)"
                    >
                      <CLink>
                        <b>{{ item.mack }}</b>
                      </CLink>
                    </td>
                    <td class="verticle-align-middle">
                      <ul class="mb-0 pt-1 pb-1">
                        <CLink
                          v-for="(item_news, i) in item.list_news"
                          :key="i"
                          @click="openPopupNews(item_news.id)"
                          class="cursor-pointer"
                        >
                          <li >
                            {{ item_news.title }}
                            <CBadge v-if="item_news.compare_date <= 2" color="info">
                               Tin mới</CBadge>
                          </li>
                        <span class="pr-2 hover_color "
                        :style="
                          $store.state.darkMode
                            ? { 'color': '#929292' }
                            : { 'color': '#7e7e7e' }
                          "
                        > {{ item_news.format_date }}</span>
                        </CLink>
                        <CLink
                          class="text-red-color"
                          @click="goto_news(item.mack)"
                          >Xem tiếp >></CLink
                        >
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
    <CModal
      title="Chi tiết tin tức"
      :show.sync="isShowModal"
      :centered="true"
      size="xl"
      class="modal-hide-header-footer"
    >
      <div class="overflow-auto" style="height: 70vh; overflow-x: hidden">
        <div v-html="content_news" class="pl-4 pr-4"></div>
      </div>
    </CModal>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "NewsRelated",
  created() {
    this.getListNews();
  },
  props: {
    mack: Array,
  },
  data() {
    let return_data = {
      is_loading: false,
      list_news: [],
      list_news_fields: [
        { key: "date", _style: "min-width:50px", label: "Thời gian" },
        { key: "title", _style: "min-width:50px", label: "Tiêu đề" },
      ],
      isShowModal: false,
      content_news: null,
    };
    return return_data;
  },
  methods: {
    diffForHumans(times) {
      const convertTime = moment(times);
      const timeNow = new Date();
      const convertTimeNow = moment(timeNow);
      const duration = moment.duration(convertTimeNow.diff(convertTime));
      const seconds = duration.seconds();
      const minutes = duration.minutes();
      const hours = duration.hours();
      const days = duration.days();
      const weeks = duration.weeks();
      const months = duration.months();
      const years = duration.years();
      if (years > 0) {
        return years + " năm trước";
      }
      if (months > 0) {
        return months + " tháng trước";
      }
      if (weeks > 0) {
        return weeks + " tuần trước";
      }
      if (days > 0) {
        return days + " ngày trước";
      }
      if (hours > 0) {
        return hours + " giờ trước";
      }
      if (minutes > 0) {
        return minutes + " phút trước";
      }
      if (seconds > 0) {
        return seconds + " giây trước";
      }
    },
    showModalTradingChart(mack) {
      this.$store.state.mackTradingChart = mack;
      this.$store.state.isShowModalTradingChart = true;
    },
    getListNews() {
      let self = this;
        if(self.mack.length == 0) {
           self.list_news =  [];
          return;
        }
         
      axios
        .get(self.$apiAdress + "/api/stocks/news/get-list-news-related", {
          params: {
            mack: self.mack,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((response) => {
          self.list_news = response.data;
        })
        .catch((err) => {
          console.error(err);
          self.list_document = [];
        });
    },
    getContentNews(id) {
      let self = this;
      self.is_loading = true;
      axios
        .get(self.$apiAdress + "/api/stocks/news/get-content-news", {
          params: {
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
    goto_news(mack) {
      this.$store.state.mack = mack;
      this.$router.push("phan-tich-doanh-nghiep?tab=tin-tuc");
    },
  },
  computed: {
    list_news_item() {
      let return_data = [];
      if (this.list_news.length > 0) {
        let temp_mack = this.list_news[0].mack;
        let temp_item = {
          mack: temp_mack,
          list_news: [],
        };
        for (let item of this.list_news) {
          if (item.mack != temp_mack) {
            return_data.push(temp_item);
            temp_mack = item.mack;
            temp_item = {
              mack: temp_mack,
              list_news: [],
            };
          }
          const format_date = moment(item.date).format('DD/MM/YYYY h:mm');
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

          temp_item.list_news.push({
            ...item,
            compare_date: result,
            format_date: format_date,
          });
        }
        return_data.push(temp_item);
      }
      return return_data;
    },
  },
  watch: {
    mack: {
      deep: true,
      handler() {
        this.getListNews();
      },
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
  .text-center-center {
    text-align: center;
    vertical-align: middle;
  }
  .text-red-color {
    color: #c00;
  }
}
.news-hover {
  table {
    tbody {
      tr {
        &:hover {
          td {
            background-color: #8c58b3 !important;
            ul {
              a {
                color:white;  
              }
            }
            a {
              b {
                color:white;
              } 
            }
          }
        }
      }
    }
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
.news-hover-tr2 {
  &:hover {
    .hover_color {
      color:white !important;
    }
  }
}
.pTitle {
  font-size: 1.6rem;
  padding-top: 0.5rem;
  font-weight: bold;
  line-height: 1.6rem;
}
.verticle-align-middle {
  vertical-align: middle;
}
</style>
