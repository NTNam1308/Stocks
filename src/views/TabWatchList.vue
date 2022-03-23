<template>
  <div>
    <div class="d-flex">
      <CSelect
        :options="option_filter_category"
        :value.sync="current_category_id"
        class="mb-2"
        style="flex: 1"
      >
      </CSelect>
      <CDropdown
        placement="bottom-start"
        add-menu-classes=""
        class="pl-2 pr-1 mt-2"
      >
        <template #toggler>
          <CIcon
            :name="icon_name"
            style="margin-top: -5px; cursor: pointer"
          />
        </template>
        <div class="px-1">
          <CDropdownItem
            v-for="(item, i) in list_filter_item"
            :key="i"
            class="d-flex justify-content-between px-2"
            @click="data_filter_item = item.value"
          >
            <div>
              {{ item.label }}
            </div>
            <div class="pl-3" v-if="data_filter_item == item.value">
              <CIcon name="cilCheckAlt" />
            </div>
          </CDropdownItem>
        </div>
      </CDropdown>
    </div>
    <CTabs :justified="true" addNavClasses="custom-padding-tab-watchlist-item">
      <CTab title="Danh sách">
        <virtual-list
          v-if="data_filter_item != 10"
          class="table-scroll-watchlist-mack scroll-touch"
          :style="[
            current_category_id.includes('watchlist')
              ? { height: 'calc(100vh - 200px)' }
              : { height: 'calc(100vh - 170px)' },
          ]"
          :data-key="'id'"
          :data-component="itemMackComponent"
          :data-sources="list_mack_sorted"
          :estimate-size="70"
          :extra-props="{
            onItemClick: handleClickItemWatchListMack,
            onDeleteItemClick: handleClickDeleteItemWatchListMack,
            currentCategoryId: current_category_id,
            currentMack: mack
          }"
        >
        </virtual-list>
        <draggable
          v-if="data_filter_item == 10"
          v-model="data_list_mack_watch_list"
          v-bind="dragOptions"
          @start="drag = true"
          @end="drag = false"
          class="table-scroll-watchlist-mack scroll-touch"
          :style="[
            current_category_id.includes('watchlist')
              ? { height: 'calc(100vh - 200px)' }
              : { height: 'calc(100vh - 170px)' },
          ]"
        >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <ItemWatchListMackDrag
            v-for="(item, index) in data_list_mack_watch_list"
            :source="item"
            :info="list_mack_info[item.mack]"
            :onItemClick="handleClickItemWatchListMack"
            :onDeleteItemClick="handleClickDeleteItemWatchListMack"
            :currentCategoryId="current_category_id"
            :currentMack="mack"
            :key="index"
          />
        </transition-group>
        </draggable>
        <div
          style="
            display: flex;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
          "
        >
          <CButton
            v-if="current_category_id.includes('watchlist')"
            @click="show_modal_add_mack = true"
            color="info"
            class="border-right"
            style="flex: 0 0 100%; border-radius: 3px 3px 0px 3px"
            ><CIcon name="cilPlaylistAdd" style="margin-bottom: 6px" /> Thêm mã
            mới</CButton
          >
          <CButton
            v-if="false"
            color="info"
            style="flex: 0 0 50%; border-radius: 0px 3px 3px 0px"
            ><CIcon
              name="cilLineSpacing"
              style="height: 0.8rem; margin-bottom: 6px"
            />
            Sắp xếp</CButton
          >
        </div>
      </CTab>
      <CTab title="Tin tức liên quan">
        <virtual-list
          ref="list_item_news"
          class="table-scroll-watchlist-news scroll-touch"
          :data-key="'id'"
          :data-component="itemNewsComponent"
          :data-sources="list_news"
          :estimate-size="70"
          :extra-props="{ onItemClick: showModal }"
          v-on:tobottom="onScrollToBottom"
        >
          <div slot="footer">
            <CButton
              @click="hanldeClickScrollTop"
              color="light"
              size="sm"
              style="position: absolute; bottom: 10px; left: 50%; z-index: 99"
            >
              <CIcon name="cilArrowTop" />
            </CButton>
            <div
              class="loader"
              v-if="!is_getting_data_news && !is_no_data_news"
            ></div>
          </div>
        </virtual-list>
      </CTab>
    </CTabs>
    <CModal
      title=" Chi tiết tin tức"
      :show.sync="show_modal_news"
      size="xl"
      :centered="true"
      class="modal-hide-header-footer"
    >
      <div class="overflow-auto" style="height: 70vh; overflow-x: hidden">
        <div class="pl-5 pr-5 pt-2" v-html="content_news"></div>
      </div>
    </CModal>
    <CModal
      title=" Thêm mã CK vào watchlist"
      :show.sync="show_modal_add_mack"
      size="sm"
      style="background-color: transparent"
      class="modal-hide-header-footer"
    >
      <div
        style="position: relative"
        class="px-2"
        v-bind:class="{ show: openSuggestion }"
      >
        <CInput
          label="Mã CK"
          v-model="mack_add_watchlist"
          placeholder="Nhập mã CK"
          @keyup.enter="enter"
          @keydown.down="down"
          @keydown.up="up"
          @input="change"
          :addInputClasses="{
            'is-invalid': !is_valid_mack_add_watchlist,
          }"
          class="mb-1"
        >
        </CInput>
        <CListGroup
          v-if="openSuggestion"
          class="dropdown-menu pb-0 pt-0"
          style="
            width: 100%;
            left: 0;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
          "
          :class="{ show: open }"
        >
          <CListGroupItem
            href="#"
            v-for="(item, index) in suggestions"
            :key="index"
            @click="suggestionClick(index)"
            :class="{ active: isActive(index) }"
          >
            <table style="width: 100%">
              <tr>
                <td class="font-weight-bold" style="width: 20%">
                  {{ item.mack }}
                </td>
                <td>{{ item.ten_cong_ty }}</td>
              </tr>
            </table>
          </CListGroupItem>
        </CListGroup>
      </div>
    </CModal>
  </div>
