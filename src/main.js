import Vue from 'vue'
import App from './App.vue'
import router from './router'
import trust from 'trust'
import VueGoodStorage from 'vue-good-storage'
import axios from 'axios'
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.config.productionTip = false
Vue.use(trust)
Vue.use(Vant)
Vue.use(VueGoodStorage)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
