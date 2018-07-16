import Vue from 'vue'
import App from './App.vue'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store/'
import './registerServiceWorker'

import { Container, Header, Main, Footer, Row, Col, Card, Tooltip, Loading, Form, FormItem, Select, Option } from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

const unsync = sync(store, router)

locale.use(lang)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Tooltip)
Vue.use(Loading)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Option)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
