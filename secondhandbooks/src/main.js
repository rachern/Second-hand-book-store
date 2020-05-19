import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import api from './assets/config/api'
import {
  Carousel,
  CarouselItem,
  Form,
  FormItem,
  Input,
  Switch,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Pagination,
  Tabs,
  TabPane,
  InputNumber,
  Avatar,
  Rate,
  Checkbox,
  Collapse,
  CollapseItem,
  DatePicker,
  Upload,
  Dialog,
  Message,
  Cascader,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  MenuItem,
  Submenu,
  Card,
  Table,
  TableColumn,
  Image,
  Radio,
  RadioGroup,
  Divider,
  Select,
  Option,
  Steps,
  Step
} from 'element-ui'
import vRegion from 'v-region';
import './permission'
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3001'
}))

//引入清除默认样式
import './assets/scss/_reset.scss'
//引入element-ui样式
import './assets/scss/element-variables.scss'

Vue.config.productionTip = false
// Vue.prototype.$axios = axios;
// Vue.prototype.$api = api;

Message.install = function (Vue, options) {
  Vue.prototype.$message = Message
}


Vue.use(vRegion);

Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Switch);
Vue.use(Button);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Pagination);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(InputNumber);
Vue.use(Avatar);
Vue.use(Rate);
Vue.use(Checkbox);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(DatePicker);
Vue.use(Upload);
Vue.use(Dialog);
Vue.use(Message);
Vue.use(Cascader);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Image);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Divider);
Vue.use(Select);
Vue.use(Option);
Vue.use(Steps);
Vue.use(Step);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
