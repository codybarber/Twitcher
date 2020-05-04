import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import 'bootstrap' 
import 'bootstrap/dist/css/bootstrap.min.css'

import LoadScript from 'vue-plugin-load-script';
 
Vue.use(LoadScript);

Vue.config.productionTip = false
window.axios = axios;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


