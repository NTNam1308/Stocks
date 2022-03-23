import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
Vue.use(Vuex)

const state = {
  sidebarShow: 'false',
  sidebarMinimize: false,
  mack: 'BVH',
  description_mack: "",
  type_mack: 'insurance',
  department: "BẢO HIỂM",
  darkMode: true,
  data_eod: {},
  data_trading_log: {},
  time_plan:'',
  data_category: {},
  list_mack: {},
  list_mack_company: {},
  is_show_alert_logout: true,
  clanModal: false,
  mackTradingChart: "BVH",
  isShowModalTradingChart: false,
  option_filter_category: [],
  list_data_model_add: {
    current_my_watchlist_id: null,
    mack: "",
  },
  is_getting_data_saved: true,
  maintenance: 'off',
}

const getters = {
  option_filter_category: state => state.option_filter_category,
  list_data_model_add: state => state.list_data_model_add,
}
const actions = {
  addWatchlist( context , data){
    context.commit('pushWatchlist',data)
  },
  editWatchlist( context , data){
    context.commit('upadteWatchlist',data)
  },
  deleteWatchlist( context , data){
    context.commit('removeWatchlist',data)
  },
}
const mutations = {
  pushWatchlist( state , data) {
    state.option_filter_category.unshift({
      value: data.id,
      label: data.name,
    });
    state.list_data_model_add.current_my_watchlist_id =
    state.option_filter_category[0].value;
  },
  upadteWatchlist( state , data) {
    state.option_filter_category.forEach((item, index) => {
      if (item.value == data.id) {
        state.option_filter_category[index].label = data.name;
      }
    });
    state.list_data_model_add.current_my_watchlist_id =
    state.option_filter_category[0].value;
    // test push code
  },
  removeWatchlist( state , data) {
    state.option_filter_category.forEach((item, index) => {
      if (item.value == data) {
        state.option_filter_category.splice(index, 1);
      }
    });
    
    state.list_data_model_add.current_my_watchlist_id =
    state.option_filter_category[0].value;
  },
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  },
  changeDarkMode(state){
    state.darkMode = !state.darkMode
  },
  saveSetting(state, [key, value]) {
    axios
      .post(this._vm.$apiAdressSaveSettings + "/updateusersettings?token="+localStorage.getItem("api_token"), {
        listitem: [{
          key: key,
          value: value,
        }],
      })
      .then((res) => {
        
      })
      .catch((error) => {
        console.error(error);
      });
  },
  clearSetting(state, key) {
    axios
      .post(this._vm.$apiAdressSaveSettings + "/delusersettings?token="+localStorage.getItem("api_token"), {
        key: key,
      })
      .then((res) => {
      })
      .catch((error) => {
        console.error(error);
      });
  },
}


export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})