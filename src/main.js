import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import './registerServiceWorker'

import { Container, Header, Main, Footer, Row, Col, Card, Tooltip, Loading, Form, FormItem, Select, Option, Menu, MenuItem, Icon, Table, TableColumn } from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

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
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Icon)
Vue.use(Table)
Vue.use(TableColumn)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
