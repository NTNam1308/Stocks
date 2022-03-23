import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import ReadMore from 'vue-read-more'
import money from 'v-money'
import VueToast from 'vue-toast-notification';
import VueQuillEditor from 'vue-quill-editor'
import 'vue-toast-notification/dist/theme-sugar.css';
import ECharts from "vue-echarts";
import * as io from "socket.io-client";
import VueSocketIO from "vue-socket.io";
import VirtualizedList from "vue-virtualized-list";
import Vuelidate from 'vuelidate'
import "echarts";
import "@/assets/js/echartDarkModeTheme"
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
import {function_global} from './function_global.js'
// import firebaseMessaging from './firebase'

export const eventBus = new Vue()

Vue.prototype.$apiAdress = `${process.env.VUE_APP_URL}:${process.env.VUE_APP_PORT}`
Vue.prototype.$apiAdressSaveSettings = `${process.env.VUE_APP_URL_SAVE_SETTING}:${process.env.VUE_APP_API_SAVE_SETTING_PORT}`
Vue.config.performance = true
Vue.use(ReadMore)
Vue.use(CoreuiVue)
Vue.use(VueQuillEditor, /* { default global options } */)
Vue.use(VueToast);
Vue.use(money, {precision: 4});
Vue.use(Vuelidate);
Vue.component("v-chart", ECharts);
Vue.prototype.$function_global = function_global;

Vue.component("virtualized-list", VirtualizedList)
Vue.use(new VueSocketIO({
    debug: false,
    connection: io(process.env.VUE_APP_URL_WEBSOCKET, {
      path: process.env.VUE_APP_PATH_WEBSOCKET,
      autoConnect: false,
      transportOptions: {
        polling: {
            extraHeaders: {
                Authorization: "Bearer "+localStorage.getItem("api_token")
            }
        }
      }
    }),
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
}))

// Vue.prototype.$messaging = firebaseMessaging

new Vue({
    el: '#app',
    router,
    store,
    icons,
    template: '<App/>',
    components: {
        App,
    },
})