</template>

<script>
import VirtualList from "vue-virtual-scroll-list";
import axios from "axios";
import ItemWatchListMack from "./ItemWatchListMack";
import ItemWatchListMackDrag from "./ItemWatchListMackDrag";
import ItemWatchListNews from "./ItemWatchListNews";
import draggable from "vuedraggable";

export default {
  name: "TabWatchList",
  components: {
    VirtualList,
    draggable,
    ItemWatchListMackDrag,
  },
  data() {
    return {
      drag: false,
      data_list_mack_watch_list: [],
      itemMackComponent: ItemWatchListMack,
      itemNewsComponent: ItemWatchListNews,
      list_news: [],
      content_news: null,
      show_modal_news: false,
      show_modal_add_mack: false,
      option_filter_category: [],
      current_category_id: "",
      open: false,
      current: 0,
      mack_add_watchlist: "",
      timer: 0,
      suggestions: [],
      is_valid_mack_add_watchlist: true,
      current_page_news: 1,
      is_getting_data_news: false,
      is_no_data_news: false,
      list_filter_item: [
        {
          value: 1,
          label: "Sắp xếp theo A-Z",
        },
        {
          value: 2,
          label: "Sắp xếp theo Z-A",
        },
        {
          value: 3,
          label: "Sắp xếp theo giá tăng-giảm",
        },
        {
          value: 4,
          label: "Sắp xếp theo giá giảm-tăng",
        },
        {
          value: 5,
          label: "Sắp xếp theo % giá tăng-giảm",
        },
        {
          value: 6,
          label: "Sắp xếp theo % giá giảm-tăng",
        },
        {
          value: 10,
          label: "Tùy chọn",
        },
      ],
      data_filter_item: 1,
      is_first_set_data: true,
    };
  },
  props: {
    mack: {
      type: String,
    },
  },
  created() {
    const data_filter_item = localStorage.getItem(
      "data_filter_item"
    );
    if (data_filter_item != null) {
      this.data_filter_item = parseInt(data_filter_item);
    }
    this.getDataInit();
    this.getListNews();
    this.getMyWatchlist();
  },
  methods: {
    onScrollToBottom() {
      this.getListNews();
    },
    hanldeClickScrollTop() {
      if (this.list_news.length > 0) this.$refs.list_item_news.scrollToIndex(0);
    },
    getDataInit() {
      if (this.list_mack.length > 0) {
        window.socket_send.emit("getlive", this.list_mack, (res) => {
          if (!res) return;
          for (let i = 0; i < res["stockcode"].length; i++) {
            const stockcode = res["stockcode"][i];
            let item = {
              cl: res["cl"][i],
              lastprice: res["lastprice"][i],
              change:
                res["cl"][i] == "d" || res["cl"][i] == "f"
                  ? -res["change"][i]
                  : res["change"][i],
              perchange:
                res["cl"][i] == "d" || res["cl"][i] == "f"
                  ? -res["perchange"][i]
                  : res["perchange"][i],
              stockcode: res["stockcode"][i],
              totalval: (res["totalvol"][i] * res["lastprice"][i]) / 1000000,
              totalvol: res["totalvol"][i],
            };
            this.$store.state.data_eod[stockcode] = item;
          }
        });
        // window.socket_send.emit("join", this.list_mack);
      }
    },
    getListNews() {
      let self = this;
      if (self.mack == "" || self.is_getting_data_news) return;
      self.is_getting_data_news = true;
      const item_per_page = 20;
      axios
        .get(self.$apiAdress + "/api/stocks/news/get-list-news", {
          params: {
            mack: self.mack,
            page: self.current_page_news,
            item_per_page: item_per_page,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((res) => {
          if (res.data.length == 0) self.is_no_data_news = true;
          for (let item of Object.values(res.data)) {
            let image = item.image;
            if (!image) {
              image = "/img/default.jpg";
            } else {
              image = image.replace(
                /http:\/\/cafef.vcmedia.vn\/thumb_w\/252/gi,
                "https://cafefcdn.com/thumb_w/650"
              );
              image = image.split("/");
              let last_item_link = image.pop();
              last_item_link = last_item_link.split(".");
              last_item_link = last_item_link.pop();
              image[image.length - 1] =
                image[image.length - 1] + "." + last_item_link;
              image = image.join("/");
            }
            self.list_news.push({
              ...item,
              image: image,
              id: item.id,
            });
          }
          this.current_page_news++;
          self.is_getting_data_news = false;
        })
        .catch((err) => {
          console.error(err);
          self.is_no_data_news = true;
          self.list_news = [];
          self.is_getting_data_news = false;
        });
    },
    showModal(id) {
      this.show_modal_news = true;
      this.content_news = null;
      let self = this;
      axios
        .get(self.$apiAdress + "/api/stocks/news/get-content-news", {
          params: {
            id: id,
            token: localStorage.getItem("api_token"),
          },
        })
        .then((response) => {
          self.content_news = response.data;
        })
        .catch((err) => {
          console.error(err);
          self.content_news = null;
        });
    },
    handleClickItemWatchListMack(mack, event) {
      if (event.target.classList.value.includes("dropdown-watchlist-item")) {
        return;
      }
      if (event.target.nodeName == "path") {
        return;
      }
      this.$emit("handleItemClick", mack);
    },
    handleClickDeleteItemWatchListMack(id) {
      let self = this;
      axios
        .delete(this.$apiAdress + "/api/watchlist/" + id, {
          params: {
            token: localStorage.getItem("api_token"),
          },
        })
        .then(function (response) {
          self.data_list_mack_watch_list.forEach((item, i) => {
            if (item.id == id) {
              self.data_list_mack_watch_list.splice(i, 1);
            }
          });
          self.$toast.success("Xóa dữ liệu thành công");
        })
        .catch(function (error) {
          console.error(error);
          self.$toast.error("Có lỗi xảy ra, vui lòng thử lại");
        });
    },
    getMyWatchlist() {
      let self = this;
      self.option_filter_category = [];
      axios
        .get(self.$apiAdress + "/api/stocks/ta_watchlist/get-list-category", {
          params: {
            token: localStorage.getItem("api_token"),
          },
        })
        .then(function (res) {
          if (res.data.length > 0) {
            self.option_filter_category = res.data.map((item) => {
              return {
                value: item.id,
                label: item.name,
                readonly: item.readonly,
              };
            });
            const user_id = localStorage.getItem("user_id");
            const watchlist_category_id_saved = localStorage.getItem(
              "watchlist_" + user_id
            );
            if (watchlist_category_id_saved != null) {
              let check_category_id_exist = false;
              for (let item of self.option_filter_category) {
                if (item.value == watchlist_category_id_saved) {
                  check_category_id_exist = true;
                  break;
                }
              }
              if (check_category_id_exist) {
                self.current_category_id = watchlist_category_id_saved;
              } else {
                self.current_category_id = self.option_filter_category[0].value;
              }
            } else {
              self.current_category_id = self.option_filter_category[0].value;
            }
            setTimeout(() => {
              self.is_first_set_data = false;
            }, 1000);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    getAllItemWatchList() {
      let self = this;
      axios
        .get(
          this.$apiAdress +
            "/api/stocks/ta_watchlist/get-list-mack-by-category",
          {
            params: {
              category_id: self.current_category_id,
              token: localStorage.getItem("api_token"),
            },
          }
        )
        .then(function (response) {
          self.data_list_mack_watch_list = response.data.map((item) => {
            return {
              id: item.id,
              mack: item.mack,
            };
          });
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    enter() {
      if (this.openSuggestion) {
        this.mack_add_watchlist = this.suggestions[this.current].mack;
        this.open = false;
        this.addNewWatchlist();
      }
    },

    up() {
      if (this.current > 0) this.current--;
    },

    down() {
      if (this.current < this.suggestions.length - 1) this.current++;
    },

    isActive(index) {
      return index === this.current;
    },

    searchMack(mack) {
      mack = mack.toUpperCase();
      let return_data = [];
      const limit = 5;
      if (this.$store.state.list_mack.length > 0 && mack != "") {
        for (let i = 0; i < this.$store.state.list_mack.length; i++) {
          if (
            this.$store.state.list_mack[i].mack.includes(mack) &&
            !this.list_mack.includes(this.$store.state.list_mack[i].mack)
          ) {
            return_data.push(this.$store.state.list_mack[i]);
          }
          if (return_data.length == limit) break;
        }
      }
      return return_data;
    },

    change() {
      if (this.open == false) {
        this.open = true;
        this.current = 0;
      }
      this.suggestions = this.searchMack(this.mack_add_watchlist);
    },

    suggestionClick(index) {
      this.mack_add_watchlist = this.suggestions[index].mack;
      this.open = false;
      this.addNewWatchlist();
    },

    addNewWatchlist() {
      let self = this;
      if (self.mack_add_watchlist == "") {
        return;
      }
      self.is_valid_mack_add_watchlist = !(
        self.mack_add_watchlist == "" ||
        !self.mack_add_watchlist ||
        !this.$store.state.data_eod.hasOwnProperty(
          self.mack_add_watchlist.toUpperCase()
        )
      );
      if (
        !this.$store.state.data_eod.hasOwnProperty(
          self.mack_add_watchlist.toUpperCase()
        )
      ) {
        self.$toast.error("Mã CK không hợp lệ!");
        return;
      }
      let category_id = self.current_category_id;
      if (!category_id.includes("watchlist")) {
        return;
      }
      category_id = category_id.replace(/watchlist_/g, "");
      axios
        .post(this.$apiAdress + "/api/watchlist", {
          mack: self.mack_add_watchlist.toUpperCase(),
          my_watchlist_id: category_id,
          user_id: localStorage.getItem("user_id"),
          token: localStorage.getItem("api_token"),
        })
        .then(function (response) {
          response.data._classes = "table-success";
          self.data_list_mack_watch_list.push({
            id: response.data.id,
            mack: response.data.mack,
          });
          self.$toast.success("Thêm vào watchlist thành công");
          self.mack_add_watchlist = "";
          self.open = false;
        })
        .catch(function (error) {
          console.error(error);
          if (error.response.data.error_code == "watch_list_mack_exist") {
            self.$toast.error(
              "Mã chứng khoán đã có trong Wacthlist, vui lòng thử lại"
            );
            return;
          }
          self.$toast.error("Có lỗi xảy ra, vui lòng thử lại");
        });
    },
    formatMoney(number, min, max) {
      let num_check = parseFloat(number);
      if (isNaN(num_check)) return number;
      return number.toLocaleString("en", {
        minimumFractionDigits: min,
        maximumFractionDigits: max,
      });
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    list_mack() {
      let return_data = [];
      for (const element of this.data_list_mack_watch_list) {
        return_data.push(element.mack);
      }
      return return_data;
    },
    list_mack_info() {
      let return_data = {};
      for (const item of this.data_list_mack_watch_list) {
        return_data[item.mack] = {
          ten_cong_ty: this.$store.state.list_mack_company.hasOwnProperty(
            item.mack
          )
            ? this.$store.state.list_mack_company[item.mack].ten_cong_ty
            : "",
          price: this.$store.state.data_eod.hasOwnProperty(item.mack)
            ? this.$store.state.data_eod[item.mack].lastprice / 1000
            : 0,
          change: this.$store.state.data_eod.hasOwnProperty(item.mack)
            ? this.$store.state.data_eod[item.mack].change
            : 0,
          perchange: this.$store.state.data_eod.hasOwnProperty(item.mack)
            ? this.$store.state.data_eod[item.mack].perchange
            : 0,
          cl: this.$store.state.data_eod.hasOwnProperty(item.mack)
            ? this.$store.state.data_eod[item.mack].cl
            : "",
        };
      }
      return return_data;
    },
    openSuggestion() {
      return (
        this.mack !== "" && this.suggestions.length != 0 && this.open === true
      );
    },
    list_mack_sorted() {
      let return_data = this.data_list_mack_watch_list.map((item) => {
        return {
          ...item,
          ten_cong_ty: this.$store.state.list_mack_company.hasOwnProperty(
            item.mack
          )
            ? this.$store.state.list_mack_company[item.mack].ten_cong_ty
            : "",
          price: this.$store.state.data_eod.hasOwnProperty(item.mack)
            ? this.$store.state.data_eod[item.mack].lastprice / 1000
            : 0,
          change: this.$store.state.data_eod.hasOwnProperty(item.mack)
            ? this.$store.state.data_eod[item.mack].change
            : 0,
          perchange: this.$store.state.data_eod.hasOwnProperty(item.mack)
            ? this.$store.state.data_eod[item.mack].perchange
            : 0,
          cl: this.$store.state.data_eod.hasOwnProperty(item.mack)
            ? this.$store.state.data_eod[item.mack].cl
            : "",
        };
      });
      switch (this.data_filter_item) {
        case 1:
          return_data.sort(function (a, b) {
            return a.mack.localeCompare(b.mack);
          });
          break;
        case 2:
          return_data.sort(function (a, b) {
            return b.mack.localeCompare(a.mack);
          });
          break;
        case 3:
          return_data.sort(function (a, b) {
            return b.change - a.change;
          });
          break;
        case 4:
          return_data.sort(function (a, b) {
            return a.change - b.change;
          });
          break;
        case 5:
          return_data.sort(function (a, b) {
            return b.perchange - a.perchange;
          });
          break;
        case 6:
          return_data.sort(function (a, b) {
            return a.perchange - b.perchange;
          });
          break;
        default:
          break;
      }
      return return_data;
    },
    icon_name(){
      switch (this.data_filter_item) {
        case 1:
          return "cilSortAlphaDown";
        case 2:
          return "cilSortAlphaUp";
        case 3:
          return "cilSortNumericDown";
        case 4:
          return "cilSortNumericUp";
        case 5:
          return "cilSortNumericDown";
        case 6:
          return "cilSortNumericUp";
        case 10:
          return "cilListLowPriority";
        default:
          return "cilSortAlphaDown";
      }
    }
  },
  watch: {
    mack: {
      handler() {
        this.list_news = [];
        this.current_page_news = 1;
        this.is_no_data_news = false;
        this.getListNews();
      },
    },
    list_mack: {
      handler(newVal, oldVal) {
        // window.socket_send.emit("leave", oldVal);
        this.getDataInit();
        this.$emit("updatedListMackWatchList", newVal);
      },
    },
    current_category_id: {
      handler(newVal, oldVal) {
        const user_id = localStorage.getItem("user_id");
        localStorage.setItem("watchlist_" + user_id, newVal);
        if(!this.is_first_set_data && !this.$store.state.is_getting_data_news){
          this.$store.commit("saveSetting", ["watchlist_" + user_id, newVal]);
        }
        if (newVal == "") {
          return;
        }
        this.getAllItemWatchList();
      },
    },
    data_filter_item: {
      handler() {
        localStorage.setItem("data_filter_item", this.data_filter_item);
        if(!this.is_first_set_data && !this.$store.state.is_getting_data_news){
          this.$store.commit("saveSetting", ["data_filter_item", this.data_filter_item]);
        }
      },
    },
  },
  beforeDestroy() {
    // window.socket_send.emit("leave", this.list_mack);
    this.$emit("updatedListMackWatchList", []);
  },
};
</script>
<style lang="scss">
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
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
.result {
  margin-bottom: 1em;
}
.bg-hover-current {
  color: white;
  background-color: #8c58b3;
  cursor: pointer;
  span{
    color: #fff !important;
  }
}
.c-dark-theme {
  .table-scroll-watchlist-news {
    .loader:after {
      background-color: #282933;
    }
  }
}
.custom-padding-tab-watchlist-item {
  li {
    a {
      padding: 5px 5px 5px 2px;
    }
  }
}
.table-scroll-watchlist-mack {
  overflow-y: auto;
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
    cursor: pointer;
  }

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: #f5f5f5;
    cursor: pointer;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
    cursor: pointer;
  }
}
.table-scroll-watchlist-news {
  overflow-y: auto;
  height: calc(100vh - 170px);
  .loader {
    font-size: 10px;
    margin: 0px auto;
    text-indent: -9999em;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #ffffff;
    background: linear-gradient(
      to right,
      #9b4dca 10%,
      rgba(255, 255, 255, 0) 42%
    );
    position: relative;
    animation: load3 1.4s infinite linear;
    transform: translateZ(0);
  }
  .loader:before {
    width: 50%;
    height: 50%;
    background: #9b4dca;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
  }
  .loader:after {
    background: #ffffff;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: "";
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  @-webkit-keyframes load3 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes load3 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
    cursor: pointer;
  }

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: #f5f5f5;
    cursor: pointer;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
    cursor: pointer;
  }
}
</style>
