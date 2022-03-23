<template>
  <div
    class=" pagi"
    v-if="items.length !== 0 && nav.totalPages != 1"
  >
    <paginate
      :page-count="nav.totalPages"
      v-model="nav.currentPage"
      :click-handler="handlerClick"
      :prev-text="'Trước'"
      :next-text="'Sau'"
      :margin-pages="1"
      :container-class="'vue-pagination'"
      :page-class="['vue-page-item', $store.state.darkMode ? 'dark' : '']"
      :break-view-link-class="'break-view-custom'"
      :break-view-class="'break-view-class'"
      :initial-page="1"
    >
      <span
        slot="breakViewContent"
        @click="toggleBoxInputPage"
        v-click-outside="hide"
      >
        <svg width="16" height="4" viewBox="0 0 16 4">
          <circle fill="#999999" cx="2" cy="2" r="2" />
          <circle fill="#999999" cx="8" cy="2" r="2" />
          <circle fill="#999999" cx="14" cy="2" r="2" />
        </svg>
      </span>
    </paginate>
    <div class="box-option-paginate mt-3 mx-auto" v-show="showBoxInputPage">
      <h5
      :style="
        $store.state.darkMode
          ? { 'color': '#4c4f54' }
          : { 'color': '#4c4f54' }
        "
      >Di chuyển đến trang</h5>
      <div class="action">
        <div>
          <button class="btn btn-option" @click="decrementPage">-</button>
          <input type="number" v-model="pageOption" />
          <button class="btn btn-option" @click="incrementPage">+</button>
        </div>
        <button class="btn btn-primary" @click="redirectByoption">
          Di chuyển
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Paginate from "vuejs-paginate";
import ClickOutside from "vue-click-outside";
export default {
  props: {
    nav: Object,
    items: Array,
    scrollTo: {
      default: 0,
      type: Number,
    },
    elId: String,
  },
  data() {
    return {
      showBoxInputPage: false,
      pageOption: this.nav.currentPage,
    };
  },
  components: {
    Paginate,
  },
  mounted() {
    // prevent click outside event with popupItem.
    this.popupItem = this.$el;
  },
  directives: {
    ClickOutside,
  },
  methods: {
    handlerClick(page) {
      this.nav.currentPage = page;
      this.pageOption = page;
      let element = document.getElementById(this.elId);
      if (element) {
        element.scrollIntoView();
        window.scrollBy(0, -70);
      }
      // window.scrollTo({
      //   top: this.scrollTo,
      //   behavior: "smooth",
      // });
    },
    toggleBoxInputPage() {
      // prevent click outside event with popupItem.
      this.popupItem = this.$el;
      this.showBoxInputPage = !this.showBoxInputPage;
    },
    hide() {
      this.showBoxInputPage = false;
    },
    incrementPage() {
      if (this.pageOption >= this.nav.totalPages) return;
      this.pageOption++;
    },
    decrementPage() {
      if (this.pageOption <= 1) return;
      this.pageOption--;
    },
    redirectByoption() {
      this.nav.currentPage = this.pageOption;
      let element = document.getElementById(this.elId);
      if (element) {
        element.scrollIntoView();
        window.scrollBy(0, -70);
      }
      this.showBoxInputPage = false;
    },
  },
};
</script>

<style>
.pagi {
  position: relative;
}
.box-option-paginate {
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, 115%);
  z-index: 999999999;
}

.vue-pagination {
  display: flex;
  justify-content: center;
  height: 36px;
}
.vue-pagination > li:not(.vue-page-item) > a {
  width: 70px;
  text-align: center;
  height: 100%;
  line-height: 24px;
}
.vue-pagination .break-view-class:first-child {
  display: none !important;
}
.vue-pagination > li > a,
.vue-page-item.disabled > a {
  display: block;
  padding: 6px 13px;
  /* color: var(--main_color); */
  /* background-color: #fff; */
  border: 1px solid #bebebe;
  height: 100%;
  line-height: 24px;
}
/* .vue-pagination > li:hover > a {
  color: white !important;
  background-color: var(--main_color);
  border-color: var(--main_color);
} */
.vue-page-item.active > a {
  color: white !important;
  background-color: #007bff;
  border-color: #007bff;
}

.vue-page-item.dark.active > a {
  color: white !important;
  background-color: #007bff !important;
  border-color: #bebebe !important;
}

.vue-page-item.dark > a {
  color: white !important;
  background-color:#282933 !important;
  /* border-color: #fc4e4e; */
}


/* .vue-pagination > li.disabled:not(.vue-page-item) > a,
.vue-pagination > li.disabled:hover > a {
  border-color: #ddd !important;
  color: #ddd !important;
  background-color: white !important;
  height: 100%;
  line-height: 24px;
} */
.break-view-custom {
  width: 100%;
  height: 100%;

  padding: 0px !important;
  line-height: 36px !important;
}
.break-view-custom > span {
  padding: 0px 10px;
  height: 100%;
  display: block;
  line-height: 45px;
}

.box-option-paginate {
  /* border: 1px solid ; */
  border-radius: 9px;
  width: 325px;
  box-shadow: 4px 8px 9px rgb(0 0 0 / 15%);
}
.box-option-paginate > h5 {
  padding: 10px 8px;
  background-color: white;
  /* color: var(--main_color); */
  margin: 0px;
  position: relative;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  /* border-bottom: 1px solid gray; */
}
/* position */
.box-option-paginate > h5:before {
  content: "";
  display: block;

  border: 10px solid transparent;
  /* border-bottom-color: var(--main_color); */

  position: absolute;
  top: 0px;
  left: 50%;
  transform: translate(-50%, -100%);
}

.action {
  display: flex;
  padding: 7px 8px;
  background-color: white;
  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;
}
.action > div > input {
  border: 1px solid #007bff;
  border-radius: 3px;
  height: 40px;
  width: 100px;
  text-align: center;
  margin: 0px 8px;
}
/* Chrome, Safari, Edge, Opera */
.action > div > input::-webkit-outer-spin-button,
.action > div > input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

/* Firefox */
.action > div > input[type="number"] {
  -moz-appearance: textfield;
}

.action > div {
  display: flex;
  align-items: center;
}
.btn.btn-option {
  display: block;
  width: 40px;
  height: 100%;
  background-color: #007bff;
  color: white;
  font-size: 17px;
}
.btn.btn-option:hover {
  background-color: blue !important;
  color: white;
}
.action > button {
  height: 40px;
  margin-left: 15px;
}
.action > button:hover {
  background-color: blue !important;
  color: white;
}
div.pagi ul.vue-pagination{
    list-style: none;
    padding-left:0px !important;
}
div.pagi ul.vue-pagination li:hover a{
    background-color:  #364aff !important;
}
@media screen and (max-width: 430px) {
  .break-view-custom {
    height: 38px;
  }
  .vue-pagination > li:not(.vue-page-item) > a {
    width: 39px;
    height: 35px;
    text-align: center;
    padding: 6px 0px;
    font-size: 14px;
  }
  .vue-pagination > li.vue-page-item > a {
    width: 35px;
    height: 35px;

    text-align: center;
    padding: 6px 0px;
    font-size: 14px;
  }
}
@media screen and (max-width: 320px) {
  .vue-pagination > li:not(.vue-page-item) > a {
    width: 30px;
  }
  .vue-pagination > li > a,
  .vue-page-item.disabled > a {
    line-height: 25px;
  }
}
</style>