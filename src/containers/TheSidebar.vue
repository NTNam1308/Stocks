<template>
<div id="the-sidebar-container" class="c-sidebar c-sidebar-minimized sidebar-cts" :class="show ? 'c-sidebar-show' : ''">
  <CSidebar
    fixed
    :minimize="minimize"
    breakpoint="xl"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/dashboard">
      
    </CSidebarBrand>
    <CRenderFunction flat :content-to-render="nav" />
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</div>
</template>

<script>
import axios from "axios";
export default {
  name: "TheSidebar",
  data() {
    return {
      //minimize: false,
      nav: [],
      //show: true,
      buffor: [],
    };
  },
   created() {
   },
  computed: {
    show() {
      return this.$store.state.sidebarShow;
    },
    minimize() {
      return this.$store.state.sidebarMinimize;
    },
  },
  methods: {
    dropdown(data) {
      let result = {
        _name: "CSidebarNavDropdown",
        name: data["name"],
        route: data["href"],
        icon: data["icon"],
        _children: [],
      };
      for (let i = 0; i < data["elements"].length; i++) {
        if (data["elements"][i]["slug"] == "dropdown") {
          result._children.push(this.dropdown(data["elements"][i]));
        } else {
          result._children.push({
            _name: "CSidebarNavItem",
            name: data["elements"][i]["name"],
            to: data["elements"][i]["href"],
            icon: data["elements"][i]["icon"],
          });
        }
      }
      return result;
    },
    rebuildData(data) {
      this.buffor = [
        {
          _name: "CSidebarNav",
          _children: [],
        },
      ];
      for (let k = 0; k < data.length; k++) {
        switch (data[k]["slug"]) {
          case "link":
            if (data[k]["href"].indexOf("http") !== -1) {
              this.buffor[0]._children.push({
                _name: "CSidebarNavItem",
                name: data[k]["name"],
                href: data[k]["href"],
                icon: data[k]["icon"],
                target: "_blank",
              });
            } else {
              this.buffor[0]._children.push({
                _name: "CSidebarNavItem",
                name: data[k]["name"],
                to: data[k]["href"],
                icon: data[k]["icon"],
              });
            }
            break;
          case "title":
            this.buffor[0]._children.push({
              _name: "CSidebarNavTitle",
              _children: [data[k]["name"]],
            });
            break;
          case "dropdown":
            this.buffor[0]._children.push(this.dropdown(data[k]));
            break;
        }
      }
      return this.buffor;
    },
  },
  mounted() {
    this.$root.$on("toggle-sidebar", () => {
      const sidebarOpened = this.show === true || this.show === "responsive";
      this.show = sidebarOpened ? false : "responsive";
    });
    this.$root.$on("toggle-sidebar-mobile", () => {
      const sidebarClosed = this.show === "responsive" || this.show === false;
      this.show = sidebarClosed ? true : "responsive";
    });
    let self = this;

    axios
      .get(
        this.$apiAdress + "/api/menu?token=" + localStorage.getItem("api_token")
      )
      .then(function (response) {
        self.nav = self.rebuildData(response.data);
      })
      .catch(function (error) {
        console.log(error);
        self.$router.push({ path: "/login" });
      });
    let roles = localStorage.getItem("roles");
    if (roles != null) {
      roles = roles.split(",");
    }
    // if (roles.indexOf("admin") >= 0) {
    //   this.$store.state.sidebarMinimize = true;
    //   this.$store.state.sidebarShow = "responsive";
    // } else {
      document.getElementById('the-sidebar-container').classList.add('the-sidebar-container');
      document.getElementById('the-sidebar-container').classList.remove('c-sidebar');
      document.getElementById('the-sidebar-container').classList.remove('c-sidebar-lg-show');
      document.getElementById('the-sidebar-container').classList.remove('c-sidebar-minimized');
    // }
  },
};
</script>
<style lang="scss">

@media (min-width: 1141px) {
  .the-sidebar-container{
    display: none;
  }
}
@media (max-width: 1140px) {
.c-sidebar-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1029;
    width: 100vw;
    height: 100vh;
    background-color: #000015;
    transition: .3s;

    // Fade for backdrop
    &.c-fade { opacity: 0; }
    &.c-show { opacity: 0.5; }
  }
}
</style>
