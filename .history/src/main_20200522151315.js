
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import {
  Badge,
  Button,
  Card,
  Checkbox,
  CheckboxGroup,
  ColorPicker,
  Col,
  DatePicker,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Form,
  FormItem,
  Header,
  Icon,
  Input,
  Link,
  Main,
  Menu,
  MenuItem,
  Message,
  MessageBox,
  Option,
  Pagination,
  Popover,
  Progress,
  Radio,
  RadioGroup,
  Row,
  Select,
  Submenu,
  Switch,
  Table,
  TableColumn,
  Tabs,
  TabPane,
  Tag,
  TimePicker,
  Transfer,
  Upload,
  CarouselItem,
  Carousel
} from 'element-ui'
import './assets/css/common.scss'
import VueI18n from 'vue-i18n'
import myEnLocale from './assets/lang/en'
import myZhLocale from './assets/lang/zh-cn'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import ElementLocale from 'element-ui/lib/locale'
import axios from 'axios'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.config.productionTip = false

Vue.use(Viewer);
Viewer.setDefaults({
  Options: { "inline": true, "button": true, "navbar": true, "title": true, "toolbar": true, "tooltip": true, "movable": true, "zoomable": true, "rotatable": true, "scalable": true, "transition": true, "fullscreen": true, "keyboard": true, "url": "data-source" }
});

// 按需引入element-ui
Vue.use(Badge)
Vue.use(Button)
Vue.use(Card)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Col)
Vue.use(ColorPicker)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Header)
Vue.use(Icon)
Vue.use(Input)
Vue.use(Link)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Option)
Vue.use(Pagination)
Vue.use(Popover)
Vue.use(Progress)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Row)
Vue.use(Select)
Vue.use(Submenu)
Vue.use(Switch)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tag)
Vue.use(TimePicker)
Vue.use(Transfer)
Vue.use(Upload)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.prototype.$message = Message
Vue.prototype.$MessageBox = MessageBox
Vue.prototype.$axios = axios

// 根据环境变量决定是否引入mock
/* if (process.env.VUE_APP_USE_MOCK || (process.env.NODE_ENV !== 'production' && !process.env.VUE_APP_BACK_END_URL)) {
  const Mock = require('./mock/index').default
  Mock.mockData()
} */

/* vue-i18n */
Vue.use(VueI18n)
const messages = {
  'en': Object.assign(myEnLocale, enLocale),
  'zh-cn': Object.assign(myZhLocale, zhLocale)
}
const lang = localStorage.getItem('user-language') || 'zh-cn'
const i18n = new VueI18n({
  locale: lang,
  messages
})
ElementLocale.i18n((key, value) => i18n.t(key, value))

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
  /*   components: {
      App
    } */
}).$mount('#app')
