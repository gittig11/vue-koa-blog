import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);
// axios.defaults.headers.common['X-Auth-Token'] = 'hjMoWr2XzenwsX5JyX6ETsBMMq9UVL6MPDu4FaKX';
// axios.defaults.baseURL = 'https://api.example.com';
// 全局的 axios 默认值

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
