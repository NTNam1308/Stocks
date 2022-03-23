<template>
  <CHeader fixed with-subheader light>
    <CToggler
      in-header
      class="ml-3 d-1130-none"
      @click="$store.commit('toggleSidebarMobile')"
    />
    <CSidebarBrand class="d-1130-down-none d-block mt-3 pl-3" to="/dashboard">
      <template v-if="$store.state.darkMode">
        <div class="p-logo">
          <img src="/stocks--icon.png" class="p-logo-img" />
        </div>
      </template>
      <template v-else>
        <div class="p-logo">
          <img src="/logo_stock_black1.png" class="p-logo-img" />
        </div>
      </template>
    </CSidebarBrand>
    <CHeaderBrand class="mx-auto d-1130-none" to="/dashboard">
      <template v-if="$store.state.darkMode">
        <div class="p-logo">
          <img src="/stocks--icon.png" class="p-logo-img-lg" />
        </div>
      </template>
      <template v-else>
        <div class="p-logo">
          <img src="/logo_stock_black1.png" class="p-logo-img-lg" />
        </div>
      </template>
    </CHeaderBrand>
    <CHeaderBrand
      class="mx-auto d-1130-none"
      @click="$store.commit('changeDarkMode')"
    >
      <template v-if="$store.state.darkMode">
        <CIcon name="cil-sun" />
      </template>
      <template v-else>
        <CIcon name="cil-moon" />
      </template>
    </CHeaderBrand>
    <CHeaderNav class="d-1130-down-none mr-auto">
      <CHeaderNavItem class="px-1">
        <CHeaderNavLink to="/dashboard" class="color-navbar active">
          Trang chủ
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-1">
        <CHeaderNavLink to="/phan-tich-ky-thuat"  class="color-navbar" >
          Phân tích TA
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-1">
        <CHeaderNavLink to="/phan-tich-doanh-nghiep" class="color-navbar">
          Phân tích FA
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-1">
        <CHeaderNavLink to="/loc-diem" class="color-navbar">
          Lọc điểm
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-1">
        <CHeaderNavLink to="/dinh-gia" class="color-navbar">
          Định giá
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-1">
        <CHeaderNavLink to="/nhat-ky-giao-dich" class="color-navbar">
          Nhật ký GD
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-1">
        <CHeaderNavLink to="/watchlist" class="color-navbar">
          Watchlist
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-1">
        <CHeaderNavLink to="/co-phieu-goi-y" class="color-navbar">
          KUNGFU Clans
        </CHeaderNavLink>
      </CHeaderNavItem>

      <CHeaderNavItem class="px-1">
        <a href="https://www.youtube.com/watch?v=kfrSloR959M&list=PLffHna_hpv59TvcIK3Ne05RJHfV6byn0q" target="_blank" class="link-hdsd"
          >Hướng dẫn</a
        >
      </CHeaderNavItem>
      <CHeaderNavItem class="px-1">
        <a
          href="https://thaipham.live/khoa-hoc"
          target="_blank"
          class="link-hdsd"
          >Khóa học</a
        >
      </CHeaderNavItem>
    </CHeaderNav>

    <CHeaderNav class="mr-4">
      <li
        class="c-header-nav-item d-1130-down-none mx-2"
        @click="$store.commit('changeDarkMode')"
      >
        <CHeaderNavLink>
          <template v-if="$store.state.darkMode">
            <CIcon name="cil-sun" />
          </template>
          <template v-else>
            <CIcon name="cil-moon" />
          </template>
        </CHeaderNavLink>
      </li>
      <TheHeaderDropdownNotify />
      <TheHeaderDropdownAccnt />
    </CHeaderNav>
    <CRow v-if="isShowMainTainENV" class="warning-update">
      <CCol class="warning-update-title">
        Trang Web đã được nâng câp phiên bản mới. Quý khách vui lòng nhấn tổ hợp
        phím Ctrl F5 (hoặc Shift F5) để tải phiên bản mới nhất! Trân Trọng !
      </CCol>
    </CRow>
    <!-- <CSubheader class="px-3">
      <CBreadcrumbRouter class="border-0 mb-0" />
    </CSubheader> -->
  </CHeader>
</template>

<script>
import CMenu from "./Menu";
import TheHeaderDropdownAccnt from "./TheHeaderDropdownAccnt";
import TheHeaderDropdownNotify from "./TheHeaderDropdownNotify";

export default {
  name: "TheHeader",
  props: {
    isShowMainTainENV: {
      default:
        process.env.VUE_APP_MAINTAIN && process.env.VUE_APP_MAINTAIN === "true"
          ? true
          : false,
      type: Boolean,
    },
  },
  components: {
    TheHeaderDropdownAccnt,
    TheHeaderDropdownNotify,
  },
  data() {
    return {
      isShowMainTain: false,
    };
  },
  methods: {},
  mounted() {
    this.isShowMainTain = this.isShowMainTainENV;
    let roles = localStorage.getItem("roles");
    if (roles != null) {
      roles = roles.split(",");
    }
    if (roles.indexOf("moderator") >= 0) {
      this.isModerator = true;
    }
  },
};
</script>
<style lang="scss" scoped>
.c-header-nav-link.color-navbar.router-link-exact-active.router-link-active {
  color:#a662de  !important;
}
.p-logo-img {
  padding-left: 5%;
  width: 45px;
  padding-top: 5%;
  margin-top: -25%;
}
.p-logo-img-lg {
  width: 45px;
}
.link-hdsd {
  color: #000;
}
.color-navbar {
  color: #000 !important;
}
.c-dark-theme {
  .color-navbar {
    color: #fff !important;
  }
  .c-header-nav-item .router-link-active {
    color: #c396e8 !important;
  }
  .link-hdsd {
    color: #fff !important;
  }
}
.warning-update {
  text-align: center;
  width: 100%;
  display: block;
}
.warning-update-title {
  display: inline-block;
  margin-bottom: 10px;
}
.c-header-fixed {
  position: sticky;
  position: -webkit-sticky;
  top: 0;
}
@media (min-width: 1141px) {
  .d-1130-none {
    display: none !important;
  }
}
@media (max-width: 1140px) {
  .d-1130-down-none {
    display: none !important;
  }
}
</style>