<template>
  <router-view></router-view>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  created() {
    let self = this;
    axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        let status_code = error.response.status;
        if (status_code == 423 && error.response.data.error_string == 'LIMIT_DEVICES') {
          localStorage.setItem("roles", "");
          localStorage.setItem("api_token", "");
          self.$router.push("/login");
            if(self.$store.state.is_show_alert_logout){
              self.$store.state.is_show_alert_logout = false;
              alert("Tài khoản đã đăng nhập nơi khác.");
            }
        }
        return Promise.reject(error);
      }
    );
  },
}
</script>

<style lang="scss">
// Import Main styles for this application
@import "assets/scss/style";
</style>
