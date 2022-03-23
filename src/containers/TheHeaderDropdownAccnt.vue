<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar" style="width: 45px; height: 45px;">
          <img
            :src="url"
            class="c-avatar-img"
          />
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>{{ user_name }}</strong>
    </CDropdownHeader>
    <CDropdownItem  v-if="isModerator" @click="goto_contact_feedback()">
      <CIcon name="cil-user" /> Quản lý liên hệ
    </CDropdownItem>
    <CDropdownItem v-if="isModerator" @click="goto_users()">
      <CIcon name="cil-user" /> Quản lý thành viên
    </CDropdownItem>
    <CDropdownItem v-if="isCoworker" @click="goto_news()">
      <CIcon name="cil-laptop" /> Quản lý tin tức
    </CDropdownItem>
    <CDropdownItem v-if="isAdmin" @click="goto_market_pulse()">
      <CIcon name="cil-laptop" /> Quản lý NĐTT
    </CDropdownItem>
    <CDropdownItem v-if="isModerator" @click="goto_top_rank()">
      <CIcon name="cil-laptop" /> Xếp hạng cổ phiếu
    </CDropdownItem>
    <CDropdownItem v-if="isModerator" @click="goto_group_bank()">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journal-code" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8.646 5.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 8 8.646 6.354a.5.5 0 0 1 0-.708zm-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 8l1.647-1.646a.5.5 0 0 0 0-.708z"/>
        <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
        <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
      </svg>
      <span class="pl-1">Quản lý các mã đã cập nhật</span>
    </CDropdownItem>    
    <CDropdownItem v-if="isModerator" @click="goto_versions()">
      <CIcon name="cil-laptop" /> Quản lý Version 
    </CDropdownItem>
    <CDropdownItem v-if="isModerator" @click="goto_reference_manager()">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-door-open" viewBox="0 0 16 16">
        <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
        <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z"/>
      </svg>
      <span class="pl-1">Lịch sử giới thiệu</span>
    </CDropdownItem>
    <CDropdownItem @click="goto_profile()">
      <CIcon name="cil-user" /> Thông tin người dùng
    </CDropdownItem>
    <CDropdownItem @click="goto_passwd()">
      <CIcon name="cil-shield-alt" /> Thay đổi mật khẩu
    </CDropdownItem>
    <CDropdownItem v-if="!isModerator" @click="goto_reference_history()">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-door-open" viewBox="0 0 16 16">
        <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
        <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z"/>
      </svg>
      <span class="pl-1">Lịch sử giới thiệu</span>
    </CDropdownItem>
    <CDropdownItem @click="goto_plan()">
      <CIcon name="cib-codesandbox" /> Gói Cước
    </CDropdownItem>
    <CDropdownDivider />
    <CDropdownItem @click="logout()">
      <CIcon name="cil-lock-locked" /> Đăng xuất
    </CDropdownItem>
  </CDropdown>
</template>

<script>
import axios from "axios";
export default {
  name: "TheHeaderDropdownAccnt",
  data() {
    return {
      itemsCount: 42,
      url: localStorage.getItem("avatar"),
      avatar_url: localStorage.getItem("avatar"),
      isCoworker: false,
      isModerator: false,
      isAdmin: false
    };
  },
  watch: {
    avatar_url: function () {
      this.url = this.avatar_url;
    },
  },
  computed: {
    user_name() {
      return localStorage.getItem("user_name");
    },
    avatar: {
      get: function () {
        return localStorage.getItem("avatar");
      },
      set: function (value) {
        return localStorage.getItem("avatar");
      }
    },
  },
  methods: {
    logout() {
      this.$socket.disconnect();
      let self = this;
      axios
        .post(
          this.$apiAdress +
            "/api/logout?token=" +
            localStorage.getItem("api_token"),
          {}
        )
        .then(function (response) {
          localStorage.setItem("roles", "");
          localStorage.setItem("api_token", "");
          self.$router.push({ path: "/login" });
          self.$store.state.option_filter_category.length = 0;
          self.$store.state.list_data_model_add.current_my_watchlist_id = null;
        })
        .catch(function (error) {
          localStorage.setItem("roles", "");
          localStorage.setItem("api_token", "");
          self.$router.push({ path: "/login" });
        });
    },
    goto_users() {
      let self = this;
      self.$router.push({ path: "/users" });
    },
    goto_news() {
      let self = this;
      self.$router.push({ path: "/tin-tuc" });
    },
    goto_contact_feedback() {
      let self = this;
      self.$router.push({ path: "/contact-feedback" });
    },
    goto_profile() {
      let self = this;
      self.$router.push({ path: "/profile" });
    },
    goto_trading_log() {
      let self = this;
      self.$router.push({ path: "/nhat-ky-giao-dich" });
    },
    goto_market_pulse() {
      let self = this;
      self.$router.push({ path: "/nhip-dap-thi-truong" });
    },
    goto_group_bank() {
      let self = this;
      self.$router.push({ path: "/loc-nhom-cong-ty" });
    },
    goto_reference_manager(){
      let self = this;
      self.$router.push({ path: "/lich-su-gioi-thieu" });
    },
    goto_reference_history(){
      let self = this;
      self.$router.push({ path: "/gioi-thieu" });
    },
    goto_passwd() {
      let self = this;
      self.$router.push({ path: "/change_password" });
    },
    goto_plan() {
      let self = this;
      self.$router.push({ path: "/plan" });
    },
    goto_top_rank() {
      let self = this;
      self.$router.push({ path: "/xep-hang-co-phieu" });
    },

    goto_versions() {
      let self = this;
      self.$router.push({ path: "/quan-ly-version" });
    },

    update_avatar() {
      this.avatar_url = localStorage.getItem("avatar");
      console.log("avatar_url: ", this.avatar_url);
    }
  },
  mounted () {
    this.$root.$on('TheHeaderDropdownAccnt', () => {
      this.update_avatar();
    });

    let roles = localStorage.getItem("roles");
    if (roles != null) {
        roles = roles.split(',')
        this.isCoworker = roles.indexOf('coworker') >= 0 ? true : false;
        this.isModerator = roles.indexOf('moderator') >= 0 ? true : false;
        this.isAdmin = roles.indexOf('admin') >= 0 ? true : false;
    }

  }
};
</script>
<style scoped>
.c-icon {
  margin-right: 0.3rem;
}
.c-avatar-img {
  width: 45px;
  height: 45px;
}
</style>
